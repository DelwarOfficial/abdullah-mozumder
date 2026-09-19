import { cn } from "@/lib/utils";
import type { ReactNode, ElementType } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: "default" | "wide" | "narrow" | "reading";
}

const sizeClasses: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-6xl",   // 1152px
  wide: "max-w-7xl",      // 1280px
  narrow: "max-w-4xl",    // 896px
  reading: "max-w-3xl",   // 768px — close to 700px reading width
};

export function Container({ children, className, as: Tag = "div", size = "default" }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto px-5 sm:px-6 lg:px-8 w-full",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
