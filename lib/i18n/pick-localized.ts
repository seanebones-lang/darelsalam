import type { Locale } from "@/lib/i18n/constants";

/** When locale is Arabic, prefer `arabic` when non-empty; otherwise `primary`. */
export function pickLocalized<T extends string | null | undefined>(
  locale: Locale,
  primary: T,
  arabic?: T | null,
): T {
  if (locale !== "ar") return primary;
  if (arabic != null && String(arabic).trim() !== "") return arabic as T;
  return primary;
}
