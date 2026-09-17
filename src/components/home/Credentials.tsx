import { Container } from "@/components/ui-editorial/Container";
import { SectionHeading } from "@/components/ui-editorial/SectionHeading";
import { memberships } from "@/content/memberships";

export function Credentials() {
  return (
    <section
      aria-labelledby="credentials-heading"
      className="py-16 sm:py-24 border-t border-rule"
    >
      <Container size="wide">
        <SectionHeading
          eyebrow="Credentials"
          title={<span id="credentials-heading">Professional memberships</span>}
          description="Affiliations with national journalism organizations in Bangladesh."
          as="h2"
        />

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-rule border border-rule">
          {memberships.map((m) => (
            <li
              key={m.id}
              className="bg-paper p-8 sm:p-10 flex flex-col gap-2"
            >
              <span className="editorial-eyebrow text-newsroom">
                {m.shortName ?? m.organization}
              </span>
              <h3 className="font-serif text-2xl font-semibold text-ink mt-2">
                {m.organization}
              </h3>
              <p className="text-sm text-ink-soft mt-1">{m.role}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
