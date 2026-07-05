# Task 28: SL Beauty Seed Data Plan

Date: 2026-07-05  
Branch: `feature/sl-beauty-seed-data`

## Summary

This plan defines the backend seed data required to replace temporary frontend-only SL Beauty display data with database-driven SL Beauty categories, brands, products, product beauty profiles, variants, and optional seller brand authorization records.

No seeders, migrations, backend code, frontend code, or routes are changed in this task. This is a planning document only.

## Files Reviewed

| Area | Files reviewed |
| --- | --- |
| Existing SL Beauty seeders | `backend/database/seeders/SlBeautyConfigurationSeeder.php`, `backend/database/seeders/SlBeautyTaxonomySeeder.php`, `backend/database/seeders/DatabaseSeeder.php` |
| Existing marketplace seeders | `backend/database/seeders/CategorySeeder.php`, `backend/database/seeders/ProductSeeder.php`, `backend/database/seeders/ProductImageSeeder.php`, `backend/database/seeders/DemoMarketplaceSeeder.php`, `backend/database/seeders/SupplierSeeder.php`, `backend/database/seeders/SupplierStorefrontSeeder.php` |
| Core schema | `backend/database/migrations/2026_06_23_150000_create_categories_table.php`, `backend/database/migrations/2026_06_23_155000_create_suppliers_table.php`, `backend/database/migrations/2026_06_23_160000_create_products_table.php`, `backend/database/migrations/2026_06_23_160100_create_product_images_table.php` |
| Catalogue schema | `backend/database/migrations/2026_06_24_041000_create_enterprise_product_catalogue_tables.php`, `backend/database/migrations/2026_07_04_120000_create_sl_beauty_product_and_brand_foundation.php` |
| Frontend display source | `frontend/src/lib/constants.js` |
| Latest frontend QA | `documents/fe-18-public-storefront-browser-smoke-fixes-report.md` |

## Existing Context

- `SlBeautyConfigurationSeeder` already seeds SL Beauty display settings and feature flags.
- `SlBeautyTaxonomySeeder` already adds beauty categories and beauty attribute templates safely.
- `DatabaseSeeder` still calls legacy Made in SL marketplace seeders such as `CategorySeeder`, `ProductSeeder`, `DemoMarketplaceSeeder`, and `ProductImageSeeder`.
- The public storefront currently uses frontend beauty display constants to hide legacy marketplace data.
- FE-18 confirmed public routes load beauty storefront content, including `/`, `/products`, `/products/1`, `/categories/makeup`, `/categories/skincare`, `/categories/fragrance`, `/categories/hair`, `/brands`, and `/gift-cards`.
- Backend product schema still supports B2B fields such as MOQ, supplier, supply ability, lead time, port, and packaging. These should remain intact for hybrid B2B + B2C support.

## Seed Data Objectives

1. Seed a complete SL Beauty catalogue that can safely power the public storefront.
2. Keep existing Made in SL B2B modules and workflows intact.
3. Avoid deleting existing legacy seed data during the first implementation.
4. Make seeders additive and idempotent.
5. Preserve stable UUID and `created_at` values on rerun.
6. Use deterministic slugs, SKUs, and image paths so seeded records can be audited.
7. Prepare data for public read APIs without enabling checkout, cart, payment, or order changes.

## Beauty Categories To Seed

The category seeding implementation should align frontend public category slugs with backend category slugs. Existing `SlBeautyTaxonomySeeder` uses some slugs such as `skin-care`, `hair-care`, `body-care`, and `men-grooming`; the public frontend uses slugs such as `skincare`, `hair`, `bath-and-body`, and `mens-grooming`. The implementation task should either add aliases safely or standardize route-to-category mapping before switching frontend reads to backend data.

| Display name | Preferred slug | Existing related slug | Notes |
| --- | --- | --- | --- |
| Makeup | `makeup` | `makeup` | Top-level beauty category. |
| Skincare | `skincare` | `skin-care` | Add alias/mapping carefully; do not rename existing category yet. |
| Haircare | `haircare` | `hair-care` | Public route `/categories/hair` should map safely. |
| Fragrance | `fragrance` | `fragrance` | Top-level category. |
| Bath & Body | `bath-and-body` | `body-care` | Add alias/mapping carefully. |
| Wellness | `wellness` | none | Beauty wellness and self-care. |
| Beauty Tools | `beauty-tools` | `salon-tools` / `professional-salon-supplies` | Consumer tools and brush sets. |
| Luxury Beauty | `luxury-beauty` | none | Premium brand grouping. |
| K-Beauty | `k-beauty` | none | Korean beauty products. |
| Men's Grooming | `mens-grooming` | `men-grooming` | Add alias/mapping carefully. |
| Gift Sets | `gift-sets` | none | Public giftable beauty bundles. |
| Sale & Offers | `sale` | none | Merchandising category; can be virtual later. |
| New Arrivals | `new-arrivals` | none | Merchandising category; can be virtual later. |

Recommended child categories:

| Parent | Child categories |
| --- | --- |
| Skincare | Cleansers, Serums & Treatments, Moisturizers, Sunscreen, Face Masks, Toners & Mists |
| Makeup | Face Makeup, Lip Makeup, Eye Makeup, Brow Makeup, Blush & Highlighter, Makeup Brushes |
| Haircare | Shampoo, Conditioner, Hair Oils, Hair Masks, Styling Products, Scalp Care |
| Fragrance | Eau de Parfum, Eau de Toilette, Body Mist, Fragrance Gift Sets |
| Bath & Body | Body Wash, Body Lotion, Body Scrubs, Hand Care, Body Oils |
| Beauty Tools | Brush Sets, Facial Tools, Hair Tools, Sponges & Applicators |

## Beauty Brands To Seed

Seed brands into the `brands` table from the Task 06 foundation. Public brand APIs expose only `status = active` and `is_verified = true`, so initial storefront brands should be active and verified.

| Brand | Slug | Status | Verified | Notes |
| --- | --- | --- | --- | --- |
| CeraVe | `cerave` | active | true | Skincare. |
| Garnier | `garnier` | active | true | Skincare and haircare. |
| La Roche-Posay | `la-roche-posay` | active | true | Sunscreen/skincare. |
| Maybelline | `maybelline` | active | true | Makeup. |
| L'Oreal Paris | `loreal-paris` | active | true | Makeup/haircare. |
| Lancome | `lancome` | active | true | Fragrance/luxury. |
| Nivea | `nivea` | active | true | Bath and body. |
| The Ordinary | `the-ordinary` | active | true | Skincare. |
| Kerastase | `kerastase` | active | true | Haircare/luxury. |
| Real Techniques | `real-techniques` | active | true | Beauty tools. |
| NARS | `nars` | active | true | Makeup/luxury. |
| Olay | `olay` | active | true | Skincare. |
| Bioderma | `bioderma` | active | true | Skincare. |
| Laneige | `laneige` | active | true | K-beauty/skincare. |
| Anastasia Beverly Hills | `anastasia-beverly-hills` | active | true | Brow/makeup. |
| Morphe | `morphe` | active | true | Brushes/makeup. |

Recommended brand fields:

- `uuid`: create once, preserve on rerun.
- `name`, `slug`, `description`: deterministic.
- `logo_path`: local or CDN brand logo path; nullable until approved assets exist.
- `website_url`: nullable unless officially approved.
- `country_id`: nullable for global brands unless country mapping is confirmed.
- `status`: `active`.
- `is_verified`: `true`.
- `created_by`: nullable for seed data unless a system/admin user is selected.

## Beauty Products To Seed

Seed products into `products` using existing schema and beauty categories. Keep B2B fields populated with neutral beauty marketplace values so existing B2B product modules continue to work.

| Product | Slug | Brand | Category | Suggested price LKR | Unit |
| --- | --- | --- | --- | ---: | --- |
| Gentle Hydrating Cleanser | `gentle-hydrating-cleanser` | CeraVe | Skincare | 4200.00 | bottle |
| Vitamin C Brightening Serum | `vitamin-c-brightening-serum` | Garnier | Skincare | 3900.00 | bottle |
| SPF 50 Daily Sunscreen | `spf-50-daily-sunscreen` | La Roche-Posay | Skincare | 6800.00 | tube |
| Long Wear Matte Lipstick | `long-wear-matte-lipstick` | Maybelline | Makeup | 3200.00 | piece |
| Bond Repair Shampoo | `bond-repair-shampoo` | L'Oreal Paris | Haircare | 4500.00 | bottle |
| Signature Eau de Parfum | `signature-eau-de-parfum` | Lancome | Fragrance | 18500.00 | bottle |
| Soft Glow Body Lotion | `soft-glow-body-lotion` | Nivea | Bath & Body | 2900.00 | bottle |
| Pore Care Clay Face Mask | `pore-care-clay-face-mask` | The Ordinary | Skincare | 5600.00 | jar |
| Nourishing Hair Oil | `nourishing-hair-oil` | Kerastase | Haircare | 9200.00 | bottle |
| Essential Beauty Tools Set | `essential-beauty-tools-set` | Real Techniques | Beauty Tools | 7400.00 | set |
| Rose Glow Blush Palette | `rose-glow-blush-palette` | NARS | Makeup | 9800.00 | palette |
| Retinol Night Cream | `retinol-night-cream` | Olay | Skincare | 7600.00 | jar |
| Micellar Cleansing Water | `micellar-cleansing-water` | Bioderma | Skincare | 5100.00 | bottle |
| Hydrating Sheet Mask | `hydrating-sheet-mask` | Laneige | K-Beauty | 1800.00 | sheet |
| Brow Definer Pencil | `brow-definer-pencil` | Anastasia Beverly Hills | Makeup | 5900.00 | piece |
| Makeup Brush Collection | `makeup-brush-collection` | Morphe | Beauty Tools | 11200.00 | set |

Recommended product fields:

- `category_id`: resolved by category slug or alias map.
- `supplier_id`: assign to a seeded demo beauty supplier only after supplier seed strategy is confirmed.
- `name`, `slug`, `short_description`, `description`: beauty-safe and customer-facing.
- `price`: use LKR display values currently used by frontend constants.
- `moq`: `1` for consumer-friendly public data; B2B quantity logic remains available.
- `unit`: `piece`, `bottle`, `tube`, `jar`, `palette`, `set`, or `sheet`.
- `supply_ability`, `lead_time`, `port`, `packaging_details`: neutral values such as "In stock", "2-5 business days", nullable port, and retail packaging details.
- `featured_image`: final product image path or stable CDN URL.
- `status`: `active`.
- `is_featured`: true for homepage-priority products.

## Product Beauty Profiles

Seed one `product_beauty_profiles` record per beauty product. Use `product_id` as the unique key.

| Product type | Profile fields to populate |
| --- | --- |
| Cleanser / micellar water | `skin_type`, `skin_concern`, `ingredients`, `how_to_use`, `warnings`, `formulation`, `expiry_required`, `batch_tracking_required` |
| Serum / retinol / night cream | `skin_type`, `skin_concern`, `ingredients`, `how_to_use`, `warnings`, `formulation`, `age_group`, `expiry_required`, `batch_tracking_required` |
| Sunscreen | `skin_type`, `skin_concern`, `spf_value`, `ingredients`, `how_to_use`, `warnings`, `formulation`, `expiry_required`, `batch_tracking_required` |
| Lipstick / blush / brow products | `shade_family`, `formulation`, `gender_target`, `age_group`, `ingredients`, `warnings`, `expiry_required`, `batch_tracking_required` |
| Shampoo / hair oil | `hair_type`, `hair_concern`, `ingredients`, `how_to_use`, `warnings`, `formulation`, `expiry_required`, `batch_tracking_required` |
| Fragrance | `fragrance_family`, `gender_target`, `age_group`, `ingredients`, `warnings`, `expiry_required`, `batch_tracking_required` |
| Body lotion | `skin_type`, `skin_concern`, `formulation`, `ingredients`, `how_to_use`, `warnings`, `expiry_required`, `batch_tracking_required` |
| Beauty tools | `gender_target`, `age_group`, `how_to_use`, `warnings`, `expiry_required = false`, `batch_tracking_required = false`, `compliance_status = not_required` |

Compliance status plan:

- Use `not_required` for beauty tools.
- Use `not_required` or `pending_review` for demo retail products depending on whether compliance review APIs are active.
- Do not seed `approved` compliance status unless admin compliance workflow ownership is confirmed.

## Product Variants

Seed variants into `product_variants` using existing enterprise columns plus SL Beauty extension columns. Use deterministic SKUs and preserve UUID/created timestamps on rerun.

| Product | Variant examples |
| --- | --- |
| Gentle Hydrating Cleanser | 236 ml, 473 ml |
| Vitamin C Brightening Serum | 30 ml |
| SPF 50 Daily Sunscreen | 50 ml |
| Long Wear Matte Lipstick | Nude Rose, Classic Red, Berry Mauve |
| Bond Repair Shampoo | 250 ml, 500 ml |
| Signature Eau de Parfum | 30 ml, 50 ml |
| Soft Glow Body Lotion | 200 ml, 400 ml |
| Pore Care Clay Face Mask | 100 ml |
| Nourishing Hair Oil | 50 ml, 100 ml |
| Essential Beauty Tools Set | Essential Set, Pro Set |
| Rose Glow Blush Palette | Rose Glow |
| Retinol Night Cream | 50 g |
| Micellar Cleansing Water | 250 ml, 500 ml |
| Hydrating Sheet Mask | Single Sheet, Pack of 5 |
| Brow Definer Pencil | Soft Brown, Dark Brown, Ebony |
| Makeup Brush Collection | 12-piece Set, 24-piece Set |

Recommended variant fields:

- `product_id`: route product relation, never request input.
- `sku`: deterministic, for example `SLB-CER-CLEAN-236`.
- `name`: legacy enterprise variant name, required by existing schema.
- `variant_name`: display variant name when SL Beauty extension column exists.
- `slug`: deterministic unique variant slug.
- `price`: keep in sync with `retail_price` where safe.
- `retail_price`, `sale_price`: seed for public beauty display.
- `stock_quantity`: non-sensitive demo values; public resource should still avoid exact stock leaks if already designed that way.
- `low_stock_threshold`: optional.
- `shade_name`, `shade_code`, `size_label`, `volume_ml`, `weight_g`: populate by product type.
- `is_active`: `true`.
- `status`: `active`.

## Seller Brand Authorizations

Seller brand authorizations are useful for supplier/admin verification workflows, but they are not required for the first public backend-driven storefront if public pages only need active verified brands and active products.

Recommended approach:

1. Seed seller brand authorizations only after a beauty demo supplier strategy is approved.
2. If seeded, create one or two beauty supplier records such as:
   - `sl-beauty-official-store`
   - `colombo-beauty-retail`
   - `salon-pro-distributors`
3. Create authorization records with:
   - `supplier_id`: resolved from seeded beauty supplier.
   - `brand_id`: resolved from seeded brand.
   - `authorization_type`: `authorized_retailer`, `official_distributor`, or `marketplace_partner`.
   - `territory`: `Sri Lanka`.
   - `document_path`: nullable for demo data.
   - `status`: `approved` only if admin verification state is intended for demo data; otherwise `submitted` or `draft`.
   - `reviewed_by`, `reviewed_at`, `review_notes`: nullable unless an admin demo reviewer is explicitly used.

Do not seed supplier authorization data that implies legal brand authorization unless it is marked as demo/internal or backed by real approval.

## Image URL Strategy

Recommended long-term strategy:

- Use local curated beauty assets or a controlled CDN, not hotlinked third-party images.
- Product image paths should be deterministic, for example:
  - `/images/beauty/products/gentle-hydrating-cleanser.webp`
  - `/images/beauty/products/vitamin-c-brightening-serum.webp`
  - `/images/beauty/products/spf-50-daily-sunscreen.webp`
- Brand logo paths should be deterministic, for example:
  - `/images/beauty/brands/cerave.webp`
  - `/images/beauty/brands/maybelline.webp`
- Category image paths should be deterministic, for example:
  - `/images/beauty/categories/skincare.webp`
  - `/images/beauty/categories/makeup.webp`

Acceptable temporary strategy:

- Use stable remote beauty image URLs only until local assets are available.
- Do not use `placehold.co` for final storefront product imagery.
- Do not use tea, spices, gems, fabric, rubber gloves, export packaging, or supermarket/export visuals.

Implementation notes:

- `products.featured_image` should hold the primary display image.
- `product_images.image` should hold gallery images.
- Use `updateOrCreate`/stable upsert by `(product_id, image)` or `(product_id, sort_order)` only after confirming the existing gallery behavior.

## How To Avoid Made In SL Data Appearing In SL Beauty

The current risk is not migration safety; it is data selection. Legacy seeders still create export categories, export products, supplier demo content, RFQs, quotations, conversations, and order demos.

Recommended containment plan:

1. Add new SL Beauty catalogue seeders instead of editing legacy seeders in place.
2. Use unique beauty slugs and SKUs that cannot collide with legacy product data.
3. Keep legacy seeders available for B2B regression testing until product ownership approves removal or disabling.
4. Do not delete or rename legacy rows in the first seed-data implementation.
5. Public SL Beauty storefront APIs should eventually filter by:
   - active beauty categories,
   - active beauty products,
   - active verified brands,
   - active variants,
   - public-safe product status rules.
6. Do not show raw "all products" data on the public SL Beauty storefront unless filtered to beauty catalogue scope.
7. Add a targeted verification check that public product/category queries return no active storefront items matching:
   - Ceylon
   - Cinnamon
   - Coconut
   - Sapphire
   - Rubber Gloves
   - Batik
   - Spices
   - export-ready
   - Export Grade
8. Keep RFQ, quotation, supplier dashboard, buyer dashboard, messaging, notifications, admin, analytics, and B2B order workflows untouched.

## Proposed Seeder Structure

Future implementation should add dedicated seeders rather than modifying existing legacy seeders heavily.

| Seeder | Purpose |
| --- | --- |
| `SlBeautyBrandSeeder` | Seed active verified SL Beauty brands. |
| `SlBeautyCategoryAlignmentSeeder` | Add missing public-facing beauty category slugs or aliases safely, if needed. |
| `SlBeautyDemoSupplierSeeder` | Optional; seed beauty seller/distributor profiles only if products require suppliers. |
| `SlBeautyProductSeeder` | Seed public beauty products mapped to categories and suppliers. |
| `SlBeautyProductImageSeeder` | Seed primary/gallery product imagery. |
| `SlBeautyProductBeautyProfileSeeder` | Seed product beauty metadata. |
| `SlBeautyProductVariantSeeder` | Seed retail-safe variants, shades, sizes, and prices. |
| `SlBeautySellerBrandAuthorizationSeeder` | Optional; seed seller-brand authorization demo records after verification rules are confirmed. |

Recommended call order:

1. `SlBeautyConfigurationSeeder`
2. `SlBeautyTaxonomySeeder`
3. `SlBeautyCategoryAlignmentSeeder`
4. `SlBeautyBrandSeeder`
5. `SlBeautyDemoSupplierSeeder`
6. `SlBeautyProductSeeder`
7. `SlBeautyProductImageSeeder`
8. `SlBeautyProductBeautyProfileSeeder`
9. `SlBeautyProductVariantSeeder`
10. `SlBeautySellerBrandAuthorizationSeeder` if approved

## Migration And Seeder Safety

Seeder implementation should follow these rules:

- Do not modify existing migrations.
- Do not rename tables or columns.
- Do not delete legacy category, product, supplier, RFQ, quotation, order, or message data.
- Do not deactivate legacy rows in the initial implementation.
- Use `firstOrNew` or a stable upsert helper so reruns do not refresh UUIDs or `created_at`.
- Use stable keys:
  - Categories: `slug`
  - Brands: `slug`
  - Products: `slug`
  - Product variants: `sku` or `(product_id, slug)`
  - Product images: `(product_id, image)` or a confirmed unique gallery key
  - Beauty profiles: `product_id`
  - Seller brand authorizations: `(supplier_id, brand_id, authorization_type, territory)`
- Update only mutable display fields and `updated_at` on rerun.
- Check `Schema::hasTable` and `Schema::hasColumn` before touching optional SL Beauty foundation tables or extension columns.
- Use database transactions around multi-table product seeding where practical.
- Keep feature flags safe:
  - `sl_beauty.taxonomy`: can remain enabled.
  - `sl_beauty.b2c_retail`: remains disabled until cart/checkout/payment behavior is implemented.
  - `sl_beauty.brand_seller_verification`: remains disabled unless admin/supplier verification APIs are ready for the environment.
  - `sl_beauty.compliance_workflows`: remains disabled unless compliance review workflow is ready.

## Rollback Safety

Seeders do not have automatic Laravel rollback semantics. Rollback must be planned as a separate, explicit cleanup process.

Recommended rollback approach:

1. Do not rely on `migrate:rollback` to remove seeded rows.
2. Keep all seeded slugs, SKUs, and image paths deterministic and documented.
3. For local/dev rollback only, create a future targeted cleanup command or seeder that removes rows by the exact SL Beauty seed keys.
4. Never delete by broad category names such as "beauty" without checking for user-created content.
5. In shared or production environments, prefer deactivating demo rows over deleting them unless ownership is confirmed.
6. Backup the target database before first seed run in non-local environments.
7. Confirm that cleanup does not remove records created through supplier/admin APIs.

## Testing Plan

Backend checks for the future seed implementation:

```bash
php -l backend/database/seeders/SlBeautyBrandSeeder.php
php -l backend/database/seeders/SlBeautyProductSeeder.php
php -l backend/database/seeders/SlBeautyProductBeautyProfileSeeder.php
php -l backend/database/seeders/SlBeautyProductVariantSeeder.php
php artisan migrate --pretend
php artisan db:seed --class=SlBeautyBrandSeeder
php artisan db:seed --class=SlBeautyProductSeeder
php artisan db:seed --class=SlBeautyProductBeautyProfileSeeder
php artisan db:seed --class=SlBeautyProductVariantSeeder
php artisan test
```

Database validation queries:

- Count active beauty categories by slug.
- Count active verified brands.
- Count active beauty products by expected slugs.
- Confirm every seeded product has a category.
- Confirm every seeded product has a primary image.
- Confirm every seeded product has a beauty profile unless intentionally exempt.
- Confirm product variants are active and belong to the correct product.
- Confirm no public beauty product/category result contains legacy Made in SL display terms.

API validation:

- `GET /api/sl-beauty/brands` returns active verified seeded brands only.
- `GET /api/sl-beauty/brands/{slug}` returns seeded brand details.
- `GET /api/sl-beauty/products/{product}/beauty-profile` returns public-safe profile data.
- `GET /api/sl-beauty/products/{product}/variants` returns active public-safe variants only.

Frontend validation after a later frontend API switch:

- `/` shows seeded beauty products/categories.
- `/products` shows seeded beauty products only.
- `/products/1` or slug equivalent resolves to a beauty product.
- `/categories/makeup`, `/categories/skincare`, `/categories/fragrance`, `/categories/hair` show beauty products.
- `/brands` shows seeded active verified brands.
- `/gift-cards` remains public and read-only.
- `npm run lint` passes.

Targeted public content scan:

```bash
rg -n "Ceylon|Cinnamon|Coconut|Sapphire|Rubber Gloves|Batik|Spices|Export Grade|export-ready|Post an RFQ|RFQ" frontend/src backend/database/seeders
```

The scan may still find legacy backend B2B seeders until they are intentionally scoped or disabled. The public storefront/API result set must not expose those records.

## Recommended Implementation Order

1. Add `SlBeautyBrandSeeder` with active verified brands.
2. Add a category alignment seeder only if public slugs cannot be resolved cleanly to existing taxonomy.
3. Add optional beauty demo supplier seeder if seeded products require supplier ownership.
4. Add `SlBeautyProductSeeder` using the 16 frontend display products.
5. Add product image seeder with final local/CDN beauty imagery.
6. Add product beauty profile seeder.
7. Add product variant seeder.
8. Add seller brand authorization seeder only after verification workflow expectations are confirmed.
9. Run backend seed checks and API checks.
10. In a later frontend task, replace forced frontend constants with backend-driven SL Beauty reads.

## What Not To Change Yet

- Do not modify seeders in Task 28.
- Do not modify migrations.
- Do not modify frontend constants or pages.
- Do not remove legacy Made in SL seeders yet.
- Do not delete existing categories, products, suppliers, RFQs, quotations, orders, messages, or notifications.
- Do not rename Supplier to Seller in code.
- Do not enable B2C checkout, cart, payment, or order behavior.
- Do not change public, supplier, or admin API routes.
- Do not change supplier dashboard, buyer dashboard, admin, analytics, RFQ, quotation, messaging, notification, or order behavior.
- Do not commit or modify `.env`.

## Risks

| Risk | Mitigation |
| --- | --- |
| Legacy Made in SL seed data appears in public storefront after backend switch | Add beauty-scoped public API filters and explicit public content scans before frontend integration. |
| Category slug mismatch between frontend and backend | Add a category alignment/alias plan before switching frontend reads to backend categories. |
| Seed reruns mutate stable UUIDs or `created_at` | Use stable upsert helpers that preserve immutable fields. |
| Product variants collide with existing enterprise variant data | Use deterministic SL Beauty SKUs and check existing SKU before insert/update. |
| Brand authorization demo data implies real legal authorization | Keep demo authorization records optional and clearly scoped; avoid approved status unless approved by product owner. |
| Remote images break or change unexpectedly | Move to local or controlled CDN assets before relying on backend image data in production. |
| Public B2C data changes accidentally affect B2B flows | Keep seeders additive and avoid route/controller/dashboard changes in seed implementation. |

## Recommendation

Proceed with a dedicated SL Beauty seed implementation task next. Start with categories/brands/products/profiles/variants only, keep legacy seeders untouched, and validate that public APIs return beauty-scoped data before replacing the frontend display constants.
