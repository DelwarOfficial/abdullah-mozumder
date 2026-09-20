import type { Metadata } from "next";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { stories, getStoryBySlug } from "@/content/stories";
import { siteConfig } from "@/content/site";
import { siteName } from "@/i18n/ui";
import { profile } from "@/content/profile";
import { ogImage } from "@/lib/seo";
import { StoryContent } from "@/components/journalism/StoryContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};
  const url = `${siteConfig.url}/work/${story.slug}`;
  return {
    title: story.title.en,
    description: story.summary.en,
    alternates: {
      canonical: `/work/${story.slug}`,
    },
    openGraph: {
      type: "article",
      title: story.title.en,
      description: story.summary.en,
      url,
      publishedTime: story.publishedAt,
      authors: [profile.name.en],
      tags: story.tags,
      images: story.heroImage
        ? [{ url: story.heroImage, alt: story.heroAlt.en }]
        : [ogImage(story.title.en)],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title.en,
      description: story.summary.en,
      images: story.heroImage ? [{ url: story.heroImage }] : undefined,
    },
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  return (
    <>
      <ArticleSchema
        headline={story?.title.en ?? "Story"}
        description={story?.summary.en ?? ""}
        datePublished={story?.publishedAt ?? ""}
        authorName={profile.name.en}
        url={`${siteConfig.url}/work/${slug}`}
        image={story?.heroImage ?? undefined}
        publication={story?.publication.en}
      />
      <BreadcrumbSchema items={[
        { name: siteName.en, url: siteConfig.url },
        { name: "Work", url: `${siteConfig.url}/work` },
        { name: story?.title.en ?? "Story", url: `${siteConfig.url}/work/${slug}` },
      ]} />
      <StoryContent slug={slug} />
    </>
  );
}
