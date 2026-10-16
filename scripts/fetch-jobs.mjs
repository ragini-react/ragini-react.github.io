// Pulls Walkover's open roles from the public Keka careers feed and writes
// src/content/jobs.json for the static build. If the feed is unreachable the
// previous snapshot is kept, so a build never fails or invents roles.
// The careers page also re-checks the live feed in the browser.
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const FEED = "https://walkover.keka.com/careers/api/jobs/default/active";
const OUT = new URL("../src/content/jobs.json", import.meta.url);

const ALLOWED = new Set(["p", "div", "br", "ul", "ol", "li", "strong", "b", "em", "i", "h3", "h4"]);

/** Allowlist sanitiser for Keka's job HTML: drops every attribute and any tag not listed. */
export function sanitize(html) {
  return String(html ?? "")
    .replace(/<(script|style|iframe|object)[\s\S]*?<\/\1>/gi, "")
    .replace(/<\/?h[12]\b/gi, (m) => m.replace(/h[12]/i, "h3"))
    .replace(/<\s*(\/?)\s*([a-z0-9]+)[^>]*>/gi, (_, close, tag) => {
      const t = tag.toLowerCase();
      return ALLOWED.has(t) ? `<${close}${t}>` : "";
    })
    .replace(/(<div>\s*<br>\s*<\/div>)+/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function main() {
  let raw;
  try {
    const res = await fetch(FEED, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    raw = await res.json();
    if (!Array.isArray(raw)) throw new Error("unexpected payload");
  } catch (err) {
    const existing = await readFile(OUT, "utf8").catch(() => null);
    console.warn(`[jobs] feed unavailable (${err.message}); keeping ${existing ? "previous snapshot" : "no roles"}.`);
    if (!existing) await writeFile(OUT, JSON.stringify({ fetchedAt: null, source: FEED, jobs: [] }, null, 2) + "\n");
    return;
  }

  const jobs = raw.map((j) => ({
    id: j.id,
    slug: `${slugify(j.title)}-${j.id}`,
    title: String(j.title).trim(),
    department: j.departmentName ?? null,
    experience: j.experience ? String(j.experience).trim() : null,
    locations: (j.jobLocations ?? []).map((l) => ({ city: l.city ?? l.name, region: l.state ?? null, country: l.countryCode ?? "IN" })),
    fullTime: j.jobType === 2,
    publishedOn: j.publishedOn,
    skills: j.skillNames ?? [],
    descriptionHtml: sanitize(j.description),
    applyUrl: `https://walkover.keka.com/careers/jobdetails/${j.id}`,
  }));
  jobs.sort((a, b) => (a.publishedOn < b.publishedOn ? 1 : -1));
  await writeFile(OUT, JSON.stringify({ fetchedAt: new Date().toISOString(), source: FEED, jobs }, null, 2) + "\n");
  console.log(`[jobs] ${jobs.length} open roles written.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
