"use client";

import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { experiences } from "@/content/experiences";
import { sectionLabels } from "@/i18n/ui";
import { localeDigits } from "@/lib/format";
import { useLanguage } from "@/i18n/language-context";
import { cn } from "@/lib/utils";

export function ExperienceContent() {
  const { language } = useLanguage();
  const en = language === "en";

  return (
    <article className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Breadcrumbs items={[
          { label: sectionLabels.home[language], href: "/" },
          { label: en ? "Experience" : "অভিজ্ঞতা" },
        ]} />

        <ChapterMark number="03" label={en ? "Career" : "পেশাগত অভিজ্ঞতা"} locale={language} className="mt-10 mb-6" />
        <h1
          className="section-headline text-ink mb-12 lg:mb-16"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          {en ? "Reporting Experience" : "সাংবাদিকতার অভিজ্ঞতা"}
        </h1>

        <div className="border-t border-ink">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className={cn(
                "grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-4 py-8 sm:py-12 lg:py-16 border-b border-rule",
                exp.current && "bg-paper-deep/30 -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12",
              )}
            >
              <div className="col-span-12 lg:col-span-4">
                <div className="flex items-baseline gap-2 lg:gap-3">
                  <span className={cn("font-serif font-bold tabular-nums leading-none tracking-[-0.02em]", exp.current ? "text-newsroom" : "text-ink")} style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>{localeDigits(exp.startDate, language)}</span>
                  <span className="text-ink-muted font-serif text-2xl sm:text-3xl">—</span>
                  <span className={cn("font-serif font-bold tabular-nums leading-none tracking-[-0.02em]", exp.current ? "text-newsroom" : "text-ink-soft")} style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>{exp.current ? (en ? "Now" : "এখন") : localeDigits(exp.endDate ?? "", language)}</span>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 lg:col-start-6">
                {exp.current && (
                  <span className="inline-block bg-newsroom text-paper text-[0.625rem] uppercase tracking-[0.14em] px-2 py-0.5 font-semibold mb-3">{en ? "Current" : "বর্তমান"}</span>
                )}
                <h2 className="font-serif font-bold text-ink leading-tight tracking-[-0.015em]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>{exp.role[language]}</h2>
                <p className="mt-2 flex flex-wrap items-center gap-3 text-base sm:text-lg text-ink-soft font-medium">
                  {exp.logo && (
                    <span className="inline-flex items-center bg-paper border border-rule px-2 py-1">
                      <img src={exp.logo} alt="" width={112} height={36} className="h-7 w-auto object-contain" aria-hidden="true" />
                    </span>
                  )}
                  {exp.organization[language]}
                </p>
                <p className="mt-1 text-sm text-ink-muted">{exp.location[language]}</p>
                {exp.description ? (
                  <p className="mt-4 text-base text-ink-soft leading-relaxed max-w-2xl">{exp.description[language]}</p>
                ) : (
                  <p className="mt-4 text-sm text-ink-muted italic max-w-2xl">{en ? "Detailed responsibilities for this role have not been supplied. They will be added once verified." : "এই পদের বিস্তারিত দায়িত্ব এখনো সরবরাহ করা হয়নি। যাচাই হওয়ার পর যোগ করা হবে।"}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
