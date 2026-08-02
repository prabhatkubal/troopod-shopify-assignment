# Phase 4 Brief — Combos, Bundles, Reviews (for Codex)

## Objective

Build the remaining three of the five required sections: `sections/combos.liquid`,
`sections/bundles.liquid`, `sections/reviews.liquid`. These are three separate sections with
three separate commits, treat this brief as three jobs, not one — do not merge them into a
single file or a single commit.

Same standing instruction as Hero and Shop: **every section gets its own
`docs/build-notes.md` entry before its own commit.** Three sections, three entries, three
commits. Don't batch them.

---

## 1. Best-Selling Combos — `sections/combos.liquid`

### Settings
- Section heading (via `purelane-section-heading`)
- Color scheme picker
- Layout setting if the prototype shows combos differently from a simple grid (check the
  prototype's actual `#combos` markup before assuming a plain grid)

### Blocks
- **Combo block**, repeatable: one required setting, a metaobject reference restricted to
  `bundle_definition` (per `docs/data-model.md` Section 3). Render each block through
  `purelane-bundle-card`, passing the referenced `bundle_definition` entry. Don't build a second
  bundle-rendering path, this is the entire reason the shared metaobject and shared snippet
  exist.
- If a block's referenced metaobject entry has been deleted, skip that card per the graceful-
  degradation behavior already specified in `docs/data-model.md` — don't dereference a broken
  record.

---

## 2. Bundles — `sections/bundles.liquid`

### Settings
- Section heading (via `purelane-section-heading`)
- Color scheme picker

### Blocks
- **Bundle Tier block**, repeatable: same `bundle_definition` metaobject reference setting as the
  Combo block above, same `purelane-bundle-card` render path. Combos and Bundle Tiers are
  different presentational contexts over the same shared data, per the confirmed architecture
  decision — the block schema and section layout can differ from Combos (e.g. tiered/ranked
  presentation vs. a flat grid, check the prototype's `#bundles` markup for what it actually
  shows), but the underlying render call should not diverge into a second implementation.
- Same graceful-degradation behavior for deleted metaobject references as Combos.

---

## 3. Reviews Rail — `sections/reviews.liquid`

### Settings
- Section heading (via `purelane-section-heading`)
- Color scheme picker
- Layout setting if scrollable (see below)

### Blocks
- **Review block**, repeatable: customer name, rating, review text, location, avatar image —
  all as block settings, merchant-editable, no hardcoded sample reviews.
- **Rating display:** this is testimonial-block data, not a product's review-app rating, so
  `purelane-rating-stars` (which reads `product.metafields.reviews.*`) doesn't directly apply
  here — it takes a product, not a raw integer. Either extend that snippet to optionally accept
  a raw rating value as a parameter (preferred, keeps one shared rating-display component
  instead of two), or build a small local rendering if extending it isn't clean, but if you do
  the latter, flag it as a deliberate exception in a file comment and explain why a shared
  component wasn't used. Whichever you pick, don't hardcode a static 5-star display regardless
  of the block's actual rating value, that was the exact bug fixed in Phase 3, don't reintroduce
  it here.

### Scrollable / marquee behavior
- `docs/architecture.md` flagged the prototype's review marquee as duplicating review markup for
  a seamless infinite-scroll effect. If you reproduce any visual looping/duplication for a
  marquee effect, the duplicated copies must be `aria-hidden="true"` and not real, independently
  navigable content — a screen reader should encounter each real review once, not twice. If a
  simple scrollable rail without duplication achieves an acceptable look, prefer that over
  reproducing the duplication trick at all.
- Must be keyboard-scrollable (arrow keys or visible focus lands on a scrollable region with
  standard scroll behavior, not a click-and-drag-only interaction).
- Respect `data-purelane-motion` and `prefers-reduced-motion` using the Phase 3 mechanism — any
  auto-scrolling/looping behavior must stop under reduced motion, manual scroll should still
  work.

---

## Constraints (all three sections)

- Don't modify any Phase 3 foundation file for any of these sections unless you find an actual
  bug — if you do, stop, flag it, don't patch it silently inside one of these commits.
- Everything a marketing team would plausibly want to change is a setting, not hardcoded: this
  includes all review content, all combo/bundle content (already covered by the metaobject
  reference), and section headings.
- Responsive from 375px up for all three.
- Theme editor survival: adding, removing, reordering, and duplicating blocks within any of
  these three sections must not break rendering or the animations/motion behavior.
- Each section's `docs/build-notes.md` entry gets written and committed with that section, not
  batched at the end.
