## Message to paste into Codex

Phase 1 is done and committed: `docs/architecture.md` is approved, including the confirmed
decision that Combos and Bundle Tiers both reference one shared `bundle-definition` metaobject
rather than two separate ones.

Next is Phase 2: data model and store setup, no Liquid or theme code. Follow
`docs/prompts/phase-2-data-model-brief.md` exactly for scope and required sections. Use
`docs/architecture.md` as the source of truth for what data each section needs, don't re-derive
it from the prototype directly.

Output only `docs/data-model.md`. If any field the architecture doc implies isn't fully
specified there, flag it explicitly rather than inventing a definition that doesn't trace back
to the architecture document.

Reminder of the standing instruction from Phase 1: once implementation starts in Phase 4, every
change gets an entry in `docs/build-notes.md`. Phase 2 doesn't need build-notes entries since
it's definitions and seeding, not prototype-derived changes, but confirm your understanding of
where the seeding checklist ends and Phase 3 begins before you start.
