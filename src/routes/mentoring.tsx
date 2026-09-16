import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FadeIn } from "@/components/site/FadeIn";
import { CurveDivider } from "@/components/site/CurveDivider";
import {
  CtaBand,
  PageHeader,
  PlainList,
  PriceTable,
  Prose,
  RecognitionList,
  QuoteRow,
  Section,
  SectionTitle,
  StepList,
  type PriceRow,
  type QuoteItem,
  type Step,
} from "@/components/site/blocks";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/mentoring")({
  head: () => ({
    meta: [
      { title: "Supervision and mentoring for homeopaths | Nataša Perić" },
      {
        name: "description",
        content:
          "One-to-one and small group supervision for homeopathy students and newly qualified practitioners, with a lecturer at the Centre for Homeopathic Education.",
      },
      { property: "og:title", content: "Supervision and mentoring for homeopaths" },
      {
        property: "og:description",
        content:
          "Practical supervision for students and newly qualified practitioners, one to one or in small groups.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Mentoring,
});

function Mentoring() {
  const { t, tAny } = useI18n();

  return (
    <SiteLayout>
      <PageHeader title={t("mentoring.title")} standfirst={t("mentoring.standfirst")} />

      <Section>
        <FadeIn>
          <SectionTitle>{t("mentoring.recognitionTitle")}</SectionTitle>
        </FadeIn>
        <RecognitionList items={tAny<string[]>("mentoring.recognitionItems")} />

        <FadeIn className="mt-14">
          <SectionTitle>{t("mentoring.forTitle")}</SectionTitle>
          <PlainList items={tAny<string[]>("mentoring.forItems")} />
        </FadeIn>
      </Section>


      <CurveDivider variant="soft" fill="muted" />
      <Section tone="muted">
        <FadeIn>
          <SectionTitle>{t("mentoring.oneToOneTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("mentoring.oneToOneBody")}</p>
          </Prose>
        </FadeIn>
        <FadeIn className="mt-14">
          <SectionTitle>{t("mentoring.groupTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("mentoring.groupBody")}</p>
          </Prose>
        </FadeIn>
      </Section>
      <CurveDivider variant="soft" fill="background" />

      <Section>
        <FadeIn>
          <SectionTitle>{t("mentoring.howTitle")}</SectionTitle>
        </FadeIn>
        <StepList steps={tAny<Step[]>("mentoring.howSteps")} />

        <FadeIn className="mt-14">
          <SectionTitle>{t("mentoring.backgroundTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("mentoring.backgroundBody")}</p>
          </Prose>
        </FadeIn>

        <FadeIn className="mt-14">
          <SectionTitle>{t("mentoring.pricingTitle")}</SectionTitle>
          <PriceTable
            rows={tAny<PriceRow[]>("mentoring.priceRows")}
            note={t("mentoring.pricingNote")}
          />
        </FadeIn>

        <QuoteRow quotes={tAny<QuoteItem[]>("mentoring.quotes")} />
      </Section>

      <CtaBand title={t("mentoring.closingTitle")} body={t("mentoring.closingBody")} mentoring />
    </SiteLayout>
  );
}
