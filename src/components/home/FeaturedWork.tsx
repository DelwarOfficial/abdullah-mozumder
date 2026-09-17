import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui-editorial/Container";
import { SectionHeading } from "@/components/ui-editorial/SectionHeading";
import { Eyebrow } from "@/components/ui-editorial/Eyebrow";
import { StoryImagePlaceholder } from "@/components/journalism/StoryImagePlaceholder";
import { getFeaturedStory, stories } from "@/content/stories";

export function FeaturedWork() {
  const lead = getFeaturedStory();
  if (!lead) return null;

  const secondary = stories.filter((s) => s.id !== lead.id).slice(0, 3);

  return (
    <section aria-labelledby="featured-heading" className="py-16 sm:py-24">
      <Container size="wide">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <SectionHeading
            eyebrow="Selected Work"
            title={<span id="featured-heading">Selected journalism</span>}
            description="A selection of reporting, stories and journalistic work."
            as="h2"
          />
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink hover:text-newsroom transition-colors self-start sm:self-end"
          >
            All work
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {/* Lead story */}
        <article className="group mb-12 sm:mb-16">
          <Link
            href={`/work/${lead.slug}`}
            className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              <div className="lg:col-span-7">
                <StoryImagePlaceholder
                  ratio="3/2"
                  alt={lead.heroAlt}
                  src={lead.heroImage}
                  className="group-hover:scale-[1.015] transition-transform duration-500 ease-out"
                />
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center">
                <Eyebrow>
                  {lead.category} · {lead.publishedLabel}
                </Eyebrow>
                <h3 className="mt-3 font-serif font-semibold text-ink text-[clamp(1.75rem,3.5vw,2.625rem)] leading-[1.1] tracking-[-0.015em]">
                  {lead.title}
                </h3>
                <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
                  {lead.summary}
                </p>
                <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="editorial-meta text-newsroom">{lead.publication}</span>
                  {lead.readingTime && (
                    <>
                      <span aria-hidden="true" className="text-rule">·</span>
                      <span className="editorial-meta">{lead.readingTime}</span>
                    </>
                  )}
                  {lead.isDemo && (
                    <span className="ml-2 inline-block border border-newsroom/40 text-newsroom text-[0.625rem] uppercase tracking-[0.14em] px-1.5 py-0.5">
                      Demo
                    </span>
                  )}
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink group-hover:text-newsroom transition-colors">
                  Read story
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        </article>

        {/* Secondary stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 border-t border-rule pt-10">
          {secondary.map((story) => (
            <article key={story.id} className="group flex flex-col">
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
                <h3 className="mt-2 font-serif text-xl font-semibold text-ink leading-tight tracking-[-0.01em] group-hover:text-newsroom transition-colors">
                  {story.title}
                </h3>
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
          ))}
        </div>
      </Container>
    </section>
  );
}
