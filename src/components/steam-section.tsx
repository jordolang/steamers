"use client";

import { useEffect, useRef } from "react";

/**
 * The section that explains the name. A second scroll-scrubbed clip — the
 * steamer behind the bar, plume building as you scroll — because the whole
 * brand is a machine that makes vapour, and reading about it while it does so
 * is the point.
 *
 * Same scrub mechanism as the hero, kept local so the two can be tuned apart.
 */
export function SteamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.play().then(() => video.pause()).catch(() => {});

    let raf = 0;
    let scrubbed = 0;

    const tick = () => {
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const progress = range > 0 ? Math.min(Math.max(-rect.top / range, 0), 1) : 0;

      if (video.duration) {
        const target = progress * video.duration;
        scrubbed += (target - scrubbed) * 0.1;
        if (Math.abs(video.currentTime - scrubbed) > 1 / 48) {
          video.currentTime = scrubbed;
        }
      }
      raf = requestAnimationFrame(tick);
    };

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
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="steamer"
      aria-labelledby="steamer-title"
      className="relative isolate scroll-mt-[68px] bg-ink"
    >
      <div className="sticky top-0 h-svh overflow-hidden" style={{ marginBottom: "-100svh" }}>
        <video
          ref={videoRef}
          src="/media/video/steamer.mp4"
          poster="/media/poster/steamer.jpg"
          muted
          playsInline
          preload="metadata"
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
