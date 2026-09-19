import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { experiences } from "@/content/experiences";
import { localeDigits } from "@/lib/format";
import { localeHref } from "@/i18n/config";
import { cn } from "@/lib/utils";
import type { Locale } from "@/content/types";

interface CareerProps {
  locale: Locale;
}

export function Career({ locale }: CareerProps) {
  const chapterLabel = locale === "en" ? "Career" : "পেশাগত অভিজ্ঞতা";
  const sectionTitle = locale === "en" ? "Reporting Experience" : "সাংবাদিকতার অভিজ্ঞতা";
  const fullLabel = locale === "en" ? "Full Timeline" : "সম্পূর্ণ সময়রেখা";
  const nowLabel = locale === "en" ? "Now" : "বর্তমান";

  return (
    <section aria-labelledby="career-heading" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-4 mb-12 lg:mb-20">
          <div className="col-span-12 lg:col-span-8">
            <ChapterMark number="03" label={chapterLabel} locale={locale} />
            <h2
              id="career-heading"
              className="section-headline text-ink mt-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {sectionTitle}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 flex lg:items-end lg:justify-end">
            <Link
              href={localeHref("/experience", locale)}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink hover:text-newsroom transition-colors"
            >
              {fullLabel}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Career entries — oversized dates */}
        <div className="border-t border-rule">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className={cn(
                "grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-4 py-8 sm:py-12 lg:py-16 border-b border-rule",
                exp.current && "bg-paper-deep/30 -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12",
              )}
            >
              {/* Oversized dates */}
              <div className="col-span-12 lg:col-span-4">
                <div className="flex items-baseline gap-2 lg:gap-3">
                  <span
                    className={cn(
                      "font-serif font-bold tabular-nums leading-none tracking-[-0.02em]",
                      exp.current ? "text-newsroom" : "text-ink",
                    )}
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                  >
                    {localeDigits(exp.startDate, locale)}
                  </span>
                  <span className="text-ink-muted font-serif text-2xl sm:text-3xl">—</span>
                  <span
                    className={cn(
                      "font-serif font-bold tabular-nums leading-none tracking-[-0.02em]",
                      exp.current ? "text-newsroom" : "text-ink-soft",
                    )}
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                  >
                    {exp.current ? nowLabel : localeDigits(exp.endDate ?? "", locale)}
                  </span>
                </div>
              </div>

              {/* Role + org */}
              <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                {exp.current && (
                  <span className="inline-block bg-newsroom text-paper text-[0.6875rem] uppercase tracking-[0.14em] px-2 py-1 font-semibold mb-4">
                    {locale === "en" ? "Current" : "বর্তমান"}
                  </span>
                )}
                <h3
                  className="font-serif font-bold text-ink leading-[1.1] tracking-[-0.015em]"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  {exp.role[locale]}
                </h3>
                <p
                  className="font-serif text-ink-soft font-medium mt-3"
                  style={{ fontSize: "clamp(1.0625rem, 1.4vw, 1.375rem)" }}
                >
                  {exp.organization[locale]}
                </p>
                <p className="body-small mt-2 text-ink-muted">{exp.location[locale]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
