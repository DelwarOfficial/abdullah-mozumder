import type { Metadata } from "next";
import { buildBreadcrumbNode, StructuredDataGraph } from "@/components/seo/StructuredData";
import { personSchema, websiteSchema } from "@/lib/person-schema";
import { profile } from "@/content/profile";
import { siteConfig } from "@/content/site";
import { siteName } from "@/i18n/ui";
import { AboutContent } from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Abdullah Mozomdar, a journalist in Dhaka, including his reporting career, education at Jagannath University and professional memberships.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About — ${siteName.en}`,
    description: `About ${profile.name.en}.`,
    url: `${siteConfig.url}/about`,
    type: "profile",
      images: [{ url: "/image/profile.webp", alt: profile.portraitAlt.en }],
  },
};

export default function AboutPage() {
  return (
    <>
      <StructuredDataGraph
        pageUrl={`${siteConfig.url}/about`}
        pageType="ProfilePage"
        pageName={`About — ${siteName.en}`}
        pageDescription={metadata.description ?? undefined}
        person={personSchema}
        website={websiteSchema}
        extraNodes={[buildBreadcrumbNode([
        { name: siteName.en, url: siteConfig.url },
        { name: "About", url: `${siteConfig.url}/about` },
        ])]}
      />
      <AboutContent />
    </>
  );
}
