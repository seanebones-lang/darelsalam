import type { Locale } from "@/lib/i18n/constants";
import type { CanonicalPrayer } from "@/lib/prayer-times";
import { t, type MessageKey } from "@/lib/i18n/messages";

const KEY: Record<CanonicalPrayer, MessageKey> = {
  Fajr: "prayerName.Fajr",
  Dhuhr: "prayerName.Dhuhr",
  Asr: "prayerName.Asr",
  Maghrib: "prayerName.Maghrib",
  Isha: "prayerName.Isha",
};

export function prayerLabel(locale: Locale, prayer: CanonicalPrayer): string {
  return t(locale, KEY[prayer]);
}
