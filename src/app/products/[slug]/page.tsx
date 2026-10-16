import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductStory } from "@/components/products/ProductStory";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { products, productBySlug } from "@/content/products";
import { brandProps } from "@/lib/brand";
import { asset } from "@/lib/paths";
import { absoluteUrl, pageMeta, SITE_URL } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./product.module.scss";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.name}: ${p.kind}`,
    description: `${p.tagline} ${p.name} is ${p.status === "beta" ? "in beta, " : ""}part of the Walkover family of products.`,
    path: `/products/${p.slug}/`,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();
  const index = products.indexOf(p);
  const others = products.filter((x) => x.slug !== p.slug);
  const primary = p.links.find((l) => l.primary) ?? p.links[0];
  const secondary = p.links.filter((l) => l !== primary);
  const path = `/products/${p.slug}/`;

  return (
    <div {...brandProps(p.brand)} className={s.page} data-flip={index % 2 === 1 || undefined}>
      <JsonLd
        data={[
          webPageSchema({ name: `${p.name}: ${p.kind}`, description: p.tagline, path }),
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: p.name,
            url: p.url,
            description: p.tagline,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            image: absoluteUrl(p.logo.src),
            publisher: { "@id": `${SITE_URL}/#organization` },
            mainEntityOfPage: absoluteUrl(path),
          },
        ]}
      />

      {/* Hero, in the product's own colours */}
      <header className={s.hero}>
        <div className={`wrap ${s.heroGrid}`}>
          <div className={s.heroText}>
            <Breadcrumbs trail={[{ name: "Products", path: "/products/" }, { name: p.name, path }]} />
            <span className="logo-sticker" style={{ rotate: "-2deg" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(p.logo.src)} alt={p.logo.alt} width={p.logo.width} height={p.logo.height} className={s.logo} />
            </span>
            <p className={s.kind}>
              {p.kind}
              {p.status === "beta" && <span className="pill">beta</span>}
            </p>
            <h1 className={s.title}>{p.name}</h1>
            <p className={s.tagline}>{p.tagline}</p>
            <div className={s.ctas}>
              <a href={primary.href} className="btn btn-brand" target="_blank" rel="noopener">
                {primary.label}
                <span className="sr-only"> (opens {new URL(primary.href).hostname} in a new tab)</span>
              </a>
              {secondary.map((l) => (
                <a key={l.href} href={l.href} className="pen-link" target="_blank" rel="noopener">
                  {l.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>
          <div className={s.heroArt}>
            <div className={s.storyCard}>
              <ProductStory slug={p.slug} title={`Illustration: ${p.storyLine}`} />
              <p className={`hand ${s.storyLine}`}>{p.storyLine}</p>
            </div>
          </div>
        </div>
      </header>

      {/* The problem */}
      <section className={`section ${s.problem}`} aria-labelledby="problem">
        <div className="wrap wrap-text">
          <p className="eyebrow">the problem</p>
          <h2 id="problem" className={s.problemTitle} data-reveal>
            {p.problem.heading}
          </h2>
          <p className="lede" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            {p.problem.body}
          </p>
          <p className={s.audience} data-reveal style={{ "--d": 2 } as React.CSSProperties}>
            <b>Made for:</b> {p.audience}
          </p>
        </div>
      </section>

      {/* What it does */}
      <section className={`section sheet ${s.features}`} aria-labelledby="features">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">what {p.name} does</p>
            <h2 id="features">The parts that do the work.</h2>
          </div>
          <ol className={s.featureList}>
            {p.features.map((f, i) => (
              <li key={f.title} data-reveal="tilt" style={{ "--d": i } as React.CSSProperties}>
                <span className={s.num} aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ol>
          <div className={s.useCases} data-reveal>
            <p className="hand">people use it for</p>
            <ul>
              {p.useCases.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>
          {p.claims && (
            <figure className={s.claims} data-reveal>
              <blockquote>{p.claims.text}</blockquote>
              <figcaption>
                As published by {p.name}: {p.claims.source}
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      {/* Relationship + next step */}
      <section className="section" aria-labelledby="next">
        <div className={`wrap ${s.nextGrid}`}>
          <div data-reveal>
            <p className="eyebrow">next step</p>
            <h2 id="next" className={s.nextTitle}>
              See {p.name} for yourself.
            </h2>
            <div className={s.ctas}>
              <a href={primary.href} className="btn btn-brand" target="_blank" rel="noopener">
                {primary.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link href="/contact/" className="pen-link">
                Questions for Walkover
              </Link>
            </div>
            <p className={s.relation}>
              <b>How {p.name} relates to Walkover:</b> {p.relationship} Product details were checked against {new URL(p.url).hostname}{" "}
              on {p.checked}; the product’s own site is always the latest word.
            </p>
          </div>
          <nav aria-label="Other Walkover products" className={s.others} data-reveal="fade">
            <p className="hand">also on the shelf</p>
            <ul>
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/products/${o.slug}/`} {...brandProps(o.brand)} className={s.other}>
                    <span className={s.otherLogo} aria-hidden="true">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={asset(o.logo.src)} alt="" width={o.logo.width} height={o.logo.height} loading="lazy" />
                    </span>
                    {o.name}
                    <small>{o.kind}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
}
