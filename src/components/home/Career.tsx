"use client";

import Image from "next/image";
import { experiences } from "@/content/experiences";
import { memberships } from "@/content/memberships";
import { education } from "@/content/education";
import { localeDigits } from "@/lib/format";
import { GraduationCap, ShieldCheck, Landmark } from "lucide-react";

/**
 * §Experience + Credentials + Education — clean timeline & compact credentials.
 */
export function Career({ locale }: { locale: "en" | "bn" }) {
  const en = locale === "en";

  return (
    <section aria-labelledby="experience-heading" className="py-16 sm:py-20 lg:py-24 bg-paper-deep/50">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Timeline */}
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-newsroom mb-2">{en ? "Career" : "কর্মজীবন"}</p>
            <h2 id="experience-heading" className="section-headline text-ink mb-8" style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)" }}>
              {en ? "Experience" : "অভিজ্ঞতা"}
            </h2>

            <ol className="relative border-l-2 border-rule space-y-8 ml-2">
              {experiences.map((exp) => (
                <li key={exp.id} className="relative pl-8">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 ${
                      exp.current ? "bg-newsroom border-newsroom" : "bg-paper border-rule"
                    }`}
                  />
                  <p className="text-xs font-semibold text-newsroom tabular-nums">
                    {exp.periodLabel[locale]}
                    {exp.current && (
                      <span className="ml-2 inline-block rounded-full bg-newsroom-soft px-2 py-0.5 text-[0.6875rem] text-newsroom-deep font-semibold">
                        {en ? "Current" : "বর্তমান"}
                      </span>
                    )}
                  </p>
                  <h3 className="mt-1.5 text-lg font-bold text-ink">{exp.role[locale]}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-2.5 text-sm text-ink-soft font-medium">
                    {exp.logo && (
                      <span className="inline-flex items-center rounded-md border border-rule bg-card px-1.5 py-1">
                        <Image src={exp.logo} alt="" width={64} height={20} className="h-4 w-auto object-contain" aria-hidden="true" />
                      </span>
                    )}
                    {exp.organization[locale]}
                    <span className="text-ink-muted font-normal">, {exp.location[locale]}</span>
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Credentials + Education */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <p className="text-sm font-medium text-newsroom mb-2">{en ? "Credentials" : "পেশাগত সদস্যপদ"}</p>
              <h2 className="section-headline text-ink mb-6" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)" }}>
                {en ? "Professional Memberships" : "সদস্যপদ"}
              </h2>
              <ul className="space-y-4">
                {memberships.map((m, i) => {
                  const Icon = i === 0 ? ShieldCheck : Landmark;
                  return (
                    <li key={m.id} className="card-surface flex items-center gap-4 p-4 rounded-[var(--radius)]">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-newsroom-soft text-newsroom">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-ink leading-snug">{m.organization[locale]}</p>
                        <p className="text-xs text-ink-muted mt-0.5">{m.role[locale]}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium text-newsroom mb-2">{en ? "Education" : "শিক্ষা"}</p>
              <h2 className="section-headline text-ink mb-6" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)" }}>
                {en ? "Academic Background" : "শিক্ষাজীবন"}
              </h2>
              <ul className="space-y-4">
                {education.map((edu) => (
                  <li key={edu.id} className="card-surface flex items-center gap-4 p-4 rounded-[var(--radius)]">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-newsroom-soft text-newsroom">
                      <GraduationCap className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-ink leading-snug">
                        {edu.degree[locale]}{en ? ` in ${edu.field.en}` : ` — ${edu.field.bn}`}
                      </p>
                      <p className="text-xs text-ink-muted mt-0.5">
                        {edu.institution[locale]} , {localeDigits(edu.year, locale)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
