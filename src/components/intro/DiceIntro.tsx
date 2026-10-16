"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WalkoverMark } from "@/components/ui/WalkoverLogo";
import styles from "./DiceIntro.module.scss";

/**
 * Opening brand moment for the homepage: the original Walkover die rolls onto
 * the sketchbook, "Walkover" is written underneath and then replaced by
 * "We Just Started.", and the homepage opens through the die.
 *
 * It plays once per browser session (see INTRO_KEY in the root layout's inline
 * script), can be skipped with the button or Escape, never blocks crawlers or
 * no-JS visitors, and stays still with reduced motion. It is not connected to
 * scrolling or navigation in any way.
 */

export const INTRO_KEY = "wk-intro-seen";

type Phase = "sketch" | "roll" | "title" | "open" | "fade" | "done";

const LINES = [
  { id: "name", words: [{ w: "Walkover", accent: true }] },
  { id: "started", words: [{ w: "We" }, { w: "Just" }, { w: "Started.", accent: true, underline: true }] },
] as const;

/**
 * The die's roll is pure CSS and starts at first paint (200ms delay, 1.3s long).
 * Timers below are measured from that same moment, so text lands on the beat
 * however long the page's JavaScript took to load.
 */
const TITLE_AT = 800;
/** Time each line stays on screen before the next one replaces it. */
const LINE_STEP = 1050;
/** From the first line appearing to the page opening (last line holds a beat longer). */
const TITLE_HOLD = LINE_STEP * (LINES.length - 1) + 1100;
const OPEN_DURATION = 700;

export default function DiceIntro() {
  const [phase, setPhase] = useState<Phase | null>(null);
  const [still, setStill] = useState(false);
  const [line, setLine] = useState(0);
  const [hole, setHole] = useState<{ x: number; y: number } | null>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);
  const finished = useRef(false);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    timers.current.forEach(clearTimeout);
    document.documentElement.removeAttribute("data-intro");
    document.querySelectorAll("[data-intro-inert]").forEach((el) => el.removeAttribute("inert"));
    setPhase("done");
  }, []);

  /** Open the homepage through the die. */
  const open = useCallback(() => {
    if (finished.current) return;
    const r = markRef.current?.getBoundingClientRect();
    setHole(r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: window.innerWidth / 2, y: window.innerHeight * 0.36 });
    setPhase("open");
    later(finish, OPEN_DURATION + 60);
  }, [finish]);

  /** Skip: a quick fade instead of the full reveal. */
  const skip = useCallback(() => {
    if (finished.current) return;
    timers.current.forEach(clearTimeout);
    setPhase("fade");
    later(finish, 320);
  }, [finish]);

  useEffect(() => {
    const html = document.documentElement;
    // No intro this visit: the overlay stays display:none via CSS.
    if (!html.hasAttribute("data-intro")) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };

    const start = () => {
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        /* private mode: the intro may replay, which is harmless */
      }

      // Keep the page beneath out of the tab order while the intro covers it.
      document.querySelectorAll("[data-intro-inert]").forEach((el) => el.setAttribute("inert", ""));
      skipRef.current?.focus({ preventScroll: true });
      window.addEventListener("keydown", onKey);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setStill(reduced);
      setPhase("sketch");

      const showTitle = (end: () => void) => {
        setPhase("title");
        for (let i = 1; i < LINES.length; i++) later(() => setLine(i), LINE_STEP * i);
        later(end, TITLE_HOLD);
      };

      if (reduced) {
        showTitle(skip);
      } else {
        // How far the CSS roll has already got while the page script loaded.
        const roll = markRef.current
          ?.getAnimations({ subtree: true })
          .find((an) => an instanceof CSSAnimation && an.animationName.includes("die-bounce"));
        const elapsed = Number(roll?.currentTime ?? 0);
        setPhase("roll");
        later(() => showTitle(open), Math.max(0, TITLE_AT - elapsed));
      }
    };
    // Begin on the next frame; the CSS cover is already on screen.
    const raf = requestAnimationFrame(start);

    const pending = timers.current;
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      pending.forEach(clearTimeout);
    };
  }, [open, skip]);

  if (phase === "done") return null;

  const titleOn = phase === "title" || phase === "open" || phase === "fade";

  return (
    <div
      className={styles.intro}
      data-phase={phase ?? "pending"}
      role="dialog"
      aria-modal="true"
      aria-label="Walkover introduction"
      style={hole ? ({ "--hx": `${hole.x}px`, "--hy": `${hole.y}px` } as React.CSSProperties) : undefined}
    >
      <div className={styles.sheet}>
        <svg className={styles.margin} aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M8 0 C 8.3 30, 7.8 60, 8.1 100" />
        </svg>

        {/* Pencil annotation drawn while the die is on its way */}
        <svg className={styles.scribble} aria-hidden="true" viewBox="0 0 260 120">
          <path className={styles.scribblePath} d="M18 92 C 60 30, 130 18, 214 46" pathLength={1} />
          <path className={styles.scribblePath} d="M196 30 L 216 47 L 192 58" pathLength={1} />
          <text x="18" y="114" className={styles.scribbleText}>
            roll it…
          </text>
        </svg>

        {/* The original Walkover die: no background, so it reads the same day and night */}
        <div
          ref={markRef}
          className={styles.dieStage}
          data-still={still || undefined}
          aria-hidden="true"
        >
          <div className={styles.dieShadow} />
          <div className={styles.dieBounce}>
            <WalkoverMark className={styles.die} />
          </div>
        </div>

        <div className={styles.titleBlock} data-on={titleOn || undefined}>
          <p className={styles.lines}>
            <span className="sr-only">Walkover. We Just Started.</span>
            {LINES.map((l, i) => (
              <span
                key={l.id}
                className={styles.line}
                data-state={i === line ? "on" : i < line ? "past" : "next"}
                aria-hidden="true"
              >
                {l.words.map((word, j) => (
                  <span
                    key={j}
                    className={"accent" in word ? styles.accent : undefined}
                    style={{ "--i": j } as React.CSSProperties}
                  >
                    {word.w}
                    {"underline" in word && (
                      <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M4 15 C 70 6, 150 20, 230 9 S 290 12, 296 8" />
                      </svg>
                    )}
                  </span>
                ))}
              </span>
            ))}
          </p>
        </div>
      </div>

      <button ref={skipRef} type="button" className={styles.skip} onClick={skip}>
        Skip intro <kbd>Esc</kbd>
      </button>
    </div>
  );
}
