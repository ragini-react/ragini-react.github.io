import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./recommends.module.scss";

const DESCRIPTION =
  "Walkover Recommends: a short, honest shelf. The film Walkover once told everyone to watch, plus writing, letters and tools Walkers made themselves.";

export const metadata = pageMeta({ title: "Walkover Recommends", description: DESCRIPTION, path: "/recommends/" });

const objects: Record<string, React.ReactNode> = {
  reel: (
    <>
      <circle cx="50" cy="50" r="38" className={s.fillA} />
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} cx={50 + 20 * Math.cos((a * Math.PI) / 180)} cy={50 + 20 * Math.sin((a * Math.PI) / 180)} r="8" className={s.hole} />
      ))}
      <circle cx="50" cy="50" r="5" className={s.hole} />
      <path d="M86 62 C 96 74, 92 90, 76 94" className={s.line} />
    </>
  ),
  notebook: (
    <>
      <rect x="22" y="12" width="56" height="76" rx="4" className={s.fillB} />
      <path d="M32 12 V 88" className={s.line} />
      <path d="M40 30 H 70 M40 42 H 66 M40 54 H 70" className={s.lineBlue} />
    </>
  ),
  envelope: (
    <>
      <rect x="12" y="26" width="76" height="52" rx="4" className={s.fillC} />
      <path d="M12 28 L 50 58 L 88 28" className={s.line} />
      <path d="M44 16 C 44 8, 56 8, 56 16 C 56 22, 50 26, 50 26 C 50 26, 44 22, 44 16 Z" className={s.heart} />
    </>
  ),
  toolbox: (
    <>
      <rect x="14" y="38" width="72" height="44" rx="5" className={s.fillA} />
      <path d="M38 38 V 28 H 62 V 38 M14 54 H 86" className={s.line} />
      <rect x="44" y="50" width="12" height="9" className={s.fillB} />
    </>
  ),
  drawer: (
    <>
      <rect x="14" y="20" width="72" height="64" rx="4" className={s.fillB} />
      <path d="M14 52 H 86 M42 36 H 58 M42 68 H 58" className={s.line} />
      <circle cx="30" cy="10" r="8" className={s.redDot} />
      <rect x="54" y="2" width="16" height="16" rx="3" className={s.fillC} />
    </>
  ),
};

const shelf = [
  {
    obj: "reel",
    kind: "a film",
    title: "300",
    why: "Walkover’s homepage once introduced the team as “50 Spartans (300 - a must watch, Walkover recommends)”. It is the reason Walkers have been called Spartans.",
    who: "Recommended by Walkover, walkover.in (archived 2019)",
    href: "https://web.archive.org/web/20191003071312/https://www.walkover.in/",
    link: "See the archived homepage",
  },
  {
    obj: "notebook",
    kind: "reading, by Walkers",
    title: "Best practices to build API",
    why: "If you build APIs, this is the practical one: dos and don’ts for URIs and the habits that keep an API maintainable for the next developer.",
    who: "Written by Yuktika Mishra on Walkover Insights",
    href: "https://medium.com/walkover-insights/best-practices-to-build-api-eb2174cbfeba",
    link: "Read on Medium",
  },
  {
    obj: "envelope",
    kind: "letters, by Walkers",
    title: "The Happiness letters",
    why: "More than sixty short Friday notes, in English and Hindi, on honesty, consistency, pressure and the occasional Secret Santa.",
    who: "Written for the Walkover team, 2021–2025",
    href: company.happinessArchive,
    link: "Open the archive",
  },
  {
    obj: "toolbox",
    kind: "tools, made by Walkers",
    title: "Walkover on GitHub",
    why: "SDKs for MSG91’s SendOTP, GTWY’s source under Apache-2.0, and Hippocampus, an MIT-licensed retrieval engine. Take what helps.",
    who: "Published by Walkover and MSG91",
    href: "https://github.com/Walkover-Web-Solution",
    link: "Browse the repositories",
  },
  {
    obj: "drawer",
    kind: "a resource, by Walkover",
    title: "The brand library",
    why: "Need the real MSG91 or Giddh logo? Every official Walkover and product logo is here as SVG and PNG, so nobody has to screenshot one.",
    who: "Maintained at stuff.walkover.in",
    href: company.brandAssets,
    link: "Open the library",
  },
];

export default function RecommendsPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Walkover Recommends", description: DESCRIPTION, path: "/recommends/", type: "CollectionPage" })} />
      <PageHero
        trail={[{ name: "Walkover Recommends", path: "/recommends/" }]}
        eyebrow="walkover recommends"
        title={
          <>
            A short shelf,
            <br />
            on purpose.
          </>
        }
        lede={
          <p>
            We only list something here if Walkover actually recommended it, or if Walkers made it themselves. That keeps the
            shelf short, and every label honest.
          </p>
        }
      />
      <section className="section-tight" aria-label="Recommendations">
        <div className="wrap">
          <ul className={s.cabinet}>
            {shelf.map((it, i) => (
              <li key={it.title} className={s.item} data-reveal="drop" style={{ "--d": i } as React.CSSProperties}>
                <svg viewBox="0 0 100 100" className={s.obj} aria-hidden="true">
                  {objects[it.obj]}
                </svg>
                <div className={s.tag}>
                  <span className={s.kind}>{it.kind}</span>
                  <h2 className={s.title}>{it.title}</h2>
                  <p>{it.why}</p>
                  <p className={s.who}>{it.who}</p>
                  <a href={it.href} rel="noopener" className="pen-link">
                    {it.link}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section" aria-labelledby="suggest">
        <div className="wrap wrap-text" data-reveal>
          <h2 id="suggest" className={s.suggest}>
            Know something that belongs here?
          </h2>
          <p className="lede" style={{ marginTop: "1rem" }}>
            If a Walker has recommended a book, a tool or a talk in public, send us the link and we’ll add it with the credit
            it deserves.
          </p>
          <p style={{ marginTop: "1.5rem" }}>
            <Link href="/contact/?topic=recommend" className="btn btn-paper">
              Suggest something
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
