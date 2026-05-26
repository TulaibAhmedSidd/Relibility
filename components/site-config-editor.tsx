"use client";

import Image from "next/image";
import { useState } from "react";

import type { SiteConfig } from "@/content/site.config";

type EditorState = {
  company: string;
  theme: string;
  navigation: string;
  services: string;
  industries: string;
  process: string;
  testimonials: string;
  leadCapture: string;
  entries: string;
};

function toPrettyJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function parseSection(name: keyof EditorState, value: string) {
  try {
    return { value: JSON.parse(value), error: null };
  } catch {
    return { value: null, error: `Invalid JSON in ${name}.` };
  }
}

async function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Unable to read file."));
    reader.readAsDataURL(file);
  });
}

export function SiteConfigEditor({
  initialConfig,
  source,
}: {
  initialConfig: SiteConfig;
  source: string;
}) {
  const [state, setState] = useState<EditorState>({
    company: toPrettyJson(initialConfig.company),
    theme: toPrettyJson(initialConfig.theme),
    navigation: toPrettyJson(initialConfig.navigation),
    services: toPrettyJson(initialConfig.services),
    industries: toPrettyJson(initialConfig.industries),
    process: toPrettyJson(initialConfig.process),
    testimonials: toPrettyJson(initialConfig.testimonials),
    leadCapture: toPrettyJson(initialConfig.leadCapture),
    entries: toPrettyJson(initialConfig.entries),
  });
  const [message, setMessage] = useState(`Loaded from ${source}.`);
  const [saving, setSaving] = useState(false);

  function updateField(field: keyof EditorState, value: string) {
    setState((current) => ({ ...current, [field]: value }));
  }

  function updateServicesJson(
    updater: (services: SiteConfig["services"]) => SiteConfig["services"],
  ) {
    const parsed = parseSection("services", state.services);

    if (!parsed.value || !Array.isArray(parsed.value)) {
      setMessage("Fix the services JSON before using the image manager.");
      return;
    }

    const nextServices = updater(parsed.value as SiteConfig["services"]);
    updateField("services", toPrettyJson(nextServices));
  }

  async function handleServiceImageUpload(index: number, file: File | null) {
    if (!file) {
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      updateServicesJson((services) =>
        services.map((service, currentIndex) =>
          currentIndex === index
            ? {
                ...service,
                image: {
                  src: dataUrl,
                  alt: service.image?.alt ?? `${service.title} illustration`,
                },
              }
            : service,
        ),
      );
      setMessage("Service image attached. Save the full site config to persist it.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to upload image.");
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");

    const company = parseSection("company", state.company);
    const theme = parseSection("theme", state.theme);
    const navigation = parseSection("navigation", state.navigation);
    const services = parseSection("services", state.services);
    const industries = parseSection("industries", state.industries);
    const process = parseSection("process", state.process);
    const testimonials = parseSection("testimonials", state.testimonials);
    const leadCapture = parseSection("leadCapture", state.leadCapture);
    const entries = parseSection("entries", state.entries);

    const firstError = [
      company.error,
      theme.error,
      navigation.error,
      services.error,
      industries.error,
      process.error,
      testimonials.error,
      leadCapture.error,
      entries.error,
    ].find(Boolean);

    if (firstError) {
      setMessage(firstError);
      setSaving(false);
      return;
    }

    const config: SiteConfig = {
      company: company.value as SiteConfig["company"],
      theme: theme.value as SiteConfig["theme"],
      navigation: navigation.value as SiteConfig["navigation"],
      services: services.value as SiteConfig["services"],
      industries: industries.value as SiteConfig["industries"],
      process: process.value as SiteConfig["process"],
      testimonials: testimonials.value as SiteConfig["testimonials"],
      leadCapture: leadCapture.value as SiteConfig["leadCapture"],
      entries: entries.value as SiteConfig["entries"],
    };

    try {
      const response = await fetch("/api/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Unable to save site config.");
      }

      setMessage("Site configuration saved successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to save site configuration.",
      );
    } finally {
      setSaving(false);
    }
  }

  const sections: Array<{
    key: keyof EditorState;
    title: string;
    description: string;
  }> = [
    { key: "company", title: "Company", description: "Brand, contact, and founder information." },
    { key: "theme", title: "Theme", description: "Global colors, gradients, spacing, and visual tokens." },
    { key: "navigation", title: "Navigation", description: "Header, footer, utility bar, and services menu arrays." },
    { key: "services", title: "Services", description: "Main service inventory and aliases." },
    { key: "industries", title: "Industries", description: "Industry cards and positioning data." },
    { key: "process", title: "Process", description: "Consulting workflow timeline data." },
    { key: "testimonials", title: "Testimonials", description: "Rotating social proof entries." },
    { key: "leadCapture", title: "Lead Capture", description: "RFQ labels, widget copy, and industry selectors." },
    { key: "entries", title: "Entries", description: "Full page and article content array for the entire site." },
  ];

  const parsedServices = parseSection("services", state.services);
  const servicesForImages = Array.isArray(parsedServices.value)
    ? (parsedServices.value as SiteConfig["services"])
    : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-slate-200 bg-white/95 p-6 shadow-[0_18px_64px_rgba(8,17,31,0.08)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
            Site Config Editor
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-600">{message}</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-secondary)] disabled:opacity-70"
        >
          {saving ? "Saving..." : "Save Full Site Config"}
        </button>
      </div>
      <article className="rounded-[var(--radius-xl)] border border-slate-200 bg-white/95 p-6 shadow-[0_18px_64px_rgba(8,17,31,0.06)]">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
          Service Image Manager
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Each service can use a URL or an uploaded image. Uploaded files are stored as
          data URLs inside the saved site config snapshot, so they remain available even
          if an external URL disappears.
        </p>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {servicesForImages.map((service, index) => (
            <div
              key={service.slug}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative h-28 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white sm:w-40">
                  {service.image?.src ? (
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-[var(--color-primary)]">
                    {service.title}
                  </h3>
                  <label className="mt-3 block text-sm font-medium text-slate-700">
                    Image URL
                    <input
                      value={service.image?.src ?? ""}
                      onChange={(event) =>
                        updateServicesJson((services) =>
                          services.map((currentService, currentIndex) =>
                            currentIndex === index
                              ? {
                                  ...currentService,
                                  image: {
                                    src: event.target.value,
                                    alt:
                                      currentService.image?.alt ??
                                      `${currentService.title} illustration`,
                                  },
                                }
                              : currentService,
                          ),
                        )
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[var(--color-accent)]"
                    />
                  </label>
                  <label className="mt-3 block text-sm font-medium text-slate-700">
                    Alt Text
                    <input
                      value={service.image?.alt ?? ""}
                      onChange={(event) =>
                        updateServicesJson((services) =>
                          services.map((currentService, currentIndex) =>
                            currentIndex === index
                              ? {
                                  ...currentService,
                                  image: {
                                    src: currentService.image?.src ?? "",
                                    alt: event.target.value,
                                  },
                                }
                              : currentService,
                          ),
                        )
                      }
                      className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[var(--color-accent)]"
                    />
                  </label>
                  <label className="mt-3 inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[var(--color-accent)] hover:text-[var(--color-primary)]">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) =>
                        handleServiceImageUpload(index, event.target.files?.[0] ?? null)
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
      {sections.map((section) => (
        <article
          key={section.key}
          className="rounded-[var(--radius-xl)] border border-slate-200 bg-white/95 p-6 shadow-[0_18px_64px_rgba(8,17,31,0.06)]"
        >
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
            {section.title}
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">{section.description}</p>
          <textarea
            value={state[section.key]}
            onChange={(event) => updateField(section.key, event.target.value)}
            className="mt-5 min-h-[18rem] w-full rounded-3xl border border-slate-200 bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100 outline-none transition focus:border-[var(--color-accent)]"
            spellCheck={false}
          />
        </article>
      ))}
    </div>
  );
}
