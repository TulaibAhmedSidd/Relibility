"use client";

import { motion } from "framer-motion";

type AnimatedHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function AnimatedHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: AnimatedHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.04em] text-[var(--color-primary)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
        {description}
      </p>
    </motion.div>
  );
}
