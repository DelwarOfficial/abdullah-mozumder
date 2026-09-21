"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig } from "@/content/site";
import { useLanguage } from "@/i18n/language-context";

/**
 * §Contact CTA — clean branded panel.
 */
export function ContactCTA({ locale }: { locale: "en" | "bn" }) {
  const en = locale === "en";

  return (
    <section aria-labelledby="contact-cta-heading" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-night text-paper">
          {/* subtle green edge */}
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-newsroom" />
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-newsroom mb-3">{en ? "Let's connect" : "চলুন কথা বলি"}</p>
              <h2
                id="contact-cta-heading"
                className="font-bold leading-tight tracking-[-0.015em]"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
              >
                {en
                  ? "Have a story, collaboration, or professional enquiry?"
                  : "খবর, সহযোগিতা বা পেশাগত কোনো প্রস্তাব আছে?"}
              </h2>
              <p className="mt-4 text-paper/70 leading-relaxed max-w-xl">
                {en
                  ? "I'm available for editorial collaborations, media enquiries and professional opportunities."
                  : "সম্পাদকীয় সহযোগিতা, গণমাধ্যম বিষয়ক যোগাযোগ এবং পেশাগত সুযোগের জন্য আমি উন্মুক্ত।"}
              </p>
            </div>

            <div className="mt-8 lg:mt-0 lg:shrink-0">
              <Link href="/contact" className="btn btn-primary w-full sm:w-auto">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {en ? "Contact me" : "যোগাযোগ করুন"}
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-4 block text-sm text-paper/60 hover:text-paper transition-colors lg:text-right"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
