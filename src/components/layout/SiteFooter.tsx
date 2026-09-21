"use client";

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/content/site";
import { navItems, navContact, sectionLabels, siteName } from "@/i18n/ui";
import { profile } from "@/content/profile";
import { useLanguage } from "@/i18n/language-context";

/**
 * Modern compact footer — identity / links / contact.
 */
export function SiteFooter() {
  const { language } = useLanguage();
  const en = language === "en";
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-rule bg-card">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-newsroom text-white text-sm font-bold">
                AM
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-ink">{siteName[language]}</p>
                <p className="text-xs text-ink-muted">{profile.title[language]}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-ink-soft leading-relaxed max-w-xs">
              {profile.shortBio[language]}
            </p>
          </div>

          {/* Links */}
          <nav aria-label={en ? "Footer" : "ফুটার মেনু"}>
            <p className="text-sm font-semibold text-ink mb-4">{en ? "Quick links" : "গুরুত্বপূর্ণ লিংক"}</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {[
                { label: sectionLabels.home, href: "/" },
                ...navItems,
                { label: navContact.label, href: navContact.href },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ink-soft hover:text-newsroom transition-colors">
                    {item.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-ink mb-4">{sectionLabels.contact[language]}</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 text-ink-soft hover:text-newsroom transition-colors break-all">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-ink-soft">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                {profile.location[language]}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-rule flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-ink-muted">
            © {year} {siteName[language]}. {sectionLabels.allRights[language]}
          </p>
          <p className="text-xs text-ink-muted">{profile.location[language]}</p>
        </div>
      </div>
    </footer>
  );
}
