const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", headless: "new", args: ["--disable-gpu","--no-sandbox"] });
  const p = await b.newPage();
  let n = 0;
  p.on("request", (r) => { if (n++ < 60) console.log(Date.now() % 100000, r.url().slice(0, 110)); });
  await p.goto("http://127.0.0.1:3100/", { waitUntil: "domcontentloaded", timeout: 20000 });
  await new Promise((r) => setTimeout(r, 6000));
  console.log("total requests in ~6s:", n);
  await b.close();
})();