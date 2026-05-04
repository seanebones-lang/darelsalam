import type { Metadata } from "next";
import { PortableBody } from "@/components/portable-body";
import { t } from "@/lib/i18n/messages";
import { getServerLocale } from "@/lib/i18n/server";
import { getPageBySlug } from "@/lib/site-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About us",
};

export default async function AboutPage() {
  const [cms, locale] = await Promise.all([
    getPageBySlug("about"),
    getServerLocale(),
  ]);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-10 px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="space-y-3 text-center md:text-start">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-800 dark:text-emerald-100">
          {t(locale, "about.eyebrow")}
        </p>
        <h1 className="font-serif text-4xl text-emerald-950 md:text-5xl dark:text-emerald-50">
          {cms?.title ?? "Mission • Vision"}
        </h1>
      </div>
      {cms?.intro && (
        <p className="text-lg leading-relaxed text-emerald-900 dark:text-emerald-100">{cms.intro}</p>
      )}
      <PortableBody value={cms?.body ?? []} />
      {!cms?.body?.length && (
        <>
          <section className="space-y-5 rounded-[32px] border border-emerald-900/15 bg-white/90 p-8 dark:border-emerald-600/35 dark:bg-emerald-900">
            <h2 className="font-serif text-3xl text-emerald-950 dark:text-emerald-50">
              {t(locale, "about.missionTitle")}
            </h2>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              {t(locale, "about.missionBody")}
            </p>
          </section>
          <section className="space-y-5 rounded-[32px] border border-emerald-900/15 bg-emerald-50/70 p-8 dark:border-emerald-600/35 dark:bg-emerald-900">
            <h2 className="font-serif text-3xl text-emerald-950 dark:text-emerald-50">
              {t(locale, "about.visionTitle")}
            </h2>
            <ul className="list-disc space-y-3 ps-7 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
              <li>{t(locale, "about.visionLi1")}</li>
              <li>{t(locale, "about.visionLi2")}</li>
              <li>{t(locale, "about.visionLi3")}</li>
            </ul>
          </section>
        </>
      )}
      <div className="space-y-3 text-center text-xs uppercase tracking-[0.3em] md:text-start">
        <Link href="/terms" prefetch={false} className="text-emerald-800 hover:underline dark:text-emerald-100">
          {t(locale, "about.terms")}
        </Link>
        <Link
          href="/privacy"
          prefetch={false}
          className="ms-6 text-emerald-800 hover:underline dark:text-emerald-100"
        >
          {t(locale, "about.privacy")}
        </Link>
      </div>
    </div>
  );
}
