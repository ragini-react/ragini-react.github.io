import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { ValuesBox } from "@/components/values/ValuesBox";
import { Walker } from "@/components/characters/Walker";
import { cast } from "@/components/characters/cast";
import { StickyNote } from "@/components/characters/props";
import { values } from "@/content/company";
import { pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./culture.module.scss";

const DESCRIPTION =
  "The ten values Walkover works by, in English and Hindi: from “One move. Total focus.” to “Copy smart, build sharp!”, plus the values that came before them.";

export const metadata = pageMeta({ title: "Culture We Foster: Our Values", description: DESCRIPTION, path: "/about/culture-we-foster/" });

export default function CulturePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Culture We Foster", description: DESCRIPTION, path: "/about/culture-we-foster/" })} />
      <PageHero
        trail={[
          { name: "Our Story", path: "/about/" },
          { name: "Culture We Foster", path: "/about/culture-we-foster/" },
        ]}
        eyebrow="culture we foster"
        title={
          <>
            Ten values,
            <br />
            written down.
          </>
        }
        lede={
          <p>
            These are Walkover’s own words, published in English and Hindi. Read them in either language, or both side by
            side.
          </p>
        }
        art={
          <div className={s.art} aria-hidden="true">
            <svg className={s.board} viewBox="0 0 260 180">
              <rect x="6" y="6" width="248" height="168" rx="8" />
              {[
                [24, 26, -6],
                [96, 20, 4],
                [170, 28, -3],
                [40, 98, 5],
                [116, 96, -5],
              ].map(([x, y, r], i) => (
                <g key={i} transform={`rotate(${r} ${x + 30} ${y + 30})`} style={{ "--i": i } as React.CSSProperties} className={s.card}>
                  <rect x={x} y={y} width="60" height="58" />
                  <path d={`M${x + 8} ${y + 20} H ${x + 50} M${x + 8} ${y + 32} H ${x + 44} M${x + 8} ${y + 44} H ${x + 36}`} />
                </g>
              ))}
            </svg>
            <div className={s.pinner}>
              <Walker look={cast.listener} expressions={["grin"]} rightHand={<StickyNote color="oklch(89.16% 0.1569 92.99)" text="10" />} />
            </div>
          </div>
        }
      />
      <section className="section-tight" aria-label="Our ten values">
        <div className="wrap">
          <ValuesBox values={values} />
        </div>
      </section>

      <section className="section" aria-labelledby="versions">
        <div className="wrap wrap-text">
          <p className="eyebrow">version by version</p>
          <h2 id="versions" style={{ marginTop: "0.75rem" }}>
            Values get revised too.
          </h2>
          <p className="lede" style={{ marginTop: "1rem" }}>
            In 2019 the website listed just three: <b>Happiness</b> (“Keep happiness floating around”), <b>Purpose</b>
            (“Whatever you do, make sure it adds value”) and the <b>Thumb Rule</b>: “The way you do anything is the way you do
            everything.” Today there are ten.
          </p>
          <p className="muted" style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
            Source: walkover.in as archived by the Internet Archive, 2019.
          </p>
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", marginTop: "2rem", alignItems: "center" }}>
            <Link href="/freedom/" className="btn btn-paper">
              Freedom, and what it costs
            </Link>
            <Link href="/careers/" className="pen-link">
              Work with us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
