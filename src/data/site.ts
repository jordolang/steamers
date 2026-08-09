/**
 * Verified business facts. Every value here is sourced from the restaurant's own
 * site, a news feature, or a public listing — see research/RESEARCH.md.
 * Nothing in this file is invented. If it isn't verified, it isn't here.
 */

export const SITE = {
  name: "Steamers Stonewall Tavern",
  shortName: "Steamers",
  /** Official tagline, taken from the logo lockup. */
  tagline: ["Seafood", "Pasta", "Steak"],
  founded: 2003,
  address: {
    street: "10078 Market Street",
    city: "North Lima",
    region: "OH",
    regionName: "Ohio",
    postalCode: "44452",
    country: "US",
  },
  phone: "330-549-9041",
  phoneHref: "tel:+13305499041",
  email: "info@enjoysteamers.com",
  /** Google Maps directions — address query, no API key needed. */
  mapsHref:
    "https://www.google.com/maps/dir/?api=1&destination=10078+Market+St,+North+Lima,+OH+44452",
  facebook: "https://www.facebook.com/steamersfan/",
} as const;

/**
 * Kitchen hours, exactly as published. Index 0 = Sunday (JS getDay order).
 * `null` means closed. Times are minutes from midnight, America/New_York.
 */
export const HOURS: ({ open: number; close: number } | null)[] = [
  null, // Sunday — closed
  { open: 11 * 60 + 30, close: 21 * 60 }, // Mon 11:30a – 9:00p
  { open: 11 * 60 + 30, close: 21 * 60 }, // Tue
  { open: 11 * 60 + 30, close: 21 * 60 }, // Wed
  { open: 11 * 60 + 30, close: 21 * 60 }, // Thu
  { open: 11 * 60 + 30, close: 22 * 60 }, // Fri 11:30a – 10:00p
  { open: 12 * 60, close: 22 * 60 }, // Sat 12:00p – 10:00p
];

export const HOURS_DISPLAY = [
  { days: "Monday – Thursday", time: "11:30 am – 9:00 pm" },
  { days: "Friday", time: "11:30 am – 10:00 pm" },
  { days: "Saturday", time: "12:00 pm – 10:00 pm" },
  { days: "Sunday", time: "Closed" },
];

/** Public ratings. Counts are as observed August 2026 — refresh periodically. */
export const RATINGS = [
  { source: "Google", score: "4.6", count: "1,293" },
  { source: "TripAdvisor", score: "4.4", count: "169" },
  { source: "Facebook", score: "92%", count: "859", suffix: "recommend" },
];

/**
 * What guests actually say. These are paraphrased themes drawn from public
 * review summaries, attributed to the platform rather than to individuals —
 * we do not reproduce or invent named personal reviews.
 */
export const PRAISE = [
  {
    theme: "Service",
    stat: "4.6",
    line: "Servers get named in reviews by first name. That is the tell.",
    source: "Restaurantji service rating",
  },
  {
    theme: "Food",
    stat: "4.5",
    line: "Steaks cooked to temperature, seafood served fresh, hot and fast.",
    source: "Restaurantji food rating",
  },
  {
    theme: "Room",
    stat: "4.5",
    line: "Cozy and casual. Busy on a Friday, but the wait moves.",
    source: "Restaurantji atmosphere rating",
  },
];

export const RANK = "#1 of 11 restaurants in North Lima — TripAdvisor";

/**
 * The owner's own framing of the place. Short attributed excerpt from a 2016
 * Vindicator feature; the surrounding sentence is our paraphrase, not theirs.
 */
export const OWNER_QUOTE = {
  text: "that Cheers-like atmosphere where the dress is casual",
  lead: "Josh DeNapoli describes what he built as",
  trail: "— high-end food, no dress code, and a bill that does not sting.",
  attribution: "Josh DeNapoli, owner",
  source: "The Vindicator, 2016",
};
