"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { stories, storyCategories, getStoryYears, getStoryPublications } from "@/content/stories";
import type { Locale } from "@/content/types";

interface ArticlesExplorerProps {
  locale: Locale;
}

export function ArticlesExplorer({ locale }: ArticlesExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");
  const [publication, setPublication] = useState("All");

  const years = useMemo(() => getStoryYears(), []);
  const publications = useMemo(() => getStoryPublications(locale), [locale]);
  const categories = storyCategories[locale];

  const filtered = useMemo(() => {
    return stories
      .filter((s) => {
        if (category !== "All" && s.category[locale] !== category) return false;
        if (year !== "All" && new Date(s.publishedAt).getFullYear().toString() !== year) return false;
        if (publication !== "All" && s.publication[locale] !== publication) return false;
        if (query.trim()) {
          const q = query.toLowerCase();
          const haystack = `${s.title[locale]} ${s.deck[locale]} ${s.summary[locale]} ${s.tags.join(" ")} ${s.publication[locale]}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [query, category, year, publication, locale]);

  const reset = () => { setQuery(""); setCategory("All"); setYear("All"); setPublication("All"); };
  const hasFilters = query.trim() || category !== "All" || year !== "All" || publication !== "All";

  const L = {
    chapter: locale === "en" ? "Latest" : "সাম্প্রতিক",
    title: locale === "en" ? "Articles" : "প্রতিবেদন",
    desc: locale === "en" ? "A text-first index of articles, interviews and features." : "প্রতিবেদন, সাক্ষাৎকার ও ফিচারের তালিকা।",
    search: locale === "en" ? "Search" : "অনুসন্ধান",
    searchPh: locale === "en" ? "Search headlines, summaries…" : "শিরোনাম, সারসংক্ষেপ…",
    cat: locale === "en" ? "Category" : "বিভাগ",
    yr: locale === "en" ? "Year" : "বছর",
    pub: locale === "en" ? "Publication" : "প্রকাশনা",
    all: locale === "en" ? "All" : "সব",
    noMatch: locale === "en" ? "No articles match." : "কোনো প্রতিবেদন পাওয়া যায়নি।",
    tryAdj: locale === "en" ? "Try adjusting or resetting filters." : "ফিল্টার পরিবর্তন করুন বা রিসেট করুন।",
    reset: locale === "en" ? "Reset filters" : "ফিল্টার রিসেট",
  };

  return (
    <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12 pt-24 lg:pt-32 pb-16 lg:pb-24">
      <ChapterMark number="02" label={L.chapter} locale={locale} className="mb-6" />
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
        <div className="md:col-span-2"><label htmlFor="art-cat" className="editorial-eyebrow block mb-2">{L.cat}</label><select id="art-cat" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink">{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
        <div className="md:col-span-2"><label htmlFor="art-yr" className="editorial-eyebrow block mb-2">{L.yr}</label><select id="art-yr" value={year} onChange={(e) => setYear(e.target.value)} className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink"><option value="All">{L.all}</option>{years.map((y) => <option key={y} value={y}>{y}</option>)}</select></div>
        <div className="md:col-span-2"><label htmlFor="art-pb" className="editorial-eyebrow block mb-2">{L.pub}</label><select id="art-pb" value={publication} onChange={(e) => setPublication(e.target.value)} className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink"><option value="All">{L.all}</option>{publications.map((p) => <option key={p} value={p}>{p}</option>)}</select></div>
      </div>

      {hasFilters && <div className="mt-4 flex items-center gap-3"><span className="text-xs text-ink-muted">{filtered.length} {locale === "en" ? (filtered.length === 1 ? "article" : "articles") : "প্রতিবেদন"}</span><button type="button" onClick={reset} className="text-xs text-newsroom hover:text-newsroom-deep underline underline-offset-2 transition-colors">{L.reset}</button></div>}

      <ol className="mt-8 divide-y divide-rule border-t border-rule">
        {filtered.length === 0 ? (
          <li className="py-20 text-center"><p className="font-serif text-2xl text-ink">{L.noMatch}</p><p className="mt-2 text-sm text-ink-muted">{L.tryAdj}</p></li>
        ) : (
          filtered.map((story) => (
            <li key={story.id}>
              <Link href={`/${locale}/articles/${story.slug}`} className="group grid grid-cols-12 gap-4 py-6 hover:bg-paper-deep/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                <div className="col-span-12 sm:col-span-2"><span className="editorial-meta text-ink-muted">{story.publishedLabel[locale]}</span></div>
                <div className="col-span-12 sm:col-span-8">
                  <div className="flex items-baseline gap-3 mb-1.5"><span className="editorial-eyebrow text-newsroom">{story.category[locale]}</span><span className="text-xs text-ink-muted">{story.publication[locale]}</span></div>
                  <h2 className="font-serif text-xl sm:text-2xl text-ink leading-tight tracking-[-0.01em] group-hover:text-newsroom transition-colors">{story.title[locale]}</h2>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed line-clamp-2">{story.summary[locale]}</p>
                  {story.readingTime && <span className="text-xs text-ink-muted mt-2 inline-block">{story.readingTime[locale]}</span>}
                </div>
                <div className="hidden sm:flex col-span-2 items-center justify-end"><ArrowRight className="h-4 w-4 text-ink-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-newsroom" aria-hidden="true" /></div>
              </Link>
            </li>
          ))
        )}
      </ol>
    </div>
  );
}
