import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { Divider } from "@/components/ui-editorial/Divider";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { PortraitPlaceholder } from "@/components/ui-editorial/PortraitPlaceholder";
import { BreadcrumbSchema, PersonSchema } from "@/components/seo/StructuredData";
import { profile } from "@/content/profile";
import { siteConfig } from "@/content/site";
import { siteName } from "@/content/site-messages";
import { experiences } from "@/content/experiences";
import { education } from "@/content/education";
import { memberships } from "@/content/memberships";
import { reportingAreas, digitalSkills } from "@/content/reporting-areas";
import { isLocale, otherLocale, localeHref } from "@/i18n/config";
import type { Locale } from "@/content/types";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const other = otherLocale[locale];
  return {
    title: locale === "en" ? "About" : "পরিচিতি",
    description: locale === "en"
      ? `About ${profile.name.en} — ${profile.title.en} based in ${profile.location.en}.`
      : `${profile.name.bn} সম্পর্কে — ${profile.title.bn}।`,
    alternates: {
      canonical: `/${locale}/about`,
      languages: { [locale]: `/${locale}/about`, [other]: `/${other}/about`, "x-default": "/en/about" },
    },
    openGraph: {
      title: `${locale === "en" ? "About" : "পরিচিতি"} — ${siteName[locale]}`,
      description: locale === "en" ? `About ${profile.name.en}.` : `${profile.name.bn} সম্পর্কে।`,
      url: `${siteConfig.url}/${locale}/about`,
      type: "profile",
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;

  return (
    <>
      <PersonSchema name={profile.name[locale]} jobTitle={profile.title[locale]} email={profile.email} url={`${siteConfig.url}/${locale}/about`} location={profile.location[locale]} />
      <BreadcrumbSchema items={[
        { name: siteName[locale], url: `${siteConfig.url}/${locale}` },
        { name: locale === "en" ? "About" : "পরিচিতি", url: `${siteConfig.url}/${locale}/about` },
      ]} />

      <article className="pt-24 lg:pt-32">
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[
            { label: locale === "en" ? "Home" : "হোম", href: localeHref("/", locale) },
            { label: locale === "en" ? "About" : "পরিচিতি" },
          ]} />

          <ChapterMark number="04" label={locale === "en" ? "Profile" : "পরিচিতি"} locale={locale} className="mt-10 mb-8" />

          <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-12">
            {/* Main */}
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-serif font-bold text-ink leading-[1.0] tracking-[-0.025em]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                {profile.name[locale]}
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-ink-soft font-medium">
                {profile.title[locale]} · {profile.location[locale]}
              </p>

              <Divider variant="thick" className="mt-10 mb-10" />

              <div className="prose-editorial" style={{ marginInline: 0 }}>
                <p className="first-letter:font-bold first-letter:text-[4rem] first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:leading-[0.85] first-letter:mt-1 first-letter:text-newsroom">
                  {profile.longBio[locale]}
                </p>
              </div>

              {/* Memberships */}
              <div className="mt-12 border-t border-ink pt-8">
                <p className="editorial-eyebrow text-newsroom mb-6">{locale === "en" ? "Memberships" : "সদস্যপদ"}</p>
                <ul className="space-y-6">
                  {memberships.map((m) => (
                    <li key={m.id} className="border-l-2 border-newsroom pl-4">
                      <h3 className="font-serif text-xl font-semibold text-ink">{m.organization[locale]}</h3>
                      <p className="text-sm text-ink-soft">{m.role[locale]}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education */}
              <div className="mt-12 border-t border-rule pt-8">
                <p className="editorial-eyebrow mb-6">{locale === "en" ? "Education" : "শিক্ষা"}</p>
                <ul className="space-y-8">
                  {education.map((edu) => (
                    <li key={edu.id} className="grid grid-cols-12 gap-4 items-baseline">
                      <div className="col-span-3 sm:col-span-2">
                        <span className="font-serif text-2xl sm:text-3xl text-newsroom font-bold">{edu.year}</span>
                      </div>
                      <div className="col-span-9 sm:col-span-10">
                        <h3 className="font-serif text-lg font-semibold text-ink">{edu.degree[locale]} {locale === "en" ? "in" : "বিষয়ে"} {edu.field[locale]}</h3>
                        <p className="text-sm text-ink-soft">{edu.institution[locale]}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Languages & Skills */}
              <div className="mt-12 border-t border-rule pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p className="editorial-eyebrow mb-3">{locale === "en" ? "Languages" : "ভাষা"}</p>
                  <ul className="space-y-1.5">
                    {profile.languages[locale].map((lang) => (
                      <li key={lang} className="text-base text-ink-soft">{lang}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="editorial-eyebrow mb-3">{locale === "en" ? "Digital Skills" : "ডিজিটাল দক্ষতা"}</p>
                  <ul className="space-y-1.5">
                    {digitalSkills.map((skill) => (
                      <li key={skill.en} className="text-base text-ink-soft">{locale === "en" ? skill.en : skill.bn}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Reporting areas */}
              <div className="mt-12 border-t border-rule pt-8">
                <p className="editorial-eyebrow mb-4">{locale === "en" ? "Reporting Areas" : "প্রতিবেদনের ক্ষেত্র"}</p>
                <ul className="flex flex-wrap gap-x-3 gap-y-2">
                  {reportingAreas.map((area) => (
                    <li key={area.id} className="inline-flex items-center gap-2 border border-rule px-3 py-1.5 text-sm text-ink-soft">
                      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-newsroom" />
                      {area.label[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 self-start space-y-8">
              <div className="flex justify-center">
                <PortraitPlaceholder size="md" label={profile.name[locale]} alt={profile.portraitAlt[locale]} src={profile.portrait} />
              </div>
              <dl className="space-y-5 border-t border-rule pt-6">
                <div>
                  <dt className="editorial-eyebrow">{locale === "en" ? "Based in" : "অবস্থান"}</dt>
                  <dd className="mt-1 text-sm text-ink-soft font-medium">{profile.location[locale]}</dd>
                </div>
                <div>
                  <dt className="editorial-eyebrow">{locale === "en" ? "Currently" : "বর্তমান"}</dt>
                  <dd className="mt-1 text-sm text-ink-soft font-medium">{profile.currentPosition.role[locale]}<br />{profile.currentPosition.organization[locale]}</dd>
                </div>
                <div>
                  <dt className="editorial-eyebrow">{locale === "en" ? "Languages" : "ভাষা"}</dt>
                  <dd className="mt-1 text-sm text-ink-soft font-medium">{profile.languages[locale].join(" / ")}</dd>
                </div>
                <div>
                  <dt className="editorial-eyebrow">{locale === "en" ? "Contact" : "যোগাযোগ"}</dt>
                  <dd className="mt-1"><a href={`mailto:${siteConfig.email}`} className="text-sm text-ink hover:text-newsroom transition-colors link-underline">{siteConfig.email}</a></dd>
                </div>
              </dl>
              <div className="border-t border-rule pt-6">
                <p className="editorial-eyebrow mb-3">{locale === "en" ? "Recent Experience" : "সাম্প্রতিক অভিজ্ঞতা"}</p>
                <ul className="space-y-3">
                  {experiences.slice(0, 3).map((exp) => (
                    <li key={exp.id} className="text-sm">
                      <span className="text-ink-muted text-xs">{exp.periodLabel[locale]}</span><br />
                      <span className="text-ink font-medium">{exp.role[locale]}</span><br />
                      <span className="text-ink-soft">{exp.organization[locale]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
