"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

type MetricCounterProps = {
  label: string;
  value: number;
  suffix?: string;
};

export function MetricCounter({ label, value, suffix = "" }: MetricCounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(() => Math.round(motionValue.get()));
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 1.6,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [inView, motionValue, value]);

  return (
    <div
      ref={ref}
      className="rounded-[calc(var(--radius-xl)-0.5rem)] border border-white/10 bg-[rgba(8,17,31,0.68)] p-6 shadow-[0_20px_80px_rgba(8,17,31,0.24)] backdrop-blur"
    >
      <div className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-300">
        {label}
      </p>
    </div>
  );
}
