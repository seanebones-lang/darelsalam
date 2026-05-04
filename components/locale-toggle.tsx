"use client";

import { useLocale } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";

export function LocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className={cn(
        "inline-flex touch-manipulation rounded-full border border-emerald-900/20 bg-emerald-50/90 p-0.5 text-xs font-semibold shadow-sm dark:border-emerald-500/40 dark:bg-emerald-900",
        className,
      )}
      role="group"
      aria-label={t("locale.toggle")}
    >
      <button
        type="button"
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
        className={cn(
          "min-h-11 min-w-[2.75rem] rounded-full px-2.5 py-2 transition-colors sm:min-h-0 sm:min-w-0 sm:px-3 sm:py-1.5",
          locale === "en"
            ? "bg-white text-emerald-950 shadow-sm dark:bg-emerald-700 dark:text-white"
            : "text-emerald-800 hover:bg-emerald-100/80 dark:text-emerald-200 dark:hover:bg-emerald-800/80",
        )}
      >
        {t("locale.en")}
      </button>
      <button
        type="button"
        aria-pressed={locale === "ar"}
        onClick={() => setLocale("ar")}
        className={cn(
          "min-h-11 min-w-[2.75rem] rounded-full px-2.5 py-2 transition-colors sm:min-h-0 sm:min-w-0 sm:px-3 sm:py-1.5",
          locale === "ar"
            ? "bg-white text-emerald-950 shadow-sm dark:bg-emerald-700 dark:text-white"
            : "text-emerald-800 hover:bg-emerald-100/80 dark:text-emerald-200 dark:hover:bg-emerald-800/80",
        )}
      >
        {t("locale.ar")}
      </button>
    </div>
  );
}
