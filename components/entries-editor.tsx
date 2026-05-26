"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Trash2, FileText, Settings, Layout } from "lucide-react";

import type { ContentEntry } from "@/content/site.config";
import { GenericEditor } from "./generic-editor";

type EntriesEditorProps = {
  entries: ContentEntry[];
  onChange: (entries: ContentEntry[]) => void;
};

function getEmptyEntry(): ContentEntry {
  return {
    slug: "new-page",
    title: "New Page",
    description: "",
    kind: "page",
    category: "general",
    seo: {
      title: "",
      description: "",
    },
    sections: [],
  };
}

export function EntriesEditor({ entries, onChange }: EntriesEditorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  function updateEntry(index: number, updated: ContentEntry) {
    const newEntries = [...entries];
    newEntries[index] = updated;
    onChange(newEntries);
  }

  function addEntry() {
    const newEntries = [getEmptyEntry(), ...entries];
    onChange(newEntries);
    setExpandedIndex(0);
  }

  function removeEntry(index: number) {
    if (!confirm("Are you sure you want to delete this page/blog entry?")) return;
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    onChange(newEntries);
    if (expandedIndex === index) setExpandedIndex(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-primary)]">Pages & Blogs Management</h3>
        <button
          type="button"
          onClick={addEntry}
          className="flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-secondary)]"
        >
          <Plus size={16} /> Create New Page
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {entries.map((entry, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all">
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="flex w-full items-center justify-between p-5 hover:bg-slate-50 rounded-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${entry.kind === 'post' ? 'bg-indigo-100 text-indigo-600' : 'bg-sky-100 text-sky-600'}`}>
                    <FileText size={18} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-bold text-slate-800">
                      {entry.title || "Untitled"}
                    </h4>
                    <p className="text-xs font-medium text-slate-500">
                      /{entry.slug} • {entry.kind.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-slate-400">
                    {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </div>
                </div>
              </button>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="border-t border-slate-100 p-6 bg-slate-50/50 rounded-b-2xl">
                  <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
                    <h5 className="font-semibold text-slate-700 flex items-center gap-2">
                      <Settings size={18} /> Page Settings
                    </h5>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeEntry(index);
                      }}
                      className="flex items-center gap-1 rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 size={14} /> Delete Entry
                    </button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-4">
                      <label className="block">
                        <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Title</span>
                        <input
                          type="text"
                          value={entry.title}
                          onChange={(e) => updateEntry(index, { ...entry, title: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 p-2.5 text-sm shadow-sm focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">URL Slug</span>
                        <input
                          type="text"
                          value={entry.slug}
                          onChange={(e) => updateEntry(index, { ...entry, slug: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 p-2.5 text-sm shadow-sm focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Description</span>
                        <textarea
                          value={entry.description}
                          onChange={(e) => updateEntry(index, { ...entry, description: e.target.value })}
                          className="w-full min-h-[80px] rounded-xl border border-slate-300 p-2.5 text-sm shadow-sm focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                        />
                      </label>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4">
                        <label className="block flex-1">
                          <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Type</span>
                          <select
                            value={entry.kind}
                            onChange={(e) => updateEntry(index, { ...entry, kind: e.target.value as "page" | "post" })}
                            className="w-full rounded-xl border border-slate-300 p-2.5 text-sm shadow-sm bg-white focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                          >
                            <option value="page">Page</option>
                            <option value="post">Blog Post</option>
                          </select>
                        </label>
                        <label className="block flex-1">
                          <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Category</span>
                          <input
                            type="text"
                            value={entry.category}
                            onChange={(e) => updateEntry(index, { ...entry, category: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 p-2.5 text-sm shadow-sm focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                          />
                        </label>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <h6 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">SEO Meta Data</h6>
                        <label className="block mb-3">
                          <span className="mb-1 block text-xs font-medium text-slate-600">Meta Title</span>
                          <input
                            type="text"
                            value={entry.seo?.title || ""}
                            onChange={(e) => updateEntry(index, { ...entry, seo: { ...entry.seo, title: e.target.value } })}
                            className="w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-[var(--color-accent)] focus:outline-none"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1 block text-xs font-medium text-slate-600">Meta Description</span>
                          <textarea
                            value={entry.seo?.description || ""}
                            onChange={(e) => updateEntry(index, { ...entry, seo: { ...entry.seo, description: e.target.value } })}
                            className="w-full min-h-[60px] rounded-lg border border-slate-300 p-2 text-sm focus:border-[var(--color-accent)] focus:outline-none"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Sections Editor using GenericEditor */}
                  <div className="mt-8 border-t border-slate-200 pt-6">
                    <h5 className="font-semibold text-slate-700 flex items-center gap-2 mb-4">
                      <Layout size={18} /> Page Sections Architecture
                    </h5>
                    <GenericEditor
                      value={entry.sections}
                      onChange={(newSections) => updateEntry(index, { ...entry, sections: newSections })}
                      label="Sections"
                      path={`entries[${index}].sections`}
                    />
                  </div>

                </div>
              )}
            </div>
          );
        })}

        {entries.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
            <p className="text-sm font-medium text-slate-500">No pages or blogs exist yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
