/**
 * Verified Walkover products (research: docs/RESEARCH.md, checked 16 Oct 2026).
 *
 * Brand colours were read from each product's own logo files and live CSS.
 * `source` records where every official hex came from. Values marked
 * "derived" are NOT official: they are lighter tints of the official colour,
 * made only so text stays readable on the dark (night sketchbook) theme.
 */

export type ProductSlug = "msg91" | "viasocket" | "giddh" | "gtwy" | "thingsofbrand" | "50agents" | "docstar" | "embarko";

export interface BrandTokens {
  /** Official primary colour. */
  primary: string;
  /** Text/fill colour placed on `primary`. */
  onPrimary: string;
  /** Official secondary or accent colour, if the product has one. */
  accent: string;
  /** Text/fill colour placed on `accent`. */
  onAccent: string;
  /** Light page tint taken from the product's own CSS. */
  surface: string;
  /** Ink colour the product uses for body text. */
  ink: string;
  /** Derived: primary lifted for dark backgrounds (not official). */
  primaryOnDark: string;
  /** Derived: dark surface tinted toward the primary (not official). */
  surfaceDark: string;
  /** Where each official value comes from. */
  source: string;
}

export interface Product {
  slug: ProductSlug;
  name: string;
  /** One line, in our words, of what it is. */
  tagline: string;
  /** Category used in menus. */
  kind: string;
  url: string;
  logo: { src: string; width: number; height: number; alt: string };
  /** Logo needs a light sticker behind it because it is dark/monochrome. */
  status: "live" | "beta";
  relationship: string;
  audience: string;
  problem: { heading: string; body: string };
  /** Verified capabilities, paraphrased from the product's own site. */
  features: Array<{ title: string; body: string }>;
  useCases: string[];
  /** Figures the product publishes about itself. Always shown with attribution. */
  claims?: { text: string; source: string };
  links: Array<{ label: string; href: string; primary?: boolean }>;
  brand: BrandTokens;
  /** A one-sentence hook for the story scene on its page. */
  storyLine: string;
  checked: string;
}

const CHECKED = "16 October 2026";

export const products: Product[] = [
  {
    slug: "msg91",
    name: "MSG91",
    tagline: "Messaging APIs for SMS, WhatsApp, email, voice, RCS and OTP, with a contact centre on top.",
    kind: "Customer communication",
    url: "https://msg91.com/in",
    logo: { src: "/brand/products/msg91.svg", width: 310, height: 100, alt: "MSG91 logo" },
    status: "live",
    relationship: "Built and run by Walkover Web Solutions Pvt Ltd, as stated in the msg91.com footer.",
    audience: "Businesses and developers who need to reach customers reliably, from one-time passwords to support chats.",
    problem: {
      heading: "A customer is waiting for a code.",
      body: "Sign-ups, payments and deliveries all depend on a message arriving on time, on whichever channel the customer actually reads. Wiring up each channel separately is slow, and every gap shows up as a lost customer.",
    },
    features: [
      { title: "One set of channel APIs", body: "SMS, RCS, email, WhatsApp, voice and virtual numbers, all through MSG91's APIs." },
      { title: "OTP and verification", body: "Multichannel one-time passwords and magic links for sign-in and verification." },
      { title: "Hello", body: "A ticketing and chat contact centre for support teams." },
      { title: "Campaign", body: "Event-based automation that sends the right message when something happens in your product." },
      { title: "Segmento", body: "A customer data platform to group and target audiences." },
      { title: "Utilities", body: "URL shortener, knowledge base, file hosting and reports." },
    ],
    useCases: ["Sign-up and login OTPs", "Order and delivery updates", "Two-way WhatsApp support", "Event-triggered campaigns"],
    claims: {
      text: "Trusted by 30,000+ global businesses · 2.5 billion+ API calls a month · 1 billion+ OTPs a month",
      source: "msg91.com/in, October 2026",
    },
    links: [
      { label: "Start on MSG91", href: "https://msg91.com/signup", primary: true },
      { label: "Read the docs", href: "https://docs.msg91.com/overview" },
      { label: "Visit msg91.com", href: "https://msg91.com/in" },
    ],
    brand: {
      primary: "oklch(54.78% 0.1332 247.92)",
      onPrimary: "oklch(100% 0 0)",
      accent: "oklch(46.24% 0.1378 254.52)",
      onAccent: "oklch(100% 0 0)",
      surface: "oklch(94.92% 0.0252 249.95)",
      ink: "oklch(25.95% 0.0482 258.68)",
      primaryOnDark: "oklch(74.32% 0.1057 244.3)",
      surfaceDark: "oklch(22.13% 0.0315 249.42)",
      source: "Logo fill #1E75BA and CSS --accent-color; #1258A3 from --sms-dark-color; #E2F0FF from --sms-lite-color; #15243B from --text (msg91.com).",
    },
    storyLine: "A code leaves a server in Indore and reaches the right phone, on the right channel, while the customer is still looking at the screen.",
    checked: CHECKED,
  },
  {
    slug: "viasocket",
    name: "viaSocket",
    tagline: "An integration layer that connects your product and your AI agents to thousands of apps.",
    kind: "Integrations & automation",
    url: "https://viasocket.com",
    logo: { src: "/brand/products/viasocket.svg", width: 312, height: 92, alt: "viaSocket logo" },
    status: "live",
    relationship: "Built by Walkover Web Solutions Pvt Ltd, as stated in the viasocket.com footer.",
    audience: "SaaS teams and developers building AI agents who need their users' apps connected without building OAuth and webhook plumbing.",
    problem: {
      heading: "Every customer asks for one more integration.",
      body: "Each new app means another OAuth registration, token refresh, webhook and retry policy to maintain. The integration backlog quietly becomes a second product.",
    },
    features: [
      { title: "Thousands of apps", body: "viaSocket lists 2,300+ apps that can be connected, set up from a single prompt you paste into your coding assistant." },
      { title: "Managed OAuth", body: "It stores each user's grant and refreshes it, so you do not register OAuth apps yourself." },
      { title: "Triggers and webhooks", body: "Polling and retries are handled for you, with handlers running in a sandbox." },
      { title: "Embeddable screens", body: "Prebuilt integration screens that carry your own logo, colours and domain." },
      { title: "Plug Builder", body: "Build a custom connector when the app you need is not listed yet." },
      { title: "Logs and monitoring", body: "See what ran, what failed and why." },
    ],
    useCases: ["Integrations inside a SaaS product", "Tools for AI agents", "Workflow automation across apps"],
    claims: { text: "2,300+ apps · 50+ AI models", source: "viasocket.com, October 2026" },
    links: [
      { label: "Start free on viaSocket", href: "https://flow.viasocket.com/integrations", primary: true },
      { label: "See pricing", href: "https://viasocket.com/developers/pricing" },
      { label: "Visit viasocket.com", href: "https://viasocket.com" },
    ],
    brand: {
      primary: "oklch(47.49% 0.1739 31.19)",
      onPrimary: "oklch(100% 0 0)",
      accent: "oklch(66.58% 0.1574 58.32)",
      onAccent: "oklch(17.85% 0.0041 285.98)",
      surface: "oklch(98.48% 0.0013 106.42)",
      ink: "oklch(17.85% 0.0041 285.98)",
      primaryOnDark: "oklch(68.43% 0.1704 32.01)",
      surfaceDark: "oklch(19.46% 0.0173 31.49)",
      source: "#A8200D from the viaSocket favicon mark and CSS --accent-border-color; #111113, #FAFAF9 and amber #D97706 from the current homepage CSS (viasocket.com).",
    },
    storyLine: "One plug, many sockets: a product reaches the apps its users already live in without growing a tangle of wires.",
    checked: CHECKED,
  },
  {
    slug: "giddh",
    name: "Giddh",
    tagline: "Cloud accounting with GST, invoicing, inventory and many companies under one login.",
    kind: "Accounting",
    url: "https://giddh.com/in",
    logo: { src: "/brand/products/giddh.svg", width: 254, height: 50, alt: "Giddh logo" },
    status: "live",
    relationship: "Part of the Walkover group; giddh.com's footer names Walkover Technologies Pvt Ltd at Walkover's Indore address.",
    audience: "Small and growing businesses, accountants and groups that run several companies.",
    problem: {
      heading: "The books never quite match the bank.",
      body: "Invoices in one place, GST in another, stock in a spreadsheet and the bank statement somewhere else. Closing the month turns into detective work.",
    },
    features: [
      { title: "Ledger-based accounting", body: "Work straight in ledgers instead of hopping between voucher screens." },
      { title: "GST and e-invoicing", body: "GST compliance with automated filing support and e-invoices." },
      { title: "Many companies, one subscription", body: "Giddh says you can manage over 100 companies under one plan." },
      { title: "Multi-currency", body: "Automatic currency conversion for businesses that trade across borders." },
      { title: "Bank reconciliation and inventory", body: "Match bank entries and keep stock in the same books." },
      { title: "Apps everywhere", body: "Android, iOS, Mac and Windows apps, plus Tally sync and a Shopify integration." },
    ],
    useCases: ["GST-ready invoicing", "Multi-entity groups", "Inventory with accounts", "Moving from Tally"],
    links: [
      { label: "Try Giddh", href: "https://giddh.com/in/signup", primary: true },
      { label: "Help centre", href: "https://giddh.com/help" },
      { label: "Visit giddh.com", href: "https://giddh.com/in" },
    ],
    brand: {
      primary: "oklch(29.62% 0.1321 272.77)",
      onPrimary: "oklch(100% 0 0)",
      accent: "oklch(50.33% 0.1685 274.65)",
      onAccent: "oklch(100% 0 0)",
      surface: "oklch(97.5% 0.012 281.09)",
      ink: "oklch(22.64% 0 0)",
      primaryOnDark: "oklch(74.95% 0.1139 278.83)",
      surfaceDark: "oklch(20.22% 0.0437 277.8)",
      source: "#1B1F6D from CSS --col-primary (buttons); logo navy #1A237E; #4B55C2 from --col-blue; #F5F6FF from --col-extra-light-blue (giddh.com).",
    },
    storyLine: "Receipts drift in from everywhere; the ledger catches each one until both sides of the scale finally sit level.",
    checked: CHECKED,
  },
  {
    slug: "gtwy",
    name: "GTWY AI",
    tagline: "Infrastructure for shipping AI agents inside your own product, under your own brand.",
    kind: "AI agent infrastructure",
    url: "https://gtwy.ai",
    logo: { src: "/brand/products/gtwy.svg", width: 96, height: 74, alt: "GTWY logo" },
    status: "live",
    relationship: "“Built by Walkover”, per the gtwy.ai footer. GTWY says it runs agent features in production at viaSocket and MSG91.",
    audience: "Software platforms that want their customers to build and run their own agents.",
    problem: {
      heading: "Your customers want agents. You want to keep shipping your product.",
      body: "Building agent infrastructure means model routing, isolation between customers, integrations and usage billing, all before the first useful agent runs.",
    },
    features: [
      { title: "Agent Embed", body: "An agent builder that lives inside your product for your customers to use." },
      { title: "Isolation per customer", body: "Each customer's agents and tokens are kept separate from everyone else's." },
      { title: "White-label", body: "No GTWY logo and no “powered by” line." },
      { title: "Model fallback", body: "Multi-model routing that falls back when a model is unavailable." },
      { title: "Usage API", body: "Per-customer usage figures you can bill against." },
    ],
    useCases: ["Customer-built agents in a SaaS app", "Chat UI on your own domain", "Agent features billed per customer"],
    claims: { text: "400+ business customers building agents · 4 lakh runs a month", source: "gtwy.ai, October 2026" },
    links: [
      { label: "Try the sandbox", href: "https://gtwy.ai/agent-embed/sandbox/", primary: true },
      { label: "Resources", href: "https://gtwy.ai/resources" },
      { label: "Visit gtwy.ai", href: "https://gtwy.ai" },
    ],
    brand: {
      primary: "oklch(20.81% 0.0153 261.6)",
      onPrimary: "oklch(100% 0 0)",
      accent: "oklch(82.03% 0.1509 81.6)",
      onAccent: "oklch(20.81% 0.0153 261.6)",
      surface: "oklch(96.7% 0.0029 264.54)",
      ink: "oklch(20.81% 0.0153 261.6)",
      primaryOnDark: "oklch(82.03% 0.1509 81.6)",
      surfaceDark: "oklch(17.67% 0.0114 260.64)",
      source: "#14181F from CSS --gt-ink; amber #F5B93B from --gt-amber-500 on primary buttons; #F3F4F6 from --embed-ground; #0E1116 from --gt-graphite-900 (gtwy.ai).",
    },
    storyLine: "Through one arch, every customer's agents find their own way, and none of them wander into a neighbour's house.",
    checked: CHECKED,
  },
  {
    slug: "thingsofbrand",
    name: "Things of Brand",
    tagline: "A home for brand assets, so designers and developers always use the real logo.",
    kind: "Brand assets",
    url: "https://thingsofbrand.com",
    logo: { src: "/brand/products/thingsofbrand.svg", width: 160, height: 48, alt: "Things of Brand logo" },
    status: "live",
    relationship: "Listed by Walkover on walkover.in/products; Walkover products serve their own assets from it.",
    audience: "Brands, designers and developers who need correct, current brand files.",
    problem: {
      heading: "Somebody is using last year's logo.",
      body: "Logos get copied from search results, stretched and recoloured. Nobody can be sure which file is the real one.",
    },
    features: [
      { title: "Explore brands", body: "Search a directory of brands and their assets." },
      { title: "Verify your brand", body: "Brand owners can verify their page so people know the assets are authentic." },
      { title: "Collections and APIs", body: "Group assets into collections and fetch them through APIs." },
    ],
    useCases: ["A single source of truth for logos", "Pulling brand assets into apps via API"],
    links: [
      { label: "Explore Things of Brand", href: "https://thingsofbrand.com/explore", primary: true },
      { label: "Sign up", href: "https://thingsofbrand.com/signup" },
    ],
    brand: {
      primary: "oklch(48.32% 0.2546 283.23)",
      onPrimary: "oklch(100% 0 0)",
      accent: "oklch(74.89% 0.1972 316.7)",
      onAccent: "oklch(27.27% 0.032 263.82)",
      surface: "oklch(96.26% 0.0204 298.2)",
      ink: "oklch(27.27% 0.032 263.82)",
      primaryOnDark: "oklch(71.26% 0.1657 293.24)",
      surfaceDark: "oklch(20.51% 0.0505 291.97)",
      source: "#5928E5 from the logo fill and CSS classes; #DE80FF and #7C5CFF from its gradient; #1F2737 text (thingsofbrand.com). Surface #F4F0FF is derived.",
    },
    storyLine: "A drawer full of logos, and only the verified one gets pulled out and handed over.",
    checked: CHECKED,
  },
  {
    slug: "50agents",
    name: "50 Agents",
    tagline: "No-code AI agents you create by describing the task, working across thousands of apps.",
    kind: "No-code AI agents",
    url: "https://50agents.com",
    logo: { src: "/brand/products/50agents.png", width: 360, height: 360, alt: "50 Agents logo" },
    status: "live",
    relationship: "“A product by Walkover”, per the 50agents.com footer.",
    audience: "People in marketing, HR, sales and operations who want automation without writing code.",
    problem: {
      heading: "The same ten-minute task, every single morning.",
      body: "Copying leads, summarising updates, moving data between apps. Small jobs that are too dull to do by hand and too fiddly to automate without an engineer.",
    },
    features: [
      { title: "Describe it, get an agent", body: "Type what you want done in plain language and 50 Agents builds the agent." },
      { title: "Works across apps", body: "Agents act inside the apps you already use; the site cites 5,000+ apps." },
      { title: "Clear logs", body: "Real-time tracking and logs show what each agent did." },
      { title: "Error handling", body: "Built-in handling for when a step fails." },
      { title: "Chrome extension and dashboard", body: "Run and manage agents from the browser or a dashboard." },
    ],
    useCases: ["Daily summaries", "Lead hand-offs", "Moving data between tools"],
    links: [{ label: "Get started with 50 Agents", href: "https://50agents.com", primary: true }],
    brand: {
      primary: "oklch(43.1% 0.2095 292.98)",
      onPrimary: "oklch(100% 0 0)",
      accent: "oklch(55.76% 0.2877 302.3)",
      onAccent: "oklch(100% 0 0)",
      surface: "oklch(98.67% 0.0041 301.43)",
      ink: "oklch(16.09% 0.0336 296.86)",
      primaryOnDark: "oklch(73.68% 0.142 299.36)",
      surfaceDark: "oklch(18.96% 0.0422 297.6)",
      source: "#5B21B5 from CSS --primary-color (primary buttons); #9810FA from its blue-to-purple gradient; #FBFAFD from --background-gray-base (50agents.com). Ink is derived.",
    },
    storyLine: "One sentence goes in; a small crew of helpers runs off to the right apps and comes back with every box ticked.",
    checked: CHECKED,
  },
  {
    slug: "docstar",
    name: "DocStar",
    tagline: "One place for API docs, help centres and blogs, with AI that drafts alongside you.",
    kind: "Documentation",
    url: "https://docstar.io",
    logo: { src: "/brand/products/docstar.png", width: 500, height: 500, alt: "DocStar logo" },
    status: "live",
    relationship: "“A product by Walkover”, per the docstar.io footer. Several walkover.in pages are themselves built with DocStar.",
    audience: "Product, support and developer teams who publish documentation.",
    problem: {
      heading: "The answer exists. Nobody can find it.",
      body: "Knowledge lives in chats, tickets and half-finished pages. Customers ask support what the docs should have told them.",
    },
    features: [
      { title: "AI drafting", body: "Draft pages with AI and keep them current through webhooks." },
      { title: "Knowledge base", body: "Help centres and FAQs with page analytics and smart navigation." },
      { title: "API docs", body: "Interactive API references with a playground and token management." },
      { title: "Blog", body: "Publish on a custom domain, subdomain or sub-path, in several languages." },
      { title: "SEO-friendly", body: "Clean URLs and metadata for every page." },
      { title: "CLI", body: "A DocStar CLI for working from the terminal." },
    ],
    useCases: ["Developer docs", "Customer help centre", "Product blog"],
    links: [
      { label: "Start building free", href: "https://app.docstar.io/login", primary: true },
      { label: "For developers", href: "https://developers.docstar.io/" },
      { label: "Visit docstar.io", href: "https://docstar.io" },
    ],
    brand: {
      primary: "oklch(16.84% 0 0)",
      onPrimary: "oklch(100% 0 0)",
      accent: "oklch(62.31% 0.188 259.81)",
      onAccent: "oklch(100% 0 0)",
      surface: "oklch(98.46% 0.0017 247.84)",
      ink: "oklch(21.01% 0.0318 264.66)",
      primaryOnDark: "oklch(96.7% 0.0029 264.54)",
      surfaceDark: "oklch(18.2% 0.0044 264.46)",
      source: "#0F0F0F from the logo; #111827 from --app-text; #F9FAFB from --app-bg-secondary; blue #3B82F6 is the end of its UI gradient (docstar.io).",
    },
    storyLine: "Loose notes are caught mid-air and filed into one tidy, searchable page.",
    checked: CHECKED,
  },
  {
    slug: "embarko",
    name: "Embarko",
    tagline: "Instant hosting for apps you build with AI: paste a prompt, get a live link.",
    kind: "Hosting for AI-built apps",
    url: "https://embarko.ai",
    logo: { src: "/brand/products/embarko.svg", width: 245, height: 245, alt: "Embarko logo" },
    status: "beta",
    relationship:
      "Operated by SuperHeroes Inc. from Walkover's Indore office, with a walkover.in contact (embarko.ai terms). Not yet listed on walkover.in; shown here as an experiment from the same building.",
    audience: "People and teams who build apps with AI coding tools and want them online without setting up cloud services.",
    problem: {
      heading: "The app works on your laptop. Now what?",
      body: "AI can write an app in an afternoon. Putting it online still means domains, databases and consoles that the person who built it never asked to learn.",
    },
    features: [
      { title: "Prompt to live link", body: "Copy Embarko's prompt into your AI tool and get a live address on embarko.app." },
      { title: "Live today", body: "Domain, database, connected tools, uptime, and logs with fixes." },
      { title: "On the way", body: "Embarko lists email, login, files, backups, private sharing and schedules as upcoming." },
    ],
    useCases: ["Publishing an AI-built prototype", "Internal tools without a cloud console"],
    links: [
      { label: "Read the Embarko docs", href: "https://embarko.ai/docs", primary: true },
      { label: "Visit embarko.ai", href: "https://embarko.ai" },
    ],
    brand: {
      primary: "oklch(21.64% 0.0091 255.61)",
      onPrimary: "oklch(100% 0 0)",
      accent: "oklch(21.34% 0.006 91.63)",
      onAccent: "oklch(100% 0 0)",
      surface: "oklch(96.68% 0.0054 95.1)",
      ink: "oklch(21.34% 0.006 91.63)",
      primaryOnDark: "oklch(93.67% 0.0096 93.57)",
      surfaceDark: "oklch(18.64% 0.008 95.48)",
      source: "#171A1E from the logo; #1A1916 ink, #F5F4F0 background and dark #14130F from its CSS (embarko.ai). Its brand is monochrome.",
    },
    storyLine: "A paper boat folded from a prompt, pushed off the desk, and docking at a live address.",
    checked: CHECKED,
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);

export interface Experiment {
  name: string;
  what: string;
  /** What became of it, only where a source says so. */
  outcome?: string;
  evidence: string;
}

/**
 * Ideas Walkover tried, retired or grew into something else. History only:
 * never shown as current products. Main source: "Walkover — A Journey To
 * Innovation!" (Walkover Insights, 13 Nov 2019) and "A Look Back At 2021"
 * (Walkover Insights, 24 Dec 2021).
 */
export const pastExperiments: Experiment[] = [
  { name: "HostnSoft", what: "A domain registration platform: the very first idea the founders worked on.", evidence: "Walkover Insights, Nov 2019" },
  { name: "Whozzat", what: "A social media platform.", evidence: "Walkover Insights, Nov 2019" },
  { name: "UtterU", what: "A VoIP communication tool; later a calls-and-SMS bridge powered by MSG91.", evidence: "Walkover Insights, Nov 2019; Chrome Web Store listing" },
  { name: "Save&Search", what: "Described by Walkover as an SEO service platform; a 2012 beta saved tagged links.", evidence: "Walkover Insights, Nov 2019; YourStory, May 2012" },
  { name: "Socket", what: "An API middleware that made third-party integrations easy.", outcome: "Grew into viaSocket.", evidence: "Walkover Insights, Nov 2019 and Dec 2021" },
  { name: "DotSALE", what: "A point-of-sale system for modern retail and food businesses.", evidence: "Walkover Insights, Nov 2019" },
  { name: "SPACE", what: "A team collaboration app built around tasks, files and conversations.", evidence: "Walkover Insights, Nov 2019 and Dec 2021" },
  { name: "Bingage", what: "Marketing automation for restaurants, retail and salons.", evidence: "Walkover Insights, Nov 2019" },
  { name: "Muneem", what: "Accounting as a service: dedicated bookkeepers for small businesses.", evidence: "Walkover Insights, Nov 2019; muneem.co" },
  { name: "Human Fuel & half kg", what: "Healthy snacks, then a curated grocery store, started after a run of health sessions.", evidence: "Walkover Insights, Dec 2021" },
  { name: "Handpicked.life", what: "A curated online shop focused on quality and sustainability.", evidence: "Walkover Insights, Dec 2021" },
  { name: "Feedio", what: "A tool for collecting and managing feature requests.", evidence: "Product Hunt, May 2021" },
  { name: "UserTable", what: "An internal table for MSG91's sign-up leads, built instead of a heavy CRM.", evidence: "Walkover GitHub repository (2017–18)" },
];
