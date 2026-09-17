/**
 * Professional experience timeline.
 * Sourced from CV — do not invent entries.
 * Future CMS: maps to an `experiences` table.
 */

export interface Experience {
  id: string;
  organization: string;
  role: string;
  startDate: string; // ISO-ish, e.g. "2025-01"
  endDate: string | null; // null = current
  periodLabel: string;
  location: string;
  description: string | null;
  responsibilities: string[] | null;
  current: boolean;
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    organization: "Daily Banijjo Pratidin",
    role: "Senior Reporter",
    startDate: "2025",
    endDate: null,
    periodLabel: "2025 — Present",
    location: "Dhaka, Bangladesh",
    description: null, // Not supplied in CV — leave empty until verified.
    responsibilities: null,
    current: true,
  },
  {
    id: "exp-2",
    organization: "Dhaka Times",
    role: "Reporter",
    startDate: "2024",
    endDate: "2025",
    periodLabel: "2024 — 2025",
    location: "Dhaka, Bangladesh",
    description: null,
    responsibilities: null,
    current: false,
  },
  {
    id: "exp-3",
    organization: "Daily Banglar Nabokantha",
    role: "Reporter",
    startDate: "2019",
    endDate: "2024",
    periodLabel: "2019 — 2024",
    location: "Dhaka, Bangladesh",
    description: null,
    responsibilities: null,
    current: false,
  },
];

export const currentExperience = experiences.find((e) => e.current) ?? null;
