import { blockContent } from "./objects/blockContent";
import { activityItemType } from "./objects/activity";
import { carouselSlide } from "./documents/carouselSlide";
import { donationCategoryType } from "./objects/donationCategory";
import { donationTierType } from "./objects/donationTier";
import { legalPage } from "./documents/legalPage";
import { navLinkType } from "./objects/navLink";
import { pageContent } from "./documents/pageContent";
import { prayerDayOverride } from "./documents/prayerDayOverride";
import { siteSettings } from "./documents/siteSettings";

export const schemaTypes = [
  blockContent,
  navLinkType,
  donationTierType,
  donationCategoryType,
  activityItemType,
  carouselSlide,
  prayerDayOverride,
  legalPage,
  pageContent,
  siteSettings,
];
