import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";
import { profile } from "@/content/profile";
import { sectionLabels } from "@/i18n/ui";

import type { Locale } from "@/content/types";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative bg-night text-paper min-h-[88svh] flex flex-col overflow-hidden"
    >
      {/* Ghost background typography */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="font-serif font-bold text-paper/[0.04] leading-none tracking-[-0.05em]"
          style={{ fontSize: "clamp(12rem, 35vw, 32rem)" }}
        >
          AM
        </span>
      </div>

      {/* Top bar — wordmark + language (handled by fixed header, this is spacing) */}
      <div className="h-16 lg:h-20 shrink-0" aria-hidden="true" />

      {/* Main hero grid */}
      <div className="relative flex-1 flex flex-col justify-between px-5 sm:px-8 lg:px-12 pb-8">
        <div className="mx-auto w-full max-w-[1560px] flex-1 flex flex-col justify-center py-8 lg:py-12">
          {/* 12-column grid */}
          <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-8 items-start">
            {/* Left — eyebrow + name */}
            <div className="col-span-12 lg:col-span-7 xl:col-span-8">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6 lg:mb-10">
                <span className="editorial-eyebrow text-paper/60">
                  {sectionLabels.journalist[locale]} · {profile.location[locale]}
                </span>
                <span className="h-px flex-1 max-w-[120px] bg-paper/20" aria-hidden="true" />
              </div>

              {/* Oversized headline */}
              <h1
                id="hero-heading"
                className="display-headline text-paper"
                style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}
              >
                {locale === "en" ? (
                  <>
                    <span className="block">Reporting</span>
                    <span className="block">stories</span>
                    <span className="block italic font-normal text-newsroom">that matter.</span>
                  </>
                ) : (
                  <>
                    <span className="block">যে গল্প</span>
                    <span className="block italic font-normal text-newsroom">জানা জরুরি।</span>
                  </>
                )}
              </h1>

              {/* Name + title */}
              <div className="mt-8 lg:mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-paper">
                  {profile.name[locale]}
                </span>
                <span className="h-3 w-px bg-paper/30" aria-hidden="true" />
                <span
                  className="text-paper/70 font-medium"
                  style={{ fontSize: "clamp(0.9375rem, 1.1vw, 1.125rem)" }}
                >
                  {profile.title[locale]}
                </span>
              </div>
            </div>

            {/* Right — portrait frame */}
            <div className="col-span-12 lg:col-span-5 xl:col-span-4 lg:flex lg:justify-end">
              <HeroPortrait locale={locale} />
            </div>
          </div>
        </div>

        {/* Bottom bar — current position + CTA + scroll hint */}
        <div className="relative mx-auto w-full max-w-[1560px] border-t border-paper/15 pt-6">
          <div className="grid grid-cols-12 gap-4 items-end">
            {/* Current position */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <p className="editorial-eyebrow text-paper/50 mb-2">
                {locale === "en" ? "01 / Current" : "০১ / বর্তমান"}
              </p>
              <p
                className="font-serif font-semibold text-paper leading-tight"
                style={{ fontSize: "clamp(1.0625rem, 1.4vw, 1.375rem)" }}
              >
                {profile.currentPosition.role[locale]}
              </p>
              <p
                className="text-paper/60 mt-1"
                style={{ fontSize: "clamp(0.9375rem, 1.1vw, 1.0625rem)" }}
              >
                {profile.currentPosition.organization[locale]}
              </p>
            </div>

            {/* CTA */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-4 lg:text-center">
              <Link
                href={`/work`}
                className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-paper hover:text-newsroom transition-colors"
              >
                {locale === "en" ? "Selected Reporting" : "নির্বাচিত প্রতিবেদন দেখুন"}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Scroll hint */}
            <div className="col-span-12 lg:col-span-4 lg:text-right hidden lg:flex items-end justify-end gap-2 text-paper/50">
              <span className="editorial-eyebrow">
                {locale === "en" ? "Scroll" : "নিচে দেখুন"}
              </span>
              <ArrowDown className="h-4 w-4 animate-scroll-hint" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPortrait({ locale }: { locale: Locale }) {
  return (
    <div
      className="relative aspect-[4/5] w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px] xl:max-w-[380px] mx-auto lg:mx-0 border border-paper/20 bg-paper/5 flex flex-col items-center justify-center overflow-hidden"
      role="img"
      aria-label={profile.portraitAlt[locale]}
    >
      {/* Inner frame */}
      <div
        className="absolute inset-3 border border-paper/10 pointer-events-none z-10"
        aria-hidden="true"
      />

      {profile.portrait ? (
        <Image
          src={profile.portrait}
          alt={profile.portraitAlt[locale]}
          fill
          priority
          sizes="(min-width: 1280px) 380px, (min-width: 1024px) 340px, (min-width: 640px) 320px, 280px"
          className="object-cover"
        />
      ) : (
        <>
          {/* Large initials */}
          <span
            className="font-serif font-bold text-paper/20 leading-none"
            style={{ fontSize: "clamp(4rem, 12vw, 8rem)" }}
          >
            AM
          </span>

          {/* Label */}
          <div className="absolute bottom-6 left-6 right-6 text-center">
            <p className="editorial-eyebrow text-paper/40">
              {locale === "en" ? "Portrait" : "ছবি"}
            </p>
            <p className="text-xs text-paper/60 mt-1 font-medium uppercase tracking-[0.14em]">
              {locale === "en" ? "To be added" : "শীঘ্রই যোগ হবে"}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
