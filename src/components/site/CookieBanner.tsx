import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/LanguageProvider";

const KEY = "hwn-cookie-choice";

export function CookieBanner() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(KEY)) setShow(true);
  }, []);

  const choose = (value: "accepted" | "refused") => {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 rounded-xl border border-green-200 bg-card p-4 shadow-lg sm:inset-x-auto sm:right-4 sm:bottom-4 sm:max-w-sm">
      <p className="text-sm text-muted-foreground">{t("cookies.text")}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-green-800"
        >
          {t("cookies.accept")}
        </button>
        <button
          type="button"
          onClick={() => choose("refused")}
          className="rounded-full border border-green-300 px-4 py-2 text-sm text-green-800 transition-colors hover:bg-green-50"
        >
          {t("cookies.refuse")}
        </button>
        <Link to="/privacy" className="ml-auto text-sm text-green-700 underline underline-offset-4">
          {t("cookies.more")}
        </Link>
      </div>
    </div>
  );
}
