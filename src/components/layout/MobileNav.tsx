"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import { useLockBodyScroll } from "@/lib/use-lock-body-scroll";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  useLockBodyScroll(open);

  // Close on route change — compare against lastPath to avoid setState-in-effect warning
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

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-ink hover:text-newsroom transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[90] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={cn(
            "absolute right-0 top-0 h-full w-[min(86%,360px)] bg-paper border-l border-rule shadow-2xl flex flex-col transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-rule">
            <span className="font-serif text-lg font-semibold text-ink">
              {siteConfig.wordmark}
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center w-10 h-10 -mr-2 text-ink hover:text-newsroom transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6 scroll-thin">
            <ul className="flex flex-col gap-1">
              {siteConfig.nav.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block py-3 font-serif text-2xl text-ink hover:text-newsroom transition-colors border-b border-rule-soft",
                        isActive && "text-newsroom",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-6 py-6 border-t border-rule">
            <p className="editorial-eyebrow mb-2">Contact</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-ink hover:text-newsroom transition-colors link-underline"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
