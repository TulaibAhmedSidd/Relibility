"use client";

import Image from "next/image";
import { useState } from "react";

import type { SiteConfig } from "@/content/site.config";
import { GenericEditor } from "./generic-editor";
import { EntriesEditor } from "./entries-editor";

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
  const [config, setConfig] = useState<SiteConfig>(initialConfig);
  const [message, setMessage] = useState(`Loaded from ${source}.`);
  const [saving, setSaving] = useState(false);

  function updateSection<K extends keyof SiteConfig>(
    section: K,
    value: SiteConfig[K],
  ) {
    setConfig((current) => ({ ...current, [section]: value }));
  }

  function updateServicesArray(
    updater: (services: SiteConfig["services"]) => SiteConfig["services"],
  ) {
    setConfig((current) => ({
      ...current,
      services: updater(current.services),
    }));
  }

  async function handleServiceImageUpload(index: number, file: File | null) {
    if (!file) {
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      updateServicesArray((services) =>
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

    try {
      // Validate object structure exists
      if (!config || !config.company || !config.theme || !config.navigation || !config.services || !config.entries) {
        throw new Error("Validation Error: Configuration is missing required core sections.");
      }

      // Ensure JSON is perfectly valid and serializable
      let payloadString: string;
      try {
        payloadString = JSON.stringify({ config });
      } catch (e) {
        throw new Error("Validation Error: Configuration contains invalid data structures.");
      }

      const response = await fetch("/api/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: payloadString,
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

  const [activeTab, setActiveTab] = useState<string>("company");

  const sections: Array<{
    key: keyof SiteConfig;
    title: string;
    description: string;
  }> = [
    { key: "company", title: "Company Info", description: "Manage brand, contact details, and founder information." },
    { key: "theme", title: "Theme & Styling", description: "Configure global colors, gradients, spacing, and visual tokens." },
    { key: "navigation", title: "Navigation Menus", description: "Edit header, footer, utility bar, and services menu structures." },
    { key: "services", title: "Services List", description: "Manage the main service inventory, aliases, and descriptions." },
    { key: "industries", title: "Industries", description: "Configure industry cards and their positioning data." },
    { key: "process", title: "Consulting Process", description: "Edit the workflow timeline and consulting steps." },
    { key: "testimonials", title: "Testimonials", description: "Manage rotating social proof entries and client quotes." },
    { key: "leadCapture", title: "Lead Capture (RFQ)", description: "Customize RFQ labels, widget copy, and industry selectors." },
    { key: "entries", title: "Pages & Blogs", description: "Full page content and article entries for the entire site." },
  ];

  const servicesForImages = config.services || [];

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col gap-6 lg:flex-row">
      {/* Sidebar Navigation */}
      <aside className="flex w-full flex-col gap-2 rounded-[var(--radius-xl)] border border-slate-200 bg-white/95 p-4 shadow-sm lg:w-72 lg:overflow-y-auto">
        <div className="mb-4 px-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
            Editor Sections
          </p>
        </div>
        
        <button
          onClick={() => setActiveTab("images")}
          className={`text-left rounded-xl px-4 py-3 text-sm font-medium transition ${
            activeTab === "images" 
              ? "bg-[var(--color-primary)] text-white shadow-md" 
              : "text-slate-600 hover:bg-slate-100 hover:text-[var(--color-primary)]"
          }`}
        >
          Service Images
        </button>

        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveTab(s.key)}
            className={`text-left rounded-xl px-4 py-3 text-sm font-medium transition ${
              activeTab === s.key 
                ? "bg-[var(--color-primary)] text-white shadow-md" 
                : "text-slate-600 hover:bg-slate-100 hover:text-[var(--color-primary)]"
            }`}
          >
            {s.title}
          </button>
        ))}
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col overflow-hidden rounded-[var(--radius-xl)] border border-slate-200 bg-white/95 shadow-sm">
        {/* Header bar */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
              {activeTab === "images" ? "Service Image Manager" : sections.find((s) => s.key === activeTab)?.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {activeTab === "images" 
                ? "Upload or link images for your services." 
                : sections.find((s) => s.key === activeTab)?.description}
            </p>
            {message && (
              <p className={`mt-2 text-sm font-medium ${message.includes("success") || message.includes("Loaded") ? "text-green-600" : "text-red-500"}`}>
                {message}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-secondary)] disabled:opacity-70"
          >
            {saving ? "Saving Changes..." : "Save Configuration"}
          </button>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "images" && (
            <div className="grid gap-6 xl:grid-cols-2">
              {servicesForImages.map((service, index) => (
                <div
                  key={service.slug || index}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-[var(--color-accent)]"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:w-40">
                      {service.image?.src ? (
                        <Image
                          src={service.image.src}
                          alt={service.image.alt || "Service Image"}
                          fill
                          className="object-cover"
                          sizes="160px"
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
                          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em]">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-[var(--color-primary)]">
                        {service.title || "Untitled Service"}
                      </h3>
                      <label className="mt-3 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Image URL
                        <input
                          value={service.image?.src ?? ""}
                          onChange={(event) =>
                            updateServicesArray((services) =>
                              services.map((currentService, currentIndex) =>
                                currentIndex === index
                                  ? {
                                      ...currentService,
                                      image: {
                                        src: event.target.value,
                                        alt: currentService.image?.alt ?? `${currentService.title} illustration`,
                                      },
                                    }
                                  : currentService,
                              ),
                            )
                          }
                          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                          placeholder="https://..."
                        />
                      </label>
                      <label className="mt-3 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Alt Text
                        <input
                          value={service.image?.alt ?? ""}
                          onChange={(event) =>
                            updateServicesArray((services) =>
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
                          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                          placeholder="Description of the image..."
                        />
                      </label>
                      <label className="mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[var(--color-accent)] hover:bg-slate-50 hover:text-[var(--color-primary)]">
                        Upload Image File
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
          )}

          {sections.map(
            (section) =>
              activeTab === section.key && (
                <div key={section.key} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {section.key === "entries" ? (
                    <EntriesEditor
                      entries={config.entries}
                      onChange={(newEntries) => updateSection("entries", newEntries)}
                    />
                  ) : (
                    <GenericEditor
                      value={config[section.key]}
                      onChange={(newValue) => updateSection(section.key, newValue)}
                      label={section.title}
                      path={section.key}
                    />
                  )}
                </div>
              )
          )}
        </div>
      </main>
    </div>
  );
}
