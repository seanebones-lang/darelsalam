"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/lib/i18n/constants";
import type { MessageKey } from "@/lib/i18n/messages";
import {
  t as translate,
  tInterpolate as interpolateMessages,
} from "@/lib/i18n/messages";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: MessageKey) => string;
  tInterpolate: (
    key: MessageKey,
    vars: Record<string, string | number>,
  ) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    queueMicrotask(() => {
      setLocaleState(initialLocale);
    });
  }, [initialLocale]);

  const setLocale = useCallback(
    (next: Locale) => {
      const value = next === "ar" ? "ar" : "en";
      document.cookie = `${LOCALE_COOKIE}=${value};path=/;max-age=31536000;SameSite=Lax`;
      setLocaleState(isLocale(value) ? value : DEFAULT_LOCALE);
      router.refresh();
    },
    [router],
  );

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => translate(locale, key),
      tInterpolate: (key, vars) => interpolateMessages(locale, key, vars),
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
