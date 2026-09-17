import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  withDot?: boolean;
}

export function Eyebrow({ children, className, withDot = true }: EyebrowProps) {
  return (
    <span
      className={cn(
        "editorial-eyebrow inline-flex items-center gap-2",
        className,
      )}
    >
      {withDot && (
        <span
          aria-hidden="true"
          className="inline-block h-1 w-1 bg-newsroom rounded-full"
        />
      )}
      {children}
    </span>
  );
}
