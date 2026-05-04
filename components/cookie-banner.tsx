"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/locale-provider";

const STORAGE_KEY = "darelsalam.cookie_consent";

export function CookieBanner() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      if (typeof window === "undefined") return;
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) setVisible(true);
      } catch {
        setVisible(true);
      }
    });
  }, []);

  function accept() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "granted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("cookie.dialog")}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] start-[max(0.75rem,env(safe-area-inset-left))] end-[max(0.75rem,env(safe-area-inset-right))] z-[35] mx-auto w-[min(100%,calc(100vw-1.5rem))] max-w-xl touch-manipulation rounded-2xl border border-emerald-900/20 bg-white p-4 text-sm text-emerald-950 shadow-2xl sm:p-5 md:start-auto md:end-[max(1rem,env(safe-area-inset-right))] dark:border-emerald-100/30 dark:bg-emerald-950 dark:text-emerald-50"
    >
      <p className="leading-relaxed">
        {t("cookie.bodyBefore")}{" "}
        <Link className="underline" href="/privacy">
          {t("cookie.privacy")}
        </Link>{" "}
        {t("cookie.bodyAfter")}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={accept}
          className="min-h-11 rounded-full bg-emerald-900 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white dark:bg-emerald-200 dark:text-emerald-950"
        >
          {t("cookie.agree")}
        </button>
      </div>
    </div>
  );
}
