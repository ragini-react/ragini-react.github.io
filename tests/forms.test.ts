import { test } from "node:test";
import assert from "node:assert/strict";
import { isEmail, mailtoHref, validateContact } from "../src/lib/forms.ts";

test("isEmail accepts normal addresses and rejects junk", () => {
  assert.ok(isEmail("you@example.com"));
  assert.ok(isEmail("  first.last+tag@walkover.in "));
  assert.ok(!isEmail("you@example"));
  assert.ok(!isEmail("no at sign"));
  assert.ok(!isEmail(""));
});

test("validateContact flags every missing field", () => {
  const errors = validateContact({ name: "", email: "x", topic: "", message: "hi", website: "" });
  assert.deepEqual(Object.keys(errors).sort(), ["email", "message", "name", "topic"]);
});

test("validateContact passes a complete message", () => {
  const errors = validateContact({ name: "Asha", email: "asha@example.com", topic: "idea", message: "An idea worth ten characters.", website: "" });
  assert.deepEqual(errors, {});
});

test("mailtoHref encodes subject and body", () => {
  const href = mailtoHref("info@walkover.in", "Hi & hello", "Line 1\nLine 2");
  assert.equal(href, "mailto:info@walkover.in?subject=Hi%20%26%20hello&body=Line%201%0ALine%202");
});
