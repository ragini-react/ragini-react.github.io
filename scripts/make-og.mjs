// Renders public/og/walkover.png (1200×630), the default social share card.
// Needs a local Chrome (playwright-core uses channel "chrome"). Run: node scripts/make-og.mjs
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const logo = readFileSync(`${root}public/brand/walkover-logo.svg`, "utf8");

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@800&family=Kalam:wght@400;700&display=block" rel="stylesheet">
<style>
  body{margin:0;width:1200px;height:630px;background:#f7f2e8;font-family:'Bricolage Grotesque',sans-serif;color:#1c1915;overflow:hidden;position:relative}
  .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(64,104,168,.14) 1px,transparent 1px),linear-gradient(90deg,rgba(64,104,168,.14) 1px,transparent 1px);background-size:36px 36px}
  .margin{position:absolute;left:96px;top:0;bottom:0;width:3px;background:rgba(214,51,40,.35)}
  .logo{position:absolute;left:150px;top:56px;width:260px;background:#fffdf8;padding:14px 18px;border-radius:10px;transform:rotate(-2deg);box-shadow:0 0 0 2px #1c1915,4px 5px 0 #1c1915}
  .logo svg{width:100%;height:auto;display:block}
  h1{position:absolute;left:150px;top:238px;margin:0;font-size:132px;line-height:.95;letter-spacing:-.045em}
  h1 span{color:#b8160f;position:relative}
  h1 span svg{position:absolute;left:-6px;bottom:-14px;width:104%;height:30px}
  p{position:absolute;left:154px;bottom:36px;margin:0;font-family:Kalam,cursive;font-size:36px;color:#5d564c;transform:rotate(-1.5deg)}
  .die{position:absolute;right:110px;top:110px;width:250px;height:250px;transform:rotate(14deg)}
</style></head><body>
<div class="grid"></div><div class="margin"></div>
<div class="logo">${logo}</div>
<h1>We Are<br><span>Walkers.<svg viewBox="0 0 300 24" preserveAspectRatio="none"><path d="M4 15 C 70 6, 150 20, 230 9 S 290 12, 296 8" fill="none" stroke="#e2231a" stroke-width="9" stroke-linecap="round"/></svg></span></h1>
<p>sketching ideas, shipping products · Indore, since 2010</p>
<svg class="die" viewBox="0 0 100 100"><rect x="6" y="6" width="88" height="88" rx="16" fill="#dc281e" stroke="#1c1915" stroke-width="4"/>
${[[30,30],[70,30],[50,50],[30,70],[70,70]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="8.5" fill="#fff"/>`).join("")}</svg>
</body></html>`;

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: `${root}public/og/walkover.png` });
await browser.close();
console.log("public/og/walkover.png written");
