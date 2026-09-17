import Link from "next/link";
import { siteConfig } from "@/content/site";
import { profile } from "@/content/profile";
import { memberships } from "@/content/memberships";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-rule bg-paper-deep/50">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Identity */}
          <div className="md:col-span-5">
            <p className="editorial-eyebrow mb-3">Journalist</p>
            <Link
              href="/"
              className="font-serif text-3xl font-semibold text-ink hover:text-newsroom transition-colors"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-2 text-ink-soft text-sm leading-relaxed max-w-sm">
              {siteConfig.title}
              <br />
              {profile.currentPosition.organization} · {siteConfig.location}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-5 inline-block text-sm text-ink hover:text-newsroom transition-colors link-underline"
            >
              {siteConfig.email}
            </a>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="editorial-eyebrow mb-4">Navigate</p>
            <ul className="grid grid-cols-1 gap-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-soft hover:text-newsroom transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Memberships */}
          <div className="md:col-span-4">
            <p className="editorial-eyebrow mb-4">Memberships</p>
            <ul className="grid grid-cols-1 gap-3">
              {memberships.map((m) => (
                <li key={m.id} className="text-sm">
                  <span className="text-ink font-medium">{m.organization}</span>
                  <br />
                  <span className="text-ink-muted">{m.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-rule flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-ink-muted">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-ink-muted">
            Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
