# Bug Fix + Visual Parity Brief

Handoff context: this repo has completed Phases 0-4 (architecture, data model, shared
foundation, all 5 sections built) with a prior agent (Codex). Continuing now in VS Code. Read
`docs/architecture.md`, `docs/data-model.md`, and `docs/build-notes.md` first for full context
before touching anything, don't re-derive decisions already made there.

Same standing instruction as prior phases: every fix gets an entry in `docs/build-notes.md`
before the commit.

## Part A — Bugs (fix first, these are broken, not stylistic)

### 1. Product images not rendering in Shop grid and bundle-card compact rows

On the live homepage, Shop's product grid cards and the compact included-product rows inside
Combo/Bundle cards show empty placeholder boxes, even for products confirmed to have real
images (verified working correctly on `/collections/all`, Dawn's own catalog page). Investigate
`snippets/purelane-product-card.liquid`'s image resolution (both the full card path that wraps
Dawn's `card-product`, and the `--compact` variant used inside `purelane-bundle-card.liquid`).
Find why the same product resolves an image in one render path and not the other, and fix the
actual cause, don't just patch symptoms.

### 2. Duplicate "Sale" badge on Shop cards

Each product card is showing a Sale badge twice, once near the image, once near the price.
Identify whether this is Dawn's native price/sale badge firing alongside a custom badge in
`purelane-product-card.liquid` for the same condition, and remove the duplicate, keep one
consistent source of truth for sale-state badging.

### 3. "Best Seller" badge overflowing card bounds

The marketing-label badge is visibly bleeding outside its card into the neighboring grid item.
This is a CSS containment/positioning bug in `purelane-components.css` or the card markup
itself (likely missing `position: relative` on the containing element, or the badge's absolute
positioning isn't scoped correctly at certain card widths). Fix so the badge stays contained
within its own card at every breakpoint.

## Part B — Visual parity with the prototype

Compare the live homepage directly against `docs/reference/purelane-homepage.html` (or wherever
the reference file ended up) section by section. The current build is structurally correct but
visually reads as generic Dawn with brand colors applied, not the prototype's actual design
language. Bring these closer without breaking any merchant-editable settings already built:

- **Typography scale** — compare heading sizes, weights, and line-height in the prototype vs.
  the live site. The prototype likely has more deliberate size contrast between hero heading,
  section headings, and body copy than what's currently rendering.
- **Button treatment** — the prototype's CTAs read as more intentional (weight, padding, possibly
  a distinct hover/focus state) than the current default-looking buttons. Update
  `purelane-button.liquid` / its CSS to match the prototype's visual weight while keeping the
  existing style variants (primary/secondary) and focus-visible states intact.
- **Spacing rhythm** — check whether section and card padding matches the prototype's density, or
  if things are reading too loosely/tightly spaced compared to the original.
- **Card presentation** — badges, borders, and the featured-state treatment (the orange border on
  featured bundle cards) should be checked against how the prototype visually distinguished
  similar states, adjust if it's currently under- or over-emphasized.

Do not change the underlying data model, section schema, or block structure in this pass —
this is a CSS/markup-detail pass on top of the existing correct structure, not a redesign.

## Constraints

- Confirm every fix against the live theme preview, not just Theme Check passing with zero
  errors, that check doesn't catch visual bugs like these.
- Don't touch `docs/architecture.md` or `docs/data-model.md`, those are approved and out of
  scope here.
- Keep responsive behavior intact at 375px while making these changes, check after each fix.
