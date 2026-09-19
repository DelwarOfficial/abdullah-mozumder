import type { Education } from "./types";
import { L } from "./types";

export const education: Education[] = [
  {
    id: "edu-1",
      degree: L("Master of Arts", "এমএ (স্নাতকোত্তর)"),
    institution: L("Jagannath University, Dhaka", "জগন্নাথ বিশ্ববিদ্যালয়, ঢাকা"),
    year: "2009",
    field: L("Bangla", "বাংলা"),
  },
  {
    id: "edu-2",
      degree: L("Bachelor of Arts", "বিএ (স্নাতক)"),
    institution: L("Jagannath University, Dhaka", "জগন্নাথ বিশ্ববিদ্যালয়, ঢাকা"),
    year: "2008",
    field: L("Bangla", "বাংলা"),
  },
];
