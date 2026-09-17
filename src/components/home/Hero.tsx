import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui-editorial/Container";
import { Eyebrow } from "@/components/ui-editorial/Eyebrow";
import { profile } from "@/content/profile";
import { siteConfig } from "@/content/site";
import { PortraitPlaceholder } from "@/components/ui-editorial/PortraitPlaceholder";

export function Hero() {
  return (
    <section
      className="relative border-b border-rule"
      aria-labelledby="hero-heading"
    >
      <Container size="wide" className="py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left — copy */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <Eyebrow>
              Journalist · {siteConfig.location}
            </Eyebrow>

            <h1
              id="hero-heading"
              className="display-headline mt-5 text-ink"
            >
              Reporting stories
              <br />
              <span className="text-newsroom italic font-normal">that matter.</span>
            </h1>

            <div className="mt-8 max-w-xl">
              <p className="font-serif text-2xl sm:text-3xl text-ink leading-tight tracking-[-0.01em]">
                {profile.name}
              </p>
              <p className="mt-1.5 text-base text-ink-soft font-medium tracking-wide">
                {profile.title}
              </p>
              <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
                {profile.shortBio}
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/work"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ink text-paper text-sm font-semibold uppercase tracking-[0.14em] hover:bg-newsroom transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                View selected work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-ink text-ink text-sm font-semibold uppercase tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact
              </Link>
            </div>

            {/* Current position */}
            <div className="mt-10 pt-6 border-t border-rule-soft flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
              <span className="editorial-eyebrow">Currently</span>
              <span className="text-sm text-ink font-medium">
                {profile.currentPosition.role}
              </span>
              <span aria-hidden="true" className="text-rule">·</span>
              <span className="text-sm text-ink-soft">
                {profile.currentPosition.organization}
              </span>
              <span aria-hidden="true" className="text-rule">·</span>
              <span className="text-sm text-ink-muted">
                {profile.currentPosition.period}
              </span>
            </div>
          </div>

          {/* Right — portrait */}
          <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end">
            <PortraitPlaceholder
              size="lg"
              label={profile.name}
              alt={profile.portraitAlt}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
