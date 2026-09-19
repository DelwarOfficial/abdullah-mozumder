# Abdullah Mozomdar — Personal Newsroom

Production-grade bilingual portfolio for Bangladeshi journalist **Abdullah Mozomdar**, Senior Reporter at *Daily Banijjo Pratidin*. A digital publication that reads like an editorial broadsheet on desktop and behaves like a fast, focused journalism app on mobile.

**Live URL:** https://abdullahmozomdar.com

---

## Features

### Bilingual by design (EN / বাংলা)
- Every route under `/en/*` and `/bn/*` — fully static, 41 prerendered pages
- Bangla rewritten as **natural newsroom Bengali**, not machine translation
- Locale-aware dates via `Intl.DateTimeFormat` (`১২ সেপ্টেম্বর ২০২৬`) and Bangla numerals (২০২৫) — never hand-maintained strings
- Dedicated Bangla typography: Noto Serif Bengali, relaxed line-height, no letter-spacing artifacts, drop caps disabled
- Language switch preserves the exact page (`/en/work/story` → `/bn/work/story`)
- Machine-readable data (ISO dates, URLs, JSON-LD) stays technically correct in both locales

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
├── app/
│   ├── layout.tsx              # fonts, theme init script, viewport, metadata
│   ├── opengraph-image.tsx     # generated 1200×630 social card
│   ├── icon.tsx / apple-icon.tsx
│   ├── sitemap.ts / robots.ts
│   ├── not-found.tsx           # branded, locale-aware 404
│   ├── api/contact/route.ts    # honeypot → validate → rate-limit → DB → email
│   └── [locale]/               # en | bn — all pages (home, about, experience,
│                               #   work, articles, gallery, contact, 404)
├── components/
│   ├── layout/                 # SiteHeader, SiteFooter, MobileShell (bottom nav +
│   │                           #   menu sheet), ThemeToggle, LanguageSwitcher, 404
│   ├── home/                   # Hero, SelectedReporting, NewsDesk, Career, …
│   ├── journalism/             # Work/Articles explorers, ShareButtons, ReadingProgress
│   ├── contact/ gallery/ seo/ ui/ ui-editorial/
├── content/                    # ← ALL editable copy lives here (typed, bilingual)
│   ├── site.ts                 # identity, nav, section labels
│   ├── profile.ts              # bio, headline, current position
│   ├── stories.ts              # journalism archive
│   ├── experiences.ts / education.ts / memberships.ts
│   ├── reporting-areas.ts / gallery.ts
│   └── types.ts                # Localized<T> + L() helper
├── i18n/config.ts              # localeHref, switchLocalePath, stripLocale
└── lib/                        # db (Prisma), theme, format (dates/numerals)
```

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

- ESLint: clean · TypeScript: clean (build-enforced) · Production build: 41 pages
- Live-verified: all routes 200, contact POST persists to DB, honeypot silent, security headers present (`X-Frame-Options`, `nosniff`, `Referrer-Policy`, HSTS in prod), OG/icon endpoints render, branded localized 404
- Images: `next/image` everywhere (responsive srcset, AVIF/WebP via sharp) — portrait in hero/about, real story heroes, 12-photo gallery, publication mastheads on experience rows; every route emits a correct `og:image`
- Zero hydration warnings; CLS-safe theme and fonts

---

## License & credits

© Abdullah Mozomdar. All rights reserved. Editorial design system built as a bespoke Next.js application.
