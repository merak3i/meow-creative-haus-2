import test from "node:test";
import assert from "node:assert/strict";
import { normalizeWorkQuery, workQueryHref } from "../work-query";
test("Repeated query parameters cannot crash the Work route", () => {
  assert.deepEqual(
    normalizeWorkQuery({
      q: [" Patherle ", "ignored"],
      discipline: ["Products", "Motion"],
      page: ["2", "3"],
    }),
    { q: "Patherle", discipline: "Products", page: 2 },
  );
});
test("Malformed pagination and unknown filters fall back safely", () => {
  for (const page of ["-1", "Infinity", "NaN", "1.5", "9007199254740992"])
    assert.equal(normalizeWorkQuery({ page, discipline: "unknown" }).page, 1);
  assert.equal(normalizeWorkQuery({ q: "x".repeat(200) }).q.length, 100);
  assert.equal(
    normalizeWorkQuery({ discipline: "unknown" }).discipline,
    undefined,
  );
});
test("Search terms stay encoded and pagination links retain filters", () => {
  const href = workQueryHref("<script>& test", "Motion", 2);
  const url = new URL(href, "https://example.test");
  assert.equal(url.searchParams.get("q"), "<script>& test");
  assert.equal(url.searchParams.get("discipline"), "Motion");
  assert.equal(url.searchParams.get("page"), "2");
  assert.equal(workQueryHref(), "/work");
});
