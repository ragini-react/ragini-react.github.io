// End-to-end checks against the real static export (out/), in headless Chrome.
// Usage: npm run build && npm run test:e2e
// Starts scripts/serve.mjs on a free port, so it never touches a running dev server.
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { readFileSync } from "node:fs";
import { chromium } from "playwright-core";

const axeSource = readFileSync(new URL("../node_modules/axe-core/axe.min.js", import.meta.url), "utf8");
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "✔" : "✘"} ${name}${detail ? ` · ${detail}` : ""}`);
};

const port = await new Promise((resolve) => {
  const s = createServer().listen(0, () => {
    const p = s.address().port;
    s.close(() => resolve(p));
  });
});
const server = spawn(process.execPath, ["scripts/serve.mjs", "out"], { env: { ...process.env, PORT: String(port) }, stdio: "ignore" });
await new Promise((r) => setTimeout(r, 600));
const BASE = `http://localhost:${port}`;
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://walkover.in").replace(/\/$/, "");

const browser = await chromium.launch({ channel: "chrome" });
try {
  // ---- every page in the sitemap -----------------------------------------
  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, ""));
  check("sitemap lists pages", urls.length >= 30, `${urls.length} URLs`);

  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(() => sessionStorage.setItem("wk-intro-seen", "1"));
  const titles = new Map();
  const internalLinks = new Set();
  const a11y = [];
  for (const path of urls) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
    const info = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelectorAll("h1").length,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      description: document.querySelector('meta[name="description"]')?.getAttribute("content"),
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "",
      jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
        try {
          JSON.parse(s.textContent);
          return true;
        } catch {
          return false;
        }
      }),
      topItems: document.querySelectorAll("header .wrap > a, header nav[aria-label='Main'] > ul > li").length,
      links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      themeControl: [...document.querySelectorAll("button, [role=switch], select, input")].some((el) =>
        /theme|dark mode|light mode|appearance/i.test(`${el.getAttribute("aria-label") ?? ""} ${el.textContent ?? ""} ${el.getAttribute("name") ?? ""}`),
      ),
    }));
    const ok =
      res.status() === 200 &&
      info.h1 === 1 &&
      info.canonical === SITE + path &&
      !!info.description &&
      info.jsonld.length > 0 &&
      info.jsonld.every(Boolean) &&
      !/noindex/.test(info.robots) &&
      info.topItems === 4 &&
      !info.themeControl &&
      errors.length === 0;
    check(`page ${path}`, ok, ok ? "" : JSON.stringify({ status: res.status(), ...info, links: undefined, errors }));
    if (titles.has(info.title)) check(`unique title ${path}`, false, `same as ${titles.get(info.title)}`);
    titles.set(info.title, path);
    info.links.filter((h) => h.startsWith("/") && !h.startsWith("//")).forEach((h) => internalLinks.add(h.split("#")[0]));

    // axe-core in both colour schemes
    for (const scheme of ["light", "dark"]) {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
      await page.evaluate(() => document.querySelectorAll("[data-scene],[data-reveal],[data-draw]").forEach((e) => e.classList.add("is-in", "is-playing")));
      await page.waitForTimeout(150);
      await page.addScriptTag({ content: axeSource });
      const v = await page.evaluate(async () => {
        const r = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] });
        return r.violations.map((x) => ({ id: x.id, impact: x.impact, n: x.nodes.length, target: x.nodes[0]?.target?.join(" ") }));
      });
      if (v.length) a11y.push({ path, scheme, v });
    }
    await page.close();
  }
  check("axe-core: no WCAG A/AA violations (light + dark)", a11y.length === 0, a11y.length ? JSON.stringify(a11y, null, 1) : "");

  // ---- internal links resolve -------------------------------------------------
  const broken = [];
  for (const href of internalLinks) {
    const r = await fetch(BASE + href, { redirect: "manual" });
    if (r.status >= 400) broken.push(`${r.status} ${href}`);
  }
  check("internal links resolve", broken.length === 0, broken.join(", ") || `${internalLinks.size} checked`);

  const missing = await fetch(`${BASE}/definitely-not-a-page/`);
  check("unknown URL returns 404", missing.status === 404);

  // ---- header dropdowns ----------------------------------------------------------
  {
    const page = await ctx.newPage();
    await page.goto(`${BASE}/about/`);
    const btn = page.getByRole("button", { name: "Explore" });
    await btn.focus();
    await page.keyboard.press("Enter");
    const opened = await btn.getAttribute("aria-expanded");
    await page.keyboard.press("Escape");
    const closed = await btn.getAttribute("aria-expanded");
    const focusBack = await page.evaluate(() => document.activeElement?.textContent?.trim());
    check("dropdown opens with keyboard, Escape closes and returns focus", opened === "true" && closed === "false" && focusBack === "Explore");
    await page.close();
  }

  // ---- intro ---------------------------------------------------------------------
  {
    const fresh = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await fresh.newPage();
    await page.goto(`${BASE}/`);
    const shown = await page.evaluate(() => document.documentElement.hasAttribute("data-intro"));
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: /Skip intro/ }).click();
    await page.waitForTimeout(700);
    const gone = await page.evaluate(() => !document.documentElement.hasAttribute("data-intro") && !document.querySelector("[inert]"));
    check("intro shows on first visit and the skip button ends it", shown && gone);
    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(400);
    const y = await page.evaluate(() => window.scrollY);
    check("normal scrolling after the intro (no dice-controlled scroll)", y > 600, `scrollY ${y}`);
    await page.goto(`${BASE}/`);
    const replay = await page.evaluate(() => document.documentElement.hasAttribute("data-intro"));
    check("intro does not replay in the same session", !replay);
    await page.goto(`${BASE}/about/`);
    check("intro never shows on inner pages", !(await page.evaluate(() => document.documentElement.hasAttribute("data-intro"))));
    await fresh.close();

    const esc = await browser.newContext({ viewport: { width: 800, height: 700 } });
    const p2 = await esc.newPage();
    await p2.goto(`${BASE}/`);
    await p2.waitForTimeout(400);
    await p2.keyboard.press("Escape");
    await p2.waitForTimeout(700);
    check("Escape skips the intro", !(await p2.evaluate(() => document.documentElement.hasAttribute("data-intro"))));
    await esc.close();

    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const p3 = await nojs.newPage();
    await p3.goto(`${BASE}/`);
    const visible = await p3.locator("h1").first().isVisible();
    const cover = await p3.evaluate(() => document.documentElement.hasAttribute("data-intro"));
    check("without JavaScript the homepage content is visible and no intro covers it", visible && !cover);
    await nojs.close();
  }

  // ---- forms never fake success ----------------------------------------------------
  {
    const page = await ctx.newPage();
    await page.goto(`${BASE}/contact/`);
    await page.getByRole("button", { name: /Send message|Write the email/ }).click();
    const errs = await page.locator('[aria-invalid="true"]').count();
    const success = await page.getByText("Delivered. Thank you!").count();
    check("contact form validates empty input and shows no success", errs >= 3 && success === 0, `${errs} invalid fields`);

    await page.goto(`${BASE}/contact/?topic=idea`);
    const topic = await page.locator("select").inputValue();
    check("contact topic can be pre-selected from the URL", topic === "idea");

    await page.goto(`${BASE}/newsletter/`);
    await page.getByLabel("Your email").fill("not-an-email");
    await page.getByRole("button", { name: /Subscribe|Ask to join/ }).click();
    const alert = await page.getByRole("alert").first().textContent();
    const subscribed = await page.getByText("You’re on the list").count();
    check("newsletter rejects a bad address and never claims a subscription", /email/i.test(alert ?? "") && subscribed === 0);
    await page.close();
  }

  // ---- system theme only ------------------------------------------------------------
  {
    const dark = await browser.newContext({ colorScheme: "dark" });
    const page = await dark.newPage();
    await page.goto(`${BASE}/about/`);
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const light = await browser.newContext({ colorScheme: "light" });
    const lp = await light.newPage();
    await lp.goto(`${BASE}/about/`);
    const lbg = await lp.evaluate(() => getComputedStyle(document.body).backgroundColor);
    check("appearance follows the OS colour scheme", bg !== lbg, `dark ${bg} · light ${lbg}`);
    await dark.close();
    await light.close();
  }
} finally {
  await browser.close();
  server.kill();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
