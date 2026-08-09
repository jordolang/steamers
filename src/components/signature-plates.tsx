"use client";

import Link from "next/link";
import { AmbientVideo } from "./ambient-video";
import { Reveal } from "./reveal";
import { DishDesc } from "./dish-desc";
import { MENU_ITEM_COUNT } from "@/data/menu";

/**
 * The plates that have their own footage. Copy is the restaurant's own menu
 * text, verbatim — no invented tasting notes.
 */
const PLATES = [
  {
    name: "#1 Ichiban Tuna",
    price: "36.00",
    section: "Seafood",
    desc: "#1 grade yellowfin tuna | seared rare | spicy crab & shrimp topping | sticky rice | ponzu sauce | spicy mango",
    note: "Only the highest grade tuna. Cut in house, seared rare.",
    video: "/media/video/tuna.mp4",
    poster: "/media/poster/tuna.jpg",
  },
  {
    name: "Bleu Balsamic Filet",
    price: "36.00",
    section: "Steaks & Chop",
    desc: "char-grilled filet | balsamic reduction | melted bleu cheese crumbles | choice of side",
    note: "Over open flame, on the same grill since 2003.",
    video: "/media/video/filet.mp4",
    poster: "/media/poster/filet.jpg",
  },
  {
    name: "Deadly Catch",
    price: null,
    section: "Seafood",
    desc: "32 oz. king crab | hot drawn butter | choice of side",
    note: "Two pounds of king crab. Market price, because it should be.",
    video: "/media/video/king-crab.mp4",
    poster: "/media/poster/king-crab.jpg",
  },
  {
    name: "Clams Ala DeNapoli",
    price: "17.50",
    section: "Steamed at the Bar",
    desc: "dozen fresh clams | olive oil butter | garlic | green onion white wine",
    note: "The family name is on this one. It goes in the steamer to order.",
    video: "/media/video/clams.mp4",
    poster: "/media/poster/clams.jpg",
  },
  {
    name: "Sweet Potato Scallops",
    price: "34.00",
    section: "Seafood",
    desc: "seared scallops | roasted sweet potato puree | sweet & spicy nuts | choice of side",
    note: "Hard sear, sweet purée, candied heat.",
    video: "/media/video/scallops.mp4",
    poster: "/media/poster/scallops.jpg",
  },
];

export function SignaturePlates() {
  return (
    <section id="plates" aria-labelledby="plates-title" className="relative z-10 scroll-mt-[68px] bg-ink py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <div className="rule mb-6" />
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-4">
                Seafood<span className="pipe">|</span>Pasta<span className="pipe">|</span>Steak
              </p>
              <h2 id="plates-title" className="display-lg max-w-xl">
                What people drive out here for
              </h2>
            </div>
            <Link
              href="/menu"
              className="inline-flex min-h-12 items-center rounded-full border border-steam/30 px-6 text-sm font-semibold text-steam transition-colors hover:border-steam hover:bg-steam/10"
            >
              All {MENU_ITEM_COUNT} dishes
            </Link>
          </div>
        </Reveal>

        <div className="mt-20 space-y-28 sm:space-y-36">
          {PLATES.map((plate, i) => (
            <Reveal key={plate.name}>
              <article
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="relative aspect-[4/3] overflow-hidden rounded-lg border border-ink-3 bg-ink-2">
                  <AmbientVideo
                    src={plate.video}
                    poster={plate.poster}
                    className="absolute inset-0 size-full"
                  />
                </figure>

                <div className="max-w-lg">
                  <p className="eyebrow mb-4">{plate.section}</p>
                  <h3 className="display-md">{plate.name}</h3>
                  <DishDesc
                    text={plate.desc}
                    className="mt-5 text-base leading-relaxed text-limestone"
                  />
                  <p className="mt-5 text-sm italic leading-relaxed text-limestone-dim">
                    {plate.note}
                  </p>
                  <p className="mt-7 font-mono text-lg text-ember">
                    {plate.price ? `$${plate.price}` : "Market Price"}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
