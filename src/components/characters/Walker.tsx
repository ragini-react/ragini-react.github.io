import type { CSSProperties, ReactNode } from "react";
import styles from "./Walker.module.scss";

/**
 * The Walkers: the illustrated cast of the site.
 *
 * Rules of the character system
 * - One body plan: round head (≈ 1/4.5 of height), rubber-hose limbs drawn as
 *   an ink stroke under a colour stroke, flat fills, no gradients.
 * - Line: 3px ink, round caps. In dark mode the outline turns to chalk; facial
 *   features stay dark so faces read the same in both themes.
 * - Personality comes from silhouette (hair, build, height, accessory),
 *   pose and props, never from a different drawing style.
 * - Every movable part carries data-part, so each scene choreographs its own
 *   movement in its own stylesheet. Pivots are set here once.
 * - They are illustrations. They never stand in for real employees.
 */

export type Hair = "bun" | "short" | "curly" | "long" | "cap" | "spiky" | "bob" | "beanie" | "bald";
export type Expression = "smile" | "think" | "wow" | "grin" | "calm" | "focus";
export type Accessory = "glasses" | "headphones" | "scarf" | "pencil" | "bag" | "lanyard";

export interface Look {
  skin: string;
  hair: string;
  hairStyle: Hair;
  top: string;
  bottom: string;
  shoes?: string;
  build?: "slim" | "round";
  accessories?: Accessory[];
}

export interface WalkerProps {
  look: Look;
  /** First expression is visible; the others are drawn hidden for scenes to swap in. */
  expressions?: Expression[];
  leftHand?: ReactNode;
  rightHand?: ReactNode;
  /** Extra drawing behind the figure (e.g. a chair) or in front (e.g. a desk). */
  behind?: ReactNode;
  front?: ReactNode;
  className?: string;
  style?: CSSProperties;
  facing?: "right" | "left";
  title?: string;
}

const FACE = "oklch(21.54% 0.009 75.14)";

export function Walker({
  look,
  expressions = ["smile"],
  leftHand,
  rightHand,
  behind,
  front,
  className,
  style,
  facing = "right",
  title,
}: WalkerProps) {
  const round = look.build === "round";
  const shoulderL = round ? 46 : 50;
  const shoulderR = round ? 94 : 90;
  const acc = new Set(look.accessories ?? []);
  const torso = round
    ? "M46 96 C 44 120, 40 150, 48 168 L 92 168 C 100 150, 96 120, 94 96 C 84 90, 56 90, 46 96 Z"
    : "M50 96 C 48 120, 50 150, 53 166 L 87 166 C 90 150, 92 120, 90 96 C 80 91, 60 91, 50 96 Z";

  return (
    <svg
      className={[styles.walker, className].filter(Boolean).join(" ")}
      viewBox="0 0 140 260"
      style={style}
      data-facing={facing}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g data-part="body">
        {behind}
        <g data-part="figure" transform={facing === "left" ? "translate(140 0) scale(-1 1)" : undefined}>
          {/* Legs */}
          <Limb part="leg-b" origin="74 164" d="M74 164 L76 242" color={look.bottom} width={15}>
            <ellipse cx="80" cy="246" rx="12" ry="6.5" fill={look.shoes ?? FACE} className={styles.line} />
          </Limb>
          <Limb part="leg-a" origin="66 164" d="M66 164 L64 242" color={look.bottom} width={15}>
            <ellipse cx="68" cy="246" rx="12" ry="6.5" fill={look.shoes ?? FACE} className={styles.line} />
          </Limb>

          {acc.has("bag") && (
            <path d="M88 104 C 106 104, 110 122, 108 150 C 106 160, 92 160, 90 152" fill="oklch(49.32% 0.0627 65.51)" className={styles.line} />
          )}

          {/* Back arm (behind torso) */}
          <g data-part="arm-b" style={{ transformOrigin: `${shoulderR}px 102px` }}>
            <Stroke d={`M${shoulderR} 102 L${shoulderR + 6} 132`} color={look.top} width={12} />
            <g data-part="forearm-b" style={{ transformOrigin: `${shoulderR + 6}px 132px` }}>
              <Stroke d={`M${shoulderR + 6} 132 L${shoulderR + 4} 158`} color={look.top} width={11} />
              <circle cx={shoulderR + 4} cy={161} r={6.5} fill={look.skin} className={styles.line} />
              {rightHand && <g transform={`translate(${shoulderR + 4} 161)`}>{rightHand}</g>}
            </g>
          </g>

          {/* Torso */}
          <path data-part="torso" d={torso} fill={look.top} className={styles.line} />
          {acc.has("lanyard") && (
            <g>
              <path d="M60 96 L70 126 L80 96" fill="none" stroke="oklch(55.69% 0.1874 261.2)" strokeWidth="2.5" />
              <rect x="64" y="124" width="12" height="15" rx="2" fill="oklch(100% 0 0)" className={styles.lineThin} />
            </g>
          )}
          {acc.has("bag") && <path d="M58 96 L 92 150" stroke="oklch(39.91% 0.0535 63.12)" strokeWidth="3.5" fill="none" />}

          {/* Neck + head */}
          <g data-part="head" style={{ transformOrigin: "70px 92px" }}>
            <path d="M66 82 L66 96 M74 82 L74 96" stroke={look.skin} strokeWidth="6" />
            <Hair style={look.hairStyle} color={look.hair} layer="back" />
            <path
              d="M70 30 C 88 30, 98 44, 97 60 C 96 77, 84 86, 70 86 C 55 86, 43 76, 43 59 C 43 43, 53 30, 70 30 Z"
              fill={look.skin}
              className={styles.line}
            />
            {/* ear */}
            <path d="M44 60 C 38 58, 38 68, 45 68" fill={look.skin} className={styles.lineThin} />
            <Hair style={look.hairStyle} color={look.hair} layer="front" />
            {/* eyes blink via data-part="eyes" */}
            <g data-part="eyes" style={{ transformOrigin: "75px 58px" }}>
              <ellipse cx="66" cy="58" rx="2.6" ry="3.2" fill={FACE} />
              <ellipse cx="84" cy="58" rx="2.6" ry="3.2" fill={FACE} />
            </g>
            <path d="M88 64 C 92 66, 91 70, 87 70" fill="none" stroke={FACE} strokeWidth="2" strokeLinecap="round" />
            <circle cx="62" cy="68" r="4" fill="oklch(75.82% 0.1448 29.02)" opacity="0.35" />
            <circle cx="90" cy="68" r="3.2" fill="oklch(75.82% 0.1448 29.02)" opacity="0.3" />
            {expressions.map((e, i) => (
              <Face key={e} expr={e} hidden={i > 0} />
            ))}
            {acc.has("glasses") && (
              <g fill="none" stroke={FACE} strokeWidth="2.2">
                <circle cx="66" cy="58" r="7.5" />
                <circle cx="85" cy="58" r="7" />
                <path d="M73.5 57 L78 57 M58.5 56 L46 54" />
              </g>
            )}
            {acc.has("headphones") && (
              <g>
                <path d="M44 56 C 44 22, 96 22, 96 50" fill="none" stroke="oklch(28.5% 0 0)" strokeWidth="5" strokeLinecap="round" />
                <rect x="37" y="52" width="13" height="20" rx="5" fill="oklch(58.55% 0.2231 29.08)" className={styles.lineThin} />
              </g>
            )}
            {acc.has("pencil") && (
              <g transform="rotate(-38 50 40)">
                <rect x="30" y="37" width="34" height="6" fill="oklch(89.16% 0.1569 92.99)" className={styles.lineThin} />
                <path d="M64 37 L72 40 L64 43 Z" fill="oklch(85.31% 0.0651 73.64)" className={styles.lineThin} />
              </g>
            )}
          </g>

          {acc.has("scarf") && (
            <path d="M54 92 C 62 100, 80 100, 88 92 L 90 98 C 80 106, 62 106, 52 98 Z M60 100 L56 122 L64 122 L66 102" fill="oklch(58.55% 0.2231 29.08)" className={styles.lineThin} />
          )}

          {/* Front arm */}
          <g data-part="arm-a" style={{ transformOrigin: `${shoulderL}px 102px` }}>
            <Stroke d={`M${shoulderL} 102 L${shoulderL - 6} 132`} color={look.top} width={12} />
            <g data-part="forearm-a" style={{ transformOrigin: `${shoulderL - 6}px 132px` }}>
              <Stroke d={`M${shoulderL - 6} 132 L${shoulderL - 4} 158`} color={look.top} width={11} />
              <circle cx={shoulderL - 4} cy={161} r={6.5} fill={look.skin} className={styles.line} />
              {leftHand && <g transform={`translate(${shoulderL - 4} 161)`}>{leftHand}</g>}
            </g>
          </g>
        </g>
        {front}
      </g>
    </svg>
  );
}

function Stroke({ d, color, width }: { d: string; color: string; width: number }) {
  return (
    <>
      <path d={d} className={styles.limbInk} strokeWidth={width + 5} />
      <path d={d} stroke={color} strokeWidth={width} strokeLinecap="round" fill="none" />
    </>
  );
}

function Limb({
  part,
  origin,
  d,
  color,
  width,
  children,
}: {
  part: string;
  origin: string;
  d: string;
  color: string;
  width: number;
  children?: ReactNode;
}) {
  const [x, y] = origin.split(" ");
  return (
    <g data-part={part} style={{ transformOrigin: `${x}px ${y}px` }}>
      <Stroke d={d} color={color} width={width} />
      {children}
    </g>
  );
}

function Face({ expr, hidden }: { expr: Expression; hidden: boolean }) {
  const common = {
    fill: "none",
    stroke: FACE,
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  let brows = "M60 49 Q 66 46, 71 49 M79 49 Q 85 46, 90 49";
  let mouth: ReactNode = <path d="M70 73 Q 77 79, 84 73" {...common} />;
  switch (expr) {
    case "think":
      brows = "M60 47 Q 66 45, 71 49 M79 46 Q 85 42, 90 46";
      mouth = <path d="M72 76 Q 77 74, 82 76" {...common} />;
      break;
    case "wow":
      brows = "M60 45 Q 66 41, 71 45 M79 45 Q 85 41, 90 45";
      mouth = <ellipse cx="77" cy="76" rx="4" ry="5" fill={FACE} />;
      break;
    case "grin":
      brows = "M60 48 Q 66 44, 71 48 M79 48 Q 85 44, 90 48";
      mouth = <path d="M68 71 Q 77 84, 87 71 Z" fill="oklch(100% 0 0)" stroke={FACE} strokeWidth="2.2" strokeLinejoin="round" />;
      break;
    case "calm":
      mouth = <path d="M72 74 Q 77 77, 82 74" {...common} />;
      break;
    case "focus":
      brows = "M60 50 L 71 48 M79 48 L 90 50";
      mouth = <path d="M73 75 L 81 75" {...common} />;
      break;
  }
  return (
    <g data-expr={expr} data-primary={hidden ? undefined : ""} style={hidden ? { opacity: 0 } : undefined}>
      <path d={brows} {...common} />
      {mouth}
    </g>
  );
}

function Hair({ style, color, layer }: { style: Hair; color: string; layer: "back" | "front" }) {
  const cls = styles.line;
  if (layer === "back") {
    switch (style) {
      case "bun":
        return <circle cx="66" cy="22" r="11" fill={color} className={cls} />;
      case "long":
        return <path d="M44 50 C 38 80, 40 104, 52 112 L 90 112 C 100 100, 102 78, 96 50 Z" fill={color} className={cls} />;
      case "bob":
        return <path d="M42 52 C 38 70, 40 84, 48 90 L 94 90 C 100 82, 102 70, 98 52 Z" fill={color} className={cls} />;
      default:
        return null;
    }
  }
  switch (style) {
    case "bun":
    case "long":
    case "bob":
      return <path d="M43 56 C 42 34, 58 26, 72 27 C 88 28, 99 38, 97 54 C 88 46, 76 40, 62 42 C 54 44, 48 50, 43 56 Z" fill={color} className={cls} />;
    case "short":
      return <path d="M43 54 C 40 34, 56 24, 72 26 C 90 27, 100 40, 96 52 C 90 42, 80 40, 70 42 C 60 41, 52 44, 43 54 Z" fill={color} className={cls} />;
    case "curly":
      return (
        <path
          d="M42 56 C 34 50, 38 38, 46 38 C 44 28, 56 22, 62 28 C 66 18, 82 20, 82 28 C 92 24, 100 34, 96 42 C 104 46, 100 56, 96 54 C 90 46, 80 44, 70 46 C 58 44, 48 48, 42 56 Z"
          fill={color}
          className={cls}
        />
      );
    case "spiky":
      return <path d="M43 54 L 40 36 L 52 40 L 54 24 L 64 34 L 72 20 L 78 34 L 90 24 L 90 38 L 100 38 L 96 52 C 86 44, 60 42, 43 54 Z" fill={color} className={cls} />;
    case "cap":
      return (
        <g>
          <path d="M43 50 C 42 30, 58 24, 72 25 C 88 26, 98 36, 97 50 Z" fill={color} className={cls} />
          <path d="M84 47 C 96 45, 110 47, 114 52 C 104 54, 92 53, 84 52 Z" fill={color} className={cls} />
        </g>
      );
    case "beanie":
      return (
        <g>
          <path d="M42 52 C 40 28, 58 20, 72 21 C 88 22, 100 32, 98 52 Z" fill={color} className={cls} />
          <path d="M40 52 L 100 52" stroke={color} strokeWidth="8" strokeLinecap="round" />
          <circle cx="70" cy="17" r="6" fill={color} className={cls} />
        </g>
      );
    default:
      return null;
  }
}
