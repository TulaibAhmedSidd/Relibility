import type { Metadata } from "next";

import type { ContentEntry } from "@/content/site.config";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://reliabilityqualitysolutions.com";

export function buildMetadata(entry: ContentEntry): Metadata {
  const canonicalPath = entry.slug ? `/${entry.slug}` : "/";

  return {
    title: entry.seo.title,
    description: entry.seo.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: entry.seo.title,
      description: entry.seo.description,
      type: entry.kind === "post" ? "article" : "website",
      url: `${siteUrl}${canonicalPath}`,
      siteName: "Reliability Quality Solutions",
    },
    twitter: {
      card: "summary_large_image",
      title: entry.seo.title,
      description: entry.seo.description,
    },
  };
}
