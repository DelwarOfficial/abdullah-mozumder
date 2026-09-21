import type { Locale } from "@/content/types";

/**
 * Locale-aware formatting helpers.
 * Dates come from ISO strings via Intl — never hand-maintained translations.
 * Machine-readable contexts (schema, ISO dates, URLs) stay untouched.
 */

const EN_DATE = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const BN_DATE = new Intl.DateTimeFormat("bn-BD", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** "2026-09-12" → "12 September 2026" / "১২ সেপ্টেম্বর ২০২৬" */
export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return locale === "bn" ? BN_DATE.format(date) : EN_DATE.format(date);
}

const EN_DATE_SHORT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const BN_DATE_SHORT = new Intl.DateTimeFormat("bn-BD", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** Compact variant for dense lists: "12 Sep 2026" / "১২ সেপ্টে, ২০২৬" */
export function formatShortDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return locale === "bn" ? BN_DATE_SHORT.format(date) : EN_DATE_SHORT.format(date);
}

/** Convert ASCII digits to Bangla numerals. "2025" → "২০২৫" */
export function toBnDigits(value: string | number): string {
  const bn = "০১২৩৪৫৬৭৮৯";
  return String(value).replace(/[0-9]/g, (d) => bn[Number(d)]);
}

/** Locale-aware numerals: "2025" → "২০২৫" in Bangla, unchanged in English. */
export function localeDigits(value: string | number, locale: Locale): string {
  return locale === "bn" ? toBnDigits(value) : String(value);
}

/** "6" → "6 stories" / "৬টি প্রতিবেদন" */
export function localeCount(n: number, locale: Locale, enNoun: string, bnNoun: string): string {
  return locale === "en"
    ? `${n} ${n === 1 ? enNoun.replace(/s$/, "") : enNoun}`
    : `${toBnDigits(n)}টি ${bnNoun}`;
}
