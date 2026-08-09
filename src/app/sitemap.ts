import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://enjoysteamers.com";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/menu`, changeFrequency: "monthly", priority: 0.9 },
  ];
}
