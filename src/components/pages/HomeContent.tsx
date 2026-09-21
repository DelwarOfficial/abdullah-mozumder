"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/language-context";
import { Hero } from "@/components/home/Hero";
import { StatusStrip } from "@/components/home/StatusStrip";
import { ProfileSpread } from "@/components/home/ProfileSpread";
import { SelectedReporting } from "@/components/home/SelectedReporting";
import { NewsDesk } from "@/components/home/NewsDesk";
import { PressClippings } from "@/components/journalism/PressClippings";
import { Career } from "@/components/home/Career";
import { ContactCTA } from "@/components/home/ContactCTA";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";

/**
 * Modern professional home — journalist-first order:
 * Hero → Trust → About → Featured Reports → Latest Work → Published Work
 * → Experience + Credentials → Gallery → Contact CTA
 */
export function HomeContent() {
  const { language } = useLanguage();

  return (
    <>
      <Hero locale={language} />
      <StatusStrip />
      <ProfileSpread locale={language} />
      <SelectedReporting locale={language} />
      <NewsDesk locale={language} />
      <PressClippings />
      <Career locale={language} />
      <GalleryStrip locale={language} />
      <ContactCTA locale={language} />
    </>
  );
}

/** §Gallery — "On Assignment" compact grid with link to full gallery. */
function GalleryStrip({ locale }: { locale: "en" | "bn" }) {
  const en = locale === "en";
  return (
    <section aria-labelledby="gallery-heading" className="py-16 sm:py-20 lg:py-24 bg-paper-deep/50">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium text-newsroom mb-2">{en ? "On assignment" : "মাঠে"}</p>
            <h2 id="gallery-heading" className="section-headline text-ink" style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)" }}>
              {en ? "From the field" : "ফটো গ্যালারি"}
            </h2>
          </div>
          <Link href="/gallery" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-newsroom hover:text-newsroom-deep transition-colors">
            {en ? "View full gallery" : "সম্পূর্ণ গ্যালারি"}
            <ArrowRightSmall />
          </Link>
        </div>
        <GalleryExplorer locale={locale} compact />
      </div>
    </section>
  );
}

function ArrowRightSmall() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
