"use client";

/**
 * Language preference store — the whole i18n runtime.
 *
 * - ONE React app, TWO languages. Language is a user preference, not a URL.
 * - Persisted in localStorage ("site-language"), survives refresh + visits.
 * - useSyncExternalStore hydration contract: server/first render = English
 *   (matches SSG HTML), then the client snapshot flips the tree instantly
 *   — no hydration mismatch, no reload, no navigation, no network calls.
 * - Both languages always ship in the content layer. Zero runtime translation.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Locale } from "@/content/types";

export const LANGUAGE_STORAGE_KEY = "site-language";

type LanguageSubscriber = () => void;

/* ------------------------------------------------------------------ */
/* Module-level external store                                         */
/* ------------------------------------------------------------------ */

let currentLanguage: Locale = "en";
let loaded = false;
const listeners = new Set<LanguageSubscriber>();

function emitChange() {
  for (const fn of listeners) fn();
}

/** Server snapshot — the SSG/SSR default language. */
function getServerLanguage(): Locale {
  return "en";
}

/** Client snapshot — reads the stored preference once, then memory. */
function getClientLanguage(): Locale {
  if (!loaded) {
    loaded = true;
    try {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored === "bn" || stored === "en") currentLanguage = stored;
    } catch {}
  }
  return currentLanguage;
}

export function subscribeLanguage(onChange: LanguageSubscriber): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

/** Also re-notify when another tab changes the preference. */
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === LANGUAGE_STORAGE_KEY && (e.newValue === "en" || e.newValue === "bn")) {
      currentLanguage = e.newValue;
      loaded = true;
      emitChange();
    }
  });
}

export function setLanguage(next: Locale): void {
  currentLanguage = next;
  loaded = true;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
  } catch {}
  document.documentElement.lang = next;
  emitChange();
}

export function toggleLanguage(): void {
  setLanguage(currentLanguage === "en" ? "bn" : "en");
}

/* ------------------------------------------------------------------ */
/* React context                                                       */
/* ------------------------------------------------------------------ */

interface LanguageContextValue {
  language: Locale;
  setLanguage: (next: Locale) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribeLanguage,
    getClientLanguage,
    getServerLanguage,
  );

  const set = useCallback((next: Locale) => setLanguage(next), []);
  const toggle = useCallback(() => toggleLanguage(), []);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage: set, toggleLanguage: toggle }),
    [language, set, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fail loud in development — a switchable text node rendered outside the provider.
    throw new Error("useLanguage must be used inside <LanguageProvider>.");
  }
  return ctx;
}
