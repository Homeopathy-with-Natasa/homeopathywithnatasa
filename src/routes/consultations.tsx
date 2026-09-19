import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FadeIn } from "@/components/site/FadeIn";
import { CurveDivider } from "@/components/site/CurveDivider";
import { ClientPhoto } from "@/components/site/ClientPhoto";
import {
  CardList,
  ContactForm,
  CtaBand,
  PageHeader,
  PriceTable,
  Prose,
  QuoteRow,
  Section,
  SectionTitle,
  StepList,
  type PriceRow,
  type QuoteItem,
  type Step,
} from "@/components/site/blocks";
import { useI18n } from "@/i18n/LanguageProvider";
import hawthornBlossom from "@/assets/hawthorn-blossom.jpg.asset.json";

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

      <CurveDivider variant="soft" from="background" fill="muted" />
      <Section tone="muted">
        <FadeIn>
          <SectionTitle>{t("consultations.formatTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("consultations.formatBody")}</p>
          </Prose>
        </FadeIn>
      </Section>
      <CurveDivider variant="soft" from="muted" fill="background" />

      <Section>
        <FadeIn className="mb-16">
          <ClientPhoto
            src={hawthornBlossom.url}
            alt={t("consultations.hawthornImageAlt")}
            placeholder={t("consultations.hawthornImagePlaceholder")}
            width={1200}
            height={1600}
            className="h-auto w-full rounded-2xl"
            placeholderClassName="flex w-full items-center justify-center rounded-2xl bg-green-100 px-6 text-center text-sm text-green-700"
          />
        </FadeIn>
        <FadeIn>
          <SectionTitle>{t("consultations.pricingTitle")}</SectionTitle>
          <PriceTable
            rows={tAny<PriceRow[]>("consultations.priceRows")}
            note={t("consultations.pricingNote")}
          />
        </FadeIn>

        <FadeIn className="mt-14">
          <SectionTitle>{t("consultations.hoursTitle")}</SectionTitle>
          <PriceTable rows={tAny<PriceRow[]>("consultations.hoursRows")} />
        </FadeIn>

        <FadeIn className="mt-14">
          <SectionTitle>{t("consultations.cancellationTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("consultations.cancellationBody")}</p>
          </Prose>
        </FadeIn>
      </Section>

      <CurveDivider variant="wave" from="background" fill="muted" />
      <Section tone="muted">
        <FadeIn>
          <SectionTitle>{t("consultations.nextTitle")}</SectionTitle>
        </FadeIn>
        <StepList steps={tAny<Step[]>("consultations.nextSteps")} roseNumbers />

        <FadeIn className="mt-14">
          <SectionTitle>{t("consultations.quotesTitle")}</SectionTitle>
          <QuoteRow quotes={tAny<QuoteItem[]>("consultations.quotes")} />
        </FadeIn>
      </Section>
      <CurveDivider variant="wave" from="muted" fill="background" />

      <Section>
        <FadeIn>
          <div id="contact" className="scroll-mt-24">
            <ContactForm />
          </div>
        </FadeIn>
      </Section>

      <CtaBand title={t("consultations.closingTitle")} body={t("consultations.closingBody")} />
    </SiteLayout>
  );
}
