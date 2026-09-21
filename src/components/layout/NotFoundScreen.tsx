"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/language-context";
import type { Locale } from "@/content/types";

const emptySubscribe = () => () => {};
const getTrue = () => true;
const getFalse = () => false;

/**
 * Branded 404 screen. Locale comes from the language preference store
 * (instant — same mechanism as the rest of the site).
 */
export function NotFoundScreen() {
  const { language: stored } = useLanguage();
  const hydrated = useSyncExternalStore(emptySubscribe, getTrue, getFalse);
  const locale: Locale = hydrated ? stored : "en";

  const L = {
    error: locale === "en" ? "Error 404" : "ত্রুটি ৪০৪",
    title: locale === "en" ? "This page couldn't be found." : "পৃষ্ঠাটি খুঁজে পাওয়া গেল না।",
    desc: locale === "en"
      ? "The page you were looking for may have moved, been renamed, or never existed."
      : "আপনি যে পৃষ্ঠাটি খুঁজছিলেন — সেটি হয়তো সরিয়ে ফেলা হয়েছে, নাম বদলেছে, কিংবা আগে কখনো ছিলই না।",
    home: locale === "en" ? "Return to homepage" : "হোমপেজে ফিরুন",
    browse: locale === "en" ? "Browse reporting" : "প্রতিবেদন দেখুন",
  };

  return (
    <section className="pt-16 lg:pt-24 pb-20 min-h-[60vh] flex items-center">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 text-center">
        <p className="editorial-eyebrow text-newsroom">{L.error}</p>
        <p className="mt-6 font-serif font-bold text-ink leading-none tracking-[-0.04em]" style={{ fontSize: "clamp(5rem, 18vw, 14rem)" }}>
          404
        </p>
        <h1 className="mt-4 font-serif text-2xl sm:text-3xl text-ink leading-tight">{L.title}</h1>
        <p className="mt-3 text-base text-ink-soft max-w-md mx-auto">{L.desc}</p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={`/${locale}`} className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-ink text-paper text-sm font-semibold hover:bg-newsroom transition-colors">
            {L.home}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link href={`/${locale}/work`} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-ink text-ink text-sm font-semibold hover:bg-ink hover:text-paper transition-colors">
            {L.browse}
          </Link>
        </div>
      </div>
    </section>
  );
}
