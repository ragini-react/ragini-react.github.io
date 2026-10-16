import type { CSSProperties } from "react";
import { Walker } from "@/components/characters/Walker";
import { cast } from "@/components/characters/cast";
import { Folder } from "@/components/characters/props";
import styles from "./CareersScene.module.scss";

interface Props {
  /** Real, current role titles (from the Keka feed). */
  roles: string[];
  /** Where applications really go. */
  applyHref: string;
}

/**
 * Careers: "Looking for the next door".
 * The Seeker walks in with a portfolio, scans a board of real open roles,
 * notices one, holds the portfolio up, then heads for the door, which opens
 * onto the real application portal.
 */
export function CareersScene({ roles, applyHref }: Props) {
  const shown = roles.slice(0, 6);
  const noticed = Math.min(1, shown.length - 1);
  return (
    <figure className={`scene ${styles.scene}`} data-scene>
      <div className={styles.stage}>
        <svg className={styles.floor} viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 20 C 150 24, 320 16, 500 21 S 840 25, 1000 19" />
        </svg>

        <div className={styles.board} aria-hidden="true">
          <span className={styles.boardTitle}>we’re looking for…</span>
          <ul>
            {shown.map((role, i) => (
              <li key={role} className={styles.role} data-noticed={i === noticed || undefined} style={{ "--i": i } as CSSProperties}>
                <span className={styles.pin} />
                {role}
                {i === noticed && (
                  <svg className={styles.ring} viewBox="0 0 120 60" preserveAspectRatio="none">
                    <path d="M92 6 C 60 -2, 8 4, 4 28 C 0 52, 60 60, 96 54 C 124 48, 122 14, 88 8 C 80 6, 70 6, 62 7" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>

        <a className={styles.door} href={applyHref} target="_blank" rel="noopener">
          <span className={styles.sign}>apply here</span>
          <span className={styles.frame}>
            <span className={styles.light} aria-hidden="true" />
            <span className={styles.panel} aria-hidden="true">
              <span className={styles.knob} />
            </span>
          </span>
          <span className="sr-only">See every open role and apply on Walkover’s careers portal (opens in a new tab)</span>
        </a>

        <div className={styles.actor}>
          <Walker look={cast.seeker} expressions={["calm", "think", "wow", "grin"]} leftHand={<Folder label="CV" />} />
        </div>
      </div>
      <figcaption className="sr-only">
        Illustration: someone carrying a CV walks up to a board listing Walkover’s open roles, circles one, then walks to
        a door marked “apply here”, which opens.
      </figcaption>
    </figure>
  );
}
