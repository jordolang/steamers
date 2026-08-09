"use client";

import { useEffect, useRef } from "react";

/**
 * A looping background clip that only ever decodes while it is on screen.
 *
 * Restaurant traffic is overwhelmingly mobile-on-cellular, so the defaults are
 * deliberately conservative: `preload="none"`, the poster carries the first
 * paint, and the source is attached only once the element approaches the
 * viewport. Off-screen clips are paused so a long page never runs eight
 * decoders at once.
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

    // Reduced motion keeps the poster and never fetches the video at all.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
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
