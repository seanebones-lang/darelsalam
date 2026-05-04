import type { Metadata } from "next";
import Link from "next/link";
import { PortableBody } from "@/components/portable-body";
import { t } from "@/lib/i18n/messages";
import { getServerLocale } from "@/lib/i18n/server";
import { getPageBySlug } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Quran Resources",
};

export default async function QuranPage() {
  const [page, locale] = await Promise.all([
    getPageBySlug("quran"),
    getServerLocale(),
  ]);

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="space-y-3 text-center md:text-start">
        <p className="text-xs uppercase tracking-[0.45em] text-emerald-800 dark:text-emerald-100">
          {t(locale, "quran.eyebrow")}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-emerald-950 dark:text-emerald-50">
          {page?.title ?? t(locale, "quran.fallbackTitle")}
        </h1>
      </div>
      {page?.intro && (
        <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">{page.intro}</p>
      )}
      <PortableBody value={page?.body ?? []} />
      {!page?.body?.length && (
        <>
          <p className="text-base leading-relaxed text-emerald-900 dark:text-emerald-100">
            {t(locale, "quran.fallbackP1")}
          </p>
          <div className="rounded-[30px] border border-emerald-900/15 bg-white/85 p-6 text-sm text-emerald-900 shadow-sm dark:border-emerald-600/35 dark:bg-emerald-900 dark:text-emerald-100 space-y-3">
            <p>{t(locale, "quran.fallbackRefsTitle")}</p>
            <ul className="list-disc space-y-2 ps-5">
              <li>
                {t(locale, "quran.fallbackLi1Label")}{" "}
                <Link className="underline" href="https://quran.com" target="_blank" rel="noreferrer">
                  quran.com
                </Link>
              </li>
              <li>
                {t(locale, "quran.fallbackLi2Label")}{" "}
                <Link className="underline" href="https://www.islam-guide.com" target="_blank" rel="noreferrer">
                  islam-guide.com
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
