/**
 * Professional memberships / affiliations.
 * Future CMS: maps to a `memberships` table.
 */

export interface Membership {
  id: string;
  organization: string;
  shortName?: string;
  role: string;
  verified: boolean;
}

export const memberships: Membership[] = [
  {
    id: "mem-1",
    organization: "Dhaka Union of Journalists",
    shortName: "DUJ",
    role: "Executive Member",
    verified: true,
  },
  {
    id: "mem-2",
    organization: "National Press Club",
    role: "Permanent Member",
    verified: true,
  },
];
