import snapshot from "./jobs.json";

export interface Job {
  id: number;
  slug: string;
  title: string;
  department: string | null;
  experience: string | null;
  locations: Array<{ city: string; region: string | null; country: string }>;
  fullTime: boolean;
  publishedOn: string;
  skills: string[];
  descriptionHtml: string;
  applyUrl: string;
}

/** Open roles as of the last build (scripts/fetch-jobs.mjs). The careers page re-checks live. */
export const jobs: Job[] = snapshot.jobs as Job[];
export const jobsFetchedAt: string | null = snapshot.fetchedAt;
export const JOBS_FEED = snapshot.source;

/** "Indore" / "Location not listed": never guessed. */
export function jobPlace(job: Job): string {
  return job.locations.length ? job.locations.map((l) => l.city).join(", ") : "Location not listed";
}

/** Keka writes experience loosely ("+3", "4 +", "2 years or more"). Tidy it without changing its meaning. */
export function jobExperience(job: Job): string | null {
  if (!job.experience) return null;
  const e = job.experience.replace(/\s+/g, " ").trim();
  const plus = e.match(/^\+?\s*(\d+)\s*\+?$/);
  if (plus) return `${plus[1]}+ years`;
  if (/^\d+\s*-\s*\d+$/.test(e)) return `${e.replace(/\s/g, "")} years`;
  return e;
}
