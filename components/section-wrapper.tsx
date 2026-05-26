import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  dense?: boolean;
};

export function SectionWrapper({
  children,
  className,
  dense = false,
}: SectionWrapperProps) {
  return (
    <section
      className={cn(
        "relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10",
        dense ? "py-12 sm:py-16" : "py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      {children}
    </section>
  );
}
