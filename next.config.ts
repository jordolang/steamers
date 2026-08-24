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
    // the working default for photography — including the wordmark, whose
    // crisp edges are the case you would expect to suffer: at 3x zoom the
    // 55 and 75 encodes differ by under 1/255 per channel, for 3.6 KB.
    qualities: [55, 75],
    // `minimumCacheTTL` is deliberately left at Next's default (4 hours).
    //
    // A year-long TTL reads like free performance and is not: nothing under
    // /public is content-addressed — `/brand/steamers-logo.png` is a stable
    // path — and Next has no way to invalidate the optimizer cache. This was
    // set to a year here briefly, and the failure is not hypothetical:
    // `.next/cache/images` entries store the TTL they were written with and
    // survive a rebuild, so `/_next/image` kept answering
    // `max-age=31536000` from the old config until the directory was deleted
    // by hand. Replacing a photograph in place would do the same to a
    // visitor. Lighthouse's cache audit passes without it.
  },
};

export default nextConfig;
