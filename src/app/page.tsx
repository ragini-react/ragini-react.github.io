import Link from "next/link";
import { Walker } from "@/components/characters/Walker";
import { cast } from "@/components/characters/cast";
import { IdeaBunting } from "@/components/home/IdeaBunting";
import { ProblemPicker } from "@/components/home/ProblemPicker";
import { IdeaRelay } from "@/components/scenes/IdeaRelay";
import { StoriesScene } from "@/components/scenes/StoriesScene";
import { WriterScene } from "@/components/scenes/WriterScene";
import { CareersScene } from "@/components/scenes/CareersScene";
import { HappinessNewsletter } from "@/components/newsletter/HappinessNewsletter";
import { Polaroid } from "@/components/ui/Polaroid";
import { SketchCircle, SketchUnderline } from "@/components/motion/SketchUnderline";
import { JsonLd } from "@/components/JsonLd";
import { products } from "@/content/products";
import { posts, formatDate } from "@/content/posts";
import { jobs, jobPlace } from "@/content/jobs";
import { company, values } from "@/content/company";
import { milestones, nameStory, freedomQuote } from "@/content/story";
import { photos } from "@/content/photos";
import { pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./home.module.scss";

const DESCRIPTION =
  "Walkover is a software company from Indore, building since 2010. Meet MSG91, viaSocket, Giddh, GTWY AI, 50 Agents, DocStar and more, and the people who sketch them.";

export const metadata = {
  ...pageMeta({ title: "Walkover: We Are Walkers", description: DESCRIPTION, path: "/" }),
  title: { absolute: "Walkover: We Are Walkers" },
};

export default function Home() {
  const latest = posts.slice(0, 3);
  const storyBits = milestones.filter((m) => ["2009", "2011", "2021"].includes(m.year));
  const featuredValues = values.filter((v) => [1, 8, 9].includes(v.n));
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Walkover", description: DESCRIPTION, path: "/" })} />

      {/* 1 · Hero ------------------------------------------------------------ */}
      <section className={s.hero}>
        <div className={`wrap ${s.heroGrid}`}>
          <div className={s.heroText}>
            <p className="eyebrow">hello, we’re Walkers</p>
            <h1 className={s.heroTitle}>
              We sketch ideas.
              <br />
              Then we <SketchUnderline>ship them.</SketchUnderline>
            </h1>
            <p className="lede">
              Walkover is a software company from Indore, building since 2010. Our products help businesses message their
              customers, connect their apps, keep their books and put AI agents to work.
            </p>
            <div className={s.ctas}>
              <Link href="/products/" className="btn btn-red">
                Explore the products
              </Link>
              <Link href="/about/" className="btn btn-ghost">
                Read our story
              </Link>
            </div>
          </div>
          <div className={s.heroCast} aria-hidden="true">
            <svg className={s.heroNote} viewBox="0 0 220 120">
              <text x="10" y="40">If we can do it</text>
              <text x="10" y="70">you can do it too</text>
              <path d="M150 82 C 170 96, 168 112, 150 118 M146 108 L 150 119 L 161 114" />
            </svg>
            <Walker look={cast.connector} expressions={["grin"]} className={s.heroWalker} />
          </div>
        </div>
        <div className={`wrap ${s.bunting}`}>
          <IdeaBunting />
          <p className={`hand ${s.buntingHint}`}>hover or focus a note to see the idea it started as</p>
        </div>
      </section>

      {/* 2 · Meet Walkover ------------------------------------------------- */}
      <section className={`section ${s.meet}`} aria-labelledby="meet-title">
        <div className={`wrap ${s.spread}`}>
          <div className={s.pageLeft} data-reveal>
            <p className="eyebrow">page one</p>
            <h2 id="meet-title">
              Who’s <SketchCircle>Walkover?</SketchCircle>
            </h2>
            <ul className={s.facts}>
              <li data-reveal style={{ "--d": 1 } as React.CSSProperties}>
                <b>Indore, Madhya Pradesh.</b> Picked over the usual IT hubs, and still home.
              </li>
              <li data-reveal style={{ "--d": 2 } as React.CSSProperties}>
                <b>Founded by three siblings</b>: {company.founders.join(", ").replace(/, ([^,]*)$/, " and $1")}. Incorporated in June 2010.
              </li>
              <li data-reveal style={{ "--d": 3 } as React.CSSProperties}>
                <b>It started with hosting</b>, then SMS. MSG91 became the first big product.
              </li>
              <li data-reveal style={{ "--d": 4 } as React.CSSProperties}>
                <b>{products.length} products today</b>, from messaging to AI agents, each with its own team and its own colours.
              </li>
              <li data-reveal style={{ "--d": 5 } as React.CSSProperties}>
                <b>Three pillars:</b> {company.pillars.join(", ").toLowerCase()}.
              </li>
            </ul>
          </div>
          <div className={s.pageRight} data-reveal="tilt">
            <p className="eyebrow">why the name?</p>
            <blockquote className={s.bigQuote}>
              <p>
                “Be it a success or learning, <span className="mark">simply Walkover!</span>”
              </p>
              <footer>
                {nameStory.who}, co-founder ·{" "}
                <a href={nameStory.source.href} rel="noopener">
                  {nameStory.source.label}
                </a>
              </footer>
            </blockquote>
            <Link href="/about/" className="pen-link">
              The whole story, from 2006
            </Link>
          </div>
        </div>
      </section>

      {/* 3 · Ideas & freedom ------------------------------------------------- */}
      <section className={`section sheet ${s.ideas}`} aria-labelledby="ideas-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">how things get made here</p>
            <h2 id="ideas-title">An idea is only rough until someone picks it up.</h2>
            <p className="lede">
              Ideas get said out loud, questioned, connected and built, version by version. Several of our products began as
              tools we needed ourselves.
            </p>
          </div>
          <IdeaRelay />
          <div className={s.freedomStrip} data-reveal>
            <blockquote>
              <p>“{freedomQuote.quote.split(". ")[0]}.”</p>
              <footer>
                <a href={freedomQuote.source.href} rel="noopener">
                  {freedomQuote.source.label}
                </a>
              </footer>
            </blockquote>
            <div className={s.freedomLinks}>
              <Link href="/ideas/" className="btn btn-paper">
                Ideas &amp; contributions
              </Link>
              <Link href="/freedom/" className="pen-link">
                What freedom means here
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 · Products ------------------------------------------------------- */}
      <section className="section" aria-labelledby="products-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">pick a problem</p>
            <h2 id="products-title">Start with what’s bothering you.</h2>
            <p className="lede">Each answer is a real product, shown in its own colours. Use the arrow keys to flip through.</p>
          </div>
          <ProblemPicker />
        </div>
      </section>

      {/* 5 · Stories ------------------------------------------------------- */}
      <section className={`section sheet ruled ${s.stories}`} aria-labelledby="stories-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">stories</p>
            <h2 id="stories-title">Five people, five pips, one die.</h2>
            <p className="lede">Most of what we build started as a conversation. Here are a few real moments from the road.</p>
          </div>
          <StoriesScene />
          <ol className={s.storyBits}>
            {storyBits.map((m, i) => (
              <li key={m.year} data-reveal="tilt" style={{ "--d": i } as React.CSSProperties}>
                <span className={s.storyYear}>{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </li>
            ))}
          </ol>
          <p className={s.more}>
            <Link href="/stories/" className="pen-link">
              More stories
            </Link>
          </p>
        </div>
      </section>

      {/* 6 · Life at Walkover --------------------------------------------- */}
      <section className={`section ${s.life}`} aria-labelledby="life-title">
        <div className={`wrap ${s.lifeGrid}`}>
          <div>
            <div className="section-head" data-reveal>
              <p className="eyebrow">life at walkover</p>
              <h2 id="life-title">Real people. Real Fridays.</h2>
              <p className="lede">
                Walkers have worked remotely since 2020, and Indore is still home base. A few of the values the team wrote for itself:
              </p>
            </div>
            <ul className={s.values}>
              {featuredValues.map((v, i) => (
                <li key={v.n} data-reveal="drop" style={{ "--d": i } as React.CSSProperties}>
                  <strong>{v.title}</strong>
                  <span lang="hi">{v.hindi.split("।")[0]}।</span>
                </li>
              ))}
            </ul>
            <div className={s.ctas}>
              <Link href="/life/" className="btn btn-paper">
                Life at Walkover
              </Link>
              <Link href="/about/culture-we-foster/" className="pen-link">
                All ten values
              </Link>
            </div>
          </div>
          <div className={s.photos}>
            <Polaroid photo={photos.office} tilt={2} />
          </div>
        </div>
      </section>

      {/* 7 · Journal ------------------------------------------------------- */}
      <section className={`section sheet ${s.journal}`} aria-labelledby="journal-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">the journal</p>
            <h2 id="journal-title">From a thought to a page.</h2>
            <p className="lede">Walkers write about work, culture, design and engineering on Walkover Insights.</p>
          </div>
          <WriterScene article={{ title: latest[0].title, href: latest[0].href, meta: `${latest[0].author} · ${formatDate(latest[0].date)}` }} />
          <ul className={s.postList}>
            {latest.map((p, i) => (
              <li key={p.slug} data-reveal style={{ "--d": i } as React.CSSProperties}>
                <a href={p.href} rel="noopener">
                  <span className={s.postTopic}>{p.topic}</span>
                  <span className={s.postTitle}>{p.title}</span>
                  <span className={s.postMeta}>
                    {p.author} · {formatDate(p.date)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className={s.more}>
            <Link href="/blog/" className="pen-link">
              All articles
            </Link>
          </p>
        </div>
      </section>

      {/* 8 · Careers ------------------------------------------------------- */}
      <section className="section" aria-labelledby="careers-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">careers</p>
            <h2 id="careers-title">
              {jobs.length > 0 ? `${jobs.length} doors are open right now.` : "No open roles at the moment."}
            </h2>
            <p className="lede">
              “{company.hiringMotto}.” That’s the hiring rule.{" "}
              {jobs.length > 0 && `${jobs.filter((j) => jobPlace(j) === "Indore").length} of ${jobs.length} are based in Indore.`}
            </p>
          </div>
          <CareersScene roles={jobs.map((j) => j.title)} applyHref={company.careersPortal} />
          <div className={s.ctas}>
            <Link href="/careers/" className="btn btn-red">
              See open roles
            </Link>
          </div>
        </div>
      </section>

      {/* 9 · Happiness Newsletter ----------------------------------------- */}
      <section className={`section sheet grid-paper ${s.news}`} aria-label="Happiness Newsletter">
        <div className="wrap">
          <HappinessNewsletter />
        </div>
      </section>

      {/* 10 · Your move ------------------------------------------------------ */}
      <section className={`section ${s.end}`} aria-labelledby="end-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">one move. total focus.</p>
            <h2 id="end-title">Your move.</h2>
          </div>
          <ul className={s.doors}>
            {[
              { href: "/products/", t: "Find a product", d: "Eight of them, each in its own colours." },
              { href: "/stories/", t: "Read a story", d: "Hosting desks, SMS and a month in the hills." },
              { href: "/careers/", t: "Find a role", d: "Passion first, skill second, degree last." },
              { href: "/contact/", t: "Say hello", d: `Write to ${company.email} or visit Indore.` },
            ].map((door, i) => (
              <li key={door.href} data-reveal="drop" style={{ "--d": i } as React.CSSProperties}>
                <Link href={door.href} className={s.door}>
                  <span className={s.pip} aria-hidden="true">
                    {Array.from({ length: i + 1 }, (_, k) => (
                      <i key={k} />
                    ))}
                  </span>
                  <span className={s.doorTitle}>{door.t}</span>
                  <span className={s.doorDesc}>{door.d}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
