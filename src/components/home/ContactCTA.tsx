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
    <section aria-labelledby="contact-heading" className="py-20 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <ChapterMark number="09" label={chapterLabel} locale={locale} className="mb-8 lg:mb-12" />

        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-12">
          {/* Heading */}
          <div className="col-span-12 lg:col-span-8">
            <h2
              id="contact-heading"
              className="chapter-title text-ink"
              style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
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
          <div className="col-span-12 lg:col-span-4 lg:pt-8">
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed mb-8 max-w-sm">
              {desc}
            </p>
            <div className="space-y-4">
              <Link
                href={localeHref("/contact", locale)}
                className="group inline-flex items-center gap-2 px-7 py-4 bg-ink text-paper text-sm font-semibold uppercase tracking-[0.14em] hover:bg-newsroom transition-colors duration-300"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
              </Link>
              <div className="pt-4 border-t border-rule">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-sm text-ink hover:text-newsroom transition-colors link-underline"
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
