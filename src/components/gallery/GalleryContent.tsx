"use client";

import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { galleryItems } from "@/content/gallery";
import { sectionLabels } from "@/i18n/ui";
import { toBnDigits } from "@/lib/format";
import { useLanguage } from "@/i18n/language-context";

export function GalleryContent() {
  const { language } = useLanguage();
  const en = language === "en";

  return (
    <section className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Breadcrumbs items={[
          { label: sectionLabels.home[language], href: "/" },
          { label: sectionLabels.gallery[language] },
        ]} />
        <ChapterMark number="—" label={sectionLabels.gallery[language]} locale={language} className="mt-10 mb-6" />
        <h1 className="section-headline text-ink mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          {en ? "Photojournalism" : "ফটোসাংবাদিকতা"}
        </h1>
        <p className="text-lg text-ink-soft leading-relaxed max-w-2xl mb-4">
          {en
            ? `${galleryItems.length} images. Click any image to open the viewer. Use arrow keys to navigate, Escape to close.`
            : `${toBnDigits(galleryItems.length)}টি ছবি। ছবিতে চাপ দিলে বড় করে দেখা যাবে; পাশের তীরে চলুন, Escape দিয়ে বন্ধ করুন।`}
        </p>
        <GalleryExplorer locale={language} />
      </div>
    </section>
  );
}
