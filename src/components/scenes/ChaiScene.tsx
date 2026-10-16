import { Walker } from "@/components/characters/Walker";
import { cast } from "@/components/characters/cast";
import styles from "./ChaiScene.module.scss";

const Glass = () => (
  <g data-part="prop-chai">
    <path d="M-7 -16 L 7 -16 L 5 2 L -5 2 Z" fill="oklch(68.59% 0.1112 65.33)" stroke="var(--char-line)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M-6.4 -12 H 6.4" stroke="oklch(100% 0 0)" strokeWidth="1.5" opacity="0.6" />
  </g>
);

/**
 * Life: "Chai break". One Walker tells a story with their hands, the other two
 * laugh, chai steams. A quiet loop that only runs while it is on screen.
 */
export function ChaiScene() {
  return (
    <figure className={`scene ${styles.scene}`} data-scene>
      <div className={styles.stage} aria-hidden="true">
        <svg className={styles.floor} viewBox="0 0 1000 40" preserveAspectRatio="none">
          <path d="M0 22 C 220 17, 420 25, 600 20 S 880 18, 1000 21" />
        </svg>
        <div className={`${styles.actor} ${styles.teller}`}>
          <Walker look={cast.tinkerer} expressions={["grin"]} />
        </div>
        <div className={`${styles.actor} ${styles.laugh1}`}>
          <Walker look={cast.scribbler} expressions={["grin"]} leftHand={<Glass />} facing="left" />
        </div>
        <div className={`${styles.actor} ${styles.laugh2}`}>
          <Walker look={cast.asker} expressions={["grin"]} rightHand={<Glass />} facing="left" />
        </div>
        <svg className={styles.table} viewBox="0 0 200 120">
          <path className={styles.top} d="M10 30 C 60 24, 140 24, 190 30 L 186 42 C 140 36, 60 36, 14 42 Z" />
          <path className={styles.leg} d="M100 40 V 116 M70 116 H 130" />
          <g className={styles.glass}>
            <path d="M84 4 L 98 4 L 96 26 L 86 26 Z" />
          </g>
          <path className={styles.steam} d="M90 0 C 84 -8, 96 -14, 90 -24 C 84 -32, 96 -38, 90 -46" />
          <path className={`${styles.steam} ${styles.steam2}`} d="M96 0 C 90 -8, 102 -14, 96 -24 C 90 -32, 102 -38, 96 -46" />
        </svg>
        <svg className={styles.bubble} viewBox="0 0 120 80">
          <path d="M10 6 H 110 C 116 6, 116 8, 116 14 V 54 C 116 60, 114 62, 110 62 H 34 L 18 76 L 22 62 H 10 C 4 62, 4 60, 4 54 V 14 C 4 8, 4 6, 10 6 Z" />
          <path className={styles.mtn} d="M16 52 L 36 26 L 50 42 L 64 20 L 92 52 Z M70 18 a6 6 0 1 0 0.1 0" />
        </svg>
        <svg className={styles.ha} viewBox="0 0 80 40">
          <text x="4" y="26">ha!</text>
          <text x="40" y="18">ha</text>
        </svg>
      </div>
      <figcaption className="sr-only">
        Illustration: three colleagues share chai around a small table; one tells a story about the mountains while the
        others laugh.
      </figcaption>
    </figure>
  );
}
