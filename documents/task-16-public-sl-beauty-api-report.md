# Task 16: Public Read-Only SL Beauty API Report

## Summary

Task 16 added the first public read-only SL Beauty API endpoints under the new `/api/sl-beauty` route group.

The implementation is additive and does not change existing Made in SL B2B API behavior. No supplier write APIs, admin review APIs, checkout/cart/payment/order APIs, frontend changes, migrations, seeders, or existing product/supplier/RFQ/quotation/cart/order/admin/messaging/notification/analytics/dashboard behavior were changed.

## Files Created

- `backend/app/Http/Controllers/SLBeauty/PublicBeautyController.php`
- `backend/tests/Feature/SLBeautyPublicApiTest.php`
- `documents/task-16-public-sl-beauty-api-report.md`

## Files Modified

- `backend/routes/api.php`

Only a new import and a new isolated `Route::prefix('sl-beauty')` group were added. Existing routes were not renamed, moved, removed, or repurposed.

## Routes Added

| Method | Route | Controller Action | Purpose |
|---|---|---|---|
| `GET` | `/api/sl-beauty/brands` | `PublicBeautyController@brands` | List active and verified brands only. |
| `GET` | `/api/sl-beauty/brands/{slug}` | `PublicBeautyController@brand` | Show one active and verified brand by slug. |
| `GET` | `/api/sl-beauty/products/{product}/beauty-profile` | `PublicBeautyController@beautyProfile` | Show public-safe beauty profile for an active product. |
| `GET` | `/api/sl-beauty/products/{product}/variants` | `PublicBeautyController@variants` | Show active public-safe variants for an active product. |
| `GET` | `/api/sl-beauty/products/{product}/beauty-summary` | `PublicBeautyController@beautySummary` | Show combined public-safe beauty profile and active variants for an active product. |

No brand-products endpoint was added because the current schema does not have a direct product-to-brand relationship.

## Endpoint Behavior Summary

### Public Brands

- Returns only brands with `status = active`.
- Returns only brands with `is_verified = true`.
- Supports safe query parameters:
  - `search`
  - `page`
  - `per_page`
- `per_page` is constrained to `1..100`.
- Public show endpoint returns `404` for inactive, draft, suspended, missing, or unverified brands.

### Public Beauty Profile

- Uses route model binding for the product.
- Requires product `status = active`.
- Requires the product category to be active using existing category status conventions.
- Returns `404` if the product is inactive, category is inactive, or no beauty profile exists.
- Uses `ProductBeautyProfileResource` without loading internal product context.

### Public Product Variants

- Requires product `status = active`.
- Requires the product category to be active.
- Returns only variants where `status = active` and `is_active = true`.
- Uses `ProductVariantResource` public behavior.
- Does not change existing `/api/products/{id}` responses.

### Public Beauty Summary

- Requires product `status = active`.
- Requires active category and existing beauty profile.
- Returns public-safe beauty profile plus active public-safe variants.

## Public Field Safety Notes

The public endpoints do not expose:

- `document_path`
- `reviewed_by`
- `review_notes`
- `created_by`
- `deleted_at`
- internal `compliance_status`
- `metadata`
- supplier-only/admin-only variant fields such as SKU, barcode, B2B price fields, exact stock quantity, and low-stock threshold

The focused tests assert that public brand, beauty profile, and variant responses omit unsafe fields.

## Feature Flag Behavior

The endpoints are gated by `sl_beauty.taxonomy`.

Behavior:

- If the `feature_flags` table exists and has an active `sl_beauty.taxonomy` row, the row's `is_enabled` value controls access.
- If `sl_beauty.taxonomy` is explicitly disabled, the endpoints return `404`.
- If the optional feature flag table or row is unavailable, the controller defaults taxonomy read access to enabled, matching the existing Task 14 policy behavior and the Task 03 foundation where taxonomy is the enabled safe feature.

No B2C retail, brand verification write workflow, compliance review workflow, checkout, cart, payment, or order behavior is enabled by these endpoints.

## Tests and Checks Run

| Check | Result | Notes |
|---|---|---|
| `php -l backend/app/Http/Controllers/SLBeauty/PublicBeautyController.php` | Passed | No syntax errors. |
| `php -l backend/routes/api.php` | Passed | No syntax errors. |
| `php -l backend/tests/Feature/SLBeautyPublicApiTest.php` | Passed | No syntax errors. |
| `php artisan test --filter=SLBeautyPublicApiTest` | Passed | `7 deprecated`, `55 assertions`. Deprecations are existing PHP 8.5 PDO notices. |
| `php artisan route:list --path=sl-beauty` | Passed | Shows exactly 5 `api/sl-beauty` routes. |
| `php artisan test` | Passed | `177 deprecated`, `1 passed`, `1778 assertions`. Deprecations are existing PHP 8.5 PDO notices. |
| `npm run lint` | Passed | No ESLint warnings or errors. |

## What Was Intentionally Not Changed

- No supplier write APIs were added.
- No admin review APIs were added.
- No checkout, cart, payment, retail order, shipment, return, or refund APIs were added.
- No frontend files were changed.
- No migrations were changed.
- No seeders were changed.
- No existing `/api/products`, `/api/supplier/products`, `/api/admin/products`, `/api/cart`, `/api/orders`, `/api/rfqs`, `/api/quotations`, messaging, notification, analytics, or dashboard routes were changed.
- No product-to-brand endpoint was added.
- No existing product detail response was modified.

## Risks and Rollback Notes

Risks:

- The controller contains a local feature-flag lookup consistent with current policy behavior. A later shared feature flag helper would reduce duplication if more SL Beauty controllers are added.
- Product-to-brand browsing remains intentionally absent until a direct product-brand schema exists.
- Public retail prices remain hidden by the existing `ProductVariantResource` behavior unless a future retail feature flag path is deliberately enabled.

Rollback:

- Remove the `Route::prefix('sl-beauty')` group and controller import from `backend/routes/api.php`.
- Delete `backend/app/Http/Controllers/SLBeauty/PublicBeautyController.php`.
- Delete `backend/tests/Feature/SLBeautyPublicApiTest.php`.
- Delete this report if rolling back the documentation artifact as well.

## Recommendation

Proceed to a verification task before adding supplier write APIs or admin review APIs.
