import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/contact/ContactForm";
import { company } from "@/content/company";
import { products } from "@/content/products";
import { pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./contact.module.scss";

const DESCRIPTION = `Contact Walkover: write to ${company.email}, call ${company.phone}, or visit LIC Tower, Indore. Product support links for MSG91, viaSocket, Giddh and more.`;

export const metadata = pageMeta({ title: "Contact", description: DESCRIPTION, path: "/contact/" });

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Contact Walkover", description: DESCRIPTION, path: "/contact/", type: "ContactPage" })} />
      <PageHero
        trail={[{ name: "Contact", path: "/contact/" }]}
        eyebrow="contact"
        title={
          <>
            Write to us.
            <br />
            Rough notes welcome.
          </>
        }
        lede={<p>A question, an idea, a partnership, or just hello. Pick a topic and it reaches the right people.</p>}
      />
      <section className="section-tight" aria-label="Contact form">
        <div className="wrap">
          <ContactForm />
        </div>
      </section>
      <section className="section sheet" aria-labelledby="other">
        <div className={`wrap ${s.grid}`}>
          <div>
            <h2 id="other" className={s.h}>
              Other ways in
            </h2>
            <dl className={s.list}>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </dd>
              <dt>Phone</dt>
              <dd>
                <a href={company.phoneHref}>{company.phone}</a> · {company.callHours}
              </dd>
              <dt>Visit</dt>
              <dd>
                <address>
                  {company.legalName}
                  <br />
                  {company.address.lines.join(", ")}
                </address>
                <a href={company.address.map} rel="noopener">
                  Open in Google Maps
                </a>
              </dd>
              <dt>Jobs</dt>
              <dd>
                Applications go through the <a href={company.careersPortal}>careers portal</a>, not this form.
              </dd>
            </dl>
          </div>
          <div>
            <h2 className={s.h}>Product support</h2>
            <p className="muted" style={{ marginTop: "0.5rem" }}>
              Each product has its own team and help desk. These go straight to them:
            </p>
            <ul className={s.support}>
              {products.map((p) => {
                const help = p.links.find((l) => /help|docs|resources/i.test(l.label)) ?? p.links[p.links.length - 1];
                return (
                  <li key={p.slug}>
                    <a href={help.href} rel="noopener">
                      {p.name}: {help.label.toLowerCase()}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
