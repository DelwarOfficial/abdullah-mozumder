import type { Metadata } from "next";
import { Suspense } from "react";
import { WorkExplorer } from "@/components/journalism/WorkExplorer";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { siteConfig } from "@/content/site";
import { stories } from "@/content/stories";

export const metadata: Metadata = {
  title: "Work",
  description: `Selected journalism by ${siteConfig.name}. Reports, features, interviews and multimedia — filterable by category, year and publication.`,
  alternates: { canonical: "/work" },
  openGraph: {
    title: `Work — ${siteConfig.name}`,
    description: `Selected journalism by ${siteConfig.name}.`,
    url: `${siteConfig.url}/work`,
    type: "website",
  },
};

export default function WorkPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Work", url: `${siteConfig.url}/work` },
        ]}
      />
      <Suspense
        fallback={
          <div className="py-32 text-center text-sm text-ink-muted">
            Loading stories…
          </div>
        }
      >
        <WorkExplorer />
      </Suspense>

      {/* Hidden content for SEO crawlers that don't execute client filters */}
      <div className="sr-only" aria-hidden="true">
        <h2>Stories</h2>
        <ul>
          {stories.map((s) => (
            <li key={s.id}>
              <a href={`/work/${s.slug}`}>{s.title}</a> — {s.publication}, {s.publishedLabel}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
