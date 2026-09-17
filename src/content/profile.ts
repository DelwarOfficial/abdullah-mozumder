/**
 * Profile — single source of truth for the journalist's professional identity.
 * Future CMS: maps to a `profiles` table.
 */

export interface Profile {
  name: string;
  slug: string;
  headline: string;
  title: string;
  shortBio: string;
  longBio: string;
  location: string;
  email: string;
  portrait: string | null;
  portraitAlt: string;
  languages: string[];
  currentPosition: {
    role: string;
    organization: string;
    period: string;
  };
}

export const profile: Profile = {
  name: "Abdullah Mozomdar",
  slug: "abdullah-mozomdar",
  headline: "Reporting stories that matter.",
  title: "Journalist & Senior Reporter",
  shortBio:
    "Abdullah Mozomdar is a Bangladeshi journalist and Senior Reporter with professional reporting experience across national news organizations.",
  longBio:
    "Abdullah Mozomdar is a Bangladeshi journalist and Senior Reporter with experience across national news organizations. He currently works at Daily Banijjo Pratidin and previously reported for Dhaka Times and Daily Banglar Nabokantha. He is an Executive Member of the Dhaka Union of Journalists and a Permanent Member of the National Press Club. His academic background is in Bangla at Jagannath University, Dhaka.",
  location: "Dhaka, Bangladesh",
  email: "amozomdar@gmail.com",
  portrait: null, // No real photograph available — placeholder rendered in component.
  portraitAlt: "Portrait of Abdullah Mozomdar",
  languages: ["Bangla", "English"],
  currentPosition: {
    role: "Senior Reporter",
    organization: "Daily Banijjo Pratidin",
    period: "2025 — Present",
  },
};
