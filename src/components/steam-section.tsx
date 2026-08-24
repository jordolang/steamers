"use client";

import Image from "next/image";
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
        {/* The still, as a real lazy image rather than a `poster` attached in
            JS. Same reasoning as the hero — AVIF, sized to the screen — plus
            it now shows up for the readers the scrub deliberately skips: a
            phone, reduced motion, or a link too slow for the footage. It sits
            three screens down, so it stays lazy and costs nothing until you
            are nearly looking at it. */}
        <Image
          src="/media/poster/steamer.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={55}
          className="object-cover"
        />
        {/* No `src` here on purpose — the hook attaches one once this section
            is within a screen of the viewport and the main thread is quiet, so
            nothing three screens down competes with the first paint. It stays
            transparent until the first frame decodes, so the still above is
            what shows until then, and all there is if the scrub never runs. */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          className="pointer-events-none absolute inset-0 size-full select-none object-cover opacity-0 transition-opacity duration-700"
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
