// Serves the static export in out/ the way GitHub Pages does:
// /path/ → /path/index.html, /path → 301 /path/, unknown → 404.html (status 404).
// Usage: node scripts/serve.mjs [dir]   (PORT and BASE_PATH env vars respected)
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { gzipSync } from "node:zlib";

const root = resolve(process.argv[2] ?? "out");
const port = Number(process.env.PORT ?? 3000);
const base = (process.env.BASE_PATH ?? "").replace(/\/$/, "");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

async function file(path) {
  try {
    const s = await stat(path);
    return s.isFile() ? path : null;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  try {
    await handle(req, res);
  } catch {
    if (!res.headersSent) res.writeHead(500);
    res.end();
  }
}).listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}${base}/`);
});

async function handle(req, res) {
  let url;
  let pathname;
  try {
    url = new URL((req.url ?? "/").replace(/^\/{2,}/, "/"), "http://localhost");
    pathname = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400).end("Bad request");
    return;
  }
  if (base) {
    if (!pathname.startsWith(base)) {
      res.writeHead(404).end("Not found");
      return;
    }
    pathname = pathname.slice(base.length) || "/";
  }
  const safe = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const target = join(root, safe);
  if (!target.startsWith(root)) {
    res.writeHead(403).end();
    return;
  }

  let found = await file(target);
  if (!found && pathname.endsWith("/")) found = await file(join(target, "index.html"));
  if (!found && !extname(pathname) && (await file(join(target, "index.html")))) {
    res.writeHead(301, { Location: `${base}${pathname}/${url.search}` }).end();
    return;
  }
  if (!found) {
    const notFound = await file(join(root, "404.html"));
    res.writeHead(404, { "Content-Type": types[".html"] });
    res.end(notFound ? await readFile(notFound) : "Not found");
    return;
  }
  const type = types[extname(found)] ?? "application/octet-stream";
  let body = await readFile(found);
  const headers = { "Content-Type": type };
  // Compress text like GitHub Pages and CDNs do, so local audits are realistic.
  if (/text|javascript|json|xml|svg/.test(type) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "")) {
    body = gzipSync(body);
    headers["Content-Encoding"] = "gzip";
    headers.Vary = "Accept-Encoding";
  }
  res.writeHead(200, headers);
  res.end(body);
}
