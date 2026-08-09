"use client";

import { useEffect, useRef, type RefObject } from "react";

type Connection = {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
};

/**
 * Whether this connection should be asked to carry scrub footage at all, and
 * if so which of two encodes.
 *
 * Restaurant traffic is mobile-on-cellular and phone tethering is common, so
 * the link gets measured rather than assumed. `downlink` is the browser's own
 * throughput estimate in Mbit/s; below ~2.5 the full encode cannot stay ahead
 * of a scrolling reader, and footage that keeps stalling is worse than a
 * sharp still.
 */
export function pickEncode(full: string, lite: string): string | null {
  const net = (navigator as Navigator & { connection?: Connection }).connection;
  if (!net) return full; // no signal to go on; assume broadband
  if (net.saveData) return null; // the user has asked for less data
  if (net.effectiveType === "slow-2g" || net.effectiveType === "2g") return null;
  if (net.effectiveType === "3g") return lite;
  if (typeof net.downlink === "number" && net.downlink > 0 && net.downlink < 2.5) {
    return lite;
  }
  return full;
}

export type ScrubOptions = {
  /** Full-fat encode. */
  src: string;
  /**
   * Still to show until the first frame decodes. Attached in JS rather than
   * set as a `poster` attribute, because the preload scanner fetches those
   * immediately however far down the page they sit.
   */
  poster?: string;
  /** Smaller encode for links that cannot keep up. Defaults to `src`. */
  liteSrc?: string;
  /** How hard the playhead chases the scroll. Lower is looser. */
  ease?: number;
  /** Called every frame with 0–1 scroll progress, for cues and overlays. */
  onProgress?: (progress: number) => void;
  /** Skip below this viewport width. 0 runs everywhere. */
  minWidth?: number;
};

/**
 * Drives a `<video>`'s `currentTime` from how far a section has scrolled.
 *
 * Two things here matter more than the arithmetic:
 *
 * **Nothing is fetched during page load.** The element ships with no `src`,
 * so the markup, the poster, the fonts and the LCP image get the connection to
 * themselves. Footage is attached once the main thread goes idle, and only
 * after the section is close enough to be worth having.
 *
 * **Seeks are clamped to what has actually downloaded.** Asking for a frame
 * past the buffered edge is what makes scrub-on-scroll look broken on a slow
 * link: the picture blanks, or snaps back to the last decoded frame, and the
 * page reads as jumping around. Clamped, the footage holds at the edge and
 * runs forward to catch up as more arrives — which reads as film, not fault.
 */
export function useScrollScrub(
  sectionRef: RefObject<HTMLElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  { src, liteSrc, poster, ease = 0.12, onProgress, minWidth = 0 }: ScrubOptions,
) {
  // Held in a ref so a caller passing an inline callback cannot tear the
  // whole scrub down and re-attach the video on every render.
  const progressRef = useRef(onProgress);
  useEffect(() => {
    progressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (minWidth && window.matchMedia(`(max-width: ${minWidth - 1}px)`).matches) {
      return;
    }

    const chosen = pickEncode(src, liteSrc ?? src);
    if (!chosen) return;

    let raf = 0;
    let scrubbed = 0;
    let dead = false;

    /**
     * How much of the file has arrived, counting only the run that starts at
     * the beginning — the only one a forward scrub can rely on.
     */
    const arrived = () => {
      const ranges = video.buffered;
      for (let i = 0; i < ranges.length; i += 1) {
        if (ranges.start(i) <= 0.25) return ranges.end(i);
      }
      return 0;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);

      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const progress = span > 0 ? Math.min(Math.max(-rect.top / span, 0), 1) : 0;

      progressRef.current?.(progress);

      if (dead || !video.duration) return;

      const reachable = Math.max(0, arrived() - 0.25);
      const target = Math.min(progress * video.duration, reachable);

      // Ease toward the target so a flick of the wheel reads as motion rather
      // than a jump cut, then snap the last hair so the loop settles instead
      // of issuing seeks forever.
      scrubbed += (target - scrubbed) * ease;
      if (Math.abs(target - scrubbed) < 0.01) scrubbed = target;

      // A seek issued while the previous one is still running gets dropped,
      // and the dropped frame is the stutter. Wait for the last one to land.
      if (!video.seeking && Math.abs(video.currentTime - scrubbed) > 1 / 48) {
        video.currentTime = scrubbed;
      }
    };

    const onError = () => {
      dead = true;
    };
    video.addEventListener("error", onError);

    let idle: number | undefined;
    const attach = () => {
      if (dead || video.src) return;
      if (poster && !video.poster) video.poster = poster;
      video.src = chosen;
      video.preload = "auto";
      video.load();
      // Wake the decoder so the first seek paints immediately — iOS Safari
      // ignores currentTime on a video it has never started.
      video.play().then(() => video.pause()).catch(() => {});
    };

    // Run the loop only while the section is on screen, and don't spend the
    // connection on footage until the section is within a screen of being
    // needed — the hero qualifies immediately, anything below the fold waits.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!raf) raf = requestAnimationFrame(tick);
          if (idle === undefined) {
            idle =
              typeof window.requestIdleCallback === "function"
                ? window.requestIdleCallback(attach, { timeout: 1500 })
                : window.setTimeout(attach, 400);
          }
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(section);

    return () => {
      video.removeEventListener("error", onError);
      if (idle !== undefined) {
        if (typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idle);
        }
        clearTimeout(idle);
      }
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sectionRef, videoRef, src, liteSrc, poster, ease, minWidth]);
}
