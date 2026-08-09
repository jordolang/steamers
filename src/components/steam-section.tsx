"use client";

import { useRef } from "react";
import { useScrollScrub } from "./use-scroll-scrub";

/**
 * The section that explains the name. A second scroll-scrubbed clip — the
 * steamer behind the bar, plume building as you scroll — because the whole
 * brand is a machine that makes vapour, and reading about it while it does so
 * is the point.
 *
 * Same scrub mechanism as the hero — shared, so the buffer gating and the
 * deferred fetch only had to be got right once. Only the chase is tuned apart.
 */
const SCRUB_FULL = "/media/video/steamer.mp4"; // 1280×720, 1.9 MB
const SCRUB_LITE = "/media/video/steamer-lite.mp4"; // 854×480, 0.9 MB

export function SteamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useScrollScrub(sectionRef, videoRef, {
    src: SCRUB_FULL,
    liteSrc: SCRUB_LITE,
    poster: "/media/poster/steamer.jpg",
    ease: 0.1,
  });

  return (
    <section
      ref={sectionRef}
      id="steamer"
      aria-labelledby="steamer-title"
      className="relative isolate scroll-mt-[68px] bg-ink"
    >
      <div className="sticky top-0 h-svh overflow-hidden" style={{ marginBottom: "-100svh" }}>
        {/* No `src` here on purpose — the hook attaches one once this section
            is within a screen of the viewport and the main thread is quiet, so
            nothing three screens down competes with the first paint. */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          className="pointer-events-none absolute inset-0 size-full select-none object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-ink/45" />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
        />
      </div>

      <div className="relative z-10">
        <div className="flex h-svh items-center justify-center px-5">
          <div className="max-w-2xl text-center on-film">
            <p className="eyebrow mb-6 text-steam/70">
              Why it is called Steamers
            </p>
            <h2 id="steamer-title" className="display-lg">
              There is a steamer
              <br />
              <span className="text-carmine-bright">behind the bar.</span>
            </h2>
          </div>
        </div>

        <div className="flex h-svh items-center justify-center px-5">
          <div className="max-w-xl text-center on-film">
            <p className="text-lg leading-relaxed text-steam sm:text-xl">
              Clams, mussels and shrimp go in to order — olive oil, butter, garlic,
              green onion, white wine. Nothing is held. You hear the lid come off
              from a seat at the bar.
            </p>
            <p className="mt-8 font-mono text-sm text-ember">
              7 dishes steamed to order
              <span className="pipe">|</span>
              from $13.00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
