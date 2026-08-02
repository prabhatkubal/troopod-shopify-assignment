# Phase 4 Brief — Hero Section (for Codex)

## Objective

Build `sections/hero.liquid`, the first of the 5 required sections. This is real prototype
conversion work: convert the prototype's `.hero` markup into a merchant-editable Shopify section
using the foundation built in Phase 3. Do not duplicate markup that already exists in
`purelane-section-heading.liquid`, `purelane-button.liquid`, `purelane-badge.liquid`, or
`purelane-bundle-card.liquid` — call them.

**Standing instruction now active:** every change in this phase gets an entry appended to
`docs/build-notes.md` under "What I changed, and why" before the commit. What it was in the
prototype, what it is now, one-line reason. Don't touch the template comments already in that
file, leave those for review.

## What the section needs

### Section settings (global to the Hero, not per-block)

- Background: image picker, and a fallback background color/color scheme for when no image is
  set or while it loads
- Overlay: color and opacity control, so text stays readable over any background image a
  merchant picks
- Color scheme picker (reuse Dawn's standard `color_scheme` setting type, don't invent a new one)
- Content alignment: left / center / right (matches `purelane-section-heading`'s alignment param)
- Padding top / padding bottom (range settings, matches Dawn's usual padding pattern for other
  sections so it's consistent with the rest of the theme)
- Foreground/product image (separate from the background image, if the prototype's hero has a
  distinct product visual in front of the background — check the prototype and confirm which
  pattern applies before assuming)

### Blocks

- **Heading block** (or section-level settings, your call, but justify it in the file comment):
  heading text, optional eyebrow/subheading, optional rich-text description — rendered through
  `purelane-section-heading`, not custom markup.
- **Button block**, repeatable, 1+ allowed: label, URL, style (primary/secondary) — rendered
  through `purelane-button`. Support at least 2 buttons since the prototype has a primary and
  secondary CTA.
- **Bundle offer block** (optional, 0 or 1): references a `bundle_definition` metaobject entry,
  per `docs/data-model.md`'s note that Hero offers reuse the same shared metaobject as Combos and
  Bundles. Render it through `purelane-bundle-card` with the `variant` param set appropriately
  for hero placement, don't build a second bundle-rendering path.
- **Badge rail block(s)** (optional, repeatable): label + variant, rendered through
  `purelane-badge`, for whatever trust/feature badges the prototype hero shows (e.g. "plant-
  based," "cruelty-free" — check the actual prototype copy, don't invent generic ones).

### Animation

The prototype's hero relies on the `.scenes`/`.water`/scroll-driven animation system that
`docs/architecture.md`'s performance posture section already made a call on. Implement exactly
what that document decided, don't reintroduce the original scroll-linked scene system it moved
away from, and don't make a new call here — if the architecture doc's decision is ambiguous when
you get to implementation, stop and ask rather than guessing.

Whatever animation remains must respect `data-purelane-motion` and `prefers-reduced-motion`
using the mechanism already built in Phase 3 (`purelane.js`, `purelane-base.css`), not a new
one.

### Theme editor survival

- No section-specific ID assumptions that break if the section is duplicated (use `section.id`
  for any scoped CSS custom properties or anchors, the way Dawn sections already do).
- Removing all blocks should not error, it should render a sane empty/minimal state.
- Reordering blocks should not depend on block position beyond what the schema itself enforces.

### Accessibility

- Correct heading hierarchy: Hero heading should be the page's primary heading where appropriate
  (use `purelane-section-heading`'s `heading_tag` param, don't hardcode a tag inside the section).
- Background/decorative imagery marked `aria-hidden` where it's not meaningful content.
- Focus states are already handled by the snippets Phase 3 built, don't override them.
- Every image needs real alt text sourced from the image setting's own alt field, not a generic
  placeholder string.

## Constraints

- Don't modify any Phase 3 foundation file unless you find an actual bug. If you do, stop, flag
  it, don't silently patch it inside this phase's commit.
- Everything a marketing team would plausibly want to change must be a setting, not hardcoded —
  this includes copy, images, colors, alignment, and padding, per the assignment's explicit bar.
- Responsive from 375px up, no fixed pixel widths that break at small viewports.
- Append the `docs/build-notes.md` entry before you consider this phase done, not after.
