import type { Locale } from "@/content/types";

export function SkipLink({ locale }: { locale?: Locale }) {
  const label = locale === "bn" ? "মূল অংশে যান" : "Skip to content";
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-ink focus:text-paper focus:text-sm focus:font-medium focus:shadow-lg"
    >
      {label}
    </a>
  );
}
