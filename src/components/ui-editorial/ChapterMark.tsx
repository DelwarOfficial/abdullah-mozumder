import { cn } from "@/lib/utils";
import type { Locale } from "@/content/types";

interface ChapterMarkProps {
  number: string; // "01", "02", etc.
  label: string;
  locale: Locale;
  variant?: "default" | "dark" | "accent";
  className?: string;
}

export function ChapterMark({ number, label, locale, variant = "default", className }: ChapterMarkProps) {
  const colorClass =
    variant === "dark"
      ? "text-paper/50"
      : variant === "accent"
        ? "text-newsroom"
        : "text-ink-muted";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "font-sans font-bold tabular-nums tracking-tight",
          variant === "dark" ? "text-paper" : variant === "accent" ? "text-newsroom" : "text-ink",
        )}
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
      >
        {number}
      </span>
      <span
        className={cn(
          "h-px",
          variant === "dark" ? "bg-paper/20" : "bg-rule",
        )}
        style={{ width: "clamp(20px, 3vw, 48px)" }}
        aria-hidden="true"
      />
      <span className={cn("editorial-eyebrow", colorClass)}>
        {label}
      </span>
    </div>
  );
}
