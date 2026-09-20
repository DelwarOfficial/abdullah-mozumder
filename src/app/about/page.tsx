import type { Metadata } from "next";
import { BreadcrumbSchema, PersonSchema } from "@/components/seo/StructuredData";
import { profile } from "@/content/profile";
import { siteConfig } from "@/content/site";
import { siteName } from "@/i18n/ui";
import { AboutContent } from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name.en} — ${profile.title.en} based in ${profile.location.en}.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About — ${siteName.en}`,
    description: `About ${profile.name.en}.`,
    url: `${siteConfig.url}/about`,
    type: "profile",
    images: [{ url: "/image/profile.jpg", alt: profile.portraitAlt.en }],
  },
};

export default function AboutPage() {
  return (
    <>
      <PersonSchema name={profile.name.en} jobTitle={profile.title.en} email={profile.email} url={`${siteConfig.url}/about`} location={profile.location.en} />
      <BreadcrumbSchema items={[
        { name: siteName.en, url: siteConfig.url },
        { name: "About", url: `${siteConfig.url}/about` },
      ]} />
      <AboutContent />
    </>
  );
}
