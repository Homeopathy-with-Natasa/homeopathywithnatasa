import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { BRAND_HEX, SERVICES, calLink, type Service, type ServiceGroup } from "@/config/site";
import { FadeIn } from "./FadeIn";

/* The Cal.com embed touches window, so it is only loaded in the browser, on demand. */
const CalEmbed = lazy(async () => {
  const mod = await import("@calcom/embed-react");
  const Cal = mod.default;
  function Embed({ link, onBookingSuccessful }: { link: string; onBookingSuccessful: () => void }) {
    useEffect(() => {
      let active = true;
      const callback = () => onBookingSuccessful();
      let api: Awaited<ReturnType<typeof mod.getCalApi>> | null = null;

      void mod.getCalApi().then((cal) => {
        if (!active) return;
        api = cal;
        cal("ui", {
          theme: "light",
          cssVarsPerTheme: { light: { "cal-brand": BRAND_HEX }, dark: { "cal-brand": BRAND_HEX } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
        cal("on", { action: "bookingSuccessful", callback });
      });

      return () => {
        active = false;
        api?.("off", { action: "bookingSuccessful", callback });
      };
    }, [onBookingSuccessful]);
    return (
      <Cal
        calLink={link}
        style={{ width: "100%", minHeight: "640px", overflow: "auto" }}
        config={{ layout: "month_view", theme: "light" }}
      />
    );
  }
  return { default: Embed };
});

function ServiceCard({
  service,
  onBook,
  onClose,
}: {
  service: Service;
  onBook?: () => void;
  onClose?: () => void;
}) {
  const { t } = useI18n();
  return (
    <div className="relative rounded-2xl bg-card p-6 ring-1 ring-green-100 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1 pr-8">
          <h3 className="text-xl">{service.name}</h3>
          <p className="font-display mt-1 text-rose-600">
            {service.duration} @ {service.price}
          </p>
          <p className="mt-3 text-[0.98rem] text-green-900/85">{t(`services.${service.id}`)}</p>
        </div>
        {onBook ? (
          <button
            type="button"
            onClick={onBook}
            className="shrink-0 self-center rounded-full bg-primary px-6 py-2.5 text-primary-foreground transition-colors hover:bg-green-800"
          >
            {t("booking.book")}
          </button>
        ) : null}
      </div>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label={t("booking.back")}
          className="absolute top-4 right-4 rounded-full p-2 text-green-800 transition-colors hover:bg-green-50"
        >
          <X className="h-5 w-5" />
        </button>
      ) : null}
    </div>
  );
}

export function BookingPanel({
  group,
  intro,
  aside,
}: {
  group: ServiceGroup;
  intro?: ReactNode;
  aside: ReactNode;
}) {
  const { t } = useI18n();
  const services = SERVICES.filter((s) => s.group === group);
  const [selected, setSelected] = useState<Service | null>(null);
  const [booked, setBooked] = useState(false);
  const isFirstConsultation = selected?.slug === "first-consultation" || selected?.slug === "children-first-consultation-under-16";
  const isChildConsultation = selected?.slug === "children-first-consultation-under-16";

  const selectService = (service: Service) => {
    setBooked(false);
    setSelected(service);
  };

  const closeBooking = () => {
    setBooked(false);
    setSelected(null);
  };

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14">
      <div className="min-w-0">
        <FadeIn>
          <h2 className="text-3xl before:mb-4 before:block before:h-0.5 before:w-12 before:bg-rose-500 before:content-[''] md:text-4xl">
            {t("booking.selectTitle")}
          </h2>
          {intro ? <div className="mt-6 space-y-5 text-green-900/90">{intro}</div> : null}
        </FadeIn>

        <div className="mt-8 space-y-4">
          {selected ? (
            <>
              <ServiceCard service={selected} onClose={closeBooking} />
              {booked ? (
                <div role="status" className="rounded-2xl bg-green-100 px-6 py-8 text-green-900 md:px-8 md:py-10">
                  <h3 className="text-2xl md:text-3xl">{t("booking.successTitle")}</h3>
                  <p className="mt-4 text-green-900/90">
                    {isFirstConsultation ? t("booking.successFirstBody") : t("booking.successBody")}
                  </p>
                  {isFirstConsultation ? (
                    <Link
                      to="/new-patient-questionnaire"
                      search={{ type: isChildConsultation ? "child" : undefined }}
                      className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-green-800"
                    >
                      {t("booking.completeQuestionnaire")}
                    </Link>
                  ) : null}
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl bg-card ring-1 ring-green-100">
                  <Suspense
                    fallback={
                      <p className="px-6 py-10 text-center text-muted-foreground">
                        {t("booking.loading")}
                      </p>
                    }
                  >
                    <CalEmbed key={selected.slug} link={calLink(selected.slug)} onBookingSuccessful={() => setBooked(true)} />
                  </Suspense>
                </div>
              )}
            </>
          ) : (
            services.map((s) => (
              <ServiceCard key={s.id} service={s} onBook={() => selectService(s)} />
            ))
          )}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {t("booking.smallPrintPre")}
          <Link to="/terms" className="underline underline-offset-4 hover:text-green-700">
            {t("booking.termsLink")}
          </Link>
          .
        </p>
      </div>

      <aside className="min-w-0 lg:sticky lg:top-32">{aside}</aside>
    </div>
  );
}

export function BeforeFirstAppointment() {
  const { t } = useI18n();
  return (
    <div className="rounded-2xl bg-green-100 p-6 md:p-7">
      <h3 className="text-xl">{t("booking.beforeTitle")}</h3>
      <p className="mt-3 text-green-900/90">{t("booking.beforeBody")}</p>
      <ul className="mt-4 space-y-2">
        <li>
          <Link
            to="/new-patient-questionnaire"
             search={{ type: undefined }}
            className="text-green-800 underline underline-offset-4 hover:text-green-600"
          >
            {t("booking.questionnaireLink")}
          </Link>
        </li>
        <li>
          <Link to="/terms" className="text-green-800 underline underline-offset-4 hover:text-green-600">
            {t("booking.termsLink")}
          </Link>
        </li>
      </ul>
    </div>
  );
}
