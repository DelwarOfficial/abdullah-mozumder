"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import {
  applyTheme,
  getStoredTheme,
  subscribeTheme,
  themeLabel,
  type ThemeChoice,
} from "@/lib/theme";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/language-context";

interface ThemeToggleProps {
  /** "icons" shows the three-state selector, "cycle" is a single compact button */
  variant?: "icons" | "cycle";
  className?: string;
}

const ORDER: ThemeChoice[] = ["light", "dark", "system"];

const icons: Record<ThemeChoice, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const getServerTheme = (): ThemeChoice => "system";

export function ThemeToggle({ variant = "cycle", className }: ThemeToggleProps) {
  const { language } = useLanguage();
  // External store: no effect-time setState, no hydration mismatch
  const choice = useSyncExternalStore(subscribeTheme, getStoredTheme, getServerTheme);

  const select = useCallback((next: ThemeChoice) => {
    applyTheme(next);
  }, []);

  const cycle = useCallback(() => {
    select(ORDER[(ORDER.indexOf(choice) + 1) % ORDER.length]);
  }, [choice, select]);

  const CurrentIcon = icons[choice];

  if (variant === "icons") {
    return (
      <div
        role="radiogroup"
        aria-label={language === "en" ? "Colour theme" : "থিম"}
        className={cn("inline-flex items-center border border-rule", className)}
      >
        {ORDER.map((mode) => {
          const Icon = icons[mode];
          const selected = choice === mode;
          return (
            <button
              key={mode}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={themeLabel(mode, language)}
              onClick={() => select(mode)}
              className={cn(
                "inline-flex items-center justify-center w-10 h-10 transition-colors",
                selected
                  ? "bg-ink text-paper"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={
        language === "en"
          ? `Theme: ${themeLabel(choice, "en")}. Switch theme.`
          : `থিম: ${themeLabel(choice, "bn")}. থিম বদলান।`
      }
      title={themeLabel(choice, language)}
      className={cn(
        "inline-flex items-center justify-center w-10 h-10 transition-colors hover:text-newsroom focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
    >
      <CurrentIcon className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
    </button>
  );
}

