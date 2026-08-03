## Message to paste into Codex (send after Hero and Shop are both committed)

Hero and Shop are done and committed. Next in Phase 4 are the remaining three required sections:
Combos, Bundles, and Reviews. Follow `docs/prompts/phase-4-combos-bundles-reviews-brief.md`
exactly — it's one document but three separate jobs, build them as three separate sections with
three separate commits and three separate `docs/build-notes.md` entries, don't batch them.

Combos and Bundles both reference the shared `bundle_definition` metaobject and both render
through `purelane-bundle-card`, per the architecture decision confirmed back in Phase 1 — same
data, same render path, different presentational context. Don't build two rendering
implementations.

Reviews needs its own rating-display decision since it's testimonial data, not a product review-
app rating — see the brief for the two acceptable approaches. Whichever you pick, don't
reintroduce the static-5-star bug that was fixed in Phase 3.

Same standing rule as every phase so far: don't touch Phase 3 foundation files unless you find a
real bug, flag it instead of patching it silently.
