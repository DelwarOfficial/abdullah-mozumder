import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { siteConfig } from "@/content/site";
import { siteName } from "@/i18n/ui";
import { GalleryContent } from "@/components/gallery/GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse Abdullah Mozomdar's portfolio gallery, with photographs and captions covering professional activities, newsroom moments and reporting assignments.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: siteName.en, url: siteConfig.url },
        { name: "Gallery", url: `${siteConfig.url}/gallery` },
      ]} />
      <GalleryContent />
    </>
  );
}
