import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { FAMILY_ROWS, FAMILY_SIDES, ILLNESSES, TEXT_FIELDS } from "./intake-shared";

const s = (max = 4000) => z.string().trim().max(max).optional().default("");
const medRow = z.object({ med: s(500), dosage: s(300), condition: s(300), helpful: s(300) });

const schema = z.object({
  path: z.enum(["adult", "child"]),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  age: s(10),
  address1: z.string().trim().min(1).max(200),
  address2: s(200),
  city: z.string().trim().min(1).max(100),
  postcode: z.string().trim().min(1).max(20),
  country: s(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(3).max(50),
  parentName: s(200),
  text: z.record(z.enum(TEXT_FIELDS), z.string().max(4000)).optional().default({}),
  conceptionNatural: s(),
  conceptionPill: s(),
  illnesses: z
    .array(z.object({ name: z.enum(ILLNESSES), age: s(100), treatment: s(500) }))
    .max(ILLNESSES.length)
    .default([]),
  currentMeds: z.array(medRow).max(30).default([]),
  previousMeds: z.array(medRow).max(30).default([]),
  family: z.record(z.string().max(60), z.string().max(1000)).optional().default({}),
  gp: z.object({ name: s(200), address: s(500), phone: s(50) }).default({ name: "", address: "", phone: "" }),
  terms: z.literal(true),
  consent: z.literal(true),
  signature: z.string().trim().min(2).max(200),
  company: z.string().max(0).optional().default(""),
});

export type IntakeInput = z.input<typeof schema>;
export type IntakeResult =
  | { ok: true; clientId: string; questionnaireId: string }
  | { ok: false; error: string };

const medLines = (rows: z.infer<typeof medRow>[]) =>
  rows
    .filter((r) => r.med || r.dosage || r.condition || r.helpful)
    .map((r) => [r.med, r.dosage, r.condition, r.helpful].join(" | "))
    .join("\n");

/** Saves the New Patient Questionnaire: upserts the client, then creates the questionnaire. */
export const submitIntake = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }): Promise<IntakeResult> => {
    const { airtable, rateLimited, today, TABLES, AirtableError } = await import(
      "./airtable.server"
    );
    if (data.company) return { ok: false, error: "rejected" };
    if (rateLimited("intake")) return { ok: false, error: "rate_limited" };

    const isChild = data.path === "child";
    const patientType = isChild ? "Child (under 16)" : "Adult";
    const date = today();
    const ageNum = Number(data.age);
    const minor = isChild || (Number.isFinite(ageNum) && ageNum < 18);

    const clean = (fields: Record<string, unknown>) =>
      Object.fromEntries(
        Object.entries(fields).filter(
          ([, v]) => !(v === "" || v === undefined || v === null || (Array.isArray(v) && v.length === 0)),
        ),
      );

    try {
      const clientFields = clean({
        "First name": data.firstName,
        "Last name": data.lastName,
        "Date of birth": data.dob,
        Email: data.email,
        Phone: data.phone,
        "Address line 1": data.address1,
        "Address line 2": data.address2,
        "City / Town": data.city,
        Postcode: data.postcode,
        "Patient type": patientType,
        "Has signed agreement": true,
        "Date of agreement": date,
        "Consent privacy notice read": true,
      });

      const email = data.email.toLowerCase().replace(/'/g, "\\'");
      const found = await airtable<{ records: { id: string }[] }>(TABLES.clients, {
        query: { filterByFormula: `LOWER({Email}) = '${email}'`, maxRecords: "1" },
      });
      let clientId: string;
      if (found.records[0]) {
        clientId = found.records[0].id;
        await airtable(`${TABLES.clients}/${clientId}`, {
          method: "PATCH",
          body: { typecast: true, fields: clientFields },
        });
      } else {
        const created = await airtable<{ id: string }>(TABLES.clients, {
          method: "POST",
          body: { typecast: true, fields: clientFields },
        });
        clientId = created.id;
      }

      const family: string[] = [];
      for (const row of FAMILY_ROWS)
        for (const side of FAMILY_SIDES) {
          const v = data.family[`${row}|${side}`]?.trim();
          if (v) family.push(`${row} (${side.toLowerCase()}): ${v}`);
        }
      const gp = [data.gp.name, data.gp.address, data.gp.phone].some(Boolean)
        ? [data.gp.name, data.gp.address, data.gp.phone].join(" / ")
        : "";
      const conception = [data.conceptionNatural, data.conceptionPill].filter(Boolean).join("\n\n");

      const text = Object.fromEntries(
        Object.entries(data.text).map(([k, v]) => [k, v.trim()]),
      );

      const intakeFields = clean({
        Questionnaire: `${data.firstName} ${data.lastName} - ${isChild ? "Child" : "Adult"} - ${date}`,
        Client: [clientId],
        "Patient type": patientType,
        Status: "New",
        "Submitted on": date,
        Age: Number.isFinite(ageNum) && data.age !== "" ? ageNum : "",
        "Parent or guardian name(s)": data.parentName,
        ...text,
        "Past illnesses": data.illnesses.map((i) => i.name),
        "Past illnesses - age and treatment": data.illnesses
          .map((i) => `${i.name} - age: ${i.age} - treatment: ${i.treatment}`)
          .join("\n"),
        "Current medication and treatments": medLines(data.currentMeds),
        "Previous medication": medLines(data.previousMeds),
        "Family history": family.join("\n"),
        "GP or specialist": gp,
        ...(isChild
          ? { Conception: conception, "Before or during pregnancy (pill, supplements)": data.conceptionPill }
          : {}),
        "Consent to treatment": true,
        "Terms accepted": true,
        "Signature (typed name)": data.signature,
        "Signed by": minor ? "Parent or guardian" : "Patient",
      });
      if (!isChild) {
        for (const k of ["Occupation"] as const) if (!text[k]) delete intakeFields[k];
      }

      const q = await airtable<{ id: string }>(TABLES.intake, {
        method: "POST",
        body: { typecast: true, fields: intakeFields },
      });
      return { ok: true, clientId, questionnaireId: q.id };
    } catch (error) {
      if (error instanceof AirtableError) {
        if (error.status === 0) return { ok: false, error: "not_configured" };
        return { ok: false, error: `airtable_${error.status}` };
      }
      console.error("intake submission failed", error);
      return { ok: false, error: "failed" };
    }
  });
