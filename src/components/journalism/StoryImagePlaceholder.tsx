import Image from "next/image";
import { cn } from "@/lib/utils";

interface StoryImagePlaceholderProps {
  src?: string | null;
  alt: string;
  ratio?: "3/2" | "4/3" | "16/9" | "1/1";
  className?: string;
  priority?: boolean;
  /** Responsive sizes hint for next/image */
  sizes?: string;
}

const ratioClasses = {
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-square",
};

/**
 * Image with a tasteful editorial placeholder for missing hero images.
 * Uses next/image when src is provided (auto AVIF/WebP, responsive srcset).
 * Otherwise renders a paper-tone placeholder with category glyph.
 */
export function StoryImagePlaceholder({
  src,
  alt,
  ratio = "3/2",
  className,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: StoryImagePlaceholderProps) {
  const aspectClass = ratioClasses[ratio];

  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-paper-deep border border-rule", aspectClass, className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${alt} — image to be supplied`}
      className={cn(
        "relative overflow-hidden bg-paper-deep border border-rule flex items-center justify-center",
        aspectClass,
        className,
      )}
    >
      {/* Editorial paper texture — subtle ruled lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent 0 14px, var(--rule-soft) 14px 15px)",
        }}
      />
      <span className="relative font-serif text-xs text-ink-muted">
        Image pending
      </span>
    </div>
  );
}
