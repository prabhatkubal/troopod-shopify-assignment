# Purelane data model and store-seeding plan

## Scope and phase boundary

This document specifies the Phase 2 data model and the manual store-seeding work needed before theme development. It creates no Shopify definitions, records, products, collections, Liquid, section schema, or theme files.

The seeding checklist ends when the development store contains the defined catalog, collections, one `bundle-definition` definition with populated records, and the product metafield values below. Phase 3 starts after that point and is limited to shared theme foundation work; it does not redesign or seed this data model. Phase 4 consumes the seeded data in the five sections and starts the required `docs/build-notes.md` entries.

## Naming convention

- **Metaobject type:** `bundle_definition`; Shopify uses this type for the single shared bundle-definition model used by Hero, Combos, and Bundle Tiers.
- **Product metafield namespace/key:** `custom.marketing_label`; `custom` is the merchant-owned namespace and keys use lowercase snake_case.
- **Metaobject field keys:** lowercase snake_case. Metaobject fields belong to their definition, so they do not use a metafield namespace.

## 1. `bundle-definition` metaobject definition

Create exactly one metaobject definition named **Bundle definition**, with API type `bundle_definition`. It is the canonical offer record for Hero offers, Combo cards, and Bundle tiers; Combo and Bundle Tier are presentation blocks, not separate metaobject types.

| Field name / key | Shopify field type | Required | Purpose |
| --- | --- | --- | --- |
| Title / `title` | Single line text | Yes | The canonical offer name shown as the combo or tier title and the definition’s display name. |
| Included products / `included_products` | List of product references | Yes | Provides the ordered constituent products for compact media, product count, and included-product display. |
| Purchasable bundle product / `purchasable_bundle_product` | Product reference | Yes | Identifies the real sellable Shopify product whose URL, price, compare-at price, and availability drive the CTA. |
| Description / `description` | Rich text | Yes | Supplies the editorial combo/tier description named in the architecture data-source map. |
| Benefit lines / `benefit_lines` | List of single line text fields | Yes | Supplies the reusable bundle-level benefit lines for Combo cards and Bundle Tiers. |
| Included-product benefit lines / `included_product_benefit_lines` | List of single line text fields | Optional | Supplies short benefits beside each included product in the Combo composition, in the same order as `included_products`. |
| Promotional badge label / `promotional_badge_label` | Single line text | Optional | Supplies campaign labels such as “You save …” without turning them into hardcoded section copy. |
| Featured badge label / `featured_badge_label` | Single line text | Optional | Supplies a visible “Most popular”/“Best value” style label when the record is highlighted. |
| Featured / `featured` | True or false | Yes; default false | Marks a record for the featured visual treatment used by Combo and Bundle Tier blocks. |
| Per-product message / `per_product_message` | Single line text | Optional | Supplies the tier-specific “flat price per product” style message without inventing a calculated price claim. |
| CTA label / `cta_label` | Single line text | Optional | Supplies the editable CTA copy used by Hero, Combos, or Bundles. |
| CTA target override / `cta_target_override` | URL | Optional | Permits an approved destination other than the bundle product, such as a configured picker flow. |

### Fallback and record validity

Metaobjects cannot evaluate a fallback themselves. In the Phase 4 render layer, the CTA URL is resolved in this order: `cta_target_override`, then `purchasable_bundle_product`’s product URL. If both are blank, the card renders without a purchase CTA and is flagged as incomplete in the theme editor; a record is not ready for use without its required purchasable bundle product.

The `included_product_benefit_lines` field is an explicit architecture gap: `docs/architecture.md` requires included-product benefit lines, but did not name a distinct source field for them. The field is optional because not every placement shows the compact list. When populated, its entries must match the order and count of `included_products`; otherwise Phase 4 shows the product without a paired benefit rather than attaching a benefit to the wrong product.

`description`, `per_product_message`, and `cta_label` make the architecture’s named “copy,” per-product message, and merchant-editable CTA label concrete. These are clarifications of fields implied by the approved architecture, not a second metaobject or an alternative data model.

## 2. Product metafield definitions

### Marketing label

| Definition | Owner | Namespace/key | Shopify field type | Required | Purpose |
| --- | --- | --- | --- | --- | --- |
| Marketing label | Product | `custom.marketing_label` | Single line text | Optional | Provides a merchant-controlled card label such as “Best seller,” “New,” or “Top rated” without replacing Dawn’s sale and sold-out statuses. |

Use this field only for non-price merchandising. Blank means no marketing label. Dawn’s sale and sold-out badges continue to derive from catalog price and availability and take precedence over an optional marketing label when visual space permits.

### Ratings and review count

Do **not** create duplicate rating or review-count metafield definitions. The approved architecture retains Dawn’s built-in review-app reading: `reviews.rating` and `reviews.rating_count` are supplied by the chosen review app and rendered by Dawn’s product-card pattern when present. Until a compatible review app is installed and populated, Shop must omit the rating summary rather than display invented values.

## 3. Block-to-metaobject reference

Both section block types contain one required **Bundle definition** setting:

| Block | Setting | Setting type | Behavior |
| --- | --- | --- | --- |
| Combo block | `bundle_definition` | Metaobject reference restricted to `bundle_definition` | Selects the shared record that supplies the Combo card’s products, copy, badges, price source, and CTA destination. |
| Bundle Tier block | `bundle_definition` | Metaobject reference restricted to `bundle_definition` | Selects the same shared record; the block controls only its order, visibility, and tier-specific presentation. |

If a merchant deletes a referenced metaobject entry, Shopify leaves the block without a resolvable record. The section must skip that card and its CTA while continuing to render the remaining cards; in the theme editor the merchant reselects a valid Bundle definition. It must never dereference a missing record or output a broken product URL.

## 4. Collections

| Collection | Use | Type | Rule / curation | Tradeoff |
| --- | --- | --- | --- | --- |
| Best Sellers | The Shop section’s selected curated bestseller set | Manual | A merchandiser adds and orders the products selected for the homepage. | Manual curation matches the architecture’s “curated bestseller set” and controls order, but requires updates when priorities change. |
| Shop | Broad catalog landing/navigation collection | Automated | Product status is active. | It stays current as active products are seeded, but it is not used as the homepage’s Best Sellers source because it cannot express merchandising priority. |
| Bundles | Bundle-product discovery and administration | Automated | Product type equals `Bundle`. | Consistent product typing makes membership automatic, but every purchasable bundle product must be typed correctly. |

The Shop homepage section uses the **Best Sellers** manual collection through its collection picker, not the full automated Shop collection.

## 5. Store-seeding checklist

These tasks require manual work in Shopify Admin: creating products, writing copy, setting catalog prices and availability, uploading media, creating collections, defining custom data, and entering metaobject records. This phase documents the exact work; it does not perform it from the theme repository.

### Product catalog

- [ ] Create at least eight active plant-based homecare products, for example kitchen cleaner, tap/limescale cleaner, dishwash gel, laundry detergent, fabric conditioner, washing-machine cleaner, floor cleaner, toilet cleaner, handwash, and metal cleaner.
- [ ] For every product, enter a title, description, price, vendor, product type, status, and consistent product tags.
- [ ] Set compare-at prices only where an actual promotion is approved; do not use them merely to mimic the prototype.
- [ ] Upload product media and meaningful alt text for all normal catalog products.
- [ ] Set one product to sold out by making every sellable variant unavailable; retain its product page and collection membership for the required state test.
- [ ] Leave one otherwise active product without an image; it is the required image-fallback test case.
- [ ] Give one product a deliberately very long but accurate title; it is the required card-overflow test case.
- [ ] Set the vendor consistently to `Purelane`, use stable product types (including `Bundle` for sellable bundle products), apply consistent category/use-case tags, and verify every product remains Active.

### Product custom data and reviews

- [ ] Create the Product metafield definition `custom.marketing_label` as a single line text field.
- [ ] Populate `custom.marketing_label` only for products that need a non-price merchandising label; leave it blank elsewhere.
- [ ] Install/configure a compatible review app before entering any product ratings; verify it populates `reviews.rating` and `reviews.rating_count` for at least one product.
- [ ] Do not seed made-up ratings, review counts, or verified-buyer claims while the review app is absent.

### Collections

- [ ] Create the manual **Best Sellers** collection and add/order the products that should render in Shop.
- [ ] Create the automated **Shop** collection with the rule “product status is active.”
- [ ] Create the automated **Bundles** collection with the rule “product type equals `Bundle`.”
- [ ] Verify the selected Best Sellers collection has at least the number of products intended for the Shop grid and that sold-out/missing-image/long-title test products are intentionally included where needed for Phase 4 checks.

### Bundle definitions and purchasable products

- [ ] Create the single **Bundle definition** metaobject definition with every field in Section 1.
- [ ] Create actual purchasable bundle products with product type `Bundle`, price, availability, media where available, and a clear title before creating the linked records.
- [ ] Create at least three populated `bundle_definition` records (for example Kitchen Essentials, Laundry Care Bundle, and Complete Home Bundle).
- [ ] For each record, select real included product references in display order and a real purchasable bundle product reference.
- [ ] Enter approved description, benefit lines, optional included-product benefit lines, badge labels, featured state, per-product message, CTA label, and only an approved CTA override.
- [ ] Confirm each populated record resolves to an available bundle product and that the override is blank unless a real configured destination exists.
- [ ] Reuse these same records when configuring future Hero offer, Combo, and Bundle Tier blocks; do not create a second Combo or Bundle Tier metaobject type.

### Phase 2 acceptance check

- [ ] Confirm all required edge-case products are visible to the development theme where appropriate.
- [ ] Confirm Best Sellers, Shop, and Bundles membership behaves as specified.
- [ ] Confirm each of the three bundle-definition records contains valid product references and no placeholder price or URL text.
- [ ] Confirm the data is complete before beginning Phase 3 shared components; no Liquid or section implementation begins in this phase.
