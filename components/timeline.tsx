"use client";

import { motion } from "framer-motion";

type TimelineProps = {
  steps: Array<{
    title: string;
    description: string;
  }>;
};

export function Timeline({ steps }: TimelineProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {steps.map((step, index) => (
        <motion.article
          key={step.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
          className="group rounded-[calc(var(--radius-xl)-0.5rem)] border border-slate-200 bg-white/90 p-6 shadow-[0_18px_64px_rgba(8,17,31,0.08)] transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-semibold text-white">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
              {step.title}
            </h3>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">{step.description}</p>
        </motion.article>
      ))}
    </div>
  );
}
