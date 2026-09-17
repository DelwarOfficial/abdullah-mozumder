import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui-editorial/Container";
import { siteConfig } from "@/content/site";

export function ContactCTA() {
  return (
    <section
      aria-labelledby="contact-cta-heading"
      className="py-20 sm:py-28 border-t border-rule"
    >
      <Container size="wide">
        <div className="max-w-4xl mx-auto text-center">
          <span className="editorial-eyebrow">Get in touch</span>
          <h2
            id="contact-cta-heading"
            className="mt-5 font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-ink"
          >
            Have a story, collaboration
            <br />
            <span className="italic text-newsroom font-normal">or professional enquiry?</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl mx-auto">
            Reach out for editorial enquiries, story tips, media collaborations,
            speaking engagements or any professional communication.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-ink text-paper text-sm font-semibold uppercase tracking-[0.14em] hover:bg-newsroom transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-ink text-ink text-sm font-semibold uppercase tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
