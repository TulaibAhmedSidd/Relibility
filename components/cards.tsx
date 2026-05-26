"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type CardItem = {
  title: string;
  description: string;
  href?: string;
  meta?: string;
  image?: {
    src: string;
    alt: string;
  };
};

export function ServiceCard({ item }: { item: CardItem }) {
  const content = (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group h-full overflow-hidden rounded-[calc(var(--radius-xl)-0.5rem)] border border-slate-200 bg-white/90 shadow-[0_18px_64px_rgba(8,17,31,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]"
    >
      {item.image ? (
        <div className="relative h-44 w-full overflow-hidden sm:h-48">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(8,17,31,0.08))]" />
        </div>
      ) : null}
      <div className="p-6">
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
      </div>
    </motion.article>
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
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="overflow-hidden rounded-[calc(var(--radius-xl)-0.5rem)] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,249,252,0.92))] shadow-[0_18px_64px_rgba(8,17,31,0.06)]"
    >
      {item.image ? (
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : null}
      <div className="p-6">
      <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
      </div>
    </motion.article>
  );
}
