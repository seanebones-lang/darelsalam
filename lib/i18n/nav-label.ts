import type { Locale } from "@/lib/i18n/constants";

/** Arabic labels for internal routes when locale is Arabic (CMS `label` is often English). */
const NAV_AR: Record<string, string> = {
  "/": "الرئيسية",
  "/quran": "القرآن",
  "/prayer-times": "الأذان والإقامة",
  "/about": "من نحن",
  "/new-muslims": "المسلمون الجدد",
  "/donate": "تبرع",
  "/contact": "اتصل بنا",
};

function normalizePath(href: string): string | null {
  if (href.startsWith("http://") || href.startsWith("https://")) return null;
  const path = href.split("?")[0].split("#")[0];
  if (!path) return "/";
  return path.replace(/\/$/, "") || "/";
}

export function localizedNavLabel(
  locale: Locale,
  href: string | null | undefined,
  cmsLabel: string | null | undefined,
): string {
  if (locale !== "ar") return cmsLabel ?? "";
  const key = href ? normalizePath(href) : null;
  if (key != null && NAV_AR[key]) return NAV_AR[key];
  return cmsLabel ?? "";
}
