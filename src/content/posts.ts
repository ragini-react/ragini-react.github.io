/**
 * Walkover Insights: the company's own publication on Medium
 * (medium.com/walkover-insights, also served at blog.walkover.in).
 * Titles, authors, dates and links come from the publication's RSS feed
 * (fetched 16 Oct 2026). Summaries are ours and only describe what each
 * article says. The full articles live on Medium; we link to them.
 */

export type PostTopic = "Culture" | "Engineering" | "Design" | "Company";

export interface Post {
  slug: string;
  title: string;
  author: string;
  date: string; // ISO
  topic: PostTopic;
  summary: string;
  href: string;
}

const M = "https://medium.com/walkover-insights/";

export const posts: Post[] = [
  {
    slug: "a-look-back-at-2021",
    title: "A Look Back At 2021",
    author: "Pallavi BharatJaisinghani",
    date: "2021-12-24",
    topic: "Company",
    summary:
      "A year in one sitting: a COVID community forum, a month of “working from hills” near Kullu, health and money sessions, Walkover University for freshers, and the small food and shopping ventures that came out of it all.",
    href: `${M}a-look-back-at-2021-2770bda68ff2`,
  },
  {
    slug: "diverse-and-inclusive-workplace",
    title: "This Is How We Are Making Walkover A Diverse And Inclusive Workplace",
    author: "Pallavi BharatJaisinghani",
    date: "2021-11-18",
    topic: "Culture",
    summary:
      "Starts from a plain definition of diversity and inclusion, then argues it has to go further than the usual categories, into perspectives, preferences and the way each person works.",
    href: `${M}this-is-how-we-are-making-walkover-a-diverse-and-inclusive-workplace-63bfe8ef1f2`,
  },
  {
    slug: "find-a-new-mountain",
    title: "If You Think You’ve Peaked, Find A New Mountain",
    author: "Pallavi BharatJaisinghani",
    date: "2021-05-10",
    topic: "Culture",
    summary:
      "Notes from a month-long workcation in a cottage near Kullu, by the river Beas, and practical advice for anyone planning to work from the hills: location, connectivity, and keeping a routine.",
    href: `${M}if-you-think-youve-peaked-find-a-new-mountain-b95fca58fbb6`,
  },
  {
    slug: "three-pillars",
    title: "3 Pillars That Made Walkover Stand Strong",
    author: "Unnati Khushlani",
    date: "2021-02-02",
    topic: "Company",
    summary:
      "Design, culture and technology, and why the team wants what happens inside the company to show on the outside. Includes the idea that simplicity is the result of a lot of hard work, learned while designing MSG91.",
    href: `${M}how-design-culture-and-technology-fuels-walkover-52b6b9abea7`,
  },
  {
    slug: "work-anywhere",
    title: "How Work Anywhere looks at Walkover?",
    author: "People Excellence",
    date: "2020-11-04",
    topic: "Culture",
    summary:
      "From the family's single corded telephone to choosing your own workplace: how the pandemic turned working from home into working from anywhere for Walkers.",
    href: `${M}how-work-anywhere-looks-at-walkover-314bad6ce120`,
  },
  {
    slug: "best-practices-to-build-api",
    title: "Best practices to build API",
    author: "Yuktika Mishra",
    date: "2020-06-22",
    topic: "Engineering",
    summary:
      "Practical dos and don’ts for REST API design, from lowercase paths and no state changes in query strings to keeping the URI space small, written for APIs that have to last.",
    href: `${M}best-practices-to-build-api-eb2174cbfeba`,
  },
  {
    slug: "budding-apis",
    title: "Budding APIs, Best practices!",
    author: "Yuktika Mishra",
    date: "2020-06-01",
    topic: "Engineering",
    summary:
      "The first version of the API guide, aimed at programmers building their first APIs: why shortcuts that work today become problems for the next developer.",
    href: `${M}budding-apis-best-practices-6908b99f90ab`,
  },
  {
    slug: "journey-to-innovation",
    title: "Walkover — A Journey To Innovation!",
    author: "Usha Jaiswal",
    date: "2019-11-13",
    topic: "Company",
    summary:
      "How three siblings started Walkover in Indore in 2010, the early ideas they toyed with (HostnSoft, UtterU, Save&Search, Whozzat), and the products that were running in 2019.",
    href: `${M}walkover-a-journey-to-innovation-aba695c1aefe`,
  },
  {
    slug: "transforming-workspaces",
    title: "Transforming Work(spaces)",
    author: "Usha Jaiswal",
    date: "2019-09-30",
    topic: "Culture",
    summary:
      "Takeaways from TechHR 2019 in Gurugram: digitisation, working with Gen Z, the gig economy, people analytics, and the case for investing in reskilling.",
    href: `${M}transforming-work-spaces-61342897f6dd`,
  },
  {
    slug: "impact-of-color",
    title: "Impact of Color",
    author: "Meghna Bahety",
    date: "2019-09-21",
    topic: "Design",
    summary:
      "A designer's guide to what colours tend to signal, the good and the bad of each, and how to choose a palette that fits a brand's personality.",
    href: `${M}impact-of-color-2073d882f0c8`,
  },
];

export const postTopics: PostTopic[] = ["Company", "Culture", "Engineering", "Design"];

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
