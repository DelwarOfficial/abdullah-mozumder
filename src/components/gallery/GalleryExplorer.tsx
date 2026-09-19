"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems } from "@/content/gallery";
import type { GalleryItem } from "@/content/types";
import { cn } from "@/lib/utils";
import { useLockBodyScroll } from "@/lib/use-lock-body-scroll";
import { localeDigits } from "@/lib/format";
import type { Locale } from "@/content/types";

interface GalleryExplorerProps {
  locale: Locale;
}

interface LightboxProps {
  items: GalleryItem[];
  initialIndex: number;
  onClose: () => void;
  locale: Locale;
}

function Lightbox({ items, initialIndex, onClose, locale }: LightboxProps) {
  const [idx, setIdx] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  useLockBodyScroll(true);

  const go = useCallback((delta: number) => {
    setIdx((prev) => {
      const next = prev + delta;
      if (next < 0) return items.length - 1;
      if (next >= items.length) return 0;
      return next;
    });
  }, [items.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  useEffect(() => { dialogRef.current?.focus(); }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const item = items[idx];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={locale === "en" ? "Image viewer" : "ছবি দেখার জানালা"}
      tabIndex={-1}
      ref={dialogRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-sm flex flex-col"
    >
      <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-paper/10">
        <span className="text-sm text-paper/60 tabular-nums">
          {localeDigits(idx + 1, locale)} / {localeDigits(items.length, locale)}
        </span>
        <button type="button" onClick={onClose} aria-label={locale === "en" ? "Close image viewer" : "জানালা বন্ধ করুন"} className="inline-flex items-center justify-center w-11 h-11 text-paper hover:text-newsroom transition-colors"><X className="h-5 w-5" aria-hidden="true" /></button>
      </div>
      <div className="flex-1 relative flex items-center justify-center p-5 sm:p-10">
        <button type="button" onClick={() => go(-1)} aria-label={locale === "en" ? "Previous image" : "আগের ছবি"} className="absolute left-2 sm:left-4 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 text-paper/70 hover:text-paper hover:bg-paper/10 transition-colors"><ChevronLeft className="h-6 w-6" aria-hidden="true" /></button>
        <figure className="max-w-5xl w-full max-h-full flex flex-col items-center">
          {item.src ? (
            <img src={item.src} alt={item.alt[locale]} className="max-h-[70vh] w-auto max-w-full object-contain" />
          ) : (
            <div role="img" aria-label={item.alt[locale]} className="aspect-[3/2] w-full bg-paper-deep/10 border border-paper/20 flex items-center justify-center text-paper/40 text-sm uppercase tracking-[0.18em]">{locale === "en" ? "Image pending" : "ছবি শীঘ্রই যোগ হবে"}</div>
          )}
          <figcaption className="mt-4 text-center max-w-2xl">
            {item.title[locale] && <p className="font-serif text-lg text-paper">{item.title[locale]}</p>}
            <p className="mt-1 text-sm text-paper/70 leading-relaxed">{item.caption[locale]}</p>
            <p className="mt-2 text-xs text-paper/50">{[item.location?.[locale], item.date ? localeDigits(item.date, locale) : null, item.credit?.[locale] ? `© ${item.credit[locale]}` : null].filter(Boolean).join(" · ")}</p>
          </figcaption>
        </figure>
        <button type="button" onClick={() => go(1)} aria-label={locale === "en" ? "Next image" : "পরের ছবি"} className="absolute right-2 sm:right-4 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 text-paper/70 hover:text-paper hover:bg-paper/10 transition-colors"><ChevronRight className="h-6 w-6" aria-hidden="true" /></button>
      </div>
    </div>
  );
}

export function GalleryExplorer({ locale }: GalleryExplorerProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <>
      <ul className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {galleryItems.map((item, idx) => (
          <li key={item.id} className={cn("relative aspect-square", idx === 0 && "col-span-2 row-span-2 aspect-square")}>
            <button type="button" onClick={() => setOpenIdx(idx)} aria-label={`${locale === "en" ? "Open image" : "ছবি দেখুন"}: ${item.title[locale]}`} className="group block w-full h-full bg-paper-deep border border-rule overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
              {item.src ? (
                <Image src={item.thumbnail ?? item.src} alt={item.alt[locale]} fill sizes={idx === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"} loading={idx < 4 ? "eager" : "lazy"} className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center"><span className="font-serif text-xs uppercase tracking-[0.18em] text-ink-muted/70">{locale === "en" ? "Image pending" : "ছবি শীঘ্রই যোগ হবে"}</span></div>
              )}
            </button>
          </li>
        ))}
      </ul>
      {openIdx !== null && <Lightbox items={galleryItems} initialIndex={openIdx} onClose={() => setOpenIdx(null)} locale={locale} />}
    </>
  );
}

