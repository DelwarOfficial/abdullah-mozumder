"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { StoryImagePlaceholder } from "@/components/journalism/StoryImagePlaceholder";
import { stories, storyCategories, getStoryYears, getStoryPublications } from "@/content/stories";
import { cn } from "@/lib/utils";
import { formatDate, localeDigits, localeCount } from "@/lib/format";
import { useLanguage } from "@/i18n/language-context";

export function WorkContent() {
  const { language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  const activeCategory = searchParams.get("category") ?? "All";
  const activeYear = searchParams.get("year") ?? "All";
  const activePublication = searchParams.get("publication") ?? "All";

  const years = useMemo(() => getStoryYears(), []);
  const publications = useMemo(() => getStoryPublications(language), [language]);
  const categories = storyCategories[language];

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "All" || !value) params.delete(key);
      else params.set(key, value);
      const qs = params.toString();
      router.push(qs ? `/work?${qs}` : "/work", { scroll: false });
    },
    [router, searchParams],
  );

  const resetFilters = useCallback(() => {
    setQuery("");
    router.push("/work", { scroll: false });
  }, [router]);

  const filtered = useMemo(() => {
    return stories.filter((s) => {
      if (activeCategory !== "All" && s.category[language] !== activeCategory) return false;
      if (activeYear !== "All" && new Date(s.publishedAt).getFullYear().toString() !== activeYear) return false;
      if (activePublication !== "All" && s.publication[language] !== activePublication) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const haystack = `${s.title[language]} ${s.deck[language]} ${s.summary[language]} ${s.tags.join(" ")} ${s.publication[language]}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [activeCategory, activeYear, activePublication, query, language]);

  const hasFilters = activeCategory !== "All" || activeYear !== "All" || activePublication !== "All" || query.trim().length > 0;

  const labels = {
    chapter: language === "en" ? "Selected Reporting" : "বাছাই করা প্রতিবেদন",
    title: language === "en" ? "Work" : "প্রতিবেদন",
    desc: language === "en" ? "Reporting, features, interviews and multimedia. Filter by category, year or publication." : "প্রতিবেদন, ফিচার, সাক্ষাৎকার ও মাল্টিমিডিয়া — বিভাগ, সাল বা পত্রিকা অনুযায়ী খুঁজুন।",
    search: language === "en" ? "Search" : "খুঁজুন",
    searchPh: language === "en" ? "Headlines, summaries, tags…" : "শিরোনাম, সারসংক্ষেপ বা ট্যাগ লিখুন…",
    category: language === "en" ? "Category" : "বিভাগ",
    year: language === "en" ? "Year" : "সাল",
    pub: language === "en" ? "Publication" : "পত্রিকা",
    results: (n: number) => localeCount(n, language, "stories", "প্রতিবেদন"),
    reset: language === "en" ? "Reset all" : "সব মুছুন",
    noResults: language === "en" ? "No stories match the current filters." : "এই ফিল্টারে কোনো প্রতিবেদন মেলেনি।",
    tryReset: language === "en" ? "Try removing a filter or resetting all filters." : "একটি ফিল্টার বাদ দিয়ে দেখুন, অথবা সব ফিল্টার মুছুন।",
    resetBtn: language === "en" ? "Reset filters" : "ফিল্টার মুছুন",
  };

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 lg:pt-14 pb-16 lg:pb-24">
      <h1 className="section-headline text-ink mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>{labels.title}</h1>
      <p className="text-lg text-ink-soft leading-relaxed max-w-2xl mb-12">{labels.desc}</p>

      {/* Filter bar */}
      <div className="border-t border-b border-rule py-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5">
          <label htmlFor="work-search" className="editorial-eyebrow block mb-2">{labels.search}</label>
          <input id="work-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={labels.searchPh} className="w-full rounded-lg border border-rule bg-card px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-newsroom focus:ring-2 focus:ring-newsroom/20 transition" />
        </div>
        <div className="lg:col-span-3">
          <label htmlFor="filter-cat" className="editorial-eyebrow block mb-2">{labels.category}</label>
          <select id="filter-cat" value={activeCategory} onChange={(e) => updateParam("category", e.target.value)} className="w-full rounded-lg border border-rule bg-card px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-newsroom focus:ring-2 focus:ring-newsroom/20 transition">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="lg:col-span-2">
          <label htmlFor="filter-year" className="editorial-eyebrow block mb-2">{labels.year}</label>
          <select id="filter-year" value={activeYear} onChange={(e) => updateParam("year", e.target.value)} className="w-full rounded-lg border border-rule bg-card px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-newsroom focus:ring-2 focus:ring-newsroom/20 transition">
            <option value="All">{language === "en" ? "All" : "সব"}</option>
            {years.map((y) => <option key={y} value={y}>{localeDigits(y, language)}</option>)}
          </select>
        </div>
        <div className="lg:col-span-2">
          <label htmlFor="filter-pub" className="editorial-eyebrow block mb-2">{labels.pub}</label>
          <select id="filter-pub" value={activePublication} onChange={(e) => updateParam("publication", e.target.value)} className="w-full rounded-lg border border-rule bg-card px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-newsroom focus:ring-2 focus:ring-newsroom/20 transition">
            <option value="All">{language === "en" ? "All" : "সব"}</option>
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
          <div className="py-20 text-center rounded-xl border border-rule bg-card">
            <p className="font-serif text-2xl text-ink max-w-md mx-auto">{labels.noResults}</p>
            <p className="mt-2 text-sm text-ink-muted max-w-md mx-auto">{labels.tryReset}</p>
            <button type="button" onClick={resetFilters} className="btn btn-primary mt-6 !h-10 !px-5 !text-sm">{labels.resetBtn}</button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filtered.map((story) => (
              <li key={story.id}>
                <article className="group card-surface overflow-hidden h-full rounded-[var(--radius)] hover:-translate-y-0.5">
                  <Link href={`/work/${story.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                    <StoryImagePlaceholder ratio="4/3" alt={story.heroAlt[language]} src={story.heroImage} className="!rounded-none !border-0 !shadow-none group-hover:scale-[1.03] transition-transform duration-500" />
                    <div className="mt-4 flex items-baseline gap-3 mb-1.5">
                      <span className="editorial-eyebrow text-newsroom">{story.category[language]}</span>
                      <span className="editorial-eyebrow">{formatDate(story.publishedAt, language)}</span>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink leading-tight tracking-[-0.01em] group-hover:text-newsroom transition-colors">{story.title[language]}</h2>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed line-clamp-3">{story.summary[language]}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="editorial-meta">{story.publication[language]}</span>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
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
