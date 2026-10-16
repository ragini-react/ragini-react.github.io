"use client";

import { useId, useState } from "react";
import type { Value } from "@/content/company";
import styles from "./ValuesBox.module.scss";

type Lang = "en" | "hi" | "both";

// One small doodle per value, drawn for this page.
const doodles = [
  "M30 6 a24 24 0 1 0 0.1 0 M30 16 a14 14 0 1 0 0.1 0 M30 26 a4 4 0 1 0 0.1 0", // target
  "M6 50 C 18 50, 20 20, 34 14 M28 10 L 36 13 L 33 21 M40 50 H 54", // leap
  "M12 46 L 34 24 M30 14 L 44 28 L 50 22 L 36 8 Z", // hammer
  "M16 54 V 8 M44 54 V 8 M16 18 H 44 M16 30 H 44 M16 42 H 44", // ladder
  "M30 8 a22 22 0 1 0 0.1 0 M30 16 V 30 L 40 36", // clock
  "M40 10 C 24 12, 18 32, 30 44 C 38 52, 50 48, 54 40 C 40 44, 30 30, 40 10 Z", // moon
  "M10 50 L 22 14 L 36 40 L 50 10 M8 30 H 52", // plan then execute zigzag
  "M8 52 H 20 V 40 H 32 V 28 H 44 V 16 H 56", // stairs
  "M30 6 L 36 22 L 54 22 L 40 33 L 45 50 L 30 40 L 15 50 L 20 33 L 6 22 L 24 22 Z", // star
  "M8 14 H 30 V 36 H 8 Z M26 26 H 48 V 48 H 26 Z", // copy
];

export function ValuesBox({ values }: { values: Value[] }) {
  const [lang, setLang] = useState<Lang>("both");
  const id = useId();
  return (
    <div className={styles.box}>
      <fieldset className={styles.switch}>
        <legend className="sr-only">Show values in</legend>
        {(
          [
            ["en", "English"],
            ["hi", "हिन्दी"],
            ["both", "Both"],
          ] as Array<[Lang, string]>
        ).map(([v, label]) => (
          <label key={v} className={styles.option}>
            <input type="radio" name={`${id}-lang`} value={v} checked={lang === v} onChange={() => setLang(v)} />
            <span lang={v === "hi" ? "hi" : undefined}>{label}</span>
          </label>
        ))}
      </fieldset>

      <ol className={styles.cards} data-lang={lang}>
        {values.map((v, i) => (
          <li key={v.n} className={styles.card} data-reveal="drop" style={{ "--d": i % 3 } as React.CSSProperties}>
            <span className={styles.no} aria-hidden="true">
              {String(v.n).padStart(2, "0")}
            </span>
            <svg className={styles.doodle} viewBox="0 0 60 60" aria-hidden="true">
              <path d={doodles[i]} />
            </svg>
            <h3 className={styles.title}>{v.title}</h3>
            <p className={styles.en}>{v.body}</p>
            <p className={styles.hi} lang="hi">
              {v.hindi}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
