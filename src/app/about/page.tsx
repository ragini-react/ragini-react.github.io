import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Polaroid } from "@/components/ui/Polaroid";
import { company } from "@/content/company";
import { milestones, nameStory, type MilestoneKind } from "@/content/story";
import { photos } from "@/content/photos";
import { pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./about.module.scss";

const DESCRIPTION =
  "Walkover’s story: hosting and a social network in 2007, MSG91 in 2009, incorporation in June 2010, and the experiments and products since. Every date is sourced.";

export const metadata = pageMeta({ title: "Our Story", description: DESCRIPTION, path: "/about/" });

const kindLabel: Record<MilestoneKind, string> = {
  experiment: "early experiment",
  company: "the company",
  launch: "launch",
  milestone: "milestone",
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Our Story", description: DESCRIPTION, path: "/about/", type: "AboutPage" })} />
      <PageHero
        trail={[{ name: "Our Story", path: "/about/" }]}
        eyebrow="our story"
        title={
          <>
            Three founding dates.
            <br />
            One explanation.
          </>
        }
        lede={
          <>
            <p>
              People ask when Walkover started, and the honest answer has three dates in it. Hosting began in 2007, the founder
              came home to build it in 2008, and Walkover Web Solutions was incorporated on 18 June 2010.
            </p>
            <p>{company.mission}</p>
          </>
        }
        art={
          <div className={s.stamps} aria-hidden="true">
            {[
              ["2007", "Hostnsoft, hosting from Indore"],
              ["2008", "home from Dubai, a team of five"],
              ["2010", "incorporated, 18 June"],
            ].map(([y, t], i) => (
              <div key={y} className={s.stamp} style={{ "--i": i } as React.CSSProperties}>
                <span className={s.stampYear}>{y}</span>
                <span className={s.stampText}>{t}</span>
              </div>
            ))}
          </div>
        }
      />

      <section className="section sheet" aria-labelledby="timeline">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">the road so far</p>
            <h2 id="timeline">From a hosting desk to a family of products.</h2>
            <ul className={s.legend} aria-label="Legend">
              {(Object.keys(kindLabel) as MilestoneKind[]).map((k) => (
                <li key={k} data-kind={k}>
                  <span className={s.mark} aria-hidden="true" />
                  {kindLabel[k]}
                </li>
              ))}
            </ul>
          </div>
          <ol className={s.timeline}>
            {milestones.map((m, i) => (
              <li key={m.year + m.title} data-kind={m.kind} data-reveal={i % 2 ? "tilt" : "drop"}>
                <span className={s.mark} aria-hidden="true" />
                <div className={s.entry}>
                  <p className={s.year}>
                    {m.year} <span className="sr-only">· {kindLabel[m.kind]}</span>
                  </p>
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                  <p className={s.source}>
                    Source:{" "}
                    {m.source.href ? (
                      m.source.href.startsWith("/") ? (
                        <Link href={m.source.href}>{m.source.label}</Link>
                      ) : (
                        <a href={m.source.href} rel="noopener">
                          {m.source.label}
                        </a>
                      )
                    ) : (
                      m.source.label
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="people">
        <div className={`wrap ${s.people}`}>
          <div data-reveal>
            <p className="eyebrow">the people</p>
            <h2 id="people">Three siblings, then a crowd.</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Walkover was founded by {company.founders.join(", ").replace(/, ([^,]*)$/, " and $1")}. The team grew from five
              people around a hosting business to a crew the site has called its “Spartans”, a nod to the film <i>300</i>, which
              Walkover’s own homepage once recommended.
            </p>
            <blockquote className={s.quote}>
              <p>“{nameStory.quote}”</p>
              <footer>
                {nameStory.who}, co-founder ·{" "}
                <a href={nameStory.source.href} rel="noopener">
                  {nameStory.source.label}
                </a>
              </footer>
            </blockquote>
            <div className={s.links}>
              <Link href="/about/culture-we-foster/" className="btn btn-paper">
                The values we work by
              </Link>
              <Link href="/stories/" className="pen-link">
                Stories from the road
              </Link>
            </div>
          </div>
          <Polaroid photo={photos.msg91} tilt={-2} />
        </div>
      </section>

      <section className="section-tight" aria-labelledby="unknowns">
        <div className="wrap wrap-text">
          <h2 id="unknowns" className={s.smallHead}>
            What we’re still checking
          </h2>
          <p className="muted" style={{ marginTop: "0.75rem" }}>
            A few details from the early years come from a single account, and we have said so above. If you were there and
            remember it differently, <Link href="/contact/">tell us</Link>; we would rather fix the story than polish it.
          </p>
        </div>
      </section>
    </>
  );
}
