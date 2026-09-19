import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { Divider } from "@/components/ui-editorial/Divider";
import { StoryImagePlaceholder } from "@/components/journalism/StoryImagePlaceholder";
import { ShareButtons } from "@/components/journalism/ShareButtons";
import { ReadingProgress } from "@/components/journalism/ReadingProgress";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { stories, getStoryBySlug, getRelatedStories, getNextPrevStories } from "@/content/stories";
import type { Story, StoryBlock } from "@/content/types";
import { siteConfig } from "@/content/site";
import { siteName } from "@/content/site-messages";
import { profile } from "@/content/profile";
import { isLocale, otherLocale } from "@/i18n/config";
import { formatDate } from "@/lib/format";
import { ogImage } from "@/lib/seo";
import type { Locale } from "@/content/types";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return siteConfig.locales.flatMap((locale) => stories.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const story = getStoryBySlug(slug);
  if (!story) return {};
  const other = otherLocale[locale];
  return {
    title: story.title[locale],
    description: story.summary[locale],
    alternates: {
      canonical: `/${locale}/articles/${story.slug}`,
      languages: { [locale]: `/${locale}/articles/${story.slug}`, [other]: `/${other}/articles/${story.slug}`, "x-default": `/en/articles/${story.slug}` },
    },
    openGraph: { type: "article", title: story.title[locale], description: story.summary[locale], url: `${siteConfig.url}/${locale}/articles/${story.slug}`, publishedTime: story.publishedAt, authors: [profile.name[locale]], tags: story.tags, locale: locale === "bn" ? "bn_BD" : "en_US", images: story.heroImage ? [ogImage(story.heroAlt[locale], story.heroImage)] : [ogImage(story.title[locale])] },
    twitter: { card: "summary_large_image", title: story.title[locale], description: story.summary[locale], images: [ogImage(story.heroAlt[locale], story.heroImage ?? "/opengraph-image")] },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const related = getRelatedStories(story, 3);
  const { next, prev } = getNextPrevStories(story);

  return (
    <>
      <ReadingProgress />
      <ArticleSchema headline={story.title[locale]} description={story.summary[locale]} datePublished={story.publishedAt} authorName={profile.name[locale]} url={`${siteConfig.url}/${locale}/articles/${story.slug}`} image={story.heroImage ?? undefined} publication={story.publication[locale]} />
      <BreadcrumbSchema items={[
        { name: siteName[locale], url: `${siteConfig.url}/${locale}` },
        { name: locale === "en" ? "Articles" : "প্রতিবেদন", url: `${siteConfig.url}/${locale}/articles` },
        { name: story.title[locale], url: `${siteConfig.url}/${locale}/articles/${story.slug}` },
      ]} />

      <article className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-8">
          <Breadcrumbs items={[
            { label: locale === "en" ? "Home" : "হোম", href: `/${locale}` },
            { label: locale === "en" ? "Articles" : "প্রতিবেদন", href: `/${locale}/articles` },
            { label: story.title[locale] },
          ]} />

          <header className="mt-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="editorial-eyebrow text-newsroom">{story.category[locale]}</span>
              <span aria-hidden="true" className="text-rule">·</span>
              <span className="editorial-eyebrow">{formatDate(story.publishedAt, locale)}</span>
              {story.isDemo && <span className="inline-block border border-newsroom/40 text-newsroom text-[0.625rem] uppercase tracking-[0.14em] px-1.5 py-0.5">{locale === "en" ? "Demo" : "নমুনা"}</span>}
            </div>
            <h1 className="font-serif font-bold text-ink leading-[1.1] tracking-[-0.02em]" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>{story.title[locale]}</h1>
            <p className="mt-5 text-lg font-serif italic text-ink-soft leading-relaxed">{story.deck[locale]}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted border-y border-rule py-3">
              <span className="font-medium text-ink">{profile.name[locale]}</span>
              <span aria-hidden="true" className="text-rule">·</span>
              <span>{story.publication[locale]}</span>
              {story.readingTime && (<><span aria-hidden="true" className="text-rule">·</span><span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{story.readingTime[locale]}</span></>)}
            </div>
          </header>

          <figure className="mt-10">
            <StoryImagePlaceholder ratio="3/2" alt={story.heroAlt[locale]} src={story.heroImage} priority />
            {story.caption && <figcaption className="mt-3 text-xs text-ink-muted leading-relaxed">{story.caption[locale]}</figcaption>}
          </figure>

          <div className="mt-12 prose-editorial">
            <StoryBody story={story} locale={locale} />
          </div>

          <div className="mt-12">
            <Divider />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <ul className="flex flex-wrap gap-2">
                {story.tags.map((tag) => (<li key={tag} className="text-xs uppercase tracking-[0.14em] text-ink-muted border border-rule px-2 py-1">#{tag}</li>))}
              </ul>
              <ShareButtons title={story.title[locale]} url={`${siteConfig.url}/${locale}/articles/${story.slug}`} />
            </div>
          </div>

          <nav aria-label="Article navigation" className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev && (<Link href={`/${locale}/articles/${prev.slug}`} className="group border border-rule p-5 hover:border-ink transition-colors flex items-start gap-3"><ArrowLeft className="h-4 w-4 text-ink-muted mt-1 shrink-0 group-hover:text-newsroom transition-colors" aria-hidden="true" /><span><span className="editorial-eyebrow block">{locale === "en" ? "Previous" : "পূর্ববর্তী"}</span><span className="mt-1 font-serif text-lg text-ink group-hover:text-newsroom transition-colors block">{prev.title[locale]}</span></span></Link>)}
            {next && (<Link href={`/${locale}/articles/${next.slug}`} className="group border border-rule p-5 hover:border-ink transition-colors flex items-start gap-3 sm:text-right sm:flex-row-reverse"><ArrowRight className="h-4 w-4 text-ink-muted mt-1 shrink-0 group-hover:text-newsroom transition-colors" aria-hidden="true" /><span><span className="editorial-eyebrow block">{locale === "en" ? "Next" : "পরবর্তী"}</span><span className="mt-1 font-serif text-lg text-ink group-hover:text-newsroom transition-colors block">{next.title[locale]}</span></span></Link>)}
          </nav>

          {related.length > 0 && (
            <section aria-labelledby="related-heading" className="mt-16">
              <Divider label={locale === "en" ? "Related" : "সম্পর্কিত"} />
              <h2 id="related-heading" className="sr-only">{locale === "en" ? "Related articles" : "সম্পর্কিত প্রতিবেদন"}</h2>
              <ul className="grid grid-cols-1 gap-4 mt-6">
                {related.map((r) => (<li key={r.id}><Link href={`/${locale}/articles/${r.slug}`} className="group block py-4 border-b border-rule-soft hover:bg-paper-deep/30 transition-colors"><div className="flex items-baseline gap-3 mb-1"><span className="editorial-eyebrow text-newsroom">{r.category[locale]}</span><span className="text-xs text-ink-muted">{formatDate(r.publishedAt, locale)}</span></div><h3 className="font-serif text-lg text-ink group-hover:text-newsroom transition-colors">{r.title[locale]}</h3></Link></li>))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </>
  );
}

function StoryBody({ story, locale }: { story: Story; locale: Locale }) {
  const blocks: StoryBlock[] = story.body[locale];
  return <>{blocks.map((block, idx) => <Block key={idx} block={block} locale={locale} />)}</>;
}

function Block({ block, locale }: { block: StoryBlock; locale: Locale }) {
  switch (block.type) {
    case "paragraph": return <p>{block.text![locale]}</p>;
    case "heading": return block.level === 2 ? <h2>{block.text![locale]}</h2> : <h3>{block.text![locale]}</h3>;
    case "quote": return (<blockquote>{block.text![locale]}{block.attribution && <cite className="block mt-3 text-sm not-italic text-ink-muted font-sans">— {block.attribution[locale]}</cite>}</blockquote>);
    case "list": return block.ordered ? (<ol>{block.items!.map((item, idx) => <li key={idx}>{item[locale]}</li>)}</ol>) : (<ul>{block.items!.map((item, idx) => <li key={idx}>{item[locale]}</li>)}</ul>);
    case "image": return (<figure><StoryImagePlaceholder ratio="3/2" alt={block.alt![locale]} />{block.caption && <figcaption>{block.caption[locale]}</figcaption>}</figure>);
    default: return null;
  }
}
