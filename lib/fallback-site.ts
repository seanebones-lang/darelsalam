import type { CarouselSlideSanity, SiteSettingsSanity } from "@/lib/types/sanity";

const placeholderSlides: CarouselSlideSanity[] = [
  {
    _id: "seed-slide-guide",
    title: "A Brief Illustrated Guide to Understanding Islam",
    subtitle: "A gentle orientation for newcomers and neighbors.",
    body: [],
    linkLabel: "Explore resources",
    linkHref: "https://www.islam-guide.com/",
    orderRank: 0,
  },
];

export const FALLBACK_SITE_SETTINGS: SiteSettingsSanity = {
  _id: "siteSettings-fallback",
  siteTitle: "Dar El Salam",
  defaultMetaDescription:
    "Dar El Salam welcomes you in Arlington, Texas — prayer, learning, youth support, and community rooted in mercy and adab.",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Quran", href: "/quran" },
    { label: "Athan & Iqamah", href: "/prayer-times" },
    { label: "About us", href: "/about" },
    { label: "New Muslims", href: "/new-muslims" },
    { label: "Donate", href: "/donate" },
    { label: "Contact", href: "/contact" },
  ],
  addressLine: "500 W Road to Six Flags St, Arlington, TX 76011",
  phoneDisplay: "+1 (817) 548-1700",
  phoneHref: "tel:+18175481700",
  email: "info@darelsalam.org",
  homeHeroEyebrow: "Welcome",
  homeHeroTitle: "Dar El Salam Islamic Center",
  homeHeroSubtitle:
    "Serving Arlington with daily prayer, learning circles, compassionate outreach to new Muslims, and space for reflection and adab.",
  donationRibbonTitle: "Make a Difference Today: Your Donation Changes Lives",
  donationRibbonSubtitle:
    "Your support strengthens classes for every age, community care, relief efforts, masjid upkeep, youth programs, and Zakat facilitation.",
  donationStripeOneTimeTiers: [
    {
      amountLabel: "$50",
      externalUrl: "https://example.com/donate?utm_source=website&amount=50",
    },
    {
      amountLabel: "$150",
      externalUrl: "https://example.com/donate&utm_source=website&amount=150",
    },
    {
      amountLabel: "$250",
      externalUrl: "https://example.com/donate&utm_source=website&amount=250",
    },
  ],
  donationStripeMonthlyTiers: [
    {
      amountLabel: "$50 / month",
      externalUrl: "https://example.com/donate?utm_source=website&frequency=monthly&amount=50",
    },
    {
      amountLabel: "$150 / month",
      externalUrl:
        "https://example.com/donate?utm_source=website&frequency=monthly&amount=150",
    },
    {
      amountLabel: "$250 / month",
      externalUrl:
        "https://example.com/donate?utm_source=website&frequency=monthly&amount=250",
    },
  ],
  donationCategories: [
    {
      label: "Classes",
      subtitle: "$50 or preferred amount",
      externalUrl: "https://example.com/donate-classes",
    },
    {
      label: "Sadaqah",
      subtitle: "$50 or preferred amount",
      externalUrl: "https://example.com/donate-sadaqah",
    },
    {
      label: "Masjid",
      subtitle: "$50 or preferred amount",
      externalUrl: "https://example.com/donate-masjid",
    },
    {
      label: "Youth",
      subtitle: "$50 or preferred amount",
      externalUrl: "https://example.com/donate-youth",
    },
    {
      label: "Zakat al Maal",
      subtitle: "$50 or preferred amount",
      externalUrl: "https://example.com/zakat-maal",
    },
    {
      label: "Fitr Zakat",
      subtitle: "$50 or preferred amount",
      externalUrl: "https://example.com/zakat-fitr",
    },
  ],
  activities: [
    {
      title: "Salah",
      iconKey: "mosque",
      body:
        "Prayer is a fundamental practice mandated by Allah (SWT). We uphold all five daily prayers and warmly invite everyone to join us or to learn more about this spiritual routine.",
    },
    {
      title: "Classes",
      iconKey: "book",
      body:
        "Inclusive classes deepen understanding with patience and adab. Scholars, seekers, curious neighbors—all are welcome.",
    },
    {
      title: "Principles",
      iconKey: "compass",
      body:
        "Our environment embodies Islamic values grounded in rahmah, patience, and integrity so every guest feels cherished.",
    },
  ],
  youthHeadline: "Youth Center",
  youthStatusLabel: "(Coming Soon)",
  youthBody:
    "Soon the masjid youth center will offer sports and wellbeing gatherings with caring mentors nurturing confidence and adab.",
  learnDeenHeadline: "Learn your Deen",
  learnDeenBody:
    "Trusted teachers illuminate sacred knowledge alongside practical mentorship so scholars of tomorrow uplift their families.",
  newMuslimsSectionTitle: "New Muslims",
  newMuslimsSlides: placeholderSlides,
  fatwaHeading: "Fatwa Request",
  fatwaIntro:
    "Submit detailed questions respectful of Imam availability. Sensitive matters deserve direct counsel from qualified scholarship.",
  fatwaDisclaimer:
    "Please include contact information responsibly. Confidential matters deserve private conversation.",
  chatbotDisclaimer:
    "This assistant cites masjid-published information when possible yet may err. Sacred knowledge deserves verification with scholarly leadership; personal rulings belong to Imam / formally submitted Fatwa requests.",
  chatbotSuggestedPrompts:
    "What classes are hosted here?\nWhen is Friday prayer?\nHow can visitors join congregational salah?\nWho supports new Muslims?",
  prayerLatitude: 32.7506,
  prayerLongitude: -97.0692,
  prayerTimezoneLabel: "America/Chicago",
  prayerCalculationMethodLabel: 15,
  iqamahMinutesAfterAdhan: {
    fajr: 20,
    dhuhr: 15,
    asr: 15,
    maghrib: 12,
    isha: 15,
  },
};
