"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";
import { sectionLabels } from "@/i18n/ui";
import { useLanguage } from "@/i18n/language-context";

/**
 * §About — two-column: on-assignment photo left, bio + facts right.
 */
export function ProfileSpread({ locale }: { locale: "en" | "bn" }) {
  const en = locale === "en";

  const facts = [
    { label: en ? "Role" : "পদ", value: profile.currentPosition.role[locale] },
    { label: en ? "Organization" : "প্রতিষ্ঠান", value: profile.currentPosition.organization[locale] },
    { label: sectionLabels.location[locale], value: profile.location[locale] },
    { label: sectionLabels.languages[locale], value: profile.languages[locale].join(" / ") },
    { label: en ? "Experience" : "অভিজ্ঞতা", value: en ? "2019 — Present" : "২০১৯ — বর্তমান" },
  ];

  return (
    <section aria-labelledby="about-heading" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Photo */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-rule">
              <Image
                src="/image/on-assignment.png"
                alt={en ? "Abdullah Mozomdar on assignment" : "কাজের মাঠে আবদুল্লাহ মোজুমদার"}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Bio + facts */}
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-newsroom mb-3">
              {en ? "About me" : "আমার সম্পর্কে"}
            </p>
            <h2
              id="about-heading"
              className="section-headline text-ink"
              style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)" }}
            >
              {en
                ? "A journalist covering stories that matter."
                : "যে গল্পগুলো জানা দরকার, সেগুলোই আমার কাজ।"}
            </h2>

            <p className="mt-5 text-lg text-ink-soft leading-relaxed max-w-2xl">
              {profile.shortBio[locale]}
            </p>

            {/* Compact factual details */}
            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 rounded-xl border border-rule bg-card p-6">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-xs font-medium text-ink-muted">{f.label}</dt>
                  <dd className="text-sm font-semibold text-ink mt-0.5">{f.value}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/about"
              className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-newsroom hover:text-newsroom-deep transition-colors"
            >
              {en ? "More about me" : "বিস্তারিত পরিচিতি"}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
