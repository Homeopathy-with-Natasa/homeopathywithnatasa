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
  type PriceRow,
  type QuoteItem,
} from "@/components/site/blocks";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/supervision")({
  head: () => ({
    meta: [
      { title: "Supervision for homeopaths | Nataša Perić" },
      {
        name: "description",
        content:
          "One-to-one and small group supervision for homeopathy students and qualified practitioners with Nataša Perić.",
      },
      { property: "og:title", content: "Supervision for homeopaths | Nataša Perić" },
      {
        property: "og:description",
        content:
          "Supportive one-to-one and small group supervision for homeopathy students and qualified practitioners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Supervision,
});

function Supervision() {
  const { t, tAny } = useI18n();

  return (
    <SiteLayout>
      <PageHeader title={t("supervision.title")} standfirst={t("supervision.standfirst")} />

      <Section>
        <FadeIn>
          <Prose>
            <p>{t("supervision.introBody")}</p>
          </Prose>
        </FadeIn>
        <FadeIn className="mt-14">
          <SectionTitle>{t("supervision.recognitionTitle")}</SectionTitle>
        </FadeIn>
        <RecognitionList items={tAny<string[]>("supervision.recognitionItems")} />

        <FadeIn className="mt-14">
          <SectionTitle>{t("supervision.forTitle")}</SectionTitle>
          <PlainList items={tAny<string[]>("supervision.forItems")} />
        </FadeIn>
      </Section>

      <CurveDivider variant="soft" from="background" fill="muted" />
      <Section tone="muted">
        <FadeIn>
          <SectionTitle>{t("supervision.oneToOneTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("supervision.oneToOneBody")}</p>
          </Prose>
        </FadeIn>
        <FadeIn className="mt-14">
          <SectionTitle>{t("supervision.groupTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("supervision.groupBody")}</p>
          </Prose>
        </FadeIn>
      </Section>
      <CurveDivider variant="soft" from="muted" fill="background" />

      <Section>
        <FadeIn>
          <SectionTitle>{t("supervision.backgroundTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("supervision.backgroundBody")}</p>
          </Prose>
        </FadeIn>

        <FadeIn className="mt-14">
          <SectionTitle>{t("supervision.quotesTitle")}</SectionTitle>
        </FadeIn>
        <QuoteRow quotes={tAny<QuoteItem[]>("supervision.quotes")} />

        <FadeIn className="mt-14">
          <SectionTitle>{t("supervision.pricingTitle")}</SectionTitle>
          <PriceTable
            rows={tAny<PriceRow[]>("supervision.priceRows")}
            note={t("supervision.pricingNote")}
          />
        </FadeIn>
      </Section>

      <CtaBand
        title={t("supervision.closingTitle")}
        body={t("supervision.closingBody")}
        supervision
      />
    </SiteLayout>
  );
}