import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui-editorial/Container";
import { SectionHeading } from "@/components/ui-editorial/SectionHeading";
import { experiences } from "@/content/experiences";
import { cn } from "@/lib/utils";

export function ExperiencePreview() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="py-16 sm:py-24 border-t border-rule"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Experience"
              title={<span id="experience-heading">Reporting experience</span>}
              description="A career across national news organizations in Bangladesh."
              as="h2"
            />
            <Link
              href="/experience"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink hover:text-newsroom transition-colors"
            >
              Full timeline
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <div className="lg:col-span-8">
            <ol className="relative border-l border-rule ml-2">
              {experiences.map((exp) => (
                <li key={exp.id} className="relative pb-10 last:pb-0 pl-8">
                  {/* Node */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-[7px] top-1 h-3.5 w-3.5 border-2 border-paper",
                      exp.current ? "bg-newsroom" : "bg-ink",
                    )}
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="editorial-eyebrow">{exp.periodLabel}</span>
                    {exp.current && (
                      <span className="inline-block bg-newsroom text-paper text-[0.625rem] uppercase tracking-[0.14em] px-1.5 py-0.5 font-semibold">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-serif text-xl sm:text-2xl font-semibold text-ink leading-tight">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-ink-soft font-medium mt-1">
                    {exp.organization}
                  </p>
                  <p className="text-xs text-ink-muted mt-1">{exp.location}</p>
                  {exp.description && (
                    <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-xl">
                      {exp.description}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
