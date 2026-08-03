## Message to paste into Codex (send after Hero is committed)

Hero is done and committed. Next in Phase 4 is Shop / Product Grid. Follow
`docs/prompts/phase-4-shop-brief.md` exactly. Use `docs/data-model.md` to confirm the Best
Sellers vs. Shop collection distinction, and reuse `purelane-product-card` for every product,
it already handles the sold-out, no-image, and long-title edge cases from Phase 3, don't rebuild
that logic here.

Same standing instruction: `docs/build-notes.md` entry before the commit, factual, no self-
grading. Don't touch Phase 3 foundation files unless you find a real bug, flag it instead of
patching it silently.
