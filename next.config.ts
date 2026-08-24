import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /**
     * Left off deliberately, with the measurement written down so nobody has
     * to re-run it.
     *
     * Inlining the stylesheet does remove the one render-blocking request, and
     * on paper that is the right trade for a small Tailwind bundle. In practice
     * Next also repeats the CSS inside the RSC payload, so the document went
     * from 20 KB to 46 KB gzipped to save an 8.7 KB request — and the extra
     * 26 KB lands on TTFB, which every metric is measured from. Lighthouse
     * mobile, median of two runs each:
     *
     *   inlineCss: true   FCP 1.04 s   LCP 3.16 s   TBT 192 ms   score 91
     *   inlineCss: false  FCP 0.95 s   LCP 3.15 s   TBT 110 ms   score 93
     *
     * Revisit if Next stops duplicating the CSS into the flight payload.
     */
    inlineCss: false,
  },
  images: {
    // AVIF first, WebP for anything that cannot take it. The site is almost
    // entirely photography over dark scrims, which is exactly where AVIF's
    // advantage is largest: the hero still drops from a 74 KB JPEG to 9 KB,
    // and the wordmark — which WebP renders at 34 KB — comes back at 15 KB.
    formats: ["image/avif", "image/webp"],
    // Next 16 requires every quality the site uses to be declared here. 55 is
    // for artwork that is never seen un-scrimmed or at full size.
    qualities: [55, 75],
    // Everything under /public is content-addressed brand and menu
    // photography that changes when the file changes, not on a schedule.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
