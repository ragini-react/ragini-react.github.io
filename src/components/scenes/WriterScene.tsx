import Link from "next/link";
import { Walker } from "@/components/characters/Walker";
import { cast } from "@/components/characters/cast";
import styles from "./WriterScene.module.scss";

interface Props {
  /** The real article the finished page turns into. */
  article: { title: string; href: string; meta: string };
}

/**
 * Blog story: "From idea to article".
 * The Scribbler walks in, stops, thinks (thought bubbles with doodles and a
 * crossed-out first try), lights up, sits at the laptop and types. The page
 * leaves the laptop and pins itself to the wall as a real, clickable article.
 */
export function WriterScene({ article }: Props) {
  return (
    <figure className={`scene ${styles.scene}`} data-scene>
      <div className={styles.stage}>
        <svg className={styles.floor} viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 20 C 120 16, 260 24, 400 19 S 700 15, 820 21 S 960 22, 1000 18" />
        </svg>

        {/* Thought bubble with the idea forming */}
        <svg className={styles.thought} viewBox="0 0 320 220" aria-hidden="true">
          <circle className={styles.dot1} cx="40" cy="206" r="6" />
          <circle className={styles.dot2} cx="62" cy="186" r="10" />
          <path
            className={styles.cloud}
            d="M86 150 C 50 150, 44 108, 78 100 C 70 62, 116 44, 140 66 C 154 30, 216 30, 228 64 C 266 52, 300 84, 282 112 C 312 128, 292 168, 258 160 C 246 186, 196 190, 184 166 C 162 188, 112 184, 104 160 C 96 162, 90 158, 86 150 Z"
          />
          {/* first idea, crossed out */}
          <text className={styles.try1} x="100" y="100">
            dull title
          </text>
          <path className={styles.cross} d="M96 92 L 196 98" pathLength={1} />
          {/* doodles: arrow, spiral, question */}
          <path className={styles.doodle} d="M108 128 C 128 116, 150 140, 172 124" pathLength={1} />
          <path className={styles.doodle} d="M164 118 L 174 124 L 164 132" pathLength={1} />
          <path className={styles.doodle} d="M220 96 C 210 86, 236 80, 236 96 C 236 112, 206 112, 208 92 C 210 72, 252 72, 250 100" pathLength={1} />
          {/* the good one, circled */}
          <text className={styles.good} x="186" y="146">
            this!
          </text>
          <path className={styles.circle} d="M226 128 C 210 122, 180 126, 180 140 C 180 156, 236 158, 242 142 C 246 130, 230 124, 214 126" pathLength={1} />
        </svg>

        {/* Bulb that lights on the eureka beat */}
        <svg className={styles.bulb} viewBox="0 0 60 80" aria-hidden="true">
          <g className={styles.rays}>
            <path d="M30 2 V 10 M8 12 L 14 18 M52 12 L 46 18 M0 34 H 8 M52 34 H 60" />
          </g>
          <path className={styles.glass} d="M30 14 C 44 14, 50 26, 46 36 C 44 40, 40 42, 39 50 H21 C 20 42, 16 40, 14 36 C 10 26, 16 14, 30 14 Z" />
          <path className={styles.base} d="M22 54 H38 M23 59 H37 M26 64 H34" />
        </svg>

        {/* Desk, chair and laptop */}
        <svg className={styles.desk} viewBox="0 0 360 240" aria-hidden="true">
          <path className={styles.ink} d="M120 236 L 132 150 M196 236 L 186 150" />
          <path className={styles.chair} d="M96 150 C 96 132, 104 126, 112 126 L 200 126 C 208 126, 212 134, 208 150 Z" />
          <path className={styles.ink} d="M118 150 L 112 60 C 112 52, 120 50, 126 54" />
          <path className={styles.top} d="M170 120 L 356 116 L 356 132 L 168 136 Z" />
          <path className={styles.ink} d="M184 134 L 180 236 M340 132 L 346 236" />
          <g className={styles.laptop}>
            <path className={styles.lid} d="M232 116 L 220 50 L 318 46 L 322 114 Z" />
            <path className={styles.screen} d="M236 106 L 228 58 L 310 55 L 313 104 Z" />
            <g className={styles.lines}>
              <path d="M240 68 H 290" pathLength={1} />
              <path d="M241 78 H 302" pathLength={1} />
              <path d="M242 88 H 280" pathLength={1} />
              <path d="M243 97 H 296" pathLength={1} />
            </g>
            <path className={styles.keys} d="M206 118 L 330 114 L 338 122 L 200 126 Z" />
          </g>
          <g className={styles.mug}>
            <path className={styles.paperFill} d="M330 98 H 348 V 114 C 348 118, 330 118, 330 114 Z" />
            <path className={styles.ink} d="M348 102 C 356 102, 356 110, 348 110" />
          </g>
        </svg>

        <div className={styles.actor}>
          <Walker look={cast.scribbler} expressions={["smile", "think", "wow", "focus"]} />
        </div>

        {/* The finished page: flies out of the laptop and becomes a real card */}
        <Link href={article.href} className={styles.page}>
          <span className="tape" style={{ left: "38%", top: "-0.8rem", rotate: "3deg" }} />
          <span className={styles.pageKicker}>Fresh from the journal</span>
          <span className={styles.pageTitle}>{article.title}</span>
          <span className={styles.pageMeta}>{article.meta}</span>
          <span className={styles.pageCta}>Read it →</span>
        </Link>
      </div>
      <figcaption className="sr-only">
        Illustration: a writer walks in, thinks through a few ideas, crosses one out, settles on the right one, sits at a
        laptop and writes. The finished page becomes a link to the article “{article.title}”.
      </figcaption>
    </figure>
  );
}
