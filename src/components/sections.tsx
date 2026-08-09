import Image from "next/image";
import Link from "next/link";
import { AmbientVideo } from "./ambient-video";
import { Reveal } from "./reveal";
import { OpenStatus } from "./open-status";
import { SITE, HOURS_DISPLAY, RATINGS, PRAISE, RANK, OWNER_QUOTE } from "@/data/site";

/* ---------------------------------------------------------------- story --
   The DeNapoli history, as reported in a 2016 Vindicator feature. Dates and
   names are theirs; nothing here is embellished.
   -------------------------------------------------------------------------- */

const TIMELINE = [
  {
    when: "Before",
    where: "Central Pennsylvania",
    what: "The family's first restaurant, the Main Street Cafe. Susan DeNapoli — Mama D — ran the kitchen and wrote the recipes.",
  },
  {
    when: "2003",
    where: "10078 Market Street",
    what: "Mark and Josh DeNapoli remodelled a stone building on the highway in North Lima and opened Steamers Stonewall Tavern.",
  },
  {
    when: "Now",
    where: "Same address",
    what: "Twenty-three years on, still family-run. Grandma D's red sauce is on three dishes, and the steamer still runs behind the bar.",
  },
];

export function StorySection() {
  return (
    <section id="story" aria-labelledby="story-title" className="relative z-10 scroll-mt-[68px] bg-ink-2 py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <Reveal>
            <div className="rule mb-6" />
            <p className="eyebrow mb-4">
              Est. 2003<span className="pipe">|</span>Family run
            </p>
            <h2 id="story-title" className="display-lg">
              Two generations,
              <br />
              <span className="text-carmine-bright">one red sauce.</span>
            </h2>

            <blockquote className="mt-12 border-l-2 border-carmine pl-6">
              <p className="font-display text-xl leading-snug text-steam sm:text-2xl">
                {OWNER_QUOTE.lead} “{OWNER_QUOTE.text}”{OWNER_QUOTE.trail}
              </p>
              <footer className="mt-4 font-mono text-xs text-limestone-dim">
                {OWNER_QUOTE.attribution}
                <span className="pipe">|</span>
                {OWNER_QUOTE.source}
              </footer>
            </blockquote>
          </Reveal>

          <Reveal stagger className="space-y-px">
            {TIMELINE.map((t) => (
              <div
                key={t.when}
                className="grid gap-2 border-t border-ink-3 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8"
              >
                <div>
                  <p className="font-mono text-sm text-carmine-bright">{t.when}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-limestone-dim">
                    {t.where}
                  </p>
                </div>
                <p className="leading-relaxed text-limestone">{t.what}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- ratings --
   Public scores, attributed to their platform. We show the aggregate rather
   than reproducing individual reviews.
   -------------------------------------------------------------------------- */

export function RatingsSection() {
  return (
    <section aria-labelledby="ratings-title" className="relative z-10 isolate overflow-hidden bg-ink py-28 sm:py-36">
      <AmbientVideo
        src="/media/video/dining-room.mp4"
        poster="/media/poster/dining-room.jpg"
        className="absolute inset-0 -z-10 size-full opacity-30"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/70" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-4 text-center">{RANK}</p>
          <h2 id="ratings-title" className="display-lg mx-auto max-w-2xl text-center on-film">
            Ranked first in town,
            <br />
            <span className="text-carmine-bright">by the people who live here.</span>
          </h2>
        </Reveal>

        <Reveal stagger className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-px sm:grid-cols-3">
          {RATINGS.map((r) => (
            <div key={r.source} className="bg-ink-2/80 p-8 text-center backdrop-blur-sm">
              <p className="font-display text-5xl font-semibold text-ember">{r.score}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-steam">{r.source}</p>
              <p className="mt-1 font-mono text-xs text-limestone-dim">
                {r.count} {r.suffix ?? "reviews"}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal stagger className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-3">
          {PRAISE.map((p) => (
            <div key={p.theme}>
              <p className="font-mono text-sm text-carmine-bright">
                {p.stat}
                <span className="pipe">|</span>
                {p.theme}
              </p>
              <p className="mt-3 leading-relaxed text-limestone on-film">{p.line}</p>
              <p className="mt-3 font-mono text-[11px] text-limestone-dim">{p.source}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- events --
   Patio and banquet hall — both verified facilities.
   -------------------------------------------------------------------------- */

export function EventsSection() {
  return (
    <section id="events" aria-labelledby="events-title" className="relative z-10 scroll-mt-[68px] bg-ink py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <div className="rule mb-6" />
          <h2 id="events-title" className="display-lg max-w-xl">
            The patio and
            <br />
            <span className="text-carmine-bright">the banquet room</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="group relative isolate overflow-hidden rounded-lg border border-ink-3">
              <div className="relative aspect-[16/10]">
                <AmbientVideo
                  src="/media/video/patio.mp4"
                  poster="/media/poster/patio.jpg"
                  className="absolute inset-0 size-full"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="eyebrow mb-2 text-steam/70">Outdoors</p>
                <h3 className="display-md on-film">The patio</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-limestone on-film">
                  Open in the warm months, with live music out on the corner stage.
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal>
            <article className="group relative isolate overflow-hidden rounded-lg border border-ink-3">
              <div className="relative aspect-[16/10]">
                <AmbientVideo
                  src="/media/video/bar-real.mp4"
                  poster="/media/poster/bar-real.jpg"
                  className="absolute inset-0 size-full"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="eyebrow mb-2 text-steam/70">Private events</p>
                <h3 className="display-md on-film">The banquet room</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-limestone on-film">
                  Rehearsal dinners, showers, and company nights. Call to talk dates
                  and numbers.
                </p>
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-10 flex flex-wrap items-center gap-4 rounded-lg border border-ink-3 bg-ink-2 p-8">
            <p className="flex-1 leading-relaxed text-limestone">
              Booking a party, or ordering takeout? Both go through the same phone.
            </p>
            <a
              href={SITE.phoneHref}
              className="inline-flex min-h-12 items-center rounded-full bg-carmine px-7 text-sm font-semibold text-steam transition-colors hover:bg-carmine-bright"
            >
              Call {SITE.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- visit --
   No reservation widget: the restaurant takes none. The honest primary
   action is the phone.
   -------------------------------------------------------------------------- */

export function VisitSection() {
  return (
    <section
      id="visit"
      aria-labelledby="visit-title"
      className="relative z-10 isolate overflow-hidden scroll-mt-[68px] bg-ink-2 py-28 sm:py-36"
    >
      {/* The front door, under the arch — what you actually walk toward. */}
      <AmbientVideo
        src="/media/video/entrance-arch.mp4"
        poster="/media/poster/entrance-arch.jpg"
        className="absolute inset-0 -z-10 size-full opacity-20"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink-2/80" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <div className="rule mb-6" />
            <h2 id="visit-title" className="display-lg">
              Come out
              <br />
              <span className="text-carmine-bright">to North Lima.</span>
            </h2>

            <div className="mt-10">
              <OpenStatus />
            </div>

            <address className="mt-8 not-italic">
              <p className="font-display text-2xl text-steam">{SITE.address.street}</p>
              <p className="mt-1 text-limestone">
                {SITE.address.city}, {SITE.address.regionName} {SITE.address.postalCode}
              </p>
            </address>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SITE.phoneHref}
                className="inline-flex min-h-12 items-center rounded-full bg-carmine px-7 text-sm font-semibold text-steam transition-colors hover:bg-carmine-bright"
              >
                Call {SITE.phone}
              </a>
              <a
                href={SITE.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center rounded-full border border-steam/30 px-7 text-sm font-semibold text-steam transition-colors hover:border-steam hover:bg-steam/10"
              >
                Get directions
              </a>
            </div>

            <p className="mt-8 max-w-md text-sm leading-relaxed text-limestone-dim">
              Seating is first come, first served — there is no online booking. For
              a large party or the banquet room, phone ahead. Parking is on site and
              fills up on a Friday.
            </p>
          </Reveal>

          <Reveal>
            <div className="border-t border-ink-3">
              <p className="eyebrow py-6">Kitchen hours</p>
              <dl>
                {HOURS_DISPLAY.map((h) => {
                  const closed = h.time === "Closed";
                  return (
                    <div
                      key={h.days}
                      className="flex items-baseline gap-4 border-t border-ink-3 py-5"
                    >
                      <dt className={`flex-1 ${closed ? "text-limestone-dim" : "text-steam"}`}>
                        {h.days}
                      </dt>
                      <dd
                        className={`font-mono text-sm tabular-nums ${
                          closed ? "text-limestone-dim" : "text-ember"
                        }`}
                      >
                        {h.time}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            <div className="mt-10 overflow-hidden rounded-lg border border-ink-3">
              <iframe
                title={`Map to ${SITE.name}`}
                src="https://www.google.com/maps?q=10078+Market+St,+North+Lima,+OH+44452&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                // Google's embed has no dark theme, so invert + hue-rotate it
                // back to true colour. Keeps the map dark without a paid tile key.
                className="h-72 w-full [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.7)_contrast(0.9)]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- footer -- */

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-ink-3 bg-ink py-16">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div>
            <Image
              src="/brand/steamers-logo.png"
              alt={SITE.name}
              width={2877}
              height={1257}
              sizes="160px"
              className="h-12 w-auto"
            />
            <p className="eyebrow mt-5">
              {SITE.tagline.map((t, i) => (
                <span key={t}>
                  {i > 0 && <span className="pipe">|</span>}
                  {t}
                </span>
              ))}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-4">Find us</p>
              <p className="text-sm leading-relaxed text-limestone">
                {SITE.address.street}
                <br />
                {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
              </p>
              <a
                href={SITE.phoneHref}
                className="mt-3 inline-block font-mono text-sm text-ember hover:underline"
              >
                {SITE.phone}
              </a>
            </div>

            <div>
              <p className="eyebrow mb-4">More</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/menu" className="text-limestone hover:text-steam">
                    Menu
                  </Link>
                </li>
                <li>
                  <a
                    href={SITE.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-limestone hover:text-steam"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-limestone hover:text-steam"
                  >
                    {SITE.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink-3 pt-6">
          <p className="font-mono text-xs text-limestone-dim">
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="font-mono text-xs text-limestone-dim">
            North Lima, Ohio<span className="pipe">|</span>Since {SITE.founded}
          </p>
        </div>
      </div>
    </footer>
  );
}
