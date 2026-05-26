import { notFound } from "next/navigation";

import { SectionRenderer } from "@/components/section-renderer";
import { buildMetadata } from "@/lib/metadata";
import { getEntryBySlug } from "@/lib/site";

export const dynamic = "force-dynamic";

type RouteProps = {
  params: Promise<{ slug: string[] }>;
};

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
