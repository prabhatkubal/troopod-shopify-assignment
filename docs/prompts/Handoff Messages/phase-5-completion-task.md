## Task: finish Phase 5 hardening

`docs/prompts/phase-5-hardening-brief.md` was written earlier and is still the source of truth
for scope, but some of it has already happened as part of the visual/bug-fix pass since then.
Here's the actual remaining state, work through it in this order:

### Already done, don't redo
- Product image resolution bug (Shop grid + compact bundle rows) — fixed
- Duplicate Sale badge — fixed
- Best Seller badge overflow — fixed
- Smooth-scroll anchor nav — added
- Stray Dawn Contact section — removed (separate task, confirm it landed)

### Still open — carried-over fixes from the original brief
1. **Hero LCP priority conflict** — both `background_image` and `foreground_image` are
   `fetchpriority: 'high'`. Determine which is the actual LCP candidate in the default preset
   and drop the other to `auto`.
2. **Hero duplicate-`h1` risk** — fix so a duplicated Hero section doesn't produce two `h1`
   elements, or document why it's an accepted limitation.
3. **Combos/Bundles empty-state message** — add the same pattern Shop already has for zero
   blocks.
4. **Shop's redundant `{% paginate %}` tag** — remove it or implement real pagination controls,
   don't leave the unused tag in place.
5. **Bundle-card variant styling** (`--hero`/`--combo`/`--tier`) — decide if these need visual
   differentiation; if not, remove the unused modifier classes, if yes, add the styling.

### Still open — the actual hardening checks, not yet run
6. **Run a real Lighthouse pass (mobile)** on the live homepage with all 5 sections populated.
   Report the actual Performance, Accessibility, Best Practices, and SEO scores. If Performance
   is below 90, name the specific largest cost (asset, script, layout shift), don't just say
   "optimize more."
7. **Run an automated accessibility check** (axe or equivalent) across the homepage. Report
   actual violations found, or confirm genuinely none, don't assert "looks accessible" without
   running the check.
8. **Theme editor stress test**, for each of the 5 sections: add to a fresh template, remove,
   reorder, duplicate, and (where applicable) add/remove/reorder blocks. Report what was
   actually tested and any breakage found — don't just say "verified."

### Standing rule
Log each fix in `docs/build-notes.md` before its commit, same as every phase so far. Group
related fixes into one entry if they're part of the same commit, don't need to be one entry per
bullet above.

Report back with the real Lighthouse and accessibility numbers specifically — those are needed
for the submission email, not optional detail.
