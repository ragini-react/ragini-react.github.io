import type { NextConfig } from "next";

// The site is exported as static files (GitHub Pages or any static host).
// BASE_PATH is only needed when the site lives under a sub-path,
// e.g. USERNAME.github.io/REPOSITORY. Leave it empty for walkover.in.
const basePath = (process.env.BASE_PATH ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
