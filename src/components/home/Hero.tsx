"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { useLanguage } from "@/i18n/language-context";

export function Hero({ locale }: { locale: "en" | "bn" }) {
  const en = locale === "en";

  return (
    <section aria-labelledby="hero-name" className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 pb-14 sm:pt-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Content — 7 cols */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <p className="text-sm font-medium text-newsroom mb-4">
              {en ? "Hello, I'm" : "নমস্কার, আমি"}
            </p>

            <h1
              id="hero-name"
              className="font-bold text-ink tracking-[-0.02em] leading-[1.04]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              {profile.name[locale]}
            </h1>

            <p
              className="mt-3 font-semibold text-ink-soft"
              style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)" }}
            >
              {profile.title[locale]}
            </p>

            <p className="mt-5 text-lg text-ink-muted leading-relaxed max-w-xl">
              {en
                ? "I report for Daily Banijjo Pratidin in Dhaka, covering the stories that matter with accuracy and care."
                : "দৈনিক বাণিজ্য প্রতিদিনের সিনিয়র প্রতিবেদক হিসেবে ঢাকা থেকে নির্ভুলতা ও বস্তুনিষ্ঠতার সঙ্গে গুরুত্বপূর্ণ প্রতিবেদন তুলে ধরি।"}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/work" className="btn btn-primary group">
                {en ? "View my work" : "প্রতিবেদন দেখুন"}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {en ? "Contact me" : "যোগাযোগ করুন"}
              </Link>
            </div>

            {/* Current role */}
            <div className="mt-8 flex items-center gap-2.5 text-sm text-ink-muted">
              <span className="relative inline-flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-newsroom opacity-40" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-newsroom" />
              </span>
              <span>
                {profile.currentPosition.role[locale]}, {profile.currentPosition.organization[locale]}
              </span>
              <span aria-hidden="true">·</span>
              <span>{profile.location[locale]}</span>
            </div>
          </div>

          {/* Portrait — 5 cols, dominant */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative mx-auto lg:mx-0 max-w-[420px] lg:max-w-none">
              {/* restrained accent panel behind portrait */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -right-4 bottom-8 left-8 rounded-2xl bg-newsroom-soft"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-rule shadow-[var(--shadow-card-hover)]">
                <Image
                  src="/image/portrait-hero.png"
                  alt={profile.portraitAlt[locale]}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 420px, 100vw"
                  className="object-cover object-top"
                />
              </div>
              {/* name plate */}
              <div className="absolute -bottom-5 left-6 right-6 sm:left-8 sm:right-auto card-surface px-5 py-3.5">
                <p className="text-sm font-semibold text-ink">{profile.name[locale]}</p>
                <p className="text-xs text-ink-muted mt-0.5">
                  {en ? "Dhaka, Bangladesh" : "ঢাকা, বাংলাদেশ"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
