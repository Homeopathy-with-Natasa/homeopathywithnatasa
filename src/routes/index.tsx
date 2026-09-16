import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FadeIn } from "@/components/site/FadeIn";
import { CurveDivider } from "@/components/site/CurveDivider";
import {
  BookButton,
  CredentialsList,
  CtaBand,
  NewsletterBlock,
  PortraitSlot,
  Prose,
  QuoteRow,
  RecognitionList,
  Section,
  SectionTitle,
  type QuoteItem,
} from "@/components/site/blocks";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Homeopathy with Natasa | Homeopath in London" },
      {
        name: "description",
        content:
          "Nataša Perić, PhD, homeopath in private practice in London since 2009. Consultations in person in Telegraph Hill and online.",
      },
      { property: "og:title", content: "Homeopathy with Natasa | Homeopath in London" },
      {
        property: "og:description",
        content:
          "A homeopath in London who treats the body as one integrated system. In person in Telegraph Hill and online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, tAny } = useI18n();

  return (
    <SiteLayout>
      <section className="bg-green-50">
        <div className="container-site grid items-center gap-10 pt-14 pb-16 md:grid-cols-[1.25fr_1fr] md:gap-16 md:pt-24 md:pb-24">
          <FadeIn>
            <h1 className="text-4xl leading-[1.1] md:text-[3.25rem]">{t("home.heroTitle")}</h1>
            <p className="mt-6 max-w-xl text-lg text-green-700 md:text-xl">
              {t("home.heroSubtitle")}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <BookButton variant="accent" />
              <Link
                to="/homeopathy"
                className="inline-flex items-center rounded-full px-2 py-3 text-green-700 underline underline-offset-4 hover:text-green-600"
              >
                {t("cta.readMore")}
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">{t("home.heroNote")}</p>
          </FadeIn>

          <FadeIn delay={120} className="mx-auto w-full max-w-[300px]">
            {/* IMAGE PLACEHOLDER: natasa-home.jpg, 300 x 360, radius 16px */}
            <PortraitSlot label={t("images.homePortraitLabel")} className="rounded-2xl" />
          </FadeIn>
        </div>
        <CurveDivider variant="soft" fill="background" />
      </section>

      <Section>
        <FadeIn>
          <SectionTitle>{t("home.introTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("home.introBody")}</p>
            <p>{t("home.introBody2")}</p>
          </Prose>
        </FadeIn>
      </Section>

      <CurveDivider variant="deep" fill="muted" />
      <Section tone="muted">
        <FadeIn>
          <SectionTitle>{t("home.recognitionTitle")}</SectionTitle>
        </FadeIn>
        <RecognitionList items={tAny<string[]>("home.recognitionItems")} />
      </Section>
      <CurveDivider variant="deep" fill="background" />

      <Section>
        <FadeIn>
          <SectionTitle>{t("home.whatTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("home.whatBody")}</p>
            <p>{t("home.whatBody2")}</p>
            <p>
              <Link
                to="/homeopathy"
                className="text-green-700 underline underline-offset-4 hover:text-green-600"
              >
                {t("cta.readMore")}
              </Link>
            </p>
          </Prose>
        </FadeIn>
      </Section>

      <CurveDivider variant="soft" fill="muted" />
      <Section tone="muted">
        <FadeIn>
          <SectionTitle>{t("home.credentialsTitle")}</SectionTitle>
          <CredentialsList items={tAny<string[]>("home.credentials")} />
        </FadeIn>
      </Section>
      <CurveDivider variant="soft" fill="background" />

      <Section prose={false}>
        <FadeIn>
          <SectionTitle>{t("home.quotesTitle")}</SectionTitle>
        </FadeIn>
        <QuoteRow quotes={tAny<QuoteItem[]>("home.quotes")} />
      </Section>

      <Section prose={false} className="pt-0">
        <FadeIn>
          <NewsletterBlock />
        </FadeIn>
      </Section>

      <CtaBand title={t("home.closingTitle")} body={t("home.closingBody")} />
    </SiteLayout>
  );
}
