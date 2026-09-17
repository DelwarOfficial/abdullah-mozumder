import type { Metadata } from "next";
import { ArticlesExplorer } from "@/components/journalism/ArticlesExplorer";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Articles",
  description: `Articles by ${siteConfig.name} — a text-first index of journalism, filterable by category, year and publication.`,
  alternates: { canonical: "/articles" },
  openGraph: {
    title: `Articles — ${siteConfig.name}`,
    description: `Articles by ${siteConfig.name}.`,
    url: `${siteConfig.url}/articles`,
    type: "website",
  },
};

export default function ArticlesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Articles", url: `${siteConfig.url}/articles` },
        ]}
      />
      <ArticlesExplorer />
    </>
  );
}
