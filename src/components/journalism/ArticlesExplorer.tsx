"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Container } from "@/components/ui-editorial/Container";
import { Eyebrow } from "@/components/ui-editorial/Eyebrow";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { stories, storyCategories, getStoryYears, getStoryPublications } from "@/content/stories";

export function ArticlesExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [year, setYear] = useState<string>("All");
  const [publication, setPublication] = useState<string>("All");

  const years = useMemo(() => getStoryYears(), []);
  const publications = useMemo(() => getStoryPublications(), []);

  const filtered = useMemo(() => {
    return stories
      .filter((s) => {
        if (category !== "All" && s.category !== category) return false;
        if (year !== "All" && new Date(s.publishedAt).getFullYear().toString() !== year) return false;
        if (publication !== "All" && s.publication !== publication) return false;
        if (query.trim()) {
          const q = query.toLowerCase();
          const haystack = `${s.title} ${s.deck} ${s.summary} ${s.tags.join(" ")} ${s.publication}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [query, category, year, publication]);

  const reset = () => {
    setQuery("");
    setCategory("All");
    setYear("All");
    setPublication("All");
  };

  const hasFilters = query.trim() || category !== "All" || year !== "All" || publication !== "All";

  return (
    <Container size="wide" className="py-12 sm:py-16">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Articles" },
        ]}
      />

      <div className="mt-10 max-w-3xl">
        <Eyebrow>Articles</Eyebrow>
        <h1 className="mt-4 font-serif font-semibold text-ink text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em]">
          Articles
        </h1>
        <p className="mt-5 text-lg text-ink-soft leading-relaxed">
          A compact text-first index of articles, interviews and features.
          Filter or search to narrow the list.
        </p>
      </div>

      {/* Filter / search bar */}
      <div className="mt-10 border-y border-rule py-6 grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-6">
          <label htmlFor="articles-search" className="editorial-eyebrow block mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted pointer-events-none" aria-hidden="true" />
            <input
              id="articles-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search headlines, summaries, tags…"
              className="w-full bg-transparent border border-rule pl-9 pr-3 py-2 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-ink transition-colors"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="art-cat" className="editorial-eyebrow block mb-2">Category</label>
          <select
            id="art-cat"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink"
          >
            {storyCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="art-year" className="editorial-eyebrow block mb-2">Year</label>
          <select
            id="art-year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink"
          >
            <option value="All">All</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="art-pub" className="editorial-eyebrow block mb-2">Publication</label>
          <select
            id="art-pub"
            value={publication}
            onChange={(e) => setPublication(e.target.value)}
            className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink"
          >
            <option value="All">All</option>
            {publications.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {hasFilters && (
        <div className="mt-4 flex items-center gap-3">
          <span className="text-xs text-ink-muted">
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          </span>
          <button
            type="button"
            onClick={reset}
            className="text-xs text-newsroom hover:text-newsroom-deep underline underline-offset-2 transition-colors"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* List */}
      <ol className="mt-8 divide-y divide-rule">
        {filtered.length === 0 ? (
          <li className="py-20 text-center">
            <p className="font-serif text-2xl text-ink">No articles match.</p>
            <p className="mt-2 text-sm text-ink-muted">Try adjusting or resetting filters.</p>
          </li>
        ) : (
          filtered.map((story) => (
            <li key={story.id}>
              <Link
                href={`/articles/${story.slug}`}
                className="group grid grid-cols-12 gap-4 py-6 hover:bg-paper-deep/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <div className="col-span-12 sm:col-span-2">
                  <span className="editorial-meta text-ink-muted">
                    {story.publishedLabel}
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-8">
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="editorial-meta text-newsroom">{story.category}</span>
                    <span className="text-xs text-ink-muted">{story.publication}</span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl text-ink leading-tight tracking-[-0.01em] group-hover:text-newsroom transition-colors">
                    {story.title}
                  </h2>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed line-clamp-2">
                    {story.summary}
                  </p>
                  {story.readingTime && (
                    <span className="text-xs text-ink-muted mt-2 inline-block">
                      {story.readingTime}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex col-span-2 items-center justify-end">
                  <ArrowRight
                    className="h-4 w-4 text-ink-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-newsroom"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </li>
          ))
        )}
      </ol>
    </Container>
  );
}
