import Image from "next/image";
import Link from "next/link";

import type { ContentEntry, PageSection } from "@/content/site.config";
import { AnimatedHeading } from "@/components/animated-heading";
import { ServiceCard, IndustryCard } from "@/components/cards";
import { ConsultancyOfferingsGrid } from "@/components/consultancy-offerings-grid";
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

function getFallbackCardImage(
  variant: Extract<PageSection, { type: "cards" }>["variant"],
) {
  switch (variant) {
    case "industries":
      return {
        src: "/services/manufacturing.svg",
        alt: "Industry illustration",
      };
    case "caseStudies":
      return {
        src: "/services/analysis.svg",
        alt: "Case study illustration",
      };
    case "links":
      return {
        src: "/services/quality.svg",
        alt: "Engineering services illustration",
      };
    case "services":
    default:
      return {
        src: "/services/qualification.svg",
        alt: "Service illustration",
      };
  }
}

function renderCards(
  section: Extract<PageSection, { type: "cards" }>,
  config: Awaited<ReturnType<typeof getSiteConfig>>,
) {
  const CardComponent =
    section.variant === "industries" ? IndustryCard : ServiceCard;

  const resolvedItems = section.items.map((item) => {
    if (item.image) {
      return item;
    }

    const serviceFromHref = config.services.find(
      (service) => item.href === `/${service.slug}` || item.href === `/${service.aliases?.[0]}`,
    );
    const serviceFromTitle = config.services.find(
      (service) => service.title === item.title,
    );
    const matchedService = serviceFromHref ?? serviceFromTitle;

    if (matchedService) {
      return { ...item, image: matchedService.image };
    }

    return { ...item, image: getFallbackCardImage(section.variant) };
  });

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {resolvedItems.map((item) => (
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
            <section
              key={`${section.type}-${index}`}
              className="relative flex min-h-[60vh] md:min-h-[85vh] items-center justify-center overflow-hidden bg-slate-900 bg-cover bg-fixed bg-center py-20 lg:py-32"
              style={{
                backgroundImage: section.image ? `url(${section.image.src})` : "none",
              }}
            >
              {section.image && <div className="absolute inset-0 bg-black/40" />}
              <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                  <div className="rounded-3xl border border-white/20 bg-white/75 p-8 sm:p-12 backdrop-blur-md shadow-2xl">
                    <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-primary)]">
                      {section.eyebrow}
                    </p>
                    <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl drop-shadow-sm">
                      {section.title}
                    </h1>
                    <p className="mt-6 text-lg font-medium leading-8 text-slate-800 drop-shadow-sm">
                      {section.description}
                    </p>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                      <Link
                        href={section.primaryCta.href}
                        className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-bold text-white transition hover:bg-[var(--color-secondary)] shadow-md hover:shadow-lg"
                      >
                        {section.primaryCta.label}
                      </Link>
                      <Link
                        href={section.secondaryCta.href}
                        className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold text-[var(--color-primary)] transition hover:bg-slate-50 shadow-md hover:shadow-lg border border-slate-200"
                      >
                        {section.secondaryCta.label}
                      </Link>
                    </div>
                  </div>
                  {/* Optional Highlights Overlay */}
                  {section.highlights && section.highlights.length > 0 && (
                    <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[rgba(255,255,255,0.3)] bg-black/40 p-8 text-white backdrop-blur-md shadow-2xl hidden lg:block">
                      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:24px_24px]" />
                      <div className="relative">
                        <p className="text-xs font-bold uppercase tracking-[0.28em] text-white">
                          Engineering Signals
                        </p>
                        <div className="mt-6 space-y-4">
                          {section.highlights.map((highlight) => (
                            <div
                              key={highlight}
                              className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm shadow-sm"
                            >
                              <p className="text-sm font-medium leading-6 text-slate-100">{highlight}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
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
              {section.type === "cards" ? renderCards(section, config) : null}
              {section.type === "offeringsGrid" ? (
                <ConsultancyOfferingsGrid columns={section.columns} />
              ) : null}
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
