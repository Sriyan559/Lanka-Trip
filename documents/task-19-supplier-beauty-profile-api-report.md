# Task 19: Supplier Beauty Profile API Report

## Summary

Task 19 added only the supplier-side SL Beauty product beauty profile APIs under the authenticated supplier SL Beauty route group.

No product variant APIs, brand authorization APIs, admin APIs, frontend changes, migrations, seeders, checkout/cart/payment/order APIs, RFQ changes, quotation changes, supplier dashboard changes, buyer dashboard changes, messaging changes, notification changes, order changes, existing product catalogue changes, admin changes, or analytics changes were added.

## Files Created

- `backend/app/Http/Controllers/SLBeauty/SupplierBeautyProfileController.php`
- `backend/tests/Feature/SLBeautySupplierBeautyProfileApiTest.php`
- `documents/task-19-supplier-beauty-profile-api-report.md`

## Files Modified

- `backend/routes/api.php`

Only the supplier SL Beauty beauty profile routes and controller import were added.

## Routes Added

All routes are under existing `auth:sanctum` middleware:

| Method | Route | Controller Action |
|---|---|---|
| `GET` | `/api/supplier/sl-beauty/products/{product}/beauty-profile` | `SupplierBeautyProfileController@show` |
| `PUT` | `/api/supplier/sl-beauty/products/{product}/beauty-profile` | `SupplierBeautyProfileController@upsert` |
| `POST` | `/api/supplier/sl-beauty/products/{product}/beauty-profile/submit-compliance` | `SupplierBeautyProfileController@submitCompliance` |

No product variant, brand authorization, admin, cart, checkout, payment, or order routes were added.

## Endpoint Behavior Summary

### `GET /api/supplier/sl-beauty/products/{product}/beauty-profile`

- Requires authenticated supplier.
- Requires `sl_beauty.taxonomy`.
- Resolves only products owned by the authenticated supplier.
- Returns `404` if the product is not owned or if no beauty profile exists.
- Uses `ProductBeautyProfileResource`.

### `PUT /api/supplier/sl-beauty/products/{product}/beauty-profile`

- Requires authenticated supplier.
- Requires `sl_beauty.taxonomy`.
- Resolves only products owned by the authenticated supplier.
- Creates a beauty profile if one does not exist.
- Updates the existing beauty profile if one exists and policy allows update.
- Rejects body `product_id`.
- Rejects supplier-controlled `compliance_status`.
- Uses `UpdateProductBeautyProfileRequest`, `ProductBeautyProfilePolicy`, and `ProductBeautyProfileResource`.

### `POST /api/supplier/sl-beauty/products/{product}/beauty-profile/submit-compliance`

- Requires authenticated supplier.
- Requires `sl_beauty.compliance_workflows`.
- Resolves only products owned by the authenticated supplier.
- Requires an existing beauty profile.
- Uses `ProductBeautyProfilePolicy::submitCompliance`.
- Changes allowed profile statuses to `pending_review`.
- Does not implement admin approval, rejection, review notes, notifications, or product publication changes.

## Ownership and Authorization Notes

- Supplier identity is resolved from the authenticated user and the existing `suppliers.user_id` relationship.
- Product ownership is checked by querying `products.supplier_id` against the authenticated supplier profile.
- Non-owned products return `404`, matching the existing supplier product API convention.
- Non-supplier authenticated users receive `403`.
- Policy checks are used for view, create, update, and submit-compliance actions.
- Request body `product_id` is prohibited, so clients cannot reassign profile ownership.

## Feature Flag Behavior

| Endpoint | Feature flag | Behavior when disabled |
|---|---|---|
| `GET /beauty-profile` | `sl_beauty.taxonomy` | Returns `403`. |
| `PUT /beauty-profile` | `sl_beauty.taxonomy` | Returns `403`. |
| `POST /submit-compliance` | `sl_beauty.compliance_workflows` | Returns `403`. |

Implementation details:

- Taxonomy defaults to enabled if the optional feature flag row is absent, matching the existing Task 14/Task 16 behavior.
- Compliance workflows fail closed unless explicitly enabled in `feature_flags`.

## Tests and Checks Run

| Check | Result | Notes |
|---|---|---|
| `php -l backend/app/Http/Controllers/SLBeauty/SupplierBeautyProfileController.php` | Passed | No syntax errors. |
| `php -l backend/routes/api.php` | Passed | No syntax errors. |
| `php -l backend/tests/Feature/SLBeautySupplierBeautyProfileApiTest.php` | Passed | No syntax errors. |
| `php artisan route:list --path=supplier/sl-beauty` | Passed | Shows exactly 3 supplier beauty profile routes. |
| `php artisan test --filter=SLBeautySupplierBeautyProfileApiTest` | Passed | `10 deprecated`, `41 assertions`. |
| `php artisan test` | Passed | `187 deprecated`, `1 passed`, `1819 assertions`. |
| `npm run lint` | Passed | No ESLint warnings or errors. |

Known check noise:

- Backend commands emit existing PHP 8.5 `PDO::MYSQL_ATTR_SSL_CA` deprecation notices from Laravel database configuration.

## What Was Intentionally Not Changed

- No product variant supplier APIs were added.
- No seller brand authorization supplier APIs were added.
- No admin review APIs were added.
- No frontend files were modified.
- No migrations were modified.
- No seeders were modified.
- No checkout, cart, payment, retail order, shipment, return, or refund APIs were added.
- No RFQ, quotation, supplier dashboard, buyer dashboard, messaging, notification, order, existing product catalogue, admin, or analytics behavior was changed.
- No notifications are triggered by compliance submission yet.
- No admin approval/rejection workflow was implemented.

## Risks and Rollback Notes

Risks:

- Feature flag lookup is local to this controller, consistent with earlier SL Beauty controllers and policies. A shared helper should be considered once more SL Beauty controllers are added.
- `submit-compliance` currently changes only `compliance_status`; review notes/history require a future additive schema and admin API task.
- Supplier edits are blocked for profiles already in `pending_review` or `approved` by the existing policy. Any future resubmission workflow should be planned separately.

Rollback:

- Remove the `SupplierBeautyProfileController` import and the three `/api/supplier/sl-beauty/products/{product}/beauty-profile` routes from `backend/routes/api.php`.
- Delete `backend/app/Http/Controllers/SLBeauty/SupplierBeautyProfileController.php`.
- Delete `backend/tests/Feature/SLBeautySupplierBeautyProfileApiTest.php`.
- Delete this report if rolling back the documentation artifact.

## Recommendation

Proceed to a verification task before adding product variant supplier APIs or seller brand authorization APIs.
