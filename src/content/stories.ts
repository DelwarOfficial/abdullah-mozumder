/**
 * Stories / journalism portfolio.
 *
 * CONTENT POLICY (per project brief):
 * The CV does not supply actual published articles. Therefore these entries
 * are clearly labeled as DEMO CONTENT. Replace with verified published work
 * before launch. Never present a demo item as a real published story.
 *
 * Future CMS: maps to a `stories` table with category / tag relations.
 */

export interface Story {
  id: string;
  title: string;
  slug: string;
  deck: string;
  summary: string;
  category: string;
  publication: string;
  publishedAt: string; // ISO date
  publishedLabel: string;
  readingTime: string | null;
  heroImage: string | null;
  heroAlt: string;
  caption: string | null;
  body: StoryBlock[];
  tags: string[];
  articleUrl: string | null;
  videoUrl: string | null;
  location: string | null;
  featured: boolean;
  isDemo: boolean;
}

export type StoryBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string };

const demoBody: StoryBlock[] = [
  {
    type: "paragraph",
    text: "This is a portfolio placeholder article. Replace this demo content with the journalist's actual published reporting. The structure supports paragraphs, headings, pull quotes, lists, images and links — everything needed for long-form journalism.",
  },
  {
    type: "heading",
    level: 2,
    text: "Replace with verified reporting",
  },
  {
    type: "paragraph",
    text: "When the journalist supplies actual articles, paste the body here as a sequence of structured blocks. The reading column is sized to roughly 700px on desktop, with a comfortable line height for long-form reading. Pull quotes, captions and inline images are all supported.",
  },
  {
    type: "quote",
    text: "Demo pull quote. Replace with an excerpt from the actual reporting.",
  },
  {
    type: "paragraph",
    text: "Each story can be linked to an external publication URL — readers will be able to verify the original source. Categories, tags, publication names, dates and reading times are all editable metadata fields. Nothing here is real until verified.",
  },
];

const demoStories: Story[] = [
  {
    id: "story-1",
    title: "Sample Report Title",
    slug: "sample-report-title",
    deck: "Demo lead story — replace with verified published reporting.",
    summary:
      "This is a placeholder portfolio item. Replace with Abdullah's actual published reporting before launch.",
    category: "Reports",
    publication: "Daily Banijjo Pratidin",
    publishedAt: "2026-09-12",
    publishedLabel: "12 SEP 2026",
    readingTime: "6 min read",
    heroImage: null,
    heroAlt: "Demo hero image — replace with the article's actual hero image.",
    caption: "Demo caption. Replace with the verified image caption and credit.",
    body: demoBody,
    tags: ["demo", "placeholder"],
    articleUrl: null,
    videoUrl: null,
    location: "Dhaka, Bangladesh",
    featured: true,
    isDemo: true,
  },
  {
    id: "story-2",
    title: "Sample Feature Story",
    slug: "sample-feature-story",
    deck: "Demo feature — replace with verified published reporting.",
    summary:
      "A second placeholder portfolio item showing the editorial layout. Replace with a real feature.",
    category: "Features",
    publication: "Dhaka Times",
    publishedAt: "2026-08-04",
    publishedLabel: "04 AUG 2026",
    readingTime: "8 min read",
    heroImage: null,
    heroAlt: "Demo hero image — replace with the article's actual hero image.",
    caption: null,
    body: demoBody,
    tags: ["demo", "placeholder"],
    articleUrl: null,
    videoUrl: null,
    location: "Dhaka, Bangladesh",
    featured: false,
    isDemo: true,
  },
  {
    id: "story-3",
    title: "Sample Interview",
    slug: "sample-interview",
    deck: "Demo interview — replace with a verified published interview.",
    summary:
      "A third placeholder showing the interview category. Replace with a real published interview.",
    category: "Interviews",
    publication: "Daily Banglar Nabokantha",
    publishedAt: "2026-06-21",
    publishedLabel: "21 JUN 2026",
    readingTime: "5 min read",
    heroImage: null,
    heroAlt: "Demo hero image — replace with the article's actual hero image.",
    caption: null,
    body: demoBody,
    tags: ["demo", "placeholder"],
    articleUrl: null,
    videoUrl: null,
    location: "Dhaka, Bangladesh",
    featured: false,
    isDemo: true,
  },
  {
    id: "story-4",
    title: "Sample Multimedia Piece",
    slug: "sample-multimedia-piece",
    deck: "Demo multimedia piece — replace with verified published reporting.",
    summary:
      "A fourth placeholder showing the multimedia category. Replace with a real published multimedia piece.",
    category: "Multimedia",
    publication: "Daily Banijjo Pratidin",
    publishedAt: "2026-04-09",
    publishedLabel: "09 APR 2026",
    readingTime: "4 min read",
    heroImage: null,
    heroAlt: "Demo hero image — replace with the article's actual hero image.",
    caption: null,
    body: demoBody,
    tags: ["demo", "placeholder"],
    articleUrl: null,
    videoUrl: null,
    location: "Dhaka, Bangladesh",
    featured: false,
    isDemo: true,
  },
  {
    id: "story-5",
    title: "Sample City Report",
    slug: "sample-city-report",
    deck: "Demo city report — replace with verified published reporting.",
    summary:
      "A fifth placeholder showing the city reporting category. Replace with a real published report.",
    category: "Reports",
    publication: "Dhaka Times",
    publishedAt: "2026-02-17",
    publishedLabel: "17 FEB 2026",
    readingTime: "7 min read",
    heroImage: null,
    heroAlt: "Demo hero image — replace with the article's actual hero image.",
    caption: null,
    body: demoBody,
    tags: ["demo", "placeholder"],
    articleUrl: null,
    videoUrl: null,
    location: "Dhaka, Bangladesh",
    featured: false,
    isDemo: true,
  },
];

export const stories: Story[] = demoStories;

export const storyCategories = ["All", "Reports", "Features", "Interviews", "Multimedia"] as const;
export type StoryCategory = (typeof storyCategories)[number];

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function getFeaturedStory(): Story | undefined {
  return stories.find((s) => s.featured) ?? stories[0];
}

export function getRelatedStories(story: Story, limit = 3): Story[] {
  return stories
    .filter((s) => s.id !== story.id)
    .filter((s) => s.category === story.category || s.tags.some((t) => story.tags.includes(t)))
    .slice(0, limit);
}

export function getNextPrevStories(story: Story): { next: Story | null; prev: Story | null } {
  const idx = stories.findIndex((s) => s.id === story.id);
  return {
    next: idx < stories.length - 1 ? stories[idx + 1] : null,
    prev: idx > 0 ? stories[idx - 1] : null,
  };
}

export function getStoryYears(): string[] {
  const years = new Set<string>();
  for (const s of stories) {
    years.add(new Date(s.publishedAt).getFullYear().toString());
  }
  return Array.from(years).sort((a, b) => b.localeCompare(a));
}

export function getStoryPublications(): string[] {
  const pubs = new Set<string>();
  for (const s of stories) pubs.add(s.publication);
  return Array.from(pubs).sort();
}
