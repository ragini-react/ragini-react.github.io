import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { HappinessNewsletter } from "@/components/newsletter/HappinessNewsletter";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./newsletter.module.scss";

const DESCRIPTION =
  "The Happiness Newsletter: Walkover’s Friday letter about the small things that make work and life better. Read the archive or ask to join.";

export const metadata = pageMeta({ title: "Happiness Newsletter", description: DESCRIPTION, path: "/newsletter/" });

// Real titles from the archive at walkover.in/happiness (checked Oct 2026).
const letters: Array<{ t: string; lang?: string }> = [
  { t: "All odd lessons to make our life even :D" },
  { t: "Real transformation requires real honesty" },
  { t: "No pressure, No diamonds" },
  { t: "आप नहीं कोई और सही", lang: "hi" },
  { t: "Passion + Consistency = Success" },
  { t: "The Secret Of Secret Santa Is Revealed" },
  { t: "You are empowered, but are you enlightened?" },
  { t: "Say Yes To No Drama" },
  { t: "Master in 5 minutes, live by forever!" },
  { t: "No news is good news!" },
];

export default function NewsletterPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Happiness Newsletter", description: DESCRIPTION, path: "/newsletter/" })} />
      <PageHero
        trail={[{ name: "Happiness Newsletter", path: "/newsletter/" }]}
        eyebrow="the happiness newsletter"
        title={
          <>
            Fridays deserve
            <br />
            a good letter.
          </>
        }
        lede={<p>For a few years, every Friday, Walkers got a short letter about living and working a little better. You can read them all, and ask to get the next ones.</p>}
      />
      <section className="section-tight sheet grid-paper" aria-label="Subscribe">
        <div className="wrap">
          <HappinessNewsletter />
        </div>
      </section>
      <section className="section" aria-labelledby="archive">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">from the archive</p>
            <h2 id="archive">A few envelopes from the pile.</h2>
            <p className="lede">Real subject lines, in English and Hindi, from October 2021 to February 2025.</p>
          </div>
          <ul className={s.pile}>
            {letters.map((l, i) => (
              <li key={l.t} data-reveal="drop" style={{ "--d": i % 4, "--r": `${((i * 37) % 9) - 4}deg` } as React.CSSProperties}>
                <a href={company.happinessArchive} rel="noopener" className={s.env}>
                  <span className={s.stamp} aria-hidden="true">
                    ☺
                  </span>
                  <span className={s.subject} lang={l.lang}>
                    {l.t}
                  </span>
                  <span className={s.from}>Happiness @Walkover · Friday</span>
                </a>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: "2.5rem" }}>
            <a href={company.happinessArchive} className="btn btn-paper" rel="noopener">
              Open the whole archive
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
