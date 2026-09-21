"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/language-context";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  src: string;
  alt: { en: string; bn: string };
  /** object-position that keeps the subject centred in the 4:5 frame */
  position: string;
}

const slides: HeroSlide[] = [
  {
    src: "/image/portrait-hero.png",
    alt: {
      en: "Abdullah Mozomdar, Senior Reporter, seated for a formal portrait",
      bn: "আবদুল্লাহ মোজুমদার, সিনিয়র রিপোর্টার, পেশাগত পোর্ট্রেটে",
    },
    position: "68% 20%",
  },
  {
    src: "/image/profile.webp",
    alt: {
      en: "Abdullah Mozomdar at a press conference",
      bn: "সংবাদ সম্মেলনে আবদুল্লাহ মোজুমদার",
    },
    position: "50% 18%",
  },
  {
    src: "/image/on-assignment.png",
    alt: {
      en: "Abdullah Mozomdar on assignment at a public event",
      bn: "জনসমাবেশে প্রতিবেদন চলাকালীন আবদুল্লাহ মোজুমদার",
    },
    position: "62% 28%",
  },
];

const INTERVAL = 5200;

/**
 * Hero portrait — gentle crossfade through real photographs.
 * Autoplay pauses on hover/focus and is disabled for reduced motion;
 * dots give manual, keyboard-accessible control.
 */
export function HeroCarousel() {
  const { language } = useLanguage();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused, reduced]);

  return (
    <div
      className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-rule shadow-[var(--shadow-card-hover)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={i === active ? slide.alt[language] : ""}
          fill
          priority={i === 0}
          quality={85}
          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 420px, 100vw"
          className={cn(
            "object-cover transition-opacity duration-700",
            i === active ? "opacity-100" : "opacity-0",
          )}
          style={{ objectPosition: slide.position }}
          aria-hidden={i !== active}
        />
      ))}

      {/* Slide dots — manual control, ≥44px hit area, clear of the name plate */}
      <div
        role="tablist"
        aria-label={language === "en" ? "Portrait photos" : "পোর্ট্রেট ছবি"}
        className="absolute top-3 right-3 z-10 flex items-center gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur-sm"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`${language === "en" ? "Photo" : "ছবি"} ${i + 1}`}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              i === active ? "h-2.5 w-6 bg-white" : "h-2.5 w-2.5 bg-white/55 hover:bg-white/80",
            )}
          />
        ))}
      </div>
    </div>
  );
}
