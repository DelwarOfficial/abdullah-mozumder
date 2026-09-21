import type { Metadata } from "next";
import { StructuredDataGraph } from "@/components/seo/StructuredData";
import { personSchema, websiteSchema } from "@/lib/person-schema";
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
      <StructuredDataGraph
        pageUrl={siteConfig.url}
        pageName={serverTitle}
        pageDescription={serverDescription}
        person={personSchema}
        website={websiteSchema}
      />
      <HomeContent />
    </>
  );
}
