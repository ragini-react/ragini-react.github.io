import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { jobs } from "@/content/jobs";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const pages = [
  "/",
  "/about/",
  "/about/culture-we-foster/",
  "/about/privacy-policy/",
  "/products/",
  "/freedom/",
  "/life/",
  "/ideas/",
  "/stories/",
  "/future/",
  "/games/",
  "/recommends/",
  "/blog/",
  "/careers/",
  "/contact/",
  "/newsletter/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date();
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p), lastModified: built, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: absoluteUrl(`/products/${p.slug}/`), lastModified: built, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...jobs.map((j) => ({ url: absoluteUrl(`/careers/${j.slug}/`), lastModified: new Date(j.publishedOn), changeFrequency: "weekly" as const, priority: 0.5 })),
  ];
}
