import type { Experience } from "./types";
import { L } from "./types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    organization: L("Daily Banijjo Pratidin", "দৈনিক বাণিজ্য প্রতিদিন"),
    role: L("Senior Reporter", "সিনিয়র রিপোর্টার"),
    startDate: "2025",
    endDate: null,
    periodLabel: L("2025 — Present", "২০২৫ — বর্তমান"),
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    description: null,
    current: true,
  },
  {
    id: "exp-2",
    organization: L("Dhaka Times", "ঢাকা টাইমস"),
    role: L("Reporter", "রিপোর্টার"),
    startDate: "2024",
    endDate: "2025",
    periodLabel: L("2024 — 2025", "২০২৪ — ২০২৫"),
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    description: null,
    current: false,
  },
  {
    id: "exp-3",
    organization: L("Daily Banglar Nabokantha", "দৈনিক বাংলার নবোকণ্ঠ"),
    role: L("Reporter", "রিপোর্টার"),
    startDate: "2019",
    endDate: "2024",
    periodLabel: L("2019 — 2024", "২০১৯ — ২০২৪"),
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    description: null,
    current: false,
  },
];

export const currentExperience = experiences.find((e) => e.current) ?? null;
