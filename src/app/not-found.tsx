import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui-editorial/Container";
import { Eyebrow } from "@/components/ui-editorial/Eyebrow";

export default function NotFound() {
  return (
    <section className="py-20 sm:py-32 min-h-[60vh] flex items-center">
      <Container size="wide" className="text-center">
        <Eyebrow withDot={false}>Error 404</Eyebrow>
        <p className="mt-6 font-serif font-semibold text-ink text-[clamp(5rem,18vw,12rem)] leading-none tracking-[-0.04em]">
          404
        </p>
        <h1 className="mt-4 font-serif text-2xl sm:text-3xl text-ink leading-tight">
          This story couldn&apos;t be found.
        </h1>
        <p className="mt-3 text-base text-ink-soft max-w-md mx-auto">
          The page you were looking for may have moved, been renamed, or never
          existed. Return to the homepage or browse selected reporting.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-ink text-paper text-sm font-semibold uppercase tracking-[0.14em] hover:bg-newsroom transition-colors"
          >
            Return to homepage
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-ink text-ink text-sm font-semibold uppercase tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors"
          >
            Browse reporting
          </Link>
        </div>
      </Container>
    </section>
  );
}
