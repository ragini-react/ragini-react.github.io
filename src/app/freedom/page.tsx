import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { VideoFacade } from "@/components/ui/VideoFacade";
import { values } from "@/content/company";
import { freedomQuote } from "@/content/story";
import { pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./freedom.module.scss";

const DESCRIPTION =
  "What freedom means at Walkover, in the company’s own words: freedom equals responsibility, which equals accountability and ownership.";

export const metadata = pageMeta({ title: "Freedom", description: DESCRIPTION, path: "/freedom/" });

const terms = ["Freedom", "Responsibility", "Accountability", "Ownership"];
const ops = ["=", "=", "+"];

export default function FreedomPage() {
  const bold = values.find((v) => v.n === 2)!;
  const doers = values.find((v) => v.n === 3)!;
  const time = values.find((v) => v.n === 5)!;
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Freedom at Walkover", description: DESCRIPTION, path: "/freedom/" })} />
      <PageHero
        trail={[{ name: "Freedom", path: "/freedom/" }]}
        eyebrow="freedom"
        title={
          <>
            Room to think.
            <br />
            And the duty to finish.
          </>
        }
        lede={
          <p>
            Freedom at Walkover isn’t a perk on a poster. In the company’s own description it comes as a package with
            responsibility, and the second half matters as much as the first.
          </p>
        }
        art={
          <div className={`scene ${s.lockScene}`} data-scene aria-hidden="true">
            <svg viewBox="0 0 300 240" className={s.lockSvg}>
              <g className={s.book}>
                <rect x="40" y="70" width="170" height="140" rx="10" />
                <path d="M60 70 V 210" />
                <path className={s.lines} d="M80 100 H 190 M80 120 H 180 M80 140 H 190 M80 160 H 160" />
              </g>
              <g className={s.lock}>
                <path className={s.shackle} d="M178 120 V 100 C 178 78, 214 78, 214 100 V 120" />
                <rect x="168" y="118" width="56" height="44" rx="8" />
                <circle cx="196" cy="138" r="5" />
              </g>
              {[0, 1, 2].map((i) => (
                <path key={i} className={s.plane} data-n={i} d="M0 0 L 28 -10 L 14 8 L 10 2 Z M10 2 L 28 -10" />
              ))}
            </svg>
          </div>
        }
      />

      <section className="section-tight" aria-labelledby="equation">
        <div className="wrap">
          <h2 id="equation" className="sr-only">
            Freedom equals responsibility, which equals accountability plus ownership
          </h2>
          <p className={s.equation} aria-hidden="true">
            {terms.map((t, i) => (
              <span key={t} className={s.term} data-reveal="drop" style={{ "--d": i * 2 } as React.CSSProperties}>
                <span className={s.word}>{t}</span>
                {i < ops.length && (
                  <span className={s.op} data-reveal="fade" style={{ "--d": i * 2 + 1 } as React.CSSProperties}>
                    {ops[i]}
                  </span>
                )}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="section sheet" aria-labelledby="own-words">
        <div className={`wrap ${s.words}`}>
          <div data-reveal>
            <p className="eyebrow">in our own words</p>
            <h2 id="own-words" style={{ marginTop: "0.75rem" }}>
              “We don’t strive for perfection.”
            </h2>
            <blockquote className={s.quote}>
              <p>{freedomQuote.quote}</p>
              <footer>
                From the description of{" "}
                <a href={freedomQuote.source.href} rel="noopener">
                  {freedomQuote.source.label}
                </a>
              </footer>
            </blockquote>
          </div>
          <div data-reveal="tilt">
            <VideoFacade id={freedomQuote.videoId} title="Freedom + Responsibility at Walkover" duration="about 1½ minutes" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="looks-like">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">what it looks like</p>
            <h2 id="looks-like">Freedom, with the strings left in.</h2>
            <p className="lede">Things Walkover has actually said about how people work, and the values that keep freedom honest.</p>
          </div>
          <ul className={s.notes}>
            <li data-reveal="drop">
              <h3>Space comes first</h3>
              <p>
                “Sane hours to balance work and passion. Flexibility while we work comes ahead of everything… our team needs
                their space.”
              </p>
              <small>walkover.in, since 2020</small>
            </li>
            <li data-reveal="drop" style={{ "--d": 1 } as React.CSSProperties}>
              <h3>Say when it isn’t working</h3>
              <p>“We strongly recommend you to talk to us if at any day you feel that you are not enjoying at walkover.”</p>
              <small>Walkover careers page, 2011 (archived)</small>
            </li>
            <li data-reveal="drop" style={{ "--d": 2 } as React.CSSProperties}>
              <h3>{bold.title}</h3>
              <p>{bold.body}</p>
              <small>Value no. 2</small>
            </li>
            <li data-reveal="drop" style={{ "--d": 3 } as React.CSSProperties} className={s.counter}>
              <h3>{doers.title}</h3>
              <p>{doers.body}</p>
              <small>Value no. 3: the responsibility half</small>
            </li>
            <li data-reveal="drop" style={{ "--d": 4 } as React.CSSProperties} className={s.counter}>
              <h3>{time.title}</h3>
              <p>{time.body}</p>
              <small>Value no. 5: freedom with other people’s time is still a duty</small>
            </li>
          </ul>
          <div className={s.next}>
            <Link href="/ideas/" className="btn btn-paper">
              How ideas get picked up
            </Link>
            <Link href="/about/culture-we-foster/" className="pen-link">
              All ten values
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
