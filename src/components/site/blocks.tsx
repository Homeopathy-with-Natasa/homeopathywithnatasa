import { useState, type FormEvent, type ReactNode } from "react";
import { useI18n } from "@/i18n/LanguageProvider";
import {
  bookingLink,
  mailtoLink,
  mentoringLink,
  CONTACT_EMAIL,
  CONTACT_FORM_ENDPOINT,
  isContactFormConfigured,
} from "@/config/site";
import { cn } from "@/lib/utils";
import natasaPortrait from "@/assets/natasa.jpg.asset.json";
import { FadeIn } from "./FadeIn";
import { CurveDivider } from "./CurveDivider";

/* ---------------------------------------------------------------- buttons */

export function BookButton({
  variant = "primary",
  mentoring = false,
  label,
}: {
  variant?: "primary" | "accent" | "quiet";
  mentoring?: boolean;
  label?: string;
}) {
  const { t, lang } = useI18n();
  const href = mentoring ? mentoringLink(lang) : bookingLink(lang);
  const text = label ?? t(mentoring ? "cta.bookMentoring" : "cta.book");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-[0.98rem] transition-colors",
        variant === "primary" && "bg-primary text-primary-foreground hover:bg-green-800",
        variant === "accent" && "bg-accent text-accent-foreground hover:bg-rose-600",
        variant === "quiet" && "border border-green-300 text-green-800 hover:bg-green-50",
      )}
    >
      {text}
    </a>
  );
}

export function EmailLink({ className }: { className?: string }) {
  const { t, lang } = useI18n();
  return (
    <a
      href={mailtoLink(lang)}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-green-300 px-6 py-3 text-[0.98rem] text-green-800 transition-colors hover:bg-green-50",
        className,
      )}
    >
      {t("cta.email")}
    </a>
  );
}

/* --------------------------------------------------------------- headings */

export function PageHeader({ title, standfirst }: { title: string; standfirst: string }) {
  return (
    <header className="bg-green-50">
      <div className="container-prose pt-16 pb-14 md:pt-24 md:pb-20">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl">{title}</h1>
          <p className="mt-6 text-lg text-green-700 md:text-xl">{standfirst}</p>
        </FadeIn>
      </div>
      <CurveDivider variant="soft" fill="background" />
    </header>
  );
}

export function Section({
  children,
  tone = "background",
  prose = true,
  className,
}: {
  children: ReactNode;
  tone?: "background" | "muted" | "green-100";
  prose?: boolean;
  className?: string;
}) {
  const toneClass = {
    background: "bg-background",
    muted: "bg-muted",
    "green-100": "bg-green-100",
  }[tone];

  return (
    <section className={cn("section-y", toneClass, className)}>
      <div className={prose ? "container-prose" : "container-site"}>{children}</div>
    </section>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-3xl md:text-4xl">{children}</h2>;
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("space-y-5 text-green-900/90", className)}>{children}</div>;
}

/* ------------------------------------------------------------------ lists */

export function RecognitionList({ items }: { items: string[] }) {
  return (
    <ul className="mt-10 space-y-6 md:space-y-7">
      {items.map((item, i) => (
        <FadeIn as="li" key={i} delay={i * 70} className="border-l-2 border-green-200 pl-5">
          <p className="text-lg text-green-900/90">{item}</p>
        </FadeIn>
      ))}
    </ul>
  );
}

export function PlainList({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-green-900/90">
          <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export type Step = { heading: string; body: string };

export function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="mt-10 space-y-8">
      {steps.map((step, i) => (
        <FadeIn as="li" key={i} delay={i * 60} className="flex gap-5">
          <span className="font-display mt-0.5 w-7 shrink-0 text-lg text-green-400">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-xl">{step.heading}</h3>
            <p className="mt-2 text-green-900/90">{step.body}</p>
          </div>
        </FadeIn>
      ))}
    </ol>
  );
}

export function CardList({ items }: { items: Step[] }) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {items.map((item, i) => (
        <FadeIn key={i} delay={i * 80} className="rounded-2xl bg-card p-7 ring-1 ring-green-100">
          <h3 className="text-xl">{item.heading}</h3>
          <p className="mt-3 text-[0.98rem] text-green-900/85">{item.body}</p>
        </FadeIn>
      ))}
    </div>
  );
}

export type PriceRow = { label: string; value: string };

export function PriceTable({ rows, note }: { rows: PriceRow[]; note?: string }) {
  return (
    <div className="mt-8">
      <dl className="divide-y divide-green-100 overflow-hidden rounded-2xl bg-card ring-1 ring-green-100">
        {rows.map((row, i) => (
          <div key={i} className="flex flex-wrap items-baseline justify-between gap-2 px-6 py-5">
            <dt className="text-green-900/90">{row.label}</dt>
            <dd className="font-display text-lg text-green-700">{row.value}</dd>
          </div>
        ))}
      </dl>
      {note ? <p className="mt-4 text-sm text-muted-foreground">{note}</p> : null}
    </div>
  );
}

export type QuoteItem = { text: string; author: string };

export function QuoteRow({ quotes }: { quotes: QuoteItem[] }) {
  return (
    <div className={cn("mt-10 grid gap-8", quotes.length > 1 && "md:grid-cols-3")}>
      {quotes.map((q, i) => (
        <FadeIn key={i} delay={i * 90} as="article">
          <blockquote className="text-lg leading-relaxed text-green-800">
            <p>{q.text}</p>
            <footer className="mt-4 text-sm text-muted-foreground">{q.author}</footer>
          </blockquote>
        </FadeIn>
      ))}
    </div>
  );
}

export function CredentialsList({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 divide-y divide-green-100 border-y border-green-100">
      {items.map((item, i) => (
        <li key={i} className="py-4 text-green-900/90">
          {item}
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------------------------------------- portrait */

/**
 * PORTRAIT PLACEHOLDER SLOT.
 * TODO: replace with the real photograph, imported from src/assets.
 * Real photographs only. No stock imagery.
 */
export function PortraitSlot({
  label,
  className,
  ratio = "aspect-[5/6]",
  src = natasaPortrait.url,
}: {
  label: string;
  className?: string;
  ratio?: string;
  src?: string | null;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-2xl bg-green-100 text-center ring-1 ring-green-200",
        ratio,
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <span className="p-6 text-sm text-green-700">{label}</span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------- newsletter */

export function NewsletterBlock() {
  const { t } = useI18n();
  const [done, setDone] = useState(false);

  // Not wired to anything yet. Nothing is sent or stored.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div className="rounded-3xl bg-green-100 px-7 py-10 md:px-12 md:py-12">
      <h2 className="text-2xl md:text-3xl">{t("newsletter.title")}</h2>
      <p className="mt-3 max-w-xl text-green-900/85">{t("newsletter.body")}</p>
      <form onSubmit={onSubmit} className="mt-6 flex max-w-lg flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">
          {t("newsletter.placeholder")}
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder={t("newsletter.placeholder")}
          className="flex-1 rounded-full border border-green-300 bg-card px-5 py-3 text-green-900 placeholder:text-muted-foreground focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-green-800"
        >
          {t("newsletter.button")}
        </button>
      </form>
      <p className="mt-3 text-sm text-muted-foreground">
        {done ? t("newsletter.success") : t("newsletter.note")}
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- cta */

export function CtaBand({
  title,
  body,
  mentoring = false,
}: {
  title: string;
  body: string;
  mentoring?: boolean;
}) {
  return (
    <>
      <CurveDivider variant="wave" fill="green-100" />
      <section className="section-y bg-green-100">
        <div className="container-prose text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl">{title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-green-900/85">{body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <BookButton variant="accent" mentoring={mentoring} />
              <EmailLink />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
