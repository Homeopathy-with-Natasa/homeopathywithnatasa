import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader, Prose, Section } from "@/components/site/blocks";
import { CONTACT_EMAIL } from "@/config/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | Homeopathy with Nataša" },
      {
        name: "description",
        content:
          "Terms and Conditions and Patient - Therapist Agreement for consultations, booking, payment, cancellations and use of this website.",
      },
      { property: "og:title", content: "Terms and Conditions | Homeopathy with Nataša" },
      {
        property: "og:description",
        content: "The terms on which consultations with Nataša Perić are provided.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Terms,
});

const a = "text-green-700 underline underline-offset-4 hover:text-green-600";
const Mail = () => (
  <a href={`mailto:${CONTACT_EMAIL}`} className={a}>
    {CONTACT_EMAIL}
  </a>
);
const In = ({ to, children }: { to: "/code-of-ethics" | "/new-patient-questionnaire" | "/privacy"; children: ReactNode }) => (
  <Link to={to} className={a}>
    {children}
  </Link>
);

const SECTIONS: { title: string; body: ReactNode }[] = [
  {
    title: "About",
    body: (
      <p>
        This website is operated by Nataša Perić, PhD, BSc (Hons), LCHE, a sole trader trading as
        Homeopathy with Nataša, practising in the United Kingdom. I am registered with the
        Complementary Therapists Association (CThA) and abide by a professional{" "}
        <In to="/code-of-ethics">Code of Ethics and Practice</In>. For any queries about these
        terms, please contact <Mail />.
      </p>
    ),
  },
  {
    title: "Our partnership",
    body: (
      <p>
        Thank you for choosing to work with me. Your homeopathy treatment is a partnership between
        us, built on mutual trust and respect. I encourage you to be open about your health and
        lifestyle, past and present. Your consultations are a space to discuss your symptoms in the
        context of your whole life: your schedule, daily routines, sleep habits, nutrition,
        skin-care and exercise all contribute to how you feel. Homeopathy is a collaborative
        process. The more you engage with your treatment, the more you will get from it. Small,
        consistent changes make a big difference over time.
      </p>
    ),
  },
  {
    title: "About homeopathy and your treatment",
    body: (
      <ul className="list-disc space-y-2 pl-5 marker:text-rose-500">
        <li>Homeopathy aims to gently support the body's own capacity to heal.</li>
        <li>Your treatment is tailored to you as an individual, not just your symptoms.</li>
        <li>
          Your progress will depend on the nature, severity and duration of your symptoms at the
          start of treatment.
        </li>
        <li>The body needs time to heal symptoms that have been suppressed with medication.</li>
        <li>
          Occasionally, previous symptoms may reappear, or symptoms may increase initially, during
          treatment. In homeopathic practice this is generally regarded as part of the healing
          process and is usually followed by improvement.
        </li>
        <li>
          The length of treatment varies. For more chronic cases a minimum of three appointments
          is recommended, with a review usually after three to four visits.
        </li>
      </ul>
    ),
  },
  {
    title: "Consultations",
    body: (
      <>
        <p>
          Before your first appointment, please complete the{" "}
          <In to="/new-patient-questionnaire">New Patient Questionnaire</In> in as much detail as
          possible, including any dates of illnesses, tests, vaccinations and medications.
        </p>
        <p>
          The first adult consultation lasts up to an hour and a half (children under 16: up to one
          hour). We will discuss your current health needs, health history, family health traits,
          major life events, and lifestyle factors including diet and sleep.
        </p>
        <p>
          Prescribing is based on all aspects of your condition: its causes, your mental, emotional
          and physical states, personality, lifestyle, and inherited and environmental factors.
          Each prescription is personalised and may incorporate homeopathy, human chemistry
          integrated therapy, homeobotanicals, tissue salts or flower essences, together with
          dietary advice. Remedies may be given at the end of the appointment or sent to you
          shortly after, once I have had time to consider the full picture.
        </p>
        <p>
          For ongoing or long-standing complaints, follow-up consultations are recommended every
          four to six weeks and last up to 45 minutes (children: up to 30 minutes). You will be
          asked about any changes since your last consultation.
        </p>
      </>
    ),
  },
  {
    title: "Fees and remedies",
    body: (
      <p>
        Current fees are shown on the Consultations and Supervision pages. Your first consultation
        fee includes any remedies prescribed at that appointment, excluding HDT (homeopathic
        detox/balancing) and human chemistry integrated therapy remedies. Homeobotanical blends are
        £25. Remedies prescribed at follow-up appointments may be charged separately; I will always
        tell you the cost before posting them. Postage may be charged separately depending on
        destination.
      </p>
    ),
  },
  {
    title: "Appointments, booking and payment",
    body: (
      <p>
        Appointments are booked online through Cal.com and take place by Google Meet. Full payment
        is taken at the time of booking and secures your appointment. Payments are processed
        securely by Stripe; I do not store or have access to your card details (see{" "}
        <a href="https://stripe.com/gb/privacy" target="_blank" rel="noopener noreferrer" className={a}>
          stripe.com/gb/privacy
        </a>
        ). You will receive a confirmation email with a link to reschedule or cancel. When you pay,
        you will be asked to confirm that you accept these Terms and Conditions.
      </p>
    ),
  },
  {
    title: "Cancellations",
    body: (
      <p>
        If you are unable to attend, please give at least 24 hours' notice using the link in your
        confirmation email or by emailing <Mail />. Late cancellations (less than 24 hours) and
        missed appointments are charged at the full consultation rate. If I need to cancel or
        reschedule, I will give you as much notice as possible and offer an alternative appointment
        or a full refund.
      </p>
    ),
  },
  {
    title: "My commitment to you",
    body: (
      <p>
        I work with you and for you. You can expect me to be honest, open, non-judgemental and
        professional in all our interactions. If you have any queries about your treatment, please
        contact me by email. I check and respond to emails on most weekdays, though response times
        may vary depending on my schedule.
      </p>
    ),
  },
  {
    title: "Your commitment to me",
    body: (
      <p>
        Please attend your appointments and give them priority. Continue to work with your GP or
        medical team for any urgent or ongoing medical needs, and please inform me of any changes
        to your medication or health during our time together. You may be advised to inform your GP
        of ongoing, serious or worsening conditions.
      </p>
    ),
  },
  {
    title: "Medical disclaimer",
    body: (
      <p>
        Homeopathy is a complementary therapy. It is not a substitute for emergency medical care or
        for treatment prescribed by a GP or specialist. In an emergency, call 999 or 111. The
        content of this website is for information and education only and is not medical advice,
        diagnosis or treatment.
      </p>
    ),
  },
  {
    title: "Children and young people",
    body: (
      <p>
        Patients under 16 must be accompanied by a parent or guardian, who completes the
        questionnaire and consents on their behalf. For patients under 18, a parent or guardian
        must also give consent.
      </p>
    ),
  },
  {
    title: "Confidentiality and data protection",
    body: (
      <>
        <p>
          Everything discussed during the homeopathic process remains strictly confidential within
          the bounds of my professional and legal obligations. All personal and health information
          you share is used only for the purpose of your homeopathic care and is stored securely in
          accordance with the Data Protection Act 2018 and UK GDPR. Information is only shared with
          your explicit consent or where required by law.
        </p>
        <p>
          What I collect: contact details (name, email, phone, address); health information you
          share in your questionnaire and consultations, held as your clinical record; payment
          information, which is processed and held by Stripe, not by me.
        </p>
        <p>
          Services I use to run my practice: Cal.com (booking), Stripe (payments), Google Workspace
          (email and video), Airtable (secure client records) and Lovable (website hosting), each
          with its own privacy policy.
        </p>
        <p>
          You have the right to access, correct or request deletion of your personal data, subject
          to my legal duty to keep clinical records. To exercise these rights, email <Mail />. See
          also my <In to="/privacy">Privacy Policy</In>.
        </p>
      </>
    ),
  },
  {
    title: "Intellectual property",
    body: (
      <p>
        All content on this website, including text, articles, written materials, photographs,
        images, graphics, logos and video, is the intellectual property of Nataša Perić unless
        otherwise stated. Written materials and protocols provided to you as part of your treatment
        are for your personal use only. You may not reproduce, copy, distribute, republish or use
        any of this content without my prior written permission. To request permission, contact{" "}
        <Mail />.
      </p>
    ),
  },
  {
    title: "Cookies",
    body: (
      <p>
        This website uses cookies to improve your browsing experience. You can manage cookies
        through the cookie banner or your browser settings.
      </p>
    ),
  },
  {
    title: "Limitation of liability",
    body: (
      <p>
        To the fullest extent permitted by law, I am not liable for any indirect, incidental or
        consequential loss arising from your use of this website or reliance on information on it.
        Nothing in these terms limits or excludes liability for death or personal injury caused by
        negligence, for fraud, or for any other liability that cannot lawfully be excluded.
      </p>
    ),
  },
  {
    title: "Changes to these terms",
    body: (
      <p>
        I may update these terms from time to time. Changes will be posted on this page with an
        updated date.
      </p>
    ),
  },
  {
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of England and Wales, and the courts of England and
        Wales have exclusive jurisdiction.
      </p>
    ),
  },
  {
    title: "Agreement and consent",
    body: (
      <p>
        By booking an appointment, you confirm that you have read and understood these terms, that
        you consent to homeopathic treatment with Nataša Perić, and that you understand homeopathy
        is a complementary therapy and not a substitute for emergency medical care or treatment
        prescribed by a GP or specialist.
      </p>
    ),
  },
];

function Terms() {
  return (
    <SiteLayout footerFrom="background">
      <PageHeader title="Terms and Conditions" standfirst="Last updated: 7 October 2026" />
      <Section>
        <Prose>
          <p>
            Please read these Terms and Conditions carefully before using this website or booking
            an appointment. By accessing this website, making a booking or completing the New
            Patient Questionnaire, you agree to these terms. They include my Patient - Therapist
            Agreement.
          </p>
        </Prose>
        <ol className="mt-12 space-y-10">
          {SECTIONS.map((s, i) => (
            <li key={s.title}>
              <h2 className="text-2xl md:text-3xl">
                <span className="font-display mr-3 text-rose-600">{i + 1}.</span>
                {s.title}
              </h2>
              <Prose className="mt-4">{s.body}</Prose>
            </li>
          ))}
        </ol>
        <div className="mt-14 rounded-2xl bg-green-100 p-6 text-green-900">
          <p>Nataša Perić</p>
          <p>Homeopathy with Nataša</p>
          <p>
            <Mail />
          </p>
          <p>homeopathywithnatasa.co.uk</p>
        </div>
      </Section>
    </SiteLayout>
  );
}
