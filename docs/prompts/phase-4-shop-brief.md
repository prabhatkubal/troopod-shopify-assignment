# Phase 4 Brief — Shop / Product Grid Section (for Codex)

## Objective

Build `sections/shop.liquid` (or `sections/product-grid.liquid` — pick one, be consistent with
whatever naming Hero used, and note the choice in the file comment). Same standing instruction
as Hero: every change gets a `docs/build-notes.md` entry before the commit.

## What the section needs

### Section settings

- **Collection picker** — per `docs/data-model.md`, the homepage Shop section pulls from the
  **Best Sellers** manual collection, not the automated Shop collection. Don't hardcode which
  collection, use a standard `collection` setting type so a merchant can point it at a different
  collection later if priorities change, but the seeded default should be Best Sellers.
- **Products to show / limit** — range or number setting, capped at a sane max, with pagination
  or a "view all" link to the full collection if the collection has more products than the limit.
- **Columns per row** — with a responsive breakdown (e.g. how many columns at 375px vs. tablet vs.
  desktop), don't hardcode a single column count that only works at one breakpoint.
- **Section heading** — reuse `purelane-section-heading`, same as Hero, don't rebuild inline.
- Color scheme picker (reuse Dawn's `color_scheme` setting type).

### Grid and cards

- Every product renders through `purelane-product-card` (the full, non-compact variant) — it
  already handles the three required edge cases from Phase 3 (sold out via Dawn's `card-product`,
  no image via the placeholder SVG fallback, long title via the CSS line-clamp). Don't rebuild
  any of that logic in the section, just call the snippet per product in the collection loop.
- If the resolved collection has fewer products than the configured limit, render what exists,
  don't pad with empty slots or error.
- If the collection setting is unset or resolves to nothing (e.g. a merchant deletes Best
  Sellers), the section should show a clear empty state, not a broken loop or a blank section
  with no explanation in the theme editor.

### Theme editor survival

- Reordering/duplicating this section shouldn't break anything — it has no cross-section
  dependencies, confirm that stays true.
- Changing the collection setting live in the editor should update the grid without requiring a
  page reload assumption that breaks editor preview.

### Accessibility

- Grid should be navigable by keyboard in document order matching visual order.
- `purelane-product-card` already handles focus states from Phase 3, don't override them here.

## Constraints

- Don't modify `purelane-product-card.liquid` or any other Phase 3 foundation file for this
  section's sake. If the card snippet is missing something Shop specifically needs, flag it
  rather than special-casing it inside the section.
- Responsive from 375px up. At minimum confirm the grid doesn't force horizontal scroll or
  overflow at 375px with the long-title edge-case product in it.
- Append the `docs/build-notes.md` entry before considering this phase done.
