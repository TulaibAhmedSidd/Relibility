import Link from "next/link";

import { SectionWrapper } from "@/components/section-wrapper";

type CtaSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
};

export function CTASection({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: CtaSectionProps) {
  return (
    <SectionWrapper>
      <div className="rounded-[var(--radius-xl)] border border-[rgba(0,194,255,0.24)] bg-[linear-gradient(135deg,rgba(11,31,51,1),rgba(18,57,91,0.96),rgba(0,194,255,0.25))] px-8 py-10 text-white shadow-[0_28px_100px_rgba(8,17,31,0.24)] sm:px-10 sm:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          {title}
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200">
          {description}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-primary)] transition hover:brightness-110"
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
