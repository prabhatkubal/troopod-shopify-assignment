# Phase 2 Brief — Data Model & Store Setup (for Codex)

## Objective

Produce `docs/data-model.md`: exact, ready-to-enter metaobject and metafield definitions that
implement the architecture confirmed in `docs/architecture.md`, plus a store-seeding checklist.
No Liquid, no section code. This phase turns the architecture's data-source map into concrete,
buildable definitions Phase 3 and Phase 4 can rely on without re-deciding anything.

Confirmed going in: there is one shared `bundle-definition` metaobject. Combos and Bundle Tiers
use different section blocks for layout, order, and visibility, but both reference the same
`bundle-definition` record for canonical data (products, labels, benefit copy, purchasable
bundle product, CTA target). Do not design two separate metaobjects for this.

## What the document must contain

### 1. `bundle-definition` metaobject — full field spec

For every field: name, Shopify field type (single line text, rich text, product reference, list
of product references, URL, boolean, etc), required or optional, and a one-line purpose. Cover
at minimum:
- Title
- Included products (list of product references)
- Purchasable bundle product (single product reference — the actual sellable SKU the CTA lands on)
- Benefit lines (list)
- Promotional/featured badge label
- Featured/highlighted flag (boolean, per architecture's "featured state")
- CTA target (should fall back to the purchasable product if no override is set — state how that
  fallback is implemented, since metaobjects don't have conditional logic themselves)

### 2. Product metafield definitions

Per the architecture's data source map:
- Marketing label (best seller / new / similar), field type and namespace
- Rating + review count — only define this if no review app is planned; if Dawn's built-in
  review-app metafield reading is intended, state that explicitly instead of creating a
  duplicate field
State namespace and key naming convention up front (e.g. `custom.marketing_label`) and use it
consistently across every field in this document.

### 3. Block-to-metaobject reference

Confirm and document how a Combo block and a Bundle Tier block each reference a
`bundle-definition` record (metaobject reference setting on the block), including what happens
in the theme editor if a merchant deletes a referenced metaobject entry — the block should fail
gracefully, not break the section.

### 4. Collections

- Shop (all products, or a curated bestseller subset — confirm which, per architecture's Shop
  section decision)
- Best Sellers
- Bundles
State whether each is manual or automated (rules-based), and if automated, the rule.

### 5. Store seeding checklist

Restate as an explicit, checkable list (this was the item that silently disappeared from an
earlier draft of the plan, don't let that happen again):
- 8+ products suited to a plant-based homecare brand: descriptions, prices, compare-at prices
  where relevant
- 1 product marked sold out
- 1 product with no image
- 1 product with a very long title
- At least 2-3 seeded `bundle-definition` records with real product references, since both
  Combos and Bundles need live data in Phase 4, not placeholder text
- Product organization: types, tags, vendor, status assigned consistently across all seeded
  products

## Constraints

- No Liquid, no JSON section schema, no theme files. This is a data-model and content-seeding
  document only.
- Every field must map back to something named in `docs/architecture.md`'s data source map. If
  you need a field that map doesn't cover, add it and flag it explicitly as a gap in the earlier
  document rather than inventing it silently.
- Where a decision has a real tradeoff (e.g. manual vs. automated collection), state the
  tradeoff in one line rather than picking silently.
- If store seeding requires manual work in Shopify admin (uploading images, writing product
  copy) that you can't do directly, say so plainly and hand back a checklist rather than a
  half-finished attempt.
