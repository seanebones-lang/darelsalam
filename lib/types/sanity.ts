import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";

/** Minimal typings for Sanity objects used in Next.js rendering. */
export interface NavLinkSanity {
  label?: string | null;
  labelAr?: string | null;
  href?: string | null;
  openInNewTab?: boolean | null;
}

export interface DonationTierSanity {
  amountLabel?: string | null;
  amountLabelAr?: string | null;
  externalUrl?: string | null;
}

export interface DonationCategorySanity {
  label?: string | null;
  labelAr?: string | null;
  subtitle?: string | null;
  subtitleAr?: string | null;
  externalUrl?: string | null;
}

export interface ActivityItemSanity {
  title?: string | null;
  titleAr?: string | null;
  body?: string | null;
  bodyAr?: string | null;
  iconKey?: string | null;
}

export interface CarouselSlideSanity {
  _id: string;
  title?: string | null;
  titleAr?: string | null;
  subtitle?: string | null;
  subtitleAr?: string | null;
  body?: PortableTextBlock[] | null;
  bodyAr?: PortableTextBlock[] | null;
  image?: SanityImageSource;
  linkLabel?: string | null;
  linkLabelAr?: string | null;
  linkHref?: string | null;
  orderRank?: number | null;
}

export interface IqamahMinutesSanity {
  fajr?: number | null;
  dhuhr?: number | null;
  asr?: number | null;
  maghrib?: number | null;
  isha?: number | null;
}

export interface PrayerDayOverrideSanity {
  _id: string;
  date?: string;
  useCalculatedAthans?: boolean | null;
  overrideFajr?: string | null;
  overrideDhuhr?: string | null;
  overrideAsr?: string | null;
  overrideMaghrib?: string | null;
  overrideIsha?: string | null;
}

export interface SiteSettingsSanity {
  _id: string;
  siteTitle?: string | null;
  siteTitleAr?: string | null;
  defaultMetaDescription?: string | null;
  defaultMetaDescriptionAr?: string | null;
  navigation?: NavLinkSanity[] | null;
  addressLine?: string | null;
  addressLineAr?: string | null;
  phoneDisplay?: string | null;
  phoneHref?: string | null;
  email?: string | null;
  homeHeroEyebrow?: string | null;
  homeHeroEyebrowAr?: string | null;
  homeHeroTitle?: string | null;
  homeHeroTitleAr?: string | null;
  homeHeroSubtitle?: string | null;
  homeHeroSubtitleAr?: string | null;
  donationRibbonTitle?: string | null;
  donationRibbonTitleAr?: string | null;
  donationRibbonSubtitle?: string | null;
  donationRibbonSubtitleAr?: string | null;
  donationStripeOneTimeTiers?: DonationTierSanity[] | null;
  donationStripeMonthlyTiers?: DonationTierSanity[] | null;
  donationCategories?: DonationCategorySanity[] | null;
  activities?: ActivityItemSanity[] | null;
  youthHeadline?: string | null;
  youthHeadlineAr?: string | null;
  youthStatusLabel?: string | null;
  youthStatusLabelAr?: string | null;
  youthBody?: string | null;
  youthBodyAr?: string | null;
  learnDeenHeadline?: string | null;
  learnDeenHeadlineAr?: string | null;
  learnDeenBody?: string | null;
  learnDeenBodyAr?: string | null;
  newMuslimsSectionTitle?: string | null;
  newMuslimsSectionTitleAr?: string | null;
  newMuslimsSlides?: CarouselSlideSanity[] | null;
  fatwaHeading?: string | null;
  fatwaHeadingAr?: string | null;
  fatwaIntro?: string | null;
  fatwaIntroAr?: string | null;
  fatwaDisclaimer?: string | null;
  fatwaDisclaimerAr?: string | null;
  chatbotDisclaimer?: string | null;
  chatbotDisclaimerAr?: string | null;
  chatbotSuggestedPrompts?: string | null;
  chatbotSuggestedPromptsAr?: string | null;
  prayerLatitude?: number | null;
  prayerLongitude?: number | null;
  prayerTimezoneLabel?: string | null;
  prayerCalculationMethodLabel?: number | null;
  iqamahMinutesAfterAdhan?: IqamahMinutesSanity | null;
}

export interface PageContentSanity {
  title?: string | null;
  titleAr?: string | null;
  intro?: string | null;
  introAr?: string | null;
  body?: PortableTextBlock[] | null;
  bodyAr?: PortableTextBlock[] | null;
  seoDescription?: string | null;
  seoDescriptionAr?: string | null;
}

export interface LegalPageSanity {
  title?: string | null;
  titleAr?: string | null;
  body?: PortableTextBlock[] | null;
  bodyAr?: PortableTextBlock[] | null;
}
