import Link from "next/link";
import { company } from "@/content/company";
import { navGroups } from "@/content/nav";
import { WalkoverLogo } from "@/components/ui/WalkoverLogo";
import ReplayIntro from "./ReplayIntro";
import styles from "./SiteFooter.module.scss";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} data-intro-inert>
      <svg className={styles.torn} viewBox="0 0 1200 28" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 28 L0 12 L40 16 L70 6 L110 14 L150 4 L200 13 L240 7 L290 15 L330 5 L380 12 L420 8 L470 16 L520 6 L560 13 L610 4 L650 12 L700 7 L750 15 L790 5 L840 13 L880 8 L930 16 L970 6 L1020 12 L1060 5 L1110 14 L1150 7 L1200 12 L1200 28 Z" />
      </svg>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.sign}>
          <Link href="/" className={styles.logo} aria-label="Walkover home">
            <WalkoverLogo />
          </Link>
          <p className={`hand ${styles.thanks}`}>Thanks for walking with us.</p>
          <address className={styles.address}>
            {company.legalName}
            <br />
            {company.address.lines.map((l) => (
              <span key={l}>
                {l}
                <br />
              </span>
            ))}
          </address>
          <p className={styles.reach}>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <br />
            <a href={company.phoneHref}>{company.phone}</a> <span className="muted">· {company.callHours}</span>
          </p>
        </div>

        <nav className={styles.cols} aria-label="Footer">
          {navGroups.map((group) => (
            <div key={group.id}>
              <h2 className={styles.colTitle}>{group.label}</h2>
              <ul>
                {group.sections
                  .flatMap((s) => s.items)
                  .map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className={styles.colTitle}>Elsewhere</h2>
            <ul>
              {company.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="noopener" target="_blank">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={company.brandAssets} rel="noopener" target="_blank">
                  Brand assets
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className={`wrap ${styles.base}`}>
        <p>
          © {year} {company.legalName}. Product names and logos belong to their products.
        </p>
        <ReplayIntro className={styles.replay} />
      </div>
    </footer>
  );
}
