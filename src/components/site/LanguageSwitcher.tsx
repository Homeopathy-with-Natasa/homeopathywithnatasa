import { LANGUAGES } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useI18n();

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-label={l.label}
          aria-pressed={lang === l.code}
          title={l.label}
          className={cn(
            "rounded-full px-2 py-1 text-lg leading-none transition-opacity",
            lang === l.code ? "opacity-100 ring-1 ring-green-300" : "opacity-45 hover:opacity-80",
          )}
        >
          <span aria-hidden="true">{l.flag}</span>
        </button>
      ))}
    </div>
  );
}
