import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { WorkExplorer } from "@/components/journalism/WorkExplorer";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { siteConfig } from "@/content/site";
import { siteName } from "@/content/site-messages";
import { stories } from "@/content/stories";
import { isLocale, otherLocale } from "@/i18n/config";
import type { Locale } from "@/content/types";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const other = otherLocale[locale];
  return {
    title: locale === "en" ? "Work" : "প্রতিবেদন",
    description: locale === "en"
      ? `Selected journalism by ${siteName.en}. Reports, features, interviews and multimedia.`
      : `${siteName.bn}-এর নির্বাচিত প্রতিবেদন — ফিচার, সাক্ষাৎকার ও মাল্টিমিডিয়া।`,
    alternates: {
      canonical: `/${locale}/work`,
      languages: { [locale]: `/${locale}/work`, [other]: `/${other}/work`, "x-default": "/en/work" },
    },
    openGraph: {
      title: `${locale === "en" ? "Work" : "কাজ"} — ${siteName[locale]}`,
      url: `${siteConfig.url}/${locale}/work`,
    },
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: siteName[locale], url: `${siteConfig.url}/${locale}` },
        { name: locale === "en" ? "Work" : "প্রতিবেদন", url: `${siteConfig.url}/${locale}/work` },
      ]} />
      <Suspense fallback={<div className="pt-32 text-center text-sm text-ink-muted">{locale === "en" ? "Loading…" : "লোড হচ্ছে…"}</div>}>
        <WorkExplorer locale={locale} />
      </Suspense>
      {/* SEO fallback for crawlers */}
      <div className="sr-only" aria-hidden="true">
        <ul>
          {stories.map((s) => (
            <li key={s.id}><a href={`/${locale}/work/${s.slug}`}>{s.title[locale]}</a> — {s.publication[locale]}, {s.publishedLabel[locale]}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
