import Link from "next/link";
import type { Locale } from "@/lib/i18n/constants";
import { t, tInterpolate } from "@/lib/i18n/messages";
import type { SiteSettingsSanity } from "@/lib/types/sanity";

interface SiteFooterProps {
  locale: Locale;
  settings: Pick<
    SiteSettingsSanity,
    "addressLine" | "phoneDisplay" | "phoneHref" | "email" | "siteTitle"
  >;
}

export function SiteFooter({ locale, settings }: SiteFooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-emerald-900/15 bg-emerald-950 pb-[env(safe-area-inset-bottom,0px)] text-emerald-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:flex-row lg:justify-between">
        <div>
          <p className="font-serif text-2xl">{settings.siteTitle}</p>
          <p className="mt-4 text-sm text-emerald-100">{settings.addressLine}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {settings.phoneHref && (
              <li>
                <a className="hover:underline" href={settings.phoneHref}>
                  {settings.phoneDisplay}
                </a>
              </li>
            )}
            {settings.email && (
              <li>
                <a className="hover:underline" href={`mailto:${settings.email}`}>
                  {settings.email}
                </a>
              </li>
            )}
          </ul>
        </div>
        <nav
          className="flex flex-col gap-1 text-sm uppercase tracking-wide text-emerald-200"
          aria-label="Footer"
        >
          <Link
            href="/privacy"
            className="touch-manipulation rounded-lg py-2.5 hover:text-white sm:py-1"
          >
            {t(locale, "footer.privacy")}
          </Link>
          <Link href="/terms" className="touch-manipulation rounded-lg py-2.5 hover:text-white sm:py-1">
            {t(locale, "footer.terms")}
          </Link>
          <Link
            href="/contact"
            className="touch-manipulation rounded-lg py-2.5 hover:text-white sm:py-1"
          >
            {t(locale, "footer.contact")}
          </Link>
        </nav>
      </div>
      <div className="border-t border-emerald-800/60 py-4 text-center text-xs text-emerald-200">
        {tInterpolate(locale, "footer.copyright", {
          year,
          siteTitle: settings.siteTitle ?? "",
        })}
      </div>
    </footer>
  );
}
