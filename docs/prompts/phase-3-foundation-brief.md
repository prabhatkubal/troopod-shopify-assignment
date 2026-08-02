# Phase 3 Brief — Shared Foundation (for Codex)

## Objective

Build the reusable snippets, assets, and theme settings that every one of the 5 sections will
depend on in Phase 4. Nothing built here should reference Hero, Shop, Combos, Bundles, or
Reviews specifically — if a snippet only makes sense for one section, it isn't shared
foundation, move it to Phase 4 instead.

This is real code, unlike Phase 1 and 2. Follow the extend-vs-replace calls already made in
`docs/architecture.md` exactly — this phase implements those decisions, it doesn't re-litigate
them.

## What to build

### 1. Snippets

For each: state in a one-line comment at the top of the file which architecture decision it
implements (extend Dawn / new build) and why.

- **`snippets/purelane-product-card.liquid`** — extends Dawn's existing `card-product` per the
  architecture's Dawn audit, doesn't fork it wholesale. Must handle all three required edge
  cases from the seeded catalog: sold out, no image (fallback image, not a broken `<img>`), and
  a very long title (clamp, don't let it break card layout). Used by Shop grid directly, and
  referenced conceptually by the bundle card below for included-product display.
- **`snippets/purelane-bundle-card.liquid`** — new build, since Dawn has no native equivalent.
  Renders a `bundle_definition` metaobject entry: title, included products (using the product
  card snippet or a compact variant of it), benefit lines, badge labels, featured state, and a
  CTA resolved per the fallback logic in `docs/data-model.md` Section 1 (override → purchasable
  product → incomplete-card handling). This is what Combos and Bundle Tiers will both render in
  Phase 4, don't build two versions.
- **`snippets/purelane-button.liquid`** — label, URL, style variant (primary/secondary), used
  everywhere a CTA appears.
- **`snippets/purelane-section-heading.liquid`** — heading, optional subheading/eyebrow,
  optional alignment setting.
- **`snippets/purelane-rating-stars.liquid`** — reads Dawn's existing review-app rating fields
  per the architecture decision (no duplicate rating metafield exists). Must render nothing, not
  a broken star row, when no rating data is present.
- **`snippets/purelane-badge.liquid`** — label + variant (sold out / featured / promotional),
  used by product cards and bundle cards both.

### 2. Assets

- **`assets/purelane-base.css`** — resets, CSS custom properties for color/spacing/typography
  that theme settings will control, base typography rules.
- **`assets/purelane-components.css`** — styles for the snippets above, scoped so they don't leak
  into or fight with Dawn's own component classes.
- **`assets/purelane.js`** — only what's genuinely needed at foundation level (e.g. a reduced-
  motion check other scripts can import). Don't put section-specific behavior here.

### 3. Theme settings

Add to the theme settings schema, not hardcoded in CSS:
- Brand color / accent color
- Button radius
- Animation speed and an animation on/off toggle
- Confirm `prefers-reduced-motion` is respected regardless of the toggle state — the toggle is a
  merchant preference, the OS-level setting is an accessibility requirement and always wins

## Constraints

- Prefix every new snippet, asset, and CSS class with `purelane-` so nothing collides with or
  quietly shadows a Dawn file of the same name. This matters for clean diffs and for reviewers
  being able to tell your work from Dawn's at a glance.
- No section files (`sections/*.liquid`) in this phase. If you find yourself needing one to test
  a snippet, stop — that's Phase 4 work bleeding forward.
- Every merchant-facing value (color, spacing, animation behavior) that a marketing team would
  plausibly want to change must be a theme setting or block/section setting, not hardcoded — even
  though no section exists yet to expose those settings, design the snippets to accept them as
  parameters now rather than retrofitting later.
- Accessibility baseline applies here already, not just in Phase 5: focus states on the button
  and card snippets, sufficient contrast in the base CSS, and the reduced-motion respect above.
  Don't defer basic accessibility to the hardening phase when it's cheap to build in now.
- No `docs/build-notes.md` entries required this phase (per the earlier standing instruction,
  those start in Phase 4 when prototype-derived section work begins). If you make a decision here
  that materially affects a later build-notes entry, leave a one-line comment in the relevant
  file instead.
