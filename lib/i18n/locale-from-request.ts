import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/lib/i18n/constants";

/** Resolves UI locale from JSON body (preferred) or `Cookie` header. */
export function localeFromRequest(
  cookieHeader: string | null,
  bodyLocale: unknown,
): Locale {
  if (typeof bodyLocale === "string" && isLocale(bodyLocale)) {
    return bodyLocale;
  }
  if (!cookieHeader) return DEFAULT_LOCALE;
  const segments = cookieHeader.split(";").map((s) => s.trim());
  for (const seg of segments) {
    if (seg.startsWith(`${LOCALE_COOKIE}=`)) {
      const raw = seg.slice(LOCALE_COOKIE.length + 1).trim();
      if (isLocale(raw)) return raw;
    }
  }
  return DEFAULT_LOCALE;
}
