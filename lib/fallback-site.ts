import type { CarouselSlideSanity, SiteSettingsSanity } from "@/lib/types/sanity";

/** Mirrors darelsalam.org homepage carousel link to the illustrated guide PDF. */
const placeholderSlides: CarouselSlideSanity[] = [
  {
    _id: "seed-slide-guide",
    title: "A Brief Illustrated Guide to Understanding Islam",
    subtitle: "Download the PDF shared on the legacy homepage.",
    body: [],
    linkLabel: "Open guide (PDF)",
    linkHref: "https://darelsalam.org/assets/Brief_Illustrated.pdf",
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
    "Here at Dar El Salam we offer classes that are not exclusive to anyone. All are invited and welcomed into our doors to expand your knowledge about the religion of peace — alongside five daily prayers and community care.",
  donationRibbonTitle: "Make a Difference Today: Your Donation Changes Lives",
  donationRibbonSubtitle: "",
  donationStripeOneTimeTiers: [
    {
      amountLabel: "$50",
      externalUrl:
        "https://www.paypal.com/cgi-bin/webscr?business=info%40darelsalam.org&cmd=_donations&item_name=General+Donation&item_number=Enter+your+amount+below&currency_code=USD",
    },
    {
      amountLabel: "$150",
      externalUrl:
        "https://www.paypal.com/cgi-bin/webscr?business=info%40darelsalam.org&cmd=_donations&item_name=General+Donation&item_number=Enter+your+amount+below&currency_code=USD",
    },
    {
      amountLabel: "$250",
      externalUrl:
        "https://www.paypal.com/cgi-bin/webscr?business=info%40darelsalam.org&cmd=_donations&item_name=General+donation&item_number=Enter+your+amount+below&currency_code=USD",
    },
  ],
  donationStripeMonthlyTiers: [
    {
      amountLabel: "$50 / month",
      externalUrl:
        "https://www.paypal.com/cgi-bin/webscr?business=info%40darelsalam.org&cmd=_donations&item_name=General+Donation+&item_number=Enter+your+amount+below&currency_code=USD",
    },
    {
      amountLabel: "$150 / month",
      externalUrl:
        "https://www.paypal.com/cgi-bin/webscr?business=info%40darelsalam.org&cmd=_donations&item_name=General+Donation&item_number=Enter+your+amount+below&currency_code=USD",
    },
    {
      amountLabel: "$250 / month",
      externalUrl:
        "https://www.paypal.com/cgi-bin/webscr?business=info%40darelsalam.org&cmd=_donations&item_name=General+Donation&item_number=Enter+your+amount+below&currency_code=USD",
    },
  ],
  donationCategories: [
    {
      label: "Classes",
      subtitle: "$50 or",
      externalUrl:
        "https://www.paypal.com/cgi-bin/webscr?business=info%40darelsalam.org&cmd=_donations&item_name=Classes&item_number=Enter+your+amount+below&currency_code=USD",
    },
    {
      label: "Saddaqah",
      subtitle: "$50 or",
      externalUrl:
        "https://www.paypal.com/cgi-bin/webscr?business=info%40darelsalam.org&cmd=_donations&item_name=Saddaqah&item_number=Enter+your+amount+below&currency_code=USD",
    },
    {
      label: "Masjid",
      subtitle: "$50 or",
      externalUrl:
        "https://www.paypal.com/cgi-bin/webscr?business=info%40darelsalam.org&cmd=_donations&item_name=Masjid&item_number=Enter+your+amount+below&currency_code=USD",
    },
    {
      label: "Youth",
      subtitle: "$50 or",
      externalUrl:
        "https://www.paypal.com/cgi-bin/webscr?business=info%40darelsalam.org&cmd=_donations&item_name=Youth&item_number=Enter+your+amount+below&currency_code=USD",
    },
    {
      label: "Zakkat Almaal",
      subtitle: "$50 or",
      externalUrl:
        "https://www.paypal.com/cgi-bin/webscr?business=info%40darelsalam.org&cmd=_donations&item_name=Zakkat+Almaal&item_number=Enter+the+amount+below&currency_code=USD",
    },
    {
      label: "Fitr Zakkah",
      subtitle: "$50 or",
      externalUrl:
        "https://www.paypal.com/cgi-bin/webscr?business=info%40darelsalam.org&cmd=_donations&item_name=Fitr+Zakkah+&item_number=Enter+your+amount+below&currency_code=USD",
    },
  ],
  activities: [
    {
      title: "Salah",
      iconKey: "mosque",
      body:
        "Prayer is a fundamental practice mandated by Allah (SWT). We uphold all five daily prayers and warmly invite everyone to join us in this spiritual routine or to learn more about this path of goodness.",
    },
    {
      title: "Classes",
      iconKey: "book",
      body:
        "At Dar El Salam, we offer inclusive classes open to everyone. We welcome all to come and deepen their understanding of the religion of peace.",
    },
    {
      title: "Principles",
      iconKey: "compass",
      body:
        "Principles are essential in everyone's life, and we are committed to embodying ours. Our environment at Dar El Salam is rooted in Islamic values and is characterized by patience and grace.",
    },
  ],
  youthHeadline: "Youth Center",
  youthStatusLabel: "(Coming Soon)",
  youthBody:
    "What better place can you involve your kids with other than a youth center at the masjid. W'll have a wide variety of sports/ wellbeing activities alongside a great supportive staff.",
  learnDeenHeadline: "Learn your Deen",
  learnDeenBody:
    "Perks of an amazing staff comes with great teachers; we not only prepare our bright students with an abundance of knowledge about the religion of peace but we prepare them for the real world that will ultimately achieve success for our youth.",
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
