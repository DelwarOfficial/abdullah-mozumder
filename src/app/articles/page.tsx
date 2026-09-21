import { stories } from "@/content/stories";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ArticlesContent } from "@/components/journalism/ArticlesContent";
import { BreadcrumbSchema, StructuredData, buildCollectionNode } from "@/components/seo/StructuredData";
import { siteConfig } from "@/content/site";
import { siteName } from "@/i18n/ui";

export const metadata: Metadata = {
  title: "Articles",
  description: "Browse Abdullah Mozomdar's article index, with clearly labeled sample reports, features and interviews presented in a readable format in English and Bangla.",
  alternates: {
    canonical: "/articles",
  },
};

export default function ArticlesPage() {
  return (
    <>
      <StructuredData data={buildCollectionNode({
        url: `${siteConfig.url}/articles`,
        name: "Articles - Abdullah Mozomdar",
        description: metadata.description ?? undefined,
        items: stories.map((story) => ({ name: story.title.en, url: `${siteConfig.url}/articles/${story.slug}` })),
      })} />
      <BreadcrumbSchema items={[
        { name: siteName.en, url: siteConfig.url },
        { name: "Articles", url: `${siteConfig.url}/articles` },
      ]} />
      <Suspense fallback={<div className="pt-32 text-center text-sm text-ink-muted">Loading…</div>}>
        <ArticlesContent />
      </Suspense>
    </>
  );
}
