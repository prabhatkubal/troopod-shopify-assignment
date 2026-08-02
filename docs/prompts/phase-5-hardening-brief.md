# Phase 5 Brief — Production Hardening (for Codex)

## Objective

Harden all 5 sections (Hero, Shop, Combos, Bundles, Reviews) for performance, accessibility, and
theme editor resilience. This phase also closes out the small open items flagged during the
Phase 4 review below — fix them here rather than treating them as a separate correction round.

Same standing instruction: every fix gets a `docs/build-notes.md` entry. Given this phase
touches multiple existing files rather than building new ones, one combined entry per section
(not per line-fix) is fine, just be specific about what changed in each.

## Carried-over fixes from Phase 4 review

1. **Hero — LCP priority conflict.** Both `background_image` and `foreground_image` are
   currently `fetchpriority: 'high'`. Only the actual largest-paint candidate should carry that
   priority. Determine which one is more likely to be the LCP element in the default preset
   (foreground product image, most likely) and drop the other to `fetchpriority: 'auto'` or
   remove the attribute.
2. **Hero — duplicate-section heading risk.** The Hero heading is hardcoded to `h1`. If a
   merchant duplicates the Hero section in the theme editor, the page gets two `h1` elements.
   Decide and implement a fix: either only the first Hero instance on the page renders `h1` and
   subsequent instances render `h2`, or accept this as a known limitation and document why in a
   file comment — don't leave it unaddressed silently.
3. **Combos / Bundles — no empty-block state.** Shop has an empty-state message when no products
   resolve; Combos and Bundles render an empty container with no merchant-facing message if zero
   blocks are added. Add a comparable empty-state message setting to both, consistent with Shop's
   pattern.
4. **Shop — redundant `{% paginate %}` tag.** Pagination controls are never rendered, only a
   "View all" link. Either remove the `paginate` tag (the `limit:` on the loop already does the
   work) or implement real pagination controls if you think it's more useful than "View all" —
   pick one, don't leave the redundant tag in place with no explanation.
5. **Bundle card placement variants.** `variant: 'hero'`, `variant: 'combo'`, `variant: 'tier'`
   are passed to `purelane-bundle-card` but only `--featured` has actual styling in
   `purelane-components.css`. Decide whether these placements need visual differentiation — if
   not, remove the unused variant modifier classes rather than leaving dead hooks; if yes, add
   the styling.

## Performance

- Confirm every image render (`image_tag`) across all 5 sections uses appropriate `widths`,
  `sizes`, and `loading` values — `loading: 'lazy'` for anything below the fold, `loading: 'eager'`
  only for genuinely above-the-fold content.
- Confirm `purelane.js` and any other custom JS stays minimal — no unnecessary polling, no
  duplicate event listeners across sections.
- Run a Lighthouse pass (mobile) on the homepage with all 5 sections populated with real seeded
  data. Report actual scores, don't estimate them. If Performance is below 90, identify the
  specific cause (largest asset, longest task, biggest layout shift) rather than a general
  "optimize more" note.
- Confirm no layout shift from images without explicit dimensions or aspect-ratio reservations.

## Accessibility

- Full pass across all 5 sections: focus states visible and consistent (should already hold from
  Phase 3's shared snippets, verify it does), color contrast on all text/background combinations
  including badge and overlay text, correct heading hierarchy across the whole homepage (h1 once,
  h2 per section, no skipped levels).
- Confirm every interactive element (buttons, the scrollable rails) is reachable and operable by
  keyboard alone, not just visually present.
- Confirm `prefers-reduced-motion` and the `purelane_animations_enabled` theme setting both still
  work correctly with all 5 sections now in place, not just in isolation from Phase 3.
- Run an automated accessibility check (axe or equivalent) and report actual violations found,
  not just "looks fine."

## Theme editor verification

For each of the 5 sections, confirm and report the result of:
- Add the section to a fresh template
- Remove the section
- Reorder it relative to the others
- Duplicate it
- Add, remove, and reorder blocks within it (where applicable)

Report any breakage found, don't just assert "verified" without noting what was actually tested.

## Constraints

- No new features. This phase fixes and hardens what exists, it doesn't add scope.
- If a fix here requires touching a Phase 3 foundation snippet (e.g. the fetchpriority or
  variant-class issues might), that's expected and allowed in this phase specifically, unlike
  earlier phases — just note it clearly in the build-notes entry.
