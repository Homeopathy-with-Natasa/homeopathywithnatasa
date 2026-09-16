import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/LanguageProvider";
import { CONTACT_EMAIL, CTHA_URL, PRACTICE_LOCATION, mailtoLink } from "@/config/site";
import { NAV_ITEMS } from "./Navbar";
import { Wordmark } from "./Logo";
import { CurveDivider } from "./CurveDivider";

const LEGAL = [
  { to: "/privacy", key: "footer.privacy" },
  { to: "/terms", key: "footer.terms" },
  { to: "/code-of-ethics", key: "footer.ethics" },
] as const;

export function Footer() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();

  return (
    <>
      <CurveDivider variant="soft" fill="green-800" />
      <footer className="bg-green-800 text-green-100">
        <div className="container-site grid gap-10 py-14 md:grid-cols-4 md:py-16">
          <div className="md:col-span-2">
            <Wordmark text={t("meta.brand")} className="text-green-50" variant="white" />
            <p className="mt-4 max-w-sm text-sm text-green-200">{t("footer.tagline")}</p>
            <p className="mt-2 text-sm text-green-200">{PRACTICE_LOCATION}</p>
          </div>

          <div>
            <h2 className="text-sm tracking-wide text-green-50 uppercase">{t("footer.navTitle")}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-green-200 transition-colors hover:text-green-50">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm tracking-wide text-green-50 uppercase">
              {t("footer.contactTitle")}
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={mailtoLink(lang)}
                  className="text-green-200 underline underline-offset-4 transition-colors hover:text-green-50"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={CTHA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-200 transition-colors hover:text-green-50"
                >
                  {t("footer.registered")}
                </a>
              </li>
            </ul>
            <h2 className="mt-6 text-sm tracking-wide text-green-50 uppercase">
              {t("footer.legalTitle")}
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {LEGAL.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-green-200 transition-colors hover:text-green-50">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700/60">
          <div className="container-site flex flex-col gap-2 py-6 text-xs text-green-300 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl">{t("footer.disclaimer")}</p>
            <p>
              &copy; {year} {t("meta.practitioner")}. {t("footer.rights")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
