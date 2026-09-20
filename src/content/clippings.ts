import type { Localized } from "./types";
import { L } from "./types";

/**
 * PRESS CLIPPINGS — REAL, VERIFIED PUBLISHED WORK.
 *
 * These are authentic e-paper clippings from দৈনিক বাণিজ্য প্রতিদিন.
 * They are EVIDENCE, not portfolio filler:
 *  - BN headline/byline = the EXACT text printed in the paper. Never paraphrase.
 *  - EN headline = meaning-faithful translation in newsroom register.
 *  - publishedAt = null. The clippings show NO date. NEVER invent one.
 *  - No claims about page numbers, section names or story specifics that are
 *    not visible in the clipping itself.
 *
 * NAME-SPELLING DISCREPANCY (pending owner decision):
 *   The printed byline reads "মোজুমদার" while the site's (unverified) name
 *   placeholder is "মোজোমদার". The clipping renders the EXACT printed
 *   spelling. Neither spelling has been changed until the journalist
 *   confirms the authoritative form.
 *
 * These clippings do NOT change the status of the demo entries in
 * stories.ts — those remain clearly labelled demo content.
 */

export interface Clipping {
  id: string;
  slug: string;
  publication: Localized<string>;
  headline: Localized<string>;
  byline: Localized<string>;
  summary: Localized<string>;
  image: string;
  alt: Localized<string>;
  publishedAt: string | null;
  isVerified: true;
}

export const clippings: Clipping[] = [
  {
    id: "clip-btv-expose",
    slug: "btv-expose",
    publication: L("Daily Banijjo Pratidin", "দৈনিক বাণিজ্য প্রতিদিন"),
    headline: L(
      "Manirul, owner of a thousand crore taka, exposed on BTV",
      "হাজার কোটি টাকার মালিক বিটিভিতে প্রকাশ্পল্লী মনিরুল",
    ),
    byline: L("Abdullah Mozumdar", "আবদুল্লাহ মোজুমদার"),
    summary: L(
      "Front-page exposé on the BTV appearances of Manirul, whose assets run into thousands of crores of taka.",
      "হাজার কোটি টাকার মালিকানার বিষয়ে বিটিভিতে প্রকাশ্যে আসা মনিরুল-সংক্রান্ত প্রথম পাতার অনুসন্ধানী প্রতিবেদন।",
    ),
    image: "/e-paper/btv-expose.jpg",
    alt: L(
      "Front page of Daily Banijjo Pratidin with the lead headline about Manirul exposed on BTV, by Abdullah Mozumdar",
      "দৈনিক বাণিজ্য প্রতিদিন-এর প্রথম পাতা — বিটিভিতে প্রকাশ্পল্লী মনিরুল শিরোনামে আবদুল্লাহ মোজুমদারের প্রতিবেদন",
    ),
    publishedAt: null,
    isVerified: true,
  },
  {
    id: "clip-dc-conference",
    slug: "dc-conference",
    publication: L("Daily Banijjo Pratidin", "দৈনিক বাণিজ্য প্রতিদিন"),
    headline: L(
      "District Commissioners' conference begins today — eight proposals on the table",
      "আজ থেকে হচ্ছে জেলা প্রশাসক সম্মেলন উঠে আসবে ৮টি প্রস্তাব",
    ),
    byline: L("N Abdullah", "এন আবদুল্লাহ"),
    summary: L(
      "Report on the Deputy Commissioners' conference and the eight proposals set to come up.",
      "জেলা প্রশাসক (ডিসি) সম্মেলন এবং সম্মেলনে উঠে আসা আটটি প্রস্তাব নিয়ে প্রতিবেদন।",
    ),
    image: "/e-paper/dc-conference.jpg",
    alt: L(
      "Page of Daily Banijjo Pratidin reporting the start of the District Commissioners' conference",
      "দৈনিক বাণিজ্য প্রতিদিন-এর পাতা — জেলা প্রশাসক সম্মেলন শুরুর খবর",
    ),
    publishedAt: null,
    isVerified: true,
  },
  {
    id: "clip-party-revenue-policy",
    slug: "party-revenue-policy",
    publication: L("Daily Banijjo Pratidin", "দৈনিক বাণিজ্য প্রতিদিন"),
    headline: L(
      "The new party's revenue policy — the six names stirring its top ranks",
      "নতুন রাজস্বনীতি দলের শীর্ষে ছয়টি পদে আলোড়নের যারা",
    ),
    byline: L("Abdullah Mozumdar", "আবদুল্লাহ মোজুমদার"),
    summary: L(
      "Report on the six figures at the centre of the new party's revenue-policy leadership contest.",
      "নতুন রাজস্বনীতি নিয়ে দলের শীর্ষে ছয়টি পদে আলোড়ন সৃষ্টিকারী ব্যক্তিদের নিয়ে প্রতিবেদন।",
    ),
    image: "/e-paper/party-revenue-policy.jpg",
    alt: L(
      "Page of Daily Banijjo Pratidin on the new party's revenue-policy leadership, by Abdullah Mozumdar",
      "দৈনিক বাণিজ্য প্রতিদিন-এর পাতা — নতুন রাজস্বনীতি দলের শীর্ষ পদগুলো নিয়ে আবদুল্লাহ মোজুমদারের প্রতিবেদন",
    ),
    publishedAt: null,
    isVerified: true,
  },
];
