"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "bg-paper/95 backdrop-blur-md border-rule supports-[backdrop-filter]:bg-paper/85 py-2"
          : "bg-paper border-transparent py-3.5",
      )}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Wordmark */}
          <Link
            href="/"
            className="group inline-flex items-baseline gap-2 font-serif font-semibold text-ink hover:text-newsroom transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            aria-label={`${siteConfig.name} — home`}
          >
            <span className={cn(
              "transition-all duration-300",
              scrolled ? "text-base" : "text-lg",
            )}>
              {siteConfig.wordmark}
            </span>
            <span className={cn(
              "hidden sm:inline-block text-ink-muted font-sans font-medium tracking-wide transition-all duration-300",
              scrolled ? "text-[0.7rem]" : "text-xs",
            )}>
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-7"
          >
            {siteConfig.nav.slice(1).map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative text-sm font-medium tracking-wide transition-colors",
                    "hover:text-ink",
                    isActive ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-[2px] bg-newsroom transition-all duration-300",
                      isActive ? "w-full" : "w-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            {/* Language toggle (architecture only — does not switch content yet) */}
            <span
              className="hidden sm:inline-flex items-center gap-1 text-[0.7rem] font-medium text-ink-muted"
              aria-label="Language (architecture ready — Bangla content not yet implemented)"
              title="Language switching architecture ready. Bangla content will be added."
            >
              <span className="text-ink">EN</span>
              <span aria-hidden="true" className="text-rule">/</span>
              <span className="opacity-50">বাংলা</span>
            </span>

            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] bg-ink text-paper hover:bg-newsroom transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Get in touch
            </Link>

            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
