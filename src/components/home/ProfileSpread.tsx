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
    : ["একজন সাংবাদিক,", "গুরুত্বপূর্ণ গল্পের", "সন্ধানে।"];
  const ctaLabel = locale === "en" ? "More about Abdullah" : "বিস্তারিত পরিচিতি";

  return (
    <section aria-labelledby="profile-heading" className="py-16 sm:py-24 lg:py-32 bg-paper-deep/30">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <ChapterMark number="04" label={chapterLabel} locale={locale} className="mb-12 lg:mb-20" />

        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-12 gap-y-12">
          {/* Left — heading */}
          <div className="col-span-12 lg:col-span-5">
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

          {/* Center — bio with drop cap, comfortable reading width */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-7">
            <div className="max-w-[52ch]">
              <p
                className="drop-cap font-serif text-ink leading-[1.8]"
                style={{ fontSize: "clamp(1.125rem, 1.4vw, 1.375rem)" }}
              >
                {profile.longBio[locale]}
              </p>
              <div className="mt-10 pt-6 border-t border-rule-soft">
                <Link
                  href={localeHref("/about", locale)}
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink hover:text-newsroom transition-colors"
                >
                  {ctaLabel}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom — sidebar moved to full-width row below */}
          <div className="col-span-12 mt-4">
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-rule pt-8">
              <div>
                <dt className="editorial-eyebrow mb-2">
                  {locale === "en" ? "Current" : "বর্তমানে"}
                </dt>
                <dd className="body-readable font-medium text-ink">
                  {profile.currentPosition.role[locale]}
                </dd>
                <dd className="body-small mt-1">
                  {profile.currentPosition.organization[locale]}
                </dd>
              </div>
              <div>
                <dt className="editorial-eyebrow mb-2">
                  {locale === "en" ? "Based" : "অবস্থান"}
                </dt>
                <dd className="body-readable font-medium text-ink">
                  {profile.location[locale]}
                </dd>
              </div>
              <div>
                <dt className="editorial-eyebrow mb-2">
                  {locale === "en" ? "Languages" : "ভাষা"}
                </dt>
                <dd className="body-readable font-medium text-ink">
                  {profile.languages[locale].join(" / ")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
