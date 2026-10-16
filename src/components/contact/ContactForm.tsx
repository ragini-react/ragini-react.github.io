"use client";

import Link from "next/link";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import { Walker } from "@/components/characters/Walker";
import { cast } from "@/components/characters/cast";
import { Envelope } from "@/components/characters/props";
import { company } from "@/content/company";
import { CONTACT_ENDPOINT, mailtoHref, postJson, SubmitError, validateContact, type ContactInput, type FieldErrors } from "@/lib/forms";
import styles from "./ContactForm.module.scss";

const TOPICS = [
  { value: "product", label: "A question about a product" },
  { value: "partnership", label: "Partnership or business" },
  { value: "idea", label: "An idea for us" },
  { value: "recommend", label: "Something for Walkover Recommends" },
  { value: "press", label: "Press or research" },
  { value: "other", label: "Something else" },
];

type Status = "idle" | "sending" | "sent" | "error" | "mailto";

/**
 * Contact form. With NEXT_PUBLIC_CONTACT_ENDPOINT set, it POSTs JSON and only
 * shows success on a 2xx answer. Without it, it opens a pre-filled email and
 * says so plainly. The mailbox flag goes up only after a confirmed send.
 */
export function ContactForm() {
  const [values, setValues] = useState<ContactInput>({ name: "", email: "", topic: "", message: "", website: "" });
  const [errors, setErrors] = useState<FieldErrors<keyof ContactInput>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();

  // A topic can be pre-selected with ?topic=… (links from Ideas and Recommends).
  const search = useSyncExternalStore(
    () => () => {},
    () => window.location.search,
    () => "",
  );
  const preset = new URLSearchParams(search).get("topic");
  const presetTopic = preset && TOPICS.some((x) => x.value === preset) ? preset : "";
  const [topicTouched, setTopicTouched] = useState(false);
  const topic = topicTouched ? values.topic : values.topic || presetTopic;

  const set = (k: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (k === "topic") setTopicTouched(true);
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input = { ...values, topic };
    const found = validateContact(input);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (values.website) return; // honeypot: quietly ignore bots
    setServerError(null);
    const topicLabel = TOPICS.find((t) => t.value === topic)?.label ?? topic;

    if (!CONTACT_ENDPOINT) {
      window.location.href = mailtoHref(
        company.email,
        `${topicLabel}: from ${values.name}`,
        `${values.message}\n\n— ${values.name} (${values.email})`,
      );
      setStatus("mailto");
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    setStatus("sending");
    try {
      await postJson(CONTACT_ENDPOINT, {
        name: values.name.trim(),
        email: values.email.trim(),
        topic,
        message: values.message.trim(),
        source: "walkover.in/contact",
      });
      setStatus("sent");
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (err) {
      setServerError(err instanceof SubmitError ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const fieldProps = (k: keyof ContactInput) => ({
    id: `${id}-${k}`,
    name: k,
    value: k === "topic" ? topic : values[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${id}-${k}-err` : undefined,
  });

  return (
    <div className={styles.wrap} data-status={status}>
      <div className={styles.scene} aria-hidden="true">
        <svg className={styles.mailbox} viewBox="0 0 120 160">
          <path className={styles.post} d="M56 80 V 156 M40 156 H 74" />
          <path className={styles.box} d="M14 40 C 14 22, 30 12, 50 12 H 96 C 108 12, 112 22, 112 36 V 84 H 14 Z" />
          <path className={styles.slot} d="M30 48 H 70" />
          <g className={styles.flag}>
            <path d="M104 72 V 34" />
            <path d="M104 34 L 120 38 L 104 46 Z" className={styles.flagCloth} />
          </g>
        </svg>
        <div className={styles.actor}>
          <Walker look={cast.messenger} expressions={["smile", "grin"]} rightHand={<Envelope />} />
        </div>
        <svg className={styles.letter} viewBox="0 0 40 30">
          <rect x="2" y="2" width="36" height="26" rx="3" />
          <path d="M2 4 L 20 17 L 38 4" />
        </svg>
      </div>

      <div className={styles.paper}>
        {status === "sent" ? (
          <div ref={statusRef} tabIndex={-1} className={styles.done} role="status">
            <h2>Delivered. Thank you!</h2>
            <p>Your message reached us. Thank you for writing; any reply will come by email to the address you gave.</p>
          </div>
        ) : status === "mailto" ? (
          <div ref={statusRef} tabIndex={-1} className={styles.pending} role="status">
            <h2>Over to your email app</h2>
            <p>
              We opened a ready-to-send email to {company.email} with your message in it. It isn’t sent until you press send
              there. Nothing opened? Write to <a href={`mailto:${company.email}`}>{company.email}</a> directly.
            </p>
            <button type="button" className="btn btn-paper" onClick={() => setStatus("idle")}>
              Back to the form
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={onSubmit} noValidate className={styles.form}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor={`${id}-name`}>Your name</label>
                <input type="text" autoComplete="name" required {...fieldProps("name")} />
                <FieldError id={`${id}-name-err`} msg={errors.name} />
              </div>
              <div className={styles.field}>
                <label htmlFor={`${id}-email`}>Email</label>
                <input type="email" autoComplete="email" inputMode="email" required {...fieldProps("email")} />
                <FieldError id={`${id}-email-err`} msg={errors.email} />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor={`${id}-topic`}>What’s it about?</label>
              <select required {...fieldProps("topic")}>
                <option value="">Choose one…</option>
                {TOPICS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <FieldError id={`${id}-topic-err`} msg={errors.topic} />
              {topic === "product" && (
                <p className={styles.hint}>
                  For account or billing help, each product’s own support is fastest. Links are on the{" "}
                  <Link href="/products/">product pages</Link>.
                </p>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor={`${id}-message`}>Message</label>
              <textarea rows={6} required {...fieldProps("message")} />
              <FieldError id={`${id}-message-err`} msg={errors.message} />
            </div>
            <div className={styles.honey} aria-hidden="true">
              <label htmlFor={`${id}-website`}>Leave this empty</label>
              <input type="text" tabIndex={-1} autoComplete="off" {...fieldProps("website")} />
            </div>
            {status === "error" && (
              <p className={styles.serverError} role="alert">
                {serverError} Your message was not sent. Please try again, or email{" "}
                <a href={`mailto:${company.email}`}>{company.email}</a>.
              </p>
            )}
            <div className={styles.actions}>
              <button type="submit" className="btn btn-red" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : CONTACT_ENDPOINT ? "Send message" : "Write the email"}
              </button>
              {!CONTACT_ENDPOINT && <p className={styles.hint}>This opens your email app with the message ready to send.</p>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  return msg ? (
    <p id={id} className={styles.err}>
      {msg}
    </p>
  ) : null;
}
