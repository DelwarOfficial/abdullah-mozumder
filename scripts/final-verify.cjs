/* Final verification: routes, carousel, language, theme, JSON-LD, contact, console */
const puppeteer = require("puppeteer-core");

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE = "http://127.0.0.1:3100";
let failures = 0;
const ok = (name, cond) => { console.log(`${cond ? "PASS" : "FAIL"}  ${name}`); if (!cond) failures++; };

(async () => {
  const b = await puppeteer.launch({
    executablePath: EDGE, headless: "new",
    args: ["--disable-gpu", "--no-sandbox", "--hide-scrollbars"],
  });

  // --- routes ---
  for (const [u, expect] of [
    ["/", 200], ["/about", 200], ["/experience", 200], ["/work", 200],
    ["/work/sample-report-title", 200], ["/articles", 200],
    ["/articles/sample-interview", 200], ["/gallery", 200], ["/contact", 200],
    ["/no-such-page", 404], ["/en", 308],
  ]) {
    const res = await fetch(BASE + u, { redirect: "manual" });
    ok(`route ${u} -> ${expect}`, res.status === expect);
  }

  // --- main page: hydration, carousel, language, theme, JSON-LD, console ---
  const page = await b.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 120)); });
  page.on("pageerror", (e) => errors.push("PAGEERROR " + String(e).slice(0, 200)));

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));

  ok("JSON-LD Person+WebSite", await page.evaluate(() =>
    [...document.querySelectorAll('script[type="application/ld+json"]')]
      .some((s) => /"Person"/.test(s.textContent)) &&
    [...document.querySelectorAll('script[type="application/ld+json"]')]
      .some((s) => /"WebSite"/.test(s.textContent))));

  ok("og:image present", await page.evaluate(() => !!document.querySelector('meta[property="og:image"]')));

  // carousel: 3 dots, click dot 2 switches slide
  const dots = await page.$$eval('[role="tablist"] [role="tab"]', (t) => t.length);
  ok("carousel has 3 slides", dots === 3);
  await page.evaluate(() => document.querySelectorAll('[role="tablist"] [role="tab"]')[1].click());
  await new Promise((r) => setTimeout(r, 900));
  const slide2Visible = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('img[alt*="press conference"], img[alt*="সংবাদ সম্মেলনে"]')];
    return imgs.some((i) => i.className.includes("opacity-100"));
  });
  ok("carousel slide 2 switches", slide2Visible);

  // language switch EN -> BN, no reload (same JS heap check via window flag)
  await page.evaluate(() => { window.__probe = 1; });
  await page.click('[aria-label^="Switch to"]');
  await page.waitForFunction(() => document.documentElement.lang === "bn", { timeout: 8000 });
  ok("BN switch (no reload)", await page.evaluate(() => window.__probe === 1));
  ok("BN content renders", await page.evaluate(() => document.body.innerText.includes("নমস্কার")));
  // switch back
  await page.click('[aria-label^="Switch to"]');
  await page.waitForFunction(() => document.documentElement.lang === "en", { timeout: 8000 });

  // theme: system(light) -> dark via toggle cycle; verify class + persistence storage
  await page.evaluate(() => localStorage.setItem("am-theme", "dark"));
  await page.reload({ waitUntil: "networkidle0" });
  ok("dark persists on reload", await page.evaluate(() => document.documentElement.classList.contains("dark")));
  await page.evaluate(() => localStorage.setItem("am-theme", "light"));
  await page.reload({ waitUntil: "networkidle0" });
  ok("light persists", await page.evaluate(() => !document.documentElement.classList.contains("dark")));

  // images
  const brokenImgs = await page.evaluate(() =>
    [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.src).map((i) => i.src.slice(0, 90)));
  ok("no broken images on /" + (brokenImgs.length ? ` (${brokenImgs.join(", ")})` : ""), brokenImgs.length === 0);

  // contact API end-to-end
  const res = await fetch(BASE + "/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Cleanup QA", email: "qa@check.dev", subject: "final", message: "final verification message here.", website: "" }),
  });
  ok("contact POST 200", res.status === 200);

  ok("no console/page errors on /", errors.length === 0);
  if (errors.length) console.log("  errors:", errors.slice(0, 5));

  // 404 page renders branded (locale-aware)
  await page.goto(BASE + "/bn/no-such-page", { waitUntil: "networkidle0", timeout: 30000 }).catch(() => {});
  ok("branded 404 renders", await page.evaluate(() => document.body.innerText.length > 100));

  await b.close();
  console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} FAILURES`);
  process.exit(failures === 0 ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(1); });
