"use client";

import { useEffect, useRef } from "react";

/**
 * A looping background clip that only ever decodes while it is on screen.
 *
 * Restaurant traffic is overwhelmingly mobile-on-cellular, so the defaults are
 * deliberately conservative: nothing at all is fetched until the element
 * approaches the viewport, and off-screen clips are paused so a long page
 * never runs eight decoders at once.
 *
 * The `poster` is attached in JS for the same reason the source is. A `poster`
 * attribute in the markup is picked up by the preload scanner and fetched
 * immediately no matter how far down the page it sits, and with ten of these
 * on the homepage that was a megabyte of stills competing with the first
 * screen. Deferred, they cost nothing until you are nearly looking at them.
 */
export function AmbientVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Reduced motion still gets the still, just never the clip behind it.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.poster) video.poster = poster;
          if (still) return;
          if (!video.src) video.src = src;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      // A screen and a half of lead time, so the still has landed and painted
      // before the clip is anywhere near being looked at.
      { rootMargin: "600px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src, poster]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
      className={`pointer-events-none select-none object-cover ${className}`}
    />
  );
}
