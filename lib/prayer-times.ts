import { addMinutes, format as formatFns } from "date-fns";
import type {
  PrayerDayOverrideSanity,
} from "@/lib/types/sanity";

export type CanonicalPrayer = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

interface AladhanTimingsPayload {
  data?: {
    timings?: Record<string, string>;
    date?: { readable?: string; gregorian?: { date?: string } };
    meta?: { timezone?: string };
  };
}

const PRAYER_FIELDS: CanonicalPrayer[] = [
  "Fajr",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
];

const FIELD_MAP: Record<CanonicalPrayer, string> = {
  Fajr: "Fajr",
  Dhuhr: "Dhuhr",
  Asr: "Asr",
  Maghrib: "Maghrib",
  Isha: "Isha",
};

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

/** Strip suffixes Aladhan sometimes appends (" (CDT)") and keep HH:mm. */
export function normalizeClock(raw: string | undefined): string | null {
  if (!raw) return null;
  const token = raw.trim().split(/\s+/)[0];
  const match = /^(\d{1,2}):(\d{2})$/.exec(token);
  return match ? `${match[1].padStart(2, "0")}:${match[2]}` : token;
}

function parseClockToMinutes(clock: string): number {
  const [hStr, mStr] = clock.split(":");
  return Number.parseInt(hStr, 10) * 60 + Number.parseInt(mStr, 10);
}

export function iqamClockFromAthancLock(
  athanClock: string,
  minutesLater: number,
): string {
  const baseMinutes = parseClockToMinutes(athanClock);
  const total = baseMinutes + minutesLater;
  const hours = Math.floor(total / 60) % 24;
  const mins = total % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

export async function fetchAladhanForDate(opts: {
  isoDate: string;
  latitude: number;
  longitude: number;
  method: number;
}): Promise<Record<CanonicalPrayer, string>> {
  const url = `https://api.aladhan.com/v1/timings/${opts.isoDate}?latitude=${opts.latitude}&longitude=${opts.longitude}&method=${opts.method}&school=1`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 1800 },
  });
  if (!response.ok) {
    throw new Error(`Aladhan error ${response.status}`);
  }

  const body = (await response.json()) as AladhanTimingsPayload;
  const timings = body.data?.timings;

  const out: Partial<Record<CanonicalPrayer, string>> = {};
  for (const salah of PRAYER_FIELDS) {
    const key = FIELD_MAP[salah];
    const clock = normalizeClock(timings?.[key]);
    if (!clock) {
      throw new Error(`Missing timing for ${salah}`);
    }
    out[salah] = clock;
  }

  return out as Record<CanonicalPrayer, string>;
}

interface DayRowOpts {
  date: Date;
  latitude: number;
  longitude: number;
  method: number;
}

export interface PrayerRow {
  dateLabel: string;
  isoDate: string;
  times: Record<CanonicalPrayer, { athan: string; iqamah: string }>;
}

/** Short label for headings in the timetable. */
export function formatGregorian(date: Date) {
  return formatFns(date, "EEE, MMM d");
}

async function hydrateRow(
  opts: DayRowOpts,
  iqMinutes: Partial<Record<CanonicalPrayer, number>>,
): Promise<PrayerRow> {
  const isoDate = formatFns(opts.date, "yyyy-MM-dd");
  const computed = await fetchAladhanForDate({
    isoDate,
    latitude: opts.latitude,
    longitude: opts.longitude,
    method: opts.method,
  });

  const times = {} as Record<CanonicalPrayer, { athan: string; iqamah: string }>;

  for (const salah of PRAYER_FIELDS) {
    const athan = computed[salah];
    const delay = iqMinutes[salah];
    times[salah] = {
      athan,
      iqamah: delay != null ? iqamClockFromAthancLock(athan, delay) : athan,
    };
  }

  return {
    dateLabel: formatGregorian(opts.date),
    isoDate,
    times,
  };
}

export async function buildWeeklySchedule(input: {
  startDate: Date;
  days?: number;
  latitude: number;
  longitude: number;
  method: number;
  iqamahMinutes: Partial<Record<CanonicalPrayer, number>>;
}) {
  const days = Math.max(1, input.days ?? 7);
  const rows: PrayerRow[] = [];
  const cursor = new Date(input.startDate);
  cursor.setHours(12, 0, 0, 0);

  for (let i = 0; i < days; i++) {
    const clone = addMinutes(cursor, i * 24 * 60);
    rows.push(
      await hydrateRow(
        {
          date: clone,
          latitude: input.latitude,
          longitude: input.longitude,
          method: input.method,
        },
        input.iqamahMinutes,
      ),
    );
  }

  return rows;
}

/**
 * Apply optional per-day manual athan strings from Sanity.
 * If a field is empty, the API-derived athan from the row is preserved.
 */
export function applyPrayerOverrides(
  row: PrayerRow,
  override: PrayerDayOverrideSanity | null | undefined,
  iqamahMinutes: Partial<Record<CanonicalPrayer, number>>,
): PrayerRow {
  if (!override) return row;
  const next: PrayerRow = {
    ...row,
    times: { ...row.times },
  };

  for (const salah of PRAYER_FIELDS) {
    const fieldKey = OVERRIDE_FIELDS[salah];
    const manual = override[fieldKey];
    const adjustedAthan =
      typeof manual === "string" && manual.trim().length > 0
        ? normalizeClock(manual) ?? row.times[salah].athan
        : row.times[salah].athan;
    const delayed =
      iqamahMinutes[salah] != null
        ? iqamClockFromAthancLock(adjustedAthan, iqamahMinutes[salah]!)
        : adjustedAthan;

    next.times[salah] = {
      athan: adjustedAthan,
      iqamah: delayed,
    };
  }

  return next;
}
