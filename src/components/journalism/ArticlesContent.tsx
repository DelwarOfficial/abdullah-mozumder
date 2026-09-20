"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { stories, storyCategories, getStoryYears, getStoryPublications } from "@/content/stories";
import { formatDate, localeDigits, localeCount } from "@/lib/format";
import { useLanguage } from "@/i18n/language-context";

/**
 * §37 — shareable filtered views: /articles?category=…&year=…&publication=…
 */
export function ArticlesContent() {
  const { language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  const category = searchParams.get("category") ?? "All";
  const year = searchParams.get("year") ?? "All";
  const publication = searchParams.get("publication") ?? "All";

  const years = useMemo(() => getStoryYears(), []);
  const publications = useMemo(() => getStoryPublications(language), [language]);
  const categories = storyCategories[language];

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "All" || !value) params.delete(key);
      else params.set(key, value);
      const qs = params.toString();
      router.push(qs ? `/articles?${qs}` : "/articles", { scroll: false });
    },
    [router, searchParams],
  );

  const reset = useCallback(() => {
    setQuery("");
    router.push("/articles", { scroll: false });
  }, [router]);

  const filtered = useMemo(() => {
    return stories
      .filter((s) => {
        if (category !== "All" && s.category[language] !== category) return false;
        if (year !== "All" && new Date(s.publishedAt).getFullYear().toString() !== year) return false;
        if (publication !== "All" && s.publication[language] !== publication) return false;
        if (query.trim()) {
          const q = query.toLowerCase();
          const haystack = `${s.title[language]} ${s.deck[language]} ${s.summary[language]} ${s.tags.join(" ")} ${s.publication[language]}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [query, category, year, publication, language]);

  const hasFilters = query.trim() || category !== "All" || year !== "All" || publication !== "All";

  const L = {
    chapter: language === "en" ? "Latest" : "সর্বশেষ",
    title: language === "en" ? "Articles" : "লেখা",
    desc: language === "en" ? "A text-first index of articles, interviews and features." : "লেখা, সাক্ষাৎকার ও ফিচারের সূচি।",
    search: language === "en" ? "Search" : "খুঁজুন",
    searchPh: language === "en" ? "Search headlines, summaries…" : "শিরোনাম বা সারসংক্ষেপ লিখুন…",
    cat: language === "en" ? "Category" : "বিভাগ",
    yr: language === "en" ? "Year" : "সাল",
    pub: language === "en" ? "Publication" : "পত্রিকা",
    all: language === "en" ? "All" : "সব",
    noMatch: language === "en" ? "No articles match." : "কোনো লেখা মেলেনি।",
    tryAdj: language === "en" ? "Try adjusting or resetting filters." : "ফিল্টার বদলে দেখুন, অথবা সব মুছুন।",
    reset: language === "en" ? "Reset filters" : "ফিল্টার মুছুন",
    category: language === "en" ? "Category" : "বিভাগ",
    yearL: language === "en" ? "Year" : "সাল",
    pubL: language === "en" ? "Publication" : "পত্রিকা",
  };

  return (
    <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12 pt-24 lg:pt-32 pb-16 lg:pb-24">
      <h1 className="section-headline text-ink mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>{L.title}</h1>
      <p className="text-lg text-ink-soft leading-relaxed max-w-2xl mb-12">{L.desc}</p>

      <div className="border-y border-rule py-6 grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-6">
          <label htmlFor="art-search" className="editorial-eyebrow block mb-2">{L.search}</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted pointer-events-none" aria-hidden="true" />
            <input id="art-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={L.searchPh} className="w-full bg-transparent border border-rule pl-9 pr-3 py-2 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-ink transition-colors" />
          </div>
        </div>
        <div className="md:col-span-2"><label htmlFor="art-cat" className="editorial-eyebrow block mb-2">{L.cat}</label><select id="art-cat" value={category} onChange={(e) => updateParam("category", e.target.value)} className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink">{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
        <div className="md:col-span-2"><label htmlFor="art-yr" className="editorial-eyebrow block mb-2">{L.yr}</label><select id="art-yr" value={year} onChange={(e) => updateParam("year", e.target.value)} className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink"><option value="All">{L.all}</option>{years.map((y) => <option key={y} value={y}>{localeDigits(y, language)}</option>)}</select></div>
        <div className="md:col-span-2"><label htmlFor="art-pb" className="editorial-eyebrow block mb-2">{L.pub}</label><select id="art-pb" value={publication} onChange={(e) => updateParam("publication", e.target.value)} className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink"><option value="All">{L.all}</option>{publications.map((p) => <option key={p} value={p}>{p}</option>)}</select></div>
      </div>

      {hasFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {category !== "All" && <FilterChip label={`${L.category}: ${category}`} onClear={() => updateParam("category", "All")} />}
          {year !== "All" && <FilterChip label={`${L.yearL}: ${year}`} onClear={() => updateParam("year", "All")} />}
          {publication !== "All" && <FilterChip label={`${L.pubL}: ${publication}`} onClear={() => updateParam("publication", "All")} />}
          {query.trim() && <FilterChip label={`"${query}"`} onClear={() => setQuery("")} />}
          <button type="button" onClick={reset} className="text-xs text-newsroom hover:text-newsroom-deep underline underline-offset-2 transition-colors ml-2">{L.reset}</button>
          <span className="text-xs text-ink-muted">{localeCount(filtered.length, language, "articles", "লেখা")}</span>
        </div>
      )}

      <ol className="mt-8 divide-y divide-rule border-t border-rule">
        {filtered.length === 0 ? (
          <li className="py-20 text-center"><p className="font-serif text-2xl text-ink">{L.noMatch}</p><p className="mt-2 text-sm text-ink-muted">{L.tryAdj}</p><button type="button" onClick={reset} className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper text-xs font-semibold hover:bg-newsroom transition-colors">{L.reset}</button></li>
        ) : (
          filtered.map((story) => (
            <li key={story.id}>
              <Link href={`/articles/${story.slug}`} className="group grid grid-cols-12 gap-4 py-6 hover:bg-paper-deep/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                <div className="col-span-12 sm:col-span-2"><span className="editorial-meta text-ink-muted">{formatDate(story.publishedAt, language)}</span></div>
                <div className="col-span-12 sm:col-span-8">
                  <div className="flex items-baseline gap-3 mb-1.5"><span className="editorial-eyebrow text-newsroom">{story.category[language]}</span><span className="text-xs text-ink-muted">{story.publication[language]}</span></div>
                  <h2 className="font-serif text-xl sm:text-2xl text-ink leading-tight tracking-[-0.01em] group-hover:text-newsroom transition-colors">{story.title[language]}</h2>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed line-clamp-2">{story.summary[language]}</p>
                  {story.readingTime && <span className="text-xs text-ink-muted mt-2 inline-block">{story.readingTime[language]}</span>}
                </div>
                <div className="hidden sm:flex col-span-2 items-center justify-end"></div>
              </Link>
            </li>
          ))
        )}
      </ol>
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
