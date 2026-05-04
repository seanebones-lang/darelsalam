import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";

/** Minimal typings for Sanity objects used in Next.js rendering. */
export interface NavLinkSanity {
  label?: string | null;
  href?: string | null;
  openInNewTab?: boolean | null;
}

export interface DonationTierSanity {
  amountLabel?: string | null;
  externalUrl?: string | null;
}

export interface DonationCategorySanity {
  label?: string | null;
  subtitle?: string | null;
  externalUrl?: string | null;
}

export interface ActivityItemSanity {
  title?: string | null;
  body?: string | null;
  iconKey?: string | null;
}

export interface CarouselSlideSanity {
  _id: string;
  title?: string | null;
  subtitle?: string | null;
  body?: PortableTextBlock[] | null;
  image?: SanityImageSource;
  linkLabel?: string | null;
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
  defaultMetaDescription?: string | null;
  navigation?: NavLinkSanity[] | null;
  addressLine?: string | null;
  phoneDisplay?: string | null;
  phoneHref?: string | null;
  email?: string | null;
  homeHeroEyebrow?: string | null;
  homeHeroTitle?: string | null;
  homeHeroSubtitle?: string | null;
  donationRibbonTitle?: string | null;
  donationRibbonSubtitle?: string | null;
  donationStripeOneTimeTiers?: DonationTierSanity[] | null;
  donationStripeMonthlyTiers?: DonationTierSanity[] | null;
  donationCategories?: DonationCategorySanity[] | null;
  activities?: ActivityItemSanity[] | null;
  youthHeadline?: string | null;
  youthStatusLabel?: string | null;
  youthBody?: string | null;
  learnDeenHeadline?: string | null;
  learnDeenBody?: string | null;
  newMuslimsSectionTitle?: string | null;
  newMuslimsSlides?: CarouselSlideSanity[] | null;
  fatwaHeading?: string | null;
  fatwaIntro?: string | null;
  fatwaDisclaimer?: string | null;
  chatbotDisclaimer?: string | null;
  chatbotSuggestedPrompts?: string | null;
  prayerLatitude?: number | null;
  prayerLongitude?: number | null;
  prayerTimezoneLabel?: string | null;
  prayerCalculationMethodLabel?: number | null;
  iqamahMinutesAfterAdhan?: IqamahMinutesSanity | null;
}

export interface PageContentSanity {
  title?: string | null;
  intro?: string | null;
  body?: PortableTextBlock[] | null;
  seoDescription?: string | null;
}

export interface LegalPageSanity {
  title?: string | null;
  body?: PortableTextBlock[] | null;
}
