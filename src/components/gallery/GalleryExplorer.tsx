"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems, type GalleryItem } from "@/content/gallery";
import { cn } from "@/lib/utils";
import { useLockBodyScroll } from "@/lib/use-lock-body-scroll";

interface LightboxProps {
  items: GalleryItem[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ items, initialIndex, onClose }: LightboxProps) {
  const [idx, setIdx] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(true);

  const go = useCallback(
    (delta: number) => {
      setIdx((prev) => {
        const next = prev + delta;
        if (next < 0) return items.length - 1;
        if (next >= items.length) return 0;
        return next;
      });
    },
    [items.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // Focus trap setup — focus the dialog on open
  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  const item = items[idx];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      tabIndex={-1}
      ref={dialogRef}
      className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-sm flex flex-col"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-paper/10">
        <span className="text-sm text-paper/60">
          {idx + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="inline-flex items-center justify-center w-10 h-10 text-paper hover:text-newsroom transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Image area */}
      <div className="flex-1 relative flex items-center justify-center p-5 sm:p-10">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous image"
          className="absolute left-2 sm:left-4 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-paper/70 hover:text-paper hover:bg-paper/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>

        <figure className="max-w-5xl w-full max-h-full flex flex-col items-center">
          {item.src ? (
             
            <img
              src={item.src}
              alt={item.alt}
              className="max-h-[70vh] w-auto max-w-full object-contain"
            />
          ) : (
            <div
              role="img"
              aria-label={item.alt}
              className="aspect-[3/2] w-full bg-paper-deep/10 border border-paper/20 flex items-center justify-center text-paper/40 text-sm uppercase tracking-[0.18em]"
            >
              Image pending
            </div>
          )}
          <figcaption className="mt-4 text-center max-w-2xl">
            {item.title && (
              <p className="font-serif text-lg text-paper">{item.title}</p>
            )}
            {item.caption && (
              <p className="mt-1 text-sm text-paper/70 leading-relaxed">
                {item.caption}
              </p>
            )}
            <p className="mt-2 text-xs text-paper/50">
              {[
                item.location,
                item.date,
                item.credit ? `© ${item.credit}` : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next image"
          className="absolute right-2 sm:right-4 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-paper/70 hover:text-paper hover:bg-paper/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
        >
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function GalleryExplorer() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <>
      <ul className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {galleryItems.map((item, idx) => (
          <li
            key={item.id}
            className={cn(
              "relative aspect-square",
              // Make the first item larger for visual hierarchy (editorial grid)
              idx === 0 && "col-span-2 row-span-2 aspect-square",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(idx)}
              aria-label={`Open image: ${item.title || "Untitled"}`}
              className="group block w-full h-full bg-paper-deep border border-rule overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {item.src ? (
                 
                <img
                  src={item.thumbnail ?? item.src}
                  alt={item.alt}
                  loading={idx < 4 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
                  <span className="font-serif text-xs uppercase tracking-[0.18em] text-ink-muted/70">
                    Image pending
                  </span>
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>

      {openIdx !== null && (
        <Lightbox
          items={galleryItems}
          initialIndex={openIdx}
          onClose={() => setOpenIdx(null)}
        />
      )}
    </>
  );
}
