import Link from "next/link";
import { siteConfig, navItems, navContact, languageLabels } from "@/content/site";
import { siteName } from "@/content/site-messages";
import { profile } from "@/content/profile";
import { memberships } from "@/content/memberships";
import { localeHref, otherLocale } from "@/i18n/config";
import type { Locale } from "@/content/types";

interface SiteFooterProps {
  locale: Locale;
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-night text-paper">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        {/* Top — oversized name */}
        <div className="border-b border-paper/15 pb-12 mb-12">
          <p className="editorial-eyebrow text-paper/50 mb-4">
            {locale === "en" ? "Journalist" : "সাংবাদিক"}
          </p>
          <h2 className="font-serif font-bold text-paper leading-[0.9] tracking-[-0.03em] text-[clamp(2.5rem,9vw,7rem)]">
            {siteName[locale].split(" ").map((part, i) => (
              <span key={i} className="block">
                {part}
              </span>
            ))}
          </h2>
          <p
            className="mt-6 text-paper/70 max-w-md"
            style={{ fontSize: "clamp(1rem, 1.2vw, 1.125rem)", lineHeight: 1.7 }}
          >
            {profile.title[locale]}
            <br />
            {profile.currentPosition.organization[locale]} · {profile.location[locale]}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Nav */}
          <nav className="col-span-1 md:col-span-3" aria-label="Footer">
            <p className="editorial-eyebrow text-paper/50 mb-5">
              {locale === "en" ? "Navigate" : "নেভিগেট"}
            </p>
            <ul className="space-y-3">
              {[{ label: { en: "Home", bn: "হোম" }, href: "/" }, ...navItems].map((item) => (
                <li key={item.href}>
                  <Link
                    href={localeHref(item.href, locale)}
                    className="text-paper/80 hover:text-newsroom transition-colors"
                    style={{ fontSize: "clamp(0.9375rem, 1vw, 1.0625rem)" }}
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="col-span-1 md:col-span-3">
            <p className="editorial-eyebrow text-paper/50 mb-5">
              {locale === "en" ? "Contact" : "যোগাযোগ"}
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
                href={localeHref(navContact.href, locale)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-paper border border-paper/30 px-4 py-2.5 hover:bg-paper hover:text-ink transition-colors"
              >
                {navContact.label[locale]}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          {/* Memberships */}
          <div className="col-span-2 md:col-span-3">
            <p className="editorial-eyebrow text-paper/50 mb-5">
              {locale === "en" ? "Memberships" : "সদস্যপদ"}
            </p>
            <ul className="space-y-4">
              {memberships.map((m) => (
                <li key={m.id}>
                  <span
                    className="text-paper font-medium font-serif"
                    style={{ fontSize: "clamp(1rem, 1.2vw, 1.125rem)" }}
                  >
                    {m.organization[locale]}
                  </span>
                  <br />
                  <span className="text-paper/60" style={{ fontSize: "0.9375rem" }}>
                    {m.role[locale]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Language */}
          <div className="col-span-2 md:col-span-3">
            <p className="editorial-eyebrow text-paper/50 mb-5">
              {locale === "en" ? "Language" : "ভাষা"}
            </p>
            <div className="flex items-center gap-3" style={{ fontSize: "clamp(0.9375rem, 1vw, 1.0625rem)" }}>
              <Link
                href={localeHref("/", "en")}
                className={locale === "en" ? "text-paper font-semibold" : "text-paper/50 hover:text-paper"}
              >
                EN
              </Link>
              <span aria-hidden="true" className="text-paper/30">|</span>
              <Link
                href={localeHref("/", "bn")}
                className={locale === "bn" ? "text-paper font-semibold" : "text-paper/50 hover:text-paper"}
              >
                {languageLabels.bn}
              </Link>
            </div>
            <div className="mt-8 pt-6 border-t border-paper/10">
              <p className="editorial-eyebrow text-paper/50 mb-2">
                {locale === "en" ? "Based in" : "অবস্থান"}
              </p>
              <p className="text-paper/70" style={{ fontSize: "0.9375rem" }}>{profile.location[locale]}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-paper/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-paper/50" style={{ fontSize: "0.8125rem" }}>
            © {year} {siteName[locale]}. {locale === "en" ? "All rights reserved." : "সর্বস্বত্ব সংরক্ষিত।"}
          </p>
          <p className="text-paper/50 font-mono" style={{ fontSize: "0.8125rem" }}>
            {locale === "en" ? "Dhaka, Bangladesh" : "ঢাকা, বাংলাদেশ"}
          </p>
        </div>
      </div>
    </footer>
  );
}
