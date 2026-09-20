"use client";

import { useLanguage } from "@/i18n/language-context";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "text" | "block";
}

/**
 * Instant language toggle — EN ⇄ বাংলা.
 * No navigation, no reload: flips the language store in place.
 * Active language strong, inactive muted (never color-only — the label
 * itself changes and aria-pressed exposes state).
 */
export function LanguageSwitcher({ className, variant = "text" }: LanguageSwitcherProps) {
  const { language, toggleLanguage } = useLanguage();

  if (variant === "block") {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        aria-pressed={language === "bn"}
        aria-label={language === "en" ? "Switch to Bangla" : "Switch to English"}
        className={cn(
          "min-h-[44px] min-w-[64px] px-4 py-2 border border-rule text-sm font-semibold transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2",
          className,
        )}
      >
        {language === "en" ? "বাংলা" : "English"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-pressed={language === "bn"}
      aria-label={language === "en" ? "Switch to Bangla" : "Switch to English"}
      title={language === "en" ? "বাংলা" : "English"}
      className={cn(
        "inline-flex items-center h-10 px-2 transition-colors hover:text-newsroom focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
    >
      {language === "en" ? "বাংলা" : "EN"}
    </button>
  );
}
