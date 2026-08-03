## Message to paste into Codex

Phase 1 and Phase 2 are done and committed: `docs/architecture.md` and `docs/data-model.md` are
approved, the dev store is seeded (8+ products with all 3 required edge cases, 3 collections,
one `bundle_definition` metaobject with 3 populated entries).

Next is Phase 3: shared foundation only, no section files. Follow
`docs/prompts/phase-3-foundation-brief.md` exactly for what to build and the `purelane-` naming
convention. Build against the extend-vs-replace decisions already made in `docs/architecture.md`
and the field names/fallback logic already defined in `docs/data-model.md` — don't re-derive
either, just implement them.

Nothing in this phase should reference Hero, Shop, Combos, Bundles, or Reviews by name. If
you're tempted to build something section-specific to test a snippet, stop and flag it instead,
that belongs in Phase 4.

No `docs/build-notes.md` entries needed yet, those start in Phase 4. If anything here should
seed a Phase 4 build-notes entry later, leave a one-line comment in the code instead of writing
it to build-notes.md now.
