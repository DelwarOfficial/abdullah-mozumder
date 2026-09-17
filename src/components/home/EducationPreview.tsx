import { Container } from "@/components/ui-editorial/Container";
import { SectionHeading } from "@/components/ui-editorial/SectionHeading";
import { education } from "@/content/education";

export function EducationPreview() {
  return (
    <section
      aria-labelledby="education-heading"
      className="py-16 sm:py-24 border-t border-rule"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Education"
              title={<span id="education-heading">Academic background</span>}
              as="h2"
            />
          </div>

          <div className="lg:col-span-8">
            <ul className="space-y-8">
              {education.map((edu) => (
                <li
                  key={edu.id}
                  className="grid grid-cols-12 gap-4 pb-8 border-b border-rule-soft last:border-b-0"
                >
                  <div className="col-span-12 sm:col-span-3">
                    <span className="font-serif text-3xl text-newsroom font-semibold">
                      {edu.year}
                    </span>
                  </div>
                  <div className="col-span-12 sm:col-span-9">
                    <h3 className="font-serif text-xl font-semibold text-ink">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-sm text-ink-soft mt-1">{edu.institution}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
