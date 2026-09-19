import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/home/Hero";
import { SelectedReporting } from "@/components/home/SelectedReporting";
import { NewsDesk } from "@/components/home/NewsDesk";
import { DarkStatement } from "@/components/home/DarkStatement";
import { Career } from "@/components/home/Career";
import { ProfileSpread } from "@/components/home/ProfileSpread";
import { Credentials } from "@/components/home/Credentials";
import { ReportingAreas } from "@/components/home/ReportingAreas";
import { Education } from "@/components/home/Education";
import { Principles } from "@/components/home/Principles";
import { ContactCTA } from "@/components/home/ContactCTA";
import { PersonSchema, WebsiteSchema } from "@/components/seo/StructuredData";
import { profile } from "@/content/profile";
import { siteConfig } from "@/content/site";
import { siteName, siteDescription } from "@/content/site-messages";
import { isLocale, otherLocale } from "@/i18n/config";
import type { Locale } from "@/content/types";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const other = otherLocale[locale];

  const title = `${siteName[locale]} | ${locale === "en" ? "Journalist & Senior Reporter" : "সাংবাদিক ও সিনিয়র রিপোর্টার"}`;

  return {
    title,
    description: siteDescription[locale],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        [locale]: `/${locale}`,
        [other]: `/${other}`,
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "profile",
      url: `${siteConfig.url}/${locale}`,
      title,
      description: siteDescription[locale],
      siteName: siteName[locale],
      locale: locale === "bn" ? "bn_BD" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: siteDescription[locale],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;

  return (
    <>
      <PersonSchema
        name={profile.name[locale]}
        jobTitle={profile.title[locale]}
        email={profile.email}
        url={`${siteConfig.url}/${locale}`}
        location={profile.location[locale]}
      />
      <WebsiteSchema
        name={siteName[locale]}
        url={`${siteConfig.url}/${locale}`}
        description={siteDescription[locale]}
      />

      <Hero locale={locale} />
      <SelectedReporting locale={locale} />
      <NewsDesk locale={locale} />
      <DarkStatement locale={locale} />
      <Career locale={locale} />
      <ProfileSpread locale={locale} />
      <Credentials locale={locale} />
      <ReportingAreas locale={locale} />
      <Education locale={locale} />
      <Principles locale={locale} />
      <ContactCTA locale={locale} />
    </>
  );
}
