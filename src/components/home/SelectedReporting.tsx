import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { StoryImagePlaceholder } from "@/components/journalism/StoryImagePlaceholder";
import { getFeaturedStory, stories } from "@/content/stories";
import { formatDate } from "@/lib/format";
import { localeHref } from "@/i18n/config";
import type { Locale } from "@/content/types";

interface SelectedReportingProps {
  locale: Locale;
}

export function SelectedReporting({ locale }: SelectedReportingProps) {
  const lead = getFeaturedStory();
  if (!lead) return null;

  // Index-safe: the section renders gracefully even when stories[] shrinks
  const secondary = stories.filter((s) => s.id !== lead.id).slice(0, 3);
  const brief = stories.find((s) => s.id !== lead.id && !secondary.includes(s)) ?? null;
  const chapterLabel = locale === "en" ? "Selected Reporting" : "বাছাই করা প্রতিবেদন";
  const sectionTitle = locale === "en" ? "Selected Journalism" : "নির্বাচিত প্রতিবেদন";
  const allWorkLabel = locale === "en" ? "All Work" : "সব প্রতিবেদন";
  const readLabel = locale === "en" ? "Read Report" : "প্রতিবেদন পড়ুন";

  return (
    <section aria-labelledby="selected-heading" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        {/* Chapter mark + title */}
        <div className="grid grid-cols-12 gap-4 mb-12 lg:mb-20">
          <div className="col-span-12 lg:col-span-10">
            <ChapterMark number="01" label={chapterLabel} locale={locale} />
            <h2
              id="selected-heading"
              className="section-headline text-ink mt-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {sectionTitle}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-2 flex lg:items-end lg:justify-end">
            <Link
              href={localeHref("/work", locale)}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink hover:text-newsroom transition-colors"
            >
              {allWorkLabel}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Lead story — strong asymmetry: image ~60%, content ~40% */}
        <article className="group mb-20 lg:mb-32">
          <Link
            href={localeHref(`/work/${lead.slug}`, locale)}
            className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <div className="grid grid-cols-12 gap-x-4 lg:gap-x-10 gap-y-8 items-start">
              {/* Lead photo — 7 cols (58%) */}
              <div className="col-span-12 lg:col-span-7">
                <StoryImagePlaceholder
                  ratio="3/2"
                  alt={lead.heroAlt[locale]}
                  src={lead.heroImage}
                  priority
                  className="group-hover:scale-[1.012] transition-transform duration-700 ease-out"
                />
              </div>

              {/* Lead text — 5 cols (42%), aligned with image top */}
              <div className="col-span-12 lg:col-span-5 lg:pt-6">
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="editorial-eyebrow text-newsroom">{lead.category[locale]}</span>
                  <span aria-hidden="true" className="text-rule">·</span>
                  <span className="editorial-eyebrow">{formatDate(lead.publishedAt, locale)}</span>
                  {lead.isDemo && (
                    <span className="ml-1 inline-block border border-newsroom/40 text-newsroom text-[0.6875rem] uppercase tracking-[0.14em] px-1.5 py-0.5">
                      {locale === "en" ? "Demo" : "নমুনা"}
                    </span>
                  )}
                </div>
                <h3
                  className="font-serif font-bold text-ink leading-[1.04] tracking-[-0.022em]"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                >
                  {lead.title[locale]}
                </h3>
                <p className="body-readable mt-6 max-w-md">
                  {lead.summary[locale]}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="editorial-meta text-newsroom">{lead.publication[locale]}</span>
                  {lead.readingTime && (
                    <>
                      <span aria-hidden="true" className="text-rule">·</span>
                      <span className="editorial-meta">{lead.readingTime[locale]}</span>
                    </>
                  )}
                </div>
                <span className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink group-hover:text-newsroom transition-colors">
                  {readLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        </article>

        {/* Secondary stories — varied compositions, not identical blocks */}
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-10 gap-y-16 border-t border-rule pt-12 lg:pt-20">

          {/* Story 2 — image-left / text-right (horizontal split) */}
          {secondary[0] && (
          <article className="col-span-12 lg:col-span-7 group">
            <Link
              href={localeHref(`/work/${secondary[0].slug}`, locale)}
              className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <div className="grid grid-cols-12 gap-x-4 lg:gap-x-6 gap-y-4 items-start">
                <div className="col-span-12 sm:col-span-5">
                  <StoryImagePlaceholder
                    ratio="4/3"
                    alt={secondary[0].heroAlt[locale]}
                    src={secondary[0].heroImage}
                    className="group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="col-span-12 sm:col-span-7 sm:pt-2">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="editorial-eyebrow text-newsroom">{secondary[0].category[locale]}</span>
                    <span className="editorial-eyebrow">{formatDate(secondary[0].publishedAt, locale)}</span>
                  </div>
                  <h3
                    className="font-serif font-semibold text-ink leading-[1.1] tracking-[-0.015em] group-hover:text-newsroom transition-colors"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
                  >
                    {secondary[0].title[locale]}
                  </h3>
                  <p className="body-small mt-3 line-clamp-2">
                    {secondary[0].summary[locale]}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="editorial-meta">{secondary[0].publication[locale]}</span>
                    <ArrowRight className="h-4 w-4 text-ink-muted group-hover:text-newsroom group-hover:translate-x-1 transition-all" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </Link>
          </article>
          )}

          {/* Story 3 — text-led, no image, larger headline */}
          {secondary[1] && (
          <article className="col-span-12 lg:col-span-5 group lg:pt-8">
            <Link
              href={localeHref(`/work/${secondary[1].slug}`, locale)}
              className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="editorial-eyebrow text-newsroom">{secondary[1].category[locale]}</span>
                <span className="editorial-eyebrow">{formatDate(secondary[1].publishedAt, locale)}</span>
              </div>
              <h3
                className="font-serif font-semibold text-ink leading-[1.1] tracking-[-0.015em] group-hover:text-newsroom transition-colors"
                style={{ fontSize: "clamp(1.625rem, 2.75vw, 2.5rem)" }}
              >
                {secondary[1].title[locale]}
              </h3>
              <p className="body-small mt-4 line-clamp-3">
                {secondary[1].summary[locale]}
              </p>
              <div className="mt-6 pt-4 border-t border-rule-soft flex items-center justify-between">
                <span className="editorial-meta">{secondary[1].publication[locale]}</span>
                <ArrowRight className="h-4 w-4 text-ink-muted group-hover:text-newsroom group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </div>
            </Link>
          </article>
          )}

          {/* Story 4 — smaller, image-on-top with wider ratio */}
          {secondary[2] && (
          <article className="col-span-12 lg:col-span-5 group">
            <Link
              href={localeHref(`/work/${secondary[2].slug}`, locale)}
              className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <StoryImagePlaceholder
                ratio="16/9"
                alt={secondary[2].heroAlt[locale]}
                src={secondary[2].heroImage}
                className="group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="mt-4 flex items-baseline gap-3 mb-2">
                <span className="editorial-eyebrow text-newsroom">{secondary[2].category[locale]}</span>
                <span className="editorial-eyebrow">{formatDate(secondary[2].publishedAt, locale)}</span>
              </div>
              <h3
                className="font-serif font-semibold text-ink leading-[1.15] tracking-[-0.01em] group-hover:text-newsroom transition-colors"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.625rem)" }}
              >
                {secondary[2].title[locale]}
              </h3>
              <div className="mt-3 flex items-center justify-between">
                <span className="editorial-meta">{secondary[2].publication[locale]}</span>
                <ArrowRight className="h-4 w-4 text-ink-muted group-hover:text-newsroom group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </div>
            </Link>
          </article>
          )}

          {/* Story 5 — compact text-only brief, balances the row */}
          {brief && (
            <article className="col-span-12 lg:col-span-7 group lg:pt-4">
              <Link
                href={localeHref(`/work/${brief.slug}`, locale)}
                className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <div className="grid grid-cols-12 gap-4 items-baseline">
                  <div className="col-span-12 sm:col-span-3">
                    <div className="flex flex-col gap-1">
                      <span className="editorial-eyebrow text-newsroom">{brief.category[locale]}</span>
                      <span className="editorial-eyebrow">{formatDate(brief.publishedAt, locale)}</span>
                    </div>
                  </div>
                  <div className="col-span-12 sm:col-span-9">
                    <h3
                      className="font-serif font-semibold text-ink leading-[1.15] tracking-[-0.01em] group-hover:text-newsroom transition-colors"
                      style={{ fontSize: "clamp(1.25rem, 1.75vw, 1.5rem)" }}
                    >
                      {brief.title[locale]}
                    </h3>
                    <p className="body-small mt-2 line-clamp-2">
                      {brief.summary[locale]}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="editorial-meta">{brief.publication[locale]}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-ink-muted group-hover:text-newsroom group-hover:translate-x-1 transition-all" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
