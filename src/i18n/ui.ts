import { L } from "@/content/types";
import type { Localized } from "@/content/types";

/**
 * UI dictionary — navigation, buttons, labels, footer chrome.
 * Editorial content (bio, stories, experience, education, membership,
 * gallery captions) lives in `src/content/*` — never here.
 *
 * Bangla is written as native newsroom Bengali, not translated word-by-word.
 */

export const siteName: Localized<string> = L("Abdullah Mozomdar", "আবদুল্লাহ মোজুমদার");

export const siteTitle: Localized<string> = L("Journalist & Senior Reporter", "সাংবাদিক ও সিনিয়র রিপোর্টার");

export const siteDescription: Localized<string> = L(
  "Portfolio of Bangladeshi journalist Abdullah Mozomdar, Senior Reporter at Daily Banijjo Pratidin, featuring professional experience, selected reporting and contact information.",
  "বাংলাদেশি সাংবাদিক আবদুল্লাহ মোজুমদারের পোর্টফোলিও — দৈনিক বাণিজ্য প্রতিদিন-এর সিনিয়র রিপোর্টার। পেশাগত অভিজ্ঞতা, নির্বাচিত প্রতিবেদন ও যোগাযোগের তথ্য।",
);

/** Server-rendered metadata stays in English (single-URL model). */
export const serverTitle = "Abdullah Mozomdar — Journalist & Senior Reporter";
export const serverDescription = siteDescription.en;

export const navItems = [
  { label: L("About", "পরিচিতি"), href: "/about" },
  { label: L("Experience", "অভিজ্ঞতা"), href: "/experience" },
  { label: L("Reports", "প্রতিবেদন"), href: "/work" },
  { label: L("Articles", "লেখা"), href: "/articles" },
  { label: L("Gallery", "গ্যালারি"), href: "/gallery" },
] as const;

export const navContact = { label: L("Contact", "যোগাযোগ"), href: "/contact" } as const;

/** Section labels shared across header / footer / mobile navigation / pages */
export const sectionLabels = {
  home: L("Home", "হোম"),
  work: L("Reports", "প্রতিবেদন"),
  articles: L("Articles", "লেখা"),
  gallery: L("Gallery", "গ্যালারি"),
  menu: L("Menu", "মেনু"),
  navigate: L("Navigate", "মেনু"),
  memberships: L("Memberships", "সদস্যপদ"),
  basedIn: L("Based in", "অবস্থান"),
  location: L("Based", "অবস্থান"),
  language: L("Language", "ভাষা"),
  theme: L("Theme", "থিম"),
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
  openMenu: L("Open menu", "মেনু খুলুন"),
  closeMenu: L("Close menu", "মেনু বন্ধ করুন"),
  primaryNav: L("Primary", "প্রধান মেনু"),
} as const;

