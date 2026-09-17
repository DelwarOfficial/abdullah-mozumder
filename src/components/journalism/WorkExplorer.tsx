"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { StoryImagePlaceholder } from "@/components/journalism/StoryImagePlaceholder";
import { stories, storyCategories, getStoryYears, getStoryPublications } from "@/content/stories";
import { cn } from "@/lib/utils";
import type { Locale } from "@/content/types";

interface WorkExplorerProps {
  locale: Locale;
}

export function WorkExplorer({ locale }: WorkExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  const activeCategory = searchParams.get("category") ?? "All";
  const activeYear = searchParams.get("year") ?? "All";
  const activePublication = searchParams.get("publication") ?? "All";

  const years = useMemo(() => getStoryYears(), []);
  const publications = useMemo(() => getStoryPublications(locale), [locale]);
  const categories = storyCategories[locale];

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "All" || !value) params.delete(key);
      else params.set(key, value);
      const qs = params.toString();
      router.push(qs ? `/${locale}/work?${qs}` : `/${locale}/work`, { scroll: false });
    },
    [router, searchParams, locale],
  );

  const resetFilters = useCallback(() => {
    setQuery("");
    router.push(`/${locale}/work`, { scroll: false });
  }, [router, locale]);

  const filtered = useMemo(() => {
    return stories.filter((s) => {
      if (activeCategory !== "All" && s.category[locale] !== activeCategory) return false;
      if (activeYear !== "All" && new Date(s.publishedAt).getFullYear().toString() !== activeYear) return false;
      if (activePublication !== "All" && s.publication[locale] !== activePublication) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const haystack = `${s.title[locale]} ${s.deck[locale]} ${s.summary[locale]} ${s.tags.join(" ")} ${s.publication[locale]}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [activeCategory, activeYear, activePublication, query, locale]);

  const hasFilters = activeCategory !== "All" || activeYear !== "All" || activePublication !== "All" || query.trim().length > 0;

  const labels = {
    chapter: locale === "en" ? "Selected Reporting" : "নির্বাচিত প্রতিবেদন",
    title: locale === "en" ? "Work" : "কাজ",
    desc: locale === "en" ? "Reporting, features, interviews and multimedia. Filter by category, year or publication." : "প্রতিবেদন, ফিচার, সাক্ষাৎকার ও মাল্টিমিডিয়া। বিভাগ, বছর বা প্রকাশনা অনুযায়ী ফিল্টার করুন।",
    search: locale === "en" ? "Search" : "অনুসন্ধান",
    searchPh: locale === "en" ? "Headlines, summaries, tags…" : "শিরোনাম, সারসংক্ষেপ, ট্যাগ…",
    category: locale === "en" ? "Category" : "বিভাগ",
    year: locale === "en" ? "Year" : "বছর",
    pub: locale === "en" ? "Publication" : "প্রকাশনা",
    results: (n: number) => `${n} ${n === 1 ? (locale === "en" ? "story" : "প্রতিবেদন") : (locale === "en" ? "stories" : "প্রতিবেদন")}`,
    reset: locale === "en" ? "Reset all" : "সব রিসেট",
    noResults: locale === "en" ? "No stories match the current filters." : "বর্তমান ফিল্টারে কোনো প্রতিবেদন নেই।",
    tryReset: locale === "en" ? "Try removing a filter or resetting all filters." : "একটি ফিল্টার সরান বা সব রিসেট করুন।",
    resetBtn: locale === "en" ? "Reset filters" : "ফিল্টার রিসেট",
  };

  return (
    <>
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12 pt-24 lg:pt-32 pb-16 lg:pb-24">
        <ChapterMark number="01" label={labels.chapter} locale={locale} className="mb-6" />
        <h1 className="section-headline text-ink mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>{labels.title}</h1>
        <p className="text-lg text-ink-soft leading-relaxed max-w-2xl mb-12">{labels.desc}</p>

        {/* Filter bar */}
        <div className="border-t border-b border-rule py-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5">
            <label htmlFor="work-search" className="editorial-eyebrow block mb-2">{labels.search}</label>
            <input id="work-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={labels.searchPh} className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-ink transition-colors" />
          </div>
          <div className="lg:col-span-3">
            <label htmlFor="filter-cat" className="editorial-eyebrow block mb-2">{labels.category}</label>
            <select id="filter-cat" value={activeCategory} onChange={(e) => updateParam("category", e.target.value)} className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="lg:col-span-2">
            <label htmlFor="filter-year" className="editorial-eyebrow block mb-2">{labels.year}</label>
            <select id="filter-year" value={activeYear} onChange={(e) => updateParam("year", e.target.value)} className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink">
              <option value="All">{locale === "en" ? "All" : "সব"}</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="lg:col-span-2">
            <label htmlFor="filter-pub" className="editorial-eyebrow block mb-2">{labels.pub}</label>
            <select id="filter-pub" value={activePublication} onChange={(e) => updateParam("publication", e.target.value)} className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink">
              <option value="All">{locale === "en" ? "All" : "সব"}</option>
              {publications.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {hasFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {activeCategory !== "All" && <FilterChip label={`${labels.category}: ${activeCategory}`} onClear={() => updateParam("category", "All")} />}
            {activeYear !== "All" && <FilterChip label={`${labels.year}: ${activeYear}`} onClear={() => updateParam("year", "All")} />}
            {activePublication !== "All" && <FilterChip label={`${labels.pub}: ${activePublication}`} onClear={() => updateParam("publication", "All")} />}
            {query.trim() && <FilterChip label={`"${query}"`} onClear={() => setQuery("")} />}
            <button type="button" onClick={resetFilters} className="text-xs text-ink-muted hover:text-newsroom underline underline-offset-2 transition-colors ml-2">{labels.reset}</button>
          </div>
        )}

        <div className="mt-10">
          <p className="text-xs text-ink-muted mb-6" aria-live="polite">{labels.results(filtered.length)}</p>
          {filtered.length === 0 ? (
            <div className="py-20 text-center border border-rule bg-paper-deep/30">
              <p className="font-serif text-2xl text-ink max-w-md mx-auto">{labels.noResults}</p>
              <p className="mt-2 text-sm text-ink-muted max-w-md mx-auto">{labels.tryReset}</p>
              <button type="button" onClick={resetFilters} className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper text-xs font-semibold uppercase tracking-[0.14em] hover:bg-newsroom transition-colors">{labels.resetBtn}</button>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filtered.map((story) => (
                <li key={story.id}>
                  <article className="group flex flex-col h-full">
                    <Link href={`/${locale}/work/${story.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                      <StoryImagePlaceholder ratio="4/3" alt={story.heroAlt[locale]} src={story.heroImage} className="group-hover:scale-[1.02] transition-transform duration-500 ease-out" />
                      <div className="mt-4 flex items-baseline gap-3 mb-1.5">
                        <span className="editorial-eyebrow text-newsroom">{story.category[locale]}</span>
                        <span className="editorial-eyebrow">{story.publishedLabel[locale]}</span>
                      </div>
                      <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink leading-tight tracking-[-0.01em] group-hover:text-newsroom transition-colors">{story.title[locale]}</h2>
                      <p className="mt-2 text-sm text-ink-soft leading-relaxed line-clamp-3">{story.summary[locale]}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="editorial-meta">{story.publication[locale]}</span>
                        <ArrowRight className="h-4 w-4 text-ink-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-newsroom" aria-hidden="true" />
                      </div>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-rule bg-paper-deep px-3 py-1 text-xs text-ink-soft">
      {label}
      <button type="button" onClick={onClear} aria-label={`Clear filter: ${label}`} className="text-ink-muted hover:text-newsroom transition-colors">
        <X className="h-3 w-3" aria-hidden="true" />
      </button>
    </span>
  );
}
