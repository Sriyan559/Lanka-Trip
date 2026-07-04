# Task 23: Supplier Brand Authorization API Report

## Summary

Task 23 added only supplier-side SL Beauty seller brand authorization APIs under the existing authenticated `/api/supplier/sl-beauty` route group.

No admin review APIs, frontend changes, migrations, seeders, checkout/cart/payment/order APIs, RFQ changes, quotation changes, supplier dashboard changes, buyer dashboard changes, messaging changes, notification changes, order changes, existing product catalogue changes, admin changes, or analytics changes were added.

## Files Created

- `backend/app/Http/Controllers/SLBeauty/SupplierBrandAuthorizationController.php`
- `backend/tests/Feature/SLBeautySupplierBrandAuthorizationApiTest.php`
- `documents/task-23-supplier-brand-authorization-api-report.md`

## Files Modified

- `backend/routes/api.php`

Only the `SupplierBrandAuthorizationController` import and the six supplier SL Beauty brand authorization routes were added.

## Routes Added

All routes are under the existing `auth:sanctum` middleware through the current supplier SL Beauty route group:

| Method | Route | Controller Action |
|---|---|---|
| `GET` | `/api/supplier/sl-beauty/brand-authorizations` | `SupplierBrandAuthorizationController@index` |
| `POST` | `/api/supplier/sl-beauty/brand-authorizations` | `SupplierBrandAuthorizationController@store` |
| `GET` | `/api/supplier/sl-beauty/brand-authorizations/{authorization}` | `SupplierBrandAuthorizationController@show` |
| `PUT` | `/api/supplier/sl-beauty/brand-authorizations/{authorization}` | `SupplierBrandAuthorizationController@update` |
| `POST` | `/api/supplier/sl-beauty/brand-authorizations/{authorization}/submit` | `SupplierBrandAuthorizationController@submit` |
| `DELETE` | `/api/supplier/sl-beauty/brand-authorizations/{authorization}` | `SupplierBrandAuthorizationController@destroy` |

No admin approval, rejection, suspension, expiry, checkout, cart, payment, or order routes were added.

## Endpoint Behavior Summary

### `GET /api/supplier/sl-beauty/brand-authorizations`

- Requires authenticated supplier.
- Requires `sl_beauty.brand_seller_verification`.
- Returns only authorization records where `seller_brand_authorizations.supplier_id` matches the authenticated supplier profile.
- Uses `SellerBrandAuthorizationResource` with supplier-owned private fields.

### `POST /api/supplier/sl-beauty/brand-authorizations`

- Requires authenticated supplier.
- Requires `sl_beauty.brand_seller_verification`.
- Uses `StoreSellerBrandAuthorizationRequest`.
- Creates a `draft` authorization for the authenticated supplier only.
- Accepts only active brands.
- Rejects body `supplier_id`, `status`, `reviewed_by`, `reviewed_at`, and `review_notes`.

### `GET /api/supplier/sl-beauty/brand-authorizations/{authorization}`

- Requires authenticated supplier.
- Requires `sl_beauty.brand_seller_verification`.
- Returns only owned authorization records.
- Returns `404` for another supplier's authorization.

### `PUT /api/supplier/sl-beauty/brand-authorizations/{authorization}`

- Requires authenticated supplier.
- Requires `sl_beauty.brand_seller_verification`.
- Uses `UpdateSellerBrandAuthorizationRequest`.
- Updates only owned authorization records whose status is `draft` or `rejected`.
- Rejects supplier/admin/review fields.

### `POST /api/supplier/sl-beauty/brand-authorizations/{authorization}/submit`

- Requires authenticated supplier.
- Requires `sl_beauty.brand_seller_verification`.
- Changes only owned `draft` or `rejected` authorizations to `submitted`.
- Does not approve, reject, suspend, expire, assign a reviewer, write review notes, or trigger notifications.

### `DELETE /api/supplier/sl-beauty/brand-authorizations/{authorization}`

- Requires authenticated supplier.
- Requires `sl_beauty.brand_seller_verification`.
- Deletes only owned `draft` authorizations.
- Submitted, approved, suspended, expired, and non-owned authorizations are not deleted.

## Ownership and Authorization Notes

- Supplier identity is resolved from the authenticated user and the existing `suppliers.user_id` relationship.
- `supplier_id` is derived server-side and never trusted from request payloads.
- Record ownership is enforced by querying `seller_brand_authorizations.supplier_id` against the authenticated supplier profile.
- Non-owned records return `404`, matching the existing supplier route convention for hiding records outside ownership.
- Policy checks are used for view-any, create, view, update, submit, and delete actions.
- The existing `SellerBrandAuthorizationPolicy` enforces supplier-only ownership plus allowed status transitions.

## Feature Flag Behavior

| Endpoint group | Feature flag | Behavior when disabled |
|---|---|---|
| All supplier brand authorization endpoints | `sl_beauty.brand_seller_verification` | Returns `403` for authenticated supplier actions. |

Implementation details:

- Brand seller verification fails closed by default if the feature flag row is missing or disabled.
- A focused test confirms a disabled active `sl_beauty.brand_seller_verification` flag returns `403`.

## Tests and Checks Run

| Check | Result | Notes |
|---|---|---|
| `php -l backend/app/Http/Controllers/SLBeauty/SupplierBrandAuthorizationController.php` | Passed | No syntax errors. |
| `php -l backend/routes/api.php` | Passed | No syntax errors. |
| `php -l backend/tests/Feature/SLBeautySupplierBrandAuthorizationApiTest.php` | Passed | No syntax errors. |
| `php artisan route:list --path=supplier/sl-beauty` | Passed | Shows existing beauty profile and product variant routes plus the 6 intended brand authorization routes. |
| `php artisan test --filter=SLBeautySupplierBrandAuthorizationApiTest` | Passed | `12 deprecated`, `59 assertions`. |
| `php artisan test` | Passed | `211 deprecated`, `1 passed`, `1948 assertions`. Existing B2B suites still pass. |
| `npm run lint` | Passed | No ESLint warnings or errors. |

Known check noise:

- Backend commands emit existing PHP 8.5 `PDO::MYSQL_ATTR_SSL_CA` deprecation notices from Laravel database configuration.
- The first sandboxed focused test attempt failed because Laravel/PHPUnit could not write `backend/storage/logs/*` and `.phpunit.result.cache`; it passed when rerun with approved write access.

## What Was Intentionally Not Changed

- No admin review APIs were added.
- No admin approval, rejection, suspension, or expiry behavior was implemented.
- No notifications are triggered by submit yet.
- No frontend files were modified.
- No migrations were modified.
- No seeders were modified.
- No checkout, cart, payment, retail order, shipment, return, or refund APIs were added.
- No existing public product API behavior was changed.
- No existing `/api/supplier/products` behavior was changed.
- No RFQ, quotation, supplier dashboard, buyer dashboard, messaging, notification, order, existing product catalogue, admin, or analytics behavior was changed.

## Risks and Rollback Notes

Risks:

- Feature flag lookup remains local to SL Beauty supplier controllers. This matches earlier SL Beauty API work; a future shared helper would reduce duplication.
- `seller_brand_authorizations` does not currently use soft deletes, so supplier deletion of an owned `draft` authorization removes the draft row. This follows the current model and migration; add soft deletes in a separate migration if withdrawal history becomes required.
- Submit changes status only. Admin review notes, notification events, and audit history should be introduced in future dedicated admin/compliance tasks.

Rollback:

- Remove the `SupplierBrandAuthorizationController` import and six `/api/supplier/sl-beauty/brand-authorizations` routes from `backend/routes/api.php`.
- Delete `backend/app/Http/Controllers/SLBeauty/SupplierBrandAuthorizationController.php`.
- Delete `backend/tests/Feature/SLBeautySupplierBrandAuthorizationApiTest.php`.
- Delete this report if rolling back the documentation artifact.

## Recommendation

Proceed to verification before adding any admin review APIs. Keep admin approval/rejection/suspension/expiry workflows as a separate additive task.
