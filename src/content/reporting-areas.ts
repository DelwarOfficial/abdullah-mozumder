import type { ReportingArea } from "./types";
import { L } from "./types";

/**
 * IMPORTANT: The CV does NOT establish specific reporting beats.
 * These are clearly labeled DEMO placeholders. Replace with verified beats
 * once confirmed by the journalist. Never present unverified beats as confirmed.
 */
export const reportingAreas: ReportingArea[] = [
  { id: "ra-1", label: L("National Affairs", "জাতীয় বিষয়"), isPlaceholder: true },
  { id: "ra-2", label: L("Business", "বাণিজ্য"), isPlaceholder: true },
  { id: "ra-3", label: L("City Reporting", "নগর প্রতিবেদন"), isPlaceholder: true },
  { id: "ra-4", label: L("Public Interest", "জনস্বার্থ"), isPlaceholder: true },
  { id: "ra-5", label: L("Interviews", "সাক্ষাৎকার"), isPlaceholder: true },
  { id: "ra-6", label: L("Features", "ফিচার"), isPlaceholder: true },
  { id: "ra-7", label: L("Field Reporting", "মাঠপর্যায়ের প্রতিবেদন"), isPlaceholder: true },
];

export const digitalSkills: { en: string; bn: string }[] = [
  { en: "MS Office", bn: "এমএস অফিস" },
  { en: "Internet browsing / research", bn: "ইন্টারনেট ব্রাউজিং / গবেষণা" },
  { en: "Email", bn: "ইমেইল" },
];
