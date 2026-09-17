import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SkipLink } from "@/components/layout/SkipLink";
import { LocaleSetter } from "@/components/layout/LocaleSetter";
import { isLocale } from "@/i18n/config";
import { siteConfig } from "@/content/site";
import { siteName, siteDescription } from "@/content/site-messages";
import { profile } from "@/content/profile";
import type { Locale } from "@/content/types";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const other = loc === "en" ? "bn" : "en";

  const title = `${siteName[loc]} | ${siteName[loc] === "Abdullah Mozomdar" ? "Journalist & Senior Reporter" : "সাংবাদিক ও সিনিয়র রিপোর্টার"}`;

  return {
    title: {
      default: title,
      template: `%s — ${siteName[loc]}`,
    },
    description: siteDescription[loc],
    alternates: {
      canonical: `/${loc}`,
      languages: {
        [loc]: `/${loc}`,
        [other]: `/${other}`,
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: loc === "bn" ? "bn_BD" : "en_US",
      url: `${siteConfig.url}/${loc}`,
      siteName: siteName[loc],
      title,
      description: siteDescription[loc],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: siteDescription[loc],
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";

  if (!isLocale(localeParam)) notFound();

  return (
    <>
      <LocaleSetter locale={locale} />
      <SkipLink />
      <SiteHeader locale={locale} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
