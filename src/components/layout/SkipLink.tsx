"use client";

import { useLanguage } from "@/i18n/language-context";

export function SkipLink() {
  const { language } = useLanguage();
  const label = language === "bn" ? "মূল অংশে যান" : "Skip to content";
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-ink focus:text-paper focus:text-sm focus:font-medium focus:shadow-lg"
    >
      {label}
    </a>
  );
}
