import type { Metadata } from "next";
import { DonateBoard } from "@/components/donate-board";
import { localizeSiteSettings } from "@/lib/i18n/localize-cms";
import { t } from "@/lib/i18n/messages";
import { getServerLocale } from "@/lib/i18n/server";
import { getSiteSettings } from "@/lib/site-data";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: t(locale, "meta.donateTitle"),
    description: t(locale, "meta.donateDescription"),
    openGraph: {
      locale: locale === "ar" ? "ar_SA" : "en_US",
      title: t(locale, "meta.donateTitle"),
      description: t(locale, "meta.donateDescription"),
    },
  };
}

export default async function DonatePage() {
  const [rawSettings, locale] = await Promise.all([getSiteSettings(), getServerLocale()]);
  const settings = localizeSiteSettings(rawSettings, locale);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <DonateBoard
        heroTitle={t(locale, "donate.title")}
        heroSubtitle={`${settings.donationRibbonSubtitle ?? ""}`.trim() || undefined}
        oneTime={settings.donationStripeOneTimeTiers}
        monthly={settings.donationStripeMonthlyTiers}
        categories={settings.donationCategories}
      />
    </div>
  );
}
