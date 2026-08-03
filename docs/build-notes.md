# Build Notes

Written for Troopod's assignment deliverable #4: what I'd flag about the original file,
what I changed and why, what I'd do with more time.

## What I'd flag about the original prototype

- **Performance:** the fixed full-viewport animated background (`.scenes`, `.water`,
  layered SVG filters, several infinite CSS animations, `mix-blend-mode` layers) is
  decorative but expensive — scroll-linked scene transitions plus continuously
  running keyframe animations on large layered SVGs. Flagged as the single biggest
  Core Web Vitals risk in the file; the decision on what survives production was
  made at the architecture stage, not deferred to a cleanup pass — it was dropped
  entirely in favor of a static, reduced-motion-safe hero.
- **Structure vs. requirements:** the file's `id`/`class` hooks for the five required
  sections match the assignment exactly (`section.hero`, `#shop`, `#combos`,
  `#bundles`, `#reviews`), but there's far more markup around them (ingredients,
  proof, categories, "why bundles," etc.) that's explicitly out of scope — worth
  flagging so it's clear the extra sections were seen and deliberately excluded, not
  missed.
- **Accessibility:** the prototype had no `prefers-reduced-motion` handling anywhere —
  the scroll-linked scene system and marquee animations would run regardless of the
  visitor's motion preference. The rebuilt theme layers a merchant animation toggle
  under the OS-level `prefers-reduced-motion` query everywhere motion appears, so the
  accessibility preference always wins even if a merchant leaves animation on.
- **Hardcoded content:** prices, sale/sold-out states, combo and bundle pricing,
  product ratings, and all review content were static HTML in the prototype. Also
  worth flagging: the prototype's review section carries fabricated aggregate stats
  ("4.8 from 8,000+ reviews," "12 lakh+ homes") presented as real numbers. These were
  not carried into production as if they were real data — the rebuilt Reviews section
  only shows what a merchant actually enters, no invented aggregate claims.
- **Non-Shopify assumptions:** product data (images, prices, descriptions) was
  embedded directly in the page markup as if this were a static one-off site, rather
  than owned by a platform. Combo and bundle contents were three separate hardcoded
  card structures with no shared data source, which is what the shared
  `bundle_definition` metaobject in `docs/data-model.md` replaces.

## What I changed, and why

- **Hero:** The prototype's static copy, inline product stage, duplicate desktop/mobile promise markup, and scroll-linked animated scenes are now a merchant-editable section with shared heading/button/badge/bundle-card snippets, separate background and foreground media, and no scene animation system — product content stays editable and the architecture performance decision is applied.
- **Shop / Product Grid:** The prototype's hardcoded product cards, prices, ratings, and inline SVG product artwork are now a collection-driven grid using the seeded Best Sellers collection and shared product-card rendering — catalog data and edge-case handling come from Shopify products instead of page markup.
- **Bug fix — product image resolution:** Fixed the root cause in the shared product-card renderer by falling back from `featured_media` to `featured_image` and `media.first` before rendering, which keeps product imagery working in both the standard card and compact bundle rows when Shopify resolves media differently across collection and metaobject product references. The full-card Shop path now follows the same resolution chain as the compact bundle-card path instead of relying on a single media field.
- **Bug fix — duplicate sale badge and badge containment:** Prevented custom marketing labels from rendering when a product is already on sale, so Dawn's one native sale badge remains the single source of truth, and constrained the marketing badge to the card bounds so it no longer overflows into adjacent grid cells. Also hid the duplicate Dawn price-level sale/sold-out badge in the Shop card wrapper so the card shows a single sale/sold-out state rather than one badge in the media area and another near the price.
- **Best-selling Combos:** The prototype's hardcoded combo cards and duplicated bundle details are now repeatable blocks that reference shared bundle-definition records and render through one bundle-card path — canonical bundle content is reused across placements.
- **Bundles:** The prototype's three hardcoded quantity and price tiers are now repeatable blocks referencing the shared bundle-definition records and the shared bundle-card renderer — tier order and visibility are editable while product pricing stays catalog-owned.
- **Reviews Rail:** The prototype's duplicated auto-marquee cards and hardcoded five-star reviews are now merchant-managed testimonial blocks in a keyboard-focusable manual rail or grid, with each rating rendered from its block value — reviews are announced once and no content is duplicated for animation.
- **Smooth-scroll anchor navigation:** The prototype's page had no reliable in-page nav behavior beyond generic anchor links, so section jumps could miss their targets under a sticky header and motion was not handled thoughtfully for reduced-motion users; the homepage now uses anchor links to `#shop`, `#combos`, `#bundles`, and `#reviews`, applies a header-offset scroll adjustment to keep targets visible beneath the fixed header, and respects `prefers-reduced-motion` so smooth scrolling is disabled when the user prefers less animation.
- **Bug fix — LCP element had the wrong fetch priority:** Running Lighthouse against the built homepage identified the Hero background image, not the foreground product image, as the actual Largest Contentful Paint element — but the background image was set to `fetchpriority: auto` while the foreground carried `fetchpriority: high`. Swapped both so the image the browser actually needs to prioritize is the one marked high priority.
- **Cleanup — orphaned third-party app block:** `sections/footer-group.json` contained a dangling reference to a section type (`smooth-scroll`) belonging to a third-party Shopify app that had been connected and then removed, breaking the theme push with "section type does not refer to an existing section file." Removed the orphaned block from both the `sections` object and the `order` array; this was never part of the theme's own code.

## What I'd do with more time

- Run the animated background system through real device testing rather than removing it outright under time pressure — there may be a lighter-weight version of the effect that's still fast enough to keep, worth a proper investigation rather than a binary keep/cut call.
- Extend the reuse map to the prototype's bonus sections (ingredients, proof, categories) so the whole homepage shares one component system, not just the five required sections.
- Add automated Lighthouse and axe checks to CI so regressions are caught before a PR merges rather than in manual review — the LCP fetchpriority bug in this build was only caught because I happened to run Lighthouse manually at the right moment, not because anything would have caught it automatically.
- Give the bundle-card placement variants (`hero`/`combo`/`tier`) their own distinct visual treatment — they currently share one style, which works but doesn't visually differentiate the three placements the way a fully polished version would.
- Install a real review app and replace the current manual-only Reviews Rail rating input with the same review-app-backed pattern the product cards already use, so both places pull from one consistent rating source.
