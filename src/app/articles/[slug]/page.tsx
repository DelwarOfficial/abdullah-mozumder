import type { Metadata } from "next";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { stories, getStoryBySlug } from "@/content/stories";
import { siteConfig } from "@/content/site";
import { siteName } from "@/i18n/ui";
import { profile } from "@/content/profile";
import { ogImage } from "@/lib/seo";
import { ArticleContent } from "@/components/journalism/ArticleContent";

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
  const url = `${siteConfig.url}/articles/${story.slug}`;
  return {
    title: story.title.en,
    description: story.summary.en,
    alternates: {
      canonical: `/articles/${story.slug}`,
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

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  return (
    <>
      <ArticleSchema
        headline={story?.title.en ?? "Article"}
        description={story?.summary.en ?? ""}
        datePublished={story?.publishedAt ?? ""}
        authorName={profile.name.en}
        url={`${siteConfig.url}/articles/${slug}`}
        image={story?.heroImage ?? undefined}
        publication={story?.publication.en}
      />
      <BreadcrumbSchema items={[
        { name: siteName.en, url: siteConfig.url },
        { name: "Articles", url: `${siteConfig.url}/articles` },
        { name: story?.title.en ?? "Article", url: `${siteConfig.url}/articles/${slug}` },
      ]} />
      <ArticleContent slug={slug} />
    </>
  );
}
