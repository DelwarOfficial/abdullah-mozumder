import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { profile } from "@/content/profile";
import { localeHref } from "@/i18n/config";
import type { Locale } from "@/content/types";

interface ProfileSpreadProps {
  locale: Locale;
}

export function ProfileSpread({ locale }: ProfileSpreadProps) {
  const chapterLabel = locale === "en" ? "Profile" : "পরিচিতি";
  const heading = locale === "en"
    ? ["A journalist", "covering", "stories that count."]
    : ["একজন সাংবাদিক", "যিনি তুলে ধরেন", "গুরুত্বপূর্ণ গল্প।"];
  const ctaLabel = locale === "en" ? "More about Abdullah" : "আরও পরিচিতি";

  return (
    <section aria-labelledby="profile-heading" className="py-16 sm:py-24 lg:py-32 bg-paper-deep/30">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <ChapterMark number="04" label={chapterLabel} locale={locale} className="mb-12 lg:mb-20" />

        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-12">
          {/* Left — heading */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-4">
            <h2
              id="profile-heading"
              className="chapter-title text-ink"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
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

          {/* Center — bio with drop cap */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-6">
            <div className="max-w-xl">
              <p className="font-serif text-lg sm:text-xl text-ink leading-[1.7] first-letter:font-bold first-letter:text-[4rem] first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:leading-[0.85] first-letter:mt-1 first-letter:text-newsroom">
                {profile.longBio[locale]}
              </p>
            </div>
          </div>

          {/* Right — sidebar */}
          <div className="col-span-12 lg:col-span-2 xl:col-span-2">
            <dl className="space-y-6 lg:border-l lg:border-rule lg:pl-6">
              <div>
                <dt className="editorial-eyebrow">
                  {locale === "en" ? "Current" : "বর্তমান"}
                </dt>
                <dd className="mt-1 text-sm text-ink-soft font-medium">
                  {profile.currentPosition.role[locale]}
                </dd>
              </div>
              <div>
                <dt className="editorial-eyebrow">
                  {locale === "en" ? "Based" : "অবস্থান"}
                </dt>
                <dd className="mt-1 text-sm text-ink-soft font-medium">
                  {profile.location[locale]}
                </dd>
              </div>
              <div>
                <dt className="editorial-eyebrow">
                  {locale === "en" ? "Languages" : "ভাষা"}
                </dt>
                <dd className="mt-1 text-sm text-ink-soft font-medium">
                  {profile.languages[locale].join(" / ")}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-rule">
          <Link
            href={localeHref("/about", locale)}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink hover:text-newsroom transition-colors"
          >
            {ctaLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
