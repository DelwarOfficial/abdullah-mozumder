/* Design QA v2: isolated-context 4-state screenshots + hydration probe */
const puppeteer = require("puppeteer-core");

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE = "http://127.0.0.1:3100";
const OUT = "C:\\Users\\Admin\\AppData\\Local\\Temp\\am-shots";

async function main() {
  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: "new",
    args: ["--disable-gpu", "--hide-scrollbars", "--no-sandbox", "--disable-dev-shm-usage"],
  });

  const shots = [
    ["en-light-desktop", "/", 1440, 2400, "light", "en"],
    ["en-dark-desktop", "/", 1440, 2400, "dark", "en"],
    ["bn-dark-desktop", "/", 1440, 2400, "dark", "bn"],
    ["bn-light-desktop", "/", 1440, 2400, "light", "bn"],
    ["en-light-mobile", "/", 390, 3000, "light", "en"],
    ["en-dark-mobile", "/", 390, 3000, "dark", "en"],
    ["bn-dark-mobile", "/", 390, 3000, "dark", "bn"],
    ["bn-light-mobile", "/", 390, 3000, "light", "bn"],
    ["work-dark-desktop", "/work", 1440, 2200, "dark", "en"],
    ["story-light-mobile", "/work/sample-report-title", 390, 2600, "light", "en"],
    ["story-dark-mobile", "/articles/sample-interview", 390, 2600, "dark", "bn"],
  ];

  for (const [name, path, w, h, scheme, lang] of shots) {
    // Isolated storage per shot — no state leakage between screenshots
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width: w, height: h });
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: scheme }]);

    // Seed the preference, then load: the pre-paint script must apply it
    // before paint (this validates the no-flash path end-to-end).
    // Seed language on the origin (fast text route), then load target:
    // the pre-paint script must apply it before paint (no-flash path).
    await page.goto(BASE + "/robots.txt", { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.evaluate((l) => localStorage.setItem("site-language", l), lang);
    await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 60000 });
    // settle: fonts, lazy images, RSC prefetch
    await new Promise((r) => setTimeout(r, 1500));

    const htmlLang = await page.evaluate(() => document.documentElement.lang);
    const isDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log(
      `${name}: lang=${htmlLang} dark=${isDark} scrollW=${sw}${sw > w + 1 ? " !!OVERFLOW" : ""}`,
    );

    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: `${OUT}\\${name}.png` });

    // Hydration probe on the first mobile-dark shot: menu must open
    if (name === "en-dark-mobile") {
      await page.click('button[aria-controls="mobile-menu-sheet"]');
      await new Promise((r) => setTimeout(r, 500));
      const open = await page.evaluate(() => {
        const s = document.getElementById("mobile-menu-sheet");
        return s ? getComputedStyle(s).transform !== "none" : false;
      });
      console.log(`  menu-sheet opens: ${open}`);
      await page.screenshot({ path: `${OUT}\\en-dark-mobile-menu.png` });
    }

    await context.close();
  }

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
