import type { Look } from "./Walker";

/**
 * The recurring illustrated cast. Each has a silhouette you can recognise
 * from across the page. They are fictional: never present them as staff.
 */
export const cast = {
  /** The Scribbler: writes the journal. Bun, glasses, pencil behind the ear. */
  scribbler: {
    skin: "oklch(68.45% 0.0978 60.38)",
    hair: "oklch(24.55% 0.0274 53.79)",
    hairStyle: "bun",
    top: "oklch(87.3% 0.1396 93.54)",
    bottom: "oklch(37.53% 0.0501 263.06)",
    accessories: ["glasses", "pencil"],
  },
  /** The Seeker: looking for the next opportunity. Beanie, bag, bright jacket. */
  seeker: {
    skin: "oklch(50.42% 0.0976 58.69)",
    hair: "oklch(52.8% 0.1036 251.54)",
    hairStyle: "beanie",
    top: "oklch(58.55% 0.2231 29.08)",
    bottom: "oklch(30.98% 0.0196 285.2)",
    accessories: ["bag"],
  },
  /** The Tinkerer: builds the prototype. Curly hair, round build. */
  tinkerer: {
    skin: "oklch(77.82% 0.1042 72.31)",
    hair: "oklch(22.25% 0.0098 52.96)",
    hairStyle: "curly",
    top: "oklch(52.89% 0.1056 154.41)",
    bottom: "oklch(36.49% 0.029 60.37)",
    build: "round",
  },
  /** The Asker: questions everything, kindly. Spiky hair, headphones. */
  asker: {
    skin: "oklch(57.95% 0.0863 44.06)",
    hair: "oklch(19.57% 0 0)",
    hairStyle: "spiky",
    top: "oklch(65.45% 0.1562 262.5)",
    bottom: "oklch(28.36% 0.0243 261.13)",
    accessories: ["headphones"],
  },
  /** The Connector: links people and ideas. Long hair, scarf. */
  connector: {
    skin: "oklch(84.08% 0.102 76.23)",
    hair: "oklch(35.45% 0.0716 44.24)",
    hairStyle: "long",
    top: "oklch(96.23% 0.0143 84.58)",
    bottom: "oklch(45.56% 0.1118 33.07)",
    accessories: ["scarf"],
  },
  /** The Listener: quiet, notices things. Bob haircut, lanyard. */
  listener: {
    skin: "oklch(63.33% 0.0896 47.2)",
    hair: "oklch(28.91% 0 0)",
    hairStyle: "bob",
    top: "oklch(63.01% 0.1545 301.87)",
    bottom: "oklch(30.12% 0 0)",
    accessories: ["lanyard"],
  },
  /** The Messenger: carries notes between pages. Cap. */
  messenger: {
    skin: "oklch(73.13% 0.0943 60.17)",
    hair: "oklch(58.55% 0.2231 29.08)",
    hairStyle: "cap",
    top: "oklch(54.16% 0.1241 257.41)",
    bottom: "oklch(84.56% 0.0391 85.34)",
  },
} satisfies Record<string, Look>;

export type CastName = keyof typeof cast;
