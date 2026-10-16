import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { StoriesScene } from "@/components/scenes/StoriesScene";
import { pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./stories.module.scss";

const DESCRIPTION =
  "Real stories from Walkover’s road: a social network that paid in paise, a hosting desk that learned to text, the year no investor said yes, and a month in the hills.";

export const metadata = pageMeta({ title: "Stories", description: DESCRIPTION, path: "/stories/" });

const stories: Array<{ title: string; year: string; body: string; source: string; href: string; doodle: string }> = [
  {
    year: "2007",
    title: "Paid to be social",
    body: "Whozzat, an early Walkover social site, paid members 3 paise for every message they sent and up to ₹33 for each friend they invited. Cheques went out once you reached ₹2,000.",
    source: "whozzat.com, archived 2007",
    href: "https://web.archive.org/web/20071012031543/http://whozzat.com/money.html",
    doodle: "M14 40 a14 14 0 1 0 0.1 0 M14 34 V 46 M10 37 H 18 M40 20 a10 10 0 1 0 0.1 0 M36 30 L 34 50 H 46 L 44 30",
  },
  {
    year: "2009",
    title: "The hosting desk that learned to text",
    body: "Hostnsoft bundled free SMS with its hosting plans. msg91.com went live “Powered by Host N Soft”, at first for students abroad who wanted to text family in India.",
    source: "hostnsoft.com and msg91.com, archived 2009",
    href: "https://web.archive.org/web/20090214232406/http://msg91.com/",
    doodle: "M8 14 H 40 V 40 H 8 Z M8 24 H 40 M20 48 H 52 C 56 48, 56 34, 52 34 H 44",
  },
  {
    year: "2009",
    title: "Two ways to tell one beginning",
    body: "The founder remembers Indore’s Yeshwant Club asking for transactional SMS, with Walkover as the middleman. Another account says an unreliable SMS vendor pushed the team to bring SMS in-house. Both can be true; we keep both.",
    source: "Founder’s essay (2019); The Grit Stories (2022)",
    href: "https://web.archive.org/web/20190917113746/https://msg91.com/blog/a-journey-from-sms-to-communication-megacorp/",
    doodle: "M10 46 C 10 20, 30 10, 30 10 C 30 10, 50 20, 50 46 M30 10 V 52",
  },
  {
    year: "2011",
    title: "The year nobody bought in",
    body: "The founder pitched investors and none of them said yes. In his words, “it is easier to build a product.” MSG91 stayed bootstrapped, and for a long while had no sales head.",
    source: "The Grit Stories, Oct 2022",
    href: "https://web.archive.org/web/20221013141712/https://thegritstories.com/msg91-starting-small-and-soaring-in-the-sky-98302ef012bc",
    doodle: "M10 20 H 50 V 46 H 10 Z M18 20 V 12 H 42 V 20 M24 32 L 36 32",
  },
  {
    year: "2011",
    title: "A rule that helped",
    body: "TRAI limited promotional SMS to 100 a day per SIM but left transactional messages alone. The founder later wrote that it worked “surprisingly to our advantage”.",
    source: "TRAI press release 49/2011; founder’s essay",
    href: "https://trai.gov.in/sites/default/files/2024-09/PRESS_RELEASE_27_9.pdf",
    doodle: "M12 10 H 44 L 48 14 V 50 H 12 Z M18 22 H 40 M18 30 H 40 M18 38 H 30",
  },
  {
    year: "2016",
    title: "Google Tag Manager, but for APIs",
    body: "That is how Socket introduced itself in 2016. It started as a side project for internal use, with a first prototype in 90 days, and grew into viaSocket.",
    source: "viasocket.com, archived 2016; viasocket.com/about",
    href: "https://web.archive.org/web/20160418133406/http://viasocket.com/",
    doodle: "M14 18 H 34 V 38 H 14 Z M20 18 V 8 M28 18 V 8 M24 38 C 24 50, 44 48, 50 40",
  },
  {
    year: "2019",
    title: "Why “Spartans”?",
    body: "The homepage once described the team as “50 Spartans (300 - a must watch, Walkover recommends)”. The film stuck, and so did the name.",
    source: "walkover.in, archived Oct 2019",
    href: "https://web.archive.org/web/20191003071312/https://www.walkover.in/",
    doodle: "M30 8 L 46 18 V 34 C 46 44, 38 50, 30 54 C 22 50, 14 44, 14 34 V 18 Z M30 18 V 44",
  },
  {
    year: "2021",
    title: "A month in the hills",
    body: "A cottage for 20 to 25 people near Kullu, the river Beas outside, chai in one hand and a laptop in the other. Working from home became working from hills.",
    source: "Walkover Insights, May 2021",
    href: "https://medium.com/walkover-insights/if-you-think-youve-peaked-find-a-new-mountain-b95fca58fbb6",
    doodle: "M4 50 L 22 20 L 32 34 L 42 16 L 58 50 Z M44 12 a5 5 0 1 0 0.1 0",
  },
];

export default function StoriesPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Stories", description: DESCRIPTION, path: "/stories/", type: "CollectionPage" })} />
      <PageHero
        trail={[{ name: "Stories", path: "/stories/" }]}
        eyebrow="stories"
        title={
          <>
            Every product
            <br />
            started as a chat.
          </>
        }
        lede={
          <p>
            Below the drawing are real stories from Walkover’s road, each with the place we found it. The drawing is just a
            drawing: five made-up Walkers making the Walkover die out of five ideas.
          </p>
        }
      />
      <section className="section-tight sheet ruled" aria-label="Illustration: five Walkers, one idea">
        <div className="wrap">
          <StoriesScene />
        </div>
      </section>
      <section className="section" aria-labelledby="real">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">real stories</p>
            <h2 id="real">From the archive, in order.</h2>
          </div>
          <ol className={s.strip}>
            {stories.map((st, i) => (
              <li key={st.title} className={s.panel} data-reveal={i % 2 ? "tilt" : "drop"} style={{ "--d": i % 2 } as React.CSSProperties}>
                <div className={s.panelHead}>
                  <span className={s.year}>{st.year}</span>
                  <svg viewBox="0 0 60 60" className={s.doodle} aria-hidden="true">
                    <path d={st.doodle} />
                  </svg>
                </div>
                <h3>{st.title}</h3>
                <p>{st.body}</p>
                <p className={s.src}>
                  <a href={st.href} rel="noopener">
                    {st.source}
                  </a>
                </p>
              </li>
            ))}
          </ol>
          <p className={s.more}>
            <Link href="/about/" className="btn btn-paper">
              The full timeline
            </Link>
            <Link href="/blog/" className="pen-link">
              Stories Walkers wrote themselves
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
