import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Wordmark } from "./Logo";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/homeopathy", key: "nav.homeopathy" },
  { to: "/consultations", key: "nav.consultations" },
  { to: "/supervision", key: "nav.supervision" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-green-100 bg-background/90 backdrop-blur">
      <div className="container-site flex h-[4.75rem] items-center justify-between gap-4 md:h-[5.75rem]">
        <Link to="/" className="text-green-700" onClick={() => setOpen(false)}>
          <Wordmark text={t("meta.brand")} />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap text-[0.95rem] text-green-800 transition-colors hover:text-green-600"
              activeProps={{ className: "text-green-600" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            to="/consultations"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-green-800 md:inline-flex"
          >
            {t("cta.bookShort")}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("nav.close") : t("nav.menu")}
            aria-expanded={open}
            className="rounded-full p-2 text-green-800 transition-colors hover:bg-green-50 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-green-100 bg-background transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[28rem]" : "max-h-0 border-t-0",
        )}
      >
        <nav className="container-site flex flex-col gap-1 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-green-800 transition-colors hover:bg-green-50"
              activeProps={{ className: "text-green-600" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {t(item.key)}
            </Link>
          ))}
          <Link
            to="/consultations"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-primary px-4 py-3 text-center text-primary-foreground"
          >
            {t("cta.book")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
