# Build Notes

Written for Troopod's assignment deliverable #4: what I'd flag about the original file,
what I changed and why, what I'd do with more time.

## What I'd flag about the original prototype

<!--
Be concrete and cite the actual file. This shows you can read someone else's messy
code and reason about production-readiness, which is literally the job.

Known issues in purelane-homepage.html worth covering (fill in your actual findings):
-->

- **Performance:** the fixed full-viewport animated background (`.scenes`, `.water`,
  layered SVG filters, several infinite CSS animations, `mix-blend-mode` layers) is
  decorative but expensive — scroll-linked scene transitions plus continuously
  running keyframe animations on large layered SVGs. Flagged as the single biggest
  Core Web Vitals risk in the file; decision on what survives production is being
  made at the architecture stage rather than deferred to a cleanup pass.
- **Structure vs. requirements:** the file's `id`/`class` hooks for the five required
  sections match the assignment exactly (`section.hero`, `#shop`, `#combos`,
  `#bundles`, `#reviews`), but there's far more markup around them (ingredients,
  proof, categories, "why bundles," etc.) that's explicitly out of scope — worth
  flagging so it's clear the extra sections were seen and deliberately excluded, not
  missed.
- **Accessibility:** [note anything you found — contrast, missing focus states, motion
  that doesn't respect `prefers-reduced-motion`, non-semantic markup]
- **Hardcoded content:** [prices, badges, copy that's baked into the HTML rather than
  coming from a data source — list what you found once architecture doc is done]
- **Non-Shopify assumptions:** [anything written as if it were a static one-off page —
  e.g. product data embedded directly rather than structured as something a platform
  would own]

## What I changed, and why

<!--
Section by section. Keep each entry short: what it was, what it is now, the one-line
reason. This is also a natural place to note what you did NOT get to, per their own
"we don't expect all five finished" line — be straight about it.
-->

- **Hero:** The prototype's static copy, inline product stage, duplicate desktop/mobile promise markup, and scroll-linked animated scenes are now a merchant-editable section with shared heading/button/badge/bundle-card snippets, separate background and foreground media, and no scene animation system — product content stays editable and the architecture performance decision is applied.
- **Shop / Product Grid:** The prototype's hardcoded product cards, prices, ratings, and inline SVG product artwork are now a collection-driven grid using the seeded Best Sellers collection and shared product-card rendering — catalog data and edge-case handling come from Shopify products instead of page markup.
- **Best-selling Combos:** [not yet started] — update once built
- **Bundles:** [not yet started] — update once built
- **Reviews Rail:** [not yet started] — update once built

## What I'd do with more time

<!--
Signal you know the difference between "shipped for this assignment" and "production
ready at scale." A few honest, specific items beat a long wishlist.
-->

- [e.g. "Load-test the animated background properly and decide whether it survives at
  all, versus the quick call I made under time pressure."]
- [e.g. "Expand the reuse map to cover the bonus sections too, so the whole homepage —
  not just the required 5 — shares one component system."]
- [e.g. "Add automated Lighthouse/axe checks to CI so regressions get caught before
  a PR merges, not during manual review."]
