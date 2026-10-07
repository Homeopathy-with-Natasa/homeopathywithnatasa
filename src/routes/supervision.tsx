import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FadeIn } from "@/components/site/FadeIn";
import { CurveDivider } from "@/components/site/CurveDivider";
import {
  EmailLink,
  PageHeader,
  Prose,
  QuoteRow,
  Section,
  SectionTitle,
  type QuoteItem,
} from "@/components/site/blocks";
import { BookingPanel } from "@/components/site/BookingPanel";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/supervision")({
  head: () => ({
    meta: [
      { title: "Supervision for homeopaths | Nataša Perić" },
      {
        name: "description",
        content:
          "One-to-one and small group supervision online for homeopathic students, graduates and practising homeopaths with Nataša Perić.",
      },
      { property: "og:title", content: "Supervision for homeopaths | Nataša Perić" },
      {
        property: "og:description",
        content: "Supportive one-to-one and small group supervision, held online. Book directly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Supervision,
});

const split = (text: string) => text.split("\n\n").map((p, i) => <p key={i}>{p}</p>);

function Supervision() {
  const { t, tAny } = useI18n();

  return (
    <SiteLayout footerFrom="background">
      <PageHeader title={t("supervision.title")} standfirst={t("supervision.standfirst")} />

      <Section>
        <FadeIn>
          <Prose>{split(t("supervision.introBody"))}</Prose>
        </FadeIn>
        <FadeIn className="mt-14">
          <SectionTitle>{t("supervision.workingTitle")}</SectionTitle>
          <Prose className="mt-6">{split(t("supervision.workingBody"))}</Prose>
        </FadeIn>
      </Section>

      <CurveDivider variant="soft" from="background" fill="muted" />
      <Section tone="muted" prose={false}>
        <FadeIn>
          <SectionTitle>{t("supervision.quotesTitle")}</SectionTitle>
        </FadeIn>
        <QuoteRow quotes={tAny<QuoteItem[]>("supervision.quotes")} />
      </Section>
      <CurveDivider variant="soft" from="muted" fill="background" />

      <Section prose={false}>
        <BookingPanel
          group="supervision"
          aside={
            <div className="rounded-2xl bg-green-100 p-6 md:p-7">
              <h2 className="text-2xl">{t("supervision.contactTitle")}</h2>
              <p className="mt-3 text-green-900/90">{t("supervision.contactBody")}</p>
              <EmailLink className="mt-6 bg-card" />
            </div>
          }
        />
      </Section>
    </SiteLayout>
  );
}
