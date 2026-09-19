# Deployment Runbook — abdullahmozomdar.com

Stack: Next.js 15 (standalone) · SQLite via Prisma · Caddy reverse proxy.

## 1. Environment

Copy `.env.example` → `.env` and set:

```bash
DATABASE_URL="file:/absolute/path/to/db/custom.db"   # absolute path in production
RESEND_API_KEY="re_..."                              # optional — enables email delivery
CONTACT_TO="amozomdar@gmail.com"
CONTACT_FROM="Portfolio Contact <hello@abdullahmozomdar.com>"
```

Without `RESEND_API_KEY`, contact messages are still stored durably in
SQLite (table `ContactMessage`, flag `emailSent=false`).

## 2. Build & run

```bash
npm install
npm run db:generate
npm run db:push          # creates db/custom.db (first run only)
npm run build            # typecheck + build + copy static assets
PORT=3000 npm run start  # serves .next/standalone
```

Back up `db/custom.db` on a schedule — it holds contact messages.

## 3. Reverse proxy (Caddy)

The provided `Caddyfile` proxies :81 → localhost:3000 with zstd/gzip
compression and immutable caching for `/_next/static/*`. For a public
domain, replace the site address `:81` with the domain — Caddy
provisions HTTPS automatically.

## 4. Pre-launch checklist (owner actions)

- [ ] Replace the 5 demo stories in `src/content/stories.ts` with real
      published articles (slug, dates, publication, optional `articleUrl`).
      Delete entries you cannot replace — the site renders correctly
      with zero stories (honest empty states).
- [ ] Set `translationStatus: "reviewed"` on Bangla copy you have verified.
- [ ] Confirm the Bangla name spelling in `src/content/site.ts` and
      `src/content/profile.ts` (currently an unverified transliteration).
- [ ] Add a portrait: put the file in `public/`, set `portrait` in
      `src/content/profile.ts` and `src/content/site.ts`.
- [ ] Review placeholder reporting areas in `src/content/reporting-areas.ts`.
- [ ] Replace gallery placeholders in `src/content/gallery.ts`.
- [ ] Set `RESEND_API_KEY` and verify your sending domain at resend.com.

## 5. Updates

```bash
git pull
npm install          # if package.json changed
npm run build && npm run start
```

Static assets are content-hashed; only the server restart is required.
Downtime ≈ 2 seconds (restart window).
