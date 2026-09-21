"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navItems, navContact, sectionLabels } from "@/i18n/ui";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/language-context";

const navWithHome = [{ label: { en: "Home", bn: "হোম" }, href: "/" }, ...navItems];

export function SiteHeader() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-paper/90 backdrop-blur-md border-b border-rule shadow-[var(--shadow-card)]"
          : "bg-paper border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className={cn("flex items-center justify-between gap-4 transition-all", scrolled ? "h-14" : "h-16")}>
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-newsroom rounded-md"
            aria-label={language === "en" ? "Abdullah Mozomdar — home" : "আবদুল্লাহ মোজুমদার — হোম"}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-newsroom text-white text-sm font-bold">
              AM
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-bold text-ink">
                {language === "en" ? "Abdullah Mozomdar" : "আবদুল্লাহ মোজুমদার"}
              </span>
              <span className="text-[0.6875rem] text-ink-muted">
                {language === "en" ? "Journalist" : "সাংবাদিক"}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label={sectionLabels.primaryNav[language]} className="hidden lg:flex items-center gap-1">
            {navWithHome.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-newsroom",
                    isActive ? "text-newsroom" : "text-ink-soft hover:text-ink hover:bg-paper-deep",
                  )}
                >
                  {item.label[language]}
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher className="text-sm font-medium text-ink-soft" />
            <ThemeToggle className="text-ink-soft" />
            <Link
              href={navContact.href}
              className="hidden sm:inline-flex btn btn-primary !h-10 !px-4 !text-sm"
            >
              {navContact.label[language]}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
