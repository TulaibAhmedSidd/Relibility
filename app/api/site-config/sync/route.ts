import { siteConfig as staticSiteConfig } from "@/content/site.config";
import { getAdminSession } from "@/lib/auth";
import { saveRuntimeSiteConfig } from "@/lib/site-config-store";

const NO_STORE = { "Cache-Control": "no-store, no-cache, must-revalidate" };

/**
 * POST /api/site-config/sync
 *
 * Reads the current static site.config.ts that is bundled with the server
 * and upserts it into the MongoDB SiteConfigSnapshot collection.
 * This is the "Upload local config → DB" button in the admin panel.
 */
export async function POST() {
  const session = await getAdminSession();

  if (!session) {
    return Response.json(
      { success: false, message: "Unauthorized." },
      { status: 401, headers: NO_STORE },
    );
  }

  try {
    await saveRuntimeSiteConfig(staticSiteConfig);

    return Response.json(
      {
        success: true,
        message: "Static site.config.ts has been synced to the database successfully.",
        config: staticSiteConfig,
      },
      { headers: NO_STORE },
    );
  } catch (error) {
    console.error("[sync] Failed to sync static config to DB:", error);
    return Response.json(
      { success: false, message: "Unable to sync config. Check server logs." },
      { status: 500, headers: NO_STORE },
    );
  }
}
