"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type TestimonialSliderProps = {
  items: Array<{
    quote: string;
    name: string;
    role: string;
  }>;
};

export function TestimonialSlider({ items }: TestimonialSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [items.length]);

  return (
    <div className="rounded-[calc(var(--radius-xl)-0.5rem)] border border-slate-200 bg-[var(--color-primary)] p-8 text-white shadow-[0_24px_88px_rgba(8,17,31,0.22)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={items[activeIndex].name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <p className="text-xl leading-9 tracking-[-0.02em] text-slate-300">
            “{items[activeIndex].quote}”
          </p>
          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              {items[activeIndex].name}
            </p>
            <p className="mt-2 text-sm text-slate-300">{items[activeIndex].role}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-8 flex gap-2">
        {items.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex ? "w-10 bg-[var(--color-accent)]" : "w-2.5 bg-white/30"
            }`}
            aria-label={item.name}
          />
        ))}
      </div>
    </div>
  );
}
