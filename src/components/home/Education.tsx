import { education } from "@/content/education";
import { localeDigits } from "@/lib/format";
import type { Locale } from "@/content/types";

interface EducationProps {
  locale: Locale;
}

export function Education({ locale }: EducationProps) {
  const chapterLabel = locale === "en" ? "Education" : "শিক্ষাজীবন";
  const sectionTitle = locale === "en" ? "Academic Background" : "শিক্ষাজীবন";

  return (
    <section aria-labelledby="education-heading" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
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
                    {localeDigits(edu.year, locale)}
                  </span>
                </div>

                {/* Degree */}
                <div className="col-span-12 lg:col-span-6">
                  <h3
                    className="font-serif font-bold text-ink leading-[1.1] tracking-[-0.015em]"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                  >
                    {edu.degree[locale]}
                  </h3>
                  <p
                    className="mt-3 font-serif text-ink-soft italic"
                    style={{ fontSize: "clamp(1.0625rem, 1.4vw, 1.375rem)" }}
                  >
                    {locale === "en" ? `in ${edu.field.en}` : `${edu.field.bn} বিষয়ে`}
                  </p>
                </div>

                {/* Institution */}
                <div className="col-span-12 lg:col-span-3 lg:text-right">
                  <p
                    className="font-serif text-ink font-medium"
                    style={{ fontSize: "clamp(1rem, 1.2vw, 1.1875rem)" }}
                  >
                    {edu.institution[locale]}
                  </p>
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
