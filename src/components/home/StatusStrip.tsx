"use client";

import { memberships } from "@/content/memberships";
import { profile } from "@/content/profile";
import { useLanguage } from "@/i18n/language-context";

/**
 * §8.3 — Newsroom status strip: current position + affiliations.
 * Thin, typographic, restrained — information, not badges.
 */
export function StatusStrip() {
  const { language } = useLanguage();
  const en = language === "en";

  const cells = [
    {
      top: profile.currentPosition.role[language],
      bottom: profile.currentPosition.organization[language],
    },
    ...memberships.map((m) => ({
      top: m.role[language],
      bottom: m.organization[language],
    })),
  ];

  return (
    <section
      aria-label={en ? "Professional status" : "পেশাগত অবস্থান"}
      className="border-y border-rule bg-paper"
    >
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <dl className="grid grid-cols-1 sm:grid-cols-3 sm:divide-x divide-rule">
          {cells.map((cell, i) => (
            <div
              key={i}
              className="flex items-baseline gap-3 py-4 sm:py-5 sm:px-6 sm:first:pl-0 border-b sm:border-b-0 border-rule-soft last:border-b-0"
            >
              <dt className="editorial-meta text-newsroom shrink-0">
                {i === 0 ? (en ? "Now" : "এখন") : localePad(i)}
              </dt>
              <dd className="min-w-0">
                <span className="block font-serif font-semibold text-ink leading-snug" style={{ fontSize: "clamp(0.9375rem, 1.1vw, 1.0625rem)" }}>
                  {cell.top}
                </span>
                <span className="block text-ink-muted mt-0.5" style={{ fontSize: "0.8125rem" }}>
                  {cell.bottom}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function localePad(i: number) {
  const bn = "০১২৩৪৫৬৭৮৯";
  return String(i + 1).padStart(2, "0").replace(/[0-9]/g, (d) => bn[Number(d)]);
}

