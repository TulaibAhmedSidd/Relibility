import { saveRuntimeSiteConfig } from "./lib/site-config-store";
import { siteConfig } from "./content/site.config";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

async function seed() {
  try {
    console.log("Seeding config...");
    await saveRuntimeSiteConfig(siteConfig);
    console.log("Database successfully updated with new site config!");
    process.exit(0);
  } catch (error) {
    console.error("Failed to update database", error);
    process.exit(1);
  }
}

seed();
