const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", headless: "new", args: ["--disable-gpu","--no-sandbox"] });
  const combos = [
    ["plain-1440", { width: 1440, height: 2400 }, false],
    ["emulate-only", { width: 800, height: 600 }, true],
    ["both", { width: 1440, height: 2400 }, true],
  ];
  for (const [name, vp, emu] of combos) {
    const p = await b.newPage();
    await p.setViewport(vp);
    if (emu) await p.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);
    const t0 = Date.now();
    try { await p.goto("http://127.0.0.1:3100/", { waitUntil: "domcontentloaded", timeout: 12000 }); console.log(name, "OK", Date.now()-t0); }
    catch { console.log(name, "FAIL", Date.now()-t0); }
    await p.close();
  }
  await b.close();
})();