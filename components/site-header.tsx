"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { LocaleToggle } from "@/components/locale-toggle";
import { PrayerCountdownNav } from "@/components/prayer-countdown-nav";
import { useLocale } from "@/lib/i18n/locale-provider";
import { localizedNavLabel } from "@/lib/i18n/nav-label";
import type { NavLinkSanity } from "@/lib/types/sanity";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader({ links }: { links: NavLinkSanity[] }) {
  const [open, setOpen] = useState(false);
  const { locale, t } = useLocale();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-900/10 bg-white/95 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md dark:border-emerald-600/40 dark:bg-emerald-950">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4 lg:justify-between">
          {/*
            Avoid display:contents here — it can break flex item boundaries in Chrome
            and let the centered iqāmah chip paint over the first nav link.
          */}
          <div className="flex min-w-0 items-center justify-between gap-3 lg:shrink-0">
            <Link
              href="/"
              className="flex min-w-0 max-w-[65%] shrink-0 flex-col leading-tight sm:max-w-none lg:max-w-none"
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-emerald-700 sm:text-xs sm:tracking-[0.35em] dark:text-emerald-300">
                {t("common.darElSalam")}
              </span>
              <span className="font-serif text-base text-emerald-950 sm:text-lg dark:text-emerald-50">
                {t("common.islamicCenter")}
              </span>
            </Link>
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
              <LocaleToggle />
              <ThemeToggle />
              <button
                type="button"
                className="touch-manipulation inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-emerald-900/20 px-3 text-emerald-900 sm:px-4 dark:border-emerald-500/50 dark:text-emerald-100"
                aria-expanded={open}
                aria-controls="site-mobile-nav"
                id="site-menu-button"
                aria-label={t("common.openNavigation")}
                onClick={() => setOpen((v) => !v)}
              >
                <Menu className="h-5 w-5 shrink-0" aria-hidden />
                <span className="sr-only">{t("common.menu")}</span>
              </button>
            </div>
          </div>
          <div className="flex w-full min-w-0 justify-center px-1 sm:min-w-[11rem] lg:min-w-[12rem] lg:flex-1 lg:px-2">
            <PrayerCountdownNav />
          </div>
          <div className="relative z-10 hidden min-w-0 items-center gap-2 lg:flex lg:shrink-0 lg:ps-2">
            <nav
              className="flex max-w-xl flex-wrap items-center justify-end gap-1 text-sm font-medium text-emerald-950 xl:max-w-none xl:gap-2 dark:text-emerald-100"
              aria-label="Primary"
            >
              {links.map((link) => (
                <Link
                  href={link.href ?? "#"}
                  key={`${link.href}-${link.label}`}
                  prefetch={false}
                  className="touch-manipulation rounded-full px-2.5 py-2 text-sm hover:bg-emerald-50 sm:px-3 sm:py-1.5 dark:hover:bg-emerald-800 dark:hover:text-white"
                >
                  {localizedNavLabel(locale, link.href, link.label)}
                </Link>
              ))}
            </nav>
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
      {open && (
        <div
          id="site-mobile-nav"
          role="navigation"
          aria-labelledby="site-menu-button"
          className="max-h-[min(72dvh,26rem)] space-y-0.5 overflow-y-auto overscroll-y-contain border-t border-emerald-900/10 bg-white/98 px-4 py-3 shadow-[0_12px_40px_rgba(6,36,28,0.12)] sm:px-6 lg:hidden dark:border-emerald-700/50 dark:bg-emerald-950/98 dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
        >
          {links.map((link) => (
            <Link
              key={`mobile-${link.href}-${link.label}`}
              href={link.href ?? "#"}
              prefetch={false}
              className={cn(
                "block touch-manipulation rounded-xl px-3 py-3.5 text-base font-medium text-emerald-950 active:bg-emerald-100 dark:text-emerald-100 dark:active:bg-emerald-800/80",
              )}
              onClick={() => setOpen(false)}
            >
              {localizedNavLabel(locale, link.href, link.label)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
