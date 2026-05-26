import Link from "next/link";

import { SectionWrapper } from "@/components/section-wrapper";

export default function NotFound() {
  return (
    <SectionWrapper className="flex min-h-[60vh] items-center">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
          Page Not Found
        </p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-[var(--color-primary)]">
          The route does not exist in the current migration set.
        </h1>
        <p className="mt-6 text-lg leading-9 text-slate-600">
          The first implementation pass preserves the core page and article URLs found in
          the live sitemap. If you expected a page here, it likely belongs in the next
          migration batch.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-secondary)]"
        >
          Return Home
        </Link>
      </div>
    </SectionWrapper>
  );
}
