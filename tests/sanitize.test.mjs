import { test } from "node:test";
import assert from "node:assert/strict";
import { sanitize } from "../scripts/fetch-jobs.mjs";

test("sanitize keeps structure and strips attributes", () => {
  const out = sanitize('<h1 style="margin:0">About</h1><ul style="x"><li style="y">One</li></ul><div><br></div>');
  assert.equal(out, "<h3>About</h3><ul><li>One</li></ul>");
});

test("sanitize removes scripts, links, images and handlers", () => {
  const out = sanitize('<p onclick="x()">Hi<script>alert(1)</script><img src=x onerror=y><a href="javascript:z">link</a></p>');
  assert.equal(out, "<p>Hilink</p>");
});
