export const LOCALE_COOKIE = "des_locale";

export type Locale = "en" | "ar";

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "ar";
}
