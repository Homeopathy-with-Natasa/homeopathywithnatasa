import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FadeIn } from "@/components/site/FadeIn";
import { CurveDivider } from "@/components/site/CurveDivider";
import {
  CtaBand,
  PageHeader,
  PlainList,
  Prose,
  RecognitionList,
  Section,
  SectionTitle,
} from "@/components/site/blocks";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/homeopathy")({
  head: () => ({
    meta: [
      { title: "What homeopathy is | Homeopathy with Natasa, London" },
      {
        name: "description",
        content:
          "Homeopathy treats the body as one integrated system rather than isolated organs. What a consultation is like, what it may support, and how remedies are sent.",
      },
      { property: "og:title", content: "What homeopathy is | Homeopathy with Natasa" },
      {
        property: "og:description",
        content:
          "One integrated system rather than isolated organs. A plain explanation of how consultations and remedies work.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Homeopathy,
});

function Homeopathy() {
  const { t, tAny } = useI18n();
  const [consultationImageAvailable, setConsultationImageAvailable] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/images/fern-unfurling.jpg", { method: "HEAD", signal: controller.signal })
      .then((response) => setConsultationImageAvailable(response.ok))
      .catch(() => setConsultationImageAvailable(false));
    return () => controller.abort();
  }, []);

  return (
    <SiteLayout>
      <PageHeader title={t("homeopathy.title")} standfirst={t("homeopathy.standfirst")} />

      <Section>
        <FadeIn>
          <SectionTitle>{t("homeopathy.whatTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("homeopathy.whatBody")}</p>
            <p>{t("homeopathy.whatBody2")}</p>
          </Prose>
        </FadeIn>
      </Section>

      <CurveDivider variant="soft" from="background" fill="muted" />
      <Section tone="muted">
        <FadeIn>
          <SectionTitle>{t("homeopathy.notTitle")}</SectionTitle>
        </FadeIn>
        <RecognitionList items={tAny<string[]>("homeopathy.notItems")} />

        <FadeIn className="mt-14">
          <SectionTitle>{t("homeopathy.promiseTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("homeopathy.promiseBody")}</p>
          </Prose>
        </FadeIn>
      </Section>
      <CurveDivider variant="soft" from="muted" fill="background" />

      <Section>
        <FadeIn>
          <SectionTitle>{t("homeopathy.supportTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("homeopathy.supportIntro")}</p>
          </Prose>
          <PlainList items={tAny<string[]>("homeopathy.supportItems")} />
        </FadeIn>
      </Section>

      <CurveDivider variant="wave" from="background" fill="muted" />
      <Section tone="muted">
        <FadeIn>
          <SectionTitle>{t("homeopathy.consultationTitle")}</SectionTitle>
          <Prose className="mt-6">
            {tAny<string[]>("homeopathy.consultationBody").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Prose>
        </FadeIn>
        <FadeIn className="mt-14">
          {consultationImageAvailable ? (
            <img
              src="/images/fern-unfurling.jpg"
              alt={t("homeopathy.consultationImageAlt")}
              className="h-auto w-full rounded-2xl"
            />
          ) : (
            <div className="flex aspect-[3/4] w-full items-center justify-center rounded-2xl bg-green-100 px-6 text-center text-sm text-green-700">
              {t("homeopathy.consultationImagePlaceholder")}
            </div>
          )}
        </FadeIn>
        <FadeIn className="mt-14">
          <SectionTitle>{t("homeopathy.interestTitle")}</SectionTitle>
          <Prose className="mt-6">
            {tAny<string[]>("homeopathy.interestBody").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Prose>
        </FadeIn>
      </Section>
      <CurveDivider variant="wave" from="muted" fill="background" />

      <Section>
        <FadeIn>
          <SectionTitle>{t("homeopathy.remediesTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("homeopathy.remediesBody")}</p>
            <p>{t("homeopathy.remediesBody2")}</p>
          </Prose>
        </FadeIn>
        <FadeIn className="mt-14">
          <SectionTitle>{t("homeopathy.askTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("homeopathy.askBody")}</p>
          </Prose>
        </FadeIn>
      </Section>

      <CtaBand title={t("home.closingTitle")} body={t("home.closingBody")} />
    </SiteLayout>
  );
}
