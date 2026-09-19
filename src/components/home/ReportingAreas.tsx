import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { reportingAreas, digitalSkills } from "@/content/reporting-areas";
import type { Locale } from "@/content/types";

interface ReportingAreasProps {
  locale: Locale;
}

export function ReportingAreas({ locale }: ReportingAreasProps) {
  const chapterLabel = locale === "en" ? "Beats" : "প্রতিবেদনের ক্ষেত্র";
  const sectionTitle = locale === "en" ? "Areas of Reporting" : "প্রতিবেদনের ক্ষেত্র";
  const demoLabel = locale === "en" ? "Demo" : "নমুনা";
  const demoNoteTitle = locale === "en" ? "Demo Content" : "নমুনা বিষয়বস্তু";
  const skillsLabel = locale === "en" ? "Digital Skills" : "ডিজিটাল দক্ষতা";
  const disclaimer = locale === "en"
    ? "The CV does not establish specific reporting beats. The labels below are placeholders demonstrating the data architecture. Replace with verified specialties before launch."
    : "সিভিতে নির্দিষ্ট প্রতিবেদনের ক্ষেত্র উল্লেখ নেই। নিচের বিষয়গুলো কাঠামো দেখানোর নমুনা মাত্র — লঞ্চের আগে যাচাই করা তথ্য দিয়ে বসানো হবে।";

  return (
    <section aria-labelledby="areas-heading" className="py-16 sm:py-24 lg:py-32 bg-paper-deep/30">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <ChapterMark number="06" label={chapterLabel} locale={locale} className="mb-8 lg:mb-12" />
        <h2
          id="areas-heading"
          className="section-headline text-ink mb-12 lg:mb-16"
          style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
        >
          {sectionTitle}
        </h2>

        {/* Demo content notice — prominent */}
        <div className="mb-8 border-l-2 border-newsroom bg-newsroom-soft/40 px-5 py-4">
          <p className="editorial-eyebrow text-newsroom mb-1">{demoNoteTitle}</p>
          <p className="body-small text-ink-soft" style={{ fontSize: "0.9375rem", lineHeight: 1.65 }}>
            {disclaimer}
          </p>
        </div>

        {/* Numbered list — substantial, fills width */}
        <div className="border-t border-rule">
          {reportingAreas.map((area, idx) => (
            <div
              key={area.id}
              className="grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-1 py-6 sm:py-7 border-b border-rule group hover:bg-paper/50 transition-colors items-center"
            >
              <div className="col-span-2 lg:col-span-1">
                <span className="font-serif font-bold text-newsroom tabular-nums text-2xl sm:text-3xl">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="col-span-10 lg:col-span-10">
                <h3
                  className="font-serif text-ink font-semibold leading-tight group-hover:text-newsroom transition-colors"
                  style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                >
                  {area.label[locale]}
                </h3>
              </div>
              <div className="col-span-12 lg:col-span-1 lg:text-right">
                {area.isPlaceholder && (
                  <span className="inline-block border border-newsroom/40 text-newsroom text-[0.6875rem] uppercase tracking-[0.14em] px-2 py-0.5 font-semibold">
                    {demoLabel}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Digital skills */}
        <div className="mt-12 pt-8 border-t border-rule">
          <p className="editorial-eyebrow mb-4">{skillsLabel}</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {digitalSkills.map((skill) => (
              <li key={skill.en} className="body-readable text-ink-soft">
                {locale === "en" ? skill.en : skill.bn}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
