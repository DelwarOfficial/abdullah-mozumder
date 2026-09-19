/**
 * Shared content types — locale-keyed fields for bilingual support.
 * All display text uses { en, bn } so English and Bangla never diverge
 * on structural data (dates, slugs, IDs remain shared).
 */

export type Locale = "en" | "bn";
export type Localized<T> = { en: T; bn: T };

/** Helper to create localized fields concisely */
export function L<T>(en: T, bn: T): Localized<T> {
  return { en, bn };
}

export interface StoryBlock {
  type: "paragraph" | "heading" | "quote" | "list" | "image";
  text?: Localized<string>;
  level?: 2 | 3;
  items?: Localized<string>[];
  ordered?: boolean;
  src?: string;
  alt?: Localized<string>;
  caption?: Localized<string>;
  attribution?: Localized<string>;
}

export interface Story {
  id: string;
  slug: string;
  publishedAt: string;
  publishedLabel: Localized<string>;
  readingTime: Localized<string> | null;
  category: Localized<string>;
  title: Localized<string>;
  deck: Localized<string>;
  summary: Localized<string>;
  publication: Localized<string>;
  body: Localized<StoryBlock[]>;
  tags: string[];
  heroImage: string | null;
  heroAlt: Localized<string>;
  caption: Localized<string> | null;
  articleUrl: string | null;
  videoUrl: string | null;
  location: Localized<string> | null;
  featured: boolean;
  isDemo: boolean;
  /**
   * Editorial review flag for the Bangla copy — NEVER rendered publicly.
   * "needs-review" = Bangla text awaiting a human editor's pass.
   */
  translationStatus?: "reviewed" | "needs-review";
}

export interface Experience {
  id: string;
  organization: Localized<string>;
  role: Localized<string>;
  startDate: string;
  endDate: string | null;
  periodLabel: Localized<string>;
  location: Localized<string>;
  description: Localized<string> | null;
  current: boolean;
}

export interface Education {
  id: string;
  degree: Localized<string>;
  institution: Localized<string>;
  year: string;
  field: Localized<string>;
}

export interface Membership {
  id: string;
  organization: Localized<string>;
  shortName?: string;
  role: Localized<string>;
}

export interface ReportingArea {
  id: string;
  label: Localized<string>;
  isPlaceholder: boolean;
}

export interface GalleryItem {
  id: string;
  src: string | null;
  thumbnail: string | null;
  title: Localized<string>;
  caption: Localized<string>;
  location: Localized<string> | null;
  date: string | null;
  credit: Localized<string> | null;
  alt: Localized<string>;
  isPlaceholder: boolean;
}

export interface Profile {
  name: Localized<string>;
  slug: string;
  headline: Localized<string>;
  title: Localized<string>;
  shortBio: Localized<string>;
  longBio: Localized<string>;
  location: Localized<string>;
  email: string;
  portrait: string | null;
  portraitAlt: Localized<string>;
  languages: Localized<string[]>;
  currentPosition: {
    role: Localized<string>;
    organization: Localized<string>;
    period: Localized<string>;
  };
}

export interface NavItem {
  label: Localized<string>;
  href: string;
}
