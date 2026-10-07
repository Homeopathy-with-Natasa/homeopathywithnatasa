import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ClientPhoto } from "@/components/site/ClientPhoto";
import { PageHeader, PlainList, Section } from "@/components/site/blocks";
import { BeforeFirstAppointment, BookingPanel } from "@/components/site/BookingPanel";
import { useI18n } from "@/i18n/LanguageProvider";
import hawthornBlossom from "@/assets/hawthorn-blossom.jpg.asset.json";

export const Route = createFileRoute("/consultations")({
  head: () => ({
    meta: [
      { title: "Consultations and booking | Homeopathy with Natasa" },
      {
        name: "description",
        content:
          "Book an online homeopathy consultation with Nataša Perić by Google Meet video: first and follow-up appointments for adults and children, and acute appointments.",
      },
      { property: "og:title", content: "Consultations and booking | Homeopathy with Natasa" },
      {
        property: "og:description",
        content: "Choose an appointment, see fees and book online by Google Meet video.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Consultations,
});

const split = (text: string) => text.split("\n\n").map((p, i) => <p key={i}>{p}</p>);

function Consultations() {
  const { t, tAny } = useI18n();

  return (
    <SiteLayout footerFrom="background">
      <PageHeader title={t("consultations.title")} standfirst={t("consultations.standfirst")} />
      <Section prose={false}>
        <BookingPanel
          group="consultation"
          intro={
            <>
              {split(t("consultations.intro"))}
              <div className="space-y-5 border-t border-green-100 pt-5 text-[0.98rem]">
                {split(t("consultations.bookingNote"))}
              </div>
            </>
          }
          aside={
            <div className="space-y-10">
              <ClientPhoto
                src={hawthornBlossom.url}
                alt={t("consultations.hawthornImageAlt")}
                placeholder={t("consultations.hawthornImagePlaceholder")}
                width={1200}
                height={1600}
                className="mx-auto hidden h-auto w-full max-w-[260px] rounded-2xl lg:block"
                placeholderClassName="hidden"
              />
              <div>
                <h2 className="text-2xl">{t("consultations.expectTitle")}</h2>
                <PlainList items={tAny<string[]>("consultations.expectItems")} />
              </div>
              <div>
                <h2 className="text-2xl">{t("consultations.availabilityTitle")}</h2>
                <p className="mt-4 text-green-900/90">{t("consultations.availabilityBody")}</p>
              </div>
              <BeforeFirstAppointment />
            </div>
          }
        />
      </Section>
    </SiteLayout>
  );
}
