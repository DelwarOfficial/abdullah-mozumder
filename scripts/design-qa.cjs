/* Design QA probe: overflow diagnosis + screenshots via headless Edge */
const puppeteer = require("puppeteer-core");

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE = "http://127.0.0.1:3100";

async function main() {
  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: "new",
    args: ["--disable-gpu", "--hide-scrollbars"],
  });

  for (const [label, path, w, h] of [
    ["mobile", "/", 390, 844],
  ]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h });
    await page.goto(BASE + path, { waitUntil: "networkidle0", timeout: 30000 });

    const report = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const out = [];
      const walk = (el) => {
        for (const child of el.children) {
          const r = child.getBoundingClientRect();
          if (r.right > vw + 1 || r.left < -1) {
            out.push({
              tag: child.tagName,
              cls: (child.className || "").toString().slice(0, 90),
              left: Math.round(r.left),
              right: Math.round(r.right),
              w: Math.round(r.width),
              text: (child.textContent || "").trim().slice(0, 40),
            });
          }
          walk(child);
        }
      };
      walk(document.body);
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: vw,
        offenders: out.slice(0, 20),
      };
    });

    console.log(`[${label}] scrollWidth=${report.scrollWidth} clientWidth=${report.clientWidth}`);
    for (const o of report.offenders) {
      console.log(`  <${o.tag}> ${o.left}..${o.right} w=${o.w} cls="${o.cls}" text="${o.text}"`);
    }
    await page.close();
  }

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
