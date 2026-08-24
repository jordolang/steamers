"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * A still, with a looping clip that fades in over it once it is on screen.
 *
 * Restaurant traffic is overwhelmingly mobile-on-cellular, so the defaults are
 * deliberately conservative: no footage at all is fetched until the element
 * approaches the viewport, and off-screen clips are paused so a long page never
 * runs eight decoders at once.
 *
 * The still is a real `<Image>` rather than the video's `poster` attribute, and
 * that distinction earns its keep twice over:
 *
 *   - A `poster` cannot carry a `srcset` and is never format-negotiated, so it
 *     ships the full-size JPEG to a phone. Through the image pipeline the same
 *     frame is AVIF, cut to the width that asked for it — usually a third of
 *     the bytes or less.
 *   - A `poster` in the markup is also picked up by the preload scanner and
 *     fetched immediately however far down the page it sits, which is why this
 *     component used to attach it in JS. An `<Image>` is lazy by default and
 *     needs no such workaround — and the one instance that *is* above the fold
 *     can opt into being preloaded properly, which a `poster` can never do.
 *
 * The video sits on top at `opacity: 0` and is uncovered only once it has a
 * frame to show. An empty `<video>` is not reliably transparent across
 * browsers, and on a reduced-motion setting it never gets a source at all.
 */
export function AmbientVideo({
  src,
  poster,
  className = "",
  sizes = "100vw",
  /**
   * Preload the still at high priority. For the one instance that is the LCP
   * element of its page — never for anything below the fold, which would just
   * put it in front of whatever is.
   */
  eager = false,
}: {
  src: string;
  poster: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // `fill` needs a positioned box. Every caller today supplies its own
  // (they are all `absolute inset-0` overlays), and adding `relative`
  // unconditionally would beat `absolute` in Tailwind's source order — so it
  // is only a floor for a caller that brings no positioning of its own.
  const positioned = /\b(absolute|fixed|relative|sticky)\b/.test(className);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Reduced motion still gets the still, just never the clip over it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reveal = () => {
      video.style.opacity = "1";
    };
    video.addEventListener("loadeddata", reveal);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
    return () => {
      video.removeEventListener("loadeddata", reveal);
      observer.disconnect();
    };
  }, [src]);

  return (
    <div className={`overflow-hidden ${positioned ? "" : "relative"} ${className}`}>
      <Image
        src={poster}
        alt=""
        fill
        sizes={sizes}
        quality={55}
        {...(eager ? { preload: true, fetchPriority: "high" as const } : {})}
        className="object-cover"
      />
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        tabIndex={-1}
        className="pointer-events-none absolute inset-0 size-full select-none object-cover opacity-0 transition-opacity duration-700"
      />
    </div>
  );
}
