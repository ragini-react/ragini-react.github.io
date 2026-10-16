import type { MetadataRoute } from "next";
import { BASE_PATH } from "@/lib/paths";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Walkover",
    short_name: "Walkover",
    description: "We Are Walkers. The Indore software company behind MSG91, viaSocket, Giddh and more.",
    start_url: `${BASE_PATH}/`,
    display: "browser",
    background_color: "#f7f2e8",
    theme_color: "#f7f2e8",
    icons: [{ src: `${BASE_PATH}/favicon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
