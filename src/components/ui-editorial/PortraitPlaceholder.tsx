import Image from "next/image";
import { cn } from "@/lib/utils";

interface PortraitPlaceholderProps {
  size?: "sm" | "md" | "lg";
  label: string;
  alt: string;
  src?: string | null;
  className?: string;
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-28 h-28 sm:w-32 sm:h-32",
  lg: "w-44 h-56 sm:w-52 sm:h-64 lg:w-56 lg:h-72",
};

const pixelSizes = {
  sm: 64,
  md: 128,
  lg: 224,
};

/**
 * Editorial portrait. Renders the photo when `src` is set, otherwise a
 * tasteful "no portrait supplied" panel.
 */
export function PortraitPlaceholder({
  size = "lg",
  label,
  alt,
  src,
  className,
}: PortraitPlaceholderProps) {
  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden border border-rule shadow-sm",
          sizeClasses[size],
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${pixelSizes[size]}px`}
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${alt} — portrait not yet supplied`}
      className={cn(
        "relative flex flex-col items-center justify-center bg-paper-deep border border-rule text-center",
        sizeClasses[size],
        className,
      )}
    >
      <div
        className="absolute inset-3 border border-rule-soft pointer-events-none"
        aria-hidden="true"
      />
      <span className="font-serif text-3xl sm:text-4xl font-semibold text-ink-muted/70 leading-none">
        {label.split(" ").map((n) => n[0]).join("")}
      </span>
      <span className="mt-2 text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted/70 max-w-[80%]">
        Portrait pending
      </span>
    </div>
  );
}
