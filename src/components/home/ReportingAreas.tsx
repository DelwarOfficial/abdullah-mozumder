import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { reportingAreas, digitalSkills } from "@/content/reporting-areas";
import type { Locale } from "@/content/types";

interface ReportingAreasProps {
  locale: Locale;
}

export function ReportingAreas({ locale }: ReportingAreasProps) {
  const chapterLabel = locale === "en" ? "Beats" : "প্রতিবেদনের ক্ষেত্র";
  const sectionTitle = locale === "en" ? "Areas of Reporting" : "প্রতিবেদনের ক্ষেত্রসমূহ";
  const demoLabel = locale === "en" ? "Demo" : "নমুনা";
  const skillsLabel = locale === "en" ? "Digital Skills" : "ডিজিটাল দক্ষতা";
  const disclaimer = locale === "en"
    ? "The CV does not establish specific reporting beats. The labels above are placeholders demonstrating the data architecture. Replace with verified specialties before launch."
    : "সিভিতে নির্দিষ্ট প্রতিবেদনের ক্ষেত্র উল্লেখ নেই। উপরের লেবেলগুলো তথ্যকাঠামো প্রদর্শনের নমুনা। লঞ্চের আগে যাচাইকৃত বিষয় দিয়ে প্রতিস্থাপন করুন।";

  return (
    <section aria-labelledby="areas-heading" className="py-16 sm:py-24 lg:py-32 bg-paper-deep/30">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <ChapterMark number="06" label={chapterLabel} locale={locale} className="mb-8 lg:mb-12" />
        <h2
          id="areas-heading"
          className="section-headline text-ink mb-12 lg:mb-20"
          style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
        >
          {sectionTitle}
        </h2>

        {/* Numbered list — not chips */}
        <div className="border-t border-rule">
          {reportingAreas.map((area, idx) => (
            <div
              key={area.id}
              className="grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-1 py-5 sm:py-6 border-b border-rule-soft group hover:bg-paper/50 transition-colors"
            >
              <div className="col-span-2 lg:col-span-1">
                <span className="font-serif font-bold text-newsroom tabular-nums text-xl sm:text-2xl">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="col-span-10 lg:col-span-10">
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-ink font-semibold leading-tight group-hover:text-newsroom transition-colors">
                  {area.label[locale]}
                </h3>
              </div>
              <div className="col-span-12 lg:col-span-1 lg:text-right">
                {area.isPlaceholder && (
                  <span className="inline-block border border-newsroom/40 text-newsroom text-[0.625rem] uppercase tracking-[0.14em] px-1.5 py-0.5">
                    {demoLabel}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-ink-muted italic max-w-2xl leading-relaxed">
          {disclaimer}
        </p>

        {/* Digital skills */}
        <div className="mt-12 pt-8 border-t border-rule">
          <p className="editorial-eyebrow mb-4">{skillsLabel}</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {digitalSkills.map((skill) => (
              <li key={skill.en} className="text-base text-ink-soft">
                {locale === "en" ? skill.en : skill.bn}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
