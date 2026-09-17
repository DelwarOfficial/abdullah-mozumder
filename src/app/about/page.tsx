import type { Metadata } from "next";
import { Container } from "@/components/ui-editorial/Container";
import { SectionHeading } from "@/components/ui-editorial/SectionHeading";
import { Eyebrow } from "@/components/ui-editorial/Eyebrow";
import { Divider } from "@/components/ui-editorial/Divider";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { PortraitPlaceholder } from "@/components/ui-editorial/PortraitPlaceholder";
import { BreadcrumbSchema, PersonSchema } from "@/components/seo/StructuredData";
import { profile } from "@/content/profile";
import { siteConfig } from "@/content/site";
import { experiences } from "@/content/experiences";
import { education } from "@/content/education";
import { memberships } from "@/content/memberships";
import { reportingAreas, digitalSkills } from "@/content/reporting-areas";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name} — ${profile.title} based in ${profile.location}. Professional biography, career summary, memberships, education and languages.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${siteConfig.name}`,
    description: `Professional biography of ${profile.name}, ${profile.title}.`,
    url: `${siteConfig.url}/about`,
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "About", url: `${siteConfig.url}/about` },
        ]}
      />
      <PersonSchema
        name={profile.name}
        jobTitle={profile.title}
        email={profile.email}
        url={`${siteConfig.url}/about`}
        location={profile.location}
      />

      <article className="py-12 sm:py-16">
        <Container size="wide">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "About" },
            ]}
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Main column */}
            <div className="lg:col-span-8">
              <Eyebrow>About</Eyebrow>
              <h1
                className="mt-4 font-serif font-semibold text-ink text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em]"
              >
                {profile.name}
              </h1>
              <p className="mt-3 text-lg text-ink-soft font-medium">
                {profile.title} · {profile.location}
              </p>

              <Divider variant="thick" className="mt-8" />

              <div className="prose-editorial">
                <p className="first-letter:font-bold first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:leading-[0.85] first-letter:mt-1 first-letter:text-newsroom">
                  {profile.longBio}
                </p>
                <p>
                  This website is a portfolio of professional work. It focuses
                  exclusively on {profile.name}&apos;s journalism credentials —
                  professional experience, memberships, education and selected
                  reporting. Private information has been intentionally
                  omitted.
                </p>
                <p>
                  For editorial enquiries, story tips or media collaborations,
                  please use the contact page. All professional communication
                  is welcome.
                </p>
              </div>

              <Divider label="Memberships" />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {memberships.map((m) => (
                  <li key={m.id} className="border-l-2 border-newsroom pl-4">
                    <p className="editorial-eyebrow text-newsroom">
                      {m.shortName ?? m.organization}
                    </p>
                    <h3 className="mt-1 font-serif text-lg font-semibold text-ink">
                      {m.organization}
                    </h3>
                    <p className="text-sm text-ink-soft">{m.role}</p>
                  </li>
                ))}
              </ul>

              <Divider label="Education" />
              <ul className="space-y-6">
                {education.map((edu) => (
                  <li
                    key={edu.id}
                    className="grid grid-cols-12 gap-4 items-baseline"
                  >
                    <div className="col-span-3 sm:col-span-2">
                      <span className="font-serif text-2xl text-newsroom font-semibold">
                        {edu.year}
                      </span>
                    </div>
                    <div className="col-span-9 sm:col-span-10">
                      <h3 className="font-serif text-lg font-semibold text-ink">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-sm text-ink-soft">{edu.institution}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <Divider label="Languages & Skills" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p className="editorial-eyebrow mb-3">Languages</p>
                  <ul className="space-y-1.5">
                    {profile.languages.map((lang) => (
                      <li key={lang} className="text-base text-ink-soft">
                        {lang}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="editorial-eyebrow mb-3">Digital Skills</p>
                  <ul className="space-y-1.5">
                    {digitalSkills.map((skill) => (
                      <li key={skill} className="text-base text-ink-soft">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Divider label="Reporting Areas" />
              <ul className="flex flex-wrap gap-x-3 gap-y-2">
                {reportingAreas.map((area) => (
                  <li
                    key={area.id}
                    className="inline-flex items-center gap-2 border border-rule px-3 py-1.5 text-sm text-ink-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 bg-newsroom"
                    />
                    {area.label}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-ink-muted italic max-w-xl">
                Editable placeholders — replace with verified beats.
              </p>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start space-y-8">
              <div className="flex justify-center">
                <PortraitPlaceholder
                  size="md"
                  label={profile.name}
                  alt={profile.portraitAlt}
                  src={profile.portrait}
                />
              </div>

              <dl className="space-y-5 border-t border-rule pt-6">
                <div>
                  <dt className="editorial-eyebrow">Based in</dt>
                  <dd className="mt-1 text-sm text-ink-soft font-medium">
                    {profile.location}
                  </dd>
                </div>
                <div>
                  <dt className="editorial-eyebrow">Currently</dt>
                  <dd className="mt-1 text-sm text-ink-soft font-medium">
                    {profile.currentPosition.role}
                    <br />
                    {profile.currentPosition.organization}
                  </dd>
                </div>
                <div>
                  <dt className="editorial-eyebrow">Languages</dt>
                  <dd className="mt-1 text-sm text-ink-soft font-medium">
                    {profile.languages.join(" / ")}
                  </dd>
                </div>
                <div>
                  <dt className="editorial-eyebrow">Contact</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm text-ink hover:text-newsroom transition-colors link-underline"
                    >
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="border-t border-rule pt-6">
                <p className="editorial-eyebrow mb-3">Recent experience</p>
                <ul className="space-y-3">
                  {experiences.slice(0, 3).map((exp) => (
                    <li key={exp.id} className="text-sm">
                      <span className="text-ink-muted text-xs">{exp.periodLabel}</span>
                      <br />
                      <span className="text-ink font-medium">{exp.role}</span>
                      <br />
                      <span className="text-ink-soft">{exp.organization}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </article>
    </>
  );
}
