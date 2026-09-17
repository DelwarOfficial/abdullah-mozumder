import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { experiences } from "@/content/experiences";
import { siteConfig } from "@/content/site";
import { siteName } from "@/content/site-messages";
import { isLocale, otherLocale, localeHref } from "@/i18n/config";
import { cn } from "@/lib/utils";
import type { Locale } from "@/content/types";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const other = otherLocale[locale];
  return {
    title: locale === "en" ? "Experience" : "অভিজ্ঞতা",
    description: locale === "en"
      ? `Career timeline of ${profile_name_en} — reporting experience across national news organizations in Bangladesh.`
      : `${profile_name_bn}-এর কর্মজীবন — বাংলাদেশের জাতীয় সংবাদমাধ্যমে সাংবাদিকতার অভিজ্ঞতা।`,
    alternates: {
      canonical: `/${locale}/experience`,
      languages: { [locale]: `/${locale}/experience`, [other]: `/${other}/experience`, "x-default": "/en/experience" },
    },
  };
}

const profile_name_en = "Abdullah Mozomdar";
const profile_name_bn = "আবদুল্লাহ মোজোমদার";

export default async function ExperiencePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: siteName[locale], url: `${siteConfig.url}/${locale}` },
        { name: locale === "en" ? "Experience" : "অভিজ্ঞতা", url: `${siteConfig.url}/${locale}/experience` },
      ]} />
      <article className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[
            { label: locale === "en" ? "Home" : "হোম", href: localeHref("/", locale) },
            { label: locale === "en" ? "Experience" : "অভিজ্ঞতা" },
          ]} />

          <ChapterMark number="03" label={locale === "en" ? "Career" : "পেশাগত অভিজ্ঞতা"} locale={locale} className="mt-10 mb-6" />
          <h1
            className="section-headline text-ink mb-12 lg:mb-16"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {locale === "en" ? "Reporting Experience" : "সাংবাদিকতার অভিজ্ঞতা"}
          </h1>

          <div className="border-t border-ink">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className={cn(
                  "grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-4 py-8 sm:py-12 lg:py-16 border-b border-rule",
                  exp.current && "bg-paper-deep/30 -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12",
                )}
              >
                <div className="col-span-12 lg:col-span-4">
                  <div className="flex items-baseline gap-2 lg:gap-3">
                    <span className={cn("font-serif font-bold tabular-nums leading-none tracking-[-0.02em]", exp.current ? "text-newsroom" : "text-ink")} style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>{exp.startDate}</span>
                    <span className="text-ink-muted font-serif text-2xl sm:text-3xl">—</span>
                    <span className={cn("font-serif font-bold tabular-nums leading-none tracking-[-0.02em]", exp.current ? "text-newsroom" : "text-ink-soft")} style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>{exp.current ? (locale === "en" ? "Now" : "এখ") : exp.endDate}</span>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-6 lg:col-start-6">
                  {exp.current && (
                    <span className="inline-block bg-newsroom text-paper text-[0.625rem] uppercase tracking-[0.14em] px-2 py-0.5 font-semibold mb-3">{locale === "en" ? "Current" : "বর্তমান"}</span>
                  )}
                  <h2 className="font-serif font-bold text-ink leading-tight tracking-[-0.015em]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>{exp.role[locale]}</h2>
                  <p className="mt-2 text-base sm:text-lg text-ink-soft font-medium">{exp.organization[locale]}</p>
                  <p className="mt-1 text-sm text-ink-muted">{exp.location[locale]}</p>
                  {exp.description ? (
                    <p className="mt-4 text-base text-ink-soft leading-relaxed max-w-2xl">{exp.description[locale]}</p>
                  ) : (
                    <p className="mt-4 text-sm text-ink-muted italic max-w-2xl">{locale === "en" ? "Detailed responsibilities for this role have not been supplied. They will be added once verified." : "এই পদের বিস্তারিত দায়িত্ব এখনো সরবরাহ করা হয়নি। যাচাই হওয়ার পর যোগ করা হবে।"}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
