import Image from "next/image";
import Link from "next/link";

import { getHeaderNavigation, getSiteConfig } from "@/lib/site";

export async function SiteHeader() {
  const [navigation, config] = await Promise.all([
    getHeaderNavigation(),
    getSiteConfig(),
  ]);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[var(--color-secondary)] text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-3 text-sm sm:px-8 lg:justify-end lg:px-10">
          {config.navigation.utility.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-white/95 transition hover:text-[var(--color-accent)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-b border-slate-200/70 bg-white/88 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
              <Image
                src="/LOGO.webp"
                alt="Reliability Quality Solutions logo"
                width={70}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-secondary)]">
                {config.company.shortName}
              </p>
              <p className="text-sm text-slate-600">{config.company.tagline}</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) =>
              item.label === "SERVICES" ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-slate-700 transition hover:text-[var(--color-primary)]"
                  >
                    {item.label}
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 mt-4 w-[min(88vw,38rem)] -translate-x-1/2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-2xl border border-[var(--color-neutral)] bg-[var(--color-light)] p-5 shadow-[0_20px_64px_rgba(8,17,31,0.22)]">
                      <div className="grid max-h-[24rem] gap-x-6 gap-y-3 overflow-y-auto pr-1 sm:grid-cols-2">
                        {config.navigation.serviceGroups.flatMap((group) =>
                          group.items.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="rounded-xl px-3 py-2 text-xs font-semibold uppercase leading-6 tracking-[0.02em] text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-white"
                            >
                              {service.label}
                            </Link>
                          )),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-slate-700 transition hover:text-[var(--color-primary)]"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-secondary)]"
          >
            {config.leadCapture.stickyCtaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
