import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/home/Ticker";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { LatestStories } from "@/components/home/LatestStories";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { AboutPreview } from "@/components/home/AboutPreview";
import { Credentials } from "@/components/home/Credentials";
import { ReportingAreas } from "@/components/home/ReportingAreas";
import { EducationPreview } from "@/components/home/EducationPreview";
import { Philosophy } from "@/components/home/Philosophy";
import { ContactCTA } from "@/components/home/ContactCTA";
import { PersonSchema, WebsiteSchema } from "@/components/seo/StructuredData";
import { profile } from "@/content/profile";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Journalist & Senior Reporter`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: siteConfig.url,
    title: `${siteConfig.name} | Journalist & Senior Reporter`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Journalist & Senior Reporter`,
    description: siteConfig.description,
  },
};

export default function Home() {
  return (
    <>
      <PersonSchema
        name={profile.name}
        jobTitle={profile.title}
        email={profile.email}
        url={siteConfig.url}
        location={profile.location}
      />
      <WebsiteSchema
        name={siteConfig.name}
        url={siteConfig.url}
        description={siteConfig.description}
      />

      <Hero />
      <Ticker />
      <FeaturedWork />
      <LatestStories />
      <ExperiencePreview />
      <AboutPreview />
      <Credentials />
      <ReportingAreas />
      <EducationPreview />
      <Philosophy />
      <ContactCTA />
    </>
  );
}
