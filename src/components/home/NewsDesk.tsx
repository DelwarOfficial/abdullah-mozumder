"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StoryImagePlaceholder } from "@/components/journalism/StoryImagePlaceholder";
import { stories } from "@/content/stories";
import { formatDate } from "@/lib/format";

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

  const chapterLabel = locale === "en" ? "Latest" : "সর্বশেষ";
  const sectionTitle = locale === "en" ? "Latest Reporting" : "সাম্প্রতিক প্রতিবেদন";
  const allLabel = locale === "en" ? "All Articles" : "সব লেখা";

  return (
    <section aria-labelledby="news-desk-heading" className="py-16 sm:py-24 lg:py-32 bg-paper-deep/30">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-4 mb-12 lg:mb-16">
          <div className="col-span-12 lg:col-span-10">
            <h2
              id="news-desk-heading"
              className="section-headline text-ink mt-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {sectionTitle}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-2 flex lg:items-end lg:justify-end">
            <Link
              href={`/articles`}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink hover:text-newsroom transition-colors"
            >
              {allLabel}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* News desk list — headline dominates each row */}
        <div ref={containerRef} className="relative">
          {items.length === 0 ? (
            <p className="border-t border-rule py-16 text-ink-muted body-readable">
              {locale === "en"
                ? "The reporting archive is being prepared. Selected work will appear here."
                : "প্রতিবেদনের সংগ্রহ প্রস্তুত হচ্ছে। বাছাই করা কাজ শিগগিরই এখানে যোগ হবে।"}
            </p>
          ) : (
          <ol className="divide-y divide-rule border-t border-rule">
            {items.map((story, idx) => (
              <li key={story.id}>
                <Link
                  href={`/articles/${story.slug}`}
                  className="group grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-2 py-8 sm:py-10 lg:py-12 hover:bg-paper/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Date + Category — left, small metadata */}
                  <div className="col-span-12 lg:col-span-3 flex flex-col gap-1.5">
                    <span className="editorial-meta text-ink">
                      {formatDate(story.publishedAt, locale)}
                    </span>
                    <span className="editorial-eyebrow text-newsroom">
                      {story.category[locale]}
                    </span>
                  </div>

                  {/* Headline — dominates the row */}
                  <div className="col-span-12 lg:col-span-8">
                    <h3
                      className="font-serif text-ink leading-[1.1] tracking-[-0.015em] group-hover:text-newsroom transition-colors"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                    >
                      {story.title[locale]}
                    </h3>
                    <p className="body-small mt-3 text-ink-muted">
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
          )}

          {/* Floating thumbnail preview — desktop only */}
          {hoveredIdx !== null && (
            <div
              className="hidden lg:block fixed pointer-events-none z-30 transition-opacity duration-200"
              style={{
                left: mousePos.x + 24,
                top: mousePos.y - 80,
              }}
            >
              <div className="w-72 aspect-[4/3] border border-rule shadow-2xl overflow-hidden">
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
