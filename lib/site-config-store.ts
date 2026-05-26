import type { SiteConfig } from "@/content/site.config";
import { siteConfig as staticSiteConfig } from "@/content/site.config";
import { connectToDatabase } from "@/lib/mongoose";
import { SiteConfigSnapshot } from "@/models/SiteConfigSnapshot";

export function isSiteConfigShape(value: unknown): value is SiteConfig {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return Boolean(
    candidate.company &&
      candidate.theme &&
      candidate.navigation &&
      candidate.services &&
      candidate.entries &&
      candidate.leadCapture,
  );
}

export async function loadRuntimeSiteConfig() {
  try {
    const connection = await connectToDatabase();

    if (!connection) {
      return {
        config: staticSiteConfig,
        source: "static" as const,
      };
    }

    const snapshot = await SiteConfigSnapshot.findOne({ key: "primary" }).lean();
    const runtimeConfig = snapshot?.data;

    if (isSiteConfigShape(runtimeConfig)) {
      return {
        config: runtimeConfig,
        source: "database" as const,
      };
    }

    return {
      config: staticSiteConfig,
      source: "static" as const,
    };
  } catch {
    return {
      config: staticSiteConfig,
      source: "fallback" as const,
    };
  }
}

export async function saveRuntimeSiteConfig(config: SiteConfig) {
  const connection = await connectToDatabase();

  if (!connection) {
    throw new Error("MongoDB is not configured.");
  }

  return SiteConfigSnapshot.findOneAndUpdate(
    { key: "primary" },
    { key: "primary", data: config },
    { new: true, upsert: true },
  ).lean();
}

export async function hasRuntimeSiteConfig() {
  try {
    const connection = await connectToDatabase();

    if (!connection) {
      return false;
    }

    const snapshot = await SiteConfigSnapshot.exists({ key: "primary" });
    return Boolean(snapshot);
  } catch {
    return false;
  }
}
