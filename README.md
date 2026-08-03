# Purelane — Shopify Homepage Build

Production Shopify theme sections for Purelane, a plant-based homecare brand, built on stock
Dawn. Converts the design prototype at `docs/reference/purelane-homepage.html` into 5
merchant-editable homepage sections: Hero, Shop, Best-Selling Combos, Bundles, Reviews Rail.

## Setup

**Theme:** Stock Shopify Dawn, unmodified except for the additions documented below. No premium
theme or third-party section framework.

**Development:**
```
shopify theme dev
```
Runs a local preview synced to the connected dev store. The theme is also connected via
[GitHub integration](https://help.shopify.com/en/manual/online-store/themes/managing-themes/github),
so pushes to `main` sync automatically to the theme library.

**Store:** [dev store URL] — password: [password]

## Architecture

Full reasoning and decisions are in [`docs/architecture.md`](docs/architecture.md) — read that
first for the "why," this section is just the map.

### Sections (`sections/`)
- `hero.liquid` — heading, description, background/foreground media, overlay, CTAs, optional
  shared bundle offer, promise badges
- `shop.liquid` — collection-driven product grid, defaults to the Best Sellers collection
- `combos.liquid` — repeatable blocks referencing shared bundle-definition records
- `bundles.liquid` — same shared bundle-definition records, different presentation (tiers)
- `reviews.liquid` — merchant-managed testimonial blocks, keyboard-scrollable rail

### Snippets (`snippets/`)
All prefixed `purelane-` to avoid colliding with Dawn's own files:
- `purelane-product-card.liquid` — extends Dawn's `card-product`, handles sold-out/no-image/
  long-title edge cases, has a `--compact` variant for use inside bundle cards
- `purelane-bundle-card.liquid` — the single shared renderer for any bundle-definition record,
  used by Hero's offer block, Combos, and Bundles alike
- `purelane-button.liquid`, `purelane-section-heading.liquid`, `purelane-rating-stars.liquid`
  (reads Dawn's review-app fields), `purelane-badge.liquid`

### Assets (`assets/`)
- `purelane-base.css`, `purelane-components.css` — shared component styles, scoped to avoid
  fighting Dawn's own classes
- `purelane.js` — reduced-motion state management, respected by every animated element
  regardless of the merchant's animation-toggle setting

### Theme settings
Brand/accent color, button radius, animation toggle and duration — all under Theme settings,
not hardcoded, and all layered under the OS-level `prefers-reduced-motion` query so the
accessibility preference always wins over the merchant's toggle.

### Metafield and metaobject definitions

Full field-by-field spec in [`docs/data-model.md`](docs/data-model.md). Summary:

**`bundle_definition` metaobject** (one shared definition, used by Hero offers, Combos, and
Bundle Tiers — not three separate structures): title, included products, purchasable bundle
product, description, benefit lines, badge labels, featured flag, per-product message, CTA
label, CTA target override. CTA resolves override → purchasable product → incomplete-card state
if neither is set.

**Product metafield:** `custom.marketing_label` (single line text, optional) for non-price
merchandising labels like "Best seller." Product ratings use Dawn's native
`reviews.rating`/`reviews.rating_count` review-app fields, no duplicate rating metafield exists.

**Collections:** Best Sellers (manual, curated — this is what the homepage Shop section
actually pulls from), Shop (automated, all active products), Bundles (automated, product type =
Bundle).

## AI workflow

Full detail in [`docs/ai-workflow.md`](docs/ai-workflow.md), including specific failures caught
and corrected along the way (a plan that silently dropped a requirement during restructuring, a
CTA that disappeared when a field was left blank, star ratings that didn't reflect actual
values, a fetchpriority setting applied to the wrong image once real performance data was
checked). Short version: architecture and data-model design were done with Claude, working
against the actual prototype file and assignment text rather than a restated summary of either;
implementation went through Codex, then Copilot, then Cursor as tool availability changed
mid-build; every phase's output was reviewed against its brief before being accepted, not
assumed correct because it passed Theme Check.

## Build notes

What was flagged in the original prototype, what changed and why, and what I'd do with more
time: [`docs/build-notes.md`](docs/build-notes.md).

## Known gaps

Documented plainly rather than hidden:
- [fill in based on final Phase 5 state — e.g. bundle-card placement variants share one visual
  style rather than having distinct hero/combo/tier treatments]
- [fill in real final Lighthouse/accessibility numbers from the live published theme, not
  localhost]
- Bonus sections from the prototype (ingredients, proof, categories, etc.) were deliberately not
  converted — out of scope per the assignment, the 5 required sections were prioritized
