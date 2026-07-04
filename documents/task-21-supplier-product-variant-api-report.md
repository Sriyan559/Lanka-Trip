# Task 21: Supplier Product Variant API Report

## Summary

Task 21 added only supplier-side SL Beauty product variant APIs under the existing authenticated `/api/supplier/sl-beauty` route group.

No seller brand authorization APIs, admin APIs, frontend changes, migrations, seeders, checkout/cart/payment/order APIs, RFQ changes, quotation changes, supplier dashboard changes, buyer dashboard changes, messaging changes, notification changes, order changes, existing product catalogue changes, admin changes, or analytics changes were added.

## Files Created

- `backend/app/Http/Controllers/SLBeauty/SupplierProductVariantController.php`
- `backend/tests/Feature/SLBeautySupplierProductVariantApiTest.php`
- `documents/task-21-supplier-product-variant-api-report.md`

## Files Modified

- `backend/routes/api.php`

Only the `SupplierProductVariantController` import and the six supplier SL Beauty product variant routes were added.

## Routes Added

All routes are under the existing `auth:sanctum` middleware through the current supplier SL Beauty route group:

| Method | Route | Controller Action |
|---|---|---|
| `GET` | `/api/supplier/sl-beauty/products/{product}/variants` | `SupplierProductVariantController@index` |
| `POST` | `/api/supplier/sl-beauty/products/{product}/variants` | `SupplierProductVariantController@store` |
| `GET` | `/api/supplier/sl-beauty/products/{product}/variants/{variant}` | `SupplierProductVariantController@show` |
| `PUT` | `/api/supplier/sl-beauty/products/{product}/variants/{variant}` | `SupplierProductVariantController@update` |
| `PATCH` | `/api/supplier/sl-beauty/products/{product}/variants/{variant}/status` | `SupplierProductVariantController@updateStatus` |
| `DELETE` | `/api/supplier/sl-beauty/products/{product}/variants/{variant}` | `SupplierProductVariantController@destroy` |

No seller brand authorization, admin review, checkout, cart, payment, or order routes were added.

## Endpoint Behavior Summary

### `GET /api/supplier/sl-beauty/products/{product}/variants`

- Requires authenticated supplier.
- Requires `sl_beauty.taxonomy`.
- Resolves only products owned by the authenticated supplier.
- Returns paginated variants for the owned product.
- Uses `ProductVariantResource` with supplier-safe operational fields.

### `POST /api/supplier/sl-beauty/products/{product}/variants`

- Requires authenticated supplier.
- Requires `sl_beauty.taxonomy`.
- Resolves only products owned by the authenticated supplier.
- Uses `StoreProductVariantRequest`.
- Generates server-side `uuid`.
- Creates the variant through the route product relationship.
- Rejects body `product_id`, `uuid`, and `currency_id`.

### `GET /api/supplier/sl-beauty/products/{product}/variants/{variant}`

- Requires authenticated supplier.
- Requires `sl_beauty.taxonomy`.
- Verifies the product is owned by the authenticated supplier.
- Verifies the variant belongs to the route product.
- Returns `404` for variants outside the route product scope.

### `PUT /api/supplier/sl-beauty/products/{product}/variants/{variant}`

- Requires authenticated supplier.
- Requires `sl_beauty.taxonomy`.
- Verifies product ownership and variant nesting.
- Uses `UpdateProductVariantRequest`.
- Rejects body `product_id`, `uuid`, and `currency_id`.

### `PATCH /api/supplier/sl-beauty/products/{product}/variants/{variant}/status`

- Requires authenticated supplier.
- Requires `sl_beauty.taxonomy`.
- Verifies product ownership and variant nesting.
- Accepts only `status` and/or `is_active`.
- Allows `status` values: `draft`, `active`, `inactive`.
- Rejects unrelated fields with validation errors.

### `DELETE /api/supplier/sl-beauty/products/{product}/variants/{variant}`

- Requires authenticated supplier.
- Requires `sl_beauty.taxonomy`.
- Verifies product ownership and variant nesting.
- Soft-deletes the variant because `ProductVariant` uses `SoftDeletes`.

## Ownership and Authorization Notes

- Supplier identity is resolved from the authenticated user and the existing `suppliers.user_id` relationship.
- Product ownership is checked by querying `products.supplier_id` against the authenticated supplier profile.
- Variant ownership is checked by requiring `product_variants.product_id` to match the route product after product ownership is confirmed.
- Non-owned products and incorrectly nested variants return `404`, consistent with existing supplier product route conventions.
- Non-supplier authenticated users receive `403`.
- Policy checks are used for view-any, create, view, update, change-status, and delete actions.
- Request body `product_id` is prohibited, so clients cannot reassign variant ownership.

## Feature Flag Behavior

| Endpoint group | Feature flag | Behavior when disabled |
|---|---|---|
| All supplier product variant endpoints | `sl_beauty.taxonomy` | Returns `403` for authenticated supplier actions. |

Implementation details:

- Taxonomy defaults to enabled if the optional feature flag row is absent, matching the existing Task 19 supplier beauty profile behavior.
- A focused test confirms a disabled active `sl_beauty.taxonomy` flag returns `403`.

## Tests and Checks Run

| Check | Result | Notes |
|---|---|---|
| `php -l backend/app/Http/Controllers/SLBeauty/SupplierProductVariantController.php` | Passed | No syntax errors. |
| `php -l backend/routes/api.php` | Passed | No syntax errors. |
| `php -l backend/tests/Feature/SLBeautySupplierProductVariantApiTest.php` | Passed | No syntax errors. |
| `php artisan route:list --path=supplier/sl-beauty` | Passed | Shows the existing 3 beauty profile routes plus the 6 intended variant routes. |
| `php artisan test --filter=SLBeautySupplierProductVariantApiTest` | Passed | `12 deprecated`, `70 assertions`. |
| `php artisan test` | Passed | `199 deprecated`, `1 passed`, `1889 assertions`. Existing B2B suites still pass. |
| `npm run lint` | Passed | No ESLint warnings or errors. |

Known check noise:

- Backend commands emit existing PHP 8.5 `PDO::MYSQL_ATTR_SSL_CA` deprecation notices from Laravel database configuration.
- The first sandboxed focused test attempt failed because Laravel/PHPUnit could not write `backend/storage/logs/*` and `.phpunit.result.cache`; it passed when rerun with approved write access.

## What Was Intentionally Not Changed

- No seller brand authorization supplier APIs were added.
- No admin review APIs were added.
- No frontend files were modified.
- No migrations were modified.
- No seeders were modified.
- No checkout, cart, payment, retail order, shipment, return, or refund APIs were added.
- No existing public product API behavior was changed.
- No existing `/api/supplier/products` behavior was changed.
- No RFQ, quotation, supplier dashboard, buyer dashboard, messaging, notification, order, existing product catalogue, admin, or analytics behavior was changed.

## Risks and Rollback Notes

Risks:

- Feature flag lookup is local to this controller, consistent with earlier SL Beauty supplier/public controllers. A shared helper remains a useful future cleanup once more SL Beauty controllers are added.
- Supplier variant `slug` uniqueness is enforced by the database schema but not manually normalized in this controller. This matches the existing request foundation and should be handled in a future refinement if slugs become supplier-entered UI fields.
- Delete currently soft-deletes product variants. If future order/cart references depend on variants, additional delete guards should be added before B2C commerce work.

Rollback:

- Remove the `SupplierProductVariantController` import and the six `/api/supplier/sl-beauty/products/{product}/variants` routes from `backend/routes/api.php`.
- Delete `backend/app/Http/Controllers/SLBeauty/SupplierProductVariantController.php`.
- Delete `backend/tests/Feature/SLBeautySupplierProductVariantApiTest.php`.
- Delete this report if rolling back the documentation artifact.

## Recommendation

Proceed to verification before adding seller brand authorization supplier APIs. Keep seller brand authorization and admin review APIs as separate additive tasks.
