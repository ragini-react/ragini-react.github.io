import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { products, pastExperiments } from "@/content/products";
import { brandProps } from "@/lib/brand";
import { asset } from "@/lib/paths";
import { absoluteUrl, pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./products.module.scss";

const DESCRIPTION =
  "Every Walkover product in one place: MSG91, viaSocket, Giddh, GTWY AI, 50 Agents, DocStar, Things of Brand and Embarko, plus the experiments that came before them.";

export const metadata = pageMeta({ title: "Products", description: DESCRIPTION, path: "/products/" });

const origins: Array<{ when: string; text: string; href?: string }> = [
  { when: "2009", text: "MSG91 started as an SMS service bolted onto a hosting business. It became the first big product.", href: "/products/msg91/" },
  { when: "2014–16", text: "Giddh was online by 2014 and publicly released in May 2016, after Walkover’s own accounting troubles.", href: "/products/giddh/" },
  { when: "2016", text: "Socket called itself “Google tag manager for APIs”. It grew into viaSocket.", href: "/products/viasocket/" },
  { when: "Lately", text: "GTWY, 50 Agents and DocStar put AI to work; GTWY runs agent features inside viaSocket and MSG91.", href: "/products/gtwy/" },
  { when: "In beta", text: "Embarko, instant hosting for AI-built apps, is being built in the same building.", href: "/products/embarko/" },
];

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: "Walkover products", description: DESCRIPTION, path: "/products/", type: "CollectionPage" }),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/products/${p.slug}/`), name: p.name })),
          },
        ]}
      />
      <PageHero
        trail={[{ name: "Products", path: "/products/" }]}
        eyebrow="the shelf"
        title={
          <>
            Eight products.
            <br />
            Eight sets of colours.
          </>
        }
        lede={
          <p>
            Each product has its own team, its own brand and its own job to do. Walkover is the workshop they all came out of.
            Pick one off the shelf.
          </p>
        }
      />

      <section className={s.shelfWrap} aria-label="All products">
        <div className="wrap">
          <ul className={s.shelf}>
            {products.map((p, i) => (
              <li key={p.slug} data-reveal="drop" style={{ "--d": i % 4 } as React.CSSProperties}>
                <Link href={`/products/${p.slug}/`} className={s.box} {...brandProps(p.brand)}>
                  <span className={s.spine} aria-hidden="true" />
                  <span className={s.sticker}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(p.logo.src)} alt="" width={p.logo.width} height={p.logo.height} loading="lazy" />
                  </span>
                  <span className={s.name}>
                    {p.name}
                    {p.status === "beta" && <span className="pill">beta</span>}
                  </span>
                  <span className={s.kind}>{p.kind}</span>
                  <span className={s.tag}>{p.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="began">
        <div className={`wrap ${s.began}`}>
          <div className="section-head" data-reveal>
            <p className="eyebrow">product stories</p>
            <h2 id="began">How they began.</h2>
            <p className="lede">Nothing here appeared fully formed. Most of it started as a fix for a problem someone at Walkover had.</p>
          </div>
          <ol className={s.path}>
            {origins.map((o, i) => (
              <li key={o.when} data-reveal="tilt" style={{ "--d": i } as React.CSSProperties}>
                <span className={s.when}>{o.when}</span>
                <p>
                  {o.text}{" "}
                  {o.href && (
                    <Link href={o.href} className="pen-link">
                      See it
                    </Link>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section sheet" aria-labelledby="drawer">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">the bottom drawer</p>
            <h2 id="drawer">Experiments we tried, and learned from.</h2>
            <p className="lede">
              Some grew into today’s products. Most quietly closed. They are history, not products you can buy, and each one
              is listed with where we found it.
            </p>
          </div>
          <ul className={s.drawer}>
            {pastExperiments.map((e, i) => (
              <li key={e.name} className={s.card} data-reveal="drop" style={{ "--d": i % 4 } as React.CSSProperties}>
                <span className={s.stamp} aria-hidden="true">
                  {e.outcome ? "grew up" : "archived"}
                </span>
                <h3>{e.name}</h3>
                <p>{e.what}</p>
                {e.outcome && <p className={s.outcome}>{e.outcome}</p>}
                <p className={s.evidence}>Source: {e.evidence}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
