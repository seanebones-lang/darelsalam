import type { Metadata } from "next";
import { PortableBody } from "@/components/portable-body";
import { t } from "@/lib/i18n/messages";
import { getServerLocale } from "@/lib/i18n/server";
import { getLegalBySlug } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default async function PrivacyPage() {
  const [legal, locale] = await Promise.all([
    getLegalBySlug("privacy"),
    getServerLocale(),
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <h1 className="font-serif text-4xl text-emerald-950 dark:text-emerald-50">
        {legal?.title ?? t(locale, "privacy.fallbackTitle")}
      </h1>
      {legal?.body?.length ? (
        <PortableBody value={legal.body} />
      ) : (
        <div className="space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>{t(locale, "privacy.fallback1")}</p>
          <p>{t(locale, "privacy.fallback2")}</p>
          <p>{t(locale, "privacy.fallback3")}</p>
        </div>
      )}
    </div>
  );
}
