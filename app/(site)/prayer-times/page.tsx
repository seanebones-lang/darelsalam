import type { Metadata } from "next";
import Link from "next/link";
import { addDays, format } from "date-fns";
import {
  applyPrayerOverrides,
  buildWeeklySchedule,
  type CanonicalPrayer,
} from "@/lib/prayer-times";
import { prayerLabel } from "@/lib/i18n/prayer-label";
import { t, tInterpolate } from "@/lib/i18n/messages";
import { getServerLocale } from "@/lib/i18n/server";
import { getPrayerOverrides, getSiteSettings } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const desc = t(locale, "meta.prayerDescription");
  return {
    title: t(locale, "meta.prayerTitle"),
    description: desc,
    openGraph: {
      locale: locale === "ar" ? "ar_SA" : "en_US",
      title: t(locale, "meta.prayerTitle"),
      description: desc,
    },
  };
}

export default async function PrayerTimesPage() {
  const [settings, locale] = await Promise.all([
    getSiteSettings(),
    getServerLocale(),
  ]);
  const iq = settings.iqamahMinutesAfterAdhan ?? {};

  const lat = settings.prayerLatitude ?? 32.7506;
  const lng = settings.prayerLongitude ?? -97.0692;
  const method = settings.prayerCalculationMethodLabel ?? 15;

  const iqMinutes: Partial<Record<CanonicalPrayer, number>> = {};
  if (iq.fajr != null) iqMinutes.Fajr = iq.fajr;
  if (iq.dhuhr != null) iqMinutes.Dhuhr = iq.dhuhr;
  if (iq.asr != null) iqMinutes.Asr = iq.asr;
  if (iq.maghrib != null) iqMinutes.Maghrib = iq.maghrib;
  if (iq.isha != null) iqMinutes.Isha = iq.isha;

  const today = new Date();
  const weekEnd = addDays(today, 6);

  const overrides = await getPrayerOverrides(
    format(today, "yyyy-MM-dd"),
    format(weekEnd, "yyyy-MM-dd"),
  );

  const overrideLookup = overrides.reduce<
    Record<string, (typeof overrides)[number]>
  >((acc, curr) => {
    if (!curr.date) return acc;
    acc[curr.date] = curr;
    return acc;
  }, {});

  const rows = (
    await buildWeeklySchedule({
      startDate: today,
      days: 7,
      latitude: lat,
      longitude: lng,
      method,
      iqamahMinutes: iqMinutes,
    })
  ).map((row) =>
    applyPrayerOverrides(row, overrideLookup[row.isoDate] ?? null, iqMinutes),
  );

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="space-y-6 text-center md:text-start">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-800 dark:text-emerald-100">
            {t(locale, "prayer.eyebrow")}
          </p>
          <h1 className="mt-3 font-serif text-3xl text-emerald-950 sm:text-4xl dark:text-emerald-50 md:text-5xl">
            {t(locale, "prayer.title")}
          </h1>
        </div>
        <div className="rounded-[32px] border border-emerald-900/15 bg-white/80 p-4 text-sm leading-relaxed text-emerald-900 shadow-sm dark:border-emerald-600/35 dark:bg-emerald-900 dark:text-emerald-100 sm:p-6 md:text-base">
          <p>
            {tInterpolate(locale, "prayer.disclaimerBefore", { method })}
            <Link href="/contact" className="underline">
              {t(locale, "prayer.disclaimerLink")}
            </Link>
            {t(locale, "prayer.disclaimerAfter")}
          </p>
        </div>
      </div>
      <p className="text-center text-xs leading-relaxed text-emerald-800/90 md:hidden dark:text-emerald-200/90">
        {t(locale, "prayer.scrollHint")}
      </p>
      <div className="rounded-[42px] border border-emerald-900/15 bg-white/95 p-3 shadow-sm dark:border-emerald-600/35 dark:bg-emerald-900 sm:p-4 md:p-6">
        <div className="-mx-1 overflow-x-auto overscroll-x-contain rounded-3xl px-1 sm:mx-0 sm:px-0 [scrollbar-gutter:stable]">
          <table className="w-full min-w-[640px] text-start text-sm sm:min-w-[720px]">
            <thead className="text-xs uppercase tracking-wide text-emerald-800 dark:text-emerald-100">
              <tr className="bg-emerald-50/70 dark:bg-emerald-800/80 dark:text-emerald-50">
                <th className="sticky start-0 z-20 rounded-tl-3xl bg-emerald-50 px-3 py-3 shadow-[6px_0_14px_-6px_rgba(6,36,28,0.2)] sm:px-5 dark:bg-emerald-800 dark:shadow-[6px_0_14px_-6px_rgba(0,0,0,0.45)]">
                  {t(locale, "prayer.colDate")}
                </th>
                {(["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const).map(
                  (salah) => (
                    <th key={salah} className="px-3 py-3 text-center">
                      {prayerLabel(locale, salah)}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="text-emerald-950 dark:text-emerald-50">
              {rows.map((row) => (
                <tr
                  key={row.isoDate}
                  className="border-t border-emerald-900/10 transition hover:bg-emerald-50/40 dark:border-emerald-100/10 dark:hover:bg-emerald-900/30"
                >
                  <td className="sticky start-0 z-10 max-w-[150px] bg-white px-3 py-3 font-semibold shadow-[6px_0_14px_-6px_rgba(6,36,28,0.12)] sm:px-5 sm:py-4 dark:bg-emerald-900 dark:shadow-[6px_0_14px_-6px_rgba(0,0,0,0.35)]">
                    <div>{row.dateLabel}</div>
                    <div className="text-xs font-normal text-emerald-800/70 dark:text-emerald-100/80">
                      {row.isoDate}
                    </div>
                  </td>
                  {(["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const).map(
                    (salah, idx, arr) => (
                      <td
                        key={salah}
                        className={`px-2 py-3 text-xs leading-relaxed sm:px-4 sm:py-4 ${
                          salah === arr[arr.length - 1]
                            ? "rounded-tr-3xl md:rounded-tr-none"
                            : ""
                        }`}
                      >
                        <div className="text-center md:text-center">
                          <div className="text-[11px] uppercase tracking-wide text-emerald-900/70 dark:text-emerald-100/80">
                            {t(locale, "prayer.colAthanIqamah")}
                          </div>
                          <div className="mt-2 font-semibold text-base">
                            {row.times[salah].athan}
                          </div>
                          <div className="text-sm font-medium text-emerald-800 dark:text-emerald-100">
                            {row.times[salah].iqamah}
                          </div>
                        </div>
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <section className="rounded-[34px] border border-dashed border-emerald-800/40 bg-emerald-50/40 px-5 py-5 text-xs leading-relaxed text-emerald-900 sm:px-8 sm:py-6 dark:border-emerald-500/35 dark:bg-emerald-900 dark:text-emerald-100">
        {t(locale, "prayer.adabReminder")}
      </section>
    </div>
  );
}
