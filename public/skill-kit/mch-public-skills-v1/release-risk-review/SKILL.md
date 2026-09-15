---
name: release-risk-review
description: "Review the changed work for exposure, behavior regressions and an achievable rollback. Use when preparing a scoped public release or reviewing a change that touches sensitive data or permissions."
---

# Release risk review

## Inputs

The actual diff, release target, authorization, tests and rollback option.

## Workflow

1. Map the change to affected user paths, data and permissions. Focus the review on actual exposure.
2. Scan release content for secrets and private material without echoing sensitive values. Check new dependencies and relevant advisories.
3. Verify changed behavior and applicable failure paths. Separate test, preview and production evidence.
4. Confirm rollback and required repository review gates. Do not disable a protection to achieve a release.
5. State whether the scoped release can proceed, what blocks it and what has not been verified.

## Deliver

A scoped release decision with evidence, blockers and a rollback action.

## Limits

This is a review workflow, not a security certification or independent approval. Follow the user's current request and the host application's permissions. This instruction file grants no tool access or extra authority.

## Example request

Review this change for release. Inspect the actual diff, relevant tests, exposure and rollback. Name blockers without changing permissions.

## Reuse

Original public workflow from Meow Creative Haus, version 1.0.0. You may use, modify and redistribute this file, including commercially, with this notice retained. Provided as-is without warranty. This permission applies to this file only, not to third-party tools, private configurations or source skills.
