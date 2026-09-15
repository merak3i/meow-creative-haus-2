---
name: existing-data-first
description: "Check an existing export or endpoint before building another scraper. Use when a data collection task may already have an authorized API, dataset or export."
---

# Existing data first

## Inputs

Required fields, freshness, source constraints and permitted services.

## Workflow

1. List the fields and update frequency needed by the task.
2. Inspect documented exports and APIs available to the user. Compare coverage, freshness, cost and permitted usage.
3. Check a small safe sample against the required schema before proposing a dependency.
4. State gaps and a fallback. Do not infer availability, access or usefulness from an endpoint name alone.
5. Use a paid service only within the user's explicit budget and authorization.

## Deliver

A source choice with field coverage, limitations and a reproducible access plan.

## Limits

Includes no vendor integration, API key or endpoint subscription. Follow the user's current request and the host application's permissions. This instruction file grants no tool access or extra authority.

## Example request

Before building a scraper, inspect available authorized exports or APIs for these fields. Compare coverage, freshness and cost without purchasing access.

## Reuse

Original public workflow from Meow Creative Haus, version 1.0.0. You may use, modify and redistribute this file, including commercially, with this notice retained. Provided as-is without warranty. This permission applies to this file only, not to third-party tools, private configurations or source skills.
