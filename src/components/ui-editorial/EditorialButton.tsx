import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EditorialButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "lg";
  withArrow?: boolean;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
}

const variantClasses: Record<NonNullable<EditorialButtonProps["variant"]>, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink-soft border border-ink",
  outline:
    "bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper",
  ghost:
    "bg-transparent text-ink border border-transparent hover:border-ink",
};

const sizeClasses: Record<NonNullable<EditorialButtonProps["size"]>, string> = {
  default: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function EditorialButton({
  children,
  href,
  variant = "primary",
  size = "default",
  withArrow = false,
  className,
  ariaLabel,
  external = false,
}: EditorialButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (!href) {
    return (
      <button className={classes} aria-label={ariaLabel}>
        {inner}
      </button>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cn("group", classes)} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}
