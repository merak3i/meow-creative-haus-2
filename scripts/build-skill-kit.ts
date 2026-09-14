import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { publicSkills, skillMarkdown } from "../lib/public-skills";

const root = join(process.cwd(), "public/skill-kit");
const source = join(root, "mch-public-skills-v1");
mkdirSync(source, { recursive: true });
for (const skill of publicSkills) {
  const directory = join(source, skill.id);
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "SKILL.md"), skillMarkdown(skill));
}
writeFileSync(join(source, "START-HERE.md"), "# Public skill kit v1.0\n\n16 original public workflows by Meow Creative Haus.\n\nRead a skill's SKILL.md before using it. Attach it to a conversation with your inputs and ask the assistant to follow it for that task, or import the folder using your application's skill support. Verify that the assistant can access the instructions. These files add no tools, accounts, integrations or permissions.\n\nChoose one bounded task and inspect the output before relying on the workflow. Host support and tool availability vary. Examples on the website are composites, not client case studies or effectiveness measurements.\n\nEach file includes permission to use, modify and redistribute it with its notice retained. The permission does not cover third-party services or private source skills.\n");
const archive = join(root, "mch-public-skills-v1.zip");
rmSync(archive, { force: true });
execFileSync("zip", ["-q", "-r", archive, "mch-public-skills-v1"], { cwd: root });
