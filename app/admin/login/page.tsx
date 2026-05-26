import { AdminLoginForm } from "@/components/admin-login-form";
import { SectionWrapper } from "@/components/section-wrapper";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <SectionWrapper className="flex min-h-[70vh] items-center">
      <div className="mx-auto w-full max-w-lg rounded-[var(--radius-xl)] border border-slate-200 bg-white/95 p-8 shadow-[0_24px_88px_rgba(8,17,31,0.1)]">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
          Secure Access
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--color-primary)]">
          Admin Login
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Sign in before accessing the site configuration editor and inbound lead
          management tools.
        </p>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </div>
    </SectionWrapper>
  );
}
