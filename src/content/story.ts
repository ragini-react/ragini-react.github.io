/**
 * Our Story. Each milestone carries its source. "kind" separates early
 * experiments, the legal company, launches and later milestones, which the
 * timeline draws differently. Second-hand accounts are attributed in the text.
 * Full evidence: docs/RESEARCH.md.
 */

export type MilestoneKind = "experiment" | "company" | "launch" | "milestone";

export interface Milestone {
  year: string;
  title: string;
  body: string;
  kind: MilestoneKind;
  source: { label: string; href?: string };
}

export const milestones: Milestone[] = [
  {
    year: "2006",
    title: "A social network that didn’t work out",
    body: "YourStory reported in 2013 that a few college friends set out in 2006 to build a social network big enough to take on Orkut, and that the effort failed. It was the first of many experiments.",
    kind: "experiment",
    source: { label: "YourStory, Dec 2013 (archived)", href: "https://web.archive.org/web/20131220032506/http://yourstory.com/2013/12/msg91-bulk-sms-provider/" },
  },
  {
    year: "2007",
    title: "Hostnsoft and Whozzat",
    body: "Hosting and domain registration from Indore, under the name Hostnsoft. Alongside it ran Whozzat, a social site that even paid members a few paise for every message. Walkover’s own site later said the company began as Hostnsoft in 2007.",
    kind: "experiment",
    source: { label: "Internet Archive: hostnsoft.com, whozzat.com (2007–09), walkover.in (2011)", href: "https://web.archive.org/web/20071012043334/http://whozzat.com/aboutus.html" },
  },
  {
    year: "2008",
    title: "Back home, a team of five",
    body: "Pushpendra Agrawal returned from Dubai and, in his words, “it all started with providing hosting services in the heart of India – Indore.” He picked his hometown over Bangalore.",
    kind: "experiment",
    source: { label: "Pushpendra Agrawal, MSG91 blog, Mar 2019 (archived)", href: "https://web.archive.org/web/20190917113746/https://msg91.com/blog/a-journey-from-sms-to-communication-megacorp/" },
  },
  {
    year: "2009",
    title: "msg91.com goes live",
    body: "First pitched as a way for students abroad to text family in India, and “Powered by Host N Soft”. Why 91? India’s country code. By the founder’s account, a request from Indore’s Yeshwant Club to send transactional SMS turned it into a business; another account says an unreliable SMS vendor pushed the team to take SMS in-house.",
    kind: "launch",
    source: { label: "msg91.com, Feb 2009 & Feb 2011 (archived); founder’s essay 2019; The Grit Stories 2022", href: "https://web.archive.org/web/20090214232406/http://msg91.com/" },
  },
  {
    year: "2010",
    title: "Walkover Web Solutions is incorporated",
    body: "The company was registered on 18 June 2010, founded by three siblings: Pushpendra, Ankita and Shubhendra Agrawal. Indore was a bold choice over the usual IT hubs.",
    kind: "company",
    source: { label: "Udyam registration certificate; Walkover Insights, Nov 2019", href: "https://medium.com/walkover-insights/walkover-a-journey-to-innovation-aba695c1aefe" },
  },
  {
    year: "2011",
    title: "A rule change, and no investors",
    body: "TRAI capped promotional SMS at 100 a day per SIM but left transactional messages out of the limit, which the founder later called “surprisingly to our advantage”. The same year he pitched investors; none bought in, and MSG91 stayed bootstrapped.",
    kind: "milestone",
    source: { label: "TRAI press release 49/2011; founder’s essay 2019; The Grit Stories 2022", href: "https://trai.gov.in/sites/default/files/2024-09/PRESS_RELEASE_27_9.pdf" },
  },
  {
    year: "2012",
    title: "Save&Search",
    body: "A small beta: save a link with a tag and get it back by email. “We haven’t thought about monetizing yet,” the team told YourStory.",
    kind: "experiment",
    source: { label: "YourStory, May 2012 (archived)", href: "https://web.archive.org/web/20201124173122/https://yourstory.com/2012/05/savesearch-for-search-results-you-want-to-check-upon-later" },
  },
  {
    year: "2014",
    title: "Four years old, fifty people",
    body: "Walkover marked its fourth anniversary as a team of about fifty, and Giddh was already online as accounting software. “Every Walker must be a great designer,” Pushpendra said at the time.",
    kind: "milestone",
    source: { label: "Walkover press release, PRWeb, 26 Jun 2014", href: "https://www.prweb.com/releases/a_day_with_an_it_startup_in_a_non_it_city/prweb11973210.htm" },
  },
  {
    year: "2016",
    title: "Socket, Giddh, and an acquisition",
    body: "Socket appeared, describing itself as “Google tag manager for APIs”; it grew into viaSocket. Giddh was publicly released in May. In October, MSG91 acquired the Kolkata-based SMS company ToSMS.",
    kind: "launch",
    source: { label: "viasocket.com, Apr 2016 (archived); PR Newswire, May 2016; Inc42, Oct 2016", href: "https://inc42.com/buzz/msg91-acquires-tosms/" },
  },
  {
    year: "2019",
    title: "A stall at MWC Barcelona",
    body: "MSG91 took a stall at Mobile World Congress in Barcelona. The team’s write-up admits they spent more time on the stall than anywhere else.",
    kind: "milestone",
    source: { label: "MSG91 blog, Mar 2019 (archived)", href: "https://web.archive.org/web/2019/https://msg91.com/blog/what-happened-at-mwc19/" },
  },
  {
    year: "2020",
    title: "Working from anywhere",
    body: "When the pandemic hit, Walkover went remote. The homepage described “a team of 150+ Spartans working remotely”, with sane hours and room for passions.",
    kind: "milestone",
    source: { label: "walkover.in, Sep 2020 (archived); Walkover Insights, Nov 2020", href: "https://web.archive.org/web/20200922063629/https://walkover.in/" },
  },
  {
    year: "2021",
    title: "Walkover University, and the hills",
    body: "A free six-week programme to train young people for the industry, no engineering degree required. Some of the team also spent a month working from a cottage near Kullu.",
    kind: "milestone",
    source: { label: "walkover.in/university (archived); Walkover Insights, Dec 2021", href: "https://web.archive.org/web/20211129121554/https://www.walkover.in/university/" },
  },
  {
    year: "2024",
    title: "ISO/IEC 27001 for MSG91",
    body: "MSG91’s information security management was certified to ISO/IEC 27001:2022.",
    kind: "milestone",
    source: { label: "Certificate KDACI202407014 (msg91.com)", href: "https://msg91.com/certificates" },
  },
  {
    year: "Now",
    title: "Communication, and a lot of AI",
    body: "Walkover calls itself a communication and AI startup. viaSocket now connects AI agents to apps, and GTWY, 50 Agents and DocStar put AI to work, with Embarko in beta next door.",
    kind: "launch",
    source: { label: "walkover.in and each product’s site, Oct 2026", href: "/products/" },
  },
];

/** Why “Walkover”? In a co-founder’s words. */
export const nameStory = {
  quote: "We tried many things… succeeded several times, but we kept moving. This is how the name Walkover struck us. Be it a success or learning, simply Walkover!",
  who: "Shubhendra Agrawal",
  source: { label: "Purshology interview, Feb 2021", href: "https://www.purshology.com/2021/02/founder-interview-with-mr-shubhendra-agrawal-ceo-co-founder-of-walkover/" },
};

/** Freedom, in Walkover's own words (Walkover YouTube channel, 9 Jun 2021). */
export const freedomQuote = {
  quote:
    "Freedom equals responsibility that in turn equals accountability & ownership. And a sense of ownership is the most powerful weapon our team has. We don’t strive for perfection, we strive to put in the effort.",
  source: { label: "“Freedom + Responsibility at Walkover”, Walkover on YouTube, 9 Jun 2021", href: "https://www.youtube.com/watch?v=iAJn9pIyJws" },
  videoId: "iAJn9pIyJws",
};
