// Run after npm run build. Checks the actual prerendered HTML and metadata routes.
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const origin = "https://abdullamozomdar.com";
const root = ".next/server/app";
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
}
const rows = [];
const extracted = {};
const titles = new Set();
const descriptions = new Set();
for (const file of walk(root).filter((file) => file.endsWith(".html") && !path.basename(file).startsWith("_"))) {
  const route = "/" + path.relative(root, file).replaceAll("\\", "/").replace(/\.html$/, "").replace(/^index$/, "");
  const html = fs.readFileSync(file, "utf8");
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? "");
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
  assert(title.length > 0 && title.length <= 60, `${route}: title length ${title.length}`);
  assert(description.length >= 140 && description.length <= 160, `${route}: description length ${description.length}`);
  assert(!titles.has(title), `${route}: duplicate title`);
  assert(!descriptions.has(description), `${route}: duplicate description`);
  assert.equal(canonical?.replace(/\/$/, ""), (origin + route).replace(/\/$/, ""), `${route}: canonical`);
  assert(schemas.length > 0, `${route}: missing JSON-LD`);
  for (const schema of schemas) assert.equal(schema["@context"], "https://schema.org");
  assert(!JSON.stringify(schemas).includes("https://abdullahmozomdar.com"), `${route}: stale origin`);
  const nodes = schemas.flatMap((schema) => schema["@graph"] ?? [schema]);
  if (route === "/" || route === "/about") {
    assert.equal(schemas.length, 1);
    const person = nodes.find((node) => node["@type"] === "Person");
    assert.equal(person["@id"], origin + "/#person");
    assert(person.alternateName && person.worksFor && person.alumniOf.length && person.memberOf.length);
    assert.equal(person.image, origin + "/image/portrait-hero.png");
    assert(!person.sameAs && !person.knowsAbout, "Unverified profiles/beats must be omitted");
    const page = nodes.find((node) => node["@type"] === (route === "/" ? "WebPage" : "ProfilePage"));
    assert.equal(page.about["@id"], person["@id"]);
    if (route === "/about") assert.equal(page.mainEntity["@id"], person["@id"]);
  }
  if (route === "/work" || route === "/articles") {
    const collection = nodes.find((node) => node["@type"] === "CollectionPage");
    assert.equal(collection.mainEntity.itemListElement.length, 5);
  }
  if (route.includes("/sample-")) assert(!nodes.some((node) => node["@type"] === "NewsArticle"), "Demo must not claim published NewsArticle status");
  titles.add(title);
  descriptions.add(description);
  extracted[route] = schemas;
  rows.push(`| ${route} | ${title.replaceAll("|", "\\|")} | ${title.length} | ${description.length} | Pass | Pass | Not run | Not run |`);
}
assert.equal(rows.length, 17);
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml.body"), "utf8");
const urls = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].map((match) => match[1]);
assert.equal(urls.length, 17);
for (const url of urls) {
  assert(url.includes(origin));
  if (!url.includes("/sample-")) assert(!url.includes("<lastmod>"));
}
const robots = fs.readFileSync(path.join(root, "robots.txt.body"), "utf8");
assert(robots.includes("Allow: /"));
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
fs.mkdirSync("reports", { recursive: true });
fs.writeFileSync("reports/seo-jsonld.json", JSON.stringify(extracted, null, 2) + "\n");
fs.writeFileSync("reports/seo-audit.md", `# SEO audit\n\nGenerated from production build HTML by \`node scripts/seo-audit.cjs\`.\n\nOwner-confirmed origin: ${origin}. DNS resolved to 64.29.17.65 and 216.198.79.65; Node HTTPS fetch returned 200 during this session. Changes are local, not deployed.\n\n| Route | Rendered title | Title chars | Description chars | Self canonical | Local JSON-LD checks | Schema.org validator | Google Rich Results |\n|---|---|---:|---:|---|---|---|---|\n${rows.join("\n")}\n\nAll 17 titles and descriptions are unique. Static sitemap entries omit lastmod; story entries retain their existing content dates. Robots allows public pages and names the confirmed sitemap host. API routes and generated image endpoints are not editorial pages; the 404 page is excluded.\n\n## Limits and owner work\n\n- External validator pages were reachable through web retrieval, but the first browser launch timed out; a pipe-based retry reached navigation and failed with net::ERR_NETWORK_ACCESS_DENIED. Neither validator produced a result. Local JSON parsing/assertions are not external validation or rich-result eligibility checks. Extracted JSON-LD is saved in seo-jsonld.json for code-input validation.\n- All five stories remain isDemo: true. Demo detail pages no longer emit NewsArticle claims. Dates in demo content are not verified publication dates. Replace placeholders with actual reporting; technical SEO cannot substitute for real content.\n- sameAs omitted pending owner-verified profile URLs. All seven reporting areas are placeholders; knowsAbout filters them out.\n- Existing single-URL EN/BN switching remains. Bangla has no separately indexable URL.\n- No deployment, ranking measurement, or Lighthouse score claimed.\n`);
console.log(`PASS: ${rows.length} rendered routes; unique metadata, canonical origins, JSON-LD, sitemap and robots. Reports saved in reports/.`);
