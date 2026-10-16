import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { JobStatus } from "@/components/careers/JobStatus";
import { jobs, jobExperience, jobPlace } from "@/content/jobs";
import { company } from "@/content/company";
import { formatDate } from "@/content/posts";
import { pageMeta, SITE_URL } from "@/lib/seo";
import s from "./job.module.scss";

export const dynamicParams = false;

export function generateStaticParams() {
  // A static export needs at least one path; with no roles, the placeholder 404s.
  return jobs.length ? jobs.map((j) => ({ slug: j.slug })) : [{ slug: "none" }];
}

const find = (slug: string) => jobs.find((j) => j.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const job = find((await params).slug);
  if (!job) return {};
  return pageMeta({
    title: `${job.title} · Careers`,
    description: `${job.title} at Walkover${job.department ? `, ${job.department}` : ""}, ${jobPlace(job)}. Apply on Walkover’s careers portal.`,
    path: `/careers/${job.slug}/`,
  });
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const job = find((await params).slug);
  if (!job) notFound();
  const exp = jobExperience(job);
  const loc = job.locations[0];

  // JobPosting only when the listing states a place; nothing is guessed.
  const schema = loc
    ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: job.title,
        description: job.descriptionHtml,
        datePosted: job.publishedOn.slice(0, 10),
        employmentType: job.fullTime ? "FULL_TIME" : undefined,
        hiringOrganization: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: company.name, sameAs: SITE_URL },
        jobLocation: {
          "@type": "Place",
          address: { "@type": "PostalAddress", addressLocality: loc.city, addressRegion: loc.region ?? undefined, addressCountry: loc.country },
        },
        directApply: false,
        url: job.applyUrl,
      }
    : null;

  return (
    <>
      {schema && <JsonLd data={schema} />}
      <article className="section-tight">
        <div className="wrap wrap-text">
          <Breadcrumbs trail={[{ name: "Careers", path: "/careers/" }, { name: job.title, path: `/careers/${job.slug}/` }]} />
          <header className={s.head}>
            <p className="eyebrow">{job.department ?? "open role"}</p>
            <h1 className={s.title}>{job.title}</h1>
            <ul className={s.facts}>
              <li>{jobPlace(job)}</li>
              {job.fullTime && <li>Full time</li>}
              {exp && <li>{exp} experience</li>}
              <li>
                Posted <time dateTime={job.publishedOn}>{formatDate(job.publishedOn.slice(0, 10))}</time>
              </li>
            </ul>
            <JobStatus id={job.id} />
            <a href={job.applyUrl} className="btn btn-red" target="_blank" rel="noopener">
              Apply on the careers portal
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </header>
          <div className={s.body} dangerouslySetInnerHTML={{ __html: job.descriptionHtml }} />
          {job.skills.length > 0 && (
            <p className={s.skills}>
              <b>Skills listed:</b> {job.skills.join(", ")}
            </p>
          )}
          <div className={s.foot}>
            <a href={job.applyUrl} className="btn btn-red" target="_blank" rel="noopener">
              Apply for {job.title}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/careers/" className="pen-link">
              All open roles
            </Link>
          </div>
          <p className={s.note}>The role description comes from Walkover’s careers portal and is shown here as published.</p>
        </div>
      </article>
    </>
  );
}
