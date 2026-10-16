import type { ProductSlug } from "@/content/products";
import styles from "./ProductStory.module.scss";

/**
 * One hand-drawn mechanism per product, coloured with the product's own
 * brand tokens (from the surrounding [data-brand] scope). Each shows the
 * problem being solved, not a fake screenshot of the product.
 */
export function ProductStory({ slug, title }: { slug: ProductSlug; title: string }) {
  const Scene = scenes[slug];
  return (
    <figure className={`scene ${styles.figure}`} data-scene data-story={slug}>
      <svg className={styles.svg} viewBox="0 0 400 260" role="img" aria-label={title}>
        <Scene />
      </svg>
    </figure>
  );
}

const Msg91 = () => (
  <g className={styles.msg91}>
    {/* server rack */}
    <g className={styles.ink}>
      <rect x="18" y="80" width="64" height="100" rx="6" className={styles.paperFill} />
      <path d="M28 104 H 72 M28 128 H 72 M28 152 H 72" />
      <circle cx="66" cy="94" r="3" className={styles.brandFill} />
      <circle cx="66" cy="118" r="3" className={styles.brandFill} />
    </g>
    <text x="50" y="200" className={styles.hand} textAnchor="middle">
      your app
    </text>
    {/* route */}
    <path id="msg91-route" className={styles.route} d="M82 130 C 130 60, 170 200, 220 130 S 300 70, 320 120" />
    {/* channel stops */}
    {[
      [118, 92, "SMS"],
      [168, 158, "WA"],
      [214, 132, "@"],
      [258, 98, "☎"],
      [298, 104, "RCS"],
    ].map(([x, y, t], i) => (
      <g key={String(t)} className={styles.stop} style={{ "--i": i } as React.CSSProperties}>
        <circle cx={x as number} cy={y as number} r="15" className={styles.paperFill} />
        <text x={x as number} y={(y as number) + 4} textAnchor="middle" className={styles.tiny}>
          {t}
        </text>
      </g>
    ))}
    {/* traveling message */}
    <g className={styles.traveler}>
      <path d="M-14 -10 H 14 C 17 -10, 18 -9, 18 -6 V 6 C 18 9, 17 10, 14 10 H -4 L -10 16 L -9 10 H -14 C -17 10, -18 9, -18 6 V -6 C -18 -9, -17 -10, -14 -10 Z" className={styles.brandFill} />
      <path d="M-9 0 H 9" className={styles.onBrand} />
    </g>
    {/* phone */}
    <g className={styles.ink}>
      <rect x="322" y="62" width="62" height="118" rx="10" className={styles.paperFill} />
      <rect x="330" y="76" width="46" height="84" rx="4" className={styles.surfaceFill} />
    </g>
    <text x="353" y="110" textAnchor="middle" className={styles.otpLabel}>
      code
    </text>
    {["4", "8", "2", "1", "9", "3"].map((d, i) => (
      <text key={i} x={336 + i * 7} y="130" className={styles.digit} style={{ "--i": i } as React.CSSProperties}>
        {d}
      </text>
    ))}
    <path className={styles.tick} d="M343 146 L 351 153 L 365 139" />
  </g>
);

const ViaSocket = () => {
  const tiles: Array<[number, number, string]> = [
    [44, 40, "crm"],
    [44, 120, "sheet"],
    [44, 200, "chat"],
    [326, 40, "mail"],
    [326, 120, "cal"],
    [326, 200, "your app"],
  ];
  return (
    <g className={styles.viasocket}>
      {tiles.map(([x, y], i) => (
        <path
          key={`c${i}`}
          className={styles.cable}
          style={{ "--i": i } as React.CSSProperties}
          pathLength={1}
          d={`M200 130 C ${x < 200 ? 150 : 250} 130, ${x < 200 ? x + 70 : x - 70} ${y + 10}, ${x < 200 ? x + 34 : x - 34} ${y + 10}`}
        />
      ))}
      {tiles.map(([x, y], i) => (
        <path
          key={`p${i}`}
          className={styles.pulse}
          style={{ "--i": i } as React.CSSProperties}
          pathLength={1}
          d={`M200 130 C ${x < 200 ? 150 : 250} 130, ${x < 200 ? x + 70 : x - 70} ${y + 10}, ${x < 200 ? x + 34 : x - 34} ${y + 10}`}
        />
      ))}
      {tiles.map(([x, y, label], i) => (
        <g key={label} className={styles.tile} style={{ "--i": i } as React.CSSProperties}>
          <rect x={x - 34} y={y - 12} width="68" height="44" rx="8" className={styles.paperFill} />
          <text x={x} y={y + 15} textAnchor="middle" className={styles.hand}>
            {label}
          </text>
        </g>
      ))}
      {/* the socket */}
      <g className={styles.ink}>
        <rect x="166" y="96" width="68" height="68" rx="12" className={styles.brandFill} />
        <circle cx="188" cy="124" r="4" className={styles.onBrandFill} />
        <circle cx="212" cy="124" r="4" className={styles.onBrandFill} />
        <path d="M188 142 Q 200 150, 212 142" className={styles.onBrand} />
      </g>
    </g>
  );
};

const Giddh = () => (
  <g className={styles.giddh}>
    <g className={styles.ink}>
      <path d="M200 60 V 220 M160 222 H 240" />
      <circle cx="200" cy="56" r="6" className={styles.brandFill} />
    </g>
    <g className={styles.beam}>
      <path className={styles.inkLine} d="M90 70 H 310" />
      <g className={styles.panL}>
        <path className={styles.inkLine} d="M90 70 L 64 130 M90 70 L 116 130" />
        <path className={styles.pan} d="M56 130 H 124 C 120 150, 60 150, 56 130 Z" />
        {[0, 1, 2].map((i) => (
          <rect key={i} className={styles.slip} style={{ "--i": i } as React.CSSProperties} x={70 + i * 8} y={110 - i * 7} width="30" height="20" rx="2" />
        ))}
        <text x="90" y="166" textAnchor="middle" className={styles.hand}>
          invoices
        </text>
      </g>
      <g className={styles.panR}>
        <path className={styles.inkLine} d="M310 70 L 284 130 M310 70 L 336 130" />
        <path className={styles.pan} d="M276 130 H 344 C 340 150, 280 150, 276 130 Z" />
        {[0, 1, 2].map((i) => (
          <rect key={i} className={`${styles.slip} ${styles.slipBank}`} style={{ "--i": i + 3 } as React.CSSProperties} x={290 + i * 8} y={110 - i * 7} width="30" height="20" rx="2" />
        ))}
        <text x="310" y="166" textAnchor="middle" className={styles.hand}>
          bank
        </text>
      </g>
    </g>
    <g className={styles.stamp}>
      <rect x="150" y="186" width="100" height="30" rx="4" />
      <text x="200" y="207" textAnchor="middle">
        balanced ✓
      </text>
    </g>
  </g>
);

const Gtwy = () => (
  <g className={styles.gtwy}>
    <path className={styles.arch} d="M120 210 V 120 C 120 50, 220 50, 220 120 V 210" />
    <path className={styles.archInner} d="M138 210 V 124 C 138 74, 202 74, 202 124 V 210" />
    {[
      [300, 50, "A"],
      [300, 120, "B"],
      [300, 190, "C"],
    ].map(([x, y, l], i) => (
      <g key={String(l)}>
        <path className={styles.lane} d={`M220 ${150 + (i - 1) * 20} C 250 ${150 + (i - 1) * 20}, 260 ${(y as number) + 16}, ${(x as number) - 4} ${(y as number) + 16}`} />
        <rect x={x as number} y={y as number} width="70" height="40" rx="6" className={styles.houseFill} />
        <text x={(x as number) + 35} y={(y as number) + 25} textAnchor="middle" className={styles.hand}>
          customer {l}
        </text>
      </g>
    ))}
    {[0, 1, 2].map((i) => (
      <circle key={i} className={styles.agent} data-lane={i} r="7" />
    ))}
    <g className={styles.fallback}>
      <text x="34" y="64" className={styles.hand}>
        model 1
      </text>
      <path className={styles.cross} d="M30 50 L 92 72" />
      <text x="34" y="96" className={styles.hand}>
        → model 2
      </text>
    </g>
  </g>
);

const ThingsOfBrand = () => (
  <g className={styles.tob}>
    <g className={styles.ink}>
      <rect x="40" y="110" width="150" height="120" rx="8" className={styles.paperFill} />
      <path d="M40 170 H 190" />
      <path d="M100 140 H 130 M100 200 H 130" />
    </g>
    <g className={styles.drawer}>
      <rect x="44" y="114" width="142" height="54" rx="4" className={styles.surfaceFill} />
      <path className={styles.inkLine} d="M100 140 H 130" />
    </g>
    {[0, 1, 2].map((i) => (
      <g key={i} className={styles.card} data-n={i}>
        <rect x="-22" y="-28" width="44" height="56" rx="5" className={styles.paperFill} />
        <circle cx="0" cy="-6" r="10" className={i === 1 ? styles.brandFill : styles.mutedFill} />
        <path d="M-12 14 H 12" className={styles.inkLine} />
      </g>
    ))}
    <g className={styles.verified}>
      <circle cx="0" cy="0" r="10" className={styles.brandFill} />
      <path d="M-5 0 L -1 4 L 6 -4" className={styles.onBrand} />
    </g>
    <text x="330" y="132" textAnchor="middle" className={styles.api}>
      {"{ api }"}
    </text>
  </g>
);

const FiftyAgents = () => (
  <g className={styles.fifty}>
    <rect x="30" y="24" width="340" height="40" rx="20" className={styles.paperFill} />
    <text x="52" y="50" className={styles.prompt}>
      send me new leads every morning
    </text>
    <rect className={styles.caret} x="52" y="34" width="2" height="22" />
    {[
      [70, 210, "mail"],
      [200, 210, "crm"],
      [330, 210, "sheet"],
    ].map(([x, y, l]) => (
      <g key={String(l)}>
        <rect x={(x as number) - 40} y={(y as number) - 20} width="80" height="40" rx="8" className={styles.paperFill} />
        <text x={x as number} y={(y as number) + 5} textAnchor="middle" className={styles.hand}>
          {l}
        </text>
      </g>
    ))}
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i} className={styles.bot} data-n={i}>
        <path d="M0 -14 V -20" className={styles.inkLine} />
        <circle cx="0" cy="-22" r="2.5" className={styles.brandFill} />
        <circle cx="0" cy="0" r="12" className={styles.brandFill} />
        <circle cx="-4" cy="-2" r="2" className={styles.onBrandFill} />
        <circle cx="4" cy="-2" r="2" className={styles.onBrandFill} />
        <path d="M-6 16 L -4 10 M6 16 L 4 10" className={styles.inkLine} />
      </g>
    ))}
    {[0, 1, 2].map((i) => (
      <path key={i} className={styles.done} style={{ "--i": i } as React.CSSProperties} d={`M${58 + i * 130} 172 l8 8 l14 -16`} />
    ))}
  </g>
);

const DocStar = () => (
  <g className={styles.docstar}>
    {[
      [40, 40, -12],
      [96, 190, 8],
      [60, 120, -4],
      [150, 46, 10],
    ].map(([x, y, r], i) => (
      <g key={i} className={styles.loose} style={{ "--i": i, "--x": `${x}px`, "--y": `${y}px`, "--r": `${r}deg` } as React.CSSProperties}>
        <rect x="-18" y="-16" width="36" height="32" className={styles.noteFill} />
        <path d="M-10 -4 H 10 M-10 4 H 6" className={styles.inkLine} />
      </g>
    ))}
    <g className={styles.ink}>
      <rect x="200" y="30" width="170" height="200" rx="8" className={styles.paperFill} />
      <rect x="200" y="30" width="44" height="200" rx="8" className={styles.surfaceFill} />
      <path d="M210 52 H 234 M210 66 H 230 M210 80 H 234" />
    </g>
    {[0, 1, 2, 3].map((i) => (
      <path key={i} className={styles.line} style={{ "--i": i } as React.CSSProperties} pathLength={1} d={`M258 ${70 + i * 30} H ${340 - (i % 2) * 24}`} />
    ))}
    <path className={styles.sparkle} d="M352 46 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 z" />
    <g className={styles.stamp}>
      <rect x="252" y="188" width="96" height="28" rx="4" />
      <text x="300" y="207" textAnchor="middle">
        published
      </text>
    </g>
  </g>
);

const Embarko = () => (
  <g className={styles.embarko}>
    <path className={styles.water} d="M0 200 C 30 192, 50 208, 80 200 S 130 192, 160 200 S 210 208, 240 200 S 290 192, 320 200 S 370 208, 400 200" />
    <g className={styles.sheetPaper}>
      <rect x="30" y="40" width="80" height="100" rx="4" className={styles.paperFill} />
      <path d="M42 62 H 98 M42 76 H 92 M42 90 H 98 M42 104 H 80" className={styles.inkLine} />
      <text x="70" y="128" textAnchor="middle" className={styles.tiny}>
        prompt
      </text>
    </g>
    <g className={styles.boat}>
      <path d="M-34 -6 H 34 L 22 12 H -22 Z" className={styles.paperFill} />
      <path d="M0 -6 V -44 L 26 -12 Z" className={styles.brandFill} />
    </g>
    <g className={styles.ink}>
      <path d="M330 200 V 150 M372 200 V 150 M320 150 H 390" />
    </g>
    <g className={styles.sign}>
      <rect x="250" y="90" width="146" height="34" rx="6" className={styles.paperFill} />
      <text x="323" y="112" textAnchor="middle" className={styles.url}>
        yourapp.embarko.app
      </text>
    </g>
  </g>
);

const scenes: Record<ProductSlug, () => React.JSX.Element> = {
  msg91: Msg91,
  viasocket: ViaSocket,
  giddh: Giddh,
  gtwy: Gtwy,
  thingsofbrand: ThingsOfBrand,
  "50agents": FiftyAgents,
  docstar: DocStar,
  embarko: Embarko,
};
