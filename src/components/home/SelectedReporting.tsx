"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { StoryImagePlaceholder } from "@/components/journalism/StoryImagePlaceholder";
import { getFeaturedStory, stories } from "@/content/stories";
import { formatDate } from "@/lib/format";
import { useLanguage } from "@/i18n/language-context";

/**
 * §Featured Reports — one large card + clean responsive cards.
 */
export function SelectedReporting({ locale }: { locale: "en" | "bn" }) {
  const en = locale === "en";
  const lead = getFeaturedStory();
  if (!lead) return null;

  const rest = stories.filter((s) => s.id !== lead.id).slice(0, 3);

  return (
    <section aria-labelledby="featured-heading" className="py-16 sm:py-20 lg:py-24 bg-paper-deep/50">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium text-newsroom mb-2">{en ? "Portfolio" : "পোর্টফোলিও"}</p>
            <h2 id="featured-heading" className="section-headline text-ink" style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)" }}>
              {en ? "Featured works and movements" : "নির্বাচিত প্রতিবেদন ও আন্দোলন"}
            </h2>
          </div>
          <Link href="/work" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-newsroom hover:text-newsroom-deep transition-colors">
            {en ? "View all reports" : "সব প্রতিবেদন"}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Lead card */}
        <Link
          href={`/work/${lead.slug}`}
          className="group block card-surface overflow-hidden mb-6 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-newsroom rounded-[var(--radius)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px] overflow-hidden">
              <StoryImagePlaceholder
                ratio="16/10"
                alt={lead.heroAlt[locale]}
                src={lead.heroImage}
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="!rounded-none !border-0 !shadow-none h-full group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <p className="text-xs font-semibold text-newsroom mb-3">
                {lead.category[locale]} , {formatDate(lead.publishedAt, locale)}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-ink leading-snug group-hover:text-newsroom transition-colors">
                {lead.title[locale]}
              </h3>
              <p className="mt-3 text-ink-soft leading-relaxed line-clamp-3">{lead.summary[locale]}</p>
              <p className="mt-4 text-sm text-ink-muted">{lead.publication[locale]}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-newsroom">
                {en ? "Read report" : "প্রতিবেদন পড়ুন"}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </div>
          </div>
        </Link>

        {/* Secondary cards */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((story) => (
            <li key={story.id}>
              <Link
                href={`/work/${story.slug}`}
                className="group block card-surface overflow-hidden h-full hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-newsroom rounded-[var(--radius)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <StoryImagePlaceholder
                    ratio="16/10"
                    alt={story.heroAlt[locale]}
                    src={story.heroImage}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="!rounded-none !border-0 !shadow-none h-full group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-newsroom mb-2">
                    {story.category[locale]} , {formatDate(story.publishedAt, locale)}
                  </p>
                  <h3 className="text-lg font-bold text-ink leading-snug group-hover:text-newsroom transition-colors">
                    {story.title[locale]}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed line-clamp-2">{story.summary[locale]}</p>
                  <p className="mt-3 text-xs text-ink-muted">{story.publication[locale]}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
