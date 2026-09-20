import type { Metadata } from "next";
import { PersonSchema, WebsiteSchema } from "@/components/seo/StructuredData";
import { profile } from "@/content/profile";
import { siteConfig } from "@/content/site";
import { serverTitle, serverDescription, siteName } from "@/i18n/ui";
import { HomeContent } from "@/components/pages/HomeContent";

export const metadata: Metadata = {
  title: { absolute: serverTitle },
  description: serverDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: siteConfig.url,
    title: serverTitle,
    description: serverDescription,
    siteName: siteName.en,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: serverTitle,
    description: serverDescription,
  },
};

export default function HomePage() {
  return (
    <>
      <PersonSchema
        name={profile.name.en}
        jobTitle={profile.title.en}
        email={profile.email}
        url={siteConfig.url}
        location={profile.location.en}
      />
      <WebsiteSchema
        name={siteName.en}
        url={siteConfig.url}
        description={serverDescription}
      />
      <HomeContent />
    </>
  );
}
