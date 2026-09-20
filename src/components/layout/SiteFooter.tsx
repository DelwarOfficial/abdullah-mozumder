"use client";

import Link from "next/link";
import { siteConfig } from "@/content/site";
import { navItems, navContact, sectionLabels } from "@/i18n/ui";
import { siteName } from "@/i18n/ui";
import { profile } from "@/content/profile";
import { memberships } from "@/content/memberships";
import { useLanguage } from "@/i18n/language-context";

export function SiteFooter() {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-night text-paper">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12 py-14 sm:py-24">
        {/* Top — oversized name */}
        <div className="border-b border-paper/15 pb-10 mb-10 lg:pb-12 lg:mb-12">
          <p className="editorial-eyebrow text-paper/50 mb-4">
            {sectionLabels.journalist[language]}
          </p>
          <h2 className="font-serif font-bold text-paper leading-[0.9] tracking-[-0.03em] text-[clamp(2.5rem,9vw,7rem)]">
            {siteName[language].split(" ").map((part, i) => (
              <span key={i} className="block">
                {part}
              </span>
            ))}
          </h2>
          <p
            className="mt-6 text-paper/70 max-w-md"
            style={{ fontSize: "clamp(1rem, 1.2vw, 1.125rem)", lineHeight: 1.7 }}
          >
            {profile.title[language]}
            <br />
            {profile.currentPosition.organization[language]}, {profile.location[language]}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Nav */}
          <nav className="col-span-1 md:col-span-3" aria-label={language === "en" ? "Footer" : "ফুটার মেনু"}>
            <p className="editorial-eyebrow text-paper/50 mb-5">
              {sectionLabels.navigate[language]}
            </p>
            <ul className="space-y-3">
              {[{ label: sectionLabels.home, href: "/" }, ...navItems].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-paper/80 hover:text-newsroom transition-colors"
                    style={{ fontSize: "clamp(0.9375rem, 1vw, 1.0625rem)" }}
                  >
                    {item.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="col-span-1 md:col-span-3">
            <p className="editorial-eyebrow text-paper/50 mb-5">
              {sectionLabels.contact[language]}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-paper hover:text-newsroom transition-colors link-underline break-all"
              style={{ fontSize: "clamp(0.9375rem, 1vw, 1.0625rem)" }}
            >
              {siteConfig.email}
            </a>
            <div className="mt-6">
              <Link
                href={navContact.href}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-paper border border-paper/30 px-4 py-2.5 hover:bg-paper hover:text-ink transition-colors"
              >
                {navContact.label[language]}
              </Link>
            </div>
          </div>

          {/* Memberships */}
          <div className="col-span-2 md:col-span-3">
            <p className="editorial-eyebrow text-paper/50 mb-5">
              {sectionLabels.memberships[language]}
            </p>
            <ul className="space-y-4">
              {memberships.map((m) => (
                <li key={m.id}>
                  <span
                    className="text-paper font-medium font-serif"
                    style={{ fontSize: "clamp(1rem, 1.2vw, 1.125rem)" }}
                  >
                    {m.organization[language]}
                  </span>
                  <br />
                  <span className="text-paper/60" style={{ fontSize: "0.9375rem" }}>
                    {m.role[language]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Language + location */}
          <div className="col-span-2 md:col-span-3">
            <p className="editorial-eyebrow text-paper/50 mb-5">
              {sectionLabels.language[language]}
            </p>
            <div className="flex items-center gap-3" style={{ fontSize: "clamp(0.9375rem, 1vw, 1.0625rem)" }}>
              <span className={language === "en" ? "text-paper font-semibold" : "text-paper/50"}>
                EN
              </span>
              <span aria-hidden="true" className="text-paper/30">|</span>
              <span className={language === "bn" ? "text-paper font-semibold" : "text-paper/50"}>
                {language === "en" ? "বাংলা" : "Bangla"}
              </span>
            </div>
            <div className="mt-8 pt-6 border-t border-paper/10">
              <p className="editorial-eyebrow text-paper/50 mb-2">
                {sectionLabels.basedIn[language]}
              </p>
              <p className="text-paper/70" style={{ fontSize: "0.9375rem" }}>{profile.location[language]}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-paper/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-paper/50" style={{ fontSize: "0.8125rem" }}>
            © {year} {siteName[language]}. {sectionLabels.allRights[language]}
          </p>
          <p className="text-paper/50 font-mono" style={{ fontSize: "0.8125rem" }}>
            {profile.location[language]}
          </p>
        </div>
      </div>
    </footer>
  );
}
