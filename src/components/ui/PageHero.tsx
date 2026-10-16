import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import type { Crumb } from "@/lib/schema";
import styles from "./PageHero.module.scss";

/**
 * The opening of an inner page. Layout is shared so pages feel like one
 * sketchbook; the `art` slot is where each page's own story lives.
 */
export function PageHero({
  trail,
  eyebrow,
  title,
  lede,
  art,
  children,
  tone = "paper",
}: {
  trail: Crumb[];
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  art?: ReactNode;
  children?: ReactNode;
  tone?: "paper" | "sheet" | "grid";
}) {
  return (
    <header className={`${styles.hero} ${tone === "sheet" ? "sheet" : ""} ${tone === "grid" ? "grid-paper" : ""}`}>
      <div className={`wrap ${styles.grid}`} data-has-art={art ? "" : undefined}>
        <div className={styles.text}>
          <Breadcrumbs trail={trail} />
          <p className="eyebrow">{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          {lede && <div className={`lede ${styles.lede}`}>{lede}</div>}
          {children}
        </div>
        {art && <div className={styles.art}>{art}</div>}
      </div>
    </header>
  );
}
