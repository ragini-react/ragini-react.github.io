# walkover.in: “A Living Sketchbook”

The Walkover company website. It is built with Next.js 16 (App Router), React 19, TypeScript and SCSS Modules, and is exported as a fully static site.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # refreshes open roles, then writes the static site to out/
npm run preview      # serves out/ like GitHub Pages (PORT=4321 npm run preview)
```

Requires Node 22+. The research behind every fact, colour and asset is in [docs/RESEARCH.md](docs/RESEARCH.md).

## What's in it

| Area | Route | Notes |
| --- | --- | --- |
| Home + dice intro | `/` | Walkover die rolls in → “Walkover” → “We Just Started.” → the page opens through the die |
| Our Story | `/about/` | Sourced timeline; three founding dates explained |
| Culture We Foster | `/about/culture-we-foster/` | The ten official values, English / हिन्दी / both |
| Privacy | `/about/privacy-policy/` | What this site does with data (needs legal review) |
| Products | `/products/`, `/products/<slug>/` | 8 products, each in its own verified brand colours |
| Freedom | `/freedom/` | Walkover's own “Freedom + Responsibility” statement and video |
| Life at Walkover | `/life/` | Real moments with sources, two first-party photos |
| Ideas & Contributions | `/ideas/` | Tools built in-house first, open-source work |
| Stories | `/stories/` | Five-character scene + real stories from the archive |
| Future & Experiments | `/future/` | Live / beta / announced, labelled; no invented roadmap |
| Games | `/games/` | Pip Pairs (memory) and Sketch Prompt (drawing) |
| Walkover Recommends | `/recommends/` | Only things Walkover recommended or made |
| Journal | `/blog/` | Walkover Insights articles, topic filter, links to Medium |
| Careers | `/careers/`, `/careers/<role>/` | Open roles from Keka, rechecked live in the browser |
| Contact | `/contact/` | Real form (endpoint or pre-filled email) |
| Happiness Newsletter | `/newsletter/` | Archive + sign-up |
| Legacy URLs | `/career/`, `/walkover-home/` | Static redirects to `/careers/` and `/` |

The header shows exactly four items: the logo plus the **Products**, **Explore** and **Company** dropdowns. Every page is inside one of them.

## Environment variables

Copy `.env.example` to `.env.local`. The values are read at build time and baked into the static files.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for canonicals, sitemap, OG and JSON-LD. Default `https://walkover.in` |
| `BASE_PATH` | Sub-path when served from `user.github.io/repo` (e.g. `/walkover-website`). Empty for a domain root |
| `NEXT_PUBLIC_NOINDEX` | `1` on staging/preview: every page gets `noindex` and robots.txt disallows all |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | URL the contact form POSTs JSON to (must allow CORS). Without it, the form opens a pre-filled email to info@walkover.in |
| `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` | URL the newsletter form POSTs `{ email, consent }` to |
| `NEXT_PUBLIC_MAILCHIMP_URL` | Alternative: a Mailchimp embedded-form action URL (talked to over JSONP) |

**Forms never fake success.** “Delivered” and “You’re on the list” appear only after the configured service answers 2xx (or Mailchimp answers `result: "success"`). With nothing configured, both forms say plainly that they are opening the visitor's email app.

To connect them, point the variables at any endpoint that accepts a JSON POST and allows cross-origin requests, such as a viaSocket webhook flow, and do server-side validation and rate limiting there. The old site's Mailchimp list (`walkover.us10.list-manage.com … id=59232a3213`) still exists in its HTML. Confirm that it is active before using it.

## Testing

```bash
npm run typecheck       # tsc
npm run lint            # eslint (next/core-web-vitals + typescript)
npm test                # unit tests: form validation, job-description sanitiser
npm run build && npm run test:e2e   # end-to-end in headless Chrome against out/
npm run check:links     # every internal link/asset in out/ + every external link
```

`test:e2e` needs a local Google Chrome, because `playwright-core` uses `channel: "chrome"`. It serves `out/` on a free port and checks the following:

- **Every page in the sitemap:** status 200, one `<h1>`, a self-referencing canonical, a meta description, valid JSON-LD, no `noindex`, exactly four header items, no theme control, and no JS errors.
- **Accessibility:** axe-core WCAG 2.2 A/AA on every page, in both light and dark.
- **Links:** all internal links resolve, and an unknown URL returns 404.
- **Dropdowns:** keyboard-operable; Escape closes them and returns focus.
- **Intro:** shows on the first visit; Skip and Escape both end it; it doesn't replay in the session and never appears on inner pages. Normal scrolling works afterwards, and with no JS the content is visible and uncovered.
- **Forms:** they validate input and never show success without a service.
- **Theme:** the appearance follows the OS colour scheme.

`npm run og` regenerates `public/og/walkover.png` (the share card) with local Chrome.

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` runs on every push to `main`, nightly at 06:00 IST (so the open roles stay fresh), and on demand. The job type-checks, lints, runs the unit tests, builds, checks internal links, and deploys `out/`.

One-time setup:

1. In **Settings → Pages → Source**, choose **GitHub Actions**.
2. Optionally, under **Settings → Secrets and variables → Actions → Variables**, set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_ENDPOINT`, `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` / `NEXT_PUBLIC_MAILCHIMP_URL`, and `NEXT_PUBLIC_NOINDEX=1` for a staging repository. Set `PAGES_BASE_PATH` only to override the detected base path.
3. For walkover.in, add the custom domain under **Settings → Pages** and point DNS at GitHub Pages. That is a DNS change for whoever owns the domain. Nothing in this repository changes DNS.

Any static host works: upload `out/`. Pages live at `/path/` (trailing slash).

### Before switching walkover.in over

- **Keep `/happiness/`.** The Happiness letters archive (64 issues, including `/happiness/<slug>/`) is a separate static folder on the current server. This site links to it but does not generate it. Copy that folder into `public/happiness/`, or keep serving it from the current host.
- **Redirect old paths.** GitHub Pages cannot send real 301s. `/career/` and `/walkover-home/` have static redirect pages. If a CDN sits in front, add true 301s there for older paths: `/career.php`, `/aboutus.php`, `/contact.php`, `/products.php`, `/privacy-policy.php`, `/blog/*` → `/blog/`.
- **Retire or noindex the duplicates.** The current `walkover.in/sitemap.xml` lists `new.walkover.in` URLs, and the DocStar-served pages carry `noindex` with a canonical pointing to app.docstar.io. Retire or `noindex` new.walkover.in so it doesn't compete with the new canonical URLs.
- **Fix `www`.** `www.walkover.in` currently has no DNS record. The Keka careers portal links to it, so add a record that redirects to the apex.
- **Security headers.** Pages cannot set custom headers. Add them at a CDN if needed.

## Project structure

```
src/
  app/                    routes (all statically exported), sitemap.ts, robots.ts, manifest.ts
  components/
    intro/                DiceIntro (the original Walkover die rolling in, then its two lines)
    characters/           Walker (the character system), cast, props
    scenes/               one storytelling scene per section (Writer, Careers, Stories, IdeaRelay, Chai…)
    products/             ProductStory: one hand-drawn mechanism per product
    home/                 IdeaBunting (hero), ProblemPicker (product tabs)
    layout/               SiteHeader (4 items + dropdowns + mobile sheet), SiteFooter
    newsletter/ contact/ careers/ games/ values/ blog/ ui/ motion/
  content/                typed, sourced content: products, posts, company, story, photos, jobs.json
  lib/                    seo (pageMeta), schema (JSON-LD), forms, brand tokens, base path
  styles/                 tokens, base, layout, sketch, motion, brand
scripts/                  fetch-jobs (prebuild), serve (preview), check-links, make-og
tests/                    unit tests + e2e.mjs
docs/RESEARCH.md          research dossier, sources, open questions
```

## Updating content

- **Product:** edit `src/content/products.ts`. Brand colours sit in `brand` with their sources. Add the logo to `public/brand/products/` and a `ProductStory` scene in `src/components/products/ProductStory.tsx`. The page, menu entry, sitemap entry and JSON-LD follow automatically.
- **Article:** add an entry to `src/content/posts.ts`. Summaries must describe only what the article says.
- **Story or milestone:** `src/content/story.ts`. Every entry needs a `source`.
- **Jobs:** nothing to do. `npm run build` pulls them from Keka. If Keka is unreachable, the last snapshot is kept, and the careers page re-checks live in the browser.
- **Photos:** `src/content/photos.ts`. Only use photos Walkover published itself, and confirm consent from the people pictured.

## Design system in brief

- **Paper, ink, pencil, marker.** Tokens live in `src/styles/_tokens.scss`. Fonts are Bricolage Grotesque (display), Hanken Grotesk (body) and Kalam (handwritten notes only), all self-hosted by `next/font`.
- **Theme.** Dark mode is a "night sketchbook" chosen *only* by `prefers-color-scheme`. There is no toggle anywhere.
- **Products keep their own brands.** Each product scope (`brandProps()` + `[data-brand]` in `_brand.scss`) uses the official colours on light paper and documented lifted tints on dark. Logos are never recoloured: they sit on a light "sticker" in both themes.
- **Characters ("Walkers")** share one body plan and line weight. Each has its own silhouette, props and choreography, and is clearly labelled as illustration.
- **Motion.** Scenes play only while on screen (`[data-scene]`, `MotionRuntime`). They show a finished still under `prefers-reduced-motion`, and the content is fully readable without JS.
