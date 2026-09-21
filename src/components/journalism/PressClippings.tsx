"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Maximize2, Minimize2, X, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { clippings, type Clipping } from "@/content/clippings";
import { localeDigits } from "@/lib/format";
import { useLockBodyScroll } from "@/lib/use-lock-body-scroll";
import { useLanguage } from "@/i18n/language-context";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Shared labels                                                       */
/* ------------------------------------------------------------------ */

function useClippingLabels() {
  const { language } = useLanguage();
  const en = language === "en";
  return {
    language,
    en,
    chapter: en ? "Press Clippings" : "প্রেস কাটিং",
    heading: en ? "As Published in Print" : "পত্রিকায় প্রকাশিত প্রতিবেদন",
    desc: en
      ? "Authentic pages from the print edition of Daily Banijjo Pratidin — published reporting, preserved as evidence."
      : "দৈনিক বাণিজ্য প্রতিদিন-এর প্রিন্ট সংস্করণের প্রকৃত পৃষ্ঠা — প্রকাশিত প্রতিবেদন, প্রমাণ হিসেবে সংরক্ষিত।",
    verified: en ? "Verified" : "যাচাইকৃত",
    view: en ? "View clipping" : "কাটিং দেখুন",
    viewerLabel: en ? "Clipping viewer" : "কাটিং দেখার জানালা",
    close: en ? "Close clipping viewer" : "কাটিং দেখার জানালা বন্ধ করুন",
    prev: en ? "Previous clipping" : "আগের কাটিং",
    next: en ? "Next clipping" : "পরের কাটিং",
    printPage: en ? "Page from the print edition" : "প্রিন্ট সংস্করণের পৃষ্ঠা",
    zoomIn: en ? "View full width" : "সম্পূর্ণ প্রস্থে দেখুন",
    zoomOut: en ? "Fit to screen" : "স্ক্রিনে ফিট করুন",
  };
}

/** Evidence badge — filled, so it is unmistakably distinct from the Demo badge. */
export function VerifiedBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 bg-newsroom text-paper text-[0.6875rem] px-2 py-1 font-semibold whitespace-nowrap">
      <BadgeCheck className="h-3 w-3" aria-hidden="true" />
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Viewer                                                              */
/* ------------------------------------------------------------------ */

interface ViewerProps {
  clippings: Clipping[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function ClippingViewer({ clippings, index, onClose, onNavigate }: ViewerProps) {
  const L = useClippingLabels();
  const [zoom, setZoom] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useLockBodyScroll(index !== null);

  // Reset zoom when navigating between clippings — adjust-state-during-render
  // pattern (lint-safe, no cascading effect render).
  const [prevIndex, setPrevIndex] = useState(index);
  if (index !== prevIndex) {
    setPrevIndex(index);
    setZoom(false);
  }

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      const next = (index + delta + clippings.length) % clippings.length;
      onNavigate(next);
    },
    [index, clippings.length, onNavigate],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, onClose]);

  if (index === null) return null;
  const item = clippings[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={L.viewerLabel}
      tabIndex={-1}
      ref={dialogRef}
      className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-sm flex flex-col"
    >
      {/* Bar */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-8 py-3 border-b border-paper/10 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm text-paper/60 tabular-nums whitespace-nowrap">
            {localeDigits(index + 1, L.language)} / {localeDigits(clippings.length, L.language)}
          </span>
          <VerifiedBadge label={L.verified} />
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoom((z) => !z)}
            aria-pressed={zoom}
            aria-label={zoom ? L.zoomOut : L.zoomIn}
            className="inline-flex items-center justify-center w-11 h-11 text-paper hover:text-newsroom transition-colors"
          >
            {zoom ? <Minimize2 className="h-5 w-5" aria-hidden="true" /> : <Maximize2 className="h-5 w-5" aria-hidden="true" />}
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={L.close}
            className="inline-flex items-center justify-center w-11 h-11 text-paper hover:text-newsroom transition-colors"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Image — text evidence stays legible: high quality, pinch-zoom untouched */}
      <div
        className={cn(
          "flex-1 min-h-0 relative",
          zoom ? "overflow-auto" : "overflow-hidden flex items-center justify-center",
        )}
      >
        {zoom ? (
          <Image
            src={item.image}
            alt={item.alt[L.language]}
            width={1600}
            height={1200}
            quality={90}
            unoptimized
            className="max-w-none w-[1600px] h-auto"
            /* touch-action deliberately untouched — pinch-zoom works on mobile */
          />
        ) : (
          <>
            <Image
              src={item.image}
              alt={item.alt[L.language]}
              fill
              quality={90}
              sizes="(min-width: 1024px) 62vw, 94vw"
              className="object-contain"
            />
            <button type="button" onClick={() => go(-1)} aria-label={L.prev} className="absolute left-2 sm:left-4 z-10 inline-flex items-center justify-center w-11 h-11 text-paper/70 hover:text-paper hover:bg-paper/10 transition-colors"><ChevronLeft className="h-6 w-6" aria-hidden="true" /></button>
            <button type="button" onClick={() => go(1)} aria-label={L.next} className="absolute right-2 sm:right-4 z-10 inline-flex items-center justify-center w-11 h-11 text-paper/70 hover:text-paper hover:bg-paper/10 transition-colors"><ChevronRight className="h-6 w-6" aria-hidden="true" /></button>
          </>
        )}
      </div>

      {/* Caption — evidence metadata; NO date is ever shown */}
      <div className="px-4 sm:px-8 py-4 border-t border-paper/10 shrink-0">
        <p className="text-sm sm:text-base text-paper font-serif">{item.headline[L.language]}</p>
        <p className="mt-1 text-sm text-paper/80">
          {item.publication[L.language]}
          {item.byline && (<>
            {", "}
            {item.byline[L.language]}
          </>)}
        </p>
        <p className="mt-0.5 text-xs text-paper/50">{L.printPage}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Home section — lead clipping (~60/40) + two compact rows            */
/* ------------------------------------------------------------------ */

export function PressClippings() {
  const L = useClippingLabels();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [lead, ...rest] = clippings;

  return (
    <section aria-labelledby="clippings-heading" className="py-16 sm:py-24 lg:py-32 bg-paper-deep/30">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-12 gap-4 mb-12 lg:mb-16">
          <div className="col-span-12 lg:col-span-10">
            <h2
              id="clippings-heading"
              className="section-headline text-ink mt-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {L.heading}
            </h2>
            <p className="body-readable mt-6 max-w-2xl">{L.desc}</p>
          </div>
        </div>

        {/* Lead clipping — image leads, evidence-first */}
        <article className="group mb-6">
          <button
            type="button"
            onClick={() => setOpenIdx(0)}
            className="group block w-full text-left card-surface overflow-hidden hover:-translate-y-0.5 rounded-[var(--radius)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-newsroom"
            aria-label={`${L.view}: ${lead.headline[L.language]}`}
          >
            <div className="grid grid-cols-12 gap-x-4 lg:gap-x-10 gap-y-6 items-start">
              <div className="col-span-12 lg:col-span-7 relative overflow-hidden bg-paper">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={lead.image}
                    alt={lead.alt[L.language]}
                    fill
                    quality={90}
                    priority
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-5 lg:pt-2">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <VerifiedBadge label={L.verified} />
                  <span className="editorial-meta">{lead.publication[L.language]}</span>
                </div>
                <h3
                  className="font-serif font-bold text-ink leading-[1.14] tracking-[-0.015em] group-hover:text-newsroom transition-colors"
                  style={{ fontSize: "clamp(1.625rem, 3.2vw, 2.75rem)" }}
                >
                  {lead.headline[L.language]}
                </h3>
                {lead.byline && <p className="clipping-meta mt-4 text-newsroom">{lead.byline[L.language]}</p>}
                <p className="body-small mt-3 line-clamp-2">{lead.summary[L.language]}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-newsroom transition-colors">
                  {L.view}
                </span>
              </div>
            </div>
          </button>
        </article>

        {/* Compact rows */}
        <div className="border-t border-rule">
          {rest.map((clip, i) => (
            <button
              key={clip.id}
              type="button"
              onClick={() => setOpenIdx(i + 1)}
              aria-label={`${L.view}: ${clip.headline[L.language]}`}
              className="group grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-3 p-4 sm:p-5 border-b border-rule text-left w-full hover:bg-paper-deep/60 transition-colors rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-newsroom"
            >
              <div className="col-span-5 sm:col-span-2 relative overflow-hidden rounded-lg border border-rule bg-paper">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={clip.image}
                    alt={clip.alt[L.language]}
                    fill
                    quality={90}
                    sizes="(min-width: 640px) 17vw, 42vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="col-span-7 sm:col-span-9">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <VerifiedBadge label={L.verified} />
                  <span className="clipping-meta">{clip.publication[L.language]}</span>
                  
                  {clip.byline && <span className="clipping-meta text-newsroom">{clip.byline[L.language]}</span>}
                </div>
                <h3
                  className="font-serif font-semibold text-ink leading-[1.2] tracking-[-0.01em] group-hover:text-newsroom transition-colors"
                  style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.5rem)" }}
                >
                  {clip.headline[L.language]}
                </h3>
                <p className="body-small mt-1.5 line-clamp-1">{clip.summary[L.language]}</p>
              </div>
              <div className="hidden sm:flex col-span-1 items-center justify-end">
              </div>
            </button>
          ))}
        </div>
      </div>

      <ClippingViewer clippings={clippings} index={openIdx} onClose={() => setOpenIdx(null)} onNavigate={setOpenIdx} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* /work — verified evidence block above the demo grid                 */
/* ------------------------------------------------------------------ */

export function ClippingsStrip() {
  const L = useClippingLabels();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section aria-labelledby="clippings-strip-heading" className="mb-16">
      <div className="flex flex-wrap items-center gap-4 mb-2">
        <h2 id="clippings-strip-heading" className="section-headline text-ink" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
          {L.en ? "Verified reporting" : "যাচাইকৃত প্রতিবেদন"}
        </h2>
        <VerifiedBadge label={L.verified} />
      </div>
      <p className="body-small text-ink-muted max-w-2xl">{L.desc}</p>

      <ol className="mt-8 divide-y divide-rule border-t border-rule">
        {clippings.map((clip, i) => (
          <li key={clip.id}>
            <button
              type="button"
              onClick={() => setOpenIdx(i)}
              aria-label={`${L.view}: ${clip.headline[L.language]}`}
              className="group grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-3 py-5 w-full text-left hover:bg-paper-deep/60 transition-colors rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-newsroom"
            >
              <div className="col-span-4 sm:col-span-2 relative overflow-hidden rounded-lg border border-rule bg-paper">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={clip.image}
                    alt={clip.alt[L.language]}
                    fill
                    quality={90}
                    sizes="(min-width: 640px) 17vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="col-span-8 sm:col-span-9">
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <span className="clipping-meta">{clip.publication[L.language]}</span>
                  
                  {clip.byline && <span className="clipping-meta text-newsroom">{clip.byline[L.language]}</span>}
                </div>
                <h3
                  className="font-serif font-semibold text-ink leading-tight tracking-[-0.01em] group-hover:text-newsroom transition-colors"
                  style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.5rem)" }}
                >
                  {clip.headline[L.language]}
                </h3>
                <p className="body-small mt-1.5 line-clamp-1">{clip.summary[L.language]}</p>
              </div>
              <div className="hidden sm:flex col-span-1 items-center justify-end">
              </div>
            </button>
          </li>
        ))}
      </ol>

      <ClippingViewer clippings={clippings} index={openIdx} onClose={() => setOpenIdx(null)} onNavigate={setOpenIdx} />
    </section>
  );
}
