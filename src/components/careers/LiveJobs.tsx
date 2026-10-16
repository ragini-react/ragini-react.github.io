"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { jobExperience, jobPlace, type Job } from "@/content/jobs";
import { fetchLiveJobs } from "./live";
import styles from "./LiveJobs.module.scss";

interface Row {
  id: number;
  title: string;
  department: string | null;
  experience: string | null;
  place: string;
  href: string;
  external: boolean;
}

const KEKA = (id: number) => `https://walkover.keka.com/careers/jobdetails/${id}`;

/**
 * Open roles. Rendered from the build-time snapshot, then re-checked against
 * the live Keka feed so closed roles disappear and new ones show up.
 */
export function LiveJobs({ jobs, fetchedAt, portal }: { jobs: Job[]; fetchedAt: string | null; portal: string }) {
  const initial: Row[] = useMemo(
    () =>
      jobs.map((j) => ({
        id: j.id,
        title: j.title,
        department: j.department,
        experience: jobExperience(j),
        place: jobPlace(j),
        href: `/careers/${j.slug}/`,
        external: false,
      })),
    [jobs],
  );
  const [rows, setRows] = useState<Row[]>(initial);
  const [state, setState] = useState<"snapshot" | "live" | "offline">("snapshot");
  const [dept, setDept] = useState("All");

  useEffect(() => {
    let alive = true;
    fetchLiveJobs().then((live) => {
      if (!alive) return;
      if (!live) {
        setState("offline");
        return;
      }
      const known = new Map(initial.map((r) => [r.id, r]));
      setRows(
        live.map((l) => {
          const k = known.get(l.id);
          if (k) return k;
          const places = (l.jobLocations ?? []).map((x) => x.city ?? x.name).filter(Boolean);
          return {
            id: l.id,
            title: l.title,
            department: l.departmentName ?? null,
            experience: l.experience ?? null,
            place: places.length ? places.join(", ") : "Location not listed",
            href: KEKA(l.id),
            external: true,
          };
        }),
      );
      setState("live");
    });
    return () => {
      alive = false;
    };
  }, [initial]);

  const depts = ["All", ...Array.from(new Set(rows.map((r) => r.department).filter(Boolean) as string[])).sort()];
  const shown = dept === "All" ? rows : rows.filter((r) => r.department === dept);
  const asOf = fetchedAt ? new Date(fetchedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : null;

  return (
    <div className={styles.wrap}>
      <p className={styles.status} role="status">
        {state === "live" && <>Checked live with our careers portal just now · {rows.length} open {rows.length === 1 ? "role" : "roles"}</>}
        {state === "snapshot" && <>Checking for the latest roles…</>}
        {state === "offline" && <>Couldn’t reach the careers portal, so this is the list as of {asOf ?? "the last update"}. The portal always has the latest.</>}
      </p>

      {rows.length > 0 && depts.length > 2 && (
        <div className={styles.filters} role="group" aria-label="Filter roles by team">
          {depts.map((d) => (
            <button key={d} type="button" aria-pressed={dept === d} className={styles.chip} onClick={() => setDept(d)}>
              {d}
            </button>
          ))}
        </div>
      )}

      {rows.length === 0 ? (
        <div className={styles.empty}>
          <p>There are no open roles right now. New ones appear on the portal first.</p>
          <a href={portal} className="btn btn-red" target="_blank" rel="noopener">
            Visit the careers portal
          </a>
        </div>
      ) : (
        <ul className={styles.list}>
          {shown.map((r, i) => (
            <li key={r.id} style={{ "--i": i } as React.CSSProperties}>
              {r.external ? (
                <a href={r.href} className={styles.role} target="_blank" rel="noopener">
                  <RoleBody r={r} />
                  <span className="sr-only"> (opens the careers portal in a new tab)</span>
                </a>
              ) : (
                <Link href={r.href} className={styles.role}>
                  <RoleBody r={r} />
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RoleBody({ r }: { r: Row }) {
  return (
    <>
      <span className={styles.pin} aria-hidden="true" />
      <span className={styles.title}>{r.title}</span>
      <span className={styles.facts}>
        {[r.department, r.place, r.experience ? `${r.experience} experience` : null].filter(Boolean).join(" · ")}
      </span>
      <span className={styles.go} aria-hidden="true">
        {r.external ? "↗" : "→"}
      </span>
    </>
  );
}
