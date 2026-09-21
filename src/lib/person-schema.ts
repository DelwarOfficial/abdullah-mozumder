import type { PersonNodeInput } from "@/components/seo/StructuredData";
import { education } from "@/content/education";
import { currentExperience } from "@/content/experiences";
import { memberships } from "@/content/memberships";
import { profile } from "@/content/profile";
import { reportingAreas } from "@/content/reporting-areas";
import { siteConfig } from "@/content/site";
import { serverDescription, siteName } from "@/i18n/ui";

export const personSchema: PersonNodeInput = {
  name: profile.name.en,
  alternateName: profile.name.bn,
  jobTitle: profile.title.en,
  email: profile.email,
  url: siteConfig.url,
  location: profile.location.en,
  image: new URL(siteConfig.portrait, siteConfig.url).href,
  description: profile.shortBio.en,
  alumniOf: [...new Set(education.map((item) => item.institution.en))].map((name) => ({ name })),
  memberOf: memberships.map((item) => ({ name: item.organization.en, role: item.role.en })),
  worksFor: currentExperience ? { name: currentExperience.organization.en } : null,
  // Placeholder beats must never become claims of expertise.
  knowsAbout: reportingAreas.filter((item) => !item.isPlaceholder).map((item) => item.label.en),
  // Add sameAs only after the owner supplies verified profile URLs.
};

export const websiteSchema = { name: siteName.en, url: siteConfig.url, description: serverDescription };
