# FE-01 Frontend SL Beauty Conversion Audit

Date: 2026-07-05  
Scope: Current frontend working tree for converting the existing Made in SL marketplace frontend into the SL Beauty Platform frontend.  
Restriction followed: No frontend application code was changed for this audit.

## Summary Verdict

The frontend is partially converted to SL Beauty on the highest-visibility public surfaces: the root homepage, header, footer, hero slider, metadata, auth screens, help center, and product listing copy already use beauty ecommerce language in several places.

However, significant Made in SL / export / RFQ / supplier wording and structure remains across dormant homepage components, supplier dashboards, RFQ and quotation pages, order/invoice pages, static catch-all pages, product normalization helpers, and API wrappers. The next conversion work should avoid deleting the B2B engine. Instead, public shopper pages should become beauty-first while RFQ, quotations, supplier dashboards, messaging, notifications, and orders remain preserved as partner/B2B workflows.

## Files Reviewed

| Area | Files reviewed |
| --- | --- |
| Homepage | `frontend/src/app/page.jsx` |
| Header/nav | `frontend/src/components/layout/Header.jsx` |
| Footer | `frontend/src/components/layout/Footer.jsx` |
| Hero banner | `frontend/src/components/home/HeroSlider.jsx`, `frontend/src/lib/constants.js` |
| Homepage side/legacy components | `frontend/src/components/home/CategorySidebar.jsx`, `frontend/src/components/home/YouMayLike.jsx`, `frontend/src/components/home/ExportCategorySection.jsx`, `frontend/src/components/home/VerifiedSuppliers.jsx`, `frontend/src/components/home/EasySourcingSection.jsx`, `frontend/src/components/home/SourcingSolutions.jsx`, `frontend/src/components/home/TradeShows.jsx`, `frontend/src/components/home/TrendingProducts.jsx`, `frontend/src/components/home/CategoryGridSection.jsx`, `frontend/src/components/home/FeaturedCards.jsx` |
| Product listing/cards | `frontend/src/app/products/ProductsContent.jsx`, `frontend/src/components/product/B2BProductCard.jsx`, `frontend/src/components/product/ProductCard.jsx`, `frontend/src/lib/products.js` |
| Category/search pages | `frontend/src/app/categories/[slug]/CategoryContent.jsx`, `frontend/src/app/search/SearchContent.jsx` |
| Static/public content | `frontend/src/app/[...slug]/page.jsx`, `frontend/src/app/help-center/page.jsx`, `frontend/src/app/trade-shows/page.jsx`, `frontend/src/app/trade-shows/[id]/page.jsx`, `frontend/src/app/company-verification/page.jsx` |
| B2B/RFQ flows | `frontend/src/app/rfq/page.jsx`, `frontend/src/app/rfq/[id]/page.jsx`, `frontend/src/app/rfq/[id]/QuotationWorkflow.jsx`, `frontend/src/app/quotations/page.jsx`, `frontend/src/app/quotations/[id]/page.jsx` |
| Supplier/partner flows | `frontend/src/app/supplier-dashboard/*`, `frontend/src/components/supplier/SupplierSidebar.jsx`, `frontend/src/components/supplier/SupplierProfileManager.jsx`, `frontend/src/components/supplier/SupplierProductsManager.jsx`, `frontend/src/app/suppliers/*` |
| Orders/messaging/notifications | `frontend/src/app/orders/*`, `frontend/src/app/messages/*`, `frontend/src/app/notifications/page.jsx`, `frontend/src/components/notifications/NotificationCenter.jsx`, `frontend/src/lib/notifications.js` |
| API/service usage | `frontend/src/lib/api.js`, `frontend/src/lib/api/products.js`, `frontend/src/lib/api/suppliers.js`, `frontend/src/lib/api/rfq.js`, `frontend/src/lib/api/dashboard.js`, `frontend/src/lib/api/home.js`, `frontend/src/lib/services.js` |
| SL Beauty config | `frontend/src/lib/slBeautyConfig.js` |

## Existing Made In SL Wording And Components

| Finding | Current state | Conversion impact |
| --- | --- | --- |
| Homepage root | `frontend/src/app/page.jsx` now renders a full-width `HeroSlider`, `FeaturedCards`, `TrendingProducts`, and backend-backed category sections. The old three-column hero layout is not currently rendered. | Good public-facing progress. Keep this structure and continue converting downstream data/content. |
| Hero slider | `HeroSlider.jsx` uses Swiper, image-only slides, and `HERO_SLIDES` in `constants.js` with `/images/beauty/hero-beauty-*.webp`. | Already beauty-focused. Confirm final asset paths/design expectations before further edits because an earlier requirement referenced `.png` paths. |
| Header/nav | `Header.jsx` uses SL Beauty branding, beauty nav links, beauty search placeholder, wishlist, cart, notifications, and account controls. | Mostly converted. Some authenticated account destinations still point to generic dashboards. |
| Footer | `Footer.jsx` and `FOOTER_LINKS` are mostly SL Beauty-oriented. | Needs route existence review for `/brands`, `/partners`, `/shipping`, `/returns`, `/gift-cards`, and other beauty routes. |
| Category sidebar | `CategorySidebar.jsx` still contains `Export Categories`, Ceylon Tea, Coconut Products, Spices & Cinnamon, Apparel & Textiles, and Sri Lankan supplier sectors. | Should not be reused on public SL Beauty homepage. Convert to beauty taxonomy or remove from public render path. |
| You May Like side card | `YouMayLike.jsx` still includes a fallback CTA to `/rfq` with `Post Your Request`. | Keep off the hero area. If reused later, convert to a beauty recommendation rail with no RFQ CTA. |
| Export category section | `ExportCategorySection.jsx` still says export-ready categories, B2B buyers, Maldives sourcing, Post RFQ, RFQ-ready sourcing paths, and export sectors. | Replace with beauty category/collection module or leave unused until removed in cleanup. |
| Verified suppliers | `VerifiedSuppliers.jsx` still focuses on export-ready Sri Lankan suppliers, Maldives hospitality, supplier discovery, and Post RFQ. | Preserve concept only for partner/B2B dashboard; not suitable for consumer homepage. |
| Easy sourcing / sourcing solutions | `EasySourcingSection.jsx` and `SourcingSolutions.jsx` retain sourcing/RFQ semantics through names and copy. `SOURCING_SOLUTIONS` constant content is partially beauty-converted but the export-oriented naming remains. | Rename later after imports are migrated. Reframe as collections, routines, offers, or brand edits. |
| Trade shows | `TradeShows.jsx` and `/trade-shows` routes still carry legacy event/exhibit/export semantics in places. | Convert to campaigns, beauty events, brand weeks, live shopping, or remove from primary nav. |
| Floating actions | `FloatingActions.jsx` still describes B2B quick actions and links to `/rfq`. | Convert to help/wishlist/cart/contact actions or disable on public shopper pages. |
| Product card naming | `B2BProductCard.jsx` still has legacy component name. Internally it maps supplier fields to brand-like labels, but still uses supplier IDs, supplier routes, MOQ/min order, delivery, export flags, and conversations with suppliers. | Keep behavior until backend contracts are updated; plan a controlled rename/split into consumer `BeautyProductCard` and partner/B2B card. |
| Product normalization | `frontend/src/lib/products.js` centers `normalizeSupplier`, `supplier_id`, supplier verification, MOQ, units, and supplier location. | Needs brand/variant/beauty profile normalization layer while preserving supplier data for partner flows. |
| Products listing | `ProductsContent.jsx` is visibly beauty-oriented in many labels, but brand filters are backed by `suppliersApi`, and filter values still include `export_ready`. | Replace supplier-backed brand filter with SL Beauty brands endpoint when ready; preserve supplier filters for B2B dashboard only. |
| RFQ and quotations | `/rfq`, `/quotations`, RFQ detail workflow, quotation detail pages, and dashboard links still use RFQ/quotation/supplier/buyer terminology. | These are B2B modules to preserve. Remove from consumer nav/homepage unless behind partner/account workflows. |
| Supplier dashboard | `supplier-dashboard` pages and supplier components are still supplier/export-profile oriented, including `export_percentage`, production capacity, certificates, RFQs, quotations, supplier products, and analytics. | Preserve as B2B partner/admin surfaces. Later relabel public-facing copy from supplier to brand partner/distributor where safe. |
| Orders/invoices/tracking | Order detail, invoice, and tracking pages include buyer/supplier, RFQ/quotation, export customs, and EcomLanka sample invoice data. | High-priority cleanup for customer-visible order history and invoice surfaces. |
| Static catch-all pages | `frontend/src/app/[...slug]/page.jsx` contains old static content including EcomLanka/about/RFQ/supplier/export-oriented pages. | Replace or map to SL Beauty static content before launch. |
| Notifications | `frontend/src/lib/notifications.js` routes RFQ and quotation notifications to old pages. | Preserve for partner workflows, but shopper notification types should route to orders, wishlist, offers, and brand/product events. |

## What Needs To Change For Beauty B2C + B2B

| Surface | Needed change |
| --- | --- |
| Public homepage | Keep the current full-width beauty hero. Ensure downstream sections use beauty taxonomy, brands, deals, new arrivals, best sellers, luxury beauty, routine edits, and authentic product messaging. |
| Public navigation | Keep beauty ecommerce nav as primary. Remove or hide supplier/RFQ/export routes from public nav. Keep partner entry points under account or a dedicated partner route. |
| Public product cards | Show brand, product type, shade/size, retail/sale price, rating, wishlist/cart, authenticity badges, variant availability, and relevant beauty attributes. Hide MOQ/export/supplier sourcing language for B2C shoppers. |
| Product detail pages | Add public beauty profile and variant display using SL Beauty API endpoints. Keep existing product detail response stable. |
| Category pages | Convert category slugs and labels to beauty taxonomy: makeup, skincare, fragrance, hair care, bath and body, tools and brushes, men grooming, wellness, luxury beauty, K-beauty, mini size, gift sets, sale, and new arrivals. |
| Brand pages | Add `/brands` listing and brand detail pages backed by public brand APIs. Avoid brand-products until product-to-brand schema is available. |
| Supplier/B2B modules | Preserve RFQ, quotations, supplier dashboard, messaging, notifications, orders, and analytics as partner/B2B modules. Re-label only after policy/API ownership is stable. |
| Admin/partner wording | Move from public `supplier` language toward `brand partner`, `authorized seller`, and `distributor` where user-facing and safe, but do not rename backend tables/routes yet. |
| Feature flags | Use `SL_BEAUTY_FEATURE_FLAGS` consistently to keep incomplete B2C retail, verification, and compliance workflows from surfacing prematurely. |

## API Endpoints To Use

### Current Frontend API Usage

| Existing wrapper | Endpoint family | Notes |
| --- | --- | --- |
| `productsApi` | `/products`, `/products/{id}`, `/products/featured`, `/products/trending`, `/categories/{slug}/products` | Continue using for base catalog until beauty-specific fields are integrated. |
| `categoriesApi` | `/categories`, `/categories/{slug}` | Use with beauty taxonomy seed data, but confirm slug consistency. |
| `homeApi` / `getHomeSections` | `/home/sections`, `/home/verified-suppliers`, `/home/recommendations` | Current response still includes `verified_suppliers`; public homepage should avoid supplier modules. |
| `suppliersApi` | `/suppliers`, `/suppliers/{id}`, `/suppliers/{id}/products` | Currently used as brand filter in products listing. Replace public brand browsing with SL Beauty brand APIs. |
| `rfqApi` / `quotationsApi` | `/rfqs`, `/supplier/rfqs`, `/quotations`, `/supplier/quotations` | Preserve for B2B workflows only. |
| `ordersApi` | `/orders` | Existing order behavior should remain stable. Customer-facing copy still needs beauty conversion. |
| `notificationsApi` / messages | `/notifications`, `/conversations`, `/messages` | Preserve; later add shopper-safe notification labels. |

### SL Beauty API Endpoints To Adopt

| API group | Endpoint | Frontend use |
| --- | --- | --- |
| Public brands | `GET /api/sl-beauty/brands` | `/brands` page, brand strips, brand filter source, promotional modules. |
| Public brand detail | `GET /api/sl-beauty/brands/{slug}` | Brand detail page. |
| Product beauty profile | `GET /api/sl-beauty/products/{product}/beauty-profile` | Product detail beauty attributes, warnings, usage instructions, skin/hair concerns. |
| Product variants | `GET /api/sl-beauty/products/{product}/variants` | Product detail shade/size selection and public variant display. |
| Product beauty summary | `GET /api/sl-beauty/products/{product}/beauty-summary` | Efficient product detail enrichment with beauty profile plus variants. |
| Supplier profile management | `GET/PUT /api/supplier/sl-beauty/products/{product}/beauty-profile` | Partner dashboard product metadata editing. |
| Supplier compliance submit | `POST /api/supplier/sl-beauty/products/{product}/beauty-profile/submit-compliance` | Partner compliance workflow, hidden until feature flag is enabled. |
| Supplier variants | `/api/supplier/sl-beauty/products/{product}/variants` | Partner dashboard variant management. |
| Supplier brand authorizations | `/api/supplier/sl-beauty/brand-authorizations` | Partner brand/distributor verification workflow. |
| Admin brands | `/api/admin/sl-beauty/brands` | Admin brand management and verification. |

Recommended frontend wrapper: add a dedicated `frontend/src/lib/api/slBeauty.js` in a later implementation task to avoid mixing beauty APIs into legacy supplier/RFQ wrappers.

## SL Beauty Config Usage

`frontend/src/lib/slBeautyConfig.js` exists and defines:

- `SL_BEAUTY_DISPLAY_CONFIG`
- `SL_BEAUTY_FEATURE_FLAGS`
- `SL_BEAUTY_CATEGORY_SLUGS`

Current risk: the config is mostly inert and not yet consistently wired into header, homepage, product listing, category filtering, or feature gating. Future frontend tasks should use this config for display naming, category allowlists, and hiding unfinished B2C retail, brand verification, and compliance features.

## Homepage Conversion Plan

1. Keep `frontend/src/app/page.jsx` as a full-width hero layout.
2. Keep `HeroSlider` on the first viewport and confirm final hero image paths and formats.
3. Keep `FeaturedCards`, `TrendingProducts`, and `CategoryGridSection` only if their copy/data stays beauty-oriented.
4. Do not reintroduce `CategorySidebar`, `YouMayLike`, `ExportCategorySection`, or `VerifiedSuppliers` into the public hero area.
5. Replace any backend `verified_suppliers` homepage usage with brand, campaign, or collection data when backend support exists.
6. Add a public brand strip or brand carousel using `GET /api/sl-beauty/brands`.
7. Make fallback data beauty-specific and avoid supplier/RFQ fallback CTAs.
8. Add visual regression checks for desktop, tablet, and mobile after the next UI implementation.

## Navigation Conversion Plan

1. Keep current beauty nav labels as the public shopper navigation.
2. Confirm all linked routes exist or add placeholder-safe pages later: `/brands`, `/gift-cards`, `/partners`, `/shipping`, `/returns`, `/complaints`, `/advertise`.
3. Remove public links to `/suppliers`, `/rfq`, `/quotations`, `/trade-shows`, and export/static routes unless they are intentionally partner-only.
4. Keep authenticated dashboard links, but route supplier users to partner dashboard and shoppers to account/orders.
5. Convert mobile drawer with the same public/partner separation.
6. Keep notifications/messages accessible for authenticated users, but prevent old RFQ labels from appearing in shopper-only contexts where possible.

## Product And Category Conversion Plan

1. Introduce a beauty product normalization layer that can merge base `/products` data with SL Beauty profile, variant, and brand data.
2. Replace supplier-backed public brand filters with `GET /api/sl-beauty/brands`.
3. Convert category display to `SL_BEAUTY_CATEGORY_SLUGS` and seeded beauty taxonomy.
4. Update product cards to prioritize brand, variant, shade/size, retail price, sale price, rating, wishlist, and add-to-basket actions.
5. Hide or move MOQ, supplier location, export port, supply ability, RFQ, and quotation language out of consumer cards.
6. Keep B2B catalog details available inside supplier/partner dashboards and RFQ workflows.
7. Avoid renaming `B2BProductCard` until imports are migrated; use a follow-up task to split consumer and B2B card components safely.

## Risk Areas

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| Legacy routes remain public | `/rfq`, `/quotations`, `/suppliers`, `/trade-shows`, order invoice, and static pages still expose old marketplace wording. | Hide from public nav first, then convert or gate by role/feature flag. |
| Supplier fields are used as brand fields | Product listing currently relies on supplier APIs for brand filters and supplier IDs for conversations. | Add SL Beauty API wrapper and convert public brand UI to brand endpoints. |
| Backend category mismatch | Constants use beauty slugs while backend categories may still include older export categories or slightly different slugs such as `skin-care` vs `skincare`. | Add a mapping layer and verify seeded taxonomy before public rollout. |
| Component names remain B2B/export-oriented | Names like `B2BProductCard`, `SOURCING_SOLUTIONS`, `TRADE_SHOWS`, and `SRI_LANKA_CATEGORIES` are confusing but still imported. | Defer renames until behavior is stable; rename in small import-safe cleanup tasks. |
| Public B2C features are incomplete | Cart/checkout/order pages exist but may still reflect quotation/order assumptions. | Audit checkout and orders separately before turning on B2C retail flows. |
| RFQ and quotation regression risk | These are core preserved B2B features. | Keep B2B modules intact and only hide/relabel public entry points during initial frontend conversion. |
| Static catch-all content | Old EcomLanka/exports content can surface through generic slug pages. | Replace static page map with SL Beauty content or route unknown legacy pages to not-found. |
| Visual asset consistency | Hero currently references `.webp` files while earlier requirements mentioned `.png`; other modules use `placehold.co`. | Standardize image assets and paths in a dedicated visual cleanup task. |

## Recommended Implementation Order

1. Public content cleanup: remove or hide all old export/RFQ/supplier copy from homepage-adjacent components and static public pages.
2. Add `frontend/src/lib/api/slBeauty.js` for public brands, beauty profiles, variants, and beauty summaries.
3. Build `/brands` listing and brand detail pages using public SL Beauty brand endpoints.
4. Convert product listing filters from supplier-backed brand filters to SL Beauty brands.
5. Enrich product detail pages with beauty profile and variant data.
6. Split consumer product card from legacy `B2BProductCard` while preserving partner/RFQ behavior.
7. Convert category pages to the seeded SL Beauty taxonomy and add slug mapping where needed.
8. Move RFQ, quotations, supplier pages, and supplier dashboard links behind partner/account navigation.
9. Convert order, invoice, tracking, notification, and message copy to shopper/partner-safe language.
10. Rename legacy frontend constants/components only after public behavior is stable and imports are covered by lint/build.

## Recommended Next Frontend Task

Create a small, code-focused task to add a passive SL Beauty API wrapper at `frontend/src/lib/api/slBeauty.js` and optionally a read-only `/brands` page using `GET /api/sl-beauty/brands`. This is the safest next step because it introduces the correct public brand data source without touching RFQ, quotations, supplier dashboards, existing product APIs, checkout, or orders.
