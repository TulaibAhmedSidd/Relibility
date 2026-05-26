"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";

type GenericEditorProps = {
  value: any;
  onChange: (value: any) => void;
  label?: string;
  path?: string;
};

function isObject(val: any) {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

function getEmptyTemplate(value: any): any {
  if (Array.isArray(value)) {
    return [];
  }
  if (isObject(value)) {
    const template: any = {};
    for (const key in value) {
      template[key] = getEmptyTemplate(value[key]);
    }
    return template;
  }
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  return null;
}

function formatLabel(key: string) {
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function GenericEditor({ value, onChange, label, path = "" }: GenericEditorProps) {
  const [isExpanded, setIsExpanded] = useState(path.split(".").length <= 2);

  if (value === null || value === undefined) {
    return null;
  }

  const displayLabel = label ? formatLabel(label) : "";

  if (typeof value === "string") {
    const isMultiline = value.length > 50 || value.includes("\n");
    const isColor = value.startsWith("#") && (value.length === 4 || value.length === 7 || value.length === 9);
    const isGradient = value.includes("gradient");

    return (
      <div className="mb-5">
        {displayLabel && (
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
            {displayLabel}
          </label>
        )}
        {isMultiline ? (
          <textarea
            className="w-full min-h-[120px] rounded-xl border border-slate-300 p-3 text-sm text-slate-800 shadow-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] focus:outline-none"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              {isColor && (
                <div className="shrink-0 overflow-hidden rounded-lg border border-slate-300 shadow-sm">
                  <input
                    type="color"
                    value={value.length >= 7 ? value.substring(0, 7) : "#000000"}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-10 w-10 cursor-pointer border-0 bg-transparent p-0 block"
                    title="Choose Color"
                  />
                </div>
              )}
              <input
                className="w-full rounded-xl border border-slate-300 p-2.5 text-sm text-slate-800 shadow-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] focus:outline-none"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={isGradient ? "linear-gradient(...)" : ""}
              />
            </div>
            {isGradient && (
              <div
                className="h-8 w-full rounded-lg border border-slate-200 shadow-inner"
                style={{ background: value }}
                title="Gradient Preview"
              />
            )}
          </div>
        )}
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <div className="mb-5">
        {displayLabel && (
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
            {displayLabel}
          </label>
        )}
        <input
          className="w-full rounded-xl border border-slate-300 p-2.5 text-sm text-slate-800 shadow-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] focus:outline-none"
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <div className="mb-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-accent)]"
        />
        {displayLabel && (
          <label className="text-sm font-semibold text-slate-700">{displayLabel}</label>
        )}
      </div>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-sm">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between font-bold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
        >
          <div className="flex items-center gap-2">
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            <span className="uppercase tracking-wide">{displayLabel || "List"}</span>
            <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600">
              {value.length} items
            </span>
          </div>
        </button>

        {isExpanded && (
          <div className="mt-5 flex flex-col gap-5 border-l-2 border-[var(--color-accent)] pl-5">
            {value.map((item, index) => (
              <div key={index} className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Item {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const newArray = [...value];
                      newArray.splice(index, 1);
                      onChange(newArray);
                    }}
                    className="flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                    title="Remove Item"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <GenericEditor
                  value={item}
                  onChange={(newItemValue) => {
                    const newArray = [...value];
                    newArray[index] = newItemValue;
                    onChange(newArray);
                  }}
                  label=""
                  path={`${path}[${index}]`}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const template = value.length > 0 ? getEmptyTemplate(value[0]) : "";
                onChange([...value, template]);
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white py-4 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[var(--color-primary)] hover:bg-slate-50 hover:text-[var(--color-primary)]"
            >
              <Plus size={18} /> Add New {displayLabel ? `to ${displayLabel}` : "Item"}
            </button>
          </div>
        )}
      </div>
    );
  }

  if (isObject(value)) {
    return (
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {label && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mb-3 flex w-full items-center justify-between font-bold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
          >
            <div className="flex items-center gap-2">
              {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              <span className="uppercase tracking-wide">{displayLabel}</span>
            </div>
          </button>
        )}
        {isExpanded && (
          <div className={`grid gap-x-6 gap-y-2 ${label ? "mt-4 border-l-2 border-slate-200 pl-5" : ""}`}>
            {Object.keys(value).map((key) => (
              <GenericEditor
                key={key}
                value={value[key]}
                onChange={(newValue) => {
                  onChange({ ...value, [key]: newValue });
                }}
                label={key}
                path={path ? `${path}.${key}` : key}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}
