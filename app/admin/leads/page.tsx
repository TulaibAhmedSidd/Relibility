import Link from "next/link";

import { AdminLeadStatusSelect } from "@/components/admin-lead-status-select";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { SectionWrapper } from "@/components/section-wrapper";
import { connectToDatabase } from "@/lib/mongoose";
import { Lead } from "@/models/Lead";

export const dynamic = "force-dynamic";

async function getLeads() {
  const connection = await connectToDatabase();

  if (!connection) {
    return [];
  }

  const leads = await Lead.find().sort({ createdAt: -1 }).lean();
  return leads;
}

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <SectionWrapper>
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
            Admin
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--color-primary)]">
            Inbound Leads Dashboard
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Review inbound lead submissions captured through the RFQ modules and the
            engineering desk support widget.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/site-config"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[var(--color-accent)] hover:text-[var(--color-primary)]"
          >
            Edit Site Config
          </Link>
          <AdminLogoutButton />
        </div>
      </div>
      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-slate-200 bg-white shadow-[0_18px_64px_rgba(8,17,31,0.06)]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Submission Date</th>
                <th className="px-5 py-4 font-semibold">Client Name</th>
                <th className="px-5 py-4 font-semibold">Company</th>
                <th className="px-5 py-4 font-semibold">Target Industry</th>
                <th className="px-5 py-4 font-semibold">Technical Requirements</th>
                <th className="px-5 py-4 font-semibold">Lead Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.length ? (
                leads.map((lead) => (
                  <tr key={String(lead._id)} className="border-t border-slate-100">
                    <td className="px-5 py-4 text-slate-600">
                      {lead.createdAt
                        ? new Date(lead.createdAt).toLocaleDateString("en-US")
                        : "-"}
                    </td>
                    <td className="px-5 py-4 text-slate-800">{lead.name}</td>
                    <td className="px-5 py-4 text-slate-600">{lead.companyName}</td>
                    <td className="px-5 py-4 text-slate-600">{lead.industrySector}</td>
                    <td className="max-w-sm px-5 py-4 text-slate-600">
                      {lead.technicalDetails}
                    </td>
                    <td className="px-5 py-4">
                      <AdminLeadStatusSelect
                        leadId={String(lead._id)}
                        initialStatus={lead.status}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-500">
                    No leads yet or MongoDB is not configured.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SectionWrapper>
  );
}
