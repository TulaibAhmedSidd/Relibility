"use client";

import { motion, AnimatePresence } from "framer-motion";
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
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close engineering desk support"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[rgba(8,17,31,0.42)] backdrop-blur-[2px] lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-x-0 bottom-0 z-[61] max-h-[88vh] overflow-y-auto rounded-t-[2rem] border border-slate-200 bg-white p-4 shadow-[0_-12px_50px_rgba(8,17,31,0.18)] sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[min(92vw,48rem)] sm:rounded-[var(--radius-xl)] sm:p-5 lg:w-[min(78vw,68rem)]"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
                    Engineering Desk Support
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)] sm:text-3xl">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="shrink-0 rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600"
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
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="rounded-full bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_80px_rgba(8,17,31,0.24)] transition hover:bg-[var(--color-secondary)] sm:px-6 sm:py-4"
      >
        Engineering Desk Support
      </button>
    </div>
  );
}
