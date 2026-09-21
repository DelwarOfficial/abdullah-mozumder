"use client";

import { Briefcase, ShieldCheck, Landmark, MapPin } from "lucide-react";
import { memberships } from "@/content/memberships";
import { profile } from "@/content/profile";
import { useLanguage } from "@/i18n/language-context";

/**
 * Professional trust strip — credentials at a glance.
 */
export function StatusStrip() {
  const { language } = useLanguage();
  const en = language === "en";

  const items = [
    {
      Icon: Briefcase,
      top: profile.currentPosition.role[language],
      bottom: profile.currentPosition.organization[language],
    },
    {
      Icon: ShieldCheck,
      top: memberships[0].role[language],
      bottom: memberships[0].organization[language],
    },
    {
      Icon: Landmark,
      top: memberships[1].role[language],
      bottom: memberships[1].organization[language],
    },
    {
      Icon: MapPin,
      top: en ? "Based in Dhaka" : "অবস্থান ঢাকা",
      bottom: en ? "Bangladesh" : "বাংলাদেশ",
    },
  ];

  return (
    <section
      aria-label={en ? "Professional credentials" : "পেশাগত পরিচিতি"}
      className="border-y border-rule bg-card"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:divide-x divide-rule">
          {items.map(({ Icon, top, bottom }, i) => (
            <div key={i} className="flex items-center gap-3.5 py-5 sm:px-6 sm:first:pl-0 border-b sm:border-b-0 border-rule-soft last:border-b-0">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-newsroom-soft text-newsroom">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-sm font-semibold text-ink leading-snug">{top}</dt>
                <dd className="text-[0.8125rem] text-ink-muted mt-0.5 leading-snug">{bottom}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
