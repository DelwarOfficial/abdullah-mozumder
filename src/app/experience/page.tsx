import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { siteConfig } from "@/content/site";
import { siteName } from "@/i18n/ui";
import { ExperienceContent } from "@/components/pages/ExperienceContent";

export const metadata: Metadata = {
  title: "Experience",
  description: "Explore Abdullah Mozomdar's reporting career, from Daily Banglar Nabokantha and Dhaka Times to his current Senior Reporter role at Daily Banijjo Pratidin.",
  alternates: {
    canonical: "/experience",
  },
};

export default function ExperiencePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: siteName.en, url: siteConfig.url },
        { name: "Experience", url: `${siteConfig.url}/experience` },
      ]} />
      <ExperienceContent />
    </>
  );
}
