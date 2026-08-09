"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { MENU, RAW_DISCLAIMER } from "@/data/menu";
import { dishImage } from "@/data/dish-image";
import { DishDesc } from "./dish-desc";
import { Reveal } from "./reveal";

/**
 * The full menu. Two presentations from one dataset:
 *  - "board"  printed-menu columns with dotted leaders and mono prices
 *  - "plates" the photographed grid
 * Search filters both, matching on dish name and on ingredients — so typing
 * "crab" or "bleu cheese" both work.
 */
export function MenuBoard() {
  const [query, setQuery] = useState("");
  // Default to "plates": every dish has a photograph, and the plate grid is what
  // makes the menu sell. The "board" toggle stays for guests who want to scan
  // prices quickly.
  const [view, setView] = useState<"board" | "plates">("plates");
  const [section, setSection] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU.map((s) => ({
      ...s,
      items: s.items.filter(
        (i) =>
          (section === "all" || s.id === section) &&
          (!q || i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)),
      ),
    })).filter((s) => s.items.length > 0);
  }, [query, section]);

  const total = filtered.reduce((n, s) => n + s.items.length, 0);

  return (
    <div>
      {/* ---- controls ---- */}
      <div className="sticky top-[68px] z-30 -mx-5 mb-14 border-y border-ink-3 bg-ink/94 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3">
          <label className="relative flex min-w-56 flex-1 items-center">
            <span className="sr-only">Search the menu</span>
            <svg
              className="pointer-events-none absolute left-4 text-limestone-dim"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              aria-hidden
            >
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes or ingredients"
              className="h-11 w-full rounded-full border border-ink-3 bg-ink-2 pl-11 pr-4 text-sm text-steam placeholder:text-limestone-dim focus:border-carmine focus:outline-none"
            />
          </label>

          <label className="flex items-center">
            <span className="sr-only">Filter by section</span>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="h-11 rounded-full border border-ink-3 bg-ink-2 px-4 text-sm text-steam focus:border-carmine focus:outline-none"
            >
              <option value="all">All sections</option>
              {MENU.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </label>

          <div
            role="group"
            aria-label="Menu view"
            className="flex h-11 items-center rounded-full border border-ink-3 bg-ink-2 p-1"
          >
            {(["board", "plates"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={`h-9 rounded-full px-4 text-sm font-medium capitalize transition-colors ${
                  view === v ? "bg-carmine text-steam" : "text-limestone hover:text-steam"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---- results ---- */}
      {total === 0 ? (
        <div className="py-24 text-center">
          <p className="display-md">Nothing on the menu matches “{query}”.</p>
          <p className="mt-4 text-limestone">
            Try an ingredient — “crab”, “scampi”, “bleu cheese”.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSection("all");
            }}
            className="mt-7 inline-flex min-h-11 items-center rounded-full border border-steam/35 px-6 text-sm font-semibold text-steam hover:bg-steam/10"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-24">
          {filtered.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`h-${s.id}`} className="scroll-mt-36">
              <Reveal>
                <div className="rule mb-6" />
                <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 id={`h-${s.id}`} className="display-md">
                      {s.title}
                    </h2>
                    <p className="mt-2 max-w-xl text-limestone">{s.blurb}</p>
                  </div>
                  <span className="eyebrow shrink-0">
                    {s.items.length} {s.items.length === 1 ? "dish" : "dishes"}
                  </span>
                </div>
                {s.note && (
                  <p className="mb-10 border-l-2 border-carmine pl-4 text-sm italic text-limestone-dim">
                    {s.note}
                  </p>
                )}
              </Reveal>

              {view === "board" ? (
                <Reveal stagger className="grid gap-x-16 gap-y-9 md:grid-cols-2">
                  {s.items.map((item) => (
                    <article key={item.name}>
                      <div className="leader">
                        <h3 className="font-display text-xl font-semibold text-steam">
                          {item.name}
                          {item.raw && (
                            <span className="align-super text-xs text-carmine-bright" aria-label="cooked to order">
                              *
                            </span>
                          )}
                        </h3>
                        <span className="leader__dots" aria-hidden />
                        <span className="leader__price">
                          {item.price ? `$${item.price}` : "Market Price"}
                        </span>
                      </div>
                      <DishDesc text={item.desc} className="mt-2 text-sm leading-relaxed text-limestone-dim" />
                      {item.variants && (
                        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                          {item.variants.map((v) => (
                            <li key={v.label} className="font-mono text-xs text-limestone">
                              {v.label}
                              <span className="pipe">|</span>
                              <span className="text-ember">${v.price}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  ))}
                </Reveal>
              ) : (
                <Reveal stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {s.items.map((item) => {
                    const slug = dishImage(item.name);
                    return (
                      <article
                        key={item.name}
                        className="group overflow-hidden rounded-lg border border-ink-3 bg-ink-2"
                      >
                        {slug ? (
                          <div className="relative aspect-[4/3] overflow-hidden bg-ink-3">
                            <Image
                              src={`/img/menu-web/${slug}.webp`}
                              alt={`${item.name} at Steamers Stonewall Tavern`}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              loading="lazy"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            />
                          </div>
                        ) : (
                          <div className="flex aspect-[4/3] items-center justify-center bg-ink-3">
                            <span className="eyebrow">{s.title}</span>
                          </div>
                        )}
                        <div className="p-5">
                          <div className="leader">
                            <h3 className="font-display text-lg font-semibold text-steam">
                              {item.name}
                            </h3>
                            <span className="leader__dots" aria-hidden />
                            <span className="leader__price">
                              {item.price ? `$${item.price}` : "Market"}
                            </span>
                          </div>
                          <DishDesc text={item.desc} className="mt-2 text-sm leading-relaxed text-limestone-dim" />
                        </div>
                      </article>
                    );
                  })}
                </Reveal>
              )}
            </section>
          ))}
        </div>
      )}

      <p className="mt-24 border-t border-ink-3 pt-6 text-xs leading-relaxed text-limestone-dim">
        <span className="text-carmine-bright">*</span> {RAW_DISCLAIMER} Prices and
        availability are subject to change — call{" "}
        <a href="tel:+13305499041" className="text-ember underline-offset-2 hover:underline">
          330-549-9041
        </a>{" "}
        to confirm. Gluten-free options are available; please tell your server about any allergies.
      </p>
    </div>
  );
}
