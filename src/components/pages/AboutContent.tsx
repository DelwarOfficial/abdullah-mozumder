"use client";

import { Divider } from "@/components/ui-editorial/Divider";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { PortraitPlaceholder } from "@/components/ui-editorial/PortraitPlaceholder";
import { profile } from "@/content/profile";
import { siteConfig } from "@/content/site";
import { sectionLabels } from "@/i18n/ui";
import { experiences } from "@/content/experiences";
import { education } from "@/content/education";
import { memberships } from "@/content/memberships";
import { reportingAreas, digitalSkills } from "@/content/reporting-areas";
import { localeDigits } from "@/lib/format";
import { useLanguage } from "@/i18n/language-context";

export function AboutContent() {
  const { language } = useLanguage();
  const en = language === "en";

  return (
    <article className="pt-10 lg:pt-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Breadcrumbs items={[
          { label: sectionLabels.home[language], href: "/" },
          { label: en ? "About" : "পরিচিতি" },
        ]} />

        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-12">
          {/* Main */}
          <div className="col-span-12 lg:col-span-8">
            <h1
              className="font-serif font-bold text-ink leading-[1.0] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {profile.name[language]}
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-ink-soft font-medium">
              {profile.title[language]}, {profile.location[language]}
            </p>

            <Divider variant="thick" className="mt-10 mb-10" />

            <div className="prose-editorial" style={{ marginInline: 0 }}>
              <p>{profile.longBio[language]}</p>
            </div>

            {/* Memberships */}
            <div className="mt-12 border-t border-ink pt-8">
              <p className="editorial-eyebrow text-newsroom mb-6">{sectionLabels.memberships[language]}</p>
              <ul className="space-y-6">
                {memberships.map((m) => (
                  <li key={m.id} className="border-l-2 border-newsroom pl-4">
                    <h3 className="font-serif text-xl font-semibold text-ink">{m.organization[language]}</h3>
                    <p className="text-sm text-ink-soft">{m.role[language]}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Education */}
            <div className="mt-12 border-t border-rule pt-8">
              <p className="editorial-eyebrow mb-6">{sectionLabels.education[language]}</p>
              <ul className="space-y-8">
                {education.map((edu) => (
                  <li key={edu.id} className="grid grid-cols-12 gap-4 items-baseline">
                    <div className="col-span-3 sm:col-span-2">
                      <span className="font-serif text-2xl sm:text-3xl text-newsroom font-bold">{localeDigits(edu.year, language)}</span>
                    </div>
                    <div className="col-span-9 sm:col-span-10">
                      <h3 className="font-serif text-lg font-semibold text-ink">{edu.degree[language]}{en ? ` in ${edu.field.en}` : ` — ${edu.field.bn}`}</h3>
                      <p className="text-sm text-ink-soft">{edu.institution[language]}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages & Skills */}
            <div className="mt-12 border-t border-rule pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="editorial-eyebrow mb-3">{sectionLabels.languages[language]}</p>
                <ul className="space-y-1.5">
                  {profile.languages[language].map((lang) => (
                    <li key={lang} className="text-base text-ink-soft">{lang}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="editorial-eyebrow mb-3">{sectionLabels.skills[language]}</p>
                <ul className="space-y-1.5">
                  {digitalSkills.map((skill) => (
                    <li key={skill.en} className="text-base text-ink-soft">{en ? skill.en : skill.bn}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reporting areas */}
            <div className="mt-12 border-t border-rule pt-8">
              <p className="editorial-eyebrow mb-4">{sectionLabels.reportingAreas[language]}</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-2">
                {reportingAreas.map((area) => (
                  <li key={area.id} className="inline-flex items-center gap-2 border border-rule px-3 py-1.5 text-sm text-ink-soft">
                    <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-newsroom" />
                    {area.label[language]}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 self-start space-y-8">
            <div className="flex justify-center">
              <PortraitPlaceholder size="md" label={profile.name[language]} alt={profile.portraitAlt[language]} src={profile.portrait} />
            </div>
            <dl className="space-y-5 border-t border-rule pt-6">
              <div>
                <dt className="editorial-eyebrow">{sectionLabels.basedIn[language]}</dt>
                <dd className="mt-1 text-sm text-ink-soft font-medium">{profile.location[language]}</dd>
              </div>
              <div>
                <dt className="editorial-eyebrow">{sectionLabels.currently[language]}</dt>
                <dd className="mt-1 text-sm text-ink-soft font-medium">{profile.currentPosition.role[language]}<br />{profile.currentPosition.organization[language]}</dd>
              </div>
              <div>
                <dt className="editorial-eyebrow">{sectionLabels.languages[language]}</dt>
                <dd className="mt-1 text-sm text-ink-soft font-medium">{profile.languages[language].join(" / ")}</dd>
              </div>
              <div>
                <dt className="editorial-eyebrow">{sectionLabels.contact[language]}</dt>
                <dd className="mt-1"><a href={`mailto:${siteConfig.email}`} className="text-sm text-ink hover:text-newsroom transition-colors link-underline">{siteConfig.email}</a></dd>
              </div>
            </dl>
            <div className="border-t border-rule pt-6">
              <p className="editorial-eyebrow mb-3">{sectionLabels.recentExp[language]}</p>
              <ul className="space-y-3">
                {experiences.slice(0, 3).map((exp) => (
                  <li key={exp.id} className="text-sm">
                    <span className="text-ink-muted text-xs">{exp.periodLabel[language]}</span><br />
                    <span className="text-ink font-medium">{exp.role[language]}</span><br />
                    <span className="text-ink-soft">{exp.organization[language]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
