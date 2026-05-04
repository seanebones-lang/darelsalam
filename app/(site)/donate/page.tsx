import type { Metadata } from "next";
import { DonateBoard } from "@/components/donate-board";
import { t } from "@/lib/i18n/messages";
import { getServerLocale } from "@/lib/i18n/server";
import { getSiteSettings } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Honor Dar El Salam through zakat facilitation, sustaining classes, rebuilding efforts, outreach, relief, masjid upkeep, youth, and newcomer care.",
};

export default async function DonatePage() {
  const [settings, locale] = await Promise.all([
    getSiteSettings(),
    getServerLocale(),
  ]);

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
