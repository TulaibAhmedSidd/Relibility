"use client";

import { motion, useReducedMotion } from "framer-motion";

const traces = [
  { width: "32%", top: "18%", left: "6%", delay: 0 },
  { width: "26%", top: "31%", left: "44%", delay: 0.8 },
  { width: "36%", top: "54%", left: "18%", delay: 1.6 },
  { width: "22%", top: "70%", left: "60%", delay: 0.4 },
];

export function LiveHomeBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0.32, scale: 0.95 }}
        animate={
          reduceMotion
            ? { opacity: 0.32 }
            : { opacity: [0.24, 0.38, 0.28], scale: [0.98, 1.04, 1] }
        }
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: reduceMotion ? 0 : Infinity,
        }}
        className="absolute -left-16 top-0 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.24),transparent_68%)] blur-3xl sm:h-[28rem] sm:w-[28rem]"
      />
      <motion.div
        initial={{ opacity: 0.28, scale: 1 }}
        animate={
          reduceMotion
            ? { opacity: 0.28 }
            : { opacity: [0.18, 0.34, 0.2], scale: [1, 1.08, 1] }
        }
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: reduceMotion ? 0 : Infinity,
          delay: 0.6,
        }}
        className="absolute right-[-6rem] top-[10rem] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(18,57,91,0.24),transparent_72%)] blur-3xl sm:h-[24rem] sm:w-[24rem]"
      />
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(11,31,51,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,51,0.05)_1px,transparent_1px)] [background-size:22px_22px] sm:[background-size:34px_34px]" />
      {traces.map((trace) => (
        <motion.div
          key={`${trace.top}-${trace.left}`}
          initial={{ opacity: 0, scaleX: 0.25 }}
          animate={
            reduceMotion
              ? { opacity: 0.45, scaleX: 1 }
              : { opacity: [0.16, 0.7, 0.16], scaleX: [0.45, 1, 0.6] }
          }
          transition={{
            duration: 4.5,
            ease: "easeInOut",
            repeat: reduceMotion ? 0 : Infinity,
            delay: trace.delay,
          }}
          style={{
            width: trace.width,
            top: trace.top,
            left: trace.left,
          }}
          className="absolute h-px origin-left bg-[linear-gradient(90deg,transparent,rgba(0,194,255,0.95),transparent)]"
        />
      ))}
      <motion.div
        initial={{ y: 0 }}
        animate={reduceMotion ? { y: 0 } : { y: [0, -16, 0] }}
        transition={{ duration: 6, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
        className="absolute bottom-[12%] left-[8%] h-24 w-24 rounded-[2rem] border border-white/60 bg-white/55 shadow-[0_18px_64px_rgba(8,17,31,0.1)] backdrop-blur sm:h-32 sm:w-32"
      />
      <motion.div
        initial={{ y: 0 }}
        animate={reduceMotion ? { y: 0 } : { y: [0, 14, 0] }}
        transition={{
          duration: 7.5,
          repeat: reduceMotion ? 0 : Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
        className="absolute right-[12%] top-[22%] h-20 w-20 rounded-full border border-[rgba(0,194,255,0.25)] bg-white/45 backdrop-blur sm:h-24 sm:w-24"
      />
    </div>
  );
}
