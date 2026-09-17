import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Clock } from "lucide-react";
import { Container } from "@/components/ui-editorial/Container";
import { Eyebrow } from "@/components/ui-editorial/Eyebrow";
import { Divider } from "@/components/ui-editorial/Divider";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { StoryImagePlaceholder } from "@/components/journalism/StoryImagePlaceholder";
import { ShareButtons } from "@/components/journalism/ShareButtons";
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

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.summary,
    alternates: { canonical: `/work/${story.slug}` },
    openGraph: {
      type: "article",
      title: story.title,
      description: story.summary,
      url: `${siteConfig.url}/work/${story.slug}`,
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

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const related = getRelatedStories(story, 3);
  const { next, prev } = getNextPrevStories(story);

  return (
    <>
      <ArticleSchema
        headline={story.title}
        description={story.summary}
        datePublished={story.publishedAt}
        authorName={profile.name}
        url={`${siteConfig.url}/work/${story.slug}`}
        image={story.heroImage ?? undefined}
        publication={story.publication}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Work", url: `${siteConfig.url}/work` },
          { name: story.title, url: `${siteConfig.url}/work/${story.slug}` },
        ]}
      />

      <article className="py-12 sm:py-16">
        <Container size="wide">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Work", href: "/work" },
              { label: story.title },
            ]}
          />

          {/* Header */}
          <header className="mt-10 max-w-3xl mx-auto text-center">
            <Eyebrow withDot={false}>
              {story.category} · {story.publishedLabel}
            </Eyebrow>
            {story.isDemo && (
              <span className="ml-2 inline-block border border-newsroom/40 text-newsroom text-[0.625rem] uppercase tracking-[0.14em] px-1.5 py-0.5">
                Demo
              </span>
            )}
            <h1 className="mt-4 font-serif font-semibold text-ink text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em]">
              {story.title}
            </h1>
            <p className="mt-5 text-lg sm:text-xl font-serif italic text-ink-soft leading-relaxed">
              {story.deck}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-ink-muted">
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

          {/* Hero image */}
          <figure className="mt-12 max-w-5xl mx-auto">
            <StoryImagePlaceholder
              ratio="16/9"
              alt={story.heroAlt}
              src={story.heroImage}
              priority
            />
            {story.caption && (
              <figcaption className="mt-3 text-xs text-ink-muted text-center max-w-2xl mx-auto leading-relaxed">
                {story.caption}
              </figcaption>
            )}
          </figure>

          {/* Body */}
          <div className="mt-12 prose-editorial">
            <StoryBody story={story} />
          </div>

          {/* Tags & share */}
          <div className="mt-12 max-w-3xl mx-auto">
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
                url={`${siteConfig.url}/work/${story.slug}`}
              />
            </div>

            {story.articleUrl && (
              <a
                href={story.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-newsroom hover:text-newsroom-deep transition-colors link-underline"
              >
                Read original publication
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>

          {/* Prev / next */}
          <nav
            aria-label="Story navigation"
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
          >
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
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
                href={`/work/${next.slug}`}
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
            <section aria-labelledby="related-heading" className="mt-20">
              <Divider label="Related Reporting" />
              <h2 id="related-heading" className="sr-only">
                Related reporting
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 mt-8">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/work/${r.slug}`}
                      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                      <StoryImagePlaceholder
                        ratio="4/3"
                        alt={r.heroAlt}
                        src={r.heroImage}
                        className="group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      <Eyebrow className="mt-3">
                        {r.category} · {r.publishedLabel}
                      </Eyebrow>
                      <h3 className="mt-1.5 font-serif text-lg font-semibold text-ink group-hover:text-newsroom transition-colors">
                        {r.title}
                      </h3>
                      <p className="text-xs text-ink-muted mt-1">{r.publication}</p>
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
