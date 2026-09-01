import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = "http://localhost:3000";
const outDir = new URL("../screenshots/", import.meta.url).pathname;
mkdirSync(outDir, { recursive: true });

const pages = [
  ["m-home-hu", "/hu"],
  ["m-gallery-hu", "/hu/gallery"],
  ["m-menu-hu", "/hu/menu"],
];

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium" });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 2,
});

for (const [name, path] of pages) {
  await page.goto(`${base}${path}`, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += 500;
        window.scrollTo(0, y);
        if (y < document.documentElement.scrollHeight + 500) setTimeout(step, 150);
        else resolve(undefined);
      };
      step();
    });
  });
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}${name}.png`, fullPage: true });
  console.log(`✓ ${name}`);
}
await browser.close();
