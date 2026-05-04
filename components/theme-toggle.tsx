"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  applyDocumentTheme,
  getStoredTheme,
  type ThemePreference,
} from "@/lib/theme";
import { useLocale } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";

const choices: Array<{
  value: ThemePreference;
  labelKey: "theme.light" | "theme.system" | "theme.dark";
  icon: typeof Sun;
}> = [
  { value: "light", labelKey: "theme.light", icon: Sun },
  { value: "system", labelKey: "theme.system", icon: Monitor },
  { value: "dark", labelKey: "theme.dark", icon: Moon },
];

export function ThemeToggle({ className }: { className?: string }) {
  const { t } = useLocale();
  const [pref, setPref] = useState<ThemePreference>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setPref(getStoredTheme());
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyDocumentTheme(pref);
  }, [mounted, pref]);

  useEffect(() => {
    if (pref !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => applyDocumentTheme("system");
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [pref]);

  const choose = useCallback((next: ThemePreference) => {
    applyDocumentTheme(next);
    setPref(next);
  }, []);

  const effectiveDark =
    pref === "dark" ||
    (pref === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div
      className={cn(
        "inline-flex touch-manipulation rounded-full border border-emerald-900/20 bg-emerald-50/90 p-0.5 shadow-sm dark:border-emerald-500/40 dark:bg-emerald-900",
        className,
      )}
      role="radiogroup"
      aria-label={t("theme.group")}
    >
      {choices.map(({ value, labelKey, icon: Icon }) => {
        const label = t(labelKey);
        const selected = pref === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            title={label}
            onClick={() => choose(value)}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full text-emerald-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:h-8 sm:w-9 dark:text-emerald-200",
              selected &&
                "bg-white text-emerald-950 shadow-sm dark:bg-emerald-700 dark:text-white",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden strokeWidth={2} />
            <span className="sr-only">{label}</span>
          </button>
        );
      })}
      <span className="sr-only" aria-live="polite">
        {effectiveDark ? t("theme.effectiveDark") : t("theme.effectiveLight")}
      </span>
    </div>
  );
}
