import type { Locale } from "@/content/types";
import { siteConfig } from "@/content/site";

export const locales = siteConfig.locales as readonly Locale[];
export const defaultLocale: Locale = siteConfig.defaultLocale;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Build a locale-prefixed href.
 * `/about` + "en" → `/en/about`
 * `/` + "bn" → `/bn`
 */
export function localeHref(href: string, locale: Locale): string {
  const clean = href.startsWith("/") ? href : `/${href}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

/**
 * Given a pathname like `/en/work/sample-story` and a target locale,
 * return the equivalent path in the target locale.
 * `/en/work/sample-story` + "bn" → `/bn/work/sample-story`
 */
export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${targetLocale}`;
  if (isLocale(segments[0])) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }
  return "/" + segments.join("/");
}

/**
 * Extract locale from a pathname. Returns null if no valid locale prefix.
 */
export function getLocaleFromPath(pathname: string): Locale | null {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;
  if (isLocale(segments[0])) return segments[0];
  return null;
}

/**
 * Strip the locale prefix from a pathname.
 * `/en/work/sample-story` → `/work/sample-story`
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "/";
  if (isLocale(segments[0])) {
    segments.shift();
  }
  return segments.length === 0 ? "/" : "/" + segments.join("/");
}

export const otherLocale: Record<Locale, Locale> = {
  en: "bn",
  bn: "en",
};
