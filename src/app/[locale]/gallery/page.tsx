import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { galleryItems } from "@/content/gallery";
import { siteConfig } from "@/content/site";
import { siteName } from "@/content/site-messages";
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
    title: locale === "en" ? "Gallery" : "গ্যালারি",
    description: locale === "en" ? `Photojournalism gallery by ${siteName.en}.` : `${siteName.bn}-এর ফটোসাংবাদিকতা গ্যালারি।`,
    alternates: {
      canonical: `/${locale}/gallery`,
      languages: { [locale]: `/${locale}/gallery`, [other]: `/${other}/gallery`, "x-default": "/en/gallery" },
    },
  };
}

export default async function GalleryPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  return (
    <>
      <BreadcrumbSchema items={[
        { name: siteName[locale], url: `${siteConfig.url}/${locale}` },
        { name: locale === "en" ? "Gallery" : "গ্যালারি", url: `${siteConfig.url}/${locale}/gallery` },
      ]} />
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[
            { label: locale === "en" ? "Home" : "হোম", href: localeHref("/", locale) },
            { label: locale === "en" ? "Gallery" : "গ্যালারি" },
          ]} />
          <ChapterMark number="—" label={locale === "en" ? "Gallery" : "গ্যালারি"} locale={locale} className="mt-10 mb-6" />
          <h1 className="section-headline text-ink mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>{locale === "en" ? "Photojournalism" : "ফটোসাংবাদিকতা"}</h1>
          <p className="text-lg text-ink-soft leading-relaxed max-w-2xl mb-4">
            {galleryItems.length} {locale === "en" ? "images. Click any image to open the viewer. Use arrow keys to navigate, Escape to close." : "ছবি। যেকোনো ছবিতে ক্লিক করুন। তীর কী দিয়ে চলুন, এস্কেপ দিয়ে বন্ধ করুন।"}
          </p>
          <p className="text-xs text-ink-muted italic max-w-xl mb-10">
            {locale === "en" ? "The gallery currently shows placeholder frames. Replace with the journalist's verified field photographs." : "গ্যালারিতে বর্তমানে নমুনা ফ্রেম রয়েছে। সাংবাদিকের যাচাইকৃত মাঠপর্যায়ের ছবি দিয়ে প্রতিস্থাপন করুন।"}
          </p>
          <GalleryExplorer locale={locale} />
        </div>
      </section>
    </>
  );
}
