import type { Metadata } from "next";
import { Fraunces, Archivo, DM_Mono } from "next/font/google";
import { SITE } from "@/data/site";
import { MENU } from "@/data/menu";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

const DESCRIPTION =
  "Seafood, pasta and steak on Market Street in North Lima, Ohio. Family-run since 2003 — clams and mussels steamed at the bar, char-grilled black angus, and Grandma D's red sauce.";

export const metadata: Metadata = {
  metadataBase: new URL("https://enjoysteamers.com"),
  title: {
    default: `${SITE.name} | Seafood · Pasta · Steak | North Lima, Ohio`,
    template: `%s | ${SITE.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "seafood restaurant North Lima Ohio",
    "Steamers Stonewall Tavern",
    "king crab Youngstown",
    "steak restaurant Mahoning County",
    "banquet hall North Lima",
  ],
  openGraph: {
    title: `${SITE.name} — Seafood · Pasta · Steak`,
    description: DESCRIPTION,
    url: "https://enjoysteamers.com",
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: DESCRIPTION },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://enjoysteamers.com" },
};

export const viewport = {
  themeColor: "#0b0a09",
  width: "device-width",
  initialScale: 1,
};

/** Schema.org opening hours, derived from the same published hours. */
const OPENING_HOURS = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "11:30", closes: "21:00" },
  { days: ["Friday"], opens: "11:30", closes: "22:00" },
  { days: ["Saturday"], opens: "12:00", closes: "22:00" },
].map((h) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: h.days,
  opens: h.opens,
  closes: h.closes,
}));

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://enjoysteamers.com/#restaurant",
  name: SITE.name,
  description: DESCRIPTION,
  url: "https://enjoysteamers.com",
  telephone: `+1-${SITE.phone}`,
  email: SITE.email,
  priceRange: "$$",
  servesCuisine: ["Seafood", "Steakhouse", "Italian", "American"],
  foundingDate: String(SITE.founded),
  sameAs: [SITE.facebook],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  openingHoursSpecification: OPENING_HOURS,
  acceptsReservations: "False",
  // No aggregateRating here on purpose: the 4.6/1,293 figure is Google's, not
  // ratings this site collected, and marking up a third party's aggregate is a
  // documented trigger for rich-result suppression. The figure still appears as
  // editorial content on the page, which is fine.
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Outdoor patio", value: true },
    { "@type": "LocationFeatureSpecification", name: "Banquet facilities", value: true },
    { "@type": "LocationFeatureSpecification", name: "Full bar", value: true },
    { "@type": "LocationFeatureSpecification", name: "Takeout", value: true },
  ],
  hasMenu: {
    "@type": "Menu",
    name: `${SITE.name} Menu`,
    url: "https://enjoysteamers.com/menu",
    hasMenuSection: MENU.map((section) => ({
      "@type": "MenuSection",
      name: section.title,
      hasMenuItem: section.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.desc,
        ...(item.price
          ? { offers: { "@type": "Offer", price: item.price, priceCurrency: "USD" } }
          : {}),
      })),
    })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivo.variable} ${dmMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <script
          type="application/ld+json"
          // Schema is built from the same verified data the page renders.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-carmine focus:px-4 focus:py-2 focus:text-steam"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
