import Link from "next/link";

import type { ContentEntry, PageSection } from "@/content/site.config";
import { AnimatedHeading } from "@/components/animated-heading";
import { ServiceCard, IndustryCard } from "@/components/cards";
import { CTASection } from "@/components/cta-section";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { MetricCounter } from "@/components/metric-counter";
import { SectionWrapper } from "@/components/section-wrapper";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { Timeline } from "@/components/timeline";
import { getEntryBySlug, getSiteConfig } from "@/lib/site";

async function ArticleList({ slugs }: { slugs: string[] }) {
  const entries = await Promise.all(slugs.map((slug) => getEntryBySlug(slug)));
  const articles = entries.filter((entry): entry is ContentEntry => Boolean(entry));

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/${article.slug}`}
          className="rounded-[calc(var(--radius-xl)-0.5rem)] border border-slate-200 bg-white/90 p-6 shadow-[0_18px_64px_rgba(8,17,31,0.06)] transition duration-300 hover:-translate-y-1"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-secondary)]">
            {article.date ?? article.category}
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
            {article.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{article.description}</p>
          {article.readTime ? (
            <p className="mt-5 text-xs uppercase tracking-[0.22em] text-slate-500">
              {article.readTime}
            </p>
          ) : null}
        </Link>
      ))}
    </div>
  );
}

function renderCards(section: Extract<PageSection, { type: "cards" }>) {
  const CardComponent =
    section.variant === "industries" ? IndustryCard : ServiceCard;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {section.items.map((item) => (
        <CardComponent key={item.title} item={item} />
      ))}
    </div>
  );
}

export async function SectionRenderer({ sections }: { sections: PageSection[] }) {
  const config = await getSiteConfig();

  return (
    <>
      {sections.map((section, index) => {
        if (section.type === "cta") {
          return <CTASection key={`${section.type}-${index}`} {...section} />;
        }

        if (section.type === "hero") {
          return (
            <SectionWrapper key={`${section.type}-${index}`} className="pt-14 sm:pt-18 lg:pt-24">
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
                    {section.eyebrow}
                  </p>
                  <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-[var(--color-primary)] sm:text-6xl lg:text-7xl">
                    {section.title}
                  </h1>
                  <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-600">
                    {section.description}
                  </p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href={section.primaryCta.href}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-secondary)]"
                    >
                      {section.primaryCta.label}
                    </Link>
                    <Link
                      href={section.secondaryCta.href}
                      className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-secondary)]"
                    >
                      {section.secondaryCta.label}
                    </Link>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[rgba(0,194,255,0.18)] bg-[var(--gradient-hero)] p-8 text-white shadow-[var(--shadow-panel)]">
                  <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:30px_30px]" />
                  <div className="relative">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                      Engineering Signals
                    </p>
                    <div className="mt-8 space-y-4">
                      {section.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur"
                        >
                          <p className="text-sm leading-7 text-slate-800">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          );
        }

        return (
          <SectionWrapper key={`${section.type}-${index}`}>
            <AnimatedHeading
              eyebrow={section.eyebrow}
              title={section.title}
              description={section.description}
            />
            <div className="mt-12">
              {section.type === "stats" ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {section.items.map((item) => (
                    <MetricCounter key={item.label} {...item} />
                  ))}
                </div>
              ) : null}
              {section.type === "cards" ? renderCards(section) : null}
              {section.type === "timeline" ? <Timeline steps={section.steps} /> : null}
              {section.type === "testimonials" ? (
                <TestimonialSlider items={section.items} />
              ) : null}
              {section.type === "richText" ? (
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="space-y-5 text-base leading-8 text-slate-600">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <div className="rounded-[calc(var(--radius-xl)-0.5rem)] border border-slate-200 bg-white/90 p-6 shadow-[0_18px_64px_rgba(8,17,31,0.06)]">
                      <ul className="space-y-4">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="border-b border-slate-100 pb-4 text-sm leading-7 text-slate-600 last:border-b-0 last:pb-0"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}
              {section.type === "articleList" ? (
                <ArticleList slugs={section.articleSlugs} />
              ) : null}
            </div>
          </SectionWrapper>
        );
      })}
      <SectionWrapper>
        <AnimatedHeading
          eyebrow="Consultation"
          title={config.leadCapture.formTitle}
          description={config.leadCapture.formDescription}
        />
        <div className="mt-12">
          <LeadCaptureForm
            title={config.leadCapture.formTitle}
            description={config.leadCapture.formDescription}
            trustCallouts={config.leadCapture.trustCallouts}
            industryOptions={config.leadCapture.industryOptions}
          />
        </div>
      </SectionWrapper>
    </>
  );
}
