import { addDays } from "date-fns";
import { formatInTimeZone, toDate } from "date-fns-tz";
import { NextResponse } from "next/server";
import { computeNextIqamah } from "@/lib/next-iqamah";
import type { CanonicalPrayer } from "@/lib/prayer-times";
import { fetchAladhanForDate } from "@/lib/prayer-times";
import { getPrayerOverrides, getSiteSettings } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    const tz = settings.prayerTimezoneLabel ?? "America/Chicago";
    const lat = settings.prayerLatitude ?? 32.7506;
    const lng = settings.prayerLongitude ?? -97.0692;
    const method = settings.prayerCalculationMethodLabel ?? 15;

    const iq = settings.iqamahMinutesAfterAdhan ?? {};
    const iqMinutes: Partial<Record<CanonicalPrayer, number>> = {};
    if (iq.fajr != null) iqMinutes.Fajr = iq.fajr;
    if (iq.dhuhr != null) iqMinutes.Dhuhr = iq.dhuhr;
    if (iq.asr != null) iqMinutes.Asr = iq.asr;
    if (iq.maghrib != null) iqMinutes.Maghrib = iq.maghrib;
    if (iq.isha != null) iqMinutes.Isha = iq.isha;

    const now = new Date();
    const todayIso = formatInTimeZone(now, tz, "yyyy-MM-dd");
    const ref = toDate(`${todayIso}T12:00:00`, { timeZone: tz });
    const tomorrowIso = formatInTimeZone(addDays(ref, 1), tz, "yyyy-MM-dd");

    const overrides = await getPrayerOverrides(todayIso, tomorrowIso);
    const overridesByIso: Record<
      string,
      (typeof overrides)[number] | undefined
    > = {};
    for (const o of overrides) {
      if (o.date) overridesByIso[o.date] = o;
    }

    const [t0, t1] = await Promise.all([
      fetchAladhanForDate({
        isoDate: todayIso,
        latitude: lat,
        longitude: lng,
        method,
      }),
      fetchAladhanForDate({
        isoDate: tomorrowIso,
        latitude: lat,
        longitude: lng,
        method,
      }),
    ]);

    const next = computeNextIqamah({
      now,
      timeZone: tz,
      iqamahMinutes: iqMinutes,
      overridesByIso,
      timingsByIso: { [todayIso]: t0, [tomorrowIso]: t1 },
    });

    return NextResponse.json({ next });
  } catch (e) {
    console.error("[next-iqamah]", e);
    return NextResponse.json(
      { next: null, error: "unavailable" },
      { status: 503 },
    );
  }
}
