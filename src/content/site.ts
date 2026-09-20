/**
 * Site identity — structural / non-localized configuration only.
 * All localized UI strings live in `src/i18n/ui.ts`;
 * editorial content lives in the other `src/content/*` modules.
 */
export const siteConfig = {
  email: "amozomdar@gmail.com",
  url: "https://abdullahmozomdar.com",
  wordmark: "AM/",
  portrait: "/image/profile.jpg",
} as const;

export type SiteConfig = typeof siteConfig;
