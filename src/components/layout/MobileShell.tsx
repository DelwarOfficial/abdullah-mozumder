"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Home, Newspaper, PenLine, Images, Menu as MenuIcon, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, navContact, sectionLabels, siteConfig } from "@/content/site";
import { siteName } from "@/content/site-messages";
import { localeHref, otherLocale } from "@/i18n/config";
import { useLockBodyScroll } from "@/lib/use-lock-body-scroll";
import { ThemeToggle } from "./ThemeToggle";
import type { Locale } from "@/content/types";

/**
 * Mobile app shell — bottom navigation + full-screen menu sheet.
 * Rendered below the lg breakpoint only; desktop keeps the editorial header.
 */
export function MobileShell({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useLockBodyScroll(open);

  // Close the sheet on navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  // Escape closes; focus moves into the sheet, back to the trigger on close.
  // Tab is kept inside the sheet while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const sheet = document.getElementById("mobile-menu-sheet");
      if (!sheet) return;
      const focusable = sheet.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!sheet.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) menuBtnRef.current?.focus();
  }, [open]);

  const isActive = (href: string) => {
    const full = localeHref(href, locale);
    return pathname === full || (href !== "/" && pathname?.startsWith(full));
  };

  const bottomItems = [
    { label: sectionLabels.home, href: "/", Icon: Home },
    { label: sectionLabels.work, href: "/work", Icon: Newspaper },
    { label: sectionLabels.articles, href: "/articles", Icon: PenLine },
    { label: sectionLabels.gallery, href: "/gallery", Icon: Images },
  ];

  const other = otherLocale[locale];

  return (
    <>
      {/* Bottom navigation — mobile only */}
      <nav
        aria-label={locale === "en" ? "Primary" : "প্রধান মেনু"}
        className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden border-t border-rule bg-paper/95 backdrop-blur-md supports-[backdrop-filter]:bg-paper/90"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <ul className="grid grid-cols-5">
          {bottomItems.map(({ label, href, Icon }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={localeHref(href, locale)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex flex-col items-center justify-center gap-1 min-h-[56px] transition-colors",
                    active ? "text-newsroom" : "text-ink-muted hover:text-ink",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-0 h-[2px] bg-newsroom transition-all duration-300",
                      active ? "w-8 opacity-100" : "w-0 opacity-0",
                    )}
                  />
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="text-[0.6875rem] font-medium leading-none">
                    {label[locale]}
                  </span>
                </Link>
              </li>
            );
          })}
          <li>
            <button
              ref={menuBtnRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu-sheet"
              onClick={() => setOpen(true)}
              aria-label={sectionLabels.menu[locale]}
              className="relative flex flex-col items-center justify-center gap-1 w-full min-h-[56px] text-ink-muted hover:text-ink transition-colors"
            >
              <MenuIcon className="h-5 w-5" aria-hidden="true" />
              <span className="text-[0.6875rem] font-medium leading-none">
                {sectionLabels.menu[locale]}
              </span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Full-screen menu sheet */}
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
          id="mobile-menu-sheet"
          role="dialog"
          aria-modal="true"
          aria-label={sectionLabels.menu[locale]}
          className={cn(
            "absolute inset-0 bg-paper flex flex-col transition-transform duration-300 ease-out",
            open ? "translate-y-0" : "-translate-y-full",
          )}
        >
          {/* Sheet header */}
          <div
            className="flex items-center justify-between px-5 h-14 border-b border-rule shrink-0"
            style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
          >
            <span className="font-serif text-xl font-bold text-ink">
              {siteName[locale]}
            </span>
            <button
              ref={closeRef}
              type="button"
              aria-label={locale === "en" ? "Close menu" : "মেনু বন্ধ করুন"}
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center w-11 h-11 -mr-2 text-ink hover:text-newsroom transition-colors"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Primary destinations */}
          <nav className="flex-1 overflow-y-auto px-5 py-6 scroll-thin" aria-label={locale === "en" ? "Menu" : "মেনু"}>
            <ul>
              {[
                { label: sectionLabels.home, href: "/" },
                ...navItems,
              ].map((item) => {
                const href = localeHref(item.href, locale);
                const active = pathname === href || (item.href !== "/" && pathname?.startsWith(href));
                return (
                  <li key={item.href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between min-h-[52px] font-serif text-2xl transition-colors border-b border-rule-soft",
                        active ? "text-newsroom" : "text-ink hover:text-newsroom",
                      )}
                    >
                      {item.label[locale]}
                      {active && <span aria-hidden="true" className="h-1.5 w-1.5 bg-newsroom" />}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href={localeHref(navContact.href, locale)}
              className="mt-8 flex items-center justify-center gap-2 min-h-[48px] px-5 bg-ink text-paper text-sm font-semibold uppercase tracking-[0.14em] hover:bg-newsroom transition-colors"
            >
              {navContact.label[locale]}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </nav>

          {/* Settings — theme + language */}
          <div
            className="px-5 pt-5 border-t border-rule shrink-0 bg-paper-deep/40"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="editorial-eyebrow">
                {locale === "en" ? "Theme" : "থিম"}
              </span>
              <ThemeToggle locale={locale} variant="icons" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="editorial-eyebrow">
                {sectionLabels.language[locale]}
              </span>
              <div className="flex items-center gap-2 text-sm">
                <Link
                  href={localeHref("/", "en")}
                  className={cn("px-2 py-1.5", locale === "en" ? "text-ink font-semibold" : "text-ink-muted hover:text-ink")}
                >
                  EN
                </Link>
                <span aria-hidden="true" className="text-rule">|</span>
                <Link
                  href={localeHref("/", "bn")}
                  className={cn("px-2 py-1.5", locale === "bn" ? "text-ink font-semibold" : "text-ink-muted hover:text-ink")}
                >
                  বাংলা
                </Link>
              </div>
            </div>
            <p className="mt-4 text-[0.6875rem] text-ink-muted">
              © {new Date().getFullYear()} {siteName[locale]} · {siteConfig.url.replace("https://", "")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
