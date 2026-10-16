import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { IdeaJar } from "@/components/scenes/IdeaJar";
import { IdeaRelay } from "@/components/scenes/IdeaRelay";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./ideas.module.scss";

const DESCRIPTION =
  "How ideas become things at Walkover: tools built for ourselves first, open-source SDKs, a free university for freshers, and how to bring us your own idea.";

export const metadata = pageMeta({ title: "Ideas & Contributions", description: DESCRIPTION, path: "/ideas/" });

const ownTools = [
  {
    name: "viaSocket",
    text: "Began as a side project by two people who had helped shape MSG91, built for internal marketing use. The first prototype took 90 days.",
    source: "viasocket.com/about",
    href: "/products/viasocket/",
  },
  {
    name: "Giddh",
    text: "Walkover’s own accounting headaches came first; the accounting software followed, publicly released in 2016.",
    source: "Walkover press release, May 2016",
    href: "/products/giddh/",
  },
  {
    name: "UserTable",
    text: "A table to manage MSG91’s sign-up leads, built so the sales team could skip a heavy CRM.",
    source: "Walkover GitHub",
    href: "https://github.com/Walkover-Web-Solution/user-table",
  },
  {
    name: "GTWY",
    text: "Runs the agent features inside viaSocket and MSG91 before it is offered to anyone else.",
    source: "gtwy.ai",
    href: "/products/gtwy/",
  },
  {
    name: "DocStar",
    text: "Several of walkover.in’s own pages have been built and served with it.",
    source: "walkover.in, 2026",
    href: "/products/docstar/",
  },
];

const contributions = [
  {
    title: "SendOTP SDKs",
    text: "Open SDKs for MSG91’s one-time-password service, for Node, Android and more.",
    href: "https://github.com/MSG91",
    link: "github.com/MSG91",
  },
  {
    title: "GTWY, open source",
    text: "The gtwy-ai repository is published under the Apache-2.0 licence.",
    href: "https://github.com/Walkover-Web-Solution/gtwy-ai",
    link: "gtwy-ai on GitHub",
  },
  {
    title: "Hippocampus",
    text: "A retrieval (RAG) engine that keeps language models grounded in your knowledge, MIT-licensed.",
    href: "https://github.com/Walkover-Web-Solution/hippocampus",
    link: "hippocampus on GitHub",
  },
  {
    title: "viaSocket apps",
    text: "The app integrations behind viaSocket, MIT-licensed.",
    href: "https://github.com/Walkover-Web-Solution/viasocket-apps",
    link: "viasocket-apps on GitHub",
  },
  {
    title: "Walkover University",
    text: "In 2021, a free six-week course that prepared young people for the industry, degree optional.",
    href: "https://web.archive.org/web/20211129121554/https://www.walkover.in/university/",
    link: "The archived page",
  },
  {
    title: "Brand library",
    text: "Every official Walkover and product logo, free to download in SVG and PNG.",
    href: company.brandAssets,
    link: "stuff.walkover.in",
  },
];

export default function IdeasPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Ideas & Contributions", description: DESCRIPTION, path: "/ideas/" })} />
      <PageHero
        trail={[{ name: "Ideas & Contributions", path: "/ideas/" }]}
        eyebrow="ideas & contributions"
        title={
          <>
            What we can’t find,
            <br />
            we build.
          </>
        }
        lede={
          <>
            <p>
              “As we are such highly creative and somewhat crazy people, what we don’t find as a tool, we create it.” That line
              is from Walkover’s own look back at 2021, and it describes how a lot of things here begin.
            </p>
          </>
        }
        art={<IdeaJar />}
      />

      <section className="section sheet" aria-labelledby="relay">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">the relay</p>
            <h2 id="relay">Share it, question it, connect it, build it.</h2>
            <p className="lede">No idea arrives finished. It gets passed around until somebody makes a first version, and then a better one.</p>
          </div>
          <IdeaRelay />
        </div>
      </section>

      <section className="section" aria-labelledby="own">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">for us first</p>
            <h2 id="own">Tools we built because we needed them.</h2>
          </div>
          <ul className={s.tools}>
            {ownTools.map((t, i) => (
              <li key={t.name} data-reveal="drop" style={{ "--d": i } as React.CSSProperties}>
                <h3>{t.name}</h3>
                <p>{t.text}</p>
                <p className={s.src}>
                  {t.href.startsWith("/") ? <Link href={t.href}>More on {t.name}</Link> : <a href={t.href} rel="noopener">{t.name} on GitHub</a>}
                  <span> · Source: {t.source}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section sheet grid-paper" aria-labelledby="give">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">contributions</p>
            <h2 id="give">Things we’ve put out into the world.</h2>
            <p className="lede">Small and useful, mostly. The code is on GitHub; the rest is linked below.</p>
          </div>
          <ul className={s.gifts}>
            {contributions.map((c, i) => (
              <li key={c.title} data-reveal="tilt" style={{ "--d": i % 3 } as React.CSSProperties}>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <a href={c.href} rel="noopener" className="pen-link">
                  {c.link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="yours">
        <div className={`wrap ${s.yours}`} data-reveal>
          <p className="eyebrow">your turn</p>
          <h2 id="yours">Got an idea for us?</h2>
          <p className="lede">
            A feature for one of our products, a partnership, something we should build. Write it down, rough is fine.
          </p>
          <Link href="/contact/?topic=idea" className="btn btn-red">
            Send us your idea
          </Link>
        </div>
      </section>
    </>
  );
}
