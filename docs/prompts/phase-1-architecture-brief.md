# Phase 1 Brief — Architecture Document (for Codex)

## Objective

Analyze `purelane-homepage.html` (the prototype, not a spec) and produce `docs/architecture.md`:
a complete Shopify architecture plan for the Dawn theme, covering only the 5 required sections
(Hero, Shop, Combos, Bundles, Reviews). Do not write any Liquid, JSON, or theme files. Output
only the markdown document.

You may propose changes to the structure below if you have a better rationale, as long as you
state the tradeoff. This is a design phase, disagreement with reasoning is welcome.

## What the document must contain

### 1. Component breakdown
For each of the 5 sections, break it into its constituent parts.
Example shape:
```
Hero
├── Heading
├── Description
├── CTA
├── Product Stage
└── Badge Rail
```
Do not do this for any other part of the prototype (ingredients, proof, categories, etc).
One line acknowledging they exist and are out of scope is enough.

### 2. Classification map
For every component identified above, decide: Section / Snippet / Block / Metaobject /
Metafield / Collection / Theme Setting. State the reasoning in one line per item, not just
the label.

### 3. Reuse map
Which components appear in more than one section. This is the strongest signal of whether the
build is actually reusable, so be exhaustive here (Product Card, Button, Section Heading,
Badge, Rating Stars, etc).

### 4. Merchant-editable map
Per section, list every field a non-technical marketing team should be able to change with no
exceptions. If something in the prototype looks hardcoded (a color, a threshold, a copy string),
flag it here even if it seems minor.

### 5. Dawn audit
Before designing anything new: list what Dawn's stock theme already provides that's relevant
(existing `card-product` snippet, existing settings schema entries, existing CSS custom
properties, existing section patterns). For each of the 5 sections, decide extend-vs-replace
and say why. The goal is to not reinvent what Dawn already ships.

### 6. Data source map
For every piece of content across the 5 sections, name the exact Shopify-native source: Product,
Collection, Metaobject, Metafield, Block, Section Setting, Collection Picker. Nothing should be
left unresolved or defaulted to "hardcoded in Liquid."

### 7. Theme settings
What belongs globally (brand color, accent, button radius, animation speed/toggle, container
width, reduced-motion support) versus scoped to a single section setting.

### 8. Performance posture
The prototype has a fixed, full-viewport animated background system: scroll-linked "scenes,"
layered SVG filters, several infinite CSS animations, and `mix-blend-mode` layers. This is the
largest Core Web Vitals risk in the file. Decide and document now: what survives production, what
gets simplified or removed, and how it behaves under `prefers-reduced-motion` and on low-end
devices. Don't defer this decision to the hardening phase, it affects the architecture.

### 9. File structure
Proposed layout for `sections/`, `snippets/`, `assets/` for just the 5 required sections plus
shared foundation.

### 10. Risk analysis
For each: state the risk and the concrete mitigation (not just "handle it").
- Animations breaking when sections are reordered in the theme editor
- Duplicate/inconsistent card markup across sections
- Product with no image
- Product with a very long title
- Product that is sold out

## Constraints

- No code. No JSON templates. No section schema. Text and structure diagrams only.
- Scope is strictly Hero, Shop, Combos, Bundles, Reviews.
- Every design decision needs a one-line "why," not just a label. A list of nouns without
  reasoning isn't useful for the next phase.
- Flag anything in the original prototype that's wrong for production (accessibility gaps,
  hardcoded values, non-semantic markup) and state what you'd change and why, inline where
  relevant.
