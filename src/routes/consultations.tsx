import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FadeIn } from "@/components/site/FadeIn";
import { CurveDivider } from "@/components/site/CurveDivider";
import {
  CardList,
  CtaBand,
  PageHeader,
  PriceTable,
  Prose,
  Section,
  SectionTitle,
  StepList,
  type PriceRow,
  type Step,
} from "@/components/site/blocks";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/consultations")({
  head: () => ({
    meta: [
      { title: "Consultations and pricing | Homeopathy with Natasa, London" },
      {
        name: "description",
        content:
          "First consultations, follow-ups and acute support, in person in Telegraph Hill, London, or online. Fees, clinic hours and cancellation policy.",
      },
      { property: "og:title", content: "Consultations and pricing | Homeopathy with Natasa" },
      {
        property: "og:description",
        content:
          "How consultations work, what they cost, and what happens after you book. In person in London or online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Consultations,
});

function Consultations() {
  const { t, tAny } = useI18n();

  return (
    <SiteLayout>
      <PageHeader title={t("consultations.title")} standfirst={t("consultations.standfirst")} />

      <Section prose={false}>
        <FadeIn>
          <SectionTitle>{t("consultations.offerTitle")}</SectionTitle>
        </FadeIn>
        <CardList items={tAny<Step[]>("consultations.offers")} />
      </Section>

      <CurveDivider variant="soft" fill="muted" />
      <Section tone="muted">
        <FadeIn>
          <SectionTitle>{t("consultations.formatTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("consultations.formatBody")}</p>
          </Prose>
        </FadeIn>
      </Section>
      <CurveDivider variant="soft" fill="background" />

      <Section>
        <FadeIn>
          <SectionTitle>{t("consultations.pricingTitle")}</SectionTitle>
          <PriceTable
            rows={tAny<PriceRow[]>("consultations.priceRows")}
            note={t("consultations.pricingNote")}
          />
        </FadeIn>

        <FadeIn className="mt-14">
          <SectionTitle>{t("consultations.hoursTitle")}</SectionTitle>
          <PriceTable
            rows={tAny<PriceRow[]>("consultations.hoursRows")}
            note={t("consultations.hoursNote")}
          />
        </FadeIn>

        <FadeIn className="mt-14">
          <SectionTitle>{t("consultations.cancellationTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("consultations.cancellationBody")}</p>
          </Prose>
        </FadeIn>
      </Section>

      <CurveDivider variant="wave" fill="muted" />
      <Section tone="muted">
        <FadeIn>
          <SectionTitle>{t("consultations.nextTitle")}</SectionTitle>
        </FadeIn>
        <StepList steps={tAny<Step[]>("consultations.nextSteps")} />
      </Section>

      <CtaBand title={t("consultations.closingTitle")} body={t("consultations.closingBody")} />
    </SiteLayout>
  );
}
