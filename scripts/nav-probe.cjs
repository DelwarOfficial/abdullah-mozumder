const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", headless: "new", args: ["--disable-gpu","--no-sandbox"] });
  const p = await b.newPage();
  for (const u of ["data:text/html,<h1>x</h1>", "http://127.0.0.1:3100/robots.txt", "http://127.0.0.1:3100/"]) {
    const t0 = Date.now();
    try { await p.goto(u, { waitUntil: "domcontentloaded", timeout: 15000 }); console.log(u, "OK", Date.now()-t0, "ms"); }
    catch (e) { console.log(u, "FAIL", Date.now()-t0, "ms", e.message.split("\n")[0]); }
  }
  await b.close();
})();