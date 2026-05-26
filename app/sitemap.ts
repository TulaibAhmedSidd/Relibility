import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site.config";
import { getAllEntries } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getAllEntries();

  return entries.map((entry) => ({
    url: entry.slug
      ? `${siteConfig.company.website}/${entry.slug}`
      : siteConfig.company.website,
    lastModified: entry.date ?? new Date().toISOString(),
    changeFrequency: entry.kind === "post" ? "monthly" : "weekly",
    priority: entry.slug === "" ? 1 : entry.kind === "page" ? 0.8 : 0.6,
  }));
}
