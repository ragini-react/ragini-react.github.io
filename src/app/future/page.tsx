import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { TelescopeScene } from "@/components/scenes/TelescopeScene";
import { pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./future.module.scss";

const DESCRIPTION =
  "What Walkover is building right now, labelled honestly: what is live, what is in beta, and what products have announced. No made-up roadmap.";

export const metadata = pageMeta({ title: "Future & Experiments", description: DESCRIPTION, path: "/future/" });

type Status = "live" | "beta" | "announced";

const items: Array<{ status: Status; title: string; body: string; href: string; source: string }> = [
  { status: "live", title: "Agents inside other products", body: "GTWY’s Agent Embed lets software platforms offer customer-built AI agents. It already runs agent features in viaSocket and MSG91.", href: "/products/gtwy/", source: "gtwy.ai" },
  { status: "live", title: "An agent from one sentence", body: "50 Agents builds no-code agents from a plain-language prompt, working across the apps people already use.", href: "/products/50agents/", source: "50agents.com" },
  { status: "live", title: "Integrations for AI agents", body: "viaSocket now positions itself as the integration layer for products and AI agents, set up by pasting one prompt into a coding assistant.", href: "/products/viasocket/", source: "viasocket.com" },
  { status: "live", title: "Grounded answers, open source", body: "Hippocampus, a retrieval engine that keeps language models grounded in your own knowledge, is published under the MIT licence.", href: "https://github.com/Walkover-Web-Solution/hippocampus", source: "GitHub, Nov 2025" },
  { status: "beta", title: "Hosting for AI-built apps", body: "Embarko turns an app made with an AI tool into a live link. It is marked Beta on its own site.", href: "/products/embarko/", source: "embarko.ai" },
  { status: "announced", title: "More for Embarko", body: "Embarko lists email, login, files, backups, private sharing, schedules and background jobs as upcoming.", href: "https://embarko.ai", source: "embarko.ai, Oct 2026" },
];

const label: Record<Status, string> = { live: "live today", beta: "in beta", announced: "announced by the product" };

export default function FuturePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Future & Experiments", description: DESCRIPTION, path: "/future/" })} />
      <PageHero
        trail={[{ name: "Future & Experiments", path: "/future/" }]}
        eyebrow="future & experiments"
        title={
          <>
            What’s in the oven,
            <br />
            labelled honestly.
          </>
        }
        lede={
          <p>
            Every item below carries a label: live, in beta, or announced by the product itself. We don’t publish a
            roadmap here, and we won’t dress a guess up as a plan.
          </p>
        }
        art={<TelescopeScene />}
      />

      <section className="section sheet" aria-labelledby="now">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">on the bench</p>
            <h2 id="now">Communication, and a lot of AI.</h2>
            <ul className={s.legend}>
              {(Object.keys(label) as Status[]).map((k) => (
                <li key={k} data-status={k}>
                  {label[k]}
                </li>
              ))}
            </ul>
          </div>
          <ul className={s.jars}>
            {items.map((it, i) => (
              <li key={it.title} data-status={it.status} data-reveal="drop" style={{ "--d": i % 3 } as React.CSSProperties}>
                <span className={s.lid} aria-hidden="true" />
                <span className={s.tag}>{label[it.status]}</span>
                <h3>{it.title}</h3>
                <p>{it.body}</p>
                <p className={s.src}>
                  {it.href.startsWith("/") ? <Link href={it.href}>Learn more</Link> : <a href={it.href} rel="noopener">Learn more</a>}
                  <span> · Source: {it.source}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="track">
        <div className="wrap wrap-text" data-reveal>
          <p className="eyebrow">want the real roadmap?</p>
          <h2 id="track" style={{ marginTop: "0.75rem" }}>
            Ask the products directly.
          </h2>
          <p className="lede" style={{ marginTop: "1rem" }}>
            Each team keeps its own changelog or feedback board, and they are the best place to see what is coming:
          </p>
          <ul className={s.boards}>
            <li>
              <a href="https://docstar.io/help/changelog" rel="noopener">
                DocStar changelog
              </a>
            </li>
            <li>
              <a href="https://feedback.msg91.com" rel="noopener">
                MSG91 feature requests
              </a>
            </li>
            <li>
              <a href="https://thingsofbrand.canny.io" rel="noopener">
                Things of Brand feedback
              </a>
            </li>
          </ul>
          <p style={{ marginTop: "2rem" }}>
            <Link href="/ideas/" className="pen-link">
              How ideas turn into products here
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
