import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { ChaiScene } from "@/components/scenes/ChaiScene";
import { Polaroid } from "@/components/ui/Polaroid";
import { photos } from "@/content/photos";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./life.module.scss";

const DESCRIPTION =
  "Life at Walkover: Friday happiness letters, a month working from the hills, Walkover University, chai, and the people behind the products. Real moments, with sources.";

export const metadata = pageMeta({ title: "Life at Walkover", description: DESCRIPTION, path: "/life/" });

const moments = [
  {
    when: "Every Friday, 2021–2025",
    title: "The Happiness letter",
    body: "A short note to the whole team, on lessons, honesty, consistency and even the secret of Secret Santa. More than sixty of them are in the archive.",
    href: company.happinessArchive,
    link: "Read the letters",
  },
  {
    when: "2021",
    title: "Working from hills",
    body: "While most people worked from home, some Walkers spent a month in a cottage near Kullu, by the river Beas, with chai in one hand and a laptop in the other.",
    href: "https://medium.com/walkover-insights/if-you-think-youve-peaked-find-a-new-mountain-b95fca58fbb6",
    link: "The workcation write-up",
  },
  {
    when: "2021",
    title: "Looking after each other",
    body: "During the second COVID wave the team ran a community forum with verified information, an ask-me-anything with doctors, and a health check-up camp.",
    href: "https://medium.com/walkover-insights/a-look-back-at-2021-2770bda68ff2",
    link: "A Look Back At 2021",
  },
  {
    when: "2021",
    title: "Walkover University",
    body: "A free six-week programme that trained young people for paid internships. No engineering degree needed.",
    href: "https://web.archive.org/web/20211129121554/https://www.walkover.in/university/",
    link: "The archived page",
  },
  {
    when: "2019",
    title: "A stall at MWC Barcelona",
    body: "MSG91 went to Mobile World Congress. The team admitted they spent more time at the stall than anywhere else.",
    href: "https://web.archive.org/web/2019/https://msg91.com/blog/what-happened-at-mwc19/",
    link: "The MSG91 blog post",
  },
];

export default function LifePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Life at Walkover", description: DESCRIPTION, path: "/life/" })} />
      <PageHero
        trail={[{ name: "Life at Walkover", path: "/life/" }]}
        eyebrow="life at walkover"
        title={
          <>
            Chai, Fridays,
            <br />
            and the odd mountain.
          </>
        }
        lede={
          <p>
            Walkover has called its people “Spartans” and chosen to be “happy, hearty &amp; healthy”. Here is what that has
            looked like, in moments we can point to.
          </p>
        }
        art={<ChaiScene />}
      />

      <section className="section sheet" aria-labelledby="moments">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">real moments</p>
            <h2 id="moments">Things that actually happened.</h2>
          </div>
          <ol className={s.moments}>
            {moments.map((m, i) => (
              <li key={m.title} data-reveal={i % 2 ? "tilt" : "drop"} style={{ "--d": i % 3 } as React.CSSProperties}>
                <span className={s.when}>{m.when}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
                <a href={m.href} rel="noopener" className="pen-link">
                  {m.link}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="faces">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">faces</p>
            <h2 id="faces">The people behind the products.</h2>
            <p className="lede">Two photos Walkover has published itself. The characters elsewhere on this site are drawings; these are not.</p>
          </div>
          <div className={s.wall}>
            <Polaroid photo={photos.office} tilt={-2} />
            <Polaroid photo={photos.msg91} tilt={2.5} />
          </div>
          <div className={s.next} data-reveal>
            <p className="hand">want to be in the next photo?</p>
            <Link href="/careers/" className="btn btn-red">
              See open roles
            </Link>
            <Link href="/freedom/" className="pen-link">
              How freedom works here
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
