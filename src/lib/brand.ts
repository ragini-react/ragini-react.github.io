import type { CSSProperties } from "react";
import type { BrandTokens } from "@/content/products";

/**
 * Scope a product's own colours to an element. Pair with the global
 * [data-brand] rules in styles/_brand.scss, which pick the official colours
 * on light paper and the derived lifted tints on dark paper.
 */
export function brandProps(b: BrandTokens): { "data-brand": string; style: CSSProperties } {
  return {
    "data-brand": "",
    style: {
      "--b": b.primary,
      "--b-on": b.onPrimary,
      "--b-acc": b.accent,
      "--b-acc-on": b.onAccent,
      "--b-surface": b.surface,
      "--b-ink": b.ink,
      "--b-dark": b.primaryOnDark,
      "--b-surface-dark": b.surfaceDark,
    } as CSSProperties,
  };
}
