# Purelane Shopify Build — Milestone Roadmap

Architecture-first sequencing. Each phase ends in one git commit and one push.
Do not skip ahead to a later phase even if it feels faster.

---

## Phase 0 — Project Setup ✅ (Completed)

**Committed:** `Initialize official Dawn theme`

- Official Dawn theme pulled from Shopify
- Git repo initialized
- Dev store connected
- Project structure verified

---

## Phase 1 — Architecture (Design only, no code)

**Goal:** Produce `docs/architecture.md`. This is the blueprint every later phase implements against.

**Tasks**
- Component breakdown for the 5 required sections only (Hero, Shop, Combos, Bundles, Reviews). Everything else in the prototype gets one line: "bonus, not analyzed."
- For every component, classify it: Section / Snippet / Block / Metaobject / Metafield / Collection / Theme Setting.
- Reuse map: which components are shared across sections (Product Card, Button, Section Heading, Badge, Rating Stars).
- Merchant-editable map: every field a marketing team should be able to change per section, with no exceptions.
- Data source map: for every piece of content, name the exact Shopify source (Product, Collection, Metaobject, Metafield, Block, Section Setting).
- **Dawn audit (new):** list what Dawn already ships (`card-product`, existing settings schema, existing CSS custom properties) and decide extend-vs-replace for each, before designing new snippets. Don't rebuild what Dawn already gives you.
- **Performance posture (new):** the prototype has a fixed animated background system (scroll-linked scenes, SVG filters, multiple infinite CSS animations, `mix-blend-mode`). Decide now, not in Phase 5, whether/how much of this survives production, and how it degrades under `prefers-reduced-motion` and on low-end devices. This is the single biggest Core Web Vitals risk in the file.
- Theme settings: what belongs globally (brand color, accent, button radius, animation toggle) vs. per-section.
- Risk analysis: animation breaking on reorder, duplicate cards, missing product image, long title, sold-out state. State the mitigation for each, not just the risk.
- Recommended file structure for `sections/`, `snippets/`, `assets/`.

**Deliverable:** `docs/architecture.md`

**Commit:** `Add Shopify architecture and component design document`

---

## Phase 2 — Store & Data Setup

**Goal:** Seed the dev store to match what Phase 1 decided.

**Tasks**
- 8+ products suited to a plant-based homecare brand, with descriptions, prices, compare-at prices where relevant.
- Required edge cases: 1 sold out, 1 with no image, 1 with a very long title.
- Collections: Shop, Best Sellers, Bundles.
- Product organization: types, tags, vendors, status.
- Create metaobject and metafield definitions decided in Phase 1 (e.g. Combo, Bundle, Badge).
- Verify collections populate automatically and products display correctly.

**Deliverable:** Seeded store + `docs/data-model.md` listing every metafield/metaobject definition created, with field types and purpose.

**Commit:** `Seed development store and define metafields and metaobjects`

---

## Phase 3 — Shared Foundation

**Goal:** Build reusable components before touching any of the 5 sections. Nothing here should be tied to Hero specifically.

**Tasks**
- Snippets: `product-card.liquid` (extend Dawn's `card-product` where possible, don't fork it wholesale), `button.liquid`, `section-heading.liquid`, `rating-stars.liquid`, `badge.liquid`.
- Assets: `purelane-base.css`, `purelane-components.css`, `purelane.js`.
- Theme settings additions: colors, typography, spacing, animation toggle, reduced-motion support.

**Commit:** `Build reusable UI foundation on top of Dawn`

---

## Phase 4 — Sections

Build in this order. Each section gets its own commit, and each commit includes an appended
entry in `docs/build-notes.md` ("What I changed, and why") for that section, written by Codex
as it goes and reviewed/edited by me before it's final.

1. **Hero** — heading, subheading, description, buttons, image, background, overlay, alignment, padding, colors all merchant-editable. Animation must survive theme editor add/remove/reorder.
   Commit: `Build merchant editable hero section`

2. **Shop / Product Grid** — merchant picks a collection, uses the shared product-card snippet, handles sold out / missing image / long title, pagination or limit setting.
   Commit: `Implement collection driven product grid`

3. **Best Selling Combos** — driven by the Combo metaobject from Phase 2.
   Commit: `Implement best selling combos with metaobjects`

4. **Bundles** — reuses Product Card, Button, Heading snippets; metadata via product metafields or a Bundle metaobject per Phase 1's decision.
   Commit: `Implement bundles section`

5. **Reviews Rail** — block-based (customer, rating, review text, location, avatar), scrollable, keyboard accessible, respects reduced motion.
   Commit: `Build configurable reviews section`

---

## Phase 5 — Production Hardening

**Goal:** Turn "it works" into "it's shippable."

**Performance**
- Lazy loading, responsive images (`srcset`/`sizes`), minimize JS.
- Resolve the animated-background decision from Phase 1: strip, simplify, or gate it.
- Lighthouse pass on mobile, targeting good CWV, not just a passing score.

**Accessibility**
- Focus states, ARIA, keyboard navigation, contrast, reduced motion, confirmed on all 5 sections.

**Theme Editor**
- Verify add, remove, reorder, and duplicate on every section without breakage, including animations.

**Commit:** `Improve performance, accessibility, and editor compatibility`

---

## Phase 6 — Documentation & Submission

**README covers:**
- Setup (dev store, theme install)
- Architecture (sections, snippets, assets, metafield/metaobject definitions)
- AI workflow notes: what AI generated, what was manually rewritten, where AI failed, what you'd automate next time
- Build notes: original prototype issues flagged, what changed and why, what you'd do with more time

**Commit:** `Add documentation and submission notes`

---

## Final Deliverables Checklist

- [ ] Development store URL + password
- [ ] GitHub repo with clean, phase-by-phase commit history
- [ ] Official Dawn theme as the base
- [ ] Hero section
- [ ] Shop / Product Grid section
- [ ] Best-selling Combos section
- [ ] Bundles section
- [ ] Reviews Rail section
- [ ] `docs/architecture.md`
- [ ] `docs/data-model.md` (metafield + metaobject definitions)
- [ ] `docs/build-notes.md` — appended per-section by Codex during Phase 4, reviewed/rewritten by me, template comments stripped before submission
- [ ] `docs/ai-workflow.md` — written by me, not Codex, throughout the build
- [ ] README
