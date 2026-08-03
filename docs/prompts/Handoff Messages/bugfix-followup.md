## Follow-up: two bugs from the last brief are still unresolved

Good progress on visual parity (headings, buttons, and the compact bundle-card images all look
right now). Two things from Part A of `docs/prompts/bugfix-visual-parity-brief.md` are still
broken on the live preview, please finish these specifically:

**1. Shop grid product images are still not rendering.**
Every card in the Shop section ("Loved by every home") still shows an empty gray box. The
compact-variant fix inside `purelane-bundle-card.liquid` apparently didn't carry over to the
full-card path `purelane-product-card.liquid` uses when called from `sections/shop.liquid`. Find
why the full-card image resolution differs from the compact one and fix the actual root cause in
`purelane-product-card.liquid`, not just the compact variant.

**2. Duplicate "Sale" badge is still showing twice per Shop card.**
Untouched from the original bug report, still visible in the image area and again near the
price on every Shop product card.

Please confirm both against the live theme preview directly, not just Theme Check passing,
before reporting back. Same standing instruction: log the fix in `docs/build-notes.md` before
the commit.
