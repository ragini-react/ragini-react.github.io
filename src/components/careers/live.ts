import { JOBS_FEED } from "@/content/jobs";

export interface LiveJob {
  id: number;
  title: string;
  departmentName?: string;
  experience?: string;
  jobLocations?: Array<{ city?: string; name?: string }>;
  publishedOn?: string;
}

/** Fetch the live Keka feed (it allows cross-origin reads). Resolves null on any failure. */
export async function fetchLiveJobs(): Promise<LiveJob[] | null> {
  try {
    const res = await fetch(JOBS_FEED, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? (data as LiveJob[]) : null;
  } catch {
    return null;
  }
}
