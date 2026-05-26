"use client";

import { motion } from "framer-motion";

type OfferingsGridProps = {
  columns: Array<{
    title: string;
    accent?: boolean;
    bullets: string[];
  }>;
};

export function ConsultancyOfferingsGrid({ columns }: OfferingsGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {columns.map((column, index) => (
        <motion.article
          key={`${column.title}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.04 }}
          className={`overflow-hidden rounded-[calc(var(--radius-xl)-0.5rem)] border ${
            column.accent
              ? "border-[rgba(0,194,255,0.28)] bg-[linear-gradient(180deg,rgba(243,249,255,0.98),rgba(230,242,252,0.94))]"
              : "border-slate-200 bg-white/92"
          } shadow-[0_18px_64px_rgba(8,17,31,0.06)]`}
        >
          <div
            className={`h-2 w-full ${
              column.accent ? "bg-[var(--color-accent)]" : "bg-[var(--color-secondary)]"
            }`}
          />
          <div className="p-6 sm:p-7">
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--color-primary)]">
              {column.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {column.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
