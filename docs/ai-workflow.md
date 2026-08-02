# AI Workflow Notes

Written for Troopod's assignment deliverable #5: what was delegated, where it failed,
what I'd systematise across 20 more of these.

## What I delegated

Three tools, three different jobs, each handing off a written artifact to the next
rather than a verbal summary.

- **ChatGPT — first pass planning.** Given the raw assignment page, generated an
  initial milestone breakdown (Milestone 0 through 10, one milestone per Shopify
  concern: store setup, refactor, foundation, then one milestone per section, then
  hardening, then docs). Useful as a first structural pass, but implementation-driven:
  it sequenced work section-by-section rather than design-first, and buried
  architecture thinking inside "Milestone 2" rather than making it its own phase.

- **Claude — plan review and restructuring.** Given ChatGPT's milestone list plus the
  actual prototype HTML and the assignment brief, used to pressure-test the plan
  before committing to it: read the real HTML rather than trusting the plan's
  assumptions about it, checked the plan against every requirement in the assignment
  (merchant-editable, real Shopify data, reusable, survives the theme editor,
  performance, accessibility), and rewrote it as an architecture-first phase sequence
  (docs/architecture.md as its own deliverable before any code). Also used to draft
  the actual brief that gets handed to Codex, and the AI-workflow / build-notes
  templates for the two required write-up deliverables.

- **Codex — implementation.** Given the architecture brief (not the milestone list
  directly) to produce docs/architecture.md first, no code, then to implement each
  section against that doc one at a time. [Update as this happens: note whether you
  reviewed per-section or per-commit, and anything it got wrong.]

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

- **Failure 3 — a required step quietly dropped in restructuring.** When
  rewriting the milestone list into phases, the original "seed 8 products including
  sold-out / no-image / long-title" step (originally its own milestone) got folded
  into a vague "dummy data" line and nearly disappeared. Caught on review, made
  explicit again as its own phase deliverable. Good reminder that restructuring a
  plan can silently drop hard requirements if you're not checking the new version
  against the original spec line by line.

## What I'd systematise if doing 20 more of these

<!--
This is where they're evaluating whether you think like someone building delivery
infrastructure for 100+ clients, not just someone who can prompt well once.
-->

- **A standing architecture-brief template.** The brief I ended up writing by hand
  (Dawn audit, data-source map, performance posture, edge-case list, all required
  up front before an agent touches code) should be a reusable template, not something
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
- **A pre-flight checklist for agent output before it's marked done**, covering the
  same things caught manually here: is anything a theme setting should own instead
  hardcoded, is a shared snippet actually being reused instead of duplicated, does it
  survive add/remove/reorder in the editor, does it degrade under
  `prefers-reduced-motion`. Turning this into something the agent runs on itself
  before handoff, instead of me finding it in review, is the next step.
