import { SectionRenderer } from "@/components/section-renderer";
import { getEntryBySlug } from "@/lib/site";

export default async function HomePage() {
  const home = await getEntryBySlug("");

  if (!home) {
    return null;
  }

  return <SectionRenderer sections={home.sections} />;
}
