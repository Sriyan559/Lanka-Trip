# Task 34: SL Beauty Product Seeder Plan

Date: 2026-07-05  
Branch: `feature/sl-beauty-seed-data`

## Summary

This plan defines the implementation approach for a future standalone SL Beauty product seeder that will create the 16 public storefront beauty products currently represented in frontend display constants. The future seeder should use the verified SL Beauty brand seed data and frontend-facing category rows from the category alignment seeder.

No product seeder, migrations, frontend files, `DatabaseSeeder.php`, routes, controllers, APIs, profiles, or variants are changed in this task. This is a planning document only.

## Files Reviewed

| File | Purpose |
| --- | --- |
| `documents/task-28-sl-beauty-seed-data-plan.md` | Confirmed broader seed-data scope, product list, image strategy, and safety rules. |
| `documents/task-30-sl-beauty-brand-seeder-verification-report.md` | Confirmed 16 active verified brands are safely seeded by slug. |
| `documents/task-33-sl-beauty-category-alignment-seeder-verification-report.md` | Confirmed frontend-facing category rows are seeded safely by slug. |
| `backend/database/migrations/2026_06_23_160000_create_products_table.php` | Confirmed product table required fields and nullable `supplier_id`. |
| `backend/database/migrations/2026_06_23_160100_create_product_images_table.php` | Confirmed gallery image table fields. |
| `frontend/src/lib/constants.js` | Confirmed current 16 public storefront display products, prices, images, categories, and brand names. |

## Existing Schema Notes

### `products`

Required/non-null fields:

| Column | Requirement |
| --- | --- |
| `category_id` | Required; must reference `categories.id`. |
| `name` | Required. |
| `slug` | Required and unique. |
| `price` | Required decimal. |
| `moq` | Required decimal, defaults to `1`. |
| `unit` | Required string. |

Nullable/safe fields:

| Column | Strategy |
| --- | --- |
| `supplier_id` | Nullable; leave null in first public product seeder unless a beauty supplier seeder is approved. |
| `short_description` | Seed beauty-safe public summary. |
| `description` | Seed beauty-safe longer description. |
| `supply_ability` | Use B2B-safe retail/inventory wording. |
| `lead_time` | Use neutral public/B2B-compatible fulfillment wording. |
| `port` | Leave null for public retail products unless B2B shipping data is approved. |
| `packaging_details` | Use retail packaging notes. |
| `featured_image` | Use product image URL/path. |
| `status` | Set to `active`. |
| `is_featured` | True for homepage-priority products. |
| `views_count` | Seed deterministic safe display ordering values or leave default. |

### `product_images`

Required fields:

| Column | Strategy |
| --- | --- |
| `product_id` | Resolve from product slug after product insert/update. |
| `image` | Use same approved image path/URL as `featured_image` initially. |
| `sort_order` | Use `0` for primary image. |

## Product Seeder Scope

Future seeder name:

```text
backend/database/seeders/SlBeautyProductSeeder.php
```

Recommended behavior:

- Standalone and opt-in.
- Not wired into `DatabaseSeeder.php` until seed ordering is intentionally approved.
- Depends on:
  - `SlBeautyBrandSeeder` having seeded brand slugs.
  - `SlBeautyCategoryAlignmentSeeder` having seeded frontend-facing category slugs.
- Seeds only public product rows and optional primary `product_images` rows.
- Does not seed product beauty profiles.
- Does not seed product variants.
- Does not seed seller brand authorizations.

## Products To Seed

Use deterministic backend product slugs. Some frontend constants use shorter display slugs; for backend seed data, use descriptive product slugs from Task 28 to avoid ambiguity and improve public URLs.

| Product | Backend slug | Frontend display slug | Brand slug | Category slug | Price LKR | Unit | Featured |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Gentle Hydrating Cleanser | `gentle-hydrating-cleanser` | `gentle-cleanser` | `cerave` | `skincare` | 4200.00 | bottle | Yes |
| Vitamin C Brightening Serum | `vitamin-c-brightening-serum` | `vitamin-c-serum` | `garnier` | `skincare` | 3900.00 | bottle | Yes |
| SPF 50 Daily Sunscreen | `spf-50-daily-sunscreen` | `spf-50-sunscreen` | `la-roche-posay` | `skincare` | 6800.00 | tube | Yes |
| Long Wear Matte Lipstick | `long-wear-matte-lipstick` | `matte-lipstick` | `maybelline` | `makeup` | 3200.00 | piece | Yes |
| Bond Repair Shampoo | `bond-repair-shampoo` | `repair-shampoo` | `loreal-paris` | `hair-care` | 4500.00 | bottle | Yes |
| Signature Eau de Parfum | `signature-eau-de-parfum` | `signature-perfume` | `lancome` | `fragrance` | 18500.00 | bottle | Yes |
| Soft Glow Body Lotion | `soft-glow-body-lotion` | `body-lotion` | `nivea` | `bath-body` | 2900.00 | bottle | Yes |
| Pore Care Clay Face Mask | `pore-care-clay-face-mask` | `clay-face-mask` | `the-ordinary` | `skincare` | 5600.00 | jar | Yes |
| Nourishing Hair Oil | `nourishing-hair-oil` | `nourishing-hair-oil` | `kerastase` | `hair-care` | 9200.00 | bottle | Yes |
| Essential Beauty Tools Set | `essential-beauty-tools-set` | `beauty-brush-set` | `real-techniques` | `tools-brushes` | 7400.00 | set | Yes |
| Rose Glow Blush Palette | `rose-glow-blush-palette` | `rose-glow-blush-palette` | `nars` | `makeup` | 9800.00 | palette | Yes |
| Retinol Night Cream | `retinol-night-cream` | `retinol-night-cream` | `olay` | `skincare` | 7600.00 | jar | Yes |
| Micellar Cleansing Water | `micellar-cleansing-water` | `micellar-cleansing-water` | `bioderma` | `skincare` | 5100.00 | bottle | Yes |
| Hydrating Sheet Mask | `hydrating-sheet-mask` | `hydrating-sheet-mask` | `laneige` | `k-beauty` | 1800.00 | sheet | Yes |
| Brow Definer Pencil | `brow-definer-pencil` | `brow-definer-pencil` | `anastasia-beverly-hills` | `makeup` | 5900.00 | piece | Yes |
| Makeup Brush Collection | `makeup-brush-collection` | `makeup-brush-collection` | `morphe` | `tools-brushes` | 11200.00 | set | Yes |

## Brand Mapping

The current `products` table has no `brand_id` column. The future product seeder should not alter schema or invent a direct product-brand relation.

Recommended first-step mapping:

- Resolve the brand by slug to confirm seeded brand availability.
- Include the brand name in `short_description` and/or `description` only.
- Do not create a product-brand pivot, product metadata column, or relationship in this task.
- Do not seed seller brand authorizations.
- Defer formal product-to-brand storage until a dedicated schema/API plan is approved.

Future options:

1. Add a product-brand relation in a later migration.
2. Use product beauty profiles or attributes for public brand display if approved.
3. Add seller brand authorization links only after supplier/authorization seed strategy is approved.

## Category Mapping

Use category slugs that are already verified by Task 33:

| Category slug | Products |
| --- | --- |
| `skincare` | Gentle Hydrating Cleanser, Vitamin C Brightening Serum, SPF 50 Daily Sunscreen, Pore Care Clay Face Mask, Retinol Night Cream, Micellar Cleansing Water |
| `makeup` | Long Wear Matte Lipstick, Rose Glow Blush Palette, Brow Definer Pencil |
| `hair-care` | Bond Repair Shampoo, Nourishing Hair Oil |
| `fragrance` | Signature Eau de Parfum |
| `bath-body` | Soft Glow Body Lotion |
| `tools-brushes` | Essential Beauty Tools Set, Makeup Brush Collection |
| `k-beauty` | Hydrating Sheet Mask |

Seeder behavior if a category is missing:

- Fail visibly with a clear exception in local/dev, or skip with an explicit warning only if project seeder conventions support warning output.
- Do not create category rows inside the product seeder.
- Require `SlBeautyCategoryAlignmentSeeder` to be run first.

## Required Product Fields

Recommended generated field values:

| Field | Value strategy |
| --- | --- |
| `category_id` | Resolve by category slug. |
| `supplier_id` | `null` for first product seeder because schema allows nullable supplier. |
| `name` | Product display name. |
| `slug` | Deterministic backend product slug. |
| `short_description` | One-line public beauty summary including brand/category context. |
| `description` | Longer beauty-safe description; no medical claims, no export/RFQ wording. |
| `price` | LKR amount from frontend constants. |
| `moq` | `1`. |
| `unit` | Product-specific unit such as bottle, tube, piece, jar, set, palette, sheet. |
| `supply_ability` | `In stock for retail and beauty business orders`. |
| `lead_time` | `2-5 business days`. |
| `port` | `null`. |
| `packaging_details` | `Retail-ready beauty packaging. Batch and expiry details should be verified before fulfilment.` |
| `featured_image` | Image URL/path from image strategy. |
| `status` | `active`. |
| `is_featured` | `true` for all 16 initial public products or true for first 8 and false for the rest if homepage density needs tuning. |
| `views_count` | Deterministic descending values for stable trending order, or default `0` if API ordering should be organic. |

Recommended B2B-safe defaults:

| Field | Default |
| --- | --- |
| `moq` | `1` |
| `supply_ability` | `In stock for retail and beauty business orders` |
| `lead_time` | `2-5 business days` |
| `packaging_details` | `Retail-ready beauty packaging. Suitable for storefront, salon, and retailer replenishment workflows.` |

## Product Descriptions

Use conservative beauty wording. Avoid regulated/medical claims such as "cures acne", "repairs skin disease", or "clinically guaranteed".

Example format:

```text
{Brand} {Product Name} is a public SL Beauty catalogue item for {category}. It is suitable for daily beauty routines and future B2B replenishment workflows.
```

Per-product short descriptions:

| Product | Suggested short description |
| --- | --- |
| Gentle Hydrating Cleanser | Daily hydrating cleanser from CeraVe for gentle skincare routines. |
| Vitamin C Brightening Serum | Lightweight Garnier serum for bright-looking daily skincare. |
| SPF 50 Daily Sunscreen | La Roche-Posay SPF 50 sunscreen for daily sun care routines. |
| Long Wear Matte Lipstick | Maybelline matte lipstick for long-wear lip color. |
| Bond Repair Shampoo | L'Oreal Paris shampoo for everyday hair repair routines. |
| Signature Eau de Parfum | Lancome fragrance for premium daily wear. |
| Soft Glow Body Lotion | Nivea body lotion for soft everyday body care. |
| Pore Care Clay Face Mask | The Ordinary clay mask for weekly skincare routines. |
| Nourishing Hair Oil | Kerastase hair oil for smooth, nourished-looking hair. |
| Essential Beauty Tools Set | Real Techniques brush and tool set for makeup routines. |
| Rose Glow Blush Palette | NARS blush palette for soft rose-toned makeup looks. |
| Retinol Night Cream | Olay night cream for evening skincare routines. |
| Micellar Cleansing Water | Bioderma micellar water for gentle cleansing. |
| Hydrating Sheet Mask | Laneige sheet mask for hydration-focused K-beauty routines. |
| Brow Definer Pencil | Anastasia Beverly Hills brow pencil for defined brows. |
| Makeup Brush Collection | Morphe makeup brush collection for face and eye looks. |

## Image Strategy

Short-term implementation:

- Use the existing beauty-relevant Unsplash URLs from `frontend/src/lib/constants.js` for `featured_image`.
- Seed one primary `product_images` row per product using the same image and `sort_order = 0`.
- Avoid Made in SL images such as tea, cinnamon, gems, coconut, rubber gloves, batik, spices, export packaging, or machinery.

Long-term implementation:

- Replace remote URLs with approved local or controlled CDN paths, for example:
  - `/images/beauty/products/gentle-hydrating-cleanser.webp`
  - `/images/beauty/products/vitamin-c-brightening-serum.webp`
  - `/images/beauty/products/spf-50-daily-sunscreen.webp`
- Keep paths deterministic so frontend and backend can converge later.

Image upsert rule:

- Resolve `product_id` by product slug.
- Use a stable key such as `(product_id, image)` for `product_images`.
- Do not delete existing product images.
- Do not overwrite non-seed images unless the same product/image key is seed-owned.

## Supplier ID Strategy

The `products.supplier_id` column is nullable.

Recommended for this product seeder:

- Set `supplier_id` to `null`.
- Do not create a supplier seeder as part of product seeding.
- Do not attach products to legacy Made in SL suppliers.
- Do not attach products to a demo supplier until a dedicated SL Beauty supplier/brand authorization strategy is approved.

Why this is safest:

- Avoids misrepresenting brand authorization.
- Avoids coupling public product display data to existing export suppliers.
- Avoids modifying supplier dashboards, ownership rules, RFQ flows, or seller authorization workflows.

Future supplier strategy:

- Add `SlBeautyDemoSupplierSeeder` later if supplier-owned products are required.
- Add seller brand authorization seed records only after legal/demo authorization status rules are agreed.
- Reassign seed products to SL Beauty demo suppliers through a dedicated, reviewed task.

## Idempotency Rules

The future product seeder should:

- Check `Schema::hasTable('products')` and `Schema::hasTable('categories')`.
- Check `Schema::hasTable('product_images')` before seeding gallery images.
- Use `Schema::hasColumn()` before writing optional fields.
- Use product `slug` as the stable product lookup key.
- Preserve existing product `created_at` on rerun.
- Preserve existing product identity on rerun.
- Update only mutable seed-owned fields.
- Never change product `slug` on update.
- Never delete products.
- Never deactivate existing products.
- Never reassign legacy products or Made in SL products.
- Resolve categories by expected category slug; do not create categories inside the product seeder.
- Confirm expected brand slugs exist, but do not create brands inside the product seeder.
- Use `product_images` stable upsert by `(product_id, image)` or, if needed, `(product_id, sort_order, image)`.
- Never remove existing product images.

Recommended helper pattern:

```text
existing product = products where slug = expected slug
if exists:
  update mutable fields only; do not touch created_at
else:
  insert full product payload with created_at and updated_at
```

## Rollback Safety

Seed data does not roll back through Laravel migrations.

Recommended rollback approach:

1. Document the exact product slug list.
2. In local/dev only, delete by exact seed product slugs after confirming rows are seed-owned.
3. Delete matching `product_images` rows for those product IDs only after confirming they are seed-owned.
4. In shared or production environments, prefer `status = inactive` over deletion if products may be referenced by views, analytics, wishlist, cart, messages, or future orders.
5. Never delete products by broad category name.
6. Never delete legacy Made in SL products in this task.

Exact future rollback slug list:

```text
gentle-hydrating-cleanser
vitamin-c-brightening-serum
spf-50-daily-sunscreen
long-wear-matte-lipstick
bond-repair-shampoo
signature-eau-de-parfum
soft-glow-body-lotion
pore-care-clay-face-mask
nourishing-hair-oil
essential-beauty-tools-set
rose-glow-blush-palette
retinol-night-cream
micellar-cleansing-water
hydrating-sheet-mask
brow-definer-pencil
makeup-brush-collection
```

## Testing Plan

Future implementation checks:

```bash
php -l backend/database/seeders/SlBeautyProductSeeder.php
php artisan db:seed --class=SlBeautyBrandSeeder
php artisan db:seed --class=SlBeautyCategoryAlignmentSeeder
php artisan db:seed --class=SlBeautyProductSeeder
php artisan db:seed --class=SlBeautyProductSeeder
php artisan test
npm run lint
```

Database validation:

- Confirm all 16 product slugs exist.
- Confirm all seeded products have `status = active`.
- Confirm all seeded products have `moq = 1`.
- Confirm all seeded products have expected `category_id`.
- Confirm all seeded products have `supplier_id is null`.
- Confirm all seeded products have `featured_image`.
- Confirm each seeded product has one primary `product_images` row.
- Confirm rerunning the seeder does not create duplicate products.
- Confirm rerunning the seeder does not create duplicate primary images.
- Confirm rerunning the seeder preserves `created_at`.
- Confirm no product slugs contain old Made in SL terms.

Suggested SQL-level checks:

```text
select slug, name, status, supplier_id from products where slug in (...expected slugs...);
select slug, count(*) from products group by slug having count(*) > 1;
select p.slug, c.slug as category_slug from products p join categories c on c.id = p.category_id where p.slug in (...expected slugs...);
select p.slug, count(pi.id) as image_count from products p left join product_images pi on pi.product_id = p.id where p.slug in (...expected slugs...) group by p.slug;
```

Public safety checks after later API/frontend integration:

- `/products` returns beauty products only.
- `/categories/skincare` includes skincare products.
- `/categories/makeup` includes makeup products.
- `/categories/fragrance` includes fragrance products.
- `/categories/hair-care` includes haircare products.
- `/categories/bath-body` includes body products.
- `/categories/k-beauty` includes K-beauty products.
- Public storefront scans show no Ceylon, cinnamon, coconut, sapphire, rubber gloves, batik, spices, RFQ, or export wording in product display scope.

## What Not To Change Yet

- Do not create `SlBeautyProductSeeder.php` in Task 34.
- Do not modify migrations.
- Do not modify frontend constants or pages.
- Do not modify `DatabaseSeeder.php`.
- Do not modify routes, controllers, API resources, policies, requests, or private APIs.
- Do not seed product beauty profiles yet.
- Do not seed product variants yet.
- Do not seed seller brand authorizations yet.
- Do not create or modify suppliers yet.
- Do not add checkout, cart, payment, order, RFQ, quotation, dashboard, messaging, notification, admin, analytics, supplier, buyer, or internal B2B behavior.
- Do not delete, rename, deactivate, or overwrite Made in SL products.
- Do not modify `.env`.

## Risks

| Risk | Mitigation |
| --- | --- |
| Product-to-brand relation does not exist in current schema | Resolve brand slugs for validation only; store brand text in descriptions until schema support is approved. |
| Seeded products with `supplier_id = null` may not appear in supplier-owned APIs | This is acceptable for public display seed data; supplier-owned product seeding should be a later task. |
| Remote image URLs may change or become unavailable | Use current beauty-safe URLs for short-term seed parity; migrate to local/CDN assets later. |
| Duplicate conceptual products if legacy data has similar names | Use unique SL Beauty product slugs and never modify legacy Made in SL products. |
| Product seeder runs before brand/category seeders | Validate required brand/category slugs and fail clearly or document required seeder order. |
| Public APIs may still query all active products | Backend/frontend integration must filter to SL Beauty public scope before replacing forced frontend display data. |

## Recommended Implementation Order

1. Add `SlBeautyProductSeeder.php` as a standalone opt-in seeder.
2. Require category and brand seeders to be run first.
3. Seed 16 products by deterministic slug.
4. Seed one primary product image per product.
5. Run the seeder twice to verify idempotency.
6. Run backend tests and frontend lint.
7. Create a verification report before adding product beauty profiles or variants.

## Recommendation

Proceed with a standalone `SlBeautyProductSeeder` implementation next. Keep it limited to `products` and `product_images`, use nullable `supplier_id`, avoid formal brand relationships until schema support exists, and keep product profiles/variants for later dedicated tasks.
