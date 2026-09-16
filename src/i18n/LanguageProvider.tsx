import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en from "./en.json";
import hr from "./hr.json";
import type { Lang } from "@/config/site";

const DICTS: Record<Lang, unknown> = { en, hr };
const STORAGE_KEY = "hwn-lang";

type Ctx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (path: string) => string;
  tAny: <T>(path: string) => T;
};

const LanguageContext = createContext<Ctx | null>(null);

function lookup(dict: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, dict);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "hr") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable, language still switches for this visit */
    }
  }, []);

  const value = useMemo<Ctx>(() => {
    const resolve = (path: string): unknown => {
      const found = lookup(DICTS[lang], path);
      return found === undefined ? lookup(DICTS.en, path) : found;
    };
    return {
      lang,
      setLang,
      t: (path) => {
        const found = resolve(path);
        return typeof found === "string" ? found : path;
      },
      tAny: <T,>(path: string) => resolve(path) as T,
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}
