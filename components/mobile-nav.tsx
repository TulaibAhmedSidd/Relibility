"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { NavItem } from "@/content/site.config";

type MobileNavProps = {
  headerItems: NavItem[];
  utilityItems: NavItem[];
  serviceGroups: Array<{
    title: string;
    items: NavItem[];
  }>;
  requestLabel: string;
};

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative h-5 w-6">
      <span
        className={`absolute left-0 top-0 h-0.5 w-6 rounded-full bg-[var(--color-primary)] transition-all duration-200 ${
          open ? "top-2 rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-2 h-0.5 w-6 rounded-full bg-[var(--color-primary)] transition-all duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 top-4 h-0.5 w-6 rounded-full bg-[var(--color-primary)] transition-all duration-200 ${
          open ? "top-2 -rotate-45" : ""
        }`}
      />
    </div>
  );
}

export function MobileNav({
  headerItems,
  utilityItems,
  serviceGroups,
  requestLabel,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const serviceItems = serviceGroups.flatMap((group) => group.items);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Toggle mobile navigation"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[var(--color-primary)] shadow-sm transition hover:border-[var(--color-accent)]"
      >
        <HamburgerIcon open={open} />
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close mobile navigation"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[69] bg-[rgba(8,17,31,0.24)] backdrop-blur-[2px]"
            />
            <motion.aside
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute right-0 top-0 z-[70] flex max-h-[min(78vh,44rem)] w-[min(92vw,24rem)] flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f5f9fc)] shadow-[0_24px_100px_rgba(8,17,31,0.18)]"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3"
                >
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                    <Image
                      src="/LOGO.webp"
                      alt="Reliability Quality Solutions logo"
                      width={62}
                      height={36}
                      className="h-9 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
                      RQS
                    </p>
                    <p className="text-xs text-slate-500">Mobile Navigation</p>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600"
                >
                  Close
                </button>
              </div>

              <div className="space-y-6 overflow-y-auto p-5">
                <Link
                  href="/contact-us"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_48px_rgba(8,17,31,0.16)] transition hover:bg-[var(--color-secondary)]"
                >
                  {requestLabel}
                </Link>

                <nav className="space-y-2">
                  {headerItems.map((item) =>
                    item.label === "SERVICES" ? (
                      <div
                        key={item.href}
                        className="rounded-3xl border border-slate-200 bg-white/80"
                      >
                        <button
                          type="button"
                          onClick={() => setServicesOpen((current) => !current)}
                          className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-semibold tracking-[0.04em] text-[var(--color-primary)]"
                        >
                          <span>{item.label}</span>
                          <span
                            className={`transition-transform duration-200 ${
                              servicesOpen ? "rotate-45" : ""
                            }`}
                          >
                            +
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {servicesOpen ? (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.18, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="grid gap-2 border-t border-slate-100 px-3 py-3">
                                {serviceItems.map((service) => (
                                  <Link
                                    key={service.href}
                                    href={service.href}
                                    onClick={() => setOpen(false)}
                                    className="rounded-2xl px-3 py-3 text-sm leading-6 text-slate-700 transition hover:bg-[var(--color-primary)] hover:text-white"
                                  >
                                    {service.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 px-4 py-4 text-sm font-semibold tracking-[0.04em] text-[var(--color-primary)] transition hover:border-[var(--color-accent)]"
                      >
                        <span>{item.label}</span>
                        <span className="text-slate-400">/</span>
                      </Link>
                    ),
                  )}
                </nav>

                <div className="rounded-[1.5rem] border border-[var(--color-neutral)] bg-[var(--color-light)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-accent)]">
                    Contact
                  </p>
                  <div className="mt-3 space-y-3">
                    {utilityItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block text-sm leading-6 text-slate-700 transition hover:text-[var(--color-primary)]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
