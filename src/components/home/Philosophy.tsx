import { Container } from "@/components/ui-editorial/Container";

export function Philosophy() {
  return (
    <section
      aria-labelledby="philosophy-heading"
      className="py-20 sm:py-28 border-t border-rule bg-ink text-paper"
    >
      <Container size="wide">
        <div className="max-w-4xl mx-auto text-center">
          <span className="editorial-eyebrow text-paper/60">Approach to Journalism</span>
          <h2
            id="philosophy-heading"
            className="mt-5 font-serif text-[clamp(1.875rem,4vw,3rem)] leading-[1.15] tracking-[-0.015em]"
          >
            Reporting grounded in accuracy, clarity and the public interest.
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                label: "Accuracy",
                body: "Every fact verified before publication. Corrections issued promptly when needed.",
              },
              {
                label: "Clarity",
                body: "Plain language over jargon. Stories structured so readers can follow without effort.",
              },
              {
                label: "Public Interest",
                body: "Reporting that serves the reader — not the powerful. Stories chosen because they matter.",
              },
              {
                label: "Verification",
                body: "Multiple sources. Primary documents. On-the-ground reporting wherever possible.",
              },
            ].map((principle) => (
              <div key={principle.label} className="border-t border-paper/20 pt-4">
                <p className="font-serif text-lg font-semibold text-paper">
                  {principle.label}
                </p>
                <p className="mt-2 text-sm text-paper/70 leading-relaxed">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-xs text-paper/50 italic max-w-xl mx-auto">
            Editorial copy describing the website&apos;s journalism principles.
            Not a direct quote attributed to the journalist.
          </p>
        </div>
      </Container>
    </section>
  );
}
