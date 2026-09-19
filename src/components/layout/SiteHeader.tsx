"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site";
import { navItems, navContact, languageLabels } from "@/content/site";
import { siteName } from "@/content/site-messages";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { localeHref, otherLocale } from "@/i18n/config";
import type { Locale } from "@/content/types";

interface SiteHeaderProps {
  locale: Locale;
}

export function SiteHeader({ locale }: SiteHeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setAtTop(y < 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Determine if we're on the homepage (hero is full-screen there)
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const onHero = isHome && atTop;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-safe-header",
        onHero
          ? "bg-transparent"
          : "bg-paper/95 backdrop-blur-md border-b border-rule supports-[backdrop-filter]:bg-paper/85",
      )}
    >
      <div className="mx-auto max-w-[1560px] px-4 sm:px-8 lg:px-12">
        <div className={cn(
          "flex items-center justify-between gap-3 transition-all duration-300",
          scrolled ? "h-14" : "h-14 lg:h-20",
        )}>
          {/* Wordmark */}
          <Link
            href={localeHref("/", locale)}
            className="group inline-flex items-baseline gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink shrink-0"
            aria-label={`${siteName[locale]} — ${locale === "en" ? "home" : "হোম"}`}
          >
            <span className={cn(
              "font-serif font-bold tracking-tight transition-all duration-300",
              onHero ? "text-paper" : "text-ink",
              scrolled ? "text-xl" : "text-xl lg:text-2xl",
            )}>
              {siteConfig.wordmark}
            </span>
            <span className={cn(
              "hidden sm:inline-block font-sans font-medium tracking-wide transition-all duration-300 text-xs",
              onHero ? "text-paper/70" : "text-ink-muted",
            )}>
              {siteName[locale]}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label={locale === "en" ? "Primary" : "প্রধান মেনু"}
            className="hidden lg:flex items-center gap-8"
          >
            {navItems.map((item) => {
              const href = localeHref(item.href, locale);
              const isActive = pathname === href || (item.href !== "/" && pathname?.startsWith(href));
              return (
                <Link
                  key={item.href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative font-medium tracking-wide transition-colors hover:opacity-100",
                    onHero
                      ? isActive ? "text-paper" : "text-paper/70 hover:text-paper"
                      : isActive ? "text-ink" : "text-ink-muted hover:text-ink",
                  )}
                  style={{ fontSize: "0.9375rem" }}
                >
                  {item.label[locale]}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-[2px] transition-all duration-300",
                      onHero ? "bg-paper" : "bg-newsroom",
                      isActive ? "w-full" : "w-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right cluster — brand, theme, language, contact */}
          <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-5">
            <ThemeToggle
              locale={locale}
              className={cn(onHero ? "text-paper" : "text-ink")}
            />

            <LanguageSwitcher
              locale={locale}
              other={otherLocale[locale]}
              otherLabel={languageLabels[otherLocale[locale]]}
              isHome={onHero}
            />

            <Link
              href={localeHref(navContact.href, locale)}
              className={cn(
                "hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
                onHero
                  ? "border border-paper/30 text-paper hover:bg-paper hover:text-ink"
                  : "bg-ink text-paper hover:bg-newsroom",
              )}
            >
              {navContact.label[locale]}
              <span aria-hidden="true" className="text-[0.9em]">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
