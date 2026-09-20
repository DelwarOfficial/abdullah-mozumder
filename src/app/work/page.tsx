import type { Metadata } from "next";
import { Suspense } from "react";
import { WorkContent } from "@/components/journalism/WorkContent";
import { ClippingsStrip } from "@/components/journalism/PressClippings";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { siteConfig } from "@/content/site";
import { siteName } from "@/i18n/ui";
import { stories } from "@/content/stories";
import { ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected journalism by Abdullah Mozomdar. Reports, features, interviews and multimedia.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work — Abdullah Mozomdar",
    url: `${siteConfig.url}/work`,
    images: [ogImage("Selected reporting by Abdullah Mozomdar", "/image/journalists-rally.jpg")],
  },
};

export default function WorkPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: siteName.en, url: siteConfig.url },
        { name: "Work", url: `${siteConfig.url}/work` },
      ]} />
      {/* Verified evidence leads — prerendered, outside the Suspense boundary */}
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12 pt-24 lg:pt-32">
        <ClippingsStrip />
      </div>
      <Suspense fallback={<div className="text-center text-sm text-ink-muted">Loading…</div>}>
        <WorkContent />
      </Suspense>
      {/* SEO fallback for crawlers */}
      <div className="sr-only" aria-hidden="true">
        <ul>
          {stories.map((s) => (
            <li key={s.id}><a href={`/work/${s.slug}`}>{s.title.en}</a> — {s.publication.en}, {s.publishedLabel.en}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
