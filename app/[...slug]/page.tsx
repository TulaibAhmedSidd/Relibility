import { notFound } from "next/navigation";

import { SectionRenderer } from "@/components/section-renderer";
import { buildMetadata } from "@/lib/metadata";
import { getAllEntries, getEntryBySlug } from "@/lib/site";

type RouteProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  const entries = await getAllEntries();

  return entries.flatMap((entry) => {
    const slugs = [entry.slug, ...(entry.aliases ?? [])].filter(Boolean);

    return slugs.map((slug) => ({
      slug: slug.split("/"),
    }));
  });
}

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const entry = await getEntryBySlug(slug.join("/"));

  if (!entry) {
    return {};
  }

  return buildMetadata(entry);
}

export default async function CatchAllPage({ params }: RouteProps) {
  const { slug } = await params;
  const entry = await getEntryBySlug(slug.join("/"));

  if (!entry) {
    notFound();
  }

  return <SectionRenderer sections={entry.sections} />;
}
