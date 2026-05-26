import { cache } from "react";

import { siteConfig } from "@/content/site.config";

export const getSiteConfig = cache(async () => siteConfig);

export const getAllEntries = cache(async () => {
  const config = await getSiteConfig();
  return config.entries;
});

export const getEntryBySlug = cache(async (slug: string) => {
  const entries = await getAllEntries();
  return entries.find(
    (entry) => entry.slug === slug || entry.aliases?.includes(slug),
  );
});

export const getPosts = cache(async () => {
  const entries = await getAllEntries();
  return entries.filter((entry) => entry.kind === "post");
});

export const getRelatedPosts = cache(async (currentSlug: string, limit = 3) => {
  const posts = await getPosts();
  return posts.filter((post) => post.slug !== currentSlug).slice(0, limit);
});

export const getHeaderNavigation = cache(async () => {
  const config = await getSiteConfig();
  return config.navigation.header;
});

export const getFooterNavigation = cache(async () => {
  const config = await getSiteConfig();
  return config.navigation.footer;
});
