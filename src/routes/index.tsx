import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FadeIn } from "@/components/site/FadeIn";
import { CurveDivider } from "@/components/site/CurveDivider";
import {
  BookButton,
  CtaBand,
  NewsletterBlock,
  PortraitSlot,
  Prose,
  QuoteRow,
  Section,
  SectionTitle,
  type QuoteItem,
} from "@/components/site/blocks";
import { useI18n } from "@/i18n/LanguageProvider";
import { SITE_URL } from "@/config/site";
import ogImage from "@/assets/og-image.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Homeopathy with Natasa | Homeopath in London" },
      {
        name: "description",
        content:
          "Nataša Perić, PhD, homeopath in private practice in London since 2009. Thoughtful, individualised consultations online by video.",
      },
      { property: "og:title", content: "Homeopathy with Natasa | Homeopath in London" },
      {
        property: "og:description",
        content:
          "Good care begins with listening. A homeopath who sees the body as one living, intelligent system.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE_URL + ogImage.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: SITE_URL + ogImage.url },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, tAny } = useI18n();

  return (
    <SiteLayout footerFrom="background">
      <section className="bg-green-50">
        <div className="container-site grid items-center gap-10 pt-14 pb-16 md:grid-cols-[1.25fr_1fr] md:gap-16 md:pt-24 md:pb-24">
          <FadeIn>
            <h1 className="text-4xl leading-[1.1] md:text-[3.25rem]">{t("home.heroTitle")}</h1>
            <p className="font-display mt-6 max-w-xl text-lg tracking-wide text-green-700 md:text-xl">
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
          </FadeIn>

          <FadeIn delay={120} className="mx-auto w-full max-w-[300px]">
            {/* IMAGE PLACEHOLDER: natasa-home.jpg, 300 x 360, radius 16px */}
            <PortraitSlot label={t("images.homePortraitLabel")} className="rounded-2xl" />
          </FadeIn>
        </div>
        <CurveDivider variant="soft" from="green-50" fill="background" />
      </section>

      <Section>
        <FadeIn>
          <SectionTitle>{t("home.introTitle")}</SectionTitle>
          <Prose className="mt-6">
            {t("home.introBody")
              .split("\n\n")
              .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </Prose>
        </FadeIn>
      </Section>

      <CurveDivider variant="soft" from="background" fill="muted" />
      <Section tone="muted">
        <FadeIn>
          <SectionTitle>{t("home.scientistTitle")}</SectionTitle>
          <Prose className="mt-6">
            {t("home.scientistBody")
              .split("\n\n")
              .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </Prose>
          <Link to="/about" className="mt-8 inline-flex items-center justify-center rounded-full border border-green-300 px-6 py-3 text-[0.98rem] text-green-800 transition-colors hover:bg-green-50">
            {t("cta.learnMore")}
          </Link>
        </FadeIn>
      </Section>
      <CurveDivider variant="soft" from="muted" fill="background" />

      <Section>
        <FadeIn>
          <SectionTitle>{t("home.holisticTitle")}</SectionTitle>
          <Prose className="mt-6">
            {t("home.holisticBody")
              .split("\n\n")
              .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </Prose>
          <Link to="/consultations" className="mt-8 inline-flex items-center justify-center rounded-full border border-green-300 px-6 py-3 text-[0.98rem] text-green-800 transition-colors hover:bg-green-50">
            {t("cta.findOut")}
          </Link>
        </FadeIn>
      </Section>

      <CurveDivider variant="deep" from="background" fill="muted" />
      <Section tone="muted">
        <FadeIn className="text-center">
          <p className="font-display mx-auto max-w-2xl text-2xl leading-snug text-green-800 md:text-4xl">
            {t("home.quoteLine")}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/consultations"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-[0.98rem] text-primary-foreground transition-colors hover:bg-green-800"
            >
              {t("cta.viewServices")}
            </Link>
            <Link to="/homeopathy" className="inline-flex items-center justify-center rounded-full border border-green-300 px-6 py-3 text-[0.98rem] text-green-800 transition-colors hover:bg-green-50">
              {t("cta.homeopathy")}
            </Link>
          </div>
        </FadeIn>
      </Section>
      <CurveDivider variant="deep" from="muted" fill="background" />

      <Section prose={false}>
        <FadeIn>
          <SectionTitle>{t("home.quotesTitle")}</SectionTitle>
        </FadeIn>
        <QuoteRow quotes={tAny<QuoteItem[]>("home.quotes")} />
      </Section>

      <CtaBand title={t("home.closingTitle")} body={t("home.closingBody")} />

      <CurveDivider variant="soft" from="green-100" fill="background" />
      <Section prose={false}>
        <FadeIn>
          <NewsletterBlock />
        </FadeIn>
      </Section>
    </SiteLayout>
  );
}
