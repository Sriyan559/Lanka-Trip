# Task 18: Supplier-Side SL Beauty API Implementation Plan

## Summary

This document plans the supplier-side SL Beauty API implementation before any supplier write APIs are added.

The planned APIs are additive and must live under authenticated supplier-only route groups. They must not change existing Made in SL B2B routes, controllers, dashboards, RFQ, quotations, messaging, notifications, orders, existing product catalogue behavior, admin behavior, analytics, frontend files, migrations, seeders, checkout, cart, payment, or order behavior.

## 1. Supplier API Design Principles

| Principle | Rule |
|---|---|
| Additive only | Add new routes under `/api/supplier/sl-beauty`; do not reuse or alter existing `/api/supplier/products`. |
| Supplier-owned data only | Every product-scoped endpoint must verify `products.supplier_id` against the authenticated supplier profile. |
| Policy-first authorization | Controllers must call the Task 14 policies and must not trust route parameters alone. |
| Existing B2B safe | Do not change RFQ, quotations, supplier dashboard, buyer dashboard, messaging, notifications, orders, existing product catalogue, admin, or analytics behavior. |
| Feature gated | Product beauty profile and variant APIs are gated by `sl_beauty.taxonomy`; brand authorization APIs are gated by `sl_beauty.brand_seller_verification`. |
| No admin review in supplier APIs | Suppliers may submit records, but approval/rejection/suspension stays in future admin-only APIs. |
| No retail commerce | Do not add checkout, cart, payment, retail order, shipment, return, refund, or B2C order behavior. |
| Public API unchanged | Do not change existing Task 16 public read-only endpoints or existing `/api/products` responses. |

## 2. Route Table

### Product Beauty Profile Management

| Method | Route | Purpose | Auth | Feature flag |
|---|---|---|---|---|
| `GET` | `/api/supplier/sl-beauty/products/{product}/beauty-profile` | Show beauty profile for an owned product. | `auth:sanctum`, supplier role | `sl_beauty.taxonomy` |
| `PUT` | `/api/supplier/sl-beauty/products/{product}/beauty-profile` | Create or update beauty profile for an owned product. | `auth:sanctum`, supplier role | `sl_beauty.taxonomy` |
| `POST` | `/api/supplier/sl-beauty/products/{product}/beauty-profile/submit-compliance` | Submit owned profile for compliance review when compliance workflow is enabled. | `auth:sanctum`, supplier role | `sl_beauty.compliance_workflows` |

### Product Variant Management

| Method | Route | Purpose | Auth | Feature flag |
|---|---|---|---|---|
| `GET` | `/api/supplier/sl-beauty/products/{product}/variants` | List variants for an owned product. | `auth:sanctum`, supplier role | `sl_beauty.taxonomy` |
| `POST` | `/api/supplier/sl-beauty/products/{product}/variants` | Create a variant for an owned product. | `auth:sanctum`, supplier role | `sl_beauty.taxonomy` |
| `GET` | `/api/supplier/sl-beauty/products/{product}/variants/{variant}` | Show an owned product variant. | `auth:sanctum`, supplier role | `sl_beauty.taxonomy` |
| `PUT` | `/api/supplier/sl-beauty/products/{product}/variants/{variant}` | Update an owned product variant. | `auth:sanctum`, supplier role | `sl_beauty.taxonomy` |
| `PATCH` | `/api/supplier/sl-beauty/products/{product}/variants/{variant}/status` | Change `status` and/or `is_active` on an owned variant. | `auth:sanctum`, supplier role | `sl_beauty.taxonomy` |
| `DELETE` | `/api/supplier/sl-beauty/products/{product}/variants/{variant}` | Soft-delete or deactivate an owned variant if safe. | `auth:sanctum`, supplier role | `sl_beauty.taxonomy` |

### Seller Brand Authorization Management

| Method | Route | Purpose | Auth | Feature flag |
|---|---|---|---|---|
| `GET` | `/api/supplier/sl-beauty/brand-authorizations` | List authenticated supplier's brand authorization records. | `auth:sanctum`, supplier role | `sl_beauty.brand_seller_verification` |
| `POST` | `/api/supplier/sl-beauty/brand-authorizations` | Create a draft authorization for authenticated supplier. | `auth:sanctum`, supplier role | `sl_beauty.brand_seller_verification` |
| `GET` | `/api/supplier/sl-beauty/brand-authorizations/{authorization}` | Show an owned authorization record. | `auth:sanctum`, supplier role | `sl_beauty.brand_seller_verification` |
| `PUT` | `/api/supplier/sl-beauty/brand-authorizations/{authorization}` | Update an owned `draft` or `rejected` authorization. | `auth:sanctum`, supplier role | `sl_beauty.brand_seller_verification` |
| `POST` | `/api/supplier/sl-beauty/brand-authorizations/{authorization}/submit` | Submit an owned `draft` or `rejected` authorization for admin review. | `auth:sanctum`, supplier role | `sl_beauty.brand_seller_verification` |
| `DELETE` | `/api/supplier/sl-beauty/brand-authorizations/{authorization}` | Withdraw/delete an owned `draft` authorization. | `auth:sanctum`, supplier role | `sl_beauty.brand_seller_verification` |

## 3. Controller Plan

Create supplier-only controllers under a new SL Beauty namespace, for example:

| Controller | Responsibility |
|---|---|
| `backend/app/Http/Controllers/SLBeauty/SupplierBeautyProfileController.php` | Product beauty profile show/upsert/submit-compliance for owned products. |
| `backend/app/Http/Controllers/SLBeauty/SupplierProductVariantController.php` | Variant list/create/show/update/status/delete for owned products. |
| `backend/app/Http/Controllers/SLBeauty/SupplierBrandAuthorizationController.php` | Supplier brand authorization list/create/show/update/submit/delete for authenticated supplier. |

Implementation notes:

- Add routes only in `backend/routes/api.php` under `Route::prefix('supplier/sl-beauty')->middleware('auth:sanctum')`.
- Keep existing public `/api/sl-beauty` routes unchanged.
- Controllers should use `successResponse()` / `errorResponse()` conventions through the base controller.
- Controllers should load records through route model binding or explicit queries, then verify product/authorization ownership before mutation.
- Controllers should not add global eager loading or modify existing model default behavior.

## 4. Request Classes To Use

| API area | Request class |
|---|---|
| Store beauty profile | `StoreProductBeautyProfileRequest` |
| Update/upsert beauty profile | `UpdateProductBeautyProfileRequest` |
| Submit compliance | A future `SubmitProductBeautyProfileComplianceRequest` may be added if body fields are needed; otherwise no body request is required. |
| Store variant | `StoreProductVariantRequest` |
| Update variant | `UpdateProductVariantRequest` |
| Variant status change | A future `UpdateProductVariantStatusRequest` should validate `status` and `is_active` only. |
| Store brand authorization | `StoreSellerBrandAuthorizationRequest` |
| Update brand authorization | `UpdateSellerBrandAuthorizationRequest` |
| Submit brand authorization | A future lightweight submit request may validate optional supplier note only if a note field is added later. |

Do not use `ReviewSellerBrandAuthorizationRequest` in supplier APIs. It is admin-only.

## 5. Resource Classes To Use

| API area | Resource |
|---|---|
| Beauty profile responses | `ProductBeautyProfileResource` |
| Variant responses | `ProductVariantResource` |
| Brand authorization responses | `SellerBrandAuthorizationResource` |
| Nested brand summaries | `BrandResource` through `SellerBrandAuthorizationResource` when relation is loaded |

Supplier-authenticated resource responses may include supplier-safe operational fields such as SKU, barcode, exact stock, low stock threshold, review feedback for owned authorization records, and compliance status for owned beauty profiles.

## 6. Policy Methods To Call

| Action | Policy method |
|---|---|
| Show beauty profile | `ProductBeautyProfilePolicy::view($user, $profile)` |
| Create beauty profile | `ProductBeautyProfilePolicy::create($user, $product)` |
| Update beauty profile | `ProductBeautyProfilePolicy::update($user, $profile)` |
| Submit profile compliance | `ProductBeautyProfilePolicy::submitCompliance($user, $profile)` |
| List product variants | Verify product ownership, then `ProductVariantPolicy::viewAny($user)` |
| Show variant | `ProductVariantPolicy::view($user, $variant)` |
| Create variant | `ProductVariantPolicy::create($user, $product)` |
| Update variant | `ProductVariantPolicy::update($user, $variant)` |
| Change variant status | `ProductVariantPolicy::changeStatus($user, $variant)` |
| Delete variant | `ProductVariantPolicy::delete($user, $variant)` |
| List authorizations | `SellerBrandAuthorizationPolicy::viewAny($user)`, then scope query to authenticated supplier. |
| Show authorization | `SellerBrandAuthorizationPolicy::view($user, $authorization)` |
| Create authorization | `SellerBrandAuthorizationPolicy::create($user, $brand)` |
| Update authorization | `SellerBrandAuthorizationPolicy::update($user, $authorization)` |
| Submit authorization | `SellerBrandAuthorizationPolicy::submit($user, $authorization)` |
| Delete authorization | `SellerBrandAuthorizationPolicy::delete($user, $authorization)` |

Controllers should use `$this->authorize(...)` or `Gate::authorize(...)` so failures return Laravel-standard `403` responses.

## 7. Supplier Ownership Rules

| Resource | Ownership rule |
|---|---|
| Product beauty profile | Owned through `product_id`; authenticated user's supplier profile ID must match `products.supplier_id`. |
| Product variant | Owned through `product_id`; authenticated user's supplier profile ID must match the variant product's `supplier_id`. |
| Seller brand authorization | Owned through `seller_brand_authorizations.supplier_id`; authenticated user's supplier profile ID must match. |
| Brand | Supplier does not own brand records; supplier may reference active brands for authorization requests only. |

Controller safeguards:

- For nested variant routes, verify `{variant}.product_id === {product}.id`.
- For beauty profile upsert, use `{product}` from the route and never accept `product_id` from the request body.
- For authorizations, derive `supplier_id` from `auth()->user()->supplier->id`; never accept it from the request body.
- Return `404` for records outside the supplier's ownership where the project convention prefers hiding existence, or `403` when policy authorization is explicit.

## 8. Feature Flag Behavior

| Feature flag | Supplier API behavior |
|---|---|
| `sl_beauty.taxonomy` | Required for product beauty profile and variant management. Disabled flag should deny access, preferably `403` for authenticated supplier writes. |
| `sl_beauty.brand_seller_verification` | Required for seller brand authorization list/create/update/submit/delete. Disabled flag should deny access. |
| `sl_beauty.compliance_workflows` | Required only for `submit-compliance`; basic beauty profile edit remains under taxonomy. |
| `sl_beauty.b2c_retail` | Must not enable cart/checkout/payment/order behavior. It may influence future public retail display only, not supplier order behavior. |

Implementation note:

- Reuse the same conservative feature flag lookup approach used in Task 14 policies and Task 16 public controller until a shared helper is introduced.
- Missing optional feature flag infrastructure should fail according to current defaults: taxonomy can remain enabled, verification/compliance should fail closed.

## 9. Status Transition Rules

### Beauty Profile Compliance

| From | To | Actor | Endpoint |
|---|---|---|---|
| `not_required` | `pending_review` | Supplier owner | `POST /beauty-profile/submit-compliance` |
| `changes_requested` | `pending_review` | Supplier owner | `POST /beauty-profile/submit-compliance` |
| `rejected` | `pending_review` | Supplier owner | `POST /beauty-profile/submit-compliance` |
| `pending_review` | no supplier edit | Supplier owner | Updates should be blocked by policy until admin review. |
| `approved` | no supplier edit | Supplier owner | Updates should be blocked by policy unless a future resubmission workflow is defined. |

### Product Variant Status

| From | To | Actor | Notes |
|---|---|---|---|
| `draft` | `active` | Supplier owner | Allowed through variant status endpoint. |
| `active` | `inactive` | Supplier owner | Allowed; hides variant from public Task 16 endpoints. |
| `inactive` | `active` | Supplier owner | Allowed if required fields remain valid. |
| Any | soft deleted | Supplier owner | Only if no blocking references are introduced later. |

### Seller Brand Authorization

| From | To | Actor | Endpoint |
|---|---|---|---|
| none | `draft` | Supplier owner | `POST /brand-authorizations` |
| `draft` | `submitted` | Supplier owner | `POST /brand-authorizations/{authorization}/submit` |
| `rejected` | `submitted` | Supplier owner | `POST /brand-authorizations/{authorization}/submit` |
| `draft` | deleted/withdrawn | Supplier owner | `DELETE /brand-authorizations/{authorization}` |
| `submitted` | no supplier edit | Supplier owner | Await admin review. |
| `approved` / `suspended` / `expired` | no supplier edit | Supplier owner | Renewal flow is future work. |

Admin transitions such as approve, reject, suspend, and expire must not be implemented in supplier controllers.

## 10. Validation Behavior

| Area | Validation rules |
|---|---|
| Beauty profile | Use string length limits, `spf_value` integer `0..100`, nullable long text for ingredients/how-to-use/warnings, booleans for expiry/batch tracking, and prohibit body `product_id`. |
| Beauty profile compliance | Supplier cannot set approved/rejected status directly; submit endpoint performs controlled status transition only. |
| Product variant | Require `name` on create, validate unique nullable `sku`, numeric prices/volumes/weights, integer stock thresholds, boolean flags, valid `status`, and prohibit body `product_id`, `uuid`, `currency_id`. |
| Variant status | Accept only `status` in `draft`, `active`, `inactive` and/or `is_active` boolean. Reject unrelated fields. |
| Brand authorization | Require active `brand_id` on create, validate allowed `authorization_type`, territory, document path, starts/expires dates, and prohibit `supplier_id`, `status`, `reviewed_by`, `reviewed_at`, and `review_notes`. |
| Authorization submit | No arbitrary status input; controller sets `status = submitted` after policy check. |

Validation must not create checkout, cart, payment, order, shipment, refund, or admin review side effects.

## 11. Response Shape Summary

### Beauty Profile

Return:

- `success`
- `beauty_profile` using `ProductBeautyProfileResource`

Supplier-safe fields may include `id`, `product_id`, all beauty attributes, `expiry_required`, `batch_tracking_required`, `compliance_status`, `created_at`, and `updated_at`.

### Product Variants

List response:

- `success`
- `data`
- pagination metadata if paginated

Single response:

- `success`
- `variant` using `ProductVariantResource`

Supplier-safe fields may include SKU, barcode, B2B pricing fields, exact stock, thresholds, active/default/status fields, metadata, and timestamps.

### Brand Authorizations

List response:

- `success`
- `data`
- pagination metadata

Single response:

- `success`
- `authorization` using `SellerBrandAuthorizationResource`

Supplier-safe fields include owned document path, status, review feedback, brand summary, starts/expires dates, and timestamps. Admin-only reviewer identity should remain limited according to the resource behavior.

## 12. Error Handling Rules

| Scenario | Response |
|---|---|
| Unauthenticated | `401 Unauthorized` through `auth:sanctum`. |
| Authenticated non-supplier | `403 Forbidden`. |
| Feature flag disabled | `403 Forbidden` for authenticated supplier write/manage routes. |
| Product not owned by supplier | Prefer `404 Not Found` if queried through owned-scope lookup; otherwise `403` from policy. |
| Variant not under route product | `404 Not Found`. |
| Authorization not owned by supplier | Prefer `404 Not Found` if queried through owned-scope lookup; otherwise `403` from policy. |
| Validation error | Laravel validation `422` with field errors. |
| Missing beauty profile on `GET` | `404 Not Found`. |
| Duplicate beauty profile on create | Use upsert-style `PUT`, or return `409 Conflict` if a separate `POST` create is later added. |
| Invalid status transition | `422` or `403` depending on whether the failure is validation or policy-based. |

## 13. Testing Plan

### Supplier Beauty Profile Tests

- Supplier can view own product beauty profile.
- Supplier receives `404`/`403` for another supplier's product profile.
- Supplier can create/update profile for own product.
- Request rejects body `product_id`.
- Supplier cannot set `compliance_status` through normal edit.
- Submit-compliance changes allowed statuses to `pending_review` only when compliance workflow flag is enabled.
- Submit-compliance is denied when flag is disabled or profile is already `pending_review`/`approved`.

### Supplier Product Variant Tests

- Supplier can list variants for own product.
- Supplier cannot list or mutate another supplier's product variants.
- Supplier can create a variant for own product.
- Request rejects body `product_id`, `uuid`, and `currency_id`.
- Supplier can update only own variant under the route product.
- Supplier can change status/active flag through status endpoint.
- Supplier can delete/deactivate own variant.
- Public Task 16 variant endpoint still returns active public-safe fields only.

### Supplier Brand Authorization Tests

- Supplier can list only own authorization records.
- Supplier can create draft authorization for active brand.
- Request rejects `supplier_id`, `status`, reviewer fields, and review notes.
- Supplier can update own `draft` or `rejected` authorization.
- Supplier cannot update `submitted`, `approved`, `suspended`, or `expired` authorization.
- Supplier can submit own `draft` or `rejected` authorization.
- Supplier can delete only own `draft` authorization.
- Feature flag disabled denies brand authorization routes.

### Regression Tests

- Existing `/api/supplier/products` tests still pass.
- Existing RFQ, quotation, order, messaging, notification, dashboard, admin, analytics, public product, and public SL Beauty tests still pass.
- `php artisan route:list --path=supplier/sl-beauty` shows only intended supplier SL Beauty routes.
- `php artisan route:list --path=sl-beauty` still shows Task 16 public read-only routes unchanged.

## 14. B2B Regression Risks

| Risk | Mitigation |
|---|---|
| Accidentally altering `/api/supplier/products` behavior | Add new route group only; do not edit `SupplierProductController`. |
| Supplier ownership bypass | Scope queries by authenticated supplier and call policies for every mutation. |
| Product variant changes affect existing catalogue assumptions | Keep variant APIs under SL Beauty namespace and use `ProductVariantResource`; do not alter existing product resource. |
| Brand authorization mistaken for admin review | Supplier routes can submit only; admin approve/reject/suspend/expire routes stay future work. |
| Compliance workflow implies review history not yet in schema | Submit only updates `compliance_status`; rich review notes/history require future additive migration. |
| Feature flag inconsistency | Reuse existing policy behavior and add tests for disabled flags. |
| Checkout/cart/order bleed-through | Do not add retail ordering endpoints or mutate existing order/cart modules. |

## 15. What Must Not Be Implemented Yet

- No admin review APIs.
- No brand create/update/delete/verify APIs for suppliers.
- No product-to-brand ownership mapping APIs.
- No B2C cart, checkout, payment, retail order, shipment, return, or refund APIs.
- No changes to existing RFQ, quotations, supplier dashboard, buyer dashboard, messaging, notifications, orders, existing product catalogue, admin, or analytics behavior.
- No frontend UI or API client changes.
- No migrations or seeders.
- No automatic product publication changes based on beauty profile compliance status.
- No notification events/templates for submitted authorizations or compliance submissions until a dedicated notification task.
- No supplier-to-seller renaming in code.

## 16. Recommended Implementation Order

1. Add supplier route group only under `/api/supplier/sl-beauty` with `auth:sanctum`.
2. Add `SupplierBeautyProfileController` with show and upsert first.
3. Add focused tests for beauty profile ownership, validation, and disabled taxonomy flag.
4. Add `SupplierProductVariantController` list/create/show/update/status/delete.
5. Add focused tests for variant ownership, unsafe field rejection, status changes, and public endpoint regression.
6. Add `SupplierBrandAuthorizationController` list/create/show/update/submit/delete only after confirming `sl_beauty.brand_seller_verification` behavior.
7. Add focused tests for authorization ownership, status transitions, and disabled verification flag.
8. Run full backend tests and frontend lint.
9. Create an implementation report before moving to admin review APIs.

## Recommendation

Proceed next with the supplier beauty profile endpoints first, because they are the smallest supplier-owned write surface and reuse the existing product ownership model. Keep variant management and brand authorization as separate follow-up steps if the first supplier endpoint implementation reveals ownership or feature flag issues.
