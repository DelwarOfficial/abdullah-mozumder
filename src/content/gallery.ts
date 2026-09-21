import type { GalleryItem } from "./types";
import { L } from "./types";

/**
 * Photographs from the journalist's professional collection.
 * Captions describe only what is visible/verifiable — no invented contexts.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "g-1",
    src: "/image/duj-council.jpg",
    thumbnail: "/image/duj-council.jpg",
    title: L("At the DUJ council", "ডিইউজে সম্মেলনে"),
    caption: L(
      "Speaking at the triennial council of the Dhaka Union of Journalists.",
      "ঢাকা সাংবাদিক ইউনিয়নের (ডিইউজে) ত্রি-বার্ষিক সম্মেলনে বক্তব্য।",
    ),
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    date: "2024",
    credit: null,
    alt: L(
      "Speaking at the podium at the Dhaka Union of Journalists council",
      "ঢাকা সাংবাদিক ইউনিয়নের (ডিইউজে) সম্মেলনে মঞ্চ থেকে বক্তব্য",
    ),
    isPlaceholder: false,
  },
  {
    id: "g-2",
    src: "/image/duj-rally.jpg",
    thumbnail: "/image/duj-rally.jpg",
    title: L("DUJ rally", "ডিইউজে সমাবেশ"),
    caption: L(
      "With fellow journalists at a Dhaka Union of Journalists rally.",
      "ঢাকা সাংবাদিক ইউনিয়নের (ডিইউজে) সমাবেশে সহকর্মী সাংবাদিকদের সঙ্গে।",
    ),
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    date: null,
    credit: null,
    alt: L(
      "Journalists standing in a row with a union banner",
      "ইউনিয়নের ব্যানার নিয়ে সারিবদ্ধ সাংবাদিকেরা",
    ),
    isPlaceholder: false,
  },
  {
    id: "g-3",
    src: "/image/field-reporting.jpg",
    thumbnail: "/image/field-reporting.jpg",
    title: L("In the field", "মাঠে"),
    caption: L(
      "Reporting from the streets during a mass gathering in Dhaka.",
      "ঢাকায় এক বৃহৎ সমাবেশের সংবাদ সংগ্রহে।",
    ),
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    date: null,
    credit: null,
    alt: L(
      "Among a large street crowd on reporting assignment",
      "প্রতিবেদনের জন্য বড় জমায়েতের ভিড়ে",
    ),
    isPlaceholder: false,
  },
  {
    id: "g-4",
    src: "/image/journalists-rally.jpg",
    thumbnail: "/image/journalists-rally.jpg",
    title: L("Unity rally", "ঐক্য সমাবেশ"),
    caption: L(
      "Journalists gathered at a unity rally in the capital.",
      "রাজধানীতে সাংবাদিকদের ঐক্য সমাবেশ।",
    ),
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    date: null,
    credit: null,
    alt: L(
      "A large gathering of journalists at a rally",
      "সমাবেশে সাংবাদিকদের বড় সমাগম",
    ),
    isPlaceholder: false,
  },
  {
    id: "g-5",
    src: "/image/duj-election-night.jpg",
    thumbnail: "/image/duj-election-night.jpg",
    title: L("With panel colleagues", "প্যানেল সহকর্মীদের সঙ্গে"),
    caption: L(
      "Celebrating with garlanded panel colleagues after a union election.",
      "ইউনিয়ন নির্বাচনের পর মাল্যাভূষিত প্যানেল সহকর্মীদের সঙ্গে আনন্দের মুহূর্ত।",
    ),
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    date: null,
    credit: null,
    alt: L(
      "Garlanded journalists posing together at night",
      "রাতে মাল্যাভূষিত সাংবাদিকদের একত্রে ছবি",
    ),
    isPlaceholder: false,
  },
  {
    id: "g-6",
    src: "/image/felicitation.jpg",
    thumbnail: "/image/felicitation.jpg",
    title: L("Felicitation", "সংবর্ধনা"),
    caption: L(
      "At a felicitation ceremony for a senior journalist.",
      "এক জ্যেষ্ঠ সাংবাদিকের সংবর্ধনা অনুষ্ঠানে।",
    ),
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    date: null,
    credit: null,
    alt: L(
      "Presenting a bouquet at a felicitation ceremony",
      "সংবর্ধনা অনুষ্ঠানে ফুলের তোড়া প্রদান",
    ),
    isPlaceholder: false,
  },
  {
    id: "g-7",
    src: "/image/newsroom-meeting.jpg",
    thumbnail: "/image/newsroom-meeting.jpg",
    title: L("Newsroom meeting", "নিউজরুম বৈঠক"),
    caption: L(
      "In conversation with senior editors at a newsroom meeting.",
      "নিউজরুমে জ্যেষ্ঠ সম্পাদকদের সঙ্গে আলাপচারিতা।",
    ),
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    date: null,
    credit: null,
    alt: L(
      "Editors and journalists in a meeting room conversation",
      "বৈঠকে সম্পাদক ও সাংবাদিকেরা",
    ),
    isPlaceholder: false,
  },
  {
    id: "g-8",
    src: "/image/duj-boishakhi.jpg",
    thumbnail: "/image/duj-boishakhi.jpg",
    title: L("Boishakhi gathering", "বৈশাখী আয়োজন"),
    caption: L(
      "At a Boishakhi gathering of the journalist community in Ramna.",
      "রমনায় সাংবাদিক সমাজের বৈশাখী আয়োজনে।",
    ),
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    date: null,
    credit: null,
    alt: L(
      "Guests at an outdoor Boishakhi cultural gathering",
      "আউটডোর বৈশাখী আয়োজনে অতিথিরা",
    ),
    isPlaceholder: false,
  },
  {
    id: "g-9",
    src: "/image/journalists-sports.jpg",
    thumbnail: "/image/journalists-sports.jpg",
    title: L("On the court", "ক্রীড়াঙ্গনে"),
    caption: L(
      "A journalists' sports tournament match.",
      "সাংবাদিক ক্রীড়া প্রতিযোগিতার এক ম্যাচ।",
    ),
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    date: null,
    credit: null,
    alt: L(
      "Two players mid-rally at an indoor sports event",
      "ইনডোর ক্রীড়া প্রতিযোগিতায় খেলোয়াড়েরা",
    ),
    isPlaceholder: false,
  },
  {
    id: "g-10",
    src: "/image/noya-diganta.jpg",
    thumbnail: "/image/noya-diganta.jpg",
    title: L("Noya Diganta anniversary", "নয়া দিগন্তের জন্মবার্ষিকী"),
    caption: L(
      "At the anniversary celebration of the daily Noya Diganta.",
      "দৈনিক নয়া দিগন্তের জন্মবার্ষিকী অনুষ্ঠানে।",
    ),
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    date: null,
    credit: null,
    alt: L(
      "Guests presenting flowers at a newspaper anniversary event",
      "এক সংবাদপত্রের বার্ষিকী অনুষ্ঠানে ফুল প্রদান",
    ),
    isPlaceholder: false,
  },
  {
    id: "g-11",
    src: "/image/office-greeting.jpg",
    thumbnail: "/image/office-greeting.jpg",
    title: L("Office greeting", "অফিসে সংবর্ধনা"),
    caption: L(
      "Presenting flowers to a senior colleague at the office.",
      "অফিসে জ্যেষ্ঠ সহকর্মীকে ফুলের তোড়া প্রদান।",
    ),
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    date: null,
    credit: null,
    alt: L(
      "Colleagues presenting flowers in a newsroom office",
      "নিউজরুমে সহকর্মীদের ফুল প্রদান",
    ),
    isPlaceholder: false,
  },
  {
    id: "g-12",
    src: "/image/pohela-boishakh.jpg",
    thumbnail: "/image/pohela-boishakh.jpg",
    title: L("Pohela Boishakh", "পহেলা বৈশাখ"),
    caption: L(
      "With family on the streets of Dhaka during Pohela Boishakh.",
      "পহেলা বৈশাখে ঢাকার রাসপথে পরিবারের সঙ্গে।",
    ),
    location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
    date: null,
    credit: null,
    alt: L(
      "A family in festive attire on Pohela Boishakh",
      "পহেলা বৈশাখে উৎসবের সাজে পরিবার",
    ),
    isPlaceholder: false,
  },
];
