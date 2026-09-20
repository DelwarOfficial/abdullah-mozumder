import type { Profile } from "./types";
import { L } from "./types";

export const profile: Profile = {
  name: L("Abdullah Mozomdar", "আবদুল্লাহ মোজুমদার"),
  slug: "abdullah-mozomdar",
  headline: L(
    "Reporting stories that matter.",
    "যে গল্প জানা জরুরি।",
  ),
  title: L("Journalist & Senior Reporter", "সাংবাদিক ও সিনিয়র রিপোর্টার"),
  shortBio: L(
    "Abdullah Mozomdar is a Bangladeshi journalist and Senior Reporter with professional reporting experience across national news organizations.",
    "আবদুল্লাহ মোজুমদার একজন বাংলাদেশি সাংবাদিক ও সিনিয়র রিপোর্টার। দেশের বেশ কয়েকটি জাতীয় সংবাদপত্রে কাজ করার অভিজ্ঞতা রয়েছে তাঁর।",
  ),
  longBio: L(
    "Abdullah Mozomdar is a Bangladeshi journalist and Senior Reporter with experience across national news organizations. He currently works at Daily Banijjo Pratidin and previously reported for Dhaka Times and Daily Banglar Nabokantha. He is an Executive Member of the Dhaka Union of Journalists and a Permanent Member of the National Press Club. His academic background is in Bangla at Jagannath University, Dhaka.",
    "আবদুল্লাহ মোজুমদার একজন বাংলাদেশি সাংবাদিক ও সিনিয়র রিপোর্টার। দেশের একাধিক জাতীয় সংবাদমাধ্যমে কাজ করার অভিজ্ঞতা রয়েছে তাঁর। বর্তমানে তিনি দৈনিক বাণিজ্য প্রতিদিন-এ সিনিয়র রিপোর্টার হিসেবে কর্মরত এবং এর আগে ঢাকা টাইমস ও দৈনিক বাংলার নবোকণ্ঠ-এ সংবাদদাতা হিসেবে কাজ করেছেন। তিনি ঢাকা ইউনিয়ন অব জার্নালিস্টস-এর নির্বাহী সদস্য এবং ন্যাশনাল প্রেস ক্লাবের স্থায়ী সদস্য। শিক্ষাজীবনে তিনি জগন্নাথ বিশ্ববিদ্যালয়, ঢাকা থেকে বাংলায় স্নাতক ও স্নাতকোত্তর সম্পন্ন করেছেন।",
  ),
  location: L("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"),
  email: "amozomdar@gmail.com",
  portrait: "/image/profile.jpg",
  portraitAlt: L(
    "Portrait of Abdullah Mozomdar",
    "আবদুল্লাহ মোজুমদারের ছবি",
  ),
  languages: L(["Bangla", "English"], ["বাংলা", "English"]),
  currentPosition: {
    role: L("Senior Reporter", "সিনিয়র রিপোর্টার"),
    organization: L("Daily Banijjo Pratidin", "দৈনিক বাণিজ্য প্রতিদিন"),
    period: L("2025 — Present", "২০২৫ — বর্তমান"),
  },
};
