"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { StoryImagePlaceholder } from "@/components/journalism/StoryImagePlaceholder";
import { stories } from "@/content/stories";
import { localeHref } from "@/i18n/config";
import { cn } from "@/lib/utils";
import type { Locale } from "@/content/types";

interface NewsDeskProps {
  locale: Locale;
}

export function NewsDesk({ locale }: NewsDeskProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const items = [...stories]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 6);

  useEffect(() => {
    if (hoveredIdx === null) return;
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [hoveredIdx]);

  const chapterLabel = locale === "en" ? "Latest" : "সাম্প্রতিক";
  const sectionTitle = locale === "en" ? "Latest Reporting" : "সাম্প্রতিক প্রতিবেদন";
  const allLabel = locale === "en" ? "All Articles" : "সব প্রতিবেদন";

  return (
    <section aria-labelledby="news-desk-heading" className="py-16 sm:py-24 lg:py-32 bg-paper-deep/30">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-4 mb-12 lg:mb-16">
          <div className="col-span-12 lg:col-span-8">
            <ChapterMark number="02" label={chapterLabel} locale={locale} />
            <h2
              id="news-desk-heading"
              className="section-headline text-ink mt-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {sectionTitle}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 flex lg:items-end lg:justify-end">
            <Link
              href={localeHref("/articles", locale)}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink hover:text-newsroom transition-colors"
            >
              {allLabel}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* News desk list */}
        <div ref={containerRef} className="relative">
          <ol className="divide-y divide-rule border-t border-rule">
            {items.map((story, idx) => (
              <li key={story.id}>
                <Link
                  href={localeHref(`/articles/${story.slug}`, locale)}
                  className="group grid grid-cols-12 gap-4 py-6 sm:py-8 hover:bg-paper/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Date */}
                  <div className="col-span-12 sm:col-span-3 lg:col-span-2">
                    <span className="font-serif text-base sm:text-lg text-ink font-semibold tabular-nums">
                      {story.publishedLabel[locale]}
                    </span>
                  </div>

                  {/* Category */}
                  <div className="col-span-12 sm:col-span-3 lg:col-span-2">
                    <span className="editorial-eyebrow text-newsroom">
                      {story.category[locale]}
                    </span>
                  </div>

                  {/* Headline + publication */}
                  <div className="col-span-12 sm:col-span-6 lg:col-span-7">
                    <h3
                      className="font-serif text-ink leading-tight tracking-[-0.01em] group-hover:text-newsroom transition-colors"
                      style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
                    >
                      {story.title[locale]}
                    </h3>
                    <p className="text-xs text-ink-muted mt-2">
                      {story.publication[locale]}
                      {story.readingTime && (
                        <>
                          <span aria-hidden="true"> · </span>
                          {story.readingTime[locale]}
                        </>
                      )}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="hidden lg:flex col-span-1 items-center justify-end">
                    <ArrowRight
                      className="h-5 w-5 text-ink-muted transition-all duration-300 group-hover:translate-x-2 group-hover:text-newsroom"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ol>

          {/* Floating thumbnail preview — desktop only */}
          {hoveredIdx !== null && (
            <div
              className="hidden lg:block fixed pointer-events-none z-30 transition-opacity duration-200"
              style={{
                left: mousePos.x + 24,
                top: mousePos.y - 80,
              }}
            >
              <div className="w-64 aspect-[4/3] border border-rule shadow-2xl overflow-hidden">
                <StoryImagePlaceholder
                  ratio="4/3"
                  alt={items[hoveredIdx].heroAlt[locale]}
                  src={items[hoveredIdx].heroImage}
                  className="!border-0"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
