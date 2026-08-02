# Purelane homepage architecture

## Scope and production decisions

This plan covers only Hero, Shop, Combos, Bundles, and Reviews. The prototype's ingredients, proof, full-range, bundle-benefits, categories, trust, signup, navigation, footer, and sticky CTA are bonus content and are not analyzed here.

The prototype is a visual reference, not a data or interaction specification. Product names, prices, discount claims, ratings, review totals, labels, and images must come from Shopify-managed sources; the inline SVG product illustrations and copied review cards do not ship. Product and review claims also require merchant verification before publication.

## 1. Component breakdown

### Hero

```text
Hero
├── Background media and overlay
├── Editorial content
│   ├── Heading
│   ├── Decorative divider
│   ├── Description
│   └── Primary and secondary CTA
├── Product offer stage
│   ├── Offer slides
│   ├── Product media group
│   ├── Live price / compare-at price
│   ├── Saving message
│   └── Slide controls
└── Promise rail
    └── Promise items (icon and text)
```

### Shop

```text
Shop
├── Section heading
│   ├── Eyebrow
│   ├── Title
│   └── Decorative divider
└── Product grid
    └── Product card
        ├── Product media
        ├── Shopify sale / sold-out badge
        ├── Product title
        ├── Rating summary
        ├── Price
        └── Quick add
```

### Combos

```text
Combos
├── Section heading (eyebrow, title, divider, description)
├── Horizontal combo rail
│   └── Combo card
│       ├── Promotional and featured badges
│       ├── Included-product media list
│       ├── Title and product count
│       ├── Description and benefit lines
│       ├── Live bundle price and saving
│       └── Bundle CTA
└── Rail guidance and bundle-picker note
```

### Bundles

```text
Bundles
├── Section heading (eyebrow and title)
└── Bundle tier grid
    └── Bundle tier
        ├── Promotional label
        ├── Representative product media
        ├── Quantity and price
        ├── Per-product message
        ├── Benefit lines
        └── Build-box CTA
```

### Reviews

```text
Reviews
├── Aggregate review header
│   ├── Eyebrow
│   ├── Rating summary
│   └── Customer-count statement
└── Review rail
    └── Review card
        ├── Rating
        ├── Title
        ├── Review body
        └── Reviewer and associated product
```

## 2. Classification map

| Component | Classification | Why |
| --- | --- | --- |
| Hero | Section | It is a homepage-level, independently reorderable editorial module. |
| Hero background media and overlay | Section setting | One composition controls the section and needs desktop/mobile media plus readable overlay settings. |
| Hero heading, divider, description, CTAs | Blocks | Editorial parts need reorderability and optionality without duplicating the section. |
| Hero offer slide | Block | Each offer needs a merchant-selectable product group and can be reordered or removed. |
| Hero offer product | Product (via block product picker) | Images, availability, price, and compare-at price must remain product-owned. |
| Hero saving message | Section/block setting | A short campaign message may be edited, but calculated savings must be derived from selected product data when shown. |
| Hero promise rail | Blocks | Icons and promises are a small merchant-managed repeating set. |
| Shop | Section | It owns a curated collection grid and its presentation controls. |
| Shop heading | Section settings | The one shared heading belongs to the collection display rather than each product. |
| Shop product list | Collection picker | A collection is the native merchant-managed source for a curated bestseller list. |
| Product card | Snippet (`card-product`) | Dawn already provides one accessible, price-aware product-card implementation for all product lists. |
| Product card media, title, price, availability | Product | These values are canonical catalog data and must not be copied into theme settings. |
| Product card rating | Product metafield | Dawn reads the review-app rating and count metafields when available. |
| Product card merchandising label | Product metafield | “Best seller”, “New”, and similar non-price labels need per-product control without overriding Shopify sale/sold-out badges. |
| Combos | Section | It is a homepage merchandising rail with independent heading and rail behavior. |
| Combo card | Block | Each curated bundle needs an editable order, featured state, and campaign copy. |
| Combo contents | Metaobject (bundle definition) | One reusable record keeps included products, benefit copy, and destination together for hero, combo, and bundle uses. |
| Combo included product | Product reference in the bundle definition | Product media and live availability remain linked to the catalog. |
| Combo featured/save badges and copy | Metaobject fields | They are bundle-specific content that should not be duplicated in each section. |
| Bundle CTA destination | Metaobject field (URL or product reference) | It must point to the real bundle product or approved picker flow, not an in-page static anchor. |
| Rail guidance and picker note | Section setting | These are section-level instructional strings and should be removable if the buying flow changes. |
| Bundles | Section | It owns the tier grid and can be reordered independently of Combo merchandising. |
| Bundle tier | Block with a bundle-definition reference | A block gives ordering and visibility control; the shared definition supplies the canonical offer data. |
| Tier product quantity and price | Bundle definition plus Product | Quantity is bundle configuration; price and availability come from the purchasable bundle product. |
| Tier benefits and label | Bundle definition | These campaign-specific details need consistent reuse in every placement. |
| Reviews | Section | The aggregate treatment and rail are homepage-level presentation concerns. |
| Aggregate rating and customer count | Section settings | Use verified, approved campaign figures; do not infer a store-wide total from a few cards. |
| Review card | Block | A small, curated homepage quote set needs safe editorial control and explicit ordering. |
| Review-card rating, title, body, reviewer, product | Block settings with Product picker | Each approved testimonial is editorial content, while its product association should link to the catalog. |
| Theme colors, radii, container, motion defaults | Theme settings | These tokens affect more than one required section and should stay consistent site-wide. |

## 3. Reuse map

| Reusable component | Used by | Plan |
| --- | --- | --- |
| Section heading (eyebrow, title, optional divider, description) | Shop, Combos, Bundles, Reviews | Shared snippet so hierarchy, spacing, and accessibility stay consistent. |
| Button / CTA | Hero, Shop quick add, Combos, Bundles | Use Dawn button styles and a small shared wrapper only where an icon or tracking attribute is needed. |
| Product card | Shop; product representations within Hero, Combos, Bundles | Keep Shop on Dawn `card-product`; use a compact product-media snippet for multi-product compositions rather than fork card markup. |
| Product media | Hero, Shop, Combos, Bundles, review product association | Shared responsive media snippet, always sourced from a Product and with the same image fallback. |
| Price treatment | Hero, Shop, Combos, Bundles | Reuse Dawn price behavior so sale, compare-at, currency, and unavailable states agree. |
| Badge | Hero promises, Shop merchandising/status, Combos, Bundles | One visual badge treatment with semantic status variants; product availability badges remain Dawn-owned. |
| Rating stars / summary | Shop and Reviews | Shop uses review metafields; Reviews uses an accessible rating representation from its block value. |
| Offer / bundle definition | Hero offer slides, Combos, Bundles | The same metaobject prevents titles, included products, claims, and CTA targets drifting apart. |
| Horizontal rail controls | Combos and Reviews | Shared rail behavior provides keyboard access, scroll snapping, and an optional non-autoplay layout. |

## 4. Merchant-editable map

### Hero

- Background image/video poster, mobile image, overlay strength, color scheme, section height, and content alignment; these control the visual composition without editing CSS.
- Heading, highlighted heading text, description, divider visibility, each CTA label/link/style, and CTA target; prototype copy and anchors are not production defaults.
- Each offer slide's selected bundle definition or products, label, featured state, and display order; the prototype's hardcoded ₹200/₹349/₹499, crossed-out prices, and savings must be live or hidden.
- Autoplay toggle, interval, and manual-control label; motion must be optional and never required to understand the offer.
- Every promise item’s icon, text, order, and visibility; the desktop rail and mobile strip are the same content, not separately maintained copies.

### Shop

- Eyebrow, heading, optional description/divider, selected collection, product limit, desktop/mobile columns, mobile swipe behavior, product-card image ratio, quick-add mode, show rating, and section spacing/color scheme.
- Each product's image, title, price, availability, compare-at price, review rating/count, and marketing label; these are all catalog or product-metafield data, not values typed into a section.

### Combos

- Eyebrow, heading, description, divider, rail card count/width behavior, swipe cue text/visibility, rail note, spacing, and color scheme.
- For every combo: bundle-definition reference, order, featured state, promotion/flag copy, included-product benefit lines, destination, and visibility. The “already added” claim must be editable and shown only when the actual destination supports prefilled products.

### Bundles

- Eyebrow, heading, color scheme, spacing, and grid column behavior.
- For every tier: bundle-definition reference, order, promotional label, featured state, representative product selection/order, per-product message, benefit lines, CTA label, and CTA target. The prototype’s “free shipping”, “COD”, savings, and flat-price claims must be approved and configurable, not baked in.

### Reviews

- Eyebrow, aggregate rating, rating scale, review-count statement, customer-count statement, rail display/scroll controls, spacing, and color scheme.
- For every quote: rating, title, body, reviewer display name, verified-purchase status (only if substantiated), linked product, and order. The prototype duplicates five reviews to create an infinite rail; production must render each approved review once.

## 5. Dawn audit and extend-versus-replace decisions

Dawn already supplies `snippets/card-product.liquid`, `snippets/price.liquid`, rating-metafield rendering, quick-add support, sale/sold-out badges, responsive image markup, product-grid classes, `featured-collection`, `image-banner`, `slideshow`, `multicolumn`, color schemes, page-width and spacing settings, button styling, and built-in scroll-reveal animation controls. Its CSS custom properties and existing color-scheme system should be extended before adding Purelane-specific tokens.

| Section | Decision | Why |
| --- | --- | --- |
| Hero | Extend `image-banner` concepts; create a dedicated hero section if multi-product offer slides are retained. | Dawn handles media, overlay, content blocks, responsive images, and accessible slideshow controls, but its stock banner does not model a live multi-product offer stage cleanly. |
| Shop | Extend/retain `featured-collection`. | It already combines collection selection, grid settings, `card-product`, quick add, image fallback, price, rating, and sale/sold-out behavior. |
| Combos | Replace with a focused custom combo-rail section. | Dawn has slider patterns but no native multi-product bundle card or shared bundle-definition data model. |
| Bundles | Replace with a focused custom bundle-tiers section. | Tier comparison and purchasable bundle data are specific to this campaign, while its buttons, color schemes, grid primitives, and price treatment remain Dawn-based. |
| Reviews | Extend `multicolumn` patterns with a dedicated reviews rail section. | Dawn supports repeatable cards and mobile sliders, but it has no stock testimonial aggregate or product-linked review card. |

## 6. Data source map

| Section | Content | Exact native source |
| --- | --- | --- |
| Hero | Background and overlay; editorial copy; CTA labels/links; layout; autoplay controls | Section settings and blocks. |
| Hero | Offer products, images, title, price, compare-at price, availability | Product references selected by each offer block or referenced bundle definition. |
| Hero | Offer name, included products, campaign copy, CTA target | Bundle-definition metaobject. |
| Hero | Promise icon and text | Promise blocks. |
| Shop | Heading and display controls | Section settings. |
| Shop | Curated bestseller set | Collection picker. |
| Shop | Every product-card image/title/price/availability | Product. |
| Shop | Rating and count | Product review metafields. |
| Shop | Marketing label | Product metafield. |
| Combos | Heading, instructions, rail controls | Section settings. |
| Combos | Each card’s bundle reference and ordering | Combo blocks. |
| Combos | Name, product list, product benefits, labels, feature state, copy, CTA | Bundle-definition metaobject; product references inside it. |
| Combos | Price, compare-at price, availability | Purchasable bundle Product referenced by the bundle definition. |
| Bundles | Heading and grid controls | Section settings. |
| Bundles | Each displayed tier and ordering | Tier blocks. |
| Bundles | Quantity, label, benefit lines, per-product message, representative products | Bundle-definition metaobject. |
| Bundles | Live price, compare-at price, availability, CTA product URL | Purchasable bundle Product. |
| Reviews | Aggregate labels, rating value/scale, and approved customer count | Section settings. |
| Reviews | Testimonial rating, title, body, reviewer name/status, product association | Review blocks with a Product picker. |

No price, stock status, product image, product title, or product URL is hardcoded in Liquid. A bundle is only purchasable when its definition references a real Shopify product; a “build your own box” requires a separately approved cart/bundle implementation and is not implied by this theme architecture.

## 7. Theme settings

### Global

- Brand primary, accent, surface, text, and contrast-safe color schemes; every required section shares them and one token set prevents per-section drift.
- Button radius and card radius; shared controls keep Hero CTAs, product quick-add buttons, combo cards, and tier cards visually coherent.
- Container width and standard section spacing; all five sections need a common responsive grid boundary.
- Enable subtle motion, motion duration/speed, and a site-wide “reduce decorative motion” toggle; motion needs one predictable policy rather than per-section surprises.
- Reduced-motion support is mandatory: the CSS media preference overrides the decorative-motion toggle and exposes all content immediately.

### Scoped section settings

- Media, editorial copy, CTAs, offer slides, promises, and hero height belong to Hero because they do not affect later sections.
- Collection, product count, columns, ratings, and quick add belong to Shop because they only affect this curated grid.
- Rail/card configuration, copy, and CTA details belong to Combos because they are campaign-specific.
- Tier ordering, labels, benefit copy, and grid configuration belong to Bundles because they describe this pricing presentation.
- Aggregate claims and testimonial presentation belong to Reviews because they are evidence and layout specific to that section.

## 8. Performance and motion posture

The prototype's fixed full-viewport `.scenes`/`.water` system, scroll-driven scene switching, SVG-filter layers, multiple infinite animations, blend modes, and mouse parallax are removed. They are decorative, compete with scroll and painting work, and make each reorderable section depend on global document position.

Production retains only a static responsive hero image/gradient and optional small opacity/transform transitions scoped to the section that owns them. Hero slides, if retained, use explicit controls and pause when not visible; Combo and Review rails use native overflow scrolling with scroll snap, not infinite cloned content or continuously running marquees. Background video is out of scope unless introduced later with a poster, no autoplay on constrained devices, and a measurable budget.

Under `prefers-reduced-motion: reduce` or the global reduce-motion preference, autoplay, parallax, fades, transforms, and marquee behavior are disabled; all slides/cards are immediately legible and manual controls remain. On low-end/mobile devices, default to static media, no hover-only information, no pointer-parallax, lazy-load below-the-fold media, and only load the hero image at high priority. Use responsive Shopify image widths and reserve dimensions to protect LCP and CLS.

## 9. Proposed file structure

```text
sections/
├── purelane-hero.liquid
├── featured-collection.liquid              # Dawn extension retained for Shop
├── purelane-combo-rail.liquid
├── purelane-bundle-tiers.liquid
└── purelane-reviews-rail.liquid

snippets/
├── card-product.liquid                     # Dawn snippet retained; do not fork
├── price.liquid                            # Dawn snippet retained
├── purelane-section-heading.liquid
├── purelane-product-media.liquid
├── purelane-bundle-card.liquid
├── purelane-review-card.liquid
└── purelane-rating-summary.liquid

assets/
├── section-purelane-hero.css
├── section-purelane-combo-rail.css
├── section-purelane-bundle-tiers.css
├── section-purelane-reviews-rail.css
├── component-purelane-bundle-card.css
├── component-purelane-review-card.css
└── purelane-rails.js
```

`purelane-rails.js` owns only section-instance behavior and targets elements within its own section ID; it must not calculate document “scenes” or depend on a fixed section order. Shared tokens stay in Dawn settings/color schemes instead of a competing global Purelane stylesheet.

## 10. Risk analysis

| Risk | Concrete mitigation |
| --- | --- |
| Animations break when sections are reordered | Scope IDs, events, and observers to each section instance; do not use document-position scene indexes or global selectors; initialize and destroy each rail independently in the theme editor. |
| Duplicate/inconsistent card markup | Keep Shop on Dawn `card-product`; route compact compositions through shared product-media, bundle-card, price, and badge snippets; prohibit copy-pasted card HTML in section files. |
| Product has no image | Use Dawn’s existing card fallback/placeholder for Shop and a named placeholder in compact media; keep title, price, and CTA usable without media. |
| Product title is very long | Clamp titles in card contexts, preserve the full title in the linked product page/accessible label, and use grid cards with equal content flow rather than fixed text heights that overlap prices or CTAs. |
| Product is sold out | Read `product.available`; show the Dawn sold-out badge, suppress or disable quick add, keep the product page link available, and hide or label unavailable bundle CTAs rather than allowing a false purchase path. |

## Prototype issues carried into implementation requirements

- The prototype repeats desktop/mobile promise markup and duplicates reviews for its marquee. Production uses one source per item and responsive presentation so content cannot diverge.
- The static `role="img"` product spans and inline SVG bottles are replaced by Shopify product media with meaningful alt text; decorative images are hidden from assistive technology.
- The prototype’s price/savings, review statistics, shipping/COD statements, and “verified buyer” wording are hardcoded. Production reads catalog values where possible and exposes the remaining claims as merchant-approved settings.
- “Shop bundle” points to anchors rather than a guaranteed purchasable state. Production links to the actual bundle product or hides the prefilled-cart promise until the configured buying flow supports it.
- Hover lift, auto-rotation, and the moving review rail cannot be the only way to discover content. Keyboard-visible controls, focus states, pause/manual navigation, and reduced-motion fallbacks are required.
