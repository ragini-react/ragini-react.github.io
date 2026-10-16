import type { Photo } from "@/content/photos";
import { asset } from "@/lib/paths";
import styles from "./Polaroid.module.scss";

/** A real photograph, taped into the sketchbook with a handwritten caption. */
export function Polaroid({ photo, tilt = -1.5, sizes = "(min-width: 900px) 50vw, 100vw", priority = false }: { photo: Photo; tilt?: number; sizes?: string; priority?: boolean }) {
  const largest = photo.srcSet[photo.srcSet.length - 1][0];
  return (
    <figure className={styles.polaroid} style={{ rotate: `${tilt}deg` } as React.CSSProperties} data-reveal="drop">
      <span className="tape" style={{ left: "50%", top: "-0.8rem", translate: "-50% 0", rotate: "-3deg" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(largest)}
        srcSet={photo.srcSet.map(([src, w]) => `${asset(src)} ${w}w`).join(", ")}
        sizes={sizes}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      <figcaption>
        <span className="hand">{photo.caption}</span>
        <small>{photo.credit}</small>
      </figcaption>
    </figure>
  );
}
