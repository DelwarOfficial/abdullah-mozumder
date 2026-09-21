# SEO audit

Generated from production build HTML by `node scripts/seo-audit.cjs`.

Owner-confirmed origin: https://abdullamozomdar.com. DNS resolved to 64.29.17.65 and 216.198.79.65; Node HTTPS fetch returned 200 during this session. Changes are local, not deployed.

| Route | Rendered title | Title chars | Description chars | Self canonical | Local JSON-LD checks | Schema.org validator | Google Rich Results |
|---|---|---:|---:|---|---|---|---|
| /about | About — Abdullah Mozomdar | 25 | 149 | Pass | Pass | Not run | Not run |
| /articles/sample-city-report | Sample City Report \| Article — Abdullah Mozomdar | 48 | 150 | Pass | Pass | Not run | Not run |
| /articles/sample-feature-story | Sample Feature Story \| Article — Abdullah Mozomdar | 50 | 152 | Pass | Pass | Not run | Not run |
| /articles/sample-interview | Sample Interview \| Article — Abdullah Mozomdar | 46 | 148 | Pass | Pass | Not run | Not run |
| /articles/sample-multimedia-piece | Sample Multimedia Piece \| Article — Abdullah Mozomdar | 53 | 155 | Pass | Pass | Not run | Not run |
| /articles/sample-report-title | Sample Report Title \| Article — Abdullah Mozomdar | 49 | 151 | Pass | Pass | Not run | Not run |
| /articles | Articles — Abdullah Mozomdar | 28 | 156 | Pass | Pass | Not run | Not run |
| /contact | Contact — Abdullah Mozomdar | 27 | 157 | Pass | Pass | Not run | Not run |
| /experience | Experience — Abdullah Mozomdar | 30 | 154 | Pass | Pass | Not run | Not run |
| /gallery | Gallery — Abdullah Mozomdar | 27 | 153 | Pass | Pass | Not run | Not run |
| / | Abdullah Mozomdar — Journalist & Senior Reporter | 48 | 154 | Pass | Pass | Not run | Not run |
| /work/sample-city-report | Sample City Report \| Work — Abdullah Mozomdar | 45 | 151 | Pass | Pass | Not run | Not run |
| /work/sample-feature-story | Sample Feature Story \| Work — Abdullah Mozomdar | 47 | 153 | Pass | Pass | Not run | Not run |
| /work/sample-interview | Sample Interview \| Work — Abdullah Mozomdar | 43 | 149 | Pass | Pass | Not run | Not run |
| /work/sample-multimedia-piece | Sample Multimedia Piece \| Work — Abdullah Mozomdar | 50 | 156 | Pass | Pass | Not run | Not run |
| /work/sample-report-title | Sample Report Title \| Work — Abdullah Mozomdar | 46 | 152 | Pass | Pass | Not run | Not run |
| /work | Work — Abdullah Mozomdar | 24 | 148 | Pass | Pass | Not run | Not run |

All 17 titles and descriptions are unique. Static sitemap entries omit lastmod; story entries retain their existing content dates. Robots allows public pages and names the confirmed sitemap host. API routes and generated image endpoints are not editorial pages; the 404 page is excluded.

## Limits and owner work

- External validator pages were reachable through web retrieval, but the first browser launch timed out; a pipe-based retry reached navigation and failed with net::ERR_NETWORK_ACCESS_DENIED. Neither validator produced a result. Local JSON parsing/assertions are not external validation or rich-result eligibility checks. Extracted JSON-LD is saved in seo-jsonld.json for code-input validation.
- All five stories remain isDemo: true. Demo detail pages no longer emit NewsArticle claims. Dates in demo content are not verified publication dates. Replace placeholders with actual reporting; technical SEO cannot substitute for real content.
- sameAs omitted pending owner-verified profile URLs. All seven reporting areas are placeholders; knowsAbout filters them out.
- Existing single-URL EN/BN switching remains. Bangla has no separately indexable URL.
- No deployment, ranking measurement, or Lighthouse score claimed.
