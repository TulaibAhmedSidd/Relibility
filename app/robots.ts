import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.company.website}/sitemap.xml`,
    host: siteConfig.company.website,
  };
}
