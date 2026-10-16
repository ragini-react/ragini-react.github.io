"use client";

import { useEffect, useState } from "react";
import { fetchLiveJobs } from "./live";

/** Tells the visitor if the role has closed since this page was built. */
export function JobStatus({ id }: { id: number }) {
  const [state, setState] = useState<"checking" | "open" | "closed" | "unknown">("checking");
  useEffect(() => {
    fetchLiveJobs().then((live) => {
      if (!live) setState("unknown");
      else setState(live.some((j) => j.id === id) ? "open" : "closed");
    });
  }, [id]);
  if (state === "checking" || state === "unknown") return null;
  return (
    <p role="status" style={{ fontWeight: 650, color: state === "open" ? "var(--leaf)" : "var(--red-ink)" }}>
      {state === "open" ? "✓ Still open: confirmed with the careers portal just now." : "This role seems to have closed since this page was published. See the open roles instead."}
    </p>
  );
}
