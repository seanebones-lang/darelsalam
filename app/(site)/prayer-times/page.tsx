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

export const metadata: Metadata = {
  title: "Athan & Iqamah",
  description: "Congregational athan timings with editable iqāmah etiquette for Dar El Salam.",
};

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
      <div className="rounded-[42px] border border-emerald-900/15 bg-white/95 p-3 shadow-sm dark:border-emerald-600/35 dark:bg-emerald-900 sm:p-4 md:p-6">
        <div className="-mx-1 overflow-x-auto overscroll-x-contain rounded-3xl px-1 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[720px] text-start text-sm">
            <thead className="text-xs uppercase tracking-wide text-emerald-800 dark:text-emerald-100">
              <tr className="bg-emerald-50/70 dark:bg-emerald-800/80 dark:text-emerald-50">
                <th className="rounded-tl-3xl px-5 py-3">{t(locale, "prayer.colDate")}</th>
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
                  <td className="max-w-[150px] px-5 py-4 font-semibold">
                    <div>{row.dateLabel}</div>
                    <div className="text-xs font-normal text-emerald-800/70 dark:text-emerald-100/80">
                      {row.isoDate}
                    </div>
                  </td>
                  {(["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const).map(
                    (salah, idx, arr) => (
                      <td
                        key={salah}
                        className={`px-4 py-4 text-xs leading-relaxed ${
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
      <section className="rounded-[34px] border border-dashed border-emerald-800/40 bg-emerald-50/40 px-8 py-6 text-xs leading-relaxed text-emerald-900 dark:border-emerald-500/35 dark:bg-emerald-900 dark:text-emerald-100">
        {t(locale, "prayer.adabReminder")}
      </section>
    </div>
  );
}
