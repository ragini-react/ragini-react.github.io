import type { Metadata } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://walkover.in").replace(/\/$/, "");
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";
export const SITE_NAME = "Walkover";

/** Absolute canonical URL for a route path, always with a trailing slash (matches the export). */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const withSlash = clean.endsWith("/") || clean.includes("#") || /\.[a-z0-9]+$/i.test(clean) ? clean : `${clean}/`;
  return `${SITE_URL}${withSlash}`;
}

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
}

/** Unique title, description, self-referencing canonical, OG and Twitter tags for one page. */
export function pageMeta({ title, description, path, image, type = "website", publishedTime, noindex }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? "/og/walkover.png";
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: NOINDEX || noindex ? { index: false, follow: !NOINDEX } : undefined,
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: "en_IN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
