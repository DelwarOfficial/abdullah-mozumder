import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { StoryImagePlaceholder } from "@/components/journalism/StoryImagePlaceholder";
import { getFeaturedStory, stories } from "@/content/stories";
import { localeHref } from "@/i18n/config";
import { cn } from "@/lib/utils";
import type { Locale } from "@/content/types";

interface SelectedReportingProps {
  locale: Locale;
}

export function SelectedReporting({ locale }: SelectedReportingProps) {
  const lead = getFeaturedStory();
  if (!lead) return null;

  const secondary = stories.filter((s) => s.id !== lead.id).slice(0, 3);
  const chapterLabel = locale === "en" ? "Selected Reporting" : "নির্বাচিত প্রতিবেদন";
  const sectionTitle = locale === "en" ? "Selected Journalism" : "নির্বাচিত সাংবাদিকতা";
  const allWorkLabel = locale === "en" ? "All Work" : "সব কাজ";
  const readLabel = locale === "en" ? "Read Story" : "পড়ুন";

  return (
    <section aria-labelledby="selected-heading" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        {/* Chapter mark + title */}
        <div className="grid grid-cols-12 gap-4 mb-12 lg:mb-20">
          <div className="col-span-12 lg:col-span-8">
            <ChapterMark number="01" label={chapterLabel} locale={locale} />
            <h2
              id="selected-heading"
              className="section-headline text-ink mt-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {sectionTitle}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 flex lg:items-end lg:justify-end">
            <Link
              href={localeHref("/work", locale)}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink hover:text-newsroom transition-colors"
            >
              {allWorkLabel}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Lead story — asymmetric spread */}
        <article className="group mb-16 lg:mb-24">
          <Link
            href={localeHref(`/work/${lead.slug}`, locale)}
            className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-6 items-start">
              {/* Lead photo — 7 cols */}
              <div className="col-span-12 lg:col-span-7">
                <StoryImagePlaceholder
                  ratio="3/2"
                  alt={lead.heroAlt[locale]}
                  src={lead.heroImage}
                  priority
                  className="group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                />
              </div>

              {/* Lead text — 5 cols */}
              <div className="col-span-12 lg:col-span-5 lg:pt-8">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="editorial-eyebrow text-newsroom">{lead.category[locale]}</span>
                  <span aria-hidden="true" className="text-rule">·</span>
                  <span className="editorial-eyebrow">{lead.publishedLabel[locale]}</span>
                  {lead.isDemo && (
                    <span className="ml-1 inline-block border border-newsroom/40 text-newsroom text-[0.625rem] uppercase tracking-[0.14em] px-1.5 py-0.5">
                      {locale === "en" ? "Demo" : "নমুনা"}
                    </span>
                  )}
                </div>
                <h3
                  className="font-serif font-bold text-ink leading-[1.05] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
                >
                  {lead.title[locale]}
                </h3>
                <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
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
                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink group-hover:text-newsroom transition-colors">
                  {readLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        </article>

        {/* Secondary stories — asymmetric */}
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-12 border-t border-rule pt-12 lg:pt-16">
          {/* Story 2 — left, text on top */}
          <article className="col-span-12 md:col-span-6 lg:col-span-4 group">
            <Link
              href={localeHref(`/work/${secondary[0].slug}`, locale)}
              className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="editorial-eyebrow text-newsroom">{secondary[0].category[locale]}</span>
                <span className="editorial-eyebrow">{secondary[0].publishedLabel[locale]}</span>
              </div>
              <h3
                className="font-serif font-semibold text-ink leading-tight tracking-[-0.01em] group-hover:text-newsroom transition-colors"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
              >
                {secondary[0].title[locale]}
              </h3>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed line-clamp-3">
                {secondary[0].summary[locale]}
              </p>
              <div className="mt-4">
                <StoryImagePlaceholder
                  ratio="4/3"
                  alt={secondary[0].heroAlt[locale]}
                  src={secondary[0].heroImage}
                  className="group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="editorial-meta">{secondary[0].publication[locale]}</span>
                <ArrowRight className="h-4 w-4 text-ink-muted group-hover:text-newsroom group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </div>
            </Link>
          </article>

          {/* Story 3 — center, image on top */}
          <article className="col-span-12 md:col-span-6 lg:col-span-4 group lg:mt-16">
            <Link
              href={localeHref(`/work/${secondary[1].slug}`, locale)}
              className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <StoryImagePlaceholder
                ratio="4/3"
                alt={secondary[1].heroAlt[locale]}
                src={secondary[1].heroImage}
                className="group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="mt-4 flex items-baseline gap-3">
                <span className="editorial-eyebrow text-newsroom">{secondary[1].category[locale]}</span>
                <span className="editorial-eyebrow">{secondary[1].publishedLabel[locale]}</span>
              </div>
              <h3
                className="mt-2 font-serif font-semibold text-ink leading-tight tracking-[-0.01em] group-hover:text-newsroom transition-colors"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
              >
                {secondary[1].title[locale]}
              </h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed line-clamp-2">
                {secondary[1].summary[locale]}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="editorial-meta">{secondary[1].publication[locale]}</span>
                <ArrowRight className="h-4 w-4 text-ink-muted group-hover:text-newsroom group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </div>
            </Link>
          </article>

          {/* Story 4 — right, offset */}
          <article className="col-span-12 md:col-span-12 lg:col-span-4 group">
            <Link
              href={localeHref(`/work/${secondary[2].slug}`, locale)}
              className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="editorial-eyebrow text-newsroom">{secondary[2].category[locale]}</span>
                <span className="editorial-eyebrow">{secondary[2].publishedLabel[locale]}</span>
              </div>
              <h3
                className="font-serif font-semibold text-ink leading-tight tracking-[-0.01em] group-hover:text-newsroom transition-colors"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
              >
                {secondary[2].title[locale]}
              </h3>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed line-clamp-3">
                {secondary[2].summary[locale]}
              </p>
              <div className="mt-4">
                <StoryImagePlaceholder
                  ratio="16/10"
                  alt={secondary[2].heroAlt[locale]}
                  src={secondary[2].heroImage}
                  className="group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="editorial-meta">{secondary[2].publication[locale]}</span>
                <ArrowRight className="h-4 w-4 text-ink-muted group-hover:text-newsroom group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </div>
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
