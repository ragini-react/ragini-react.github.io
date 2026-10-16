import { RedirectPage } from "@/components/ui/RedirectPage";
import { absoluteUrl } from "@/lib/seo";

export const metadata = {
  title: "Careers",
  alternates: { canonical: absoluteUrl("/careers/") },
  robots: { index: false, follow: true },
};

/** Old walkover.in/career URL, kept working. */
export default function CareerRedirect() {
  return <RedirectPage to="/careers/" label="Careers" />;
}
