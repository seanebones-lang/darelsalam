import type { Metadata } from "next";
import Link from "next/link";
import { FatwaForm } from "@/components/fatwa-form";
import { localizeSiteSettings } from "@/lib/i18n/localize-cms";
import { t } from "@/lib/i18n/messages";
import { getServerLocale } from "@/lib/i18n/server";
import { getSiteSettings } from "@/lib/site-data";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const desc = t(locale, "meta.contactDescription");
  return {
    title: t(locale, "meta.contactTitle"),
    description: desc,
    openGraph: {
      locale: locale === "ar" ? "ar_SA" : "en_US",
      title: t(locale, "meta.contactTitle"),
      description: desc,
    },
  };
}

const MAPS_SEARCH =
  "https://www.google.com/maps/search/?api=1&query=Dar+Elsalam+Islamic+Center+500+W+Road+to+Six+Flags+Arlington+TX+76011";

export default async function ContactPage() {
  const [locale, rawSettings] = await Promise.all([getServerLocale(), getSiteSettings()]);
  const settings = localizeSiteSettings(rawSettings, locale);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="space-y-2 text-center md:text-start">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-800 dark:text-emerald-100">
          {t(locale, "contact.eyebrow")}
        </p>
        <h1 className="font-serif text-4xl text-emerald-950 dark:text-emerald-50 md:text-5xl">
          {t(locale, "contact.title")}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-400">
          {t(locale, "contact.intro")}
        </p>
      </div>
      <section
        aria-labelledby="contact-info-heading"
        className="rounded-[32px] border border-emerald-900/15 bg-emerald-950 px-8 py-8 text-emerald-50 shadow-sm dark:border-emerald-600/40 dark:bg-emerald-900"
      >
        <h2
          id="contact-info-heading"
          className="font-serif text-2xl text-white md:text-3xl"
        >
          {t(locale, "contact.infoTitle")}
        </h2>
        {settings.addressLine && (
          <p className="mt-4 text-sm leading-relaxed text-emerald-100">{settings.addressLine}</p>
        )}
        <ul className="mt-4 space-y-2 text-sm">
          {settings.phoneHref && settings.phoneDisplay && (
            <li>
              <a className="font-medium underline-offset-4 hover:underline" href={settings.phoneHref}>
                {settings.phoneDisplay}
              </a>
            </li>
          )}
          {settings.email && (
            <li>
              <a className="font-medium underline-offset-4 hover:underline" href={`mailto:${settings.email}`}>
                {settings.email}
              </a>
            </li>
          )}
        </ul>
        <p className="mt-6">
          <Link
            href={MAPS_SEARCH}
            target="_blank"
            rel="noreferrer"
            className="inline-flex touch-manipulation items-center rounded-full border border-emerald-200/50 px-5 py-2.5 text-sm font-semibold text-emerald-50 hover:bg-emerald-800/80"
          >
            {t(locale, "contact.openMaps")}
          </Link>
        </p>
      </section>
      <FatwaForm
        heading={t(locale, "contact.formHeading")}
        intro={t(locale, "contact.formIntro")}
        topic="contact"
      />
    </div>
  );
}
