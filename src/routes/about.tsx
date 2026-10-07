import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FadeIn } from "@/components/site/FadeIn";
import { CurveDivider } from "@/components/site/CurveDivider";
import { ClientPhoto } from "@/components/site/ClientPhoto";
import {
  CredentialsList,
  CtaBand,
  NewsletterBlock,
  PageHeader,
  PortraitSlot,
  Prose,
  Section,
  SectionTitle,
  type Step,
} from "@/components/site/blocks";
import { useI18n } from "@/i18n/LanguageProvider";
import natasaAbout from "@/assets/natasa-about.jpg";
import whiteRose from "@/assets/white-rose-on-cream.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nataša Perić | Homeopath in London since 2009" },
      {
        name: "description",
        content:
          "Nataša Perić, PhD in Natural Sciences, homeopath in private practice in London since 2009 and supervisor at the Centre for Homeopathic Education.",
      },
      { property: "og:title", content: "About Nataša Perić | Homeopath in London" },
      {
        property: "og:description",
        content:
          "A research scientist who became a homeopath. Her story, her method and her credentials.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  const { t, tAny } = useI18n();
  const sections = tAny<Step[]>("about.sections");
  const [unexpectedBeginnings, howIWork, ...remainingSections] = sections;
  const credentialGroups = tAny<{ heading: string; items: string[] }[]>(
    "about.credentialsGroups",
  );

  return (
    <SiteLayout>
      <PageHeader title={t("about.title")} standfirst={t("about.standfirst")} />

      <Section prose={false}>
        <div className="flow-root">
          <FadeIn className="mx-auto w-full max-w-[380px] md:float-left md:mb-10 md:mr-16 md:w-[36%]">
            {/* Portrait, about page */}
            <PortraitSlot label={t("images.aboutPortraitLabel")} src={natasaAbout} />
          </FadeIn>
          <div className="mt-12 space-y-12 md:mt-0">
            {unexpectedBeginnings ? (
              <FadeIn>
                <SectionTitle>{unexpectedBeginnings.heading}</SectionTitle>
                <Prose className="mt-5">
                  {unexpectedBeginnings.body
                    .split("\n\n")
                    .map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
                </Prose>
              </FadeIn>
            ) : null}

            <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_210px] md:gap-14">
              <FadeIn className="mx-auto w-full max-w-[210px] md:order-2 md:mx-0">
                <ClientPhoto
                  src={whiteRose}
                  alt={t("about.roseImageAlt")}
                  placeholder={t("about.roseImagePlaceholder")}
                  width={750}
                  height={844}
                  className="h-auto w-full"
                  placeholderClassName="flex w-full items-center justify-center bg-background px-6 text-center text-sm text-green-700"
                />
              </FadeIn>
              {howIWork ? (
                <FadeIn delay={50} className="md:order-1">
                  <SectionTitle>{howIWork.heading}</SectionTitle>
                  <Prose className="mt-5">
                    {howIWork.body
                      .split("\n\n")
                      .map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
                  </Prose>
                </FadeIn>
              ) : null}
            </div>

            {remainingSections.map((section, i) => (
              <FadeIn key={section.heading} delay={(i + 2) * 50}>
                <SectionTitle>{section.heading}</SectionTitle>
                <Prose className="mt-5">
                  {section.body
                    .split("\n\n")
                    .map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
                </Prose>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      <CurveDivider variant="soft" from="background" fill="muted" />
      <Section tone="muted">
        <FadeIn>
          <SectionTitle>{t("about.credentialsTitle")}</SectionTitle>
          <Prose className="mt-6">
            <p>{t("about.credentialsIntro")}</p>
          </Prose>
          <div className="mt-10 space-y-10">
            {credentialGroups.map((group) => (
              <div key={group.heading}>
                <h3 className="before:mb-3 before:block before:h-0.5 before:w-8 before:rounded-full before:bg-rose-400 before:content-[''] text-xl">
                  {group.heading}
                </h3>
                <CredentialsList items={group.items} marker="check" />
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>
      <CurveDivider variant="soft" from="muted" fill="background" />

      <Section prose={false}>
        <FadeIn>
          <NewsletterBlock />
        </FadeIn>
      </Section>

      <CtaBand title={t("about.closingTitle")} body={t("about.closingBody")} />
    </SiteLayout>
  );
}
