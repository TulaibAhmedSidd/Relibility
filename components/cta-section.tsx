import Link from "next/link";

import { SectionWrapper } from "@/components/section-wrapper";

type CtaSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: {
    src: string;
    alt?: string;
  };
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
  image,
  primaryCta,
  secondaryCta,
}: CtaSectionProps) {
  if (image) {
    return (
      <SectionWrapper className="max-w-none px-0">
        <div
          className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-slate-900 bg-cover bg-fixed bg-center py-20 px-6 sm:px-12"
          style={{ backgroundImage: `url(${image.src})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 w-full max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-[var(--color-accent)] drop-shadow-md">
              {eyebrow}
            </p>
            <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl drop-shadow-lg">
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200 drop-shadow-md">
              {description}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-bold text-white transition hover:bg-[var(--color-secondary)] shadow-lg hover:shadow-xl"
              >
                {primaryCta.label}
              </Link>
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 hover:border-white/50"
              >
                {secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    );
  }

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
