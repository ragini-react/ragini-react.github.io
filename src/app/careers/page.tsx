import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { CareersScene } from "@/components/scenes/CareersScene";
import { LiveJobs } from "@/components/careers/LiveJobs";
import { jobs, jobsFetchedAt } from "@/content/jobs";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./careers.module.scss";

const DESCRIPTION =
  "Open roles at Walkover in Indore, pulled live from our careers portal. Passion first, skill second, degree last.";

export const metadata = pageMeta({ title: "Careers", description: DESCRIPTION, path: "/careers/" });

export default function CareersPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Careers at Walkover", description: DESCRIPTION, path: "/careers/" })} />
      <PageHero
        trail={[{ name: "Careers", path: "/careers/" }]}
        eyebrow="careers"
        title={
          <>
            Passion first.
            <br />
            Skill second.
            <br />
            Degree last.
          </>
        }
        lede={
          <p>
            That’s the hiring rule, word for word. Below are the roles open right now, straight from our careers portal, where
            every application goes.
          </p>
        }
      />
      <section className="section-tight sheet" aria-label="Illustration: looking for the right door">
        <div className="wrap">
          <CareersScene roles={jobs.map((j) => j.title)} applyHref={company.careersPortal} />
        </div>
      </section>

      <section className="section" aria-labelledby="open">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">open roles</p>
            <h2 id="open">Pick a door.</h2>
          </div>
          <LiveJobs jobs={jobs} fetchedAt={jobsFetchedAt} portal={company.careersPortal} />
        </div>
      </section>

      <section className="section sheet" aria-labelledby="how">
        <div className={`wrap ${s.how}`}>
          <div data-reveal>
            <p className="eyebrow">how it works</p>
            <h2 id="how" style={{ marginTop: "0.75rem" }}>
              Apply on the portal. Bring what you’ve made.
            </h2>
          </div>
          <ol className={s.steps}>
            <li data-reveal style={{ "--d": 1 } as React.CSSProperties}>
              <b>Open a role</b> and read what it asks for; experience ranges come straight from the team that’s hiring.
            </li>
            <li data-reveal style={{ "--d": 2 } as React.CSSProperties}>
              <b>Apply on Walkover’s careers portal</b> (walkover.keka.com). That is the only place applications are collected.
            </li>
            <li data-reveal style={{ "--d": 3 } as React.CSSProperties}>
              <b>Show your work.</b> We hire for drive before degrees: in 2021 Walkover even ran a free course for young people
              without engineering degrees.
            </li>
          </ol>
          <div className={s.links} data-reveal>
            <a href={company.careersPortal} className="btn btn-red" target="_blank" rel="noopener">
              Open the careers portal
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/about/culture-we-foster/" className="pen-link">
              The values you’d be signing up for
            </Link>
            <Link href="/life/" className="pen-link">
              Life at Walkover
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
