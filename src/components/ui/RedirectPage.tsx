import Link from "next/link";
import { BASE_PATH } from "@/lib/paths";

/**
 * Static stand-in for a server redirect (GitHub Pages cannot send 301s).
 * The page carries a canonical to the target and noindex (set in its
 * metadata), refreshes immediately, and offers a plain link as a fallback.
 */
export function RedirectPage({ to, label }: { to: string; label: string }) {
  const target = `${BASE_PATH}${to}`;
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(target)} + location.search + location.hash)` }} />
      <section className="section wrap wrap-text">
        <p className="eyebrow">this page moved</p>
        <h1>Taking you to {label}…</h1>
        <p className="lede" style={{ marginTop: "1rem" }}>
          If nothing happens, <Link href={to}>continue to {label}</Link>.
        </p>
      </section>
    </>
  );
}
