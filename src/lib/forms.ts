/**
 * Browser-side form helpers. The site is a static export, so forms POST JSON
 * straight to an endpoint configured at build time. A submission only counts
 * as successful when that endpoint answers 2xx; anything else is an error.
 */

export const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "";
export const NEWSLETTER_ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || "";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value: string): boolean {
  return EMAIL.test(value.trim()) && value.length <= 254;
}

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

export interface ContactInput {
  name: string;
  email: string;
  topic: string;
  message: string;
  website: string; // honeypot, must stay empty
}

export function validateContact(input: ContactInput): FieldErrors<keyof ContactInput> {
  const errors: FieldErrors<keyof ContactInput> = {};
  if (input.name.trim().length < 2) errors.name = "Please tell us your name.";
  else if (input.name.length > 120) errors.name = "That name is longer than we can store (120 characters).";
  if (!isEmail(input.email)) errors.email = "Please enter an email address we can reply to, like you@example.com.";
  if (!input.topic) errors.topic = "Please pick what this is about.";
  if (input.message.trim().length < 10) errors.message = "A few more words, please (at least 10 characters).";
  else if (input.message.length > 4000) errors.message = "Please keep it under 4,000 characters.";
  return errors;
}

export class SubmitError extends Error {}

/** POST JSON and resolve only on a 2xx answer. Times out after 15 s. */
export async function postJson(endpoint: string, body: unknown): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) throw new SubmitError(`The server answered ${res.status}.`);
  } catch (err) {
    if (err instanceof SubmitError) throw err;
    if ((err as Error).name === "AbortError") throw new SubmitError("The request took too long.");
    throw new SubmitError("We couldn't reach the server.");
  } finally {
    clearTimeout(timer);
  }
}

/** mailto: link with a pre-filled subject and body, used when no endpoint is configured. */
export function mailtoHref(to: string, subject: string, body: string): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Mailchimp's embedded-form endpoint. Accepts the list's form action
 * (https://<dc>.list-manage.com/subscribe/post?u=…&id=…) and talks to its
 * post-json variant over JSONP, because Mailchimp does not allow CORS.
 * Resolves only when Mailchimp answers result: "success".
 */
export const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL || "";

export function subscribeMailchimp(formAction: string, email: string, tags?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let url: URL;
    try {
      url = new URL(formAction.replace("/subscribe/post?", "/subscribe/post-json?"));
    } catch {
      reject(new SubmitError("The newsletter address is misconfigured."));
      return;
    }
    if (!/\.list-manage\.com$/.test(url.hostname)) {
      reject(new SubmitError("The newsletter address is misconfigured."));
      return;
    }
    const cb = `wkmc_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    url.searchParams.set("EMAIL", email);
    if (tags) url.searchParams.set("tags", tags);
    url.searchParams.set("c", cb);
    const script = document.createElement("script");
    const w = window as unknown as Record<string, unknown>;
    const cleanup = () => {
      delete w[cb];
      script.remove();
      clearTimeout(timer);
    };
    const timer = setTimeout(() => {
      cleanup();
      reject(new SubmitError("The request took too long."));
    }, 15000);
    w[cb] = (data: { result?: string; msg?: string }) => {
      cleanup();
      // Mailchimp messages can contain HTML; keep only the text.
      const msg = String(data?.msg ?? "").replace(/<[^>]*>/g, "").replace(/^\d+\s*-\s*/, "");
      if (data?.result === "success") resolve(msg);
      else reject(new SubmitError(msg || "The list did not accept that address."));
    };
    script.onerror = () => {
      cleanup();
      reject(new SubmitError("We couldn't reach the newsletter service."));
    };
    script.src = url.toString();
    document.body.appendChild(script);
  });
}
