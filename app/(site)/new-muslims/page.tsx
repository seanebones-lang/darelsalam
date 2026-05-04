import type { Metadata } from "next";
import Link from "next/link";
import { NewMuslimsCarousel } from "@/components/new-muslims-carousel";
import { PortableBody } from "@/components/portable-body";
import { t } from "@/lib/i18n/messages";
import { getServerLocale } from "@/lib/i18n/server";
import { getPageBySlug, getSiteSettings } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "New Muslims",
};

export default async function NewMuslimsPage() {
  const [settings, page, locale] = await Promise.all([
    getSiteSettings(),
    getPageBySlug("new-muslims"),
    getServerLocale(),
  ]);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-12 px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="space-y-4 text-center md:text-start">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-800 dark:text-emerald-100">
          {t(locale, "newMuslims.eyebrow")}
        </p>
        <h1 className="font-serif text-4xl text-emerald-950 md:text-5xl dark:text-emerald-50">
          {page?.title ?? "New Muslims accompaniment"}
        </h1>
        {page?.intro && (
          <p className="text-lg leading-relaxed text-emerald-900 dark:text-emerald-100">{page.intro}</p>
        )}
      </div>
      <PortableBody value={page?.body ?? []} />
      <NewMuslimsCarousel
        slides={settings.newMuslimsSlides ?? []}
        sectionTitle={settings.newMuslimsSectionTitle}
      />
      <div className="rounded-[32px] border border-emerald-900/15 bg-emerald-50/60 px-8 py-6 text-center text-sm text-emerald-900 dark:border-emerald-600/35 dark:bg-emerald-900 dark:text-emerald-100">
        {t(locale, "newMuslims.confidentialBefore")}{" "}
        <Link className="font-semibold underline" href="/contact">
          {t(locale, "newMuslims.confidentialLink")}
        </Link>{" "}
        {t(locale, "newMuslims.confidentialAfter")}
      </div>
    </div>
  );
}
