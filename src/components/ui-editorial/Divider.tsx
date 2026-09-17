import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  variant?: "thin" | "thick";
  label?: string;
}

export function Divider({ className, variant = "thin", label }: DividerProps) {
  if (label) {
    return (
      <div
        className={cn(
          "flex items-center gap-4 my-8",
          className,
        )}
        role="separator"
      >
        <span className="editorial-eyebrow whitespace-nowrap">{label}</span>
        <span
          className={cn(
            "flex-1",
            variant === "thick" ? "h-[2px] bg-ink" : "h-px bg-rule",
          )}
        />
      </div>
    );
  }
  return (
    <hr
      className={cn(
        "border-0 my-8",
        variant === "thick" ? "h-[2px] bg-ink" : "h-px bg-rule",
        className,
      )}
    />
  );
}
