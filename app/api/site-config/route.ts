import { z } from "zod";

import type { SiteConfig } from "@/content/site.config";
import { siteConfig as staticSiteConfig } from "@/content/site.config";
import { getAdminSession } from "@/lib/auth";
import {
  isSiteConfigShape,
  loadRuntimeSiteConfig,
  saveRuntimeSiteConfig,
} from "@/lib/site-config-store";

const siteConfigUpdateSchema = z.object({
  config: z.record(z.string(), z.unknown()),
});

export async function GET() {
  const { config, source } = await loadRuntimeSiteConfig();

  return Response.json(
    {
      source,
      config,
      staticConfig: staticSiteConfig,
    },
    {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    },
  );
}

export async function PUT(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return Response.json(
      { success: false, message: "Unauthorized." },
      {
        status: 401,
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      },
    );
  }

  try {
    const payload = siteConfigUpdateSchema.parse(await request.json());
    if (!isSiteConfigShape(payload.config)) {
      return Response.json(
        { success: false, message: "Site config is missing required sections." },
        {
          status: 400,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    const nextConfig = payload.config as SiteConfig;

    await saveRuntimeSiteConfig(nextConfig);

    return Response.json(
      { success: true, config: nextConfig },
      {
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { success: false, message: "Invalid site config payload." },
        {
          status: 400,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    return Response.json(
      { success: false, message: "Unable to save site configuration." },
      {
        status: 500,
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      },
    );
  }
}
