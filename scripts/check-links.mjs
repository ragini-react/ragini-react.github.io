// Checks every link and asset in the static export (out/).
// Internal: the target file must exist. External: requested once each, report only
// (some sites, e.g. Medium and LinkedIn, block automated requests and are listed as "blocked").
// Usage: npm run build && npm run check:links [-- --internal-only]
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../out/", import.meta.url));
const internalOnly = process.argv.includes("--internal-only");
const base = (process.env.BASE_PATH ?? "").replace(/\/$/, "");
// The site's own canonical/OG URLs point at production, which may not serve this build yet.
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://walkover.in").replace(/\/$/, "");

const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) files.push(p);
  }
})(OUT);

const internal = new Map();
const external = new Map();
for (const f of files) {
  const html = readFileSync(f, "utf8");
  for (const m of html.matchAll(/(?:href|src)="([^"#]+)/g)) {
    const url = m[1].replace(/&amp;/g, "&");
    if (/^(mailto|tel|data|javascript):/.test(url)) continue;
    const page = f.replace(OUT, "/");
    if (url.startsWith(SITE + "/")) continue;
    if (/^https?:\/\//.test(url)) {
      if (!external.has(url)) external.set(url, page);
    } else if (url.startsWith("/")) {
      if (!internal.has(url)) internal.set(url, page);
    }
  }
}

let broken = 0;
for (const [url, page] of internal) {
  let path = url.split("?")[0];
  if (base && path.startsWith(base)) path = path.slice(base.length);
  const target = join(OUT, decodeURIComponent(path));
  const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, "index.html")));
  if (!ok) {
    broken++;
    console.log(`✘ internal ${url} (on ${page})`);
  }
}
console.log(`internal: ${internal.size} checked, ${broken} broken`);

if (!internalOnly) {
  const results = { ok: 0, blocked: [], bad: [] };
  const list = [...external.keys()];
  await Promise.all(
    Array.from({ length: 6 }, async (_, w) => {
      for (let i = w; i < list.length; i += 6) {
        const url = list[i];
        try {
          const r = await fetch(url, { redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (link check)" }, signal: AbortSignal.timeout(15000) });
          if (r.ok) results.ok++;
          else if ([401, 403, 429, 999].includes(r.status)) results.blocked.push(`${r.status} ${url}`);
          else results.bad.push(`${r.status} ${url} (on ${external.get(url)})`);
        } catch (e) {
          results.bad.push(`ERR ${url} (${e.cause?.code ?? e.name})`);
        }
      }
    }),
  );
  console.log(`external: ${list.length} checked, ${results.ok} ok, ${results.blocked.length} blocked by the site, ${results.bad.length} failed`);
  results.blocked.forEach((b) => console.log(`  ~ ${b}`));
  results.bad.forEach((b) => console.log(`  ✘ ${b}`));
  if (results.bad.length) process.exitCode = 1;
}
if (broken) process.exitCode = 1;
