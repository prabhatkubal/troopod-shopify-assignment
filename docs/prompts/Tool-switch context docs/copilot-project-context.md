# Project Context for Copilot — Read This First

You're picking up a Shopify theme project mid-build. Everything below already happened with a
different coding agent (Codex) in a separate session. Nothing here is a suggestion, it's the
approved, committed state of the repo. Don't re-derive or second-guess these decisions, build on
top of them.

## The assignment

Turn `docs/reference/purelane-homepage.html` — a fast, non-production prototype homepage for a
plant-based homecare brand called Purelane — into 5 production Shopify sections on a stock Dawn
theme, merchant-editable, using real Shopify data, reusable, responsive from 375px, accessible,
performant, and with clean commit history. The 5 required sections: Hero, Shop/product grid,
Best-selling Combos, Bundles, Reviews Rail. This is a timed take-home assignment for an AI
Product Engineer role, submission includes the repo, a live dev store, metafield/metaobject
definitions, build notes, and AI-workflow notes.

## What's already built, phase by phase

**Phase 0 — Dawn initialized.** Stock Dawn theme, git repo, dev store connected.

**Phase 1 — Architecture.** `docs/architecture.md`. Full component breakdown of the 5 sections,
classification of what's a Section/Snippet/Block/Metaobject/Metafield/Collection/Theme Setting,
a Dawn audit (what to extend vs. build new), and a performance decision: the prototype's fixed,
scroll-linked animated background system (`.scenes`, `.water`, SVG filters, infinite CSS
animations) was deliberately **not** carried into production, replaced with a static,
reduced-motion-safe approach. Read this file for the full reasoning before making any structural
changes.

**Phase 2 — Data model.** `docs/data-model.md`. One key decision that shapes everything
downstream: Hero offers, Combos, and Bundle Tiers all share **one** `bundle_definition`
metaobject (title, included products, purchasable bundle product, description, benefit lines,
badge labels, featured flag, per-product message, CTA label, CTA target override). Combos and
Bundle Tiers are different presentational blocks that both reference the same record, don't
design or expect two separate metaobject types. Also defines the `custom.marketing_label`
product metafield, and confirms Dawn's native review-app fields (`reviews.rating`,
`reviews.rating_count`) are used for product ratings, no duplicate rating metafield exists. Store
is seeded: 8+ products including the 3 required edge cases (sold out, no image, very long
title), 3 collections (Shop, Best Sellers, Bundles — note Shop's homepage section pulls from
**Best Sellers**, not the Shop collection), and 3 populated `bundle_definition` entries.

**Phase 3 — Shared foundation.** Reusable snippets and assets, all prefixed `purelane-` to avoid
colliding with Dawn's own files:
- `snippets/purelane-product-card.liquid` — extends Dawn's `card-product`, handles sold-out/
  no-image/long-title edge cases, has a `--compact` variant used inside bundle cards
- `snippets/purelane-bundle-card.liquid` — the single shared renderer for any `bundle_definition`
  entry, used by Hero's offer block, Combos, and Bundles
- `snippets/purelane-button.liquid`, `purelane-section-heading.liquid`,
  `purelane-rating-stars.liquid` (reads Dawn's review-app fields), `purelane-badge.liquid`
- `assets/purelane-base.css`, `purelane-components.css`, `purelane.js`
- Theme settings: brand/accent color, button radius, animation toggle + duration, all
  respecting `prefers-reduced-motion` regardless of the toggle state
- Two real bugs were found and fixed in this phase: a bundle CTA that silently disappeared when
  `cta_label` was blank (now defaults to "Shop the bundle"), and rating stars that always
  rendered as a static full 5 stars regardless of the actual rating (now a proportional
  gradient-fill based on `rating / scale_max`)

**Phase 4 — All 5 sections built.** `sections/hero.liquid`, `shop.liquid`, `combos.liquid`,
`bundles.liquid`, `reviews.liquid`. Each reviewed individually and confirmed to correctly use
the Phase 3 snippets rather than duplicating markup. Reviews Rail intentionally does **not**
reuse `purelane-rating-stars` (that snippet reads product review-app data, Reviews needs a raw
per-block integer rating instead) — it has its own local star rendering, deliberately, with a
file comment explaining why, using the same proportional-fill technique so the earlier bug
pattern wasn't reintroduced. Small open items were carried into Phase 5 rather than fixed
separately (see below).

**Phase 5 — Hardening (in progress).** Was about to start a broader performance/accessibility/
theme-editor pass, plus five small carried-over fixes: Hero's background+foreground images both
had `fetchpriority: high` (should be one, not both), Hero's hardcoded `h1` could duplicate if the
section is duplicated in the editor, Combos/Bundles had no empty-state message (Shop does),
Shop had a redundant unused `{% paginate %}` tag, and bundle-card placement variants
(`hero`/`combo`/`tier`) had no distinct styling defined despite being passed through.

## What's actually broken right now (why you're here)

The homepage was manually assembled in the theme editor (blocks added, Shop's collection picker
set to Best Sellers) and pulled back into `templates/index.json`, then viewed live. Real bugs
found by visual inspection, not caught by Theme Check:

1. **Product images aren't rendering** in Shop's grid or in the compact product rows inside
   bundle cards, even for products with real images confirmed working on Dawn's own
   `/collections/all` page. Something in `purelane-product-card.liquid`'s image resolution is
   broken specifically in these render paths.
2. **Duplicate "Sale" badge** showing twice per Shop card.
3. **"Best Seller" badge overflowing** its card into the neighboring grid item.

On top of the bugs, there's a **visual parity gap**: the live site is structurally correct but
looks like generic Dawn with brand colors applied, not a real match to
`docs/reference/purelane-homepage.html`'s typography scale, button weight, spacing rhythm, and
card presentation. That's a design-detail pass, not a rebuild.

## Your actual task right now

Follow `docs/prompts/bugfix-visual-parity-brief.md`. Fix the three bugs above first (Part A),
confirm them against the live theme preview, then move to the visual parity pass (Part B). Don't
change section schema, block structure, or the data model in either part, this is a fix-and-polish
pass on top of approved structure.

## Standing rules that still apply

- Every change gets a factual entry in `docs/build-notes.md` under "What I changed, and why"
  before the commit. Don't remove the template comments in that file, that's a human's job on
  final review.
- Prefix any new CSS/snippet with `purelane-`, consistent with everything else in the repo.
- Don't modify `docs/architecture.md` or `docs/data-model.md` — approved, out of scope.
- If something here is ambiguous or you find a decision that seems wrong, flag it explicitly
  rather than silently deciding differently, the person reviewing your output needs to see your
  reasoning, not just the result.
