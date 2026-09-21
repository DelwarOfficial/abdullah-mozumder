"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { stories } from "@/content/stories";
import { formatDate, formatShortDate } from "@/lib/format";
import { useLanguage } from "@/i18n/language-context";

/**
 * §Latest Work — list left, featured preview right.
 */
export function NewsDesk({ locale }: { locale: "en" | "bn" }) {
  const en = locale === "en";
  const sorted = [...stories].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const [first, ...rest] = sorted.slice(0, 4);

  return (
    <section aria-labelledby="latest-heading" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium text-newsroom mb-2">{en ? "Newsroom" : "সাংবাদিকতা"}</p>
            <h2 id="latest-heading" className="section-headline text-ink" style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)" }}>
              {en ? "Latest Work" : "সর্বশেষ কাজ"}
            </h2>
          </div>
          <Link href="/articles" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-newsroom hover:text-newsroom-deep transition-colors">
            {en ? "View all articles" : "সব লেখা"}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* List */}
          <ol className="lg:col-span-7 divide-y divide-rule border-t border-b border-rule">
            {[first, ...rest].map((story) => (
              <li key={story.id}>
                <Link
                  href={`/articles/${story.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-newsroom"
                >
                  <time className="text-xs text-ink-muted tabular-nums shrink-0">
                    {formatShortDate(story.publishedAt, locale)}
                  </time>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-newsroom mb-1">{story.category[locale]}</span>
                    <span className="block font-semibold text-ink leading-snug group-hover:text-newsroom transition-colors">
                      {story.title[locale]}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-ink-muted group-hover:text-newsroom transition-colors shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>

          {/* Featured preview */}
          <Link
            href={`/articles/${first.slug}`}
            className="lg:col-span-5 group block card-surface overflow-hidden hover:-translate-y-0.5 rounded-[var(--radius)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-newsroom"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={first.heroImage ?? "/image/newsroom-meeting.jpg"}
                alt={first.heroAlt[locale]}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold text-newsroom mb-2">
                {first.category[locale]} , {formatDate(first.publishedAt, locale)}
              </p>
              <h3 className="text-lg font-bold text-ink leading-snug group-hover:text-newsroom transition-colors">
                {first.title[locale]}
              </h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed line-clamp-2">{first.summary[locale]}</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
