import Link from "next/link";
import { products, type ProductSlug } from "@/content/products";
import { asset } from "@/lib/paths";
import { brandProps } from "@/lib/brand";
import styles from "./IdeaBunting.module.scss";

/** The question each product started from, written as a sketchbook note. Our words. */
const sketches: Record<ProductSlug, { q: string; doodle: "bubble" | "plug" | "scale" | "arch" | "crew" | "page" | "drawer" | "boat" }> = {
  msg91: { q: "what if the code always arrived?", doodle: "bubble" },
  viasocket: { q: "plug any app into any app?", doodle: "plug" },
  giddh: { q: "books that balance on their own?", doodle: "scale" },
  gtwy: { q: "agents inside every product?", doodle: "arch" },
  "50agents": { q: "an agent from one sentence?", doodle: "crew" },
  docstar: { q: "docs people can actually find?", doodle: "page" },
  thingsofbrand: { q: "always the right logo?", doodle: "drawer" },
  embarko: { q: "prompt in, live link out?", doodle: "boat" },
};

const doodles: Record<string, string> = {
  bubble: "M10 30 C 10 14, 50 14, 50 28 C 50 40, 26 42, 18 40 L 10 48 L 14 38 C 10 36, 10 33, 10 30 Z",
  plug: "M14 22 H 34 V 38 H 14 Z M 20 22 V 12 M 28 22 V 12 M 24 38 C 24 48, 44 46, 50 40",
  scale: "M30 10 V 44 M 12 18 H 48 M 12 18 L 6 32 H 18 Z M 48 18 L 42 32 H 54 Z M 20 46 H 40",
  arch: "M10 44 C 10 14, 50 14, 50 44 M 18 44 C 18 24, 42 24, 42 44",
  crew: "M12 40 a5 5 0 1 0 0.1 0 M 28 40 a5 5 0 1 0 0.1 0 M 44 40 a5 5 0 1 0 0.1 0 M 28 14 V 30 M 12 30 L 28 22 L 44 30",
  page: "M14 8 H 38 L 46 16 V 46 H 14 Z M 20 22 H 40 M 20 30 H 40 M 20 38 H 32",
  drawer: "M8 18 H 52 V 44 H 8 Z M 8 30 H 52 M 26 24 H 34 M 26 36 H 34",
  boat: "M8 34 H 52 L 44 44 H 16 Z M 30 34 V 10 L 44 28 H 30",
};

export function IdeaBunting() {
  return (
    <ul className={styles.line} aria-label="Ideas that became Walkover products">
      {products.map((p, i) => {
        const s = sketches[p.slug];
        return (
          <li key={p.slug} className={styles.cell} style={{ "--i": i } as React.CSSProperties}>
            <svg className={styles.string} viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 4 Q 50 18, 100 4" />
            </svg>
            <span className={styles.peg} aria-hidden="true" />
            <Link href={`/products/${p.slug}/`} className={styles.note} {...brandProps(p.brand)}>
              <span className={styles.flip}>
                {/* Back: the original idea, as sketched */}
                <span className={styles.idea} aria-hidden="true">
                  <svg viewBox="0 0 60 56" className={styles.doodle}>
                    <path d={doodles[s.doodle]} />
                  </svg>
                  <span className={styles.q}>{s.q}</span>
                </span>
                {/* Front: the real product */}
                <span className={styles.product} aria-hidden="true">
                  <span className={styles.stripe} aria-hidden="true" />
                  <span className={styles.sticker}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(p.logo.src)} alt="" width={p.logo.width} height={p.logo.height} />
                  </span>
                  <span className={styles.name}>
                    {p.name}
                    {p.status === "beta" && <em> beta</em>}
                  </span>
                  <span className={styles.kind}>{p.kind}</span>
                </span>
              </span>
              <span className="sr-only">
                {p.name}: {p.kind}. It started from the question “{s.q}”
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
