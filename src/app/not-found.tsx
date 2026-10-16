import Link from "next/link";
import { Walker } from "@/components/characters/Walker";
import { cast } from "@/components/characters/cast";
import s from "./not-found.module.scss";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className={`section ${s.lost}`}>
      <div className={`wrap ${s.grid}`}>
        <div>
          <p className="eyebrow">404 · this page wandered off</p>
          <h1 className={s.title}>We looked everywhere. Even under the desk.</h1>
          <p className="lede" style={{ marginTop: "1rem" }}>
            The page you wanted isn’t here. It may have moved when the sketchbook got rearranged.
          </p>
          <ul className={s.links}>
            <li>
              <Link href="/" className="btn btn-red">
                Back to the start
              </Link>
            </li>
            <li>
              <Link href="/products/" className="pen-link">
                Products
              </Link>
            </li>
            <li>
              <Link href="/careers/" className="pen-link">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="pen-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className={s.art} aria-hidden="true">
          <svg viewBox="0 0 120 80" className={s.map}>
            <path d="M6 10 L 40 4 L 80 12 L 114 6 V 70 L 80 76 L 40 68 L 6 74 Z" />
            <path d="M40 4 V 68 M80 12 V 76" />
            <path className={s.route} d="M16 60 C 30 40, 50 60, 62 36 S 90 24, 100 20" />
            <text x="98" y="30">?</text>
          </svg>
          <div className={s.actor}>
            <Walker look={cast.messenger} expressions={["think"]} />
          </div>
        </div>
      </div>
    </section>
  );
}
