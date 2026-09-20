import type { Locale } from "@/content/types";

export type ThemeChoice = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "am-theme";

const themelabels: Record<ThemeChoice, { en: string; bn: string }> = {
  light: { en: "Light", bn: "লাইট" },
  dark: { en: "Dark", bn: "ডার্ক" },
  system: { en: "System", bn: "সিস্টেম" },
};

export function themeLabel(choice: ThemeChoice, locale: Locale): string {
  return themelabels[choice][locale];
}

/**
 * Inline script string — runs before first paint to resolve the theme
 * from localStorage (or system preference) with no flash and no
 * hydration mismatch (React never renders theme classes).
 * Also applies the stored language to <html lang> before paint.
 */
export const themeInitScript = `
(function(){
  try {
    var KEY = ${JSON.stringify(THEME_STORAGE_KEY)};
    var stored = localStorage.getItem(KEY);
    var mode = (stored === "light" || stored === "dark" || stored === "system") ? stored : "system";
    var dark = mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    var root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.dataset.theme = mode;
    root.style.colorScheme = dark ? "dark" : "light";
    var lang = localStorage.getItem("site-language");
    root.lang = lang === "bn" ? "bn" : "en";
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0E0E0D" : "#F7F6F2");
  } catch (e) {}
})();
`;

/** Change the theme, persist it, and update the live document. */
export function applyTheme(mode: ThemeChoice): void {
  const root = document.documentElement;
  const dark =
    mode === "dark" ||
    (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", dark);
  root.dataset.theme = mode;
  root.style.colorScheme = dark ? "dark" : "light";
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {}
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? "#0E0E0D" : "#F7F6F2");
  notifyThemeSubscribers();
}

/* --- Tiny external store so components can read the theme choice
       via useSyncExternalStore without hydration mismatches --- */
type ThemeSubscriber = () => void;
const subscribers = new Set<ThemeSubscriber>();

function notifyThemeSubscribers(): void {
  for (const fn of subscribers) fn();
}

/** Subscribe to theme/system-preference changes (for useSyncExternalStore). */
export function subscribeTheme(onChange: ThemeSubscriber): () => void {
  subscribers.add(onChange);
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => onChange();
  mql.addEventListener("change", onSystemChange);
  return () => {
    subscribers.delete(onChange);
    mql.removeEventListener("change", onSystemChange);
  };
}

/** Read the current choice (client only). */
export function getStoredTheme(): ThemeChoice {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {}
  return "system";
}
