"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { SITE } from "@/data/site";

/** Nav height; measured at runtime because it shrinks once you scroll. */
const DEFAULT_NAV_HEIGHT = 68;

/**
 * The hero footage is a 30-second first-person walk-in that follows the real
 * route through the building: across the wet lot, up to the doors, through
 * them into the little slate-floored vestibule, through the second set of oak
 * doors as they open, into the bar room, and finally a turn to the left to
 * settle on the bar — the view a guest actually gets from the hostess station.
 * Scroll position drives `currentTime` directly, so scrolling down advances
 * the walk and scrolling back up reverses it all the way to the parking lot.
 *
 * Panels scroll up over the pinned footage in normal document flow, so the
 * page reads as a page rather than a paused viewport. One panel per beat of
 * the journey — the lot, the door, the threshold, the bar.
 */
const PANELS = [
  {
    eyebrow: ["Seafood", "Pasta", "Steak"],
    title: "Steamers",
    accent: "Stonewall Tavern",
    body: "On Market Street in North Lima, under the blue arches. Family-run since 2003, and still the kind of place you can walk in wearing a work shirt and order king crab.",
    primary: true,
  },
  {
    eyebrow: ["North Lima", "Ohio", "Est. 2003"],
    title: "A Cheers-like atmosphere,",
    accent: "where the dress is casual.",
    body: "Josh DeNapoli's own words for the room his family remodeled in 2003. In off Market Street, through the landing, and the bar is the first thing you see.",
  },
  {
    eyebrow: ["Shrimp", "Mussels", "Clams"],
    title: "Named for the",
    accent: "steamer behind the bar",
    body: "Clams, mussels and shrimp go into it to order. It has been running since the doors opened, and it is still the first thing you hear from a seat at the bar.",
  },
  {
    eyebrow: ["#1 of 11 in North Lima", "4.6 on Google"],
    title: "High-end food.",
    accent: "No dress code.",
    body: "Char-grilled black angus, jumbo lump crab cakes, and Grandma D's red sauce from the family's first kitchen in Pennsylvania.",
  },
];

export function ScrollVideoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // Wake the decoder so the first seek paints immediately — iOS Safari
    // ignores currentTime on a video it has never started.
    video.play().then(() => video.pause()).catch(() => {});

    const measureNav = () => {
      const nav = document.querySelector("header");
      section.style.setProperty(
        "--nav-offset",
        `${nav?.offsetHeight || DEFAULT_NAV_HEIGHT}px`,
      );
    };
    measureNav();
    window.addEventListener("resize", measureNav);

    // Two opt-outs, both of which leave the poster standing in:
    //  - reduced motion, by request
    //  - narrow screens, because frame-accurate seeking is unreliable on iOS
    //    Safari and the scrub-encoded file is far too heavy to push at a phone
    //    on cellular. A sharp still beats a stuttering download.
    const optOut =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches;

    if (optOut) {
      video.removeAttribute("src");
      video.load();
      return () => window.removeEventListener("resize", measureNav);
    }

    video.preload = "auto";

    let raf = 0;
    let scrubbed = 0;

    const tick = () => {
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const progress = range > 0 ? Math.min(Math.max(-rect.top / range, 0), 1) : 0;

      if (video.duration) {
        const target = progress * video.duration;
        // Ease toward the target so a flick of the wheel reads as motion
        // rather than a jump cut.
        scrubbed += (target - scrubbed) * 0.12;
        // Only seek past a frame's worth of drift; seeking every frame
        // thrashes the decoder.
        if (Math.abs(video.currentTime - scrubbed) > 1 / 48) {
          video.currentTime = scrubbed;
        }
      }

      if (cueRef.current) {
        cueRef.current.style.opacity = String(
          Math.min(Math.max((0.08 - progress) / 0.06, 0), 1),
        );
      }

      raf = requestAnimationFrame(tick);
    };

    // Only run the loop while the hero is actually on screen.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !raf) {
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    observer.observe(section);

    return () => {
      window.removeEventListener("resize", measureNav);
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate w-full max-w-[100vw] overscroll-x-none bg-ink"
      style={{ ["--nav-offset" as string]: `${DEFAULT_NAV_HEIGHT}px` }}
    >
      {/* Pinned footage. The negative margin pulls the panels back up over it
          so they scroll in normal flow across a stationary backdrop. */}
      <div
        className="sticky z-0 overflow-hidden"
        style={{
          top: "var(--nav-offset)",
          height: "calc(100svh - var(--nav-offset))",
          marginBottom: "calc((100svh - var(--nav-offset)) * -1)",
        }}
      >
        <video
          ref={videoRef}
          src="/media/video/walk-in.mp4"
          poster="/media/poster/walk-in.jpg"
          muted
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          className="pointer-events-none absolute inset-0 size-full select-none object-cover"
        />
        {/* Vignette + floor gradient so copy holds at any frame. On narrow
            screens the copy spans the full width, so the scrim has to as well. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/70 to-ink/30 sm:bg-gradient-to-r sm:from-ink/85 sm:via-ink/35 sm:to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink to-transparent"
        />

        <div
          ref={cueRef}
          aria-hidden
          className="eyebrow absolute inset-x-0 bottom-8 text-center text-limestone/70"
        >
          Scroll
        </div>
      </div>

      {/* One full screen per panel, with a breath between them. The walk-in is
          ~30s, so the section needs roughly six and a half screens of scroll
          for the footage to advance at a natural reading pace rather than
          racing — four panels, three 60svh gaps, and the tail below. */}
      <div className="relative z-10">
        {PANELS.map((panel, i) => (
          <div
            key={panel.title}
            className="flex items-center px-5 sm:px-10 lg:px-20"
            style={{
              minHeight: "calc(100svh - var(--nav-offset))",
              // Space between panels lets the camera cover ground between
              // beats — the lot, the door, the threshold, the bar.
              marginBottom: i < PANELS.length - 1 ? "60svh" : undefined,
            }}
          >
            {/* A flex item defaults to min-width:auto, which lets a wide
                replaced child set the floor for the whole column. `min-w-0`
                keeps the wordmark shrinking with the viewport rather than
                deciding how narrow this column is allowed to get. */}
            <div className="w-full min-w-0 max-w-2xl on-film">
              <p className="eyebrow mb-5 text-steam/75">
                {panel.eyebrow.map((word, j) => (
                  <span key={word}>
                    {j > 0 && <span className="pipe">|</span>}
                    {word}
                  </span>
                ))}
              </p>

              {i === 0 ? (
                <>
                  {/* The double neon arch over the real entrance, redrawn in
                      CSS. Locals navigate by it, so the page opens with it. */}
                  <div
                    aria-hidden
                    className="arch arch-lit mb-5 w-32 sm:mb-6 sm:w-40"
                  />
                  {/* The wordmark itself, not type set to imitate it: the
                      business's own lockup with the steam rising out of the M,
                      cropped above the SEAFOOD · PASTA · STEAK rule so the
                      tagline isn't said twice — the eyebrow already says it.
                      `alt` carries "Steamers", so the h1 still reads
                      "Steamers Stonewall Tavern" to a screen reader. */}
                  <h1 id="hero-title">
                    <Image
                      src="/brand/steamers-wordmark.png"
                      alt={panel.title}
                      width={2770}
                      height={987}
                      priority
                      sizes="(max-width: 639px) 92vw, 38rem"
                      className="h-auto w-full max-w-[30rem] drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)] sm:max-w-[38rem]"
                    />
                    <span className="display-md mt-4 block sm:mt-5">
                      {panel.accent}
                    </span>
                  </h1>
                </>
              ) : (
                <h2 className="display-lg">
                  {panel.title}{" "}
                  <span className="text-carmine-bright">{panel.accent}</span>
                </h2>
              )}

              <p className="mt-6 max-w-lg text-base leading-relaxed text-limestone sm:text-lg">
                {panel.body}
              </p>

              {panel.primary && (
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a
                    href={SITE.phoneHref}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-carmine px-7 text-sm font-semibold tracking-wide text-steam transition-colors hover:bg-carmine-bright"
                  >
                    Call {SITE.phone}
                  </a>
                  <Link
                    href="/menu"
                    className="inline-flex min-h-12 items-center rounded-full border border-steam/35 px-7 text-sm font-semibold tracking-wide text-steam transition-colors hover:border-steam hover:bg-steam/10"
                  >
                    See the menu
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
        {/* Tail so the camera finishes its turn onto the bar before the next
            section scrolls up over it. */}
        <div aria-hidden style={{ height: "calc((100svh - var(--nav-offset)) * 0.8)" }} />
      </div>
    </section>
  );
}
