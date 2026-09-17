import type { Localized, NavItem } from "./types";
import { L } from "./types";

export const siteConfig = {
  // Structural / non-localized
  email: "amozomdar@gmail.com",
  url: "https://abdullahmozomdar.com",
  defaultLocale: "en" as const,
  locales: ["en", "bn"] as const,
  portrait: null, // Real portrait path — null renders editorial placeholder
} as const;

export const siteName: Localized<string> = L("Abdullah Mozomdar", "আবদুল্লাহ মোজোমদার");

/**
 * NOTE: The English CV spells the name "Abdullah Mozomdar".
 * The Bangla transliteration "আবদুল্লাহ মোজোমদার" is an editable placeholder
 * until a verified Bangla spelling is provided by the owner.
 * Do NOT treat the Bangla spelling as authoritative until verified.
 */
export const nameEditabilityNote: Localized<string> = L(
  "Bangla name spelling is editable — awaiting verification.",
  "বাংলা নামের বানান সম্পাদনযোগ্য — যাচাইয়ের অপেক্ষায়।",
);

export const navItems: NavItem[] = [
  { label: L("About", "পরিচিতি"), href: "/about" },
  { label: L("Experience", "অভিজ্ঞতা"), href: "/experience" },
  { label: L("Work", "কাজ"), href: "/work" },
  { label: L("Articles", "প্রতিবেদন"), href: "/articles" },
  { label: L("Gallery", "গ্যালারি"), href: "/gallery" },
];

export const navContact: NavItem = {
  label: L("Contact", "যোগাযোগ"),
  href: "/contact",
};

export const languageLabels = {
  en: "EN",
  bn: "বাংলা",
};

export type SiteConfig = typeof siteConfig;
