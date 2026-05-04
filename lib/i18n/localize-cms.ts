import type { Locale } from "@/lib/i18n/constants";
import type {
  ActivityItemSanity,
  CarouselSlideSanity,
  DonationCategorySanity,
  DonationTierSanity,
  LegalPageSanity,
  NavLinkSanity,
  PageContentSanity,
  SiteSettingsSanity,
} from "@/lib/types/sanity";
import { pickLocalized } from "@/lib/i18n/pick-localized";

function mapTier(locale: Locale, tier: DonationTierSanity): DonationTierSanity {
  if (locale !== "ar") return tier;
  return {
    ...tier,
    amountLabel: pickLocalized(locale, tier.amountLabel, tier.amountLabelAr),
  };
}

function mapCategory(locale: Locale, row: DonationCategorySanity): DonationCategorySanity {
  if (locale !== "ar") return row;
  return {
    ...row,
    label: pickLocalized(locale, row.label, row.labelAr),
    subtitle: pickLocalized(locale, row.subtitle, row.subtitleAr),
  };
}

function mapActivity(locale: Locale, row: ActivityItemSanity): ActivityItemSanity {
  if (locale !== "ar") return row;
  return {
    ...row,
    title: pickLocalized(locale, row.title, row.titleAr),
    body: pickLocalized(locale, row.body, row.bodyAr),
  };
}

function mapSlide(locale: Locale, slide: CarouselSlideSanity): CarouselSlideSanity {
  if (locale !== "ar") return slide;
  return {
    ...slide,
    title: pickLocalized(locale, slide.title, slide.titleAr),
    subtitle: pickLocalized(locale, slide.subtitle, slide.subtitleAr),
    linkLabel: pickLocalized(locale, slide.linkLabel, slide.linkLabelAr),
    body: slide.bodyAr?.length ? slide.bodyAr : slide.body,
  };
}

function mapNav(locale: Locale, link: NavLinkSanity): NavLinkSanity {
  if (locale !== "ar") return link;
  return {
    ...link,
    label: pickLocalized(locale, link.label, link.labelAr),
  };
}

/** Applies optional `*Ar` Sanity fields when `locale === "ar"`. */
export function localizeSiteSettings(
  settings: SiteSettingsSanity,
  locale: Locale,
): SiteSettingsSanity {
  if (locale !== "ar") return settings;
  return {
    ...settings,
    siteTitle: pickLocalized(locale, settings.siteTitle, settings.siteTitleAr),
    defaultMetaDescription: pickLocalized(
      locale,
      settings.defaultMetaDescription,
      settings.defaultMetaDescriptionAr,
    ),
    navigation: settings.navigation?.map((l) => mapNav(locale, l)) ?? settings.navigation,
    addressLine: pickLocalized(locale, settings.addressLine, settings.addressLineAr),
    homeHeroEyebrow: pickLocalized(locale, settings.homeHeroEyebrow, settings.homeHeroEyebrowAr),
    homeHeroTitle: pickLocalized(locale, settings.homeHeroTitle, settings.homeHeroTitleAr),
    homeHeroSubtitle: pickLocalized(locale, settings.homeHeroSubtitle, settings.homeHeroSubtitleAr),
    donationRibbonTitle: pickLocalized(
      locale,
      settings.donationRibbonTitle,
      settings.donationRibbonTitleAr,
    ),
    donationRibbonSubtitle: pickLocalized(
      locale,
      settings.donationRibbonSubtitle,
      settings.donationRibbonSubtitleAr,
    ),
    donationStripeOneTimeTiers:
      settings.donationStripeOneTimeTiers?.map((x) => mapTier(locale, x)) ??
      settings.donationStripeOneTimeTiers,
    donationStripeMonthlyTiers:
      settings.donationStripeMonthlyTiers?.map((x) => mapTier(locale, x)) ??
      settings.donationStripeMonthlyTiers,
    donationCategories:
      settings.donationCategories?.map((x) => mapCategory(locale, x)) ?? settings.donationCategories,
    activities: settings.activities?.map((x) => mapActivity(locale, x)) ?? settings.activities,
    youthHeadline: pickLocalized(locale, settings.youthHeadline, settings.youthHeadlineAr),
    youthStatusLabel: pickLocalized(locale, settings.youthStatusLabel, settings.youthStatusLabelAr),
    youthBody: pickLocalized(locale, settings.youthBody, settings.youthBodyAr),
    learnDeenHeadline: pickLocalized(locale, settings.learnDeenHeadline, settings.learnDeenHeadlineAr),
    learnDeenBody: pickLocalized(locale, settings.learnDeenBody, settings.learnDeenBodyAr),
    newMuslimsSectionTitle: pickLocalized(
      locale,
      settings.newMuslimsSectionTitle,
      settings.newMuslimsSectionTitleAr,
    ),
    newMuslimsSlides:
      settings.newMuslimsSlides?.map((s) => mapSlide(locale, s)) ?? settings.newMuslimsSlides,
    fatwaHeading: pickLocalized(locale, settings.fatwaHeading, settings.fatwaHeadingAr),
    fatwaIntro: pickLocalized(locale, settings.fatwaIntro, settings.fatwaIntroAr),
    fatwaDisclaimer: pickLocalized(locale, settings.fatwaDisclaimer, settings.fatwaDisclaimerAr),
    chatbotDisclaimer: pickLocalized(
      locale,
      settings.chatbotDisclaimer,
      settings.chatbotDisclaimerAr,
    ),
    chatbotSuggestedPrompts: pickLocalized(
      locale,
      settings.chatbotSuggestedPrompts,
      settings.chatbotSuggestedPromptsAr,
    ),
  };
}

export function localizePageContent(
  page: PageContentSanity | null,
  locale: Locale,
): PageContentSanity | null {
  if (!page || locale !== "ar") return page;
  return {
    ...page,
    title: pickLocalized(locale, page.title, page.titleAr),
    intro: pickLocalized(locale, page.intro, page.introAr),
    body: page.bodyAr?.length ? page.bodyAr : page.body,
    seoDescription: pickLocalized(locale, page.seoDescription, page.seoDescriptionAr),
  };
}

export function localizeLegalPage(
  legal: LegalPageSanity | null,
  locale: Locale,
): LegalPageSanity | null {
  if (!legal || locale !== "ar") return legal;
  return {
    ...legal,
    title: pickLocalized(locale, legal.title, legal.titleAr),
    body: legal.bodyAr?.length ? legal.bodyAr : legal.body,
  };
}
