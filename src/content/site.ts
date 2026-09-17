/**
 * Site-wide configuration
 * Editable content layer — CMS-ready. Migrate to a database later without touching components.
 */

export const siteConfig = {
  name: "Abdullah Mozomdar",
  shortName: "AM",
  wordmark: "AM.",
  title: "Journalist & Senior Reporter",
  location: "Dhaka, Bangladesh",
  email: "amozomdar@gmail.com",
  url: "https://abdullahmozomdar.com",
  description:
    "Portfolio of Bangladeshi journalist Abdullah Mozomdar, Senior Reporter at Daily Banijjo Pratidin, featuring professional experience, selected reporting and contact information.",
  locale: "en",
  languages: [
    { code: "en", label: "English" },
    { code: "bn", label: "বাংলা" },
  ],
  social: [] as Array<{
    label: string;
    href: string;
    verified: boolean;
  }>,
  // Future CMS: nav items can come from site_settings table.
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Work", href: "/work" },
    { label: "Articles", href: "/articles" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
