import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { company } from "@/content/company";
import { products } from "@/content/products";
import { pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./privacy.module.scss";

const DESCRIPTION = "How walkover.in handles your data: no cookies, no analytics, what the forms send and where, and how to reach us about privacy.";

export const metadata = pageMeta({ title: "Privacy Policy", description: DESCRIPTION, path: "/about/privacy-policy/" });

const UPDATED = "16 October 2026";

export default function PrivacyPage() {
  return (
    <article className="section-tight">
      <JsonLd data={webPageSchema({ name: "Privacy Policy", description: DESCRIPTION, path: "/about/privacy-policy/" })} />
      <div className={`wrap wrap-text ${s.doc}`}>
        <Breadcrumbs
          trail={[
            { name: "Our Story", path: "/about/" },
            { name: "Privacy Policy", path: "/about/privacy-policy/" },
          ]}
        />
        <p className="eyebrow">plain-language privacy</p>
        <h1>Privacy on this website</h1>
        <p className="lede">
          This notice covers walkover.in only. Each Walkover product (MSG91, viaSocket, Giddh and the rest) has its own privacy
          policy on its own site. Last updated {UPDATED}.
        </p>

        <h2>The short version</h2>
        <ul>
          <li>This website sets no cookies and runs no analytics or advertising trackers.</li>
          <li>It only sends your details anywhere when you fill in a form and press the button.</li>
          <li>Fonts and images are served from this website itself.</li>
        </ul>

        <h2>What your browser stores</h2>
        <p>
          One item in your browser’s session storage, called <code>wk-intro-seen</code>, remembers that you have already seen
          the opening animation, so it doesn’t replay on every visit. It disappears when you close the tab, and it never
          leaves your device.
        </p>

        <h2>Forms</h2>
        <p>
          <b>Contact form.</b> If the form is connected to our message service, your name, email, topic and message are sent
          to it so we can read and answer them. If it isn’t, the form opens your own email app with a message to{" "}
          {company.email}; nothing is sent until you press send there.
        </p>
        <p>
          <b>Happiness Newsletter.</b> Your email address is sent to our newsletter service only when you subscribe and tick
          the consent box, and is used only to send the letter. If no service is connected, the form opens your email app with
          a request instead.
        </p>
        <p>
          <b>Sketch Prompt game.</b> Drawings stay in your browser. Saving one downloads a file to your device.
        </p>

        <h2>Other services this site talks to</h2>
        <ul>
          <li>
            <b>Careers.</b> The careers pages ask Walkover’s careers portal, run on Keka (walkover.keka.com), for the current
            list of open roles. Your browser makes that request directly, so Keka sees an ordinary web request from your
            device. Applications are made on Keka, under Keka’s terms.
          </li>
          <li>
            <b>Video.</b> The video on the Freedom page loads from YouTube’s privacy-enhanced domain, and only after you press
            play.
          </li>
          <li>
            <b>Links.</b> Links to product sites, Medium, GitHub, the Internet Archive and social networks take you to sites
            with their own privacy practices.
          </li>
        </ul>

        <h2>Your rights and questions</h2>
        <p>
          To ask what we hold about you, to correct it, or to have it deleted, write to{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a> or by post to {company.legalName}, {company.address.lines.join(", ")}.
        </p>

        <h2>Product privacy policies</h2>
        <ul className={s.products}>
          {products.map((p) => (
            <li key={p.slug}>
              <a href={p.url} rel="noopener">
                {p.name}
              </a>{" "}
              (see the privacy link in its footer)
            </li>
          ))}
        </ul>
        <p className={s.small}>
          This notice describes how the website is built. It should be reviewed by Walkover’s legal team before publication;
          see also <Link href="/contact/">Contact</Link>.
        </p>
      </div>
    </article>
  );
}
