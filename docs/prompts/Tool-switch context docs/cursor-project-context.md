# Project Context for Cursor — Read This First

Picking up mid-build, third coding agent on this repo (after Codex, then Copilot — Copilot hit
its usage limit mid-task, so some of its assigned work may be partially done, fully done, or not
started at all, don't assume). Everything below is approved, committed history unless flagged
otherwise. Don't re-derive these decisions, build on top of them.

## First thing to do: figure out actual current state

Before touching anything, run `git log --oneline -20` and read `docs/build-notes.md` in full.
Cross-reference against the task files listed below to figure out what Copilot actually
finished vs. what it was assigned but may not have completed before running out of credits.
Don't trust a task file's existence as proof the work happened, only commits and build-notes
entries prove that.

## The assignment

Turn `docs/reference/purelane-homepage.html` (a fast, non-production prototype) into 5
production Shopify sections on stock Dawn: Hero, Shop/product grid, Best-selling Combos,
Bundles, Reviews Rail. Merchant-editable, real Shopify data, reusable, responsive from 375px,
accessible, performant, clean commit history. Timed take-home for an AI Product Engineer role;
submission includes repo, live dev store, metafield/metaobject definitions, build notes, and
AI-workflow notes.

## What's built and approved (Phases 0-4, all confirmed done)

- **`docs/architecture.md`** — component breakdown, Section/Snippet/Block/Metaobject
  classification, Dawn audit, and the performance decision to drop the prototype's scroll-linked
  animated background system entirely (static + reduced-motion-safe instead).
- **`docs/data-model.md`** — one shared `bundle_definition` metaobject used by Hero's offer
  block, Combos, and Bundle Tiers (not three separate structures). `custom.marketing_label`
  product metafield. Dawn's native `reviews.rating`/`reviews.rating_count` used for product
  ratings, no duplicate metafield. Store seeded: 8+ products with all 3 required edge cases
  (sold out, no image, very long title), 3 collections (note: homepage Shop pulls from **Best
  Sellers**, not the Shop collection), 3+ populated `bundle_definition` entries.
- **Phase 3 foundation** — `snippets/purelane-*` (product-card, bundle-card, button,
  section-heading, rating-stars, badge), `assets/purelane-*` (base.css, components.css, .js).
  Two bugs found and fixed here: bundle CTA silently disappearing when `cta_label` was blank
  (now defaults to "Shop the bundle"), and rating stars always showing static full 5 stars (now
  a real proportional gradient-fill).
- **Phase 4 sections** — `sections/hero.liquid`, `shop.liquid`, `combos.liquid`,
  `bundles.liquid`, `reviews.liquid`, all built and reviewed individually. Reviews Rail has its
  own local star-rendering (not `purelane-rating-stars`, which is product-review-app-specific),
  deliberately, with a file comment explaining why.

## What happened after Phase 4 (visual/bug-fix round, with Codex/Copilot)

Several follow-up tasks were sent, in this order — check `docs/build-notes.md` and git log to
confirm which actually landed:

1. `docs/prompts/bugfix-visual-parity-brief.md` — fixed: broken product images in Shop grid and
   compact bundle rows, duplicate Sale badge, Best Seller badge overflow, plus a visual parity
   pass (typography, button weight, spacing) against the prototype. **Confirmed done and visible
   live** as of the last screenshot review.
2. `docs/prompts/bugfix-followup.md` — a second round on the image/badge bugs after the first
   pass only partially fixed them. **Confirmed done.**
3. `docs/prompts/smooth-scroll-anchor-task.md` — anchor ids on Shop/Combos/Bundles/Reviews
   sections, smooth-scroll with sticky-header offset, respecting the existing
   `data-purelane-motion`/reduced-motion system. Nav menu links (`/#shop` etc.) were configured
   manually in Shopify admin, separate from this code task. **Confirmed done** — nav bar shows
   Shop/Combos/Bundles/Reviews as working anchor links in the last screenshot.
4. `docs/prompts/build-notes-update-and-cleanup-task.md` — remove the stray Dawn default Contact
   form section that was sitting unstyled on the homepage, and log the smooth-scroll feature in
   build-notes.md. **Status unconfirmed, verify this landed.**
5. `docs/prompts/phase-5-completion-task.md` — the big one, sent right before Copilot hit its
   credit limit. **Status unknown, this is likely where you need to actually start working.**
   Contains:
   - Confirmed already done (per items 1-3 above): image bugs, badge bugs, smooth-scroll
   - **Still open, verify and finish:**
     - Hero: both `background_image` and `foreground_image` are `fetchpriority: 'high'`, only
       the real LCP candidate should be
     - Hero: hardcoded `h1` could duplicate if the section is duplicated in the theme editor
     - Combos/Bundles: no empty-state message for zero blocks (Shop has one, they don't)
     - Shop: redundant unused `{% paginate %}` tag
     - Bundle-card placement variants (`hero`/`combo`/`tier`) have no distinct styling defined
     - **A real Lighthouse pass (mobile)** on the live homepage — actual scores needed, not
       estimates, this hasn't been run yet as far as we know
     - **A real automated accessibility check** (axe or equivalent) — actual violations or
       confirmed-none, not asserted
     - **Theme editor stress test** on all 5 sections (add/remove/reorder/duplicate,
       block-level where applicable) — report what was actually tested

## Your task right now

1. Confirm the actual state of items 4 and 5 above against git log and build-notes.md.
2. Finish whatever's still genuinely open from Phase 5, in the order listed in
   `docs/prompts/phase-5-completion-task.md`.
3. Report back the real Lighthouse and accessibility numbers specifically — these are needed
   verbatim for the person's submission cover email, don't summarize them away.

## Standing rules that still apply

- Every change gets a factual `docs/build-notes.md` entry before its commit. Don't touch the
  "What I'd flag" or "What I'd do with more time" sections, those are the person's to write.
- Prefix new CSS/snippets `purelane-`.
- Don't modify `docs/architecture.md` or `docs/data-model.md` — approved, out of scope.
- If you find Copilot left something half-done or inconsistent, flag it explicitly rather than
  silently finishing it your own way if the direction isn't clear from the task file.
