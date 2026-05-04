import { addDays } from "date-fns";
import { formatInTimeZone, toDate } from "date-fns-tz";
import type { CanonicalPrayer } from "@/lib/prayer-times";
import {
  iqamClockFromAthancLock,
  normalizeClock,
} from "@/lib/prayer-times";
import type { PrayerDayOverrideSanity } from "@/lib/types/sanity";

const PRAYER_ORDER: CanonicalPrayer[] = [
  "Fajr",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
];

const OVERRIDE_FIELDS: Record<
  CanonicalPrayer,
  keyof PrayerDayOverrideSanity
> = {
  Fajr: "overrideFajr",
  Dhuhr: "overrideDhuhr",
  Asr: "overrideAsr",
  Maghrib: "overrideMaghrib",
  Isha: "overrideIsha",
};

function parseClockToMinutes(clock: string): number {
  const [hStr, mStr] = clock.split(":");
  return Number.parseInt(hStr, 10) * 60 + Number.parseInt(mStr, 10);
}

/**
 * Wall-clock iqāmah in the masjid zone; if iqāmah rolls past midnight relative
 * to the adhān calendar day (e.g. late Maghrib), use the next Gregorian date.
 */
export function iqamahInstantInZone(opts: {
  prayerDayIso: string;
  athanClock: string;
  iqClock: string;
  timeZone: string;
}): Date {
  const { prayerDayIso, athanClock, iqClock, timeZone } = opts;
  const ath = parseClockToMinutes(athanClock);
  const iq = parseClockToMinutes(iqClock);
  let dayIso = prayerDayIso;
  if (iq < ath) {
    const noon = toDate(`${prayerDayIso} 12:00:00`, { timeZone });
    dayIso = formatInTimeZone(addDays(noon, 1), timeZone, "yyyy-MM-dd");
  }
  return toDate(`${dayIso} ${iqClock}:00`, { timeZone });
}

function resolveAthan(
  computed: string,
  override: PrayerDayOverrideSanity | undefined,
  field: keyof PrayerDayOverrideSanity,
): string {
  const manual = override?.[field];
  if (typeof manual === "string" && manual.trim().length > 0) {
    return normalizeClock(manual) ?? computed;
  }
  return computed;
}

export interface NextIqamahResult {
  prayer: CanonicalPrayer;
  /** ISO 8601 instant (UTC) */
  target: string;
}

export function computeNextIqamah(opts: {
  now: Date;
  timeZone: string;
  iqamahMinutes: Partial<Record<CanonicalPrayer, number>>;
  overridesByIso: Record<string, PrayerDayOverrideSanity | undefined>;
  timingsByIso: Record<string, Record<CanonicalPrayer, string>>;
}): NextIqamahResult | null {
  const { now, timeZone, iqamahMinutes, overridesByIso, timingsByIso } = opts;
  const candidates: { prayer: CanonicalPrayer; at: Date }[] = [];

  for (const iso of Object.keys(timingsByIso)) {
    const timings = timingsByIso[iso];
    if (!timings) continue;
    const ovr = overridesByIso[iso];
    for (const p of PRAYER_ORDER) {
      const computed = normalizeClock(timings[p]);
      if (!computed) continue;
      const athan = resolveAthan(computed, ovr, OVERRIDE_FIELDS[p]);
      const delay = iqamahMinutes[p];
      const iqClock =
        delay != null ? iqamClockFromAthancLock(athan, delay) : athan;
      const at = iqamahInstantInZone({
        prayerDayIso: iso,
        athanClock: athan,
        iqClock,
        timeZone,
      });
      if (at.getTime() > now.getTime()) {
        candidates.push({ prayer: p, at });
      }
    }
  }

  candidates.sort((a, b) => a.at.getTime() - b.at.getTime());
  const first = candidates[0];
  if (!first) return null;
  return { prayer: first.prayer, target: first.at.toISOString() };
}
