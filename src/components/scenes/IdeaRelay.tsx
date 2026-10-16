import type { CSSProperties } from "react";
import { Walker, type Expression } from "@/components/characters/Walker";
import { cast, type CastName } from "@/components/characters/cast";
import { Pencil, Wrench } from "@/components/characters/props";
import styles from "./IdeaRelay.module.scss";

/**
 * Ideas & Freedom: "The idea relay".
 * A rough scribble is shared, questioned, connected and built, passing hand
 * to hand. The drawing changes at every stop, and ends as a v1 that becomes v2.
 */

const stations: Array<{
  who: CastName;
  verb: string;
  line: string;
  at: number;
  expressions: Expression[];
  hand?: React.ReactNode;
}> = [
  { who: "scribbler", verb: "Share it", line: "Say the half-formed thing out loud.", at: 0.2, expressions: ["grin", "smile"], hand: <Pencil /> },
  { who: "asker", verb: "Question it", line: "Poke holes. Kindly, but properly.", at: 1.9, expressions: ["calm", "think"] },
  { who: "connector", verb: "Connect it", line: "Link it to what already exists.", at: 3.7, expressions: ["calm", "wow"] },
  { who: "tinkerer", verb: "Build it", line: "Make a version. Then the next one.", at: 5.5, expressions: ["calm", "focus", "grin"], hand: <Wrench /> },
];

export function IdeaRelay() {
  return (
    <figure className={`scene ${styles.scene}`} data-scene>
      <div className={styles.stage} aria-hidden="true">
        <svg className={styles.floor} viewBox="0 0 1000 40" preserveAspectRatio="none">
          <path d="M0 20 C 200 16, 380 24, 560 19 S 860 16, 1000 21" />
        </svg>
        <svg className={`${styles.floor} ${styles.floor2}`} viewBox="0 0 1000 40" preserveAspectRatio="none">
          <path d="M0 21 C 180 17, 400 24, 600 19 S 880 17, 1000 20" />
        </svg>

        {/* Hand-drawn hand-off arrows */}
        {[0, 1, 2].map((i) => (
          <svg key={i} className={styles.arrow} data-n={i} viewBox="0 0 100 40">
            <path pathLength={1} d="M6 30 C 30 4, 64 4, 92 24" />
            <path pathLength={1} d="M80 14 L 93 25 L 77 28" />
          </svg>
        ))}

        {stations.map((s, i) => (
          <div key={s.who} className={styles.actor} data-n={i} style={{ "--at": `${s.at}s` } as CSSProperties}>
            <Walker look={cast[s.who]} expressions={s.expressions} leftHand={s.hand} facing={i === 3 ? "left" : "right"} />
          </div>
        ))}

        {/* The idea itself, changing at every stop */}
        <div className={styles.idea}>
          <svg viewBox="0 0 160 120">
            <g className={styles.v0}>
              <path d="M40 60 C 30 30, 90 20, 100 50 C 110 80, 50 90, 60 60 C 66 40, 120 44, 110 70 C 100 92, 40 80, 52 52" />
            </g>
            <g className={styles.v1}>
              <path d="M40 60 C 30 30, 90 20, 100 50 C 110 80, 50 90, 60 60 C 66 40, 120 44, 110 70" />
              <text x="118" y="34">?</text>
              <text x="22" y="98">?</text>
              <path className={styles.cross} d="M58 70 L 84 86" />
            </g>
            <g className={styles.v2}>
              <rect x="34" y="34" width="56" height="40" rx="6" />
              <path d="M44 48 H 80 M44 58 H 70" />
              <path className={styles.link} d="M90 54 C 108 54, 110 40, 124 40" />
              <rect className={styles.side} x="124" y="28" width="26" height="22" rx="3" />
            </g>
            <g className={styles.v3}>
              <rect className={styles.box} x="30" y="22" width="100" height="76" rx="10" />
              <rect className={styles.screen} x="40" y="32" width="80" height="44" rx="4" />
              <path d="M50 46 H 96 M50 56 H 84 M50 66 H 90" />
              <text className={styles.ver} x="104" y="92">v1</text>
              <text className={styles.ver2} x="104" y="92">v2</text>
            </g>
          </svg>
        </div>
      </div>

      <ol className={styles.steps}>
        {stations.map((s, i) => (
          <li key={s.who} style={{ "--n": i } as CSSProperties}>
            <span className={styles.stepVerb}>{s.verb}</span>
            <span className={styles.stepLine}>{s.line}</span>
          </li>
        ))}
      </ol>
      <figcaption className="sr-only">
        Illustration of an idea passed between four people: one shares a rough scribble, the next adds questions, the next
        connects it to something that exists, and the last builds it into a first version, then a second.
      </figcaption>
    </figure>
  );
}
