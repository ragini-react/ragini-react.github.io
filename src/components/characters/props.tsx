// Hand-held props, drawn around the hand at (0,0) in the Walker's viewBox units.
// They inherit the character's ink colour through --char-line.

const line = { stroke: "var(--char-line)", strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** Résumé folder with a sheet peeking out: the Seeker's portfolio. */
export function Folder({ label = "CV" }: { label?: string }) {
  return (
    <g data-part="prop-folder" transform="rotate(-8)">
      <rect x="-6" y="-26" width="34" height="42" rx="2" fill="oklch(99.42% 0.0069 88.64)" {...line} />
      <path d="M0 -16 H22 M0 -10 H22 M0 -4 H16" {...line} strokeWidth={1.6} />
      <text x="1" y="11" fontSize="8" fontFamily="var(--font-hand)" fill="oklch(21.54% 0.009 75.14)">
        {label}
      </text>
      <path d="M-10 -20 H8 L12 -24 H30 V18 H-10 Z" fill="oklch(80.9% 0.1379 85.2)" {...line} opacity="0.96" />
      <path d="M-10 -12 H30" {...line} strokeWidth={1.5} />
    </g>
  );
}

/** Spiral notebook held open. */
export function Notebook() {
  return (
    <g data-part="prop-notebook" transform="rotate(10)">
      <rect x="-4" y="-30" width="32" height="40" rx="2" fill="oklch(99.42% 0.0069 88.64)" {...line} />
      <path d="M2 -20 H22 M2 -13 H22 M2 -6 H18 M2 1 H14" stroke="oklch(54.16% 0.1241 257.41)" strokeWidth={1.4} />
      {[-26, -18, -10, -2, 6].map((y) => (
        <circle key={y} cx="-4" cy={y} r="2.2" fill="none" {...line} strokeWidth={1.5} />
      ))}
    </g>
  );
}

export function Pencil({ angle = -60 }: { angle?: number }) {
  return (
    <g data-part="prop-pencil" transform={`rotate(${angle})`}>
      <rect x="-3" y="-30" width="6" height="30" fill="oklch(89.16% 0.1569 92.99)" {...line} strokeWidth={2} />
      <path d="M-3 0 L0 8 L3 0 Z" fill="oklch(85.31% 0.0651 73.64)" {...line} strokeWidth={2} />
      <rect x="-3" y="-34" width="6" height="5" fill="oklch(73.39% 0.1163 20.26)" {...line} strokeWidth={2} />
    </g>
  );
}

export function Mug() {
  return (
    <g data-part="prop-mug">
      <path d="M-8 -14 H10 V4 C10 9, -8 9, -8 4 Z" fill="oklch(99.42% 0.0069 88.64)" {...line} />
      <path d="M10 -9 C 17 -9, 17 1, 10 1" fill="none" {...line} />
      <path d="M-2 -20 C -5 -24, 1 -27, -2 -31 M4 -20 C 1 -24, 7 -27, 4 -31" fill="none" {...line} strokeWidth={1.6} opacity="0.6" />
    </g>
  );
}

export function StickyNote({ color = "oklch(89.16% 0.1569 92.99)", text }: { color?: string; text?: string }) {
  return (
    <g data-part="prop-note" transform="rotate(-6)">
      <rect x="-14" y="-30" width="28" height="28" fill={color} {...line} />
      {text && (
        <text x="0" y="-12" textAnchor="middle" fontSize="9" fontFamily="var(--font-hand)" fill="oklch(21.54% 0.009 75.14)">
          {text}
        </text>
      )}
    </g>
  );
}

export function Wrench() {
  return (
    <g data-part="prop-wrench" transform="rotate(-30)">
      <path d="M-2 4 L-2 -24 C -9 -26, -10 -36, -4 -40 L-3 -33 L3 -33 L4 -40 C 10 -36, 9 -26, 2 -24 L2 4 Z" fill="oklch(81.64% 0.0183 81.32)" {...line} strokeWidth={2} />
    </g>
  );
}

export function Envelope() {
  return (
    <g data-part="prop-envelope" transform="rotate(-10)">
      <rect x="-16" y="-24" width="32" height="22" rx="2" fill="oklch(99.42% 0.0069 88.64)" {...line} />
      <path d="M-16 -24 L0 -11 L16 -24" fill="none" {...line} />
      <circle cx="9" cy="-7" r="3.5" fill="oklch(58.55% 0.2231 29.08)" />
    </g>
  );
}

export function Laptop() {
  return (
    <g data-part="prop-laptop">
      <path d="M-30 -2 L-24 -34 H22 L16 -2 Z" fill="oklch(86.52% 0.0176 84.59)" {...line} />
      <path d="M-36 -2 H24 L20 4 H-38 Z" fill="oklch(77.58% 0.0215 81.77)" {...line} />
    </g>
  );
}

export function Bulb() {
  return (
    <g data-part="prop-bulb">
      <path d="M0 -40 C 12 -40, 18 -30, 14 -20 C 12 -16, 8 -14, 7 -8 H-7 C -8 -14, -12 -16, -14 -20 C -18 -30, -12 -40, 0 -40 Z" fill="oklch(89.16% 0.1569 92.99)" {...line} />
      <path d="M-6 -4 H6 M-5 0 H5" {...line} />
    </g>
  );
}
