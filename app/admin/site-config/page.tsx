import Link from "next/link";

import { AdminLogoutButton } from "@/components/admin-logout-button";
import { SectionWrapper } from "@/components/section-wrapper";
import { SiteConfigEditor } from "@/components/site-config-editor";
import { loadRuntimeSiteConfig } from "@/lib/site-config-store";

export const dynamic = "force-dynamic";

export default async function AdminSiteConfigPage() {
  const { config, source } = await loadRuntimeSiteConfig();

  return (
    <SectionWrapper>
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
            Admin Workspace
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--color-primary)]">
            Complete Site Configuration
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Edit the entire runtime site configuration from one place. If database
            access fails, the live site still falls back to the static seed config.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/leads"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[var(--color-accent)] hover:text-[var(--color-primary)]"
          >
            View Leads
          </Link>
          <AdminLogoutButton />
        </div>
      </div>
      <SiteConfigEditor initialConfig={config} source={source} />
    </SectionWrapper>
  );
}
