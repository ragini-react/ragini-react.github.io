import { Walker } from "@/components/characters/Walker";
import { cast } from "@/components/characters/cast";
import styles from "./TelescopeScene.module.scss";

/** Future: the Asker at a telescope; a few labelled stars come into focus. */
export function TelescopeScene() {
  const stars: Array<[number, number, string]> = [
    [62, 14, "live"],
    [80, 32, "beta"],
    [48, 6, "announced"],
    [90, 8, ""],
    [70, 46, ""],
  ];
  return (
    <figure className={`scene ${styles.scene}`} data-scene aria-hidden="true">
      <div className={styles.stage}>
        {stars.map(([x, y, label], i) => (
          <span key={i} className={styles.star} style={{ left: `${x}%`, top: `${y}%`, "--i": i } as React.CSSProperties}>
            <svg viewBox="0 0 20 20">
              <path d="M10 1 L 12.4 7.6 L 19 10 L 12.4 12.4 L 10 19 L 7.6 12.4 L 1 10 L 7.6 7.6 Z" />
            </svg>
            {label && <em>{label}</em>}
          </span>
        ))}
        <svg className={styles.scope} viewBox="0 0 200 200">
          <g className={styles.tube}>
            <rect x="60" y="60" width="110" height="26" rx="6" transform="rotate(-28 115 73)" />
            <rect x="158" y="40" width="20" height="34" rx="4" transform="rotate(-28 168 57)" />
          </g>
          <path className={styles.legs} d="M100 96 L 70 190 M100 96 L 130 190 M100 96 V 190" />
        </svg>
        <div className={styles.actor}>
          <Walker look={cast.asker} expressions={["wow"]} />
        </div>
      </div>
    </figure>
  );
}
