import type { Metadata } from "next";
import { Container } from "@/components/ui-editorial/Container";
import { SectionHeading } from "@/components/ui-editorial/SectionHeading";
import { Eyebrow } from "@/components/ui-editorial/Eyebrow";
import { Divider } from "@/components/ui-editorial/Divider";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { experiences } from "@/content/experiences";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Experience",
  description: `Career timeline of ${siteConfig.name} — professional reporting experience across national news organizations in Bangladesh.`,
  alternates: { canonical: "/experience" },
  openGraph: {
    title: `Experience — ${siteConfig.name}`,
    description: `Reporting experience across ${experiences.length} news organizations in Bangladesh.`,
    url: `${siteConfig.url}/experience`,
    type: "article",
  },
};

export default function ExperiencePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Experience", url: `${siteConfig.url}/experience` },
        ]}
      />
      <article className="py-12 sm:py-16">
        <Container size="wide">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Experience" },
            ]}
          />

          <div className="mt-10 max-w-3xl">
            <Eyebrow>Experience</Eyebrow>
            <h1
              className="mt-4 font-serif font-semibold text-ink text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em]"
            >
              Reporting experience
            </h1>
            <p className="mt-5 text-lg text-ink-soft leading-relaxed">
              A career across national news organizations in Bangladesh.
              Currently Senior Reporter at {experiences[0]?.organization}.
            </p>
          </div>

          <Divider variant="thick" className="mt-10" />

          {/* Detailed timeline */}
          <ol className="relative border-l border-rule ml-2 mt-4">
            {experiences.map((exp) => (
              <li
                key={exp.id}
                className="relative pb-14 last:pb-0 pl-8 sm:pl-10"
              >
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
                <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight">
                  {exp.role}
                </h2>
                <p className="mt-1 text-base text-ink-soft font-medium">
                  {exp.organization}
                </p>
                <p className="text-sm text-ink-muted mt-1">{exp.location}</p>

                {exp.description ? (
                  <p className="mt-4 text-base text-ink-soft leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>
                ) : (
                  <p className="mt-4 text-sm text-ink-muted italic max-w-2xl">
                    Detailed responsibilities for this role have not been
                    supplied. They will be added once verified.
                  </p>
                )}

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="mt-4 space-y-1.5 text-sm text-ink-soft max-w-2xl">
                    {exp.responsibilities.map((r, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span aria-hidden="true" className="text-newsroom">—</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>

          <div className="mt-12 border-t border-rule pt-8 max-w-2xl">
            <SectionHeading
              eyebrow="Note"
              title="Verifiable experience only"
              description="Entries on this page reflect the journalist's confirmed CV. Roles, organizations and dates are factual. Detailed role descriptions will be added once supplied."
              as="h2"
            />
          </div>
        </Container>
      </article>
    </>
  );
}
