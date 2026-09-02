/* iOS Safari szimuláció: a layout viewport a címsáv ALATT kezdődik, a
   görgetett tartalom viszont a (áttetsző) címsáv MÖGÉ is berajzolódik.
   Ezt úgy másoljuk le, hogy a sticky fejlécet 110px-szel lejjebb tűzzük,
   és egy áttetsző "Safari sáv" overlay-t teszünk a képernyő tetejére.
   Mérjük a sáv mögötti terület fényerejét: sötétnek kell lennie.

   Használat: node scripts/ios-sim.mjs [baseUrl] */

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const base = process.argv[2] ?? "http://localhost:3000";
const outDir = new URL("../screenshots/", import.meta.url).pathname;
mkdirSync(outDir, { recursive: true });

const CHROME_H = 110; // Safari státuszsor + címsáv magassága pt-ben

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium",
});
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 2,
});

await page.goto(`${base}/hu`, { waitUntil: "networkidle", timeout: 60000 });

// iOS geometria: a site fejléce a "címsáv" alá kerül + mock Safari sáv
await page.addStyleTag({
  content: `
    header { top: ${CHROME_H}px !important; }
    html { scroll-behavior: auto !important; }
  `,
});
await page.evaluate((h) => {
  const bar = document.createElement("div");
  bar.id = "mock-safari-bar";
  Object.assign(bar.style, {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    height: `${h}px`,
    zIndex: "2147483647",
    pointerEvents: "none",
    background: "rgba(235,235,240,0.16)",
    backdropFilter: "blur(18px) saturate(180%)",
    WebkitBackdropFilter: "blur(18px) saturate(180%)",
  });
  document.body.appendChild(bar);
}, CHROME_H);

async function measure(name, scrollY) {
  await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  await page.waitForTimeout(900);
  const path = `${outDir}${name}.png`;
  await page.screenshot({ path });
  // A címsáv mögötti sáv átlagos fényereje (0-255)
  const strip = await sharp(path)
    .extract({ left: 0, top: 0, width: 780, height: CHROME_H * 2 })
    .greyscale()
    .raw()
    .toBuffer();
  let sum = 0;
  for (const v of strip) sum += v;
  const avg = Math.round(sum / strip.length);
  const verdict = avg < 70 ? "SÖTÉT ✓" : "VILÁGOS ✗";
  console.log(`${name} (scrollY=${scrollY}): fényerő=${avg} → ${verdict}`);
  return avg;
}

// A tetőponton (scroll=0) a fejléc átlátszó: ott a sáv mögött az oldal
// saját sötét hero-teteje van – ez informatív, nem hibafeltétel.
const rTop = await measure("ios-sim-top", 0);
const scrolled = [
  await measure("ios-sim-scroll600", 600),
  await measure("ios-sim-scroll1800", 1800),
  await measure("ios-sim-scroll3200", 3200),
];

await browser.close();

const worst = Math.max(...scrolled);
console.log(`(tetőpont fényerő: ${rTop} – az oldal saját sötét háttere)`);
console.log(worst < 70 ? "PASS: a címsáv mögött görgetéskor mindig sötét." : "FAIL: van világos görgetett állapot!");
process.exit(worst < 70 ? 0 : 1);
