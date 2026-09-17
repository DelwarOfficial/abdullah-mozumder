"use client";

import { useEffect } from "react";
import type { Locale } from "@/content/types";

/**
 * Sets <html lang> client-side after hydration.
 * The root layout renders <html lang="en"> by default; this component
 * overrides it to the correct locale once the page mounts.
 * For SEO, hreflang tags in metadata + sitemap provide the authoritative
 * locale signals to search engines.
 */
export function LocaleSetter({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
