import Link from "next/link";

import { getFooterNavigation, getSiteConfig } from "@/lib/site";

export async function SiteFooter() {
  const [navigation, config] = await Promise.all([
    getFooterNavigation(),
    getSiteConfig(),
  ]);

  return (
    <footer className="border-t border-slate-200 bg-[var(--color-light)]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-secondary)]">
            {config.company.name}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
            {config.company.description}
          </p>
          <div className="mt-6 space-y-2 text-sm text-slate-600">
            <p>{config.company.email}</p>
            {config.company.phones.map((phone) => (
              <p key={phone}>{phone}</p>
            ))}
            <p>{config.company.address}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
            Navigation
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-600 transition hover:text-[var(--color-primary)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
            Social
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {config.company.socialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-slate-600 transition hover:text-[var(--color-primary)]"
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
