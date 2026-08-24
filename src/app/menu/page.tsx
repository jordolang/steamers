import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/sections";
import { MenuBoard } from "@/components/menu-board";
import { AmbientVideo } from "@/components/ambient-video";
import { OpenStatus } from "@/components/open-status";
import { MENU_ITEM_COUNT } from "@/data/menu";
import { SITE, OG_IMAGE } from "@/data/site";

const MENU_DESCRIPTION =
  "The full menu at Steamers Stonewall Tavern in North Lima, Ohio — steamed clams and mussels, king crab, char-grilled black angus, and Grandma D's red sauce. Current prices.";

export const metadata: Metadata = {
  title: "Menu",
  description: MENU_DESCRIPTION,
  alternates: { canonical: "https://enjoysteamers.com/menu" },
  // Without this the page would share the homepage's card copy verbatim. Note
  // that declaring `openGraph` here discards the layout's entirely, so siteName,
  // locale and the image have to be repeated.
  openGraph: {
    title: `The menu — ${MENU_ITEM_COUNT} dishes | ${SITE.name}`,
    description: MENU_DESCRIPTION,
    url: "https://enjoysteamers.com/menu",
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `The menu — ${MENU_ITEM_COUNT} dishes | ${SITE.name}`,
    description: MENU_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function MenuPage() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* Compact hero — the menu itself is the reason people are here. */}
        <section className="relative isolate overflow-hidden border-b border-ink-3">
          {/* The still behind this hero fills the first screen, which makes
              it the LCP element of the page — so unlike every other ambient
              clip on the site, its still is preloaded at high priority. */}
          <AmbientVideo
            src="/media/video/clams.mp4"
            poster="/media/poster/clams.jpg"
            sizes="100vw"
            eager
            className="absolute inset-0 -z-10 size-full opacity-40"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/50" />

          <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-32">
            <p className="eyebrow mb-4 on-film">
              {SITE.tagline.map((t, i) => (
                <span key={t}>
                  {i > 0 && <span className="pipe">|</span>}
                  {t}
                </span>
              ))}
            </p>
            <h1 className="display-xl on-film">The menu</h1>
            <p className="mt-6 max-w-xl leading-relaxed text-limestone on-film">
              {MENU_ITEM_COUNT} dishes across eight sections. Seafood is cut in house,
              steaks go over open flame, and the red sauce is Grandma D&rsquo;s.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href={SITE.phoneHref}
                className="inline-flex min-h-12 items-center rounded-full bg-carmine px-7 text-sm font-semibold text-steam transition-colors hover:bg-carmine-bright"
              >
                Order takeout · {SITE.phone}
              </a>
              <OpenStatus />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1400px] px-5 pb-32 sm:px-8">
          <MenuBoard />
        </div>
      </main>
      <Footer />
    </>
  );
}
