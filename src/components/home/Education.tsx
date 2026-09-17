import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { education } from "@/content/education";
import type { Locale } from "@/content/types";

interface EducationProps {
  locale: Locale;
}

export function Education({ locale }: EducationProps) {
  const chapterLabel = locale === "en" ? "Education" : "শিক্ষাজীবন";
  const sectionTitle = locale === "en" ? "Academic Background" : "শিক্ষাজীবন";
  const univLabel = locale === "en" ? "Dhaka" : "ঢাকা";

  return (
    <section aria-labelledby="education-heading" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <ChapterMark number="07" label={chapterLabel} locale={locale} className="mb-8 lg:mb-12" />
        <h2
          id="education-heading"
          className="section-headline text-ink mb-12 lg:mb-20"
          style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
        >
          {sectionTitle}
        </h2>

        <div className="space-y-0">
          {education.map((edu) => (
            <div key={edu.id} className="border-t border-rule py-10 sm:py-12 lg:py-16">
              <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-6 items-start">
                {/* Year */}
                <div className="col-span-12 lg:col-span-3">
                  <span
                    className="font-serif font-bold text-newsroom tabular-nums leading-none tracking-[-0.02em]"
                    style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
                  >
                    {edu.year}
                  </span>
                </div>

                {/* Degree */}
                <div className="col-span-12 lg:col-span-6">
                  <h3
                    className="font-serif font-bold text-ink leading-tight tracking-[-0.015em]"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                  >
                    {edu.degree[locale]}
                  </h3>
                  <p className="mt-2 font-serif text-lg sm:text-xl text-ink-soft italic">
                    {locale === "en" ? "in" : "বিষয়ে"} {edu.field[locale]}
                  </p>
                </div>

                {/* Institution */}
                <div className="col-span-12 lg:col-span-3 lg:text-right">
                  <p className="text-base text-ink font-medium">
                    {edu.institution[locale]}
                  </p>
                  <p className="text-sm text-ink-muted mt-1">{univLabel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-rule" />
      </div>
    </section>
  );
}
