import { ChatWidget } from "@/components/chat-widget";
import { CookieBanner } from "@/components/cookie-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { localizeSiteSettings } from "@/lib/i18n/localize-cms";
import { getServerLocale } from "@/lib/i18n/server";
import { t } from "@/lib/i18n/messages";
import { getSiteSettings } from "@/lib/site-data";

export default async function SiteChromeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rawSettings, locale] = await Promise.all([getSiteSettings(), getServerLocale()]);
  const settings = localizeSiteSettings(rawSettings, locale);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#site-main" className="sr-focus">
        {t(locale, "common.skip")}
      </a>
      <SiteHeader links={settings.navigation ?? []} />
      <main
        id="site-main"
        className="flex min-w-0 flex-1 flex-col pb-28 sm:pb-24 md:pb-[max(3rem,env(safe-area-inset-bottom,0px))]"
      >
        {children}
      </main>
      <SiteFooter
        locale={locale}
        settings={{
          addressLine: settings.addressLine,
          email: settings.email,
          phoneDisplay: settings.phoneDisplay,
          phoneHref: settings.phoneHref,
          siteTitle: settings.siteTitle,
        }}
      />
      <ChatWidget
        disclaimer={settings.chatbotDisclaimer}
        suggestedPromptsRaw={settings.chatbotSuggestedPrompts}
      />
      <CookieBanner />
    </div>
  );
}
