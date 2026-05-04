"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { DonationCategorySanity, DonationTierSanity } from "@/lib/types/sanity";
import { cn } from "@/lib/utils";

interface DonateBoardProps {
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  oneTime?: DonationTierSanity[] | null;
  monthly?: DonationTierSanity[] | null;
  categories?: DonationCategorySanity[] | null;
}

type TabKey = "oneTime" | "monthly";

export function DonateBoard({
  heroTitle,
  heroSubtitle,
  oneTime,
  monthly,
  categories,
}: DonateBoardProps) {
  const { t } = useLocale();
  const [tab, setTab] = useState<TabKey>("oneTime");

  useEffect(() => {
    queueMicrotask(() => {
      const hash = window.location.hash?.toLowerCase() ?? "";
      if (
        hash === "#monthly" ||
        hash === "#monthly-anchor" ||
        hash === "#tabs1-2a"
      ) {
        setTab("monthly");
      }
    });
  }, []);

  const activeTiers = useMemo(() => {
    const source = tab === "oneTime" ? oneTime : monthly;
    return source?.filter(Boolean) ?? [];
  }, [tab, monthly, oneTime]);

  return (
    <div className="space-y-10">
      <div className="text-center md:text-start">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-800 dark:text-emerald-200">
          {t("donateBoard.eyebrow")}
        </p>
        <h1 className="mt-3 font-serif text-4xl text-emerald-950 dark:text-emerald-50">{heroTitle}</h1>
        {heroSubtitle && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {heroSubtitle}
          </p>
        )}
        <p className="mt-4 text-xs text-emerald-900 dark:text-emerald-100">
          {t("donateBoard.checkoutNote")}
        </p>
      </div>
      <div id="monthly-anchor" className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setTab("oneTime")}
          className={cn(
            "touch-manipulation rounded-full px-6 py-3 text-sm font-semibold transition sm:px-7 sm:py-2",
            tab === "oneTime"
              ? "bg-emerald-900 text-white dark:bg-emerald-200 dark:text-emerald-950"
              : "border border-emerald-900/25 text-emerald-900 hover:bg-emerald-50 dark:border-emerald-100/30 dark:text-emerald-100 dark:hover:bg-emerald-900/70",
          )}
        >
          {t("donateBoard.oneTime")}
        </button>
        <button
          type="button"
          onClick={() => setTab("monthly")}
          className={cn(
            "touch-manipulation rounded-full px-6 py-3 text-sm font-semibold transition sm:px-7 sm:py-2",
            tab === "monthly"
              ? "bg-emerald-900 text-white dark:bg-emerald-200 dark:text-emerald-950"
              : "border border-emerald-900/25 text-emerald-900 hover:bg-emerald-50 dark:border-emerald-100/30 dark:text-emerald-100 dark:hover:bg-emerald-900/70",
          )}
        >
          {t("donateBoard.monthly")}
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {activeTiers.map((tier) => (
          <a
            href={tier.externalUrl ?? "#"}
            key={`${tier.amountLabel}-${tier.externalUrl ?? ""}`}
            target="_blank"
            rel="noreferrer noopener sponsored"
            className="touch-manipulation rounded-3xl border border-emerald-900/15 bg-white px-6 py-10 text-center shadow-sm transition active:scale-[0.99] hover:-translate-y-0.5 hover:border-emerald-600 sm:px-8 dark:border-emerald-600/40 dark:bg-emerald-900"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-emerald-800 dark:text-emerald-200">
              {t("donateBoard.support")}
            </span>
            <p className="mt-6 font-serif text-4xl text-emerald-900 dark:text-emerald-50">
              {tier.amountLabel}
            </p>
          </a>
        ))}
      </div>
      <div className="space-y-4">
        <h2 className="font-serif text-2xl text-emerald-950 dark:text-emerald-50">
          {t("donateBoard.guidedCategories")}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {(categories ?? []).map((bucket) => (
            <a
              key={`${bucket.label}-${bucket.externalUrl ?? ""}`}
              href={bucket.externalUrl ?? "#"}
              target="_blank"
              rel="noreferrer noopener sponsored"
              className="touch-manipulation rounded-3xl border border-emerald-900/15 bg-emerald-50/40 px-6 py-6 transition active:scale-[0.99] hover:border-emerald-600 sm:py-5 dark:border-emerald-600/40 dark:bg-emerald-900"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-emerald-950 dark:text-emerald-50">
                    {bucket.label}
                  </p>
                  {bucket.subtitle && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{bucket.subtitle}</p>
                  )}
                </div>
                <span className="text-xs uppercase tracking-wide text-emerald-900 dark:text-emerald-100">
                  {t("donateBoard.donateArrow")}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
      <Link
        href="/"
        className="inline-flex text-xs font-semibold uppercase tracking-[0.3em] text-emerald-900 hover:text-emerald-950 dark:text-emerald-100"
      >
        {t("donateBoard.backHome")}
      </Link>
    </div>
  );
}
