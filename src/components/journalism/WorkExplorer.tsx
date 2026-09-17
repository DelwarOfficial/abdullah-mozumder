"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { Container } from "@/components/ui-editorial/Container";
import { Eyebrow } from "@/components/ui-editorial/Eyebrow";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { StoryImagePlaceholder } from "@/components/journalism/StoryImagePlaceholder";
import { stories, storyCategories, getStoryYears, getStoryPublications } from "@/content/stories";
import { cn } from "@/lib/utils";

export function WorkExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  const activeCategory = searchParams.get("category") ?? "All";
  const activeYear = searchParams.get("year") ?? "All";
  const activePublication = searchParams.get("publication") ?? "All";

  const years = useMemo(() => getStoryYears(), []);
  const publications = useMemo(() => getStoryPublications(), []);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "All" || !value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
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
      if (activeCategory !== "All" && s.category !== activeCategory) return false;
      if (activeYear !== "All" && new Date(s.publishedAt).getFullYear().toString() !== activeYear) return false;
      if (activePublication !== "All" && s.publication !== activePublication) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const haystack = `${s.title} ${s.deck} ${s.summary} ${s.tags.join(" ")} ${s.publication}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [activeCategory, activeYear, activePublication, query]);

  const hasFilters =
    activeCategory !== "All" ||
    activeYear !== "All" ||
    activePublication !== "All" ||
    query.trim().length > 0;

  return (
    <>
      <Container size="wide" className="py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Work" },
          ]}
        />

        <div className="mt-10 max-w-3xl">
          <Eyebrow>Selected Journalism</Eyebrow>
          <h1 className="mt-4 font-serif font-semibold text-ink text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em]">
            Work
          </h1>
          <p className="mt-5 text-lg text-ink-soft leading-relaxed">
            Reporting, features, interviews and multimedia. Filter by category,
            year or publication. Each story links to its detail page.
          </p>
        </div>

        {/* Filter bar */}
        <div className="mt-10 border-t border-b border-rule py-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Search */}
          <div className="lg:col-span-5">
            <label
              htmlFor="work-search"
              className="editorial-eyebrow block mb-2"
            >
              Search
            </label>
            <input
              id="work-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Headlines, summaries, tags, publications…"
              className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-ink transition-colors"
            />
          </div>

          {/* Category */}
          <div className="lg:col-span-3">
            <label
              htmlFor="filter-category"
              className="editorial-eyebrow block mb-2"
            >
              Category
            </label>
            <select
              id="filter-category"
              value={activeCategory}
              onChange={(e) => updateParam("category", e.target.value)}
              className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink transition-colors"
            >
              {storyCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="lg:col-span-2">
            <label
              htmlFor="filter-year"
              className="editorial-eyebrow block mb-2"
            >
              Year
            </label>
            <select
              id="filter-year"
              value={activeYear}
              onChange={(e) => updateParam("year", e.target.value)}
              className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink transition-colors"
            >
              <option value="All">All</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Publication */}
          <div className="lg:col-span-2">
            <label
              htmlFor="filter-pub"
              className="editorial-eyebrow block mb-2"
            >
              Publication
            </label>
            <select
              id="filter-pub"
              value={activePublication}
              onChange={(e) => updateParam("publication", e.target.value)}
              className="w-full bg-transparent border border-rule px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink transition-colors"
            >
              <option value="All">All</option>
              {publications.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {activeCategory !== "All" && (
              <FilterChip label={`Category: ${activeCategory}`} onClear={() => updateParam("category", "All")} />
            )}
            {activeYear !== "All" && (
              <FilterChip label={`Year: ${activeYear}`} onClear={() => updateParam("year", "All")} />
            )}
            {activePublication !== "All" && (
              <FilterChip label={`Publication: ${activePublication}`} onClear={() => updateParam("publication", "All")} />
            )}
            {query.trim() && (
              <FilterChip label={`Search: "${query}"`} onClear={() => setQuery("")} />
            )}
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-ink-muted hover:text-newsroom underline underline-offset-2 transition-colors ml-2"
            >
              Reset all
            </button>
          </div>
        )}

        {/* Results */}
        <div className="mt-10">
          <p className="text-xs text-ink-muted mb-6" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "story" : "stories"}
          </p>

          {filtered.length === 0 ? (
            <EmptyState onReset={resetFilters} />
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filtered.map((story) => (
                <li key={story.id}>
                  <article className="group flex flex-col h-full">
                    <Link
                      href={`/work/${story.slug}`}
                      className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                      <StoryImagePlaceholder
                        ratio="4/3"
                        alt={story.heroAlt}
                        src={story.heroImage}
                        className="group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                      />
                      <Eyebrow className="mt-4">
                        {story.category} · {story.publishedLabel}
                      </Eyebrow>
                      <h2 className="mt-2 font-serif text-xl sm:text-2xl font-semibold text-ink leading-tight tracking-[-0.01em] group-hover:text-newsroom transition-colors">
                        {story.title}
                      </h2>
                      <p className="mt-2 text-sm text-ink-soft leading-relaxed line-clamp-3">
                        {story.summary}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="editorial-meta">{story.publication}</span>
                        <ArrowRight
                          className="h-4 w-4 text-ink-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-newsroom"
                          aria-hidden="true"
                        />
                      </div>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </>
  );
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-rule bg-paper-deep px-3 py-1 text-xs text-ink-soft">
      {label}
      <button
        type="button"
        onClick={onClear}
        aria-label={`Clear filter: ${label}`}
        className="text-ink-muted hover:text-newsroom transition-colors"
      >
        <X className="h-3 w-3" aria-hidden="true" />
      </button>
    </span>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="py-20 text-center border border-rule bg-paper-deep/30">
      <p className="editorial-eyebrow text-newsroom">No results</p>
      <p className="mt-3 font-serif text-2xl text-ink max-w-md mx-auto">
        No stories match the current filters.
      </p>
      <p className="mt-2 text-sm text-ink-muted max-w-md mx-auto">
        Try removing a filter or resetting all filters.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper text-xs font-semibold uppercase tracking-[0.14em] hover:bg-newsroom transition-colors"
      >
        Reset filters
      </button>
    </div>
  );
}
