"use client";

import { useState } from "react";

import { LeadCaptureForm } from "@/components/lead-capture-form";

type EngineeringDeskWidgetProps = {
  title: string;
  description: string;
  formTitle: string;
  formDescription: string;
  trustCallouts: string[];
  industryOptions: string[];
};

export function EngineeringDeskWidget({
  title,
  description,
  formTitle,
  formDescription,
  trustCallouts,
  industryOptions,
}: EngineeringDeskWidgetProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      {open ? (
        <div className="w-[min(92vw,30rem)] rounded-[var(--radius-xl)] border border-slate-200 bg-white p-5 shadow-[0_30px_120px_rgba(8,17,31,0.22)]">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
                Engineering Desk Support
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600"
            >
              Close
            </button>
          </div>
          <LeadCaptureForm
            title={formTitle}
            description={formDescription}
            trustCallouts={trustCallouts}
            industryOptions={industryOptions}
            compact
          />
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="rounded-full bg-[var(--color-primary)] px-6 py-4 text-sm font-semibold text-white shadow-[0_20px_80px_rgba(8,17,31,0.24)] transition hover:bg-[var(--color-secondary)]"
      >
        Engineering Desk Support
      </button>
    </div>
  );
}
