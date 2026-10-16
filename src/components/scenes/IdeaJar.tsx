import styles from "./IdeaJar.module.scss";

const notes = [
  { c: "oklch(89.16% 0.1569 92.99)", t: "what if…", x: 30, r: -12 },
  { c: "oklch(89.9% 0.0541 241.63)", t: "for us first", x: 62, r: 8 },
  { c: "oklch(89.89% 0.0526 25.42)", t: "v1 → v2", x: 40, r: 4 },
  { c: "oklch(93.15% 0.0609 134.06)", t: "ask why", x: 70, r: -6 },
  { c: "oklch(89.16% 0.1569 92.99)", t: "ship it?", x: 48, r: 10 },
  { c: "oklch(90.75% 0.0531 300.94)", t: "connect", x: 26, r: -3 },
];

/** Ideas: notes drop into a jar one by one; the lid lifts for the next. */
export function IdeaJar() {
  return (
    <figure className={`scene ${styles.scene}`} data-scene aria-hidden="true">
      <svg viewBox="0 0 160 200" className={styles.svg}>
        <g className={styles.lid}>
          <rect x="34" y="18" width="92" height="16" rx="5" />
        </g>
        <path className={styles.jar} d="M42 36 H 118 V 44 C 132 50, 136 64, 136 80 V 178 C 136 188, 128 194, 118 194 H 42 C 32 194, 24 188, 24 178 V 80 C 24 64, 28 50, 42 44 Z" />
        <path className={styles.shine} d="M36 86 V 168" />
        <g className={styles.label}>
          <rect x="52" y="104" width="56" height="26" rx="3" />
          <text x="80" y="122" textAnchor="middle">
            ideas
          </text>
        </g>
        {notes.map((n, i) => (
          <g key={i} className={styles.note} style={{ "--i": i, "--x": `${n.x + 28}px`, "--r": `${n.r}deg`, "--y": `${170 - Math.floor(i / 2) * 22 - (i % 2) * 8}px` } as React.CSSProperties}>
            <rect x="-14" y="-12" width="28" height="24" fill={n.c} />
            <text x="0" y="3" textAnchor="middle">
              {n.t}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
