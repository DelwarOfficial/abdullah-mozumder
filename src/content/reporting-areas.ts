/**
 * Reporting areas / beats.
 *
 * IMPORTANT: The CV does NOT establish specific reporting beats.
 * These are clearly labeled DEMO placeholders. Replace with verified beats
 * once confirmed by the journalist.
 *
 * Future CMS: maps to a `reporting_areas` table.
 */

export interface ReportingArea {
  id: string;
  label: string;
  description: string;
  isPlaceholder: boolean;
}

export const reportingAreas: ReportingArea[] = [
  { id: "ra-1", label: "National Affairs", description: "Demo area — replace with verified beat.", isPlaceholder: true },
  { id: "ra-2", label: "Business", description: "Demo area — replace with verified beat.", isPlaceholder: true },
  { id: "ra-3", label: "City Reporting", description: "Demo area — replace with verified beat.", isPlaceholder: true },
  { id: "ra-4", label: "Public Interest", description: "Demo area — replace with verified beat.", isPlaceholder: true },
  { id: "ra-5", label: "Interviews", description: "Demo area — replace with verified beat.", isPlaceholder: true },
  { id: "ra-6", label: "Features", description: "Demo area — replace with verified beat.", isPlaceholder: true },
  { id: "ra-7", label: "Field Reporting", description: "Demo area — replace with verified beat.", isPlaceholder: true },
];

export const digitalSkills: string[] = [
  "MS Office",
  "Internet browsing / research",
  "Email",
];
