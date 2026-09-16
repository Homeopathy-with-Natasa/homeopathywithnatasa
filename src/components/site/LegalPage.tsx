import { SiteLayout } from "./SiteLayout";
import { FadeIn } from "./FadeIn";
import { PageHeader, Prose, Section, SectionTitle, type Step } from "./blocks";
import { useI18n } from "@/i18n/LanguageProvider";

export function LegalPage({ base }: { base: "privacy" | "terms" | "ethics" }) {
  const { t, tAny } = useI18n();
  const sections = tAny<Step[]>(`legal.${base}.sections`);

  return (
    <SiteLayout footerFrom="background">
      <PageHeader title={t(`legal.${base}.title`)} standfirst={t(`legal.${base}.standfirst`)} />
      <Section>
        <p className="rounded-xl bg-green-100 px-5 py-4 text-sm text-green-800">
          {t("legal.placeholderNotice")}
        </p>
        <div className="mt-12 space-y-10">
          {sections.map((section, i) => (
            <FadeIn key={i}>
              <SectionTitle>{section.heading}</SectionTitle>
              <Prose className="mt-4">
                <p>{section.body}</p>
              </Prose>
            </FadeIn>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
