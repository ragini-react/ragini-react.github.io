import { products, type ProductSlug } from "./products";

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  color?: string;
  colorDark?: string;
  /** The product's own logo file, shown next to its name. */
  logo?: { src: string; width: number; height: number };
}

export interface NavGroup {
  id: string;
  label: string;
  note?: string;
  sections: Array<{ title: string; items: NavItem[]; layout?: "grid" | "list" }>;
}

const p = (slug: ProductSlug): NavItem => {
  const product = products.find((x) => x.slug === slug)!;
  return {
    label: product.status === "beta" ? `${product.name} (beta)` : product.name,
    href: `/products/${product.slug}/`,
    description: product.kind,
    color: product.brand.primary,
    colorDark: product.brand.primaryOnDark,
    logo: product.logo,
  };
};

/**
 * The header shows the logo plus exactly these three groups.
 * Every other page is reachable from inside them.
 */
export const navGroups: NavGroup[] = [
  {
    id: "products",
    label: "Products",
    note: "each one in its own colours",
    sections: [
      {
        title: "Things we build",
        layout: "grid",
        items: [
          p("msg91"),
          p("viasocket"),
          p("giddh"),
          p("gtwy"),
          p("50agents"),
          p("docstar"),
          p("thingsofbrand"),
          p("embarko"),
          { label: "All products & how they began", href: "/products/", description: "The whole shelf, plus the experiments we retired" },
        ],
      },
    ],
  },
  {
    id: "explore",
    label: "Explore",
    note: "wander a little",
    sections: [
      {
        title: "Read",
        items: [
          { label: "Journal", href: "/blog/", description: "Articles written by Walkers" },
          { label: "Stories", href: "/stories/", description: "Moments from the road so far" },
          { label: "Walkover Recommends", href: "/recommends/", description: "Things worth your attention" },
          { label: "Happiness Newsletter", href: "/newsletter/", description: "The Friday letter, opened up" },
        ],
      },
      {
        title: "Play & imagine",
        items: [
          { label: "Ideas & Contributions", href: "/ideas/", description: "How a rough idea becomes a thing" },
          { label: "Future & Experiments", href: "/future/", description: "What's in the oven, labelled honestly" },
          { label: "Games", href: "/games/", description: "Two small games for a short break" },
        ],
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    note: "hello from Indore",
    sections: [
      {
        title: "Who we are",
        items: [
          { label: "Our Story", href: "/about/", description: "From a hosting desk to a family of products" },
          { label: "Culture We Foster", href: "/about/culture-we-foster/", description: "Our ten values, in our words" },
          { label: "Freedom", href: "/freedom/", description: "Room to think, say and try" },
          { label: "Life at Walkover", href: "/life/", description: "People, places, Fridays" },
        ],
      },
      {
        title: "Join or reach us",
        items: [
          { label: "Careers", href: "/careers/", description: "Open roles, pulled live" },
          { label: "Contact", href: "/contact/", description: "Write to us or visit" },
          { label: "Privacy", href: "/about/privacy-policy/", description: "How this site handles data" },
        ],
      },
    ],
  },
];
