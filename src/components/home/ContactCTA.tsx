import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { siteConfig } from "@/content/site";
import { localeHref } from "@/i18n/config";
import type { Locale } from "@/content/types";

interface ContactCTAProps {
  locale: Locale;
}

export function ContactCTA({ locale }: ContactCTAProps) {
  const chapterLabel = locale === "en" ? "Contact" : "যোগাযোগ";
  const heading = locale === "en"
    ? ["Have a story?", "Let's talk."]
    : ["গল্প আছে?", "কথা বলা যাক।"];
  const ctaLabel = locale === "en" ? "Get in touch" : "যোগাযোগ করুন";
  const desc = locale === "en"
    ? "Reach out for editorial enquiries, story tips, media collaborations, speaking engagements or any professional communication."
    : "সম্পাদকীয় অনুসন্ধান, খবরের ইঙ্গিত, গণমাধ্যম সহযোগিতা, আলোচনা বা যেকোনো পেশাগত যোগাযোগের জন্য।";

  return (
    <section aria-labelledby="contact-heading" className="py-24 sm:py-32 lg:py-48">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <ChapterMark number="09" label={chapterLabel} locale={locale} className="mb-12 lg:mb-20" />

        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-12 gap-y-16">
          {/* Heading — deliberate final editorial statement */}
          <div className="col-span-12 lg:col-span-7">
            <h2
              id="contact-heading"
              className="chapter-title text-ink"
              style={{ fontSize: "clamp(2.75rem, 8vw, 8rem)" }}
            >
              {heading.map((line, i) => (
                <span key={i} className="block">
                  {i === heading.length - 1 ? (
                    <span className="italic font-normal text-newsroom">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h2>
          </div>

          {/* CTA column */}
          <div className="col-span-12 lg:col-span-5 lg:pt-8">
            <p
              className="text-ink-soft leading-[1.75] mb-10 max-w-md"
              style={{ fontSize: "clamp(1.0625rem, 1.3vw, 1.25rem)" }}
            >
              {desc}
            </p>
            <div className="space-y-6">
              <Link
                href={localeHref("/contact", locale)}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-ink text-paper text-sm font-semibold uppercase tracking-[0.14em] hover:bg-newsroom transition-colors duration-300"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
              </Link>
              <div className="pt-6 border-t border-rule">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-ink hover:text-newsroom transition-colors link-underline"
                  style={{ fontSize: "clamp(1rem, 1.2vw, 1.125rem)" }}
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
