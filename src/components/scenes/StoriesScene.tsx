import type { CSSProperties, ReactNode } from "react";
import { Walker, type Expression } from "@/components/characters/Walker";
import { cast, type CastName } from "@/components/characters/cast";
import styles from "./StoriesScene.module.scss";

/**
 * Stories: "Five Walkers, one idea".
 * Five different people walk up to an easel, talk it through (each in their
 * own way), and each pins a note. The notes get connected, and the sheet
 * turns into the five-pip face of the red Walkover die.
 */

interface Actor {
  who: CastName;
  facing: "left" | "right";
  /** left position in cqw: desktop, mobile */
  x: [number, number];
  enterFrom: number;
  delay: number;
  bubble: ReactNode;
  bubbleAt: number;
  /** Which pip their note becomes (centre in cqw: desktop [x,y], mobile [x,y]) */
  pip: { d: [number, number]; m: [number, number]; at: number };
  expressions: Expression[];
  label: string;
}

const PIP_D = { l: 44.5, c: 50, r: 55.5, t: 13.5, m: 19, b: 24.5 };
const PIP_M = { l: 32, c: 50, r: 68, t: 26, m: 44, b: 62 };

const actors: Actor[] = [
  {
    who: "tinkerer",
    facing: "right",
    x: [3, 1],
    enterFrom: -30,
    delay: 0.3,
    bubble: <path d="M30 14 l4 6 l7 -1 l1 7 l6 3 l-3 6 l3 6 l-6 3 l-1 7 l-7 -1 l-4 6 l-4 -6 l-7 1 l-1 -7 l-6 -3 l3 -6 l-3 -6 l6 -3 l1 -7 l7 1 Z M30 28 a6 6 0 1 0 0.1 0" />,
    bubbleAt: 3.0,
    pip: { d: [PIP_D.r, PIP_D.b], m: [PIP_M.r, PIP_M.b], at: 5.6 },
    expressions: ["smile", "grin"],
    label: "the Tinkerer, who builds",
  },
  {
    who: "scribbler",
    facing: "right",
    x: [15, 20],
    enterFrom: -30,
    delay: 0.15,
    bubble: <path d="M30 12 C 42 12, 46 22, 43 30 C 41 34, 38 35, 37 41 H 23 C 22 35, 19 34, 17 30 C 14 22, 18 12, 30 12 Z M24 45 H36 M25 49 H35" />,
    bubbleAt: 2.2,
    pip: { d: [PIP_D.l, PIP_D.t], m: [PIP_M.l, PIP_M.t], at: 4.4 },
    expressions: ["smile", "grin"],
    label: "the Scribbler, who writes it down",
  },
  {
    who: "listener",
    facing: "right",
    x: [27, 39],
    enterFrom: -34,
    delay: 0,
    bubble: (
      <text x="30" y="36" textAnchor="middle" fontSize="16">
        hmm…
      </text>
    ),
    bubbleAt: 3.4,
    pip: { d: [PIP_D.l, PIP_D.b], m: [PIP_M.l, PIP_M.b], at: 5.2 },
    expressions: ["calm", "wow", "grin"],
    label: "the Listener, who notices",
  },
  {
    who: "connector",
    facing: "left",
    x: [63, 59],
    enterFrom: 40,
    delay: 0.1,
    bubble: <path d="M14 30 H 44 M 36 22 L 44 30 L 36 38 M 18 20 C 22 14, 30 14, 34 18" />,
    bubbleAt: 2.6,
    pip: { d: [PIP_D.r, PIP_D.t], m: [PIP_M.r, PIP_M.t], at: 4.8 },
    expressions: ["smile", "grin"],
    label: "the Connector, who links it up",
  },
  {
    who: "asker",
    facing: "left",
    x: [76, 79],
    enterFrom: 40,
    delay: 0.25,
    bubble: (
      <text x="30" y="42" textAnchor="middle" fontSize="30" fontWeight="700">
        ?
      </text>
    ),
    bubbleAt: 1.8,
    pip: { d: [PIP_D.c, PIP_D.m], m: [PIP_M.c, PIP_M.m], at: 6.0 },
    expressions: ["think", "wow", "grin"],
    label: "the Asker, who asks why",
  },
];

export function StoriesScene() {
  return (
    <figure className={`scene ${styles.scene}`} data-scene>
      <div className={styles.stage}>
        <svg className={styles.floor} viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 22 C 160 17, 330 25, 500 20 S 820 15, 1000 21" />
        </svg>

        {/* Easel + sheet that becomes the die face */}
        <div className={styles.easel} aria-hidden="true">
          <svg viewBox="0 0 100 100" className={styles.legs} preserveAspectRatio="none">
            <path d="M30 0 L 12 100 M 70 0 L 88 100 M 50 0 L 50 100" />
          </svg>
          <svg viewBox="0 0 100 100" className={styles.sheet}>
            <path className={styles.sheetFill} d="M10 4 H 90 C 95 4, 96 6, 96 10 V 90 C 96 95, 94 96, 90 96 H 10 C 5 96, 4 94, 4 90 V 10 C 4 5, 6 4, 10 4 Z" />
            <path className={styles.sheetLine} pathLength={1} d="M10 4 C 40 3, 70 5, 90 4 C 95 4, 96 6, 96 10 C 97 40, 95 70, 96 90 C 96 95, 94 96, 90 96 C 60 97, 30 95, 10 96 C 5 96, 4 94, 4 90 C 3 60, 5 30, 4 10 C 4 5, 6 4, 11 4" />
            <g className={styles.links}>
              <path pathLength={1} d="M25 25 L 50 50 L 75 75" />
              <path pathLength={1} d="M75 25 L 50 50 L 25 75" />
            </g>
          </svg>
          <svg viewBox="0 0 100 100" className={styles.sparks}>
            <path d="M-6 10 l-8 -6 M-8 30 l-10 0 M106 12 l8 -6 M108 32 l10 0 M50 -6 l0 -9" />
          </svg>
        </div>

        {actors.map((a, i) => (
          <div
            key={a.who}
            className={styles.actor}
            data-who={a.who}
            style={
              {
                "--xd": `${a.x[0]}cqw`,
                "--xm": `${a.x[1]}cqw`,
                "--from": `${a.enterFrom}cqw`,
                "--delay": `${a.delay}s`,
                "--say": `${a.bubbleAt}s`,
                "--throw": `${a.pip.at - 0.15}s`,
                "--n": i,
              } as CSSProperties
            }
          >
            <svg className={styles.bubble} viewBox="0 0 60 64" aria-hidden="true" data-side={a.facing}>
              <path className={styles.bubbleShape} d="M8 4 H 52 C 57 4, 58 6, 58 10 V 46 C 58 51, 56 52, 52 52 H 30 L 18 62 L 20 52 H 8 C 3 52, 2 50, 2 46 V 10 C 2 5, 4 4, 8 4 Z" />
              <g className={styles.bubbleInk}>{a.bubble}</g>
            </svg>
            <Walker look={cast[a.who]} facing={a.facing} expressions={a.expressions} />
          </div>
        ))}

        {/* Notes travel from each hand to a pip, then turn into pips */}
        {actors.map((a) => (
          <span
            key={`note-${a.who}`}
            className={styles.note}
            aria-hidden="true"
            style={
              {
                "--fxd": `${a.x[0] + 5}cqw`,
                "--fxm": `${a.x[1] + 9}cqw`,
                "--txd": `${a.pip.d[0]}cqw`,
                "--tyd": `${a.pip.d[1]}cqw`,
                "--txm": `${a.pip.m[0]}cqw`,
                "--tym": `${a.pip.m[1]}cqw`,
                "--at": `${a.pip.at}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <figcaption className={styles.caption}>
        <span className="concept-note">✎ illustration, not a real meeting</span>
        <span className="sr-only">
          Five illustrated characters, {actors.map((a) => a.label).join(", ")}, gather around an easel. Each adds a note;
          the notes are connected and the sheet becomes the five-pip face of the red Walkover die.
        </span>
      </figcaption>
    </figure>
  );
}
