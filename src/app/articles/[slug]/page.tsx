import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/ui-editorial/Container";
import { Eyebrow } from "@/components/ui-editorial/Eyebrow";
import { Divider } from "@/components/ui-editorial/Divider";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { StoryImagePlaceholder } from "@/components/journalism/StoryImagePlaceholder";
import { ShareButtons } from "@/components/journalism/ShareButtons";
import { ReadingProgress } from "@/components/journalism/ReadingProgress";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { notFound } from "next/navigation";
import { stories, getStoryBySlug, getRelatedStories, getNextPrevStories, type Story, type StoryBlock } from "@/content/stories";
import { siteConfig } from "@/content/site";
import { profile } from "@/content/profile";

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
  return {
    title: story.title,
    description: story.summary,
    alternates: { canonical: `/articles/${story.slug}` },
    openGraph: {
      type: "article",
      title: story.title,
      description: story.summary,
      url: `${siteConfig.url}/articles/${story.slug}`,
      publishedTime: story.publishedAt,
      authors: [profile.name],
      tags: story.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.summary,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const related = getRelatedStories(story, 3);
  const { next, prev } = getNextPrevStories(story);

  return (
    <>
      <ReadingProgress />
      <ArticleSchema
        headline={story.title}
        description={story.summary}
        datePublished={story.publishedAt}
        authorName={profile.name}
        url={`${siteConfig.url}/articles/${story.slug}`}
        image={story.heroImage ?? undefined}
        publication={story.publication}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Articles", url: `${siteConfig.url}/articles` },
          { name: story.title, url: `${siteConfig.url}/articles/${story.slug}` },
        ]}
      />

      <article className="py-12 sm:py-16">
        <Container size="narrow">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Articles", href: "/articles" },
              { label: story.title },
            ]}
          />

          <header className="mt-10">
            <Eyebrow withDot={false}>
              {story.category} · {story.publishedLabel}
            </Eyebrow>
            {story.isDemo && (
              <span className="ml-2 inline-block border border-newsroom/40 text-newsroom text-[0.625rem] uppercase tracking-[0.14em] px-1.5 py-0.5">
                Demo
              </span>
            )}
            <h1 className="mt-4 font-serif font-semibold text-ink text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] tracking-[-0.02em]">
              {story.title}
            </h1>
            <p className="mt-5 text-lg font-serif italic text-ink-soft leading-relaxed">
              {story.deck}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted border-y border-rule py-3">
              <span className="font-medium text-ink">{profile.name}</span>
              <span aria-hidden="true" className="text-rule">·</span>
              <span>{story.publication}</span>
              {story.readingTime && (
                <>
                  <span aria-hidden="true" className="text-rule">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {story.readingTime}
                  </span>
                </>
              )}
            </div>
          </header>

          <figure className="mt-10">
            <StoryImagePlaceholder
              ratio="3/2"
              alt={story.heroAlt}
              src={story.heroImage}
              priority
            />
            {story.caption && (
              <figcaption className="mt-3 text-xs text-ink-muted leading-relaxed">
                {story.caption}
              </figcaption>
            )}
          </figure>

          <div className="mt-12 prose-editorial">
            <StoryBody story={story} />
          </div>

          {/* Tags & share */}
          <div className="mt-12">
            <Divider />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <ul className="flex flex-wrap gap-2">
                {story.tags.map((tag) => (
                  <li
                    key={tag}
                    className="text-xs uppercase tracking-[0.14em] text-ink-muted border border-rule px-2 py-1"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
              <ShareButtons
                title={story.title}
                url={`${siteConfig.url}/articles/${story.slug}`}
              />
            </div>
          </div>

          {/* Prev / next */}
          <nav
            aria-label="Article navigation"
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {prev ? (
              <Link
                href={`/articles/${prev.slug}`}
                className="group border border-rule p-5 hover:border-ink transition-colors flex items-start gap-3"
              >
                <ArrowLeft className="h-4 w-4 text-ink-muted mt-1 shrink-0 group-hover:text-newsroom transition-colors" aria-hidden="true" />
                <span>
                  <span className="editorial-eyebrow block">Previous</span>
                  <span className="mt-1 font-serif text-lg text-ink group-hover:text-newsroom transition-colors block">
                    {prev.title}
                  </span>
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" aria-hidden="true" />
            )}
            {next ? (
              <Link
                href={`/articles/${next.slug}`}
                className="group border border-rule p-5 hover:border-ink transition-colors flex items-start gap-3 sm:text-right sm:flex-row-reverse"
              >
                <ArrowRight className="h-4 w-4 text-ink-muted mt-1 shrink-0 group-hover:text-newsroom transition-colors" aria-hidden="true" />
                <span>
                  <span className="editorial-eyebrow block">Next</span>
                  <span className="mt-1 font-serif text-lg text-ink group-hover:text-newsroom transition-colors block">
                    {next.title}
                  </span>
                </span>
              </Link>
            ) : null}
          </nav>

          {/* Related */}
          {related.length > 0 && (
            <section aria-labelledby="related-heading" className="mt-16">
              <Divider label="Related" />
              <h2 id="related-heading" className="sr-only">
                Related articles
              </h2>
              <ul className="grid grid-cols-1 gap-4 mt-6">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/articles/${r.slug}`}
                      className="group block py-4 border-b border-rule-soft hover:bg-paper-deep/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="editorial-meta text-newsroom">{r.category}</span>
                        <span className="text-xs text-ink-muted">{r.publishedLabel}</span>
                      </div>
                      <h3 className="font-serif text-lg text-ink group-hover:text-newsroom transition-colors">
                        {r.title}
                      </h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Container>
      </article>
    </>
  );
}

function StoryBody({ story }: { story: Story }) {
  return (
    <>
      {story.body.map((block, idx) => <Block key={idx} block={block} />)}
    </>
  );
}

function Block({ block }: { block: StoryBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "heading":
      return block.level === 2 ? <h2>{block.text}</h2> : <h3>{block.text}</h3>;
    case "quote":
      return (
        <blockquote>
          {block.text}
          {block.attribution && (
            <cite className="block mt-3 text-sm not-italic text-ink-muted font-sans">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );
    case "list":
      return block.ordered ? (
        <ol>
          {block.items.map((item, idx) => <li key={idx}>{item}</li>)}
        </ol>
      ) : (
        <ul>
          {block.items.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      );
    case "image":
      return (
        <figure>
          <StoryImagePlaceholder
            ratio="3/2"
            alt={block.alt}
          />
          {block.caption && (
            <figcaption>{block.caption}</figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}
