import type { Metadata } from "next";
import { FatwaForm } from "@/components/fatwa-form";
import { t } from "@/lib/i18n/messages";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const locale = await getServerLocale();

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
      <FatwaForm
        heading={t(locale, "contact.formHeading")}
        intro={t(locale, "contact.formIntro")}
        topic="contact"
      />
    </div>
  );
}
