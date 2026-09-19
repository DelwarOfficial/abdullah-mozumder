import type { Localized, NavItem } from "./types";
import { L } from "./types";

export const siteConfig = {
  // Structural / non-localized
  email: "amozomdar@gmail.com",
  url: "https://abdullahmozomdar.com",
  defaultLocale: "en" as const,
  locales: ["en", "bn"] as const,
  wordmark: "AM/",
  portrait: "/image/profile.jpg",
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
  { label: L("Work", "প্রতিবেদন"), href: "/work" },
  { label: L("Articles", "লেখা"), href: "/articles" },
  { label: L("Gallery", "গ্যালারি"), href: "/gallery" },
];

/** Section labels shared across header / footer / mobile navigation */
export const sectionLabels = {
  home: L("Home", "হোম"),
  work: L("Reporting", "প্রতিবেদন"),
  articles: L("Articles", "লেখা"),
  gallery: L("Gallery", "গ্যালারি"),
  menu: L("Menu", "মেনু"),
  navigate: L("Navigate", "মেনু"),
  memberships: L("Memberships", "সদস্যপদ"),
  basedIn: L("Based in", "অবস্থান"),
  location: L("Based", "অবস্থান"),
  language: L("Language", "ভাষা"),
  journalist: L("Journalist", "সাংবাদিক"),
  current: L("Current", "বর্তমান"),
  currently: L("Currently", "বর্তমানে"),
  education: L("Education", "শিক্ষা"),
  skills: L("Digital Skills", "ডিজিটাল দক্ষতা"),
  languages: L("Languages", "ভাষা"),
  reportingAreas: L("Reporting Areas", "প্রতিবেদনের ক্ষেত্র"),
  recentExp: L("Recent Experience", "সাম্প্রতিক অভিজ্ঞতা"),
  contact: L("Contact", "যোগাযোগ"),
  email: L("Email", "ইমেইল"),
  allRights: L("All rights reserved.", "সর্বস্বত্ব সংরক্ষিত।"),
};

export const navContact: NavItem = {
  label: L("Contact", "যোগাযোগ"),
  href: "/contact",
};

export const languageLabels = {
  en: "EN",
  bn: "বাংলা",
};

export type SiteConfig = typeof siteConfig;
