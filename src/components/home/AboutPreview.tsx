import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui-editorial/Container";
import { SectionHeading } from "@/components/ui-editorial/SectionHeading";
import { profile } from "@/content/profile";

export function AboutPreview() {
  return (
    <section
      aria-labelledby="about-heading"
      className="py-16 sm:py-24 border-t border-rule bg-paper-deep/30"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="About"
              title={
                <span id="about-heading">
                  A journalist covering
                  <br />
                  <span className="italic text-newsroom font-normal">stories that count.</span>
                </span>
              }
              as="h2"
            />
          </div>

          <div className="lg:col-span-7">
            <div className="max-w-2xl">
              <p className="font-serif text-lg sm:text-xl text-ink leading-relaxed first-letter:font-bold first-letter:text-5xl first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:leading-[0.9] first-letter:mt-1 first-letter:text-newsroom">
                {profile.longBio}
              </p>

              <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <dt className="editorial-eyebrow">Based in</dt>
                  <dd className="mt-1 text-sm text-ink-soft font-medium">
                    {profile.location}
                  </dd>
                </div>
                <div>
                  <dt className="editorial-eyebrow">Languages</dt>
                  <dd className="mt-1 text-sm text-ink-soft font-medium">
                    {profile.languages.join(" / ")}
                  </dd>
                </div>
              </dl>

              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink hover:text-newsroom transition-colors"
              >
                More about Abdullah
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
