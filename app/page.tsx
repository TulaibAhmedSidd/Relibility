import { LiveHomeBackground } from "@/components/live-home-background";
import { SectionRenderer } from "@/components/section-renderer";
import { getEntryBySlug } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const home = await getEntryBySlug("");

  if (!home) {
    return null;
  }

  return (
    <div className="relative">
      <div className="absolute inset-0">
        <LiveHomeBackground />
      </div>
      <div className="relative z-10">
        <SectionRenderer sections={home.sections} />
      </div>
    </div>
  );
}
