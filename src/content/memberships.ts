import type { Membership } from "./types";
import { L } from "./types";

export const memberships: Membership[] = [
  {
    id: "mem-1",
    organization: L("Dhaka Union of Journalists", "ঢাকা সাংবাদিক ইউনিয়ন (ডিইউজে)"),
    shortName: "DUJ",
    role: L("Executive Member", "নির্বাহী সদস্য"),
  },
  {
    id: "mem-2",
    organization: L("National Press Club", "জাতীয় প্রেস ক্লাব"),
    role: L("Permanent Member", "স্থায়ী সদস্য"),
  },
];
