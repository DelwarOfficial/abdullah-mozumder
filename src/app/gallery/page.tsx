import type { Metadata } from "next";
import { Container } from "@/components/ui-editorial/Container";
import { Eyebrow } from "@/components/ui-editorial/Eyebrow";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { galleryItems } from "@/content/gallery";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photojournalism gallery by ${siteConfig.name}. A curated grid of field photographs from across Bangladesh.`,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: `Gallery — ${siteConfig.name}`,
    description: `Photojournalism gallery by ${siteConfig.name}.`,
    url: `${siteConfig.url}/gallery`,
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Gallery", url: `${siteConfig.url}/gallery` },
        ]}
      />
      <section className="py-12 sm:py-16">
        <Container size="wide">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Gallery" },
            ]}
          />

          <div className="mt-10 max-w-3xl">
            <Eyebrow>Gallery</Eyebrow>
            <h1 className="mt-4 font-serif font-semibold text-ink text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em]">
              Photojournalism
            </h1>
            <p className="mt-5 text-lg text-ink-soft leading-relaxed">
              {galleryItems.length} images. Click any image to open the viewer.
              Use arrow keys to navigate, Escape to close.
            </p>
            <p className="mt-3 text-xs text-ink-muted italic max-w-xl">
              The gallery currently shows placeholder frames. Replace with the
              journalist&apos;s verified field photographs — each with proper alt
              text, caption and credit — before launch.
            </p>
          </div>

          <GalleryExplorer />
        </Container>
      </section>
    </>
  );
}
