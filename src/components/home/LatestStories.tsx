import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui-editorial/Container";
import { SectionHeading } from "@/components/ui-editorial/SectionHeading";
import { stories } from "@/content/stories";

export function LatestStories() {
  // Show up to 5 most recent stories (sorted by publishedAt desc).
  const items = [...stories]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 5);

  return (
    <section
      aria-labelledby="latest-heading"
      className="py-16 sm:py-24 border-t border-rule bg-paper-deep/30"
    >
      <Container size="wide">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <SectionHeading
            eyebrow="Latest"
            title={<span id="latest-heading">Latest stories</span>}
            description="A compact editorial list of recent reporting."
            as="h2"
          />
          <Link
            href="/articles"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink hover:text-newsroom transition-colors self-start sm:self-end"
          >
            All articles
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <ol className="divide-y divide-rule">
          {items.map((story) => (
            <li key={story.id}>
              <Link
                href={`/articles/${story.slug}`}
                className="group grid grid-cols-12 gap-4 py-5 hover:bg-paper/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <div className="col-span-3 sm:col-span-2">
                  <span className="editorial-meta text-ink-muted">
                    {story.publishedLabel}
                  </span>
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <span className="editorial-meta text-newsroom">
                    {story.category}
                  </span>
                </div>
                <div className="col-span-6 sm:col-span-7">
                  <h3 className="font-serif text-lg sm:text-xl text-ink leading-tight group-hover:text-newsroom transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs text-ink-muted mt-1">
                    {story.publication}
                    {story.readingTime && (
                      <>
                        <span aria-hidden="true"> · </span>
                        {story.readingTime}
                      </>
                    )}
                  </p>
                </div>
                <div className="hidden sm:flex col-span-1 items-center justify-end">
                  <ArrowRight
                    className="h-4 w-4 text-ink-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-newsroom"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
