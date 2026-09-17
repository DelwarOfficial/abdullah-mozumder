import type { Story, StoryBlock, Localized } from "./types";
import { L } from "./types";

/**
 * Stories / journalism portfolio.
 *
 * CONTENT POLICY (per project brief):
 * The CV does not supply actual published articles. These entries are clearly
 * labeled as DEMO CONTENT. Replace with verified published work before launch.
 * Never present a demo item as a real published story.
 *
 * Both English and Bangla versions are provided. Bangla translations of demo
 * content are illustrative — replace with verified Bangla article text.
 */

const demoBodyEn: StoryBlock[] = [
  {
    type: "paragraph",
    text: L(
      "This is a portfolio placeholder article. Replace this demo content with the journalist's actual published reporting. The structure supports paragraphs, headings, pull quotes, lists, images and links — everything needed for long-form journalism.",
      "এটি একটি নমুনা প্রতিবেদন। সাংবাদিকের প্রকৃত প্রকাশিত প্রতিবেদন দিয়ে এই নমুনা অংশ প্রতিস্থাপন করুন। এই কাঠামোটি অনুচ্ছেদ, শিরোনাম, উদ্ধৃতি, তালিকা, ছবি ও লিংক সমর্থন করে — দীর্ঘ প্রতিবেদনের জন্য প্রয়োজনীয় সব উপাদান।",
    ),
  },
  {
    type: "heading",
    level: 2,
    text: L(
      "Replace with verified reporting",
      "যাচাইকৃত প্রতিবেদন দিয়ে প্রতিস্থাপন করুন",
    ),
  },
  {
    type: "paragraph",
    text: L(
      "When the journalist supplies actual articles, paste the body here as a sequence of structured blocks. The reading column is sized to roughly 700px on desktop, with a comfortable line height for long-form reading. Pull quotes, captions and inline images are all supported.",
      "সাংবাদিক প্রকৃত প্রতিবেদন সরবরাহ করলে, সেগুলো এখানে কাঠামোগত ব্লক হিসেবে যুক্ত করুন। পড়ার কলামটি ডেস্কটপে প্রায় ৭০০px চওড়া, দীর্ঘ পড়ার জন্য আরামদায়ক লাইন-উচ্চতা সহ। উদ্ধৃতি, ক্যাপশন এবং ইনলাইন ছবি সবই সমর্থিত।",
    ),
  },
  {
    type: "quote",
    text: L(
      "Demo pull quote. Replace with an excerpt from the actual reporting.",
      "নমুনা উদ্ধৃতি। প্রকৃত প্রতিবেদন থেকে একটি অংশ দিয়ে প্রতিস্থাপন করুন।",
    ),
  },
  {
    type: "paragraph",
    text: L(
      "Each story can be linked to an external publication URL — readers will be able to verify the original source. Categories, tags, publication names, dates and reading times are all editable metadata fields. Nothing here is real until verified.",
      "প্রতিটি প্রতিবেদন একটি বাহ্যিক প্রকাশনার লিংকে যুক্ত করা যাবে — পাঠকরা মূল উৎস যাচাই করতে পারবেন। বিভাগ, ট্যাগ, প্রকাশনার নাম, তারিখ এবং পড়ার সময় সবই সম্পাদনযোগ্য মেটাডেটা ক্ষেত্র। যাচাই না হওয়া পর্যন্ত এখানে কিছুই প্রকৃত নয়।",
    ),
  },
];

// Demo body is the same structure for both locales (already localized above)
const demoBody: Localized<StoryBlock[]> = {
  en: demoBodyEn,
  bn: demoBodyEn, // Same blocks — text is already L()-localized
};

export const stories: Story[] = [
  {
    id: "story-1",
    slug: "sample-report-title",
    deck: L(
      "Demo lead story — replace with verified published reporting.",
      "নমুনা মুখ্য প্রতিবেদন — যাচাইকৃত প্রকাশিত প্রতিবেদন দিয়ে প্রতিস্থাপন করুন।",
    ),
    summary: L(
      "This is a placeholder portfolio item. Replace with Abdullah's actual published reporting before launch.",
      "এটি একটি নমুনা পোর্টফোলিও আইটেম। লঞ্চের আগে আবদুল্লাহর প্রকৃত প্রকাশিত প্রতিবেদন দিয়ে প্রতিস্থাপন করুন।",
    ),
    category: L("Reports", "প্রতিবেদন"),
    title: L("Sample Report Title", "নমুনা প্রতিবেদন শিরোনাম"),
    publication: L("Daily Banijjo Pratidin", "দৈনিক বাণিজ্য প্রতিদিন"),
    publishedAt: "2026-09-12",
    publishedLabel: L("12 Sep 2026", "১২ সেপ্টেম্বর ২০২৬"),
    readingTime: L("6 min read", "৬ মিনিট পড়া"),
    heroImage: null,
    heroAlt: L(
      "Demo hero image — replace with the article's actual hero image.",
      "নমুনা হিরো ছবি — প্রতিবেদনের প্রকৃত হিরো ছবি দিয়ে প্রতিস্থাপন করুন।",
    ),
    caption: L(
      "Demo caption. Replace with the verified image caption and credit.",
      "নমুনা ক্যাপশন। যাচাইকৃত ছবির ক্যাপশন ও কৃতিত্ব দিয়ে প্রতিস্থাপন করুন।",
    ),
    body: demoBody,
    tags: ["demo", "placeholder"],
    articleUrl: null,
    videoUrl: null,
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    featured: true,
    isDemo: true,
  },
  {
    id: "story-2",
    slug: "sample-feature-story",
    deck: L(
      "Demo feature — replace with verified published reporting.",
      "নমুনা ফিচার — যাচাইকৃত প্রকাশিত প্রতিবেদন দিয়ে প্রতিস্থাপন করুন।",
    ),
    summary: L(
      "A second placeholder portfolio item showing the editorial layout. Replace with a real feature.",
      "সম্পাদকীয় বিন্যাস দেখাতে দ্বিতীয় নমুনা আইটেম। একটি প্রকৃত ফিচার দিয়ে প্রতিস্থাপন করুন।",
    ),
    category: L("Features", "ফিচার"),
    title: L("Sample Feature Story", "নমুনা ফিচার প্রতিবেদন"),
    publication: L("Dhaka Times", "ঢাকা টাইমস"),
    publishedAt: "2026-08-04",
    publishedLabel: L("04 Aug 2026", "০৪ আগস্ট ২০২৬"),
    readingTime: L("8 min read", "৮ মিনিট পড়া"),
    heroImage: null,
    heroAlt: L(
      "Demo hero image — replace with the article's actual hero image.",
      "নমুনা হিরো ছবি — প্রতিবেদনের প্রকৃত হিরো ছবি দিয়ে প্রতিস্থাপন করুন।",
    ),
    caption: null,
    body: demoBody,
    tags: ["demo", "placeholder"],
    articleUrl: null,
    videoUrl: null,
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    featured: false,
    isDemo: true,
  },
  {
    id: "story-3",
    slug: "sample-interview",
    deck: L(
      "Demo interview — replace with a verified published interview.",
      "নমুনা সাক্ষাৎকার — যাচাইকৃত প্রকাশিত সাক্ষাৎকার দিয়ে প্রতিস্থাপন করুন।",
    ),
    summary: L(
      "A third placeholder showing the interview category. Replace with a real published interview.",
      "সাক্ষাৎকার বিভাগ দেখাতে তৃতীয় নমুনা আইটেম। একটি প্রকৃত প্রকাশিত সাক্ষাৎকার দিয়ে প্রতিস্থাপন করুন।",
    ),
    category: L("Interviews", "সাক্ষাৎকার"),
    title: L("Sample Interview", "নমুনা সাক্ষাৎকার"),
    publication: L("Daily Banglar Nabokantha", "দৈনিক বাংলার নবোকণ্ঠ"),
    publishedAt: "2026-06-21",
    publishedLabel: L("21 Jun 2026", "২১ জুন ২০২৬"),
    readingTime: L("5 min read", "৫ মিনিট পড়া"),
    heroImage: null,
    heroAlt: L(
      "Demo hero image — replace with the article's actual hero image.",
      "নমুনা হিরো ছবি — প্রতিবেদনের প্রকৃত হিরো ছবি দিয়ে প্রতিস্থাপন করুন।",
    ),
    caption: null,
    body: demoBody,
    tags: ["demo", "placeholder"],
    articleUrl: null,
    videoUrl: null,
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    featured: false,
    isDemo: true,
  },
  {
    id: "story-4",
    slug: "sample-multimedia-piece",
    deck: L(
      "Demo multimedia piece — replace with verified published reporting.",
      "নমুনা মাল্টিমিডিয়া অংশ — যাচাইকৃত প্রকাশিত প্রতিবেদন দিয়ে প্রতিস্থাপন করুন।",
    ),
    summary: L(
      "A fourth placeholder showing the multimedia category. Replace with a real published multimedia piece.",
      "মাল্টিমিডিয়া বিভাগ দেখাতে চতুর্থ নমুনা আইটেম। একটি প্রকৃত প্রকাশিত মাল্টিমিডিয়া অংশ দিয়ে প্রতিস্থাপন করুন।",
    ),
    category: L("Multimedia", "মাল্টিমিডিয়া"),
    title: L("Sample Multimedia Piece", "নমুনা মাল্টিমিডিয়া অংশ"),
    publication: L("Daily Banijjo Pratidin", "দৈনিক বাণিজ্য প্রতিদিন"),
    publishedAt: "2026-04-09",
    publishedLabel: L("09 Apr 2026", "০৯ এপ্রিল ২০২৬"),
    readingTime: L("4 min read", "৪ মিনিট পড়া"),
    heroImage: null,
    heroAlt: L(
      "Demo hero image — replace with the article's actual hero image.",
      "নমুনা হিরো ছবি — প্রতিবেদনের প্রকৃত হিরো ছবি দিয়ে প্রতিস্থাপন করুন।",
    ),
    caption: null,
    body: demoBody,
    tags: ["demo", "placeholder"],
    articleUrl: null,
    videoUrl: null,
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    featured: false,
    isDemo: true,
  },
  {
    id: "story-5",
    slug: "sample-city-report",
    deck: L(
      "Demo city report — replace with verified published reporting.",
      "নমুনা নগর প্রতিবেদন — যাচাইকৃত প্রকাশিত প্রতিবেদন দিয়ে প্রতিস্থাপন করুন।",
    ),
    summary: L(
      "A fifth placeholder showing the city reporting category. Replace with a real published report.",
      "নগর প্রতিবেদন বিভাগ দেখাতে পঞ্চম নমুনা আইটেম। একটি প্রকৃত প্রকাশিত প্রতিবেদন দিয়ে প্রতিস্থাপন করুন।",
    ),
    category: L("Reports", "প্রতিবেদন"),
    title: L("Sample City Report", "নমুনা নগর প্রতিবেদন"),
    publication: L("Dhaka Times", "ঢাকা টাইমস"),
    publishedAt: "2026-02-17",
    publishedLabel: L("17 Feb 2026", "১৭ ফেব্রুয়ারি ২০২৬"),
    readingTime: L("7 min read", "৭ মিনিট পড়া"),
    heroImage: null,
    heroAlt: L(
      "Demo hero image — replace with the article's actual hero image.",
      "নমুনা হিরো ছবি — প্রতিবেদনের প্রকৃত হিরো ছবি দিয়ে প্রতিস্থাপন করুন।",
    ),
    caption: null,
    body: demoBody,
    tags: ["demo", "placeholder"],
    articleUrl: null,
    videoUrl: null,
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    featured: false,
    isDemo: true,
  },
];

export const storyCategories: Localized<string[]> = L(
  ["All", "Reports", "Features", "Interviews", "Multimedia"],
  ["সব", "প্রতিবেদন", "ফিচার", "সাক্ষাৎকার", "মাল্টিমিডিয়া"],
);

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function getFeaturedStory(): Story | undefined {
  return stories.find((s) => s.featured) ?? stories[0];
}

export function getRelatedStories(story: Story, limit = 3): Story[] {
  return stories
    .filter((s) => s.id !== story.id)
    .filter((s) => s.category.en === story.category.en || s.tags.some((t) => story.tags.includes(t)))
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

export function getStoryPublications(locale: "en" | "bn"): string[] {
  const pubs = new Set<string>();
  for (const s of stories) pubs.add(s.publication[locale]);
  return Array.from(pubs).sort();
}
