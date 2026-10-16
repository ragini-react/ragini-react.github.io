"use client";

import { useState } from "react";
import styles from "./VideoFacade.module.scss";

/**
 * Click-to-load YouTube. Nothing is requested from YouTube until the visitor
 * presses play; then the privacy-enhanced (no-cookie) player loads.
 */
export function VideoFacade({ id, title, duration }: { id: string; title: string; duration?: string }) {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <div className={styles.frame}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <button type="button" className={styles.facade} onClick={() => setOn(true)}>
      <span className={styles.screen} aria-hidden="true">
        <svg viewBox="0 0 160 90">
          <path className={styles.scribble} d="M14 70 C 30 20, 60 80, 80 40 S 130 20, 146 60" />
          <circle cx="80" cy="45" r="20" className={styles.playBg} />
          <path d="M74 35 L 90 45 L 74 55 Z" className={styles.play} />
        </svg>
      </span>
      <span className={styles.label}>
        <b>Play “{title}”</b>
        {duration && <span> · {duration}</span>}
        <small>Loads the video from YouTube when you press play.</small>
      </span>
    </button>
  );
}
