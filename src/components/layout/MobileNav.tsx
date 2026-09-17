"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, navContact, languageLabels } from "@/content/site";
import { siteName } from "@/content/site-messages";
import { localeHref, switchLocalePath, otherLocale } from "@/i18n/config";
import { useLockBodyScroll } from "@/lib/use-lock-body-scroll";
import type { Locale } from "@/content/types";

interface MobileNavProps {
  locale: Locale;
  isHome: boolean;
}

export function MobileNav({ locale, isHome }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  useLockBodyScroll(open);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const other = otherLocale[locale];
  const otherPath = switchLocalePath(pathname, other);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className={cn(
          "lg:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 transition-colors",
          isHome && !open ? "text-paper hover:text-newsroom" : "text-ink hover:text-newsroom",
        )}
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[90] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={cn(
            "absolute right-0 top-0 h-full w-[min(88%,380px)] bg-paper border-l border-rule shadow-2xl flex flex-col transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-rule">
            <span className="font-serif text-xl font-bold text-ink">
              {siteName[locale]}
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center w-10 h-10 -mr-2 text-ink hover:text-newsroom transition-colors"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6 scroll-thin">
            <ul className="flex flex-col gap-0">
              {[{ label: { en: "Home", bn: "হোম" }, href: "/" }, ...navItems].map((item) => {
                const href = localeHref(item.href, locale);
                const isActive = pathname === href || (item.href !== "/" && pathname?.startsWith(href));
                return (
                  <li key={item.href}>
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block py-4 font-serif text-2xl transition-colors border-b border-rule-soft",
                        isActive ? "text-newsroom" : "text-ink hover:text-newsroom",
                      )}
                    >
                      {item.label[locale]}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 pt-6 border-t border-rule">
              <Link
                href={localeHref(navContact.href, locale)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-paper text-sm font-semibold uppercase tracking-[0.14em] hover:bg-newsroom transition-colors"
              >
                {navContact.label[locale]}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </nav>

          <div className="px-6 py-6 border-t border-rule flex items-center justify-between">
            <div className="text-xs text-ink-muted">
              <Link
                href={localeHref("/", locale)}
                className="hover:text-newsroom transition-colors"
              >
                {siteName[locale]}
              </Link>
            </div>
            <Link
              href={otherPath}
              className="text-xs font-semibold text-ink hover:text-newsroom transition-colors"
            >
              {locale === "en" ? languageLabels.bn : "EN"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
