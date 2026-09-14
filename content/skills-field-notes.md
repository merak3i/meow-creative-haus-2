# my laptop has a skill issue

the useful kind / a small field report from the apps i keep asking to do things

by vismay hegde · meow creative haus · 15 september 2026

i asked for a tier list of the skills i use on this laptop

which is a slightly embarrassing thing to audit because the answer could easily have been “you installed 400 things and use six”

the surviving logs gave me something more interesting

i keep reaching for help with writing, getting the answer into a usable shape, and checking whether the thing on the screen actually works

there is plenty of coding in there. but a lot of the repeated work happens around the code, between having an idea and having something i can send, read, publish or use without another round of explanation

## first, what got counted

this is a local-history field report, not a model benchmark

the scan covered 289 Codex log files, 1,001 Claude Code files, 583 Cursor transcript files and 50 Antigravity transcripts, plus the Hermes conversation database

Cursor's 583 files collapse to 499 transcript IDs before further filtering. duplicated exports are a terrible way to discover that you are productive

the oldest timestamp found was 12 may 2026 in Claude Code. Codex's retained records start in august. these are different windows, so adding everything into one grand “most used ever” number would be theatre

the figures below count explicit skill-call or skill-file-read requests in the eligible records. they do not count a name sitting in an installed-skills catalogue. they also do not prove that a read succeeded, that the instructions were followed, or that the final work was good

known duplicate IDs and identifiable delegated or scheduled work were separated where the records allowed it. cross-app copies and incomplete lineage remain a limitation. i reviewed selected request-and-outcome windows too; all files in those four transcript sets were machine-scanned, not manually read word for word

## the stuff that keeps showing up

| skill | where it showed up | my tier |
| --- | --- | --- |
| rocky | 280 Cursor transcript IDs | S |
| napster-chat-delivery | 129 Cursor transcript IDs | S |
| napster-writing | 127 Cursor transcript IDs | S |
| chronicle | 56 Cursor transcript IDs | A |
| napster-social-content | 54 Cursor transcript IDs | S |
| napster-gtm-pipeline | 48 Cursor transcript IDs | A |
| unslop | 34 Cursor transcript IDs | A |
| firecrawl-scrape | 32 Cursor transcript IDs | A |
| researcher | 24 Cursor transcript IDs | A |
| linkedin-b2b-nurture | 24 Cursor transcript IDs | A |

one skill counts once per Cursor transcript ID here. the tiers are my editorial judgement about usefulness in this setup, not a score calculated from the numbers

rocky needs an asterisk the size of the laptop. it is configured as a default voice, which helps explain its frequency. 280 appearances do not mean i consciously chose it 280 times

what i value there is the insistence on short, concrete answers. public writing has a different voice. i would prefer the newsletter to sound like me, not a small rock creature issuing deployment commands

## S tier is mostly boring in a very helpful way

**napster-writing** keeps the rough edges that belong to the sentence and removes the ones that belong to an overenthusiastic assistant. the work includes positioning, persona-specific messaging and turning technical material into something a person might finish reading

**napster-chat-delivery** handles a surprisingly persistent problem: the answer exists, but it is in a file somewhere and now i have a second task. this skill asks for the usable content in the conversation. the repeated corrections around “which block do i copy?” make its purpose fairly obvious

**napster-social-content** gives the writing a production shape. a receipt, a draft, a visual, a destination. a post for x company in enterprise software and a carousel for y company in education need different examples, even when both start as a messy paragraph in chat

those are generic industry examples, not claims about a particular engagement

**browser proof** is a family of skills rather than one magic file. in the eligible Codex records, computer-use appears in 17 source sessions, control-chrome in 17, and control-in-app-browser in 10. those groups overlap, so please don't add them

the recurring request is very concrete: open the named app, inspect the actual page, do the work there, and check the result. a browser research run i reviewed recorded usable answers and blocked services separately. that distinction deserves to survive the final report

**pdf + documents** also earn S tier as a family. Codex shows 28 pdf read requests across 15 source sessions, and 24 documents requests across eight. a recurring invoice request changes the month while preserving the established structure. a document export gets checked for pages touching the footer. this is the unglamorous part of making an artifact usable

## Hermes has a different job

the retained Hermes database has 41 sessions: 34 cron, six desktop and one subagent

so its busiest skill list is largely a record of scheduled work

napster-ops-rhythm has 21 observed requests across 12 scheduled sessions. apollo-tooling has 18 across six. napster-gtm-pipeline has eight across seven

ops-rhythm helps with repeated briefings and content preparation. Apollo tooling and the GTM pipeline support sourcing, qualification and outreach preparation. i put these in A tier: useful recurring machinery, with success still depending on the source, the integration and the final handoff

one scheduled example ran into unavailable integrations and returned a handoff instead. frequent execution is not the same as a healthy automation. the logs are quite capable of counting the same inconvenience every week

the desktop slice is much smaller. GTM, hermes-agent and napster-vision-workarounds each appear in two desktop sessions. that is evidence of use, not enough evidence to call any of them a daily habit

## the odd little tools i want nearby

**researcher + Firecrawl — A** handle the work before the confident sentence: find the source, inspect the page, keep the receipts. researcher appears in 24 Cursor transcript IDs and firecrawl-scrape in 32. i would use them when a claim needs checking or a website needs reading, with a blocked page still reported as blocked

**linkedin-b2b-nurture — A** appears in 24 Cursor transcript IDs. paired with GTM, it gives prospect research and persona-specific messaging somewhere to go. the useful pattern is preparation around a particular buyer, not a promise that more generated messages create better relationships

**unslop — A** appears in 34 Cursor transcript IDs. it sits close to writing in this ranking: an editorial pass for the assistant-shaped phrasing that survives the first draft. frequent requests show that the cleanup keeps being asked for; they do not give us a measured before-and-after quality score

**napster-vision-workarounds — A** is the most interesting specialist here. its documented job is to recover useful information when the active model cannot inspect an image normally: OCR for text, pixel and colour analysis for structure, with explicit limits. two desktop sessions in Hermes show requests for it. i like the purpose; this audit does not establish an accuracy rate for it

**napster-finance-docs — A** appears in 15 Cursor transcript IDs, three Codex source sessions and one Hermes desktop session. its value is restraint: preserve the reference, change the requested fields, check the exported document. the arithmetic and layout matter more than decorative cleverness

**chronicle — A** helps recover recent screen context when a request depends on “this” or “that thing i was doing”. 56 Cursor transcript IDs contain a read request. that says the context problem recurs; it does not prove screen access succeeded every time

**grilling — A** is for questions that change the build. Codex has 23 read requests concentrated in just two source sessions. that concentration is why a raw call leaderboard is misleading. i want it near the beginning of an ambiguous project, not appearing between me and every small reversible action

**monid — A, situational** appears in seven Cursor transcript IDs. its role is discovering an existing data endpoint before building another scraper. a request to inspect the skill is not proof that an endpoint was used, paid for, or useful

**security and loop review — A** stay in the kit too. napster-security appears in 24 Cursor transcript IDs; napster-loop-engine in six. the useful question is whether a check changed the work or caught a problem. repeating the checklist alone does not answer that

## the old diagram needs a small correction

i have a diagram that calls this a shared skill brain

the current files describe partial overlap. some skills exist in more than one app, some have different names, and some are local to one setup. the diagram is an intention; availability has to be checked where the work is happening

the flow i want is fairly ordinary

request → current evidence → relevant skill → artifact → verification → authorised delivery

then keep the useful correction for the next run

one correction from this audit is now a rule: PDF outputs default to three pages maximum unless i explicitly ask for more. use a proper information grid, readable type, and visuals that explain something. remove the repeated explanation before making the font smaller

the ten-slide carousel accompanying this piece is an explicit exception. yes, i noticed

## a note on the missing bits

Cursor's large application database was not decoded; the ranking uses its readable transcript exports. OpenCode's database could not be opened read-only. Gemini CLI, Pi and Continue had no readable history at the checked default locations. one Antigravity record was malformed

none of that means i never used those apps. deleted history, unsaved work and opaque records remain unknown

i would keep a smaller set of defaults, check specialist skills when the task needs them, and pay more attention to the corrections that keep coming back. for the next document, that means three readable pages and the actual answer in the chat
