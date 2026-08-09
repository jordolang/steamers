"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { SITE } from "@/data/site";

/** Nav height; measured at runtime because it shrinks once you scroll. */
const DEFAULT_NAV_HEIGHT = 68;

/**
 * Panels scroll up over the pinned footage in normal document flow, so the
 * page reads as a page rather than a paused viewport. One panel per beat of
 * the push-in toward the front door.
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
          src="/media/video/exterior-arrival.mp4"
          poster="/media/poster/exterior-arrival.jpg"
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

      {/* One full screen per panel, plus a short tail so the push-in finishes
          before the next section arrives. */}
      <div className="relative z-10">
        {PANELS.map((panel, i) => (
          <div
            key={panel.title}
            className="flex items-center px-5 sm:px-10 lg:px-20"
            style={{ minHeight: "calc(100svh - var(--nav-offset))" }}
          >
            <div className="max-w-2xl on-film">
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
                  <h1 id="hero-title" className="display-xl">
                    {panel.title}
                    <span className="mt-2 block text-[0.34em] leading-tight tracking-[0.01em] text-carmine-bright sm:mt-1 sm:text-[0.42em]">
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
        <div aria-hidden style={{ height: "calc((100svh - var(--nav-offset)) * 0.5)" }} />
      </div>
    </section>
  );
}
