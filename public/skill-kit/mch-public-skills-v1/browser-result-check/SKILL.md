---
name: browser-result-check
description: "Verify a web result in the named browser and distinguish local from live proof. Use when checking a web change, a saved dashboard state or a specific page interaction."
---

# Check the actual page

## Inputs

The exact URL, expected behavior, browser preference and authorized actions.

## Workflow

1. Open the named target using an available browser tool. Confirm the domain and environment before interaction.
2. Exercise the relevant user path with safe data. Capture the observed result rather than relying only on source code or a successful build.
3. Check the layout at the required screen sizes and inspect errors relevant to the changed behavior.
4. If login, access or a service is blocked, preserve that state. Do not claim the inaccessible step passed.
5. Report the URL, action, observed outcome and remaining untested paths.

## Deliver

A concise verification receipt separating local, preview and production results.

## Limits

Requires browser access. It does not authorize purchases, messages, permission changes or unrelated live mutations. Follow the user's current request and the host application's permissions. This instruction file grants no tool access or extra authority.

## Example request

Verify this page in the browser at desktop and mobile sizes. Test the primary link and report observed results separately from anything blocked.

## Reuse

Original public workflow from Meow Creative Haus, version 1.0.0. You may use, modify and redistribute this file, including commercially, with this notice retained. Provided as-is without warranty. This permission applies to this file only, not to third-party tools, private configurations or source skills.
