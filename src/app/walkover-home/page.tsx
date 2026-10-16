import { RedirectPage } from "@/components/ui/RedirectPage";
import { absoluteUrl } from "@/lib/seo";

export const metadata = {
  title: "Home",
  alternates: { canonical: absoluteUrl("/") },
  robots: { index: false, follow: true },
};

/** Old walkover.in/walkover-home URL, kept working. */
export default function HomeRedirect() {
  return <RedirectPage to="/" label="the homepage" />;
}
