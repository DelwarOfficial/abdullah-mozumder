const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", headless: "new", args: ["--disable-gpu","--no-sandbox","--disable-dev-shm-usage","--hide-scrollbars"] });
  // variant A: incognito context
  const ctx = await b.createBrowserContext();
  const p1 = await ctx.newPage();
  try { await p1.goto("http://127.0.0.1:3100/", { waitUntil: "domcontentloaded", timeout: 12000 }); console.log("incognito OK"); }
  catch { console.log("incognito FAIL"); }
  await ctx.close();
  // variant B: console handlers + default context
  const p2 = await b.newPage();
  p2.on("console", () => {});
  try { await p2.goto("http://127.0.0.1:3100/", { waitUntil: "domcontentloaded", timeout: 12000 }); console.log("handlers OK"); }
  catch { console.log("handlers FAIL"); }
  await b.close();
})();