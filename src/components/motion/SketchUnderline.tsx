import styles from "./SketchUnderline.module.scss";

/** A hand-drawn underline that draws itself when its section is revealed. */
export function SketchUnderline({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span data-draw className={styles.wrap} style={color ? ({ "--u": color } as React.CSSProperties) : undefined}>
      {children}
      <svg className={styles.svg} viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true">
        <path className="draw-long" d="M3 10 C 40 4, 90 13, 140 7 S 190 9, 197 6" />
      </svg>
    </span>
  );
}

/** A loose hand-drawn circle around a word. */
export function SketchCircle({ children }: { children: React.ReactNode }) {
  return (
    <span data-draw className={styles.circleWrap}>
      {children}
      <svg className={styles.circle} viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true">
        <path className="draw-long" d="M150 10 C 100 -2, 20 4, 8 34 C -2 62, 60 76, 120 72 C 180 68, 204 46, 190 24 C 180 10, 150 6, 120 8" />
      </svg>
    </span>
  );
}
