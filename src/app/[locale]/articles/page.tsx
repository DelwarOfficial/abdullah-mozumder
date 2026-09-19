import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlesExplorer } from "@/components/journalism/ArticlesExplorer";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { siteConfig } from "@/content/site";
import { siteName } from "@/content/site-messages";
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
    title: locale === "en" ? "Articles" : "লেখা",
    description: locale === "en"
      ? `Articles by ${siteName.en} — a text-first index of journalism.`
      : `${siteName.bn}-এর লেখা — সাংবাদিকতার কাজের সূচি।`,
    alternates: {
      canonical: `/${locale}/articles`,
      languages: { [locale]: `/${locale}/articles`, [other]: `/${other}/articles`, "x-default": "/en/articles" },
    },
  };
}

export default async function ArticlesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  return (
    <>
      <BreadcrumbSchema items={[
        { name: siteName[locale], url: `${siteConfig.url}/${locale}` },
        { name: locale === "en" ? "Articles" : "লেখা", url: `${siteConfig.url}/${locale}/articles` },
      ]} />
      <ArticlesExplorer locale={locale} />
    </>
  );
}
