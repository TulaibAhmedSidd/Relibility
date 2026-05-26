import Link from "next/link";

type CardItem = {
  title: string;
  description: string;
  href?: string;
  meta?: string;
};

export function ServiceCard({ item }: { item: CardItem }) {
  const content = (
    <article className="group h-full rounded-[calc(var(--radius-xl)-0.5rem)] border border-slate-200 bg-white/90 p-6 shadow-[0_18px_64px_rgba(8,17,31,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
        RQS
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
      {item.meta ? (
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.24em] text-[var(--color-secondary)]">
          {item.meta}
        </p>
      ) : null}
    </article>
  );

  if (!item.href) {
    return content;
  }

  return (
    <Link href={item.href} className="block h-full">
      {content}
    </Link>
  );
}

export function IndustryCard({ item }: { item: CardItem }) {
  return (
    <article className="rounded-[calc(var(--radius-xl)-0.5rem)] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,249,252,0.92))] p-6 shadow-[0_18px_64px_rgba(8,17,31,0.06)]">
      <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
    </article>
  );
}
