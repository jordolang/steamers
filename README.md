# Steamers Stonewall Tavern — website

A front end for the real restaurant at 10078 Market Street, North Lima, Ohio.
Built from scraped, verified source material — not from a template and not from
invention.

```
site/          Next.js 16 app (App Router, Tailwind v4, Framer Motion available)
research/      Scrape output + the dossier every fact traces back to
public/img/    64 generated dish photographs (masters + web variants)
```

## Run it

```bash
cd site
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Where the content comes from

Everything on the page traces to a source in `research/RESEARCH.md`.

| Content | Source |
|---|---|
| Menu — 64 dishes, 8 sections, prices | `enjoysteamers.com/menu`, scraped verbatim (2026-06 revision) |
| Name, address, phone, hours | The restaurant's own site |
| Founded 2003, Mark & Josh DeNapoli, Mama D | *The Vindicator*, 16 Nov 2016 + BBB profile |
| Ratings (4.6 Google / 4.4 TripAdvisor / 92% FB) | Public listings, Aug 2026 |
| Patio, banquet room, live music, takeout | Explore Mahoning, BBB, Restaurantji |
| Job titles (Server, Hostess, Line Cook, Prep Cook) | Indeed company profile |
| Logo, favicon, diamond ornament | The business's own asset files |
| Building, patio, bar, signage | 18 owner-supplied photographs in `public/img/location/` |

**Prices are current.** `allmenus.com` and SinglePlatform both mirror a ~2019
price list roughly 35% lower. Those were deliberately not used.

The raw scrape returns 70 rows; six of them are modifiers, not dishes — the
"over pasta +$3.00" note, the "Salad Additions" price list, and four gnocchi
protein rows folded into that dish as a `variants` array. Hence 64 dishes.
`MENU_ITEM_COUNT` is derived, never typed by hand, so the two pages cannot
disagree.

## Deliberate calls

**It is not a fine-dining restaurant, and the site does not pretend otherwise.**
The brief asked for fine dining. The evidence says upscale-casual tavern — the
owner's own words are "that Cheers-like atmosphere where the dress is casual",
there are TVs at the bar, a fried-food section, and a $15 burger. One real
review already complains that the prices read higher than the presentation
supports. So the site carries fine-dining *production values* — cinematic
grade, editorial typography, restrained palette — on the tavern's actual
identity. Overselling would have created the exact expectation gap that review
describes.

**No reservation widget.** The restaurant takes no online bookings — no
OpenTable, Resy, or Toast presence exists. The primary action is `tel:`. A
booking form that cannot book is the one feature that would actively hurt them.

**No online ordering.** None found. Takeout goes through the same phone number.

**No per-item gluten-free flags.** The live menu carries none; only two GF
dressings are named. The older third-party mirror had them, but allergen data is
a safety claim and was not going to be copied forward or inferred. The menu
footer points guests to staff instead.

**No `aggregateRating` in the structured data.** The 4.6 / 1,293 figure is
Google's, not ratings this site collected. Google's policy is that
`aggregateRating` markup must come from the site's own reviews, and marking up
another platform's aggregate is a documented trigger for rich-result
suppression or a manual action. The number still appears as editorial content
on the page, which is fine. Reinstate the markup only once the restaurant
collects reviews itself.

**No synthetic faces on real people.** Josh, Mark and Susan DeNapoli are named
in the story copy because that is public and on the record. No generated person
is ever presented as them, or as staff. Footage is food, room and building only.

**Reference vs. redistribution.** Third-party photos (Yelp, TripAdvisor, guest
uploads) were used as *reference* for generation and are not shipped. The logo
and favicon are the business's own files, used directly.

## The location imagery was rebuilt from real photographs

The first pass at exterior and interior renders was **wrong**, and worth
recording as a caution: with no photographs available, they were inferred from
text — "Stonewall" plus "unassuming" produced a grey-fieldstone cottage under a
moody sky. Nothing like the real building.

Eighteen owner-supplied photographs later corrected it. What Steamers actually
looks like:

- A long, low roadside building — **tan honey ledgestone**, **cream stucco**,
  **deep maroon** trim and wainscot
- **Two double neon arches** over the entry bays: outer tube violet, inner tube
  cyan. This is the single most recognisable thing about the place.
- White cursive **"Steamers"** script neon on the wall
- A covered patio with **Edison string lights**, sage-green lattice fencing,
  wrought-iron chairs with red cushions, and a magenta neon "Patio" sign
- Inside: an **ornate pressed-tin ceiling**, an **octagonal golden-oak bar**
  under a TV soffit, a red-orange **STEAMERS neon** with the flame logo, amber
  dome pendants and lantern sconces, brown vinyl swivel stools, brass rails
- A black **pylon sign** on Market Street with an LED message board
- Staff uniform: **black tee with the Steamers logo**

Every location still was then regenerated **image-to-image from those
photographs**, with prompts that named the geometry, materials and signage to
preserve and restricted the model to light, weather and grade. The palette
gained two first-class tokens as a result — `--color-neon-cyan` and
`--color-neon-violet` — and the hero opens on a CSS redraw of the arch.

The superseded renders were deleted rather than kept around.

## Design

Palette is sampled from the logo PNG rather than guessed — `#98001F → #C01030`,
core carmine `#B00828` — against a warm near-black and the tan ledgestone grey
of the building, plus the two neon tube colours read off the entrance arch.

Type is Fraunces (display, with its SOFT/WONK axes engaged), Archivo (body), and
DM Mono (prices, hours, labels).

The structural device is the restaurant's own punctuation. Steamers writes its
menu with pipes — `crab meat | cream cheese mixture | toasted baguette` — so the
pipe became the site's connective glyph: tinted carmine, given air, used in
eyebrows and dish descriptions. Paired with tabular mono prices and dotted
leaders, it turns the menu into the thing the design is actually built around.

## Motion

Two scroll-scrubbed pinned videos — the arrival across the wet lot toward the
neon arches in the hero, and the steamer behind the bar — driven by `requestAnimationFrame` with an eased
`currentTime` seek, gated by `IntersectionObserver` so the loop only runs on
screen. Both source clips are encoded with a 6-frame GOP so seeking lands
instantly; the ambient loops use a normal GOP.

Everything else is `IntersectionObserver` reveals, one-shot.

The hero scrub is **desktop-only**. Below 768px the video is never fetched and
the poster stands in: frame-accurate `currentTime` seeking is unreliable on iOS
Safari, and pushing a 5.5 MB scrub-encoded file at a phone on cellular to power
an effect that may stutter anyway is a bad trade. A sharp still wins.

Performance guards, because restaurant traffic is mobile-on-cellular:
`preload="none"` on ambient clips with the source attached only near the
viewport, off-screen clips paused, poster frames on every video, lazy-loaded
dish images, and `prefers-reduced-motion` honoured — under which nothing
scrubs and no video is fetched at all.

## Media

Generated with Higgsfield: stills via `nano_banana_pro`, animated with
`kling3_0` (image-to-video, silent). Prompts were written from the restaurant's
own ingredient lists and verified building description, then transcoded locally
with ffmpeg. Shipped media is ~18 MB video/posters + 13 MB dish images; the
546 MB PNG masters stay out of the bundle at `public/img/menu/`.

## Known gaps

- Yelp and TripAdvisor block automated access; their photo sets were never
  read. The owner-supplied photographs in `public/img/location/` superseded that
  need for the building itself.
- Food photography is still generated from menu copy, not from real plates. If
  you can shoot the actual dishes, those 64 cards are the next thing to replace.
- Ratings counts are hardcoded as of Aug 2026 and will drift.
- The dish photography was produced by a background agent this session that was
  not initiated by the main build; output was verified against the real
  ingredient lists before being adopted.
- Careers lists real role titles from the Indeed profile but no live openings —
  none are published anywhere.
- Real photography should replace generated imagery wherever it exists.
