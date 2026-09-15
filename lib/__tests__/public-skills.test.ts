import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { publicSkills, skillMarkdown } from "../public-skills";

test("individual downloads and bundled skills contain the same current instructions", () => {
  const root = join(process.cwd(), "public/skill-kit");
  const archive = join(root, "mch-public-skills-v1.zip");
  for (const skill of publicSkills) {
    const entry = `mch-public-skills-v1/${skill.id}/SKILL.md`;
    const expected = skillMarkdown(skill);
    assert.equal(readFileSync(join(root, entry), "utf8"), expected, `${skill.id}: rebuild the public skill kit`);
    assert.equal(execFileSync("unzip", ["-p", archive, entry], { encoding: "utf8" }), expected, `${skill.id}: stale ZIP download`);
  }
});

test("the public archive contains only the intended skill folders and start guide", () => {
  const archive = join(process.cwd(), "public/skill-kit/mch-public-skills-v1.zip");
  const files = execFileSync("unzip", ["-Z1", archive], { encoding: "utf8" }).trim().split("\n").filter((file) => !file.endsWith("/"));
  assert.deepEqual(files.sort(), ["mch-public-skills-v1/START-HERE.md", ...publicSkills.map((skill) => `mch-public-skills-v1/${skill.id}/SKILL.md`)].sort());
  assert.equal(new Set(publicSkills.map((skill) => skill.id)).size, publicSkills.length);
});
