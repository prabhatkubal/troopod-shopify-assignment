# AI Workflow Notes

Written for Troopod's assignment deliverable #5: what was delegated, where it failed,
what I'd systematise across 20 more of these.

## What I delegated

Four tools across the build, each handing off a written artifact to the next rather
than a verbal summary, and the tool changed mid-build for reasons outside my control
(usage limits), which turned out to be its own useful data point.

- **ChatGPT — first pass planning.** Given the raw assignment page, generated an
  initial milestone breakdown (Milestone 0 through 10, one milestone per Shopify
  concern: store setup, refactor, foundation, then one milestone per section, then
  hardening, then docs). Useful as a first structural pass, but implementation-driven:
  it sequenced work section-by-section rather than design-first, and buried
  architecture thinking inside "Milestone 2" rather than making it its own phase.

- **Claude — plan review, restructuring, and ongoing review throughout the build.**
  Given ChatGPT's milestone list plus the actual prototype HTML and the assignment
  brief, used to pressure-test the plan before committing to it: read the real HTML
  rather than trusting the plan's assumptions about it, checked the plan against
  every requirement in the assignment (merchant-editable, real Shopify data,
  reusable, survives the theme editor, performance, accessibility), and rewrote it
  as an architecture-first phase sequence (`docs/architecture.md` as its own
  deliverable before any code). Also used throughout the build to write every brief
  handed to the implementation agents, to review their output against those briefs
  before accepting it, to interpret the Lighthouse report, and to draft these two
  write-up deliverables.

- **Codex — architecture, data model, foundation, and initial section implementation
  (Phases 1-4).** Given each phase's brief in turn, not the original milestone list
  directly. Produced `docs/architecture.md` and `docs/data-model.md` cleanly, both
  approved with minimal correction. Implementation phases needed two real correction
  rounds: a bundle CTA that silently disappeared when an optional field was left
  blank, and product-rating stars that always rendered as a static full five stars
  regardless of the actual rating value. Reviewed after every phase, not just at the
  end, which is what caught both issues before they propagated into later sections
  that depended on the same snippets.

- **Copilot (in VS Code) — visual parity and bug-fixing pass.** Picked up after
  Codex, once local file access moved to VS Code. Given a full context handoff
  document summarizing every prior phase and decision, since it had no access to the
  earlier chat history. Fixed real bugs (broken product images in the Shop grid and
  bundle cards, a duplicate sale badge, a badge overflowing its card) and did a
  genuine visual-parity pass matching the built theme's typography and button
  treatment back to the prototype. Ran out of usage credits partway through a later
  task (the Phase 5 hardening checklist), leaving it unclear how much of that task
  had actually completed versus just been assigned — this became the reason for the
  next handoff.

- **Cursor — final bug fixes and hardening.** Picked up after Copilot's usage limit
  was hit. Given an updated context document that explicitly instructed it not to
  trust the existence of a task file as proof the work was done, and to check git
  log and `docs/build-notes.md` against each outstanding item first. This caught
  that the smooth-scroll navigation feature had not actually been implemented in
  code at all — only an unrelated, dangling reference to a third-party app's section
  type existed where the real feature should have been.

## Where it failed or needed correction

- **Failure 1 — architecture was an afterthought, not a phase.** ChatGPT's plan
  treated "understand and refactor the prototype" as Milestone 2, sandwiched between
  store setup and building shared components, rather than as a standalone
  design-first phase with its own deliverable. Caught this by checking it against the
  assignment's own bar list (merchant-editable, reusable, real Shopify data) — a plan
  that starts implementing before it's decided what's a Section vs Metaobject vs
  Theme Setting can't actually guarantee those, it just hopes to get there. Fixed by
  pulling architecture out into Phase 1 with its own doc and its own commit, before
  any snippet or section gets written.

- **Failure 2 — performance risk buried at the end.** The original sequencing put
  performance work in a late "hardening" milestone, treating it as cleanup. Reading
  the actual prototype file surfaced a fixed full-viewport animated background system
  (scroll-linked scenes, layered SVG filters, several infinite CSS animations,
  `mix-blend-mode`) that's the single biggest Core Web Vitals risk in the whole build.
  Fixed by moving the decision on what survives production into the architecture
  phase itself, not the hardening phase, since it affects section structure, not just
  final polish.

- **Failure 3 — a required step quietly dropped in restructuring.** When rewriting
  the milestone list into phases, the original "seed 8 products including sold-out /
  no-image / long-title" step (originally its own milestone) got folded into a vague
  "dummy data" line and nearly disappeared. Caught on review, made explicit again as
  its own phase deliverable. Good reminder that restructuring a plan can silently
  drop hard requirements if you're not checking the new version against the original
  spec line by line.

- **Failure 4 — a performance fix that looked complete but had the wrong target.**
  An earlier correction round flagged that Hero's background and foreground images
  were both marked `fetchpriority: high`, competing for the same priority signal, and
  the fix was to drop one to `auto`. It dropped the wrong one. Only running an actual
  Lighthouse pass and reading its LCP-discovery output — which names the specific DOM
  element the browser identified as the real Largest Contentful Paint candidate —
  revealed that the background image, not the foreground, was the one that needed
  `high`. This is a specific instance of a general failure mode: a plausible-sounding
  fix based on reasoning about the code, without measuring against the actual
  rendered page, can be confidently wrong in a way that reads as correct until
  something forces a real measurement.

- **Failure 5 — an agent's assigned work looked done because a task file existed.**
  When Copilot hit its usage limit mid-task and work moved to Cursor, the smooth-
  scroll navigation feature had a task file, a brief, and even showed up as "working"
  in casual browser testing (anchor links did jump to sections) — but the actual
  JavaScript implementation was never written. What existed instead was an unrelated,
  broken reference to a third-party Shopify app's section type, left over from
  something else entirely, that produced a theme-push error unrelated to the missing
  feature. The anchor links appeared to work because browsers jump to same-page
  anchors by default with no code required, which masked the fact that the actual
  scroll-offset and reduced-motion-aware behavior specified in the brief was never
  built. Caught by explicitly instructing the next agent not to trust a task file's
  existence as proof of completion, and to verify against git history instead.

## What I'd systematise if doing 20 more of these

- **A standing architecture-brief template.** The brief I ended up writing by hand
  (Dawn audit, data-source map, performance posture, edge-case list, all required up
  front before an agent touches code) should be a reusable template, not something
  rebuilt per project. That's the actual leverage: the plan quality came from the
  checklist, not from any one tool being smarter.
- **Never hand an agent a plan without re-checking it against the original spec.**
  The dropped store-seeding requirement happened because a restructuring pass
  optimized for "cleaner phases" without diffing against the literal assignment
  requirements. At 20x volume that's the failure mode that costs a client, not a
  clever prompt.
- **Different tools for planning vs. execution, on purpose.** Using one model to
  draft a plan and a second model to stress-test it before a third implements it
  caught real gaps (the architecture-as-afterthought problem, the buried performance
  risk) that a single pass likely wouldn't have. Worth keeping as a standing pattern:
  draft → adversarial review against the actual spec → implement, rather than
  draft → implement.
- **"Verified" is not evidence.** Twice in this build, an agent's summary of its own
  work ("verified," "committed," a task file existing) turned out not to match
  reality when checked against an actual measurement or the actual git log. At scale,
  the review step can't be "read the agent's summary," it has to be "check the
  artifact the summary claims exists."
- **Plan for tool interruption as a normal event, not an edge case.** Losing Copilot
  mid-task to a usage limit wasn't a rare failure, it's a predictable cost of using
  consumer-tier AI tooling for real work under a deadline. The fix that actually
  helped was having a standing context-handoff document that any new tool could read
  cold, rather than relying on conversation history that doesn't transfer between
  tools. That's worth building as infrastructure, not improvising each time a tool
  runs out.
- **A pre-flight checklist for agent output before it's marked done**, covering: is
  anything a theme setting should own instead hardcoded, is a shared snippet actually
  being reused instead of duplicated, does it survive add/remove/reorder in the
  editor, does it degrade under `prefers-reduced-motion`, and — added after this
  build — does the actual rendered output match what a real measurement (Lighthouse,
  git log, a live screenshot) shows, not just what the agent claims.
