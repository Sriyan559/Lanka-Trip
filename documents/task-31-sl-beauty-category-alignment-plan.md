# Task 31: SL Beauty Category Alignment Seeder Plan

Date: 2026-07-05  
Branch: `feature/sl-beauty-seed-data`

## Summary

This plan defines a safe category alignment strategy so frontend SL Beauty public category slugs can map cleanly to backend categories before backend-driven beauty product seeding begins.

No seeders, migrations, frontend files, backend code, routes, or database tables are changed in this task. This is a planning document only.

## Files Reviewed

| File | Purpose |
| --- | --- |
| `documents/task-28-sl-beauty-seed-data-plan.md` | Confirmed the broader seed-data strategy and known slug mismatch risks. |
| `backend/database/seeders/SlBeautyTaxonomySeeder.php` | Reviewed current backend beauty taxonomy categories and attribute mappings. |
| `backend/database/migrations/2026_06_23_150000_create_categories_table.php` | Confirmed category schema and lack of a dedicated alias table. |
| `frontend/src/lib/constants.js` | Reviewed current public storefront category slugs and product category usage. |
| `frontend/src/lib/slBeautyConfig.js` | Reviewed `SL_BEAUTY_CATEGORY_SLUGS` used to filter public category constants. |

## Current Category Schema

The `categories` table currently supports:

| Column | Notes |
| --- | --- |
| `id` | Primary key. |
| `name` | Category display name. |
| `slug` | Unique category slug. |
| `description` | Nullable description. |
| `image` | Nullable image URL/path. |
| `parent_id` | Nullable self-reference to parent category. |
| `sort_order` | Indexed display ordering field. |
| `status` | `active` or `inactive`. |
| `created_at`, `updated_at` | Timestamps. |

Important implication: there is no native `category_aliases` table or alias column. A seeder-only alignment task cannot create true aliases without a migration. The safe short-term choices are:

1. Add missing public-facing category rows with frontend slugs.
2. Map frontend slugs to existing backend slugs in code later.
3. Add a future alias table/mapping migration later if canonical and public slugs must remain separate.

## Current Frontend Category Slugs

From `SL_BEAUTY_CATEGORY_SLUGS` and `SRI_LANKA_CATEGORIES`:

| Frontend slug | Display label | Status in current backend taxonomy |
| --- | --- | --- |
| `makeup` | Makeup | Exists. |
| `skincare` | Skincare | Missing; backend has `skin-care`. |
| `fragrance` | Fragrance | Exists. |
| `hair-care` | Haircare | Exists. |
| `bath-body` | Bath & Body | Missing; backend has `body-care`. |
| `tools-brushes` | Beauty Tools | Missing; backend has `salon-tools` under `professional-salon-supplies`. |
| `mens-grooming` | Men's Grooming | Missing; backend has `men-grooming`. |
| `wellness` | Wellness | Missing. |
| `luxury-beauty` | Luxury Beauty | Missing. |
| `k-beauty` | K-Beauty | Missing. |
| `mini-size` | Mini Size | Missing. |
| `gift-sets` | Gift Sets | Missing. |
| `sale` | Sale & Offers | Missing. |
| `new-arrivals` | New Arrivals | Missing. |

Additional public route aliases mentioned in prior frontend work:

| Route slug | Intended category |
| --- | --- |
| `hair` | Haircare |
| `bath-and-body` | Bath & Body |
| `beauty-tools` | Beauty Tools |
| `mens-grooming` | Men's Grooming |

## Current Backend Beauty Taxonomy Slugs

From `SlBeautyTaxonomySeeder.php`:

### Top-Level Categories

| Backend slug | Display name |
| --- | --- |
| `skin-care` | Skin Care |
| `hair-care` | Hair Care |
| `makeup` | Makeup |
| `fragrance` | Fragrance |
| `body-care` | Body Care |
| `natural-ayurvedic-beauty` | Natural and Ayurvedic Beauty |
| `professional-salon-supplies` | Professional and Salon Supplies |
| `men-grooming` | Men Grooming |

### Child Categories

| Parent slug | Child slugs |
| --- | --- |
| `skin-care` | `cleansers`, `moisturizers`, `serums-treatments`, `sunscreen` |
| `hair-care` | `shampoo`, `conditioner`, `hair-oils-treatments` |
| `makeup` | `face-makeup`, `lip-makeup`, `eye-makeup` |
| `professional-salon-supplies` | `salon-tools`, `salon-consumables` |

## Slug Mismatch Matrix

| Frontend/public slug | Existing backend slug | Recommended alignment |
| --- | --- | --- |
| `skincare` | `skin-care` | Add frontend-facing `skincare` category row, preserve `skin-care`. |
| `hair` | `hair-care` | Do not add unless route compatibility requires it; prefer mapping `hair` to `hair-care` in category page logic/API later. |
| `hair-care` | `hair-care` | Already aligned. |
| `bath-body` | `body-care` | Add frontend-facing `bath-body` category row, preserve `body-care`. |
| `bath-and-body` | `body-care` | Treat as URL alias; avoid category row unless public routes still require it. |
| `tools-brushes` | `salon-tools` / `professional-salon-supplies` | Add frontend-facing `tools-brushes` category row for consumer tools. |
| `beauty-tools` | `salon-tools` / `professional-salon-supplies` | Treat as URL alias; avoid category row unless route compatibility requires it. |
| `mens-grooming` | `men-grooming` | Add frontend-facing `mens-grooming` category row, preserve `men-grooming`. |
| `wellness` | none | Add category row. |
| `luxury-beauty` | none | Add category row. |
| `k-beauty` | none | Add category row. |
| `mini-size` | none | Add category row. |
| `gift-sets` | none | Add category row. |
| `sale` | none | Add category row or keep virtual; recommended add row for first backend-driven storefront. |
| `new-arrivals` | none | Add category row or keep virtual; recommended add row for first backend-driven storefront. |

## Recommended Strategy

Use a conservative seeder-only category alignment step:

1. Do not rename existing backend taxonomy categories.
2. Do not delete or deactivate existing categories.
3. Add missing frontend-facing public category rows using the slugs already used by `SL_BEAUTY_CATEGORY_SLUGS`.
4. Keep existing canonical backend rows such as `skin-care`, `body-care`, and `men-grooming` for compatibility with existing attribute templates and any current backend references.
5. For product seeding, assign public storefront products to frontend-facing slugs such as `skincare`, `bath-body`, `tools-brushes`, and `mens-grooming`.
6. For category attribute templates, either:
   - duplicate relevant mappings to the frontend-facing rows in a later category attribute alignment seeder, or
   - keep product beauty profile fields as the primary source of beauty-specific product metadata.
7. Treat extra route aliases such as `hair`, `bath-and-body`, and `beauty-tools` as URL-level aliases for a later frontend/API routing task unless data-backed category rows are explicitly needed.

This avoids high-risk renames while giving backend product seeders stable category IDs that match public storefront slugs.

## Categories To Add In Future Alignment Seeder

The future seeder should add these rows only if they do not already exist:

| Name | Slug | Parent | Sort order | Notes |
| --- | --- | --- | ---: | --- |
| Skincare | `skincare` | none | 1000 | Frontend-facing counterpart for `skin-care`. |
| Bath & Body | `bath-body` | none | 1040 | Frontend-facing counterpart for `body-care`. |
| Beauty Tools | `tools-brushes` | none | 1065 | Consumer-facing tools category. |
| Men's Grooming | `mens-grooming` | none | 1070 | Frontend-facing counterpart for `men-grooming`. |
| Wellness | `wellness` | none | 1080 | Beauty wellness/self-care category. |
| Luxury Beauty | `luxury-beauty` | none | 1090 | Premium beauty category. |
| K-Beauty | `k-beauty` | none | 1100 | Korean beauty category. |
| Mini Size | `mini-size` | none | 1110 | Mini/travel size category. |
| Gift Sets | `gift-sets` | none | 1120 | Giftable bundles. |
| Sale & Offers | `sale` | none | 1130 | Promotion category; can later become virtual. |
| New Arrivals | `new-arrivals` | none | 1140 | New product merchandising category; can later become virtual. |

Already existing categories that should not be duplicated:

| Existing slug | Action |
| --- | --- |
| `makeup` | Keep unchanged. |
| `fragrance` | Keep unchanged. |
| `hair-care` | Keep unchanged. |

Existing canonical categories that should remain untouched:

| Existing slug | Reason |
| --- | --- |
| `skin-care` | Existing taxonomy/category attribute mapping. |
| `body-care` | Existing taxonomy/category attribute mapping. |
| `professional-salon-supplies` | Existing B2B/professional category. |
| `salon-tools` | Existing child category. |
| `men-grooming` | Existing taxonomy/category attribute mapping. |
| `natural-ayurvedic-beauty` | Existing beauty/B2B crossover category. |

## Alternative Strategy Considered

### Map aliases only, do not add rows

This would keep a single canonical backend category for each concept and map `skincare` to `skin-care`, `bath-body` to `body-care`, and `mens-grooming` to `men-grooming` in frontend/API code.

Pros:

- Avoids duplicate category concepts.
- Keeps taxonomy cleaner long-term.

Cons:

- Requires frontend or API code changes.
- Does not solve product seeding cleanly if product seed data wants frontend slugs now.
- Does not fit a seeder-only implementation task.

Recommendation: do not use alias-only mapping for the first seed-data step unless the next task is allowed to modify API/frontend category resolution code.

### Add a `category_aliases` table

This is likely the cleanest long-term design, but it requires a migration and additional lookup logic.

Recommendation: defer. Task 31 is planning-only, and the upcoming alignment implementation should remain additive and seeder-only unless explicitly approved.

## Idempotency Rules

The future category alignment seeder should:

- Check `Schema::hasTable('categories')` before doing any work.
- Check `Schema::hasColumn()` before writing optional fields.
- Use `slug` as the stable lookup key.
- Insert missing frontend-facing rows only.
- Preserve existing `created_at` values on rerun.
- Preserve existing row identity on rerun.
- Update only mutable fields such as `name`, `description`, `image`, `parent_id`, `sort_order`, `status`, and `updated_at`.
- Never rename an existing category slug.
- Never delete categories.
- Never set existing non-SL-Beauty categories to inactive.
- Never reparent existing canonical categories unless explicitly approved.
- Keep `status = active` for frontend-facing category rows needed by public storefront.

## Rollback Safety

Seed data does not roll back through Laravel migrations.

Recommended rollback approach:

1. Document exact frontend-facing slugs inserted by the alignment seeder.
2. For local/dev rollback only, delete by exact slug list after confirming the rows are seed-owned.
3. In shared or production databases, prefer setting seed-owned alignment categories to `inactive` instead of deleting them if any products or analytics may reference them.
4. Do not delete canonical taxonomy rows such as `skin-care`, `hair-care`, `body-care`, `men-grooming`, or `professional-salon-supplies`.
5. Do not delete legacy Made in SL export categories in this alignment task.

Exact future rollback slug list:

```text
skincare
bath-body
tools-brushes
mens-grooming
wellness
luxury-beauty
k-beauty
mini-size
gift-sets
sale
new-arrivals
```

## Testing Plan

Future implementation checks:

```bash
php -l backend/database/seeders/SlBeautyCategoryAlignmentSeeder.php
php artisan db:seed --class=SlBeautyCategoryAlignmentSeeder
php artisan db:seed --class=SlBeautyCategoryAlignmentSeeder
php artisan test
npm run lint
```

Database checks:

- Confirm all `SL_BEAUTY_CATEGORY_SLUGS` exist in `categories` after seeding.
- Confirm `makeup`, `fragrance`, and `hair-care` were not duplicated.
- Confirm `skin-care`, `body-care`, `men-grooming`, and existing child categories still exist.
- Confirm no legacy Made in SL category rows were deleted or deactivated.
- Confirm rerunning the seeder does not create duplicates.
- Confirm rerunning the seeder does not change `created_at` for existing alignment rows.

Suggested SQL-level checks:

```text
select slug, name, status from categories where slug in (...expected slugs...);
select slug, count(*) from categories group by slug having count(*) > 1;
select slug, created_at from categories where slug in (...expected slugs...);
```

Public storefront checks after later backend integration:

- `/categories/makeup` resolves to Makeup products.
- `/categories/skincare` resolves to Skincare products.
- `/categories/fragrance` resolves to Fragrance products.
- `/categories/hair-care` resolves to Haircare products.
- `/categories/bath-body` resolves to Bath & Body products.
- `/categories/luxury-beauty`, `/categories/gift-sets`, `/categories/sale`, and `/categories/new-arrivals` do not 404.

## What Not To Change Yet

- Do not modify `SlBeautyTaxonomySeeder.php` yet.
- Do not create `SlBeautyCategoryAlignmentSeeder.php` in Task 31.
- Do not modify migrations or add an alias table yet.
- Do not modify frontend category constants.
- Do not modify API routes, controllers, resources, policies, or product query behavior.
- Do not seed products in the category alignment task.
- Do not delete, rename, reparent, or deactivate existing Made in SL categories.
- Do not change checkout, cart, payment, order, RFQ, quotation, dashboard, messaging, notification, admin, analytics, supplier, buyer, or internal B2B behavior.
- Do not modify `.env`.

## Risks

| Risk | Mitigation |
| --- | --- |
| Duplicate category concepts appear in admin/category APIs | Keep rows additive and intentional; later public APIs should filter/sort storefront categories explicitly. |
| Product seeders choose canonical slugs while frontend expects public slugs | Use frontend-facing slugs for public beauty product seeds. |
| Attribute templates exist only for canonical taxonomy rows | Add a later attribute-template alignment step or rely on `product_beauty_profiles` for public beauty metadata. |
| Future true alias design conflicts with category-as-alias rows | Use deterministic slugs and document seed ownership so rows can be migrated or retired later. |
| Existing B2B taxonomy is accidentally changed | Do not rename/delete/reparent/deactivate any existing category rows. |

## Recommendation

Proceed with a dedicated `SlBeautyCategoryAlignmentSeeder` implementation next. It should add only missing frontend-facing category rows, preserve existing canonical backend taxonomy rows, remain idempotent, and avoid any frontend/API/migration changes.
