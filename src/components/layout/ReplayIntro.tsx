"use client";

import { BASE_PATH } from "@/lib/paths";

/** A small footer easter egg: roll the opening die once more. */
export default function ReplayIntro({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        try {
          sessionStorage.removeItem("wk-intro-seen");
        } catch {
          /* storage blocked: the intro may already replay every visit */
        }
        // A full page load (not client navigation) lets the pre-paint script decide again.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.assign(`${BASE_PATH}/`);
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="8" cy="8" r="1.6" />
        <circle cx="16" cy="16" r="1.6" />
        <circle cx="12" cy="12" r="1.6" />
      </svg>
      Roll the intro again
    </button>
  );
}
