import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
  lang: z.enum(["en", "hr"]).default("en"),
  /** Honeypot: must stay empty. */
  company: z.string().max(0).optional().default(""),
});

export type ContactResult = { ok: true; id?: string } | { ok: false; error: string };

/** Writes contact form enquiries to the Leads table, server side only. */
export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }): Promise<ContactResult> => {
    const { airtable, rateLimited, today, TABLES, AirtableError } = await import(
      "./airtable.server"
    );
    if (data.company) return { ok: false, error: "rejected" };
    if (rateLimited("contact")) return { ok: false, error: "rate_limited" };

    const notes = `Website contact form (${data.lang.toUpperCase()})\n\n${data.message}`;
    try {
      const res = await airtable<{ records: { id: string }[] }>(TABLES.leads, {
        method: "POST",
        body: {
          typecast: true,
          records: [
            {
              fields: {
                "Lead name": data.name,
                Email: data.email,
                Notes: notes,
                "Date first contacted": today(),
              },
            },
          ],
        },
      });
      return { ok: true, id: res.records[0]?.id };
    } catch (error) {
      if (error instanceof AirtableError && error.status === 0) return { ok: false, error: "not_configured" };
      console.error("contact form failed", error);
      return { ok: false, error: "airtable_failed" };
    }
  });
