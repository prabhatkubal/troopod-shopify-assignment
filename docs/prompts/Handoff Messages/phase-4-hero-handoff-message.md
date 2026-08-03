## Message to paste into Codex

Phase 3 is done and committed: reusable snippets, assets, and theme settings are in place, and
the two Phase 3 correction fixes (bundle CTA default label, rating-star partial fill) are
verified and merged.

Next is Phase 4, starting with Hero, the first of the 5 required sections. Follow
`docs/prompts/phase-4-hero-brief.md` exactly. Use `docs/architecture.md` for the Hero component
breakdown and the animation/performance decision already made, `docs/data-model.md` for how the
`bundle_definition` metaobject applies to the optional Hero offer block, and the Phase 3
snippets for every piece of shared UI, don't rebuild any of them inline.

Standing instruction starting now: every change gets a `docs/build-notes.md` entry before the
commit, factual, no self-grading. Output should be `sections/hero.liquid` plus the build-notes
entry, nothing else — don't touch Phase 3 foundation files unless you find a real bug, and if you
do, stop and flag it instead of patching it silently inside this commit.
