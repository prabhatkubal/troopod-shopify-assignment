## Message to paste into Codex

Phase 4 is done and committed: all 5 sections (Hero, Shop, Combos, Bundles, Reviews) are built,
reviewed, and use the shared Phase 3 foundation correctly.

Next is Phase 5: hardening. Follow `docs/prompts/phase-5-hardening-brief.md` exactly — it
includes both the standard performance/accessibility/theme-editor checklist and five specific
carried-over fixes from the Phase 4 review, listed at the top of the brief. Fix those five first,
they're concrete and already scoped, before the broader pass.

Report actual results, not assertions — real Lighthouse numbers, real accessibility violations
found (or genuinely none), and what you actually tested for each theme editor check, not just
"verified." One `docs/build-notes.md` entry per section is fine for this phase, be specific
about what changed in each.

This is the one phase where touching Phase 3 foundation files is expected, since two of the
carried-over fixes may require it. Note that clearly in the relevant build-notes entries.
