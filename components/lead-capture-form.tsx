"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

type LeadCaptureFormProps = {
  title: string;
  description: string;
  trustCallouts: string[];
  industryOptions: string[];
  compact?: boolean;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const initialFormState = {
  name: "",
  corporateEmail: "",
  phone: "",
  companyName: "",
  industrySector: "",
  technicalDetails: "",
};

export function LeadCaptureForm({
  title,
  description,
  trustCallouts,
  industryOptions,
  compact = false,
}: LeadCaptureFormProps) {
  const pathname = usePathname();
  const [formData, setFormData] = useState(initialFormState);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          submissionSourceUrl: pathname ?? "/",
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Unable to submit request.");
      }

      setSubmitState("success");
      setMessage(payload.message ?? "Request submitted successfully.");
      setFormData(initialFormState);
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error ? error.message : "Unable to submit request.",
      );
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-[calc(var(--radius-xl)-0.5rem)] border border-[rgba(0,194,255,0.18)] bg-[var(--gradient-hero)] p-5 text-white shadow-[var(--shadow-panel)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
          Rapid RFQ
        </p>
        <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-3xl">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-900">{description}</p>
        <div className="mt-6 space-y-3">
          {trustCallouts.map((callout) => (
            <div
              key={callout}
              className="rounded-2xl border border-white/10 bg-white/8 p-4 text-sm leading-7 text-slate-900"
            >
              {callout}
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="rounded-[calc(var(--radius-xl)-0.5rem)] border border-slate-200 bg-white/95 p-5 shadow-[0_20px_80px_rgba(8,17,31,0.08)] sm:p-6"
      >
        <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
          <label className="text-sm font-medium text-slate-700">
            Name
            <input
              required
              value={formData.name}
              onChange={(event) =>
                setFormData((current) => ({ ...current, name: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[var(--color-accent)]"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Corporate Email
            <input
              required
              type="email"
              value={formData.corporateEmail}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  corporateEmail: event.target.value,
                }))
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[var(--color-accent)]"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Phone
            <input
              required
              value={formData.phone}
              onChange={(event) =>
                setFormData((current) => ({ ...current, phone: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[var(--color-accent)]"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Company Name
            <input
              required
              value={formData.companyName}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  companyName: event.target.value,
                }))
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[var(--color-accent)]"
            />
          </label>
        </div>
        <label className="mt-4 block text-sm font-medium text-slate-700">
          Industry Sector
          <select
            required
            value={formData.industrySector}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                industrySector: event.target.value,
              }))
            }
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[var(--color-accent)]"
          >
            <option value="">Select an industry</option>
            {industryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-4 block text-sm font-medium text-slate-700">
          Technical Requirements / Problem Statement
          <textarea
            required
            rows={compact ? 4 : 6}
            value={formData.technicalDetails}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                technicalDetails: event.target.value,
              }))
            }
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[var(--color-accent)]"
          />
        </label>
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-secondary)] disabled:opacity-70"
        >
          {submitState === "submitting" ? "Submitting..." : "Request Expert Consultation"}
        </button>
        {message ? (
          <p
            className={`mt-4 text-sm ${
              submitState === "success" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
