/* Hydration-state probe: storage-seeded reload → is content BN or EN? does click work? */
const puppeteer = require("puppeteer-core");

(async () => {
  const b = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: "new",
    args: ["--disable-gpu", "--no-sandbox"],
  });
  const pg = await b.newPage();
  pg.on("console", (m) => console.log(`  [${m.type()}] ${m.text().slice(0, 220)}`));
  pg.on("pageerror", (e) => console.log(`  [PAGEERROR] ${String(e).slice(0, 400)}`));
  await pg.setViewport({ width: 1440, height: 1200 });
  await pg.goto("http://127.0.0.1:3100/robots.txt", { waitUntil: "domcontentloaded" });
  await pg.evaluate(() => localStorage.setItem("site-language", "bn"));
  await pg.goto("http://127.0.0.1:3100/", { waitUntil: "load", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));

  const before = await pg.evaluate(() => ({
    stored: localStorage.getItem("site-language"),
    lang: document.documentElement.lang,
    text: document.body.innerText.slice(0, 60),
  }));
  console.log("BEFORE:", JSON.stringify(before));

  // synthetic click on the switcher — tests whether hydration is alive
  await pg.evaluate(() => {
    const el = document.querySelector('[aria-label^="Switch to"]');
    if (el) el.click();
    return !!el;
  });
  await new Promise((r) => setTimeout(r, 800));
  const after = await pg.evaluate(() => ({
    lang: document.documentElement.lang,
    stored: localStorage.getItem("site-language"),
    text: document.body.innerText.slice(0, 60),
  }));
  console.log("AFTER CLICK:", JSON.stringify(after));

  await b.close();
})();
