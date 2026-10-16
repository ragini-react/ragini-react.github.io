"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { navGroups, type NavGroup, type NavItem } from "@/content/nav";
import { WalkoverLogo } from "@/components/ui/WalkoverLogo";
import { asset } from "@/lib/paths";
import styles from "./SiteHeader.module.scss";

/**
 * Exactly four top-level items: the Walkover logo plus three disclosure
 * dropdowns. Every other destination lives inside a dropdown.
 * Pattern: WAI "disclosure navigation" (buttons with aria-expanded), which
 * keeps links as plain links for crawlers and screen readers.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});
  const sheetRef = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const baseId = useId();

  // Close everything on navigation (state adjusted during render, per React docs).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setSheet(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape and outside click close the desktop dropdown.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(null);
      buttons.current[open]?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  // Mobile sheet: lock scroll, trap focus, Escape closes.
  useEffect(() => {
    if (!sheet) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const first = sheetRef.current?.querySelector<HTMLElement>("button, a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSheet(false);
        menuButton.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !sheetRef.current) return;
      const items = Array.from(sheetRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")).filter(
        (el) => el.offsetParent !== null,
      );
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [sheet]);

  const hoverable = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const onEnter = (id: string) => {
    if (!hoverable()) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(id), open ? 0 : 90);
  };
  const onLeave = () => {
    if (!hoverable()) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(null), 220);
  };

  const onBlur = (e: React.FocusEvent) => {
    if (navRef.current && e.relatedTarget && !navRef.current.contains(e.relatedTarget as Node)) setOpen(null);
  };

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined} data-intro-inert>
      <div className={`wrap ${styles.bar}`}>
        <Link href="/" className={styles.logo} aria-label="Walkover home">
          <WalkoverLogo />
        </Link>

        <nav ref={navRef} className={styles.nav} aria-label="Main" onBlur={onBlur} onMouseLeave={onLeave}>
          <ul className={styles.top}>
            {navGroups.map((group) => {
              const panelId = `${baseId}-${group.id}`;
              const expanded = open === group.id;
              const active = group.sections.some((s) => s.items.some((i) => isCurrent(i.href)));
              return (
                <li key={group.id} className={styles.topItem} onMouseEnter={() => onEnter(group.id)}>
                  <button
                    ref={(el) => {
                      buttons.current[group.id] = el;
                    }}
                    type="button"
                    className={styles.trigger}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    data-active={active || undefined}
                    onClick={() => setOpen(expanded ? null : group.id)}
                  >
                    {group.label}
                    <svg viewBox="0 0 16 10" aria-hidden="true" className={styles.chev}>
                      <path d="M2 2.5 C 5 5, 6 7, 8 8 C 10 6.5, 12 4.5, 14 2" />
                    </svg>
                  </button>
                  <div id={panelId} className={styles.panel} data-group={group.id} hidden={!expanded}>
                    <Panel group={group} isCurrent={isCurrent} />
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={menuButton}
          type="button"
          className={styles.menuButton}
          aria-expanded={sheet}
          aria-controls={`${baseId}-sheet`}
          onClick={() => setSheet((s) => !s)}
        >
          <span>{sheet ? "Close" : "Menu"}</span>
          <svg viewBox="0 0 28 20" aria-hidden="true">
            {sheet ? (
              <path d="M5 3 C 11 9, 17 13, 23 17 M23 3 C 17 8, 11 13, 5 17" />
            ) : (
              <path d="M3 4 C 10 3, 18 5, 25 3.5 M4 10 C 11 11, 17 9, 24 10 M3 16 C 9 15, 18 17, 25 16" />
            )}
          </svg>
        </button>
      </div>

      <svg className={styles.edge} viewBox="0 0 1200 8" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 4 C 150 2, 300 6.5, 450 4 S 750 1.5, 900 4.5 S 1100 5.5, 1200 3" />
      </svg>

      <div
        id={`${baseId}-sheet`}
        ref={sheetRef}
        className={styles.sheet}
        hidden={!sheet}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <nav aria-label="Main (mobile)">
          {navGroups.map((group) => (
            <MobileGroup key={group.id} group={group} isCurrent={isCurrent} />
          ))}
        </nav>
      </div>
    </header>
  );
}

function Panel({ group, isCurrent }: { group: NavGroup; isCurrent: (href: string) => boolean }) {
  return (
    <div className={styles.panelInner}>
      <span className="tape" style={{ left: "1.5rem", top: "-0.7rem", rotate: "-4deg" }} />
      {group.note && <p className={`hand ${styles.panelNote}`}>{group.note}</p>}
      <div className={styles.sections} data-cols={group.sections.length}>
        {group.sections.map((section) => (
          <div key={section.title} className={styles.section}>
            <p className={styles.sectionTitle}>{section.title}</p>
            <ul className={section.layout === "grid" ? styles.gridList : styles.list}>
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.item}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    style={item.color ? ({ "--brand": item.color, "--brand-dark": item.colorDark ?? item.color } as React.CSSProperties) : undefined}
                    data-brand={item.color ? "" : undefined}
                  >
                    {item.logo ? <NavLogo logo={item.logo} /> : item.color && <span className={styles.swatch} aria-hidden="true" />}
                    <span className={styles.itemText}>
                      <span className={styles.itemLabel}>{item.label}</span>
                      {item.description && <span className={styles.itemDesc}>{item.description}</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileGroup({ group, isCurrent }: { group: NavGroup; isCurrent: (href: string) => boolean }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  return (
    <div className={styles.mGroup}>
      <button type="button" className={styles.mTrigger} aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded((e) => !e)}>
        {group.label}
        <svg viewBox="0 0 16 10" aria-hidden="true" className={styles.chev}>
          <path d="M2 2.5 C 5 5, 6 7, 8 8 C 10 6.5, 12 4.5, 14 2" />
        </svg>
      </button>
      <div id={id} hidden={!expanded} className={styles.mPanel}>
        {group.sections.map((section) => (
          <div key={section.title}>
            <p className={styles.sectionTitle}>{section.title}</p>
            <ul className={styles.mList}>
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.mItem}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    style={item.color ? ({ "--brand": item.color, "--brand-dark": item.colorDark ?? item.color } as React.CSSProperties) : undefined}
                  >
                    {item.logo ? <NavLogo logo={item.logo} /> : item.color && <span className={styles.swatch} aria-hidden="true" />}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A product's original logo on a small light sticker, so dark marks stay legible at night. */
function NavLogo({ logo }: { logo: NonNullable<NavItem["logo"]> }) {
  return (
    <span className={styles.navLogo} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(logo.src)} alt="" width={logo.width} height={logo.height} loading="lazy" />
    </span>
  );
}
