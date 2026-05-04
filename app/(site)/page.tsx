import Link from "next/link";
import type { Metadata } from "next";
import { ActivityIcon } from "@/components/activity-icon";
import { FatwaForm } from "@/components/fatwa-form";
import { NewMuslimsCarousel } from "@/components/new-muslims-carousel";
import { localizeSiteSettings } from "@/lib/i18n/localize-cms";
import { t } from "@/lib/i18n/messages";
import { getServerLocale } from "@/lib/i18n/server";
import { getSiteSettings } from "@/lib/site-data";

export async function generateMetadata(): Promise<Metadata> {
  const [raw, locale] = await Promise.all([getSiteSettings(), getServerLocale()]);
  const settings = localizeSiteSettings(raw, locale);
  const description =
    settings.defaultMetaDescription?.trim() || t(locale, "meta.homeDescription");
  return {
    title: t(locale, "meta.homeTitle"),
    description,
    openGraph: {
      locale: locale === "ar" ? "ar_SA" : "en_US",
      title: t(locale, "meta.homeTitle"),
      description,
    },
  };
}

export default async function HomePage() {
  const [rawSettings, locale] = await Promise.all([getSiteSettings(), getServerLocale()]);
  const settings = localizeSiteSettings(rawSettings, locale);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-12 sm:gap-24 sm:px-6 sm:py-16 md:py-24">
      <section className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-6 md:text-start">
          {settings.homeHeroEyebrow && (
            <p className="text-xs uppercase tracking-[0.5em] text-emerald-700">
              {settings.homeHeroEyebrow}
            </p>
          )}
          <h1 className="font-serif text-4xl leading-tight text-emerald-950 sm:text-5xl md:text-6xl">
            {settings.homeHeroTitle}
          </h1>
          <p className="text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-emerald-100">
            {settings.homeHeroSubtitle}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/prayer-times"
              className="inline-flex min-h-12 touch-manipulation items-center justify-center rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-emerald-800 sm:px-8 dark:bg-emerald-200 dark:text-emerald-950"
            >
              {t(locale, "home.hero.ctaPrayer")}
            </Link>
            <Link
              href="/contact"
              prefetch={false}
              className="inline-flex min-h-12 touch-manipulation items-center justify-center rounded-full border border-emerald-900/30 px-6 py-3 text-sm font-semibold text-emerald-900 hover:bg-white sm:px-8 dark:border-emerald-100/40 dark:text-emerald-50"
            >
              {t(locale, "home.hero.ctaContact")}
            </Link>
          </div>
        </div>
        <div className="rounded-[40px] border border-emerald-900/10 bg-white/80 p-5 shadow-2xl backdrop-blur-md sm:p-8 dark:border-emerald-600/35 dark:bg-emerald-900">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-800 dark:text-emerald-100">
            {settings.newMuslimsSectionTitle ?? "New Muslims"}
          </p>
          <p className="mt-6 font-serif text-3xl text-emerald-950 dark:text-emerald-50">
            {t(locale, "home.newMuslims.guideTitle")}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-emerald-100">
            {t(locale, "home.newMuslims.guideBody")}
          </p>
          <Link
            href="/new-muslims"
            className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-800 underline-offset-8 hover:text-emerald-950 dark:text-emerald-100"
          >
            {t(locale, "home.newMuslims.explore")}
          </Link>
        </div>
      </section>

      <section className="rounded-[44px] border border-emerald-900/15 bg-emerald-900 px-5 py-10 text-emerald-50 shadow-[0_30px_80px_rgba(6,94,71,0.35)] sm:px-10 sm:py-12">
        <div className="grid gap-6 md:grid-cols-[1.05fr_auto] md:items-center">
          <div>
            <h2 className="font-serif text-2xl text-white sm:text-3xl md:text-4xl">
              {settings.donationRibbonTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100">
              {settings.donationRibbonSubtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/donate"
              className="rounded-full bg-emerald-200 px-7 py-3 text-center text-sm font-semibold text-emerald-950"
            >
              {t(locale, "home.donate.oneTime")}
            </Link>
            <Link
              href="/donate#monthly-anchor"
              className="rounded-full border border-emerald-200/60 px-7 py-3 text-center text-sm font-semibold text-white"
            >
              {t(locale, "home.donate.monthly")}
            </Link>
          </div>
        </div>
      </section>

      <NewMuslimsCarousel
        slides={settings.newMuslimsSlides ?? []}
        sectionTitle={settings.newMuslimsSectionTitle ?? "New Muslims"}
      />

      <section className="grid gap-8 md:grid-cols-[1fr_1fr]" id="learn-deen-anchor">
        <div className="rounded-[34px] border border-emerald-900/15 bg-white/85 p-8 dark:border-emerald-600/35 dark:bg-emerald-900">
          <p className="text-xs uppercase tracking-[0.45em] text-emerald-800 dark:text-emerald-100">
            {settings.youthStatusLabel ?? "Coming soon"}
          </p>
          <h2 className="mt-6 font-serif text-3xl text-emerald-950 dark:text-emerald-50">
            {settings.youthHeadline ?? "Youth Center"}
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-600 dark:text-emerald-100">
            {settings.youthBody}
          </p>
        </div>
        <div className="rounded-[34px] border border-emerald-900/15 bg-emerald-50/60 p-8 dark:border-emerald-600/35 dark:bg-emerald-900">
          <h2 className="font-serif text-3xl text-emerald-950 dark:text-emerald-50">
            {settings.learnDeenHeadline ?? "Learn your Deen"}
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-700 dark:text-emerald-100">
            {settings.learnDeenBody}
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center md:text-start">
          <p className="text-xs uppercase tracking-[0.45em] text-emerald-800 dark:text-emerald-100">
            {t(locale, "home.activities.eyebrow")}
          </p>
          <h2 className="mt-4 font-serif text-4xl text-emerald-950 dark:text-emerald-50">
            {t(locale, "home.activities.title")}
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {(settings.activities ?? []).map((activity) => (
            <article
              key={`${activity.title}-${activity.iconKey}`}
              className="flex h-full flex-col gap-4 rounded-[28px] border border-emerald-900/15 bg-white/85 p-6 dark:border-emerald-600/35 dark:bg-emerald-900"
            >
              <ActivityIcon keyName={activity.iconKey ?? "mosque"} />
              <h3 className="font-serif text-2xl text-emerald-950 dark:text-emerald-50">
                {activity.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-emerald-100">
                {activity.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <FatwaForm
        heading={settings.fatwaHeading}
        intro={settings.fatwaIntro}
        disclaimer={settings.fatwaDisclaimer}
      />
    </div>
  );
}
