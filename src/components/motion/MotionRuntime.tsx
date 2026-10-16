"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One observer for the whole site:
 * - [data-reveal] elements get .is-in the first time they enter the viewport.
 * - [data-scene] elements get .is-in once and .is-playing while visible, so
 *   their keyframes pause off-screen and never burn frames out of view.
 * Re-scans after each client-side navigation.
 */
export default function MotionRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll("[data-reveal],[data-draw],[data-scene]").forEach((el) => el.classList.add("is-in", "is-playing"));
      return;
    }

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            reveal.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const scenes = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add("is-in", "is-playing");
          } else {
            el.classList.remove("is-playing");
          }
        }
      },
      { threshold: 0.25 },
    );

    const scan = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in),[data-draw]:not(.is-in)").forEach((el) => reveal.observe(el));
      document.querySelectorAll("[data-scene]").forEach((el) => scenes.observe(el));
    };
    scan();
    // Catch content that mounts a moment later (client components, intro end).
    const t = window.setTimeout(scan, 400);

    return () => {
      window.clearTimeout(t);
      reveal.disconnect();
      scenes.disconnect();
    };
  }, [pathname]);

  return null;
}
