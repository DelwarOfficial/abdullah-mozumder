# Abdullah Mozomdar — Personal Newsroom

Production-grade bilingual portfolio for Bangladeshi journalist **Abdullah Mozomdar**, Senior Reporter at *Daily Banijjo Pratidin*. A digital publication that reads like an editorial broadsheet on desktop and behaves like a fast, focused journalism app on mobile.

**Live URL:** https://abdullahmozomdar.com

---

## Features

### Two languages, ONE React application (EN / বাংলা)
- **Language is a user preference, not a URL** — one domain, one route tree, one build. No `/en`, no `/bn`.
- Switching EN ⇄ বাংলা is **instant**: updates localized text in place via React — no reload, no navigation, no network request, no scroll jump.
- Persisted in `localStorage` (`site-language`); survives refresh, navigation and return visits; pre-paint script sets `<html lang>` before paint.
- Zero-dependency runtime (`useSyncExternalStore` store + provider, ~2KB) — no i18n framework, no state manager, **zero runtime machine translation**: both languages ship in the typed content layer.
- Server metadata stays in one stable language (English, the default) — the SEO-honest single-URL model: one canonical per page, no fake hreflang, legacy `/en/*` & `/bn/*` URLs 301-redirect preserving slugs.
- Locale-aware dates via `Intl.DateTimeFormat` (`১২ সেপ্টেম্বর ২০২৬`) and Bangla numerals (২০২৫) — never hand-maintained strings; ISO dates and JSON-LD stay machine-correct.
- Dedicated Bangla typography: Noto Serif Bengali, relaxed line-height, no letter-spacing artifacts, conjunct-safe display rules, drop caps disabled.
- Switch preserves the exact page and never resets the theme (and vice versa).

### Complete light / dark / system theme
- Editorial dark palette ("late-night newsroom") — not an inverted light theme
- Pre-paint inline script: **zero theme flash, zero hydration mismatch**
- Choice persists in `localStorage`; `system` follows `prefers-color-scheme` live
- Chapter rhythm preserved: dark hero / statement / principles sections stay deepest in dark mode and contrast against paper sections in light mode
- Theme-aware browser `theme-color`, form autofill, native controls (`color-scheme`)

### Mobile app shell
- Bottom navigation (হোম · প্রতিবেদন · লেখা · গ্যালারি · মেনু) with active-state indicator — mobile only
- Full-screen menu sheet with focus trap, Escape/backdrop close, scroll lock
- `env(safe-area-inset-*)` aware; content never hides behind the nav
- 44px+ touch targets, edge-to-edge featured story, native Web Share, swipeable gallery lightbox
- Desktop keeps the full editorial header — bottom nav never appears ≥ `lg`

### Editorial identity
- 12-column asymmetric grid, oversized serif display type, chapter marks (01 /, 02 /…)
- Warm paper light theme + deep ink dark theme, newsroom-red accent
- Typography-led sections: no card soup, no generic rounded blocks

### SEO & accessibility
- Per-locale canonical + hreflang + `x-default`, Open Graph (`bn_BD` / `en_US`), Twitter cards
- JSON-LD: `Person`, `WebSite`, `NewsArticle`, `BreadcrumbList`
- Generated 1200×630 social card (`next/og`), PNG favicon + Apple touch icon, web manifest
- `sitemap.xml` with per-locale alternates, `robots.txt`
- Semantic landmarks, skip link, focus-visible rings, `aria-current` navigation, keyboard-complete overlays, `prefers-reduced-motion` respected, dark-mode contrast

### Contact pipeline
1. Honeypot field → bots get a fake success, nothing stored
2. Server-side validation + length caps (mirrors client validation)
3. Per-IP in-memory rate limit (5/min, self-pruning)
4. **Durable storage** — every real submission is written to SQLite (`ContactMessage`)
5. Optional email delivery via Resend REST API — failure never loses the message (`emailSent` flag records it)

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, `output: "standalone"`, Turbopack) |
| UI | React 19, Tailwind CSS v4, shadcn/ui primitives, lucide-react |
| Language | TypeScript (strict; build fails on type errors) |
| Data | Prisma 6 + SQLite (contact submissions) |
| Fonts | Inter, Newsreader, Noto Serif Bengali (self-hosted via `next/font`) |
| Images | `next/og` for social card & icons |
| Server | Node ≥ 20, Caddy reverse proxy |

No animation frameworks, no state managers, no localization libraries — the i18n layer is ~40 lines of typed helpers.

---

## Project structure

```
src/
├── app/                        # ONE route tree — no locale dimension
│   ├── layout.tsx              # fonts, theme+language pre-paint script, shell
│   ├── page.tsx                # /            (home)
│   ├── about/page.tsx          # /about
│   ├── experience/page.tsx     # /experience
│   ├── work/page.tsx           # /work
│   ├── work/[slug]/page.tsx    # /work/[slug] (SSG)
│   ├── articles/page.tsx       # /articles
│   ├── articles/[slug]/page.tsx
│   ├── gallery/page.tsx  contact/page.tsx
│   ├── not-found.tsx           # branded, preference-aware 404
│   ├── opengraph-image.tsx     # generated 1200×630 social card
│   ├── icon.tsx / apple-icon.tsx / sitemap.ts / robots.ts
│   └── api/contact/route.ts    # honeypot → validate → rate-limit → DB → email
├── components/
│   ├── layout/                 # SiteHeader, SiteFooter, MobileShell, ThemeToggle,
│   │                           #   LanguageSwitcher (instant toggle), 404 screen
│   ├── pages/                  # client content roots per page (useLanguage)
│   ├── home/                   # Hero, SelectedReporting, NewsDesk, Career, …
│   ├── journalism/ gallery/ contact/ seo/ ui/ ui-editorial/
├── content/                    # editorial content — typed, bilingual (L(en, bn))
│   ├── profile.ts / stories.ts / experiences.ts / education.ts
│   ├── memberships.ts / reporting-areas.ts / gallery.ts / types.ts
├── i18n/
│   ├── ui.ts                   # UI dictionary (nav, labels, chrome) — separate
│   │                           #   from journalism content
│   └── language-context.tsx    # language store + provider + hook
└── lib/                        # db (Prisma), theme, format (dates/numerals), seo
```

Each page is a thin **server** component (metadata + JSON-LD + static shell)
wrapping a client content root that consumes `useLanguage()`. English is
prerendered to HTML; the visible tree re-renders in place on language switch.

---

## Getting started

```bash
npm install
cp .env.example .env       # set DATABASE_URL (see below)
npm run db:generate
npm run db:push            # creates db/custom.db — first run only
npm run dev                # http://localhost:3000
```

### Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Typecheck + production build + copy static assets into standalone |
| `npm run start` | Serve the standalone build (honours `PORT`, defaults 3000) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:generate` | Regenerate Prisma client after schema changes |
| `npm run db:push` | Sync schema to SQLite |

### Environment (`.env`)

```bash
DATABASE_URL="file:./db/custom.db"        # use an ABSOLUTE path in production
RESEND_API_KEY="re_..."                   # optional — enables contact emails
CONTACT_TO="amozomdar@gmail.com"
CONTACT_FROM="Portfolio Contact <hello@abdullahmozomdar.com>"
```

---

## Editing content

All copy lives in **`src/content/*.ts`** as typed bilingual fields:

```ts
L("Selected Journalism", "নির্বাচিত প্রতিবেদন")
```

- **Add a story** → append to `stories.ts` (slug, ISO `publishedAt`, category, deck, summary, body blocks). The UI is index-safe: the site renders correctly with zero stories (honest empty states).
- **Dates** → store ISO only (`"2026-09-12"`); display formatting is automatic per locale.
- **Bangla quality bar** → a Bangladeshi newsroom editor should be able to write it; flag anything unreviewed with `translationStatus: "needs-review"` (never rendered publicly).
- **Facts policy** → EN and BN must agree on employers, roles, dates, memberships. Demo stories are badged `Demo / নমুনা` on-screen; the Bangla name spelling remains an unverified placeholder until confirmed by the journalist.

Rebuild after content changes — pages are statically generated.

---

## Theming architecture (for developers)

- `src/lib/theme.ts` — theme store, pre-paint `themeInitScript`, `applyTheme()`
- `ThemeToggle` reads the choice via `useSyncExternalStore` (no effect-time setState, no hydration mismatch)
- Tokens are semantic CSS variables (`--paper`, `--ink`, `--rule`, `--newsroom`, …) defined in `globals.css`; `.dark` redefines them. **Never hardcode** `#fff`/`black` in components — use tokens.
- Section backgrounds use `--night` tokens so the dark/light chapter rhythm survives both themes.

---

## Deployment

Full runbook: **[`DEPLOYMENT.md`](./DEPLOYMENT.md)** — env, build, Caddy, updates, and the owner pre-launch checklist (real articles, Bangla name verification, Resend key).

Short version:

```bash
npm ci
npm run build
DATABASE_URL="file:/abs/path/db/custom.db" PORT=3000 npm run start
```

Back up `db/custom.db` on a schedule — it holds contact messages.

---

## Quality gates (current status)

- ESLint: clean · TypeScript: clean (build-enforced) · Production build: 26 static pages (single-URL tree)
- Live-verified: all routes 200, legacy `/en/*` + `/bn/*` 308→301-equivalent redirects preserving slugs, contact POST persists to DB, honeypot silent, security headers present, branded 404
- One canonical per page, zero hreflang, sitemap = single URLs only, `og:image` on every route
- Zero hydration warnings; no-flash theme; no-reload language switching
- Images: `next/image` everywhere — portrait in hero/about, real story heroes, 12-photo gallery, mastheads on experience rows

---

## License & credits

© Abdullah Mozomdar. All rights reserved. Editorial design system built as a bespoke Next.js application.
