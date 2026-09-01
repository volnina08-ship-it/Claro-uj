/* Teljes oldalas screenshotok készítése a futó oldalról.
   Használat: node scripts/screenshot.mjs [baseUrl]  (alapértelmezés: http://localhost:3000) */

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3000";
const outDir = new URL("../screenshots/", import.meta.url).pathname;
mkdirSync(outDir, { recursive: true });

const pages = [
  ["home-hu", "/hu"],
  ["home-en", "/"],
  ["menu-hu", "/hu/menu"],
  ["gallery-hu", "/hu/gallery"],
  ["contact-hu", "/hu/contact"],
  ["admin", "/admin"],
];

const executablePath = process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium";

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const [name, path] of pages) {
  const url = `${base}${path}`;
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  // Végiggörgetés, hogy a scroll-reveal animációk lefussanak
  // (a sima scroll-behavior-t kikapcsoljuk, különben a gyors léptetés lemarad)
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += 500;
        window.scrollTo(0, y);
        if (y < document.documentElement.scrollHeight + 500) setTimeout(step, 180);
        else resolve(undefined);
      };
      step();
    });
  });
  await page.waitForTimeout(900);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${outDir}${name}.png`, fullPage: true });
  console.log(`✓ ${name} (${url})`);
}

await browser.close();
