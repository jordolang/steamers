import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Tailwind emits ~9 KB of atomic CSS for the whole site, and it arrives as a
   * render-blocking `<link>` — a second round trip before anything can paint.
   * At that size the stylesheet is cheaper carried inside the HTML than
   * fetched, which is exactly the case Next documents this flag for.
   */
  experimental: {
    inlineCss: true,
  },

  images: {
    /**
     * Next's default width ladder steps 128 → 256, and the nav mark is drawn
     * about 83 CSS px wide. Every retina phone therefore lands on the 256
     * variant — three times the pixels it can show, and 12 KB on the critical
     * path for a mark 36 px tall. The two intermediate steps let a 2× screen
     * ask for what it actually needs. The rest of the list is Next's default.
     */
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 192, 256, 384],
  },
};

export default nextConfig;
