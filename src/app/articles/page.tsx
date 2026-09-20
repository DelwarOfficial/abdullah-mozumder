import type { Metadata } from "next";
import { ArticlesContent } from "@/components/journalism/ArticlesContent";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { siteConfig } from "@/content/site";
import { siteName } from "@/i18n/ui";

export const metadata: Metadata = {
  title: "Articles",
  description: "Articles by Abdullah Mozomdar — a text-first index of journalism.",
  alternates: {
    canonical: "/articles",
  },
};

export default function ArticlesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: siteName.en, url: siteConfig.url },
        { name: "Articles", url: `${siteConfig.url}/articles` },
      ]} />
      <ArticlesContent />
    </>
  );
}
