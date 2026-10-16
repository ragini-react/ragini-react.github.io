"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ProductStory } from "@/components/products/ProductStory";
import { products } from "@/content/products";
import { brandProps } from "@/lib/brand";
import { asset } from "@/lib/paths";
import styles from "./ProblemPicker.module.scss";

/**
 * "Pick a problem": each tab is a problem written on a sticky note; the panel
 * answers with the product, in that product's own colours. ARIA tabs with
 * arrow-key, Home and End support.
 */
export function ProblemPicker() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const p = products[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const last = products.length - 1;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className={styles.picker}>
      <div role="tablist" aria-label="Problems our products solve" aria-orientation="vertical" className={styles.tabs}>
        {products.map((x, i) => (
          <button
            key={x.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`pp-tab-${x.slug}`}
            aria-selected={i === active}
            aria-controls={`pp-panel`}
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            {...brandProps(x.brand)}
          >
            <span className={styles.tabText}>{x.problem.heading}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" id="pp-panel" aria-labelledby={`pp-tab-${p.slug}`} className={styles.panel} {...brandProps(p.brand)} key={p.slug}>
        <div className={styles.panelHead}>
          <span className="logo-sticker">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(p.logo.src)} alt={p.logo.alt} width={p.logo.width} height={p.logo.height} style={{ height: 40 }} />
          </span>
          <div>
            <h3 className={styles.name}>
              {p.name}
              {p.status === "beta" && <span className="pill"> beta</span>}
            </h3>
            <p className={styles.kind}>{p.kind}</p>
          </div>
        </div>
        <p className={styles.tagline}>{p.tagline}</p>
        <div className={styles.story}>
          <ProductStory slug={p.slug} title={`Illustration: ${p.storyLine}`} />
        </div>
        <div className={styles.actions}>
          <Link href={`/products/${p.slug}/`} className="btn btn-brand">
            Meet {p.name}
          </Link>
          <a href={p.url} className="pen-link" target="_blank" rel="noopener">
            {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
