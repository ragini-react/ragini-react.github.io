"use client";

import { useId, useRef, useState } from "react";
import { Walker } from "@/components/characters/Walker";
import { cast } from "@/components/characters/cast";
import { Envelope } from "@/components/characters/props";
import { company } from "@/content/company";
import { isEmail, mailtoHref, MAILCHIMP_URL, NEWSLETTER_ENDPOINT, postJson, subscribeMailchimp, SubmitError } from "@/lib/forms";
import styles from "./HappinessNewsletter.module.scss";

type State = "idle" | "typing" | "ready" | "sending" | "done" | "error" | "mailto";

/**
 * The Happiness Newsletter: a cheerful little scene that reacts to the form.
 * Success is only shown when the configured service confirms it. With no
 * service configured, the form opens a pre-filled email request instead and
 * says exactly that.
 */
export function HappinessNewsletter({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const id = useId();
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const mode: "endpoint" | "mailchimp" | "mailto" = NEWSLETTER_ENDPOINT ? "endpoint" : MAILCHIMP_URL ? "mailchimp" : "mailto";

  const onChange = (value: string) => {
    setEmail(value);
    setError(null);
    if (state === "error" || state === "idle" || state === "typing" || state === "ready") {
      setState(isEmail(value) ? "ready" : value ? "typing" : "idle");
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmail(email)) {
      setError("That doesn’t look like an email address yet. Try something like you@example.com.");
      setState("error");
      emailRef.current?.focus();
      return;
    }
    if (!consent) {
      setError("Please tick the box so we know you want the letter.");
      setState("error");
      return;
    }
    setError(null);

    if (mode === "mailto") {
      window.location.href = mailtoHref(
        company.email,
        "Please add me to the Happiness letter",
        `Hi Walkover,\n\nPlease add ${email} to the Happiness letter.\n\nThanks!`,
      );
      setState("mailto");
      setNote(null);
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    setState("sending");
    try {
      if (mode === "endpoint") {
        await postJson(NEWSLETTER_ENDPOINT, { email: email.trim(), consent: true, list: "happiness", source: "walkover.in" });
        setNote(null);
      } else {
        const msg = await subscribeMailchimp(MAILCHIMP_URL, email.trim(), "happiness");
        setNote(msg || null);
      }
      setState("done");
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (err) {
      setError(err instanceof SubmitError ? `${err.message} Nothing was saved. Please try again in a moment.` : "Something went wrong. Nothing was saved.");
      setState("error");
    }
  }

  const mood = state === "done" || state === "mailto" ? "done" : state === "ready" || state === "sending" ? "ready" : state === "typing" ? "typing" : state === "error" ? "error" : "idle";

  return (
    <div className={styles.wrap} data-mood={mood}>
      <div className={styles.scene} aria-hidden="true">
        <svg className={styles.sun} viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="14" />
          <path d="M40 8 V 18 M40 62 V 72 M8 40 H 18 M62 40 H 72 M17 17 L 24 24 M56 56 L 63 63 M17 63 L 24 56 M56 24 L 63 17" />
          <path className={styles.sunFace} d="M34 38 h0.1 M46 38 h0.1 M34 45 Q 40 50, 46 45" />
        </svg>
        <svg className={styles.thought} viewBox="0 0 120 70">
          <path d="M14 50 C 0 50, 0 30, 14 28 C 12 10, 40 4, 50 16 C 60 2, 92 6, 94 24 C 116 22, 120 50, 100 52 C 96 66, 70 66, 64 58 C 54 68, 26 66, 24 56 C 20 58, 16 56, 14 50 Z" />
          <text x="60" y="40" textAnchor="middle">
            ☺ friday!
          </text>
        </svg>
        <div className={styles.actor}>
          <Walker look={cast.messenger} expressions={["smile", "wow", "grin", "think"]} leftHand={<Envelope />} />
        </div>
        <svg className={styles.plane} viewBox="0 0 120 60">
          <path className={styles.trail} d="M4 56 C 30 50, 40 30, 70 30" />
          <path className={styles.planeBody} d="M70 30 L 116 8 L 96 44 L 88 34 Z M 88 34 L 116 8" />
        </svg>
        <svg className={styles.cheer} viewBox="0 0 200 120">
          <path d="M30 70 l-14 -10 M40 40 l-8 -16 M100 18 v-14 M160 40 l8 -16 M170 70 l14 -10" />
          <path d="M60 30 l4 8 l8 1 l-6 5 l2 8 l-8 -4 l-7 4 l2 -8 l-6 -5 l8 -1 z" />
        </svg>
      </div>

      <div className={styles.paper}>
        <span className="tape" style={{ right: "18%", top: "-0.8rem", rotate: "5deg" }} />
        <p className="eyebrow">the happiness letter</p>
        <Heading className={styles.title}>A small dose of happy, by email.</Heading>
        <p className={styles.copy}>
          It began as Walkover’s Friday note to its own team: more than sixty letters between October 2021 and February 2025,
          on honesty, consistency, Secret Santa and much more.{" "}
          <a href={company.happinessArchive}>Read the archive</a>.
        </p>

        {state === "done" ? (
          <p ref={statusRef} tabIndex={-1} className={styles.success} role="status">
            <strong>You’re on the list.</strong> {note ?? "The next letter will come to your inbox."}
          </p>
        ) : state === "mailto" ? (
          <p ref={statusRef} tabIndex={-1} className={styles.pending} role="status">
            <strong>Your email app should have opened</strong> with a message asking us to add you. Send it and we’ll take it
            from there. Nothing happened? Write to <a href={`mailto:${company.email}`}>{company.email}</a>.
          </p>
        ) : (
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <label htmlFor={`${id}-email`} className={styles.label}>
              Your email
            </label>
            <div className={styles.row}>
              <input
                ref={emailRef}
                id={`${id}-email`}
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => state === "idle" && setState("typing")}
                aria-invalid={state === "error" && !isEmail(email) ? true : undefined}
                aria-describedby={error ? `${id}-error` : `${id}-help`}
                required
              />
              <button type="submit" className="btn btn-red" disabled={state === "sending"}>
                {state === "sending" ? "Sending…" : mode === "mailto" ? "Ask to join" : "Subscribe"}
              </button>
            </div>
            <label className={styles.consent}>
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
              <span>I’d like to receive the Happiness letter. I can unsubscribe at any time.</span>
            </label>
            <p id={`${id}-help`} className={styles.help}>
              {mode === "mailto"
                ? "Sign-ups go by email for now: this opens a ready-to-send message in your email app."
                : "We only use your address to send the letter."}
            </p>
            <p id={`${id}-error`} className={styles.error} role="alert">
              {error}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
