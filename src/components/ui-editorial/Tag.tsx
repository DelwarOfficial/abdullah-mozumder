import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "accent" | "outline";
}

export function Tag({ children, className, variant = "default" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center uppercase tracking-[0.14em] text-[0.6875rem] font-semibold",
        variant === "default" && "text-ink-muted",
        variant === "accent" && "text-newsroom",
        variant === "outline" &&
          "border border-rule text-ink-soft px-2 py-0.5",
        className,
      )}
    >
      {children}
    </span>
  );
}
