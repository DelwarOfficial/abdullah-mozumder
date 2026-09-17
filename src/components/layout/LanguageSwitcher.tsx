"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { switchLocalePath } from "@/i18n/config";
import { languageLabels } from "@/content/site";
import type { Locale } from "@/content/types";

interface LanguageSwitcherProps {
  locale: Locale;
  other: Locale;
  otherLabel: string;
  isHome: boolean;
}

export function LanguageSwitcher({ locale, other, otherLabel, isHome }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const otherPath = switchLocalePath(pathname, other);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors",
        isHome ? "text-paper/80" : "text-ink-muted",
      )}
      aria-label="Language selector"
    >
      <span className={cn(locale === "en" && (isHome ? "text-paper" : "text-ink"))}>EN</span>
      <span aria-hidden="true" className={isHome ? "text-paper/40" : "text-rule"}>|</span>
      <Link
        href={otherPath}
        className={cn(
          "transition-colors hover:underline underline-offset-2",
          locale === "bn" && (isHome ? "text-paper" : "text-ink"),
        )}
        aria-label={`Switch to ${otherLabel}`}
      >
        {languageLabels.bn}
      </Link>
    </div>
  );
}
