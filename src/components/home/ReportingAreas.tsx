import { Container } from "@/components/ui-editorial/Container";
import { SectionHeading } from "@/components/ui-editorial/SectionHeading";
import { reportingAreas, digitalSkills } from "@/content/reporting-areas";

export function ReportingAreas() {
  return (
    <section
      aria-labelledby="areas-heading"
      className="py-16 sm:py-24 border-t border-rule bg-paper-deep/30"
    >
      <Container size="wide">
        <SectionHeading
          eyebrow="Reporting Areas"
          title={<span id="areas-heading">Areas of reporting</span>}
          description="These labels are editable placeholders. They will be replaced with verified beats once confirmed by the journalist."
          as="h2"
        />

        <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-3">
          {reportingAreas.map((area) => (
            <li
              key={area.id}
              className="inline-flex items-center gap-2 border border-rule bg-paper px-4 py-2 text-sm text-ink-soft"
            >
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 bg-newsroom"
              />
              <span>{area.label}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs text-ink-muted italic max-w-2xl">
          Note: The CV does not establish specific reporting beats. The labels
          above are placeholders demonstrating the data architecture. Replace
          with verified specialties before launch.
        </p>

        <div className="mt-12 pt-8 border-t border-rule">
          <p className="editorial-eyebrow mb-4">Digital Skills</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {digitalSkills.map((skill) => (
              <li key={skill} className="text-sm text-ink-soft">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
