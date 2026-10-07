import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FadeIn } from "@/components/site/FadeIn";
import { CurveDivider } from "@/components/site/CurveDivider";
import { BookButton, ContactForm, NewsletterBlock, PageHeader, Section } from "@/components/site/blocks";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Homeopathy with Nataša" },
      {
        name: "description",
        content:
          "Ask Nataša Perić a question before you book. Every message is read and usually answered within 2 working days.",
      },
      { property: "og:title", content: "Contact | Homeopathy with Nataša" },
      {
        property: "og:description",
        content: "Send a note before you book, or write directly to hello@homeopathywithnatasa.co.uk.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  return (
    <SiteLayout footerFrom="background">
      <PageHeader title={t("contact.title")} standfirst={t("contact.body")} />
      <Section>
        <FadeIn>
          <ContactForm showHeading={false} />
        </FadeIn>
      </Section>

      <CurveDivider variant="soft" from="background" fill="green-100" />
      <Section tone="green-100">
        <FadeIn className="text-center">
          <h2 className="text-3xl md:text-4xl">{t("contact.readyTitle")}</h2>
          <div className="mt-8">
            <BookButton variant="accent" />
          </div>
        </FadeIn>
      </Section>
      <CurveDivider variant="soft" from="green-100" fill="background" />

      <Section prose={false}>
        <FadeIn>
          <NewsletterBlock />
        </FadeIn>
      </Section>
    </SiteLayout>
  );
}
