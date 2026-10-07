import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/blocks";
import { submitIntake } from "@/lib/intake.functions";
import {
  FAMILY_ROWS,
  FAMILY_SIDES,
  ILLNESSES,
  TEXT_FIELDS,
  type MedRow,
} from "@/lib/intake-shared";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/new-patient-questionnaire")({
  validateSearch: (search: Record<string, unknown>) => ({
    type: search.type === "child" ? ("child" as const) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "New Patient Questionnaire | Homeopathy with Nataša" },
      {
        name: "description",
        content:
          "Confidential questionnaire to complete before your first homeopathy appointment with Nataša Perić.",
      },
      { property: "og:title", content: "New Patient Questionnaire | Homeopathy with Nataša" },
      {
        property: "og:description",
        content: "Please complete this confidential questionnaire before your first appointment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Questionnaire,
});

type TextKey = (typeof TEXT_FIELDS)[number];
type Path = "adult" | "child";
type Details = {
  firstName: string; lastName: string; dob: string; age: string;
  address1: string; address2: string; city: string; postcode: string; country: string;
  email: string; phone: string; parentName: string;
};
const emptyDetails: Details = {
  firstName: "", lastName: "", dob: "", age: "", address1: "", address2: "", city: "",
  postcode: "", country: "", email: "", phone: "", parentName: "",
};
const emptyRow: MedRow = { med: "", dosage: "", condition: "", helpful: "" };

function ageFrom(dob: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return "";
  const b = new Date(dob);
  const n = new Date();
  let a = n.getFullYear() - b.getFullYear();
  if (n.getMonth() < b.getMonth() || (n.getMonth() === b.getMonth() && n.getDate() < b.getDate())) a--;
  return a >= 0 && a < 130 ? String(a) : "";
}

const inputCls =
  "mt-2 w-full rounded-2xl border border-green-300 bg-card px-4 py-2.5 text-green-900 focus:ring-2 focus:ring-green-400 focus:outline-none";
const linkCls = "text-green-700 underline underline-offset-4 hover:text-green-600";

function Label({ children, required }: { children: ReactNode; required?: boolean | undefined }) {
  return (
    <span className="block text-green-900">
      {children}
      {required ? <span className="text-rose-600"> *</span> : null}
    </span>
  );
}

type FormCtx = {
  text: Partial<Record<TextKey, string>>;
  setText: (k: TextKey, v: string) => void;
  d: Details;
  setDetail: (k: keyof Details, v: string) => void;
};
const Ctx = createContext<FormCtx | null>(null);
const useForm = () => useContext(Ctx)!;

function T({ k, label, rows = 3, required }: { k: TextKey; label: string; rows?: number; required?: boolean }) {
  const { text, setText } = useForm();
  return (
    <label className="block">
      <Label required={required}>{label}</Label>
      <textarea
        rows={rows}
        maxLength={4000}
        value={text[k] ?? ""}
        onChange={(e) => setText(k, e.target.value)}
        className={cn(inputCls, "resize-y")}
      />
    </label>
  );
}

function I({ k, label, type = "text", required }: { k: keyof Details; label: string; type?: string; required?: boolean }) {
  const { d, setDetail } = useForm();
  return (
    <label className="block">
      <Label required={required}>{label}</Label>
      <input type={type} value={d[k]} onChange={(e) => setDetail(k, e.target.value)} className={inputCls} />
    </label>
  );
}

function Questionnaire() {
  const send = useServerFn(submitIntake);
  const search = Route.useSearch();
  const [path, setPath] = useState<Path | null>(search.type === "child" ? "child" : null);
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Details>(emptyDetails);
  const [text, setText] = useState<Partial<Record<TextKey, string>>>({});
  const [conception, setConception] = useState({ natural: "", pill: "" });
  const [ill, setIll] = useState<Record<string, { on: boolean; age: string; treatment: string }>>({});
  const [currentMeds, setCurrentMeds] = useState<MedRow[]>([{ ...emptyRow }]);
  const [previousMeds, setPreviousMeds] = useState<MedRow[]>([{ ...emptyRow }]);
  const [family, setFamily] = useState<Record<string, string>>({});
  const [gp, setGp] = useState({ name: "", address: "", phone: "" });
  const [terms, setTerms] = useState(false);
  const [consent, setConsent] = useState(false);
  const [signature, setSignature] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const isChild = path === "child";
  const ageNum = Number(d.age);
  const isMinorAdult = path === "adult" && d.age !== "" && ageNum >= 16 && ageNum < 18;
  const parentConsent = isChild || isMinorAdult;

  const setDetail = (k: keyof Details, v: string) =>
    setD((prev) => ({ ...prev, [k]: v, ...(k === "dob" ? { age: ageFrom(v) } : {}) }));

  const illnessBlock = (question: string) => (
    <fieldset>
      <legend className="text-green-900">{question}</legend>
      <div className="mt-4 grid gap-3">
        {ILLNESSES.map((name) => {
          const v = ill[name] ?? { on: false, age: "", treatment: "" };
          const upd = (patch: Partial<typeof v>) => setIll((p) => ({ ...p, [name]: { ...v, ...patch } }));
          return (
            <div key={name} className="rounded-2xl bg-card px-4 py-3 ring-1 ring-green-100">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={v.on} onChange={(e) => upd({ on: e.target.checked })} className="h-4 w-4 accent-green-700" />
                <span>{name}</span>
              </label>
              {v.on ? (
                <div className="mt-3 grid gap-3 sm:grid-cols-[120px_1fr]">
                  <label className="text-sm">Age<input value={v.age} onChange={(e) => upd({ age: e.target.value })} className={cn(inputCls, "mt-1")} /></label>
                  <label className="text-sm">Treatment<input value={v.treatment} onChange={(e) => upd({ treatment: e.target.value })} className={cn(inputCls, "mt-1")} /></label>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </fieldset>
  );

  const medTable = (label: string, rows: MedRow[], set: (r: MedRow[]) => void) => (
    <div>
      <p className="text-green-900">{label}</p>
      <div className="mt-4 space-y-4">
        {rows.map((r, i) => {
          const upd = (k: keyof MedRow, v: string) => set(rows.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
          return (
            <div key={i} className="grid gap-3 rounded-2xl bg-card p-4 ring-1 ring-green-100 sm:grid-cols-2">
              <label className="text-sm">Medication/treatment and date started<input value={r.med} onChange={(e) => upd("med", e.target.value)} className={cn(inputCls, "mt-1")} /></label>
              <label className="text-sm">Dosage/frequency<input value={r.dosage} onChange={(e) => upd("dosage", e.target.value)} className={cn(inputCls, "mt-1")} /></label>
              <label className="text-sm">Condition being treated<input value={r.condition} onChange={(e) => upd("condition", e.target.value)} className={cn(inputCls, "mt-1")} /></label>
              <label className="text-sm">Is it helpful?<input value={r.helpful} onChange={(e) => upd("helpful", e.target.value)} className={cn(inputCls, "mt-1")} /></label>
              {rows.length > 1 ? (
                <button type="button" onClick={() => set(rows.filter((_, j) => j !== i))} className="inline-flex items-center gap-2 text-sm text-rose-600 sm:col-span-2">
                  <Trash2 className="h-4 w-4" /> Remove row
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
      {rows.length < 30 ? (
        <button type="button" onClick={() => set([...rows, { ...emptyRow }])} className="mt-3 inline-flex items-center gap-2 rounded-full border border-green-300 px-4 py-2 text-sm text-green-800 hover:bg-green-50">
          <Plus className="h-4 w-4" /> Add row
        </button>
      ) : null}
    </div>
  );

  const familyGrid = (question: string) => (
    <div>
      <p className="text-green-900">{question}</p>
      <div className="mt-4 space-y-4">
        {FAMILY_ROWS.map((row) => (
          <div key={row} className="rounded-2xl bg-card p-4 ring-1 ring-green-100">
            <p className="font-display text-lg">{row}</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {FAMILY_SIDES.map((side) => (
                <label key={side} className="text-sm">
                  {side}
                  <input value={family[`${row}|${side}`] ?? ""} onChange={(e) => setFamily((p) => ({ ...p, [`${row}|${side}`]: e.target.value }))} className={cn(inputCls, "mt-1")} />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const gpBlock = (question: string) => (
    <div>
      <p className="text-green-900">{question}</p>
      <div className="mt-4 grid gap-4">
        {(["name", "address", "phone"] as const).map((k) => (
          <label key={k} className="block">
            <Label>{k[0]!.toUpperCase() + k.slice(1)}</Label>
            <input value={gp[k]} onChange={(e) => setGp((p) => ({ ...p, [k]: e.target.value }))} className={inputCls} />
          </label>
        ))}
      </div>
    </div>
  );

  const historyFields = (
    <div className="space-y-5">
      <p className="text-green-900">Please provide brief details (including month/year) of any of the following:</p>
      <T k="Surgical procedures or major dental work" label="Surgical procedures or major dental work (please note if anaesthesia was necessary)" />
      <T k="Accidents" label="Accidents (falls, head injuries, etc.)" />
      <T k="Serious illness" label="Serious illness" />
      <T k="Hospitalisation and pregnancies" label={isChild ? "Hospitalisation" : "Hospitalisation (please also list any pregnancies with dates)"} />
    </div>
  );

  const addressFields = (
    <>
      <I k="address1" label="Address line 1" required />
      <I k="address2" label="Address line 2" />
      <div className="grid gap-5 sm:grid-cols-2">
        <I k="city" label="Town/city" required />
        <I k="postcode" label="Postcode" required />
      </div>
      <I k="country" label="Country" />
    </>
  );

  type StepDef = { title: string; required?: (keyof Details)[]; requiredText?: TextKey[]; body: ReactNode };

  const finalStep: StepDef = {
    title: "Agreement and consent",
    body: (
      <div className="space-y-5">
        <label className="flex gap-3">
          <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-green-700" />
          <span>
            I have read and accept the{" "}
            <a href="/terms" target="_blank" rel="noopener noreferrer" className={linkCls}>Terms and Conditions</a>
            , including the Patient - Therapist Agreement.<span className="text-rose-600"> *</span>
          </span>
        </label>
        <label className="flex gap-3">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-green-700" />
          <span>
            {parentConsent
              ? "As parent or guardian, I consent to homeopathic treatment for my child with Nataša Perić."
              : "I consent to homeopathic treatment with Nataša Perić."}
            <span className="text-rose-600"> *</span>
          </span>
        </label>
        <label className="block">
          <Label required>Type your full name as your signature</Label>
          <input value={signature} onChange={(e) => setSignature(e.target.value)} maxLength={200} className={inputCls} />
        </label>
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label>Company<input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} /></label>
        </div>
      </div>
    ),
  };

  const adultSteps: StepDef[] = [
    {
      title: "Your details",
      required: ["firstName", "lastName", "dob", "address1", "city", "postcode", "email", "phone", ...(isMinorAdult ? (["parentName"] as const) : [])],
      body: (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <I k="firstName" label="First name" required />
            <I k="lastName" label="Last name" required />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <I k="dob" label="Date of birth" type="date" required />
            <I k="age" label="Age" />
          </div>
          {isMinorAdult ? <I k="parentName" label="Name of parent or guardian" required /> : null}
          {addressFields}
          <div className="grid gap-5 sm:grid-cols-2">
            <I k="email" label="Email" type="email" required />
            <I k="phone" label="Phone" type="tel" required />
          </div>
          <T k="Occupation" label="Occupation" rows={1} />
        </div>
      ),
    },
    {
      title: "Health profile",
      requiredText: ["Main reason for consultation"],
      body: (
        <div className="space-y-6">
          <T k="Main reason for consultation" label="What is your main reason for seeking homeopathic consultation?" rows={5} required />
          {illnessBlock("Have you ever had any of the following?")}
          <T k="Other illnesses" label="Have you had any other illnesses? If so, please state age/s and duration." />
          <T k="Recurrent health problems" label="Do you have any recurrent health problems?" />
          <T k="Immunisation history" label="What is your immunisation history (including travel vaccinations and flu vaccinations)? Please state age/s and note any adverse reaction." />
          <T k="Allergies or intolerances" label="Please list any allergies or intolerances." />
          <T k="Skin complaints" label="Please note if you have or have had any of the following skin complaints and at what age/s: warts, verrucae, herpes (cold sores), abscesses, boils, moles, eczema, impetigo, ringworm, molluscum, or other." />
        </div>
      ),
    },
    { title: "History", body: historyFields },
    {
      title: "Medication, remedies and treatments",
      body: (
        <div className="space-y-8">
          {medTable("Please list anything you currently take regularly, including GP prescribed medication, self-prescribed medication (e.g. painkillers, statins, antidepressants, contraceptives), nutritional supplements, herbal or homeopathic remedies, and any other alternative treatments.", currentMeds, setCurrentMeds)}
          <T k="Recent antibiotics" label="Have you taken antibiotics in the last six months? If so, why?" />
          {medTable("Please list any previous medication (e.g. antibiotics, painkillers, statins, antidepressants, contraceptives) and any recreational drugs used.", previousMeds, setPreviousMeds)}
        </div>
      ),
    },
    { title: "Family history", body: familyGrid("Where possible, please provide details of any physical or emotional health problems in your family history, e.g. allergies, heart disease, diabetes, cancer, asthma, eczema, tuberculosis, depression, mental illness, disabilities, alcoholism or other.") },
    { title: "Health care providers", body: gpBlock("Please give details of your GP and/or specialist if appropriate.") },
    finalStep,
  ];

  const childSteps: StepDef[] = [
    {
      title: "Your child's details",
      required: ["firstName", "lastName", "dob", "parentName", "address1", "city", "postcode", "email", "phone"],
      body: (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <I k="firstName" label="Child's first name" required />
            <I k="lastName" label="Child's last name" required />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <I k="dob" label="Child's date of birth" type="date" required />
            <I k="age" label="Age" />
          </div>
          <I k="parentName" label="Name of parent/s" required />
          {addressFields}
          <div className="grid gap-5 sm:grid-cols-2">
            <I k="email" label="Parent's email" type="email" required />
            <I k="phone" label="Parent's phone" type="tel" required />
          </div>
        </div>
      ),
    },
    {
      title: "Health profile",
      requiredText: ["Main reason for consultation"],
      body: <T k="Main reason for consultation" label="What is your main reason for seeking homeopathic treatment for your child?" rows={6} required />,
    },
    {
      title: "Conception and pregnancy",
      body: (
        <div className="space-y-5">
          <label className="block">
            <Label>Was your child naturally conceived?</Label>
            <textarea rows={2} value={conception.natural} onChange={(e) => setConception((p) => ({ ...p, natural: e.target.value }))} className={inputCls} />
          </label>
          <label className="block">
            <Label>Did you take the contraceptive pill before conception? Did you take any supplements before or during pregnancy?</Label>
            <textarea rows={3} value={conception.pill} onChange={(e) => setConception((p) => ({ ...p, pill: e.target.value }))} className={inputCls} />
          </label>
          <T k="Medications during pregnancy" label="Did you take any medication during pregnancy?" />
          <T k="Mother's emotional state in pregnancy" label="What was the mother's predominant emotional state while pregnant with this child? Were there any particular shocks, traumas or losses?" />
          <T k="New symptoms in pregnancy" label="Were there any new symptoms in pregnancy, such as gestational diabetes or eczema?" />
          <T k="Type of birth" label="What type of birth was it? Please include the expected due date and whether the birth was induced, assisted (e.g. forceps), etc." />
          <T k="How mother felt about the birth" label="How did the mother feel about the birth?" />
        </div>
      ),
    },
    {
      title: "Developmental milestones",
      body: (
        <div className="space-y-5">
          <T k="Feeding" label="How was your child fed (breastfed, formula: cow's or goat's)? Were there any reactions?" />
          <T k="Weaning" label="Weaning: were there any reactions (e.g. changes in bowel movements or skin)?" />
          <T k="Teething" label="Teething: when did the first milk teeth and first permanent teeth appear? Were there any fevers or infections (e.g. ear, chest, colds) with teething?" />
          <T k="Talking" label="Talking: at what age, and is there anything worth noting?" rows={2} />
          <T k="Walking" label="Walking: at what age?" rows={1} />
          <T k="Toilet training" label="Toilet training: at what age, and were there any problems, including bed wetting?" rows={2} />
        </div>
      ),
    },
    {
      title: "Social behaviour",
      body: (
        <div className="space-y-5">
          <p className="text-green-900">How did your child react to the following situations? Please include mental and emotional reactions and any physical symptoms that developed.</p>
          <T k="Reaction to birth of younger sibling" label="Birth of a younger sibling (e.g. ear aches, diarrhoea, anger, clinginess)" />
          <T k="Reaction to starting day-care" label="Starting day-care" />
          <T k="Reaction to first day of school" label="First day of school" />
        </div>
      ),
    },
    {
      title: "Childhood illnesses",
      body: (
        <div className="space-y-6">
          {illnessBlock("Has your child ever had any of the following?")}
          <T k="Other illnesses" label="Has your child had any other illnesses? If so, please state age/s and duration." />
          <T k="Immunisation history" label="What is your child's vaccination history (including travel vaccinations)? Please state age/s and note any adverse reaction (e.g. fever, chest infection, ear infection, crying, disturbed sleep, weakness)." />
          <T k="Allergies or intolerances" label="Please list any allergies or intolerances." />
          {historyFields}
          <T k="Skin complaints" label="Please note if your child has or has had any of the following skin complaints and at what age/s and for how long: warts, verrucae, herpes (cold sores), abscesses, boils, moles, eczema, impetigo, ringworm, molluscum, or other." />
          <T k="Skin conditions treated with cortisone cream" label="Has your child had any skin conditions treated with cortisone cream?" />
        </div>
      ),
    },
    {
      title: "Medication",
      body: (
        <div className="space-y-8">
          {medTable("Please list anything your child currently takes regularly, including GP prescribed medication, self-prescribed medication (e.g. antibiotics, corticosteroid cream, antihistamines), nutritional supplements, herbal or homeopathic remedies.", currentMeds, setCurrentMeds)}
          <T k="Recent antibiotics" label="Has your child taken antibiotics in the last three months? If so, why?" />
          {medTable("Please list any previous medication (e.g. antibiotics, corticosteroid cream, antihistamines).", previousMeds, setPreviousMeds)}
        </div>
      ),
    },
    { title: "Family history", body: familyGrid("Where possible, please provide details of any physical or emotional health problems in your child's family history, e.g. allergies, heart disease, diabetes, cancer, asthma, eczema, tuberculosis, depression, mental illness, disabilities, alcoholism or other.") },
    { title: "Health care providers", body: gpBlock("Please give details of your child's GP and/or specialist if appropriate.") },
    finalStep,
  ];

  const steps = path === "child" ? childSteps : adultSteps;
  const total = steps.length + 1;
  const current = step === 0 ? null : steps[step - 1]!;

  const validate = (): string => {
    if (step === 0) return path ? "" : "Please choose who this questionnaire is for.";
    if (!current) return "";
    const missing = (current.required ?? []).filter((k) => !d[k].trim());
    const missingText = (current.requiredText ?? []).filter((k) => !(text[k] ?? "").trim());
    if (missing.length || missingText.length) return "Please complete the fields marked with an asterisk.";
    if (current.required?.includes("email") && !/^\S+@\S+\.\S+$/.test(d.email)) return "Please enter a valid email address.";
    if (current === finalStep && (!terms || !consent || signature.trim().length < 2))
      return "Please tick both boxes and type your full name.";
    return "";
  };

  const payload = useMemo(
    () => () => ({
      path: path!,
      ...d,
      text: Object.fromEntries(Object.entries(text).filter(([, v]) => v && v.trim())),
      conceptionNatural: isChild ? conception.natural : "",
      conceptionPill: isChild ? conception.pill : "",
      illnesses: ILLNESSES.filter((n) => ill[n]?.on).map((n) => ({ name: n, age: ill[n]!.age, treatment: ill[n]!.treatment })),
      currentMeds,
      previousMeds,
      family,
      gp,
      terms: true as const,
      consent: true as const,
      signature,
      company,
      parentName: isChild || isMinorAdult ? d.parentName : "",
    }),
    [path, d, text, conception, ill, currentMeds, previousMeds, family, gp, signature, company, isChild, isMinorAdult],
  );

  const next = async () => {
    const msg = validate();
    setError(msg);
    if (msg) return;
    if (step < total - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setState("sending");
    try {
      const res = await send({ data: payload() });
      if (!res.ok) throw new Error(res.error);
      setState("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      console.error("questionnaire submission failed", e);
      setState("idle");
      setError("Sorry, your questionnaire could not be sent. Please try again, or email hello@homeopathywithnatasa.co.uk.");
    }
  };

  return (
    <Ctx.Provider value={{ text, setText: (k, v) => setText((p) => ({ ...p, [k]: v })), d, setDetail }}>
    <SiteLayout footerFrom="background">
      <header className="bg-green-50">
        <div className="container-prose pt-14 pb-12 md:pt-20 md:pb-16">
          <p className="text-sm text-green-700">Nataša Perić, PhD, BSc (Hons), LCHE, Registered Homeopath</p>
          <h1 className="mt-3 text-4xl md:text-5xl">New Patient Questionnaire</h1>
          <p className="mt-3 text-sm tracking-wide text-rose-600 uppercase">Confidential</p>
          <p className="mt-5 text-green-900/90">
            This form provides information to help me analyse your health history and needs and manage your treatment. Your information will be held securely and used only in connection with your treatment. Please fill it in as completely as possible before your first appointment, including any dates of illnesses, tests, vaccinations and medications.
          </p>
        </div>
      </header>

      <Section>
        {state === "sent" ? (
          <p role="status" className="rounded-2xl bg-green-100 px-6 py-8 text-lg text-green-900">
            Thank you. Your questionnaire has been sent securely. I look forward to meeting you.
          </p>
        ) : (
          <div>
            <div className="mb-8">
              <p className="text-sm text-muted-foreground">
                Step {step + 1} of {path ? total : "…"}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-green-100">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${path ? ((step + 1) / total) * 100 : 5}%` }} />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl">{current ? current.title : "Who is this questionnaire for?"}<span className="text-rose-600">{current ? "" : " *"}</span></h2>
            <div className="mt-8">
              {step === 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {([["adult", "An adult (16 or over)"], ["child", "A child (under 16)"]] as const).map(([v, l]) => (
                    <label key={v} className={cn("flex cursor-pointer items-center gap-3 rounded-2xl bg-card px-5 py-4 ring-1 ring-green-100", path === v && "ring-2 ring-green-600")}>
                      <input type="radio" name="who" checked={path === v} onChange={() => setPath(v)} className="accent-green-700" />
                      {l}
                    </label>
                  ))}
                </div>
              ) : (
                current?.body
              )}
            </div>

            {error ? <p role="alert" className="mt-6 rounded-2xl bg-rose-300/25 px-5 py-3 text-rose-600">{error}</p> : null}

            <div className="mt-10 flex items-center justify-between gap-3">
              {step > 0 ? (
                <button type="button" onClick={() => { setError(""); setStep(step - 1); }} className="rounded-full border border-green-300 px-6 py-3 text-green-800 hover:bg-green-50">
                  Back
                </button>
              ) : <span />}
              <button type="button" onClick={next} disabled={state === "sending"} className="rounded-full bg-primary px-6 py-3 text-primary-foreground hover:bg-green-800 disabled:opacity-60">
                {step === total - 1 ? (state === "sending" ? "Sending…" : "Send my questionnaire") : "Next"}
              </button>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              Questions about this form? See the <Link to="/terms" className={linkCls}>Terms and Conditions</Link> or write to hello@homeopathywithnatasa.co.uk.
            </p>
          </div>
        )}
      </Section>
    </SiteLayout>
    </Ctx.Provider>
  );
}
