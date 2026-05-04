import { FALLBACK_SITE_SETTINGS } from "@/lib/fallback-site";
import { getSanityClient } from "@/lib/sanity/client";
import {
  legalBySlugQuery,
  pageBySlugQuery,
  prayerOverridesForRangeQuery,
  siteSettingsQuery,
} from "@/lib/queries";
import type {
  LegalPageSanity,
  PageContentSanity,
  PrayerDayOverrideSanity,
  SiteSettingsSanity,
} from "@/lib/types/sanity";

function isSanityConfigured() {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  return Boolean(id && id !== "offline-placeholder");
}

function sortSlides(settings: SiteSettingsSanity): SiteSettingsSanity {
  if (!settings.newMuslimsSlides?.length) return settings;
  return {
    ...settings,
    newMuslimsSlides: [...settings.newMuslimsSlides].sort(
      (a, b) => (a.orderRank ?? 0) - (b.orderRank ?? 0),
    ),
  };
}

export async function getSiteSettings(): Promise<SiteSettingsSanity> {
  if (!isSanityConfigured()) {
    return FALLBACK_SITE_SETTINGS;
  }
  try {
    const raw = await getSanityClient().fetch<SiteSettingsSanity>(
      siteSettingsQuery,
      {},
      { next: { revalidate: 120 } },
    );
    if (!raw?.siteTitle) {
      return FALLBACK_SITE_SETTINGS;
    }
    return sortSlides(raw);
  } catch {
    return FALLBACK_SITE_SETTINGS;
  }
}

export async function getPageBySlug(
  slug: string,
): Promise<PageContentSanity | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    return await getSanityClient().fetch<PageContentSanity>(
      pageBySlugQuery,
      { slug },
      { next: { revalidate: 3600 } },
    );
  } catch {
    return null;
  }
}

export async function getLegalBySlug(
  slug: string,
): Promise<LegalPageSanity | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    return await getSanityClient().fetch<LegalPageSanity>(
      legalBySlugQuery,
      { slug },
      { next: { revalidate: 86400 } },
    );
  } catch {
    return null;
  }
}

export async function getPrayerOverrides(
  from: string,
  to: string,
): Promise<PrayerDayOverrideSanity[]> {
  if (!isSanityConfigured()) {
    return [];
  }
  try {
    return (
      (await getSanityClient().fetch<PrayerDayOverrideSanity[]>(
        prayerOverridesForRangeQuery,
        { from, to },
        { next: { revalidate: 600 } },
      )) ?? []
    );
  } catch {
    return [];
  }
}

/** Compact text for assistants / previews without shipping entire portable bodies. */
export function summarizeSiteSettingsForAi(settings: SiteSettingsSanity): string {
  const lines: string[] = [];
  lines.push(`Organization name: ${settings.siteTitle}`);
  lines.push(`Address: ${settings.addressLine ?? ""}`);
  lines.push(`Public phone (display): ${settings.phoneDisplay ?? ""}`);
  lines.push(`Email: ${settings.email ?? ""}`);
  lines.push("");
  lines.push("Navigation:");
  settings.navigation?.forEach((nav) =>
    lines.push(`- ${nav.label}: ${nav.href}`),
  );
  lines.push("");
  lines.push("Home headline:", settings.homeHeroTitle ?? "");
  lines.push(settings.homeHeroSubtitle ?? "");
  lines.push("");
  lines.push(
    settings.activities?.map((a) => `${a.title}: ${a.body}`).join("\n") ?? "",
  );
  lines.push("");
  lines.push("Programs / youth:", settings.youthHeadline ?? "");
  lines.push(settings.youthBody ?? "");
  lines.push("Learn:", settings.learnDeenHeadline ?? "");
  lines.push(settings.learnDeenBody ?? "");
  lines.push("");
  lines.push(settings.donationRibbonTitle ?? "");
  lines.push(settings.donationRibbonSubtitle ?? "");
  lines.push("");
  lines.push("Fatwa request intro:", settings.fatwaIntro ?? "");
  lines.push("");
  lines.push(
    settings.newMuslimsSlides
      ?.map((slide) =>
        `${slide.title ?? ""} — ${slide.subtitle ?? ""}`.trim(),
      )
      .filter(Boolean)
      .join("\n") ?? "",
  );
  return lines.join("\n").slice(0, 12000);
}
