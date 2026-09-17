/**
 * Education credentials.
 * Future CMS: maps to an `education` table.
 */

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  field: string;
}

export const education: Education[] = [
  {
    id: "edu-1",
    degree: "Master of Arts (M.A.)",
    institution: "Jagannath University, Dhaka",
    year: "2009",
    field: "Bangla",
  },
  {
    id: "edu-2",
    degree: "Bachelor of Arts (B.A.)",
    institution: "Jagannath University, Dhaka",
    year: "2008",
    field: "Bangla",
  },
];
