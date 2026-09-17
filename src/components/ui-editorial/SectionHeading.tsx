import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
  withRule?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
  withRule = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        withRule && "border-t border-rule pt-8",
        className,
      )}
    >
      {eyebrow && (
        <span className="editorial-eyebrow">{eyebrow}</span>
      )}
      <Tag
        className={cn(
          "font-serif font-semibold text-ink",
          Tag === "h1"
            ? "text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]"
            : Tag === "h2"
              ? "text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.015em]"
              : "text-[clamp(1.375rem,2.5vw,1.75rem)] leading-[1.2] tracking-[-0.01em]",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "text-base sm:text-lg text-ink-muted leading-relaxed",
            align === "center" ? "max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
