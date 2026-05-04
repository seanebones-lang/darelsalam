import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { themeInitMinScript } from "@/components/theme-script";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
import { getServerLocale } from "@/lib/i18n/server";
import { Cormorant_Garamond, Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["600", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.darelsalam.org"),
  title: {
    default: "Dar El Salam Islamic Center — Arlington TX",
    template: "%s | Dar El Salam",
  },
  description:
    "Dar El Salam — prayer, learning, youth mentorship, newcomer support, and dignified adab in Arlington, Texas.",
  openGraph: {
    title: "Dar El Salam Islamic Center",
    description:
      "Join us for salah, knowledge circles, newcomer resources, stewardship, Fatwa etiquette, iqamāh clarity, youth visioning—rooted in mercy.",
    url: "https://www.darelsalam.org",
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();
  const isAr = locale === "ar";

  return (
    <html
      lang={isAr ? "ar" : "en"}
      dir={isAr ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className={`${serif.variable} ${geistSans.variable} ${geistMono.variable} ${notoArabic.variable} min-h-screen min-h-[100dvh] bg-emerald-50/80 font-sans text-emerald-950 antialiased dark:bg-emerald-950 dark:text-emerald-50`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitMinScript()}
        </Script>
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
