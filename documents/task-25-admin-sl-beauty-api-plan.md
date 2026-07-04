# Task 25: Admin SL Beauty API Implementation Plan

## Summary

This document plans admin-side SL Beauty APIs before adding admin review controllers, routes, or behavior.

The admin APIs must be additive, live under `/api/admin/sl-beauty`, preserve all existing Made in SL B2B behavior, and keep supplier/public SL Beauty APIs unchanged. No code, routes, migrations, seeders, frontend files, checkout/cart/payment/order APIs, RFQ, quotation, messaging, notification, dashboard, existing catalogue, non-SL-Beauty admin, analytics, or `.env` changes are part of this task.

## Files Reviewed

| File | Purpose reviewed |
|---|---|
| `documents/task-18-supplier-sl-beauty-api-plan.md` | Supplier API scope, ownership rules, and deferred admin review boundaries. |
| `documents/task-23-supplier-brand-authorization-api-report.md` | Current supplier brand authorization implementation and status behavior. |
| `documents/task-24-supplier-brand-authorization-api-verification-report.md` | Verification that supplier APIs are safe and admin review is not implemented yet. |
| `documents/task-12-sl-beauty-api-contract-plan.md` | Original public/supplier/admin API contract direction. |
| `documents/task-13-api-resource-request-policy-plan.md` | Resource, request, policy plan for admin-safe fields and review flows. |
| `documents/task-14-resource-request-policy-implementation-report.md` | Implemented resources, requests, policies, and policy registration. |
| `documents/task-15-resource-request-policy-verification-report.md` | Verification of passive resource/request/policy foundation. |
| `backend/app/Http/Requests/StoreBrandRequest.php` | Existing admin brand create validation. |
| `backend/app/Http/Requests/UpdateBrandRequest.php` | Existing admin brand update/status validation. |
| `backend/app/Http/Requests/ReviewSellerBrandAuthorizationRequest.php` | Existing admin seller authorization review validation. |

## 1. Admin API Design Principles

| Principle | Rule |
|---|---|
| Additive routes only | Add routes only under `/api/admin/sl-beauty`; do not alter existing `/api/admin/*`, `/api/products`, `/api/supplier/*`, RFQ, quotation, order, messaging, notification, or analytics routes. |
| Admin-only review | Use the existing `admin` role until a separate staff-reviewer permission model is designed. |
| Policy-first authorization | Controllers must call existing SL Beauty policies, not rely only on route prefixes or request classes. |
| Feature gated | Brand management and seller authorization review require `sl_beauty.brand_seller_verification`; product beauty compliance review requires `sl_beauty.compliance_workflows`. |
| Status transitions are explicit | Admin endpoints should expose named review actions instead of accepting arbitrary status changes. |
| No supplier behavior changes | Supplier submitted records become reviewable, but supplier APIs and status rules stay unchanged. |
| No public leakage | Admin review fields, document paths, reviewer IDs, and notes must remain admin/supplier-owner safe through existing resources. |
| No retail commerce | Do not add B2C cart, checkout, payment, retail order, shipment, return, refund, or retail fulfillment behavior. |

## 2. Admin Route Plan

### Brand Management And Verification

| Method | Route | Purpose | Auth | Feature flag |
|---|---|---|---|---|
| `GET` | `/api/admin/sl-beauty/brands` | List brands for admin management. | `auth:sanctum`, admin | `sl_beauty.brand_seller_verification` |
| `POST` | `/api/admin/sl-beauty/brands` | Create platform-managed brand. | `auth:sanctum`, admin | `sl_beauty.brand_seller_verification` |
| `GET` | `/api/admin/sl-beauty/brands/{brand}` | Show admin brand detail. | `auth:sanctum`, admin | `sl_beauty.brand_seller_verification` |
| `PUT` | `/api/admin/sl-beauty/brands/{brand}` | Update brand metadata. | `auth:sanctum`, admin | `sl_beauty.brand_seller_verification` |
| `PATCH` | `/api/admin/sl-beauty/brands/{brand}/status` | Change brand status and/or verification. | `auth:sanctum`, admin | `sl_beauty.brand_seller_verification` |
| `DELETE` | `/api/admin/sl-beauty/brands/{brand}` | Soft-delete brand if safe. | `auth:sanctum`, admin | `sl_beauty.brand_seller_verification` |

### Seller Brand Authorization Review

| Method | Route | Purpose | Auth | Feature flag |
|---|---|---|---|---|
| `GET` | `/api/admin/sl-beauty/brand-authorizations` | List authorization review queue. | `auth:sanctum`, admin | `sl_beauty.brand_seller_verification` |
| `GET` | `/api/admin/sl-beauty/brand-authorizations/{authorization}` | Show authorization detail. | `auth:sanctum`, admin | `sl_beauty.brand_seller_verification` |
| `PATCH` | `/api/admin/sl-beauty/brand-authorizations/{authorization}/approve` | Approve submitted authorization. | `auth:sanctum`, admin | `sl_beauty.brand_seller_verification` |
| `PATCH` | `/api/admin/sl-beauty/brand-authorizations/{authorization}/reject` | Reject submitted authorization. | `auth:sanctum`, admin | `sl_beauty.brand_seller_verification` |
| `PATCH` | `/api/admin/sl-beauty/brand-authorizations/{authorization}/suspend` | Suspend approved authorization. | `auth:sanctum`, admin | `sl_beauty.brand_seller_verification` |
| `PATCH` | `/api/admin/sl-beauty/brand-authorizations/{authorization}/expire` | Mark approved authorization expired. | `auth:sanctum`, admin | `sl_beauty.brand_seller_verification` |

### Product Beauty Profile Compliance Review

Use the requested group `/api/admin/sl-beauty/beauty-profiles`.

| Method | Route | Purpose | Auth | Feature flag |
|---|---|---|---|---|
| `GET` | `/api/admin/sl-beauty/beauty-profiles` | List beauty profile compliance queue. | `auth:sanctum`, admin | `sl_beauty.compliance_workflows` |
| `GET` | `/api/admin/sl-beauty/beauty-profiles/{profile}` | Show beauty profile review detail. | `auth:sanctum`, admin | `sl_beauty.compliance_workflows` |
| `PATCH` | `/api/admin/sl-beauty/beauty-profiles/{profile}/approve` | Approve submitted beauty metadata. | `auth:sanctum`, admin | `sl_beauty.compliance_workflows` |
| `PATCH` | `/api/admin/sl-beauty/beauty-profiles/{profile}/request-changes` | Ask supplier for corrections. | `auth:sanctum`, admin | `sl_beauty.compliance_workflows` |
| `PATCH` | `/api/admin/sl-beauty/beauty-profiles/{profile}/reject` | Reject unsafe/non-compliant metadata. | `auth:sanctum`, admin | `sl_beauty.compliance_workflows` |

## 3. Controller Plan

| Controller | Responsibility |
|---|---|
| `backend/app/Http/Controllers/SLBeauty/AdminBrandController.php` | Admin brand list/create/show/update/status/delete. |
| `backend/app/Http/Controllers/SLBeauty/AdminBrandAuthorizationController.php` | Admin authorization review queue and approve/reject/suspend/expire transitions. |
| `backend/app/Http/Controllers/SLBeauty/AdminBeautyProfileReviewController.php` | Admin beauty profile compliance queue and approve/request-changes/reject transitions. |

Implementation notes for future coding:

- Keep controllers in the existing `App\Http\Controllers\SLBeauty` namespace for consistency with public and supplier SL Beauty controllers.
- Add routes only inside the existing authenticated route area or a clearly scoped `Route::prefix('admin/sl-beauty')->middleware('auth:sanctum')` group.
- Use `successResponse()` from the base controller.
- Keep filtering/pagination local to admin controllers; do not alter existing admin controllers.
- Do not trigger notifications in the first admin API implementation unless a later task explicitly adds notification behavior and tests.

## 4. Request Classes To Use

| Admin area | Request class |
|---|---|
| Brand create | `StoreBrandRequest` |
| Brand update | `UpdateBrandRequest` |
| Brand status/verification | `UpdateBrandRequest` or a future `UpdateBrandStatusRequest` if narrower validation is desired. |
| Seller authorization approve/reject/suspend/expire | `ReviewSellerBrandAuthorizationRequest` |
| Beauty profile compliance review | Future `ReviewProductBeautyProfileRequest` recommended. If not added yet, use controller-level validation limited to `action` and optional/required review note fields. |

Important validation gap:

- `product_beauty_profiles` currently has `compliance_status` but no `reviewed_by`, `reviewed_at`, or `review_notes` fields. The first compliance review API should update status only, or a separate migration/planning task should add review history before notes are persisted.

## 5. Resource Classes To Use

| Admin area | Resource |
|---|---|
| Brands | `BrandResource` |
| Seller brand authorizations | `SellerBrandAuthorizationResource` |
| Beauty profiles | `ProductBeautyProfileResource` |

Resource behavior requirements:

- Admin responses may include IDs, statuses, timestamps, reviewer fields, document paths, and supplier/product context where resources already support it.
- Public resources must not be changed as part of admin implementation.
- If admin review needs richer nested supplier/product context, load relations in admin controllers and extend resources only in a separate, tested, backward-compatible task if current fields are insufficient.

## 6. Policy Methods To Call

| Admin action | Policy method |
|---|---|
| Brand list/show | `BrandPolicy::viewAny` / `BrandPolicy::view` |
| Brand create | `BrandPolicy::create` |
| Brand update | `BrandPolicy::update` |
| Brand status/verification | `BrandPolicy::changeStatus` or `BrandPolicy::verify` depending on final method names. |
| Brand delete | `BrandPolicy::delete` |
| Authorization list/show | `SellerBrandAuthorizationPolicy::viewAny` / `view` |
| Authorization approve | `SellerBrandAuthorizationPolicy::approve` |
| Authorization reject | `SellerBrandAuthorizationPolicy::reject` |
| Authorization suspend | `SellerBrandAuthorizationPolicy::suspend` |
| Authorization expire | `SellerBrandAuthorizationPolicy::expire` |
| Beauty profile list/show | `ProductBeautyProfilePolicy::viewAny` if added, otherwise admin-scoped `view` per record. |
| Beauty profile review | `ProductBeautyProfilePolicy::review` |

Potential policy gap:

- If `ProductBeautyProfilePolicy` does not currently expose `viewAny`, add it in the implementation task only if needed and test it. Do not skip policy checks.

## 7. Admin Authorization Rules

| Rule | Requirement |
|---|---|
| Role | Use authenticated users with `role === 'admin'` for the first implementation. |
| Brand management | Admin only and `sl_beauty.brand_seller_verification` enabled. |
| Seller authorization review | Admin only, verification flag enabled, and current status must allow the transition. |
| Beauty compliance review | Admin only and `sl_beauty.compliance_workflows` enabled. |
| Supplier/public users | Must receive `403` for admin review routes. |
| Route model binding | Must not reveal or mutate records outside admin policy authorization. |
| Existing admin module | Do not reuse or alter `AdminController`; add SL Beauty controllers separately. |

## 8. Feature Flag Behavior

| Feature flag | Admin behavior |
|---|---|
| `sl_beauty.brand_seller_verification` | Required for `/api/admin/sl-beauty/brands` and `/api/admin/sl-beauty/brand-authorizations`. Disabled flag returns `403` for authenticated admin attempts. |
| `sl_beauty.compliance_workflows` | Required for `/api/admin/sl-beauty/beauty-profiles`. Disabled flag returns `403` for authenticated admin attempts. |
| `sl_beauty.taxonomy` | Not sufficient by itself for admin review. Taxonomy may remain enabled for read-only beauty metadata, but compliance review must still require compliance workflows. |
| `sl_beauty.b2c_retail` | Must not enable retail cart/checkout/payment/order behavior. Admin review APIs should not depend on retail commerce. |

Fail-closed rule:

- Verification and compliance admin workflows should fail closed when the feature flag table is missing, the row is missing, or the flag is disabled, matching the existing policy foundation.

## 9. Review Workflow Plan

### Brand Management

- Admin creates a brand in `draft` or `active` status.
- Admin can update metadata such as name, slug, description, logo path, website URL, and country.
- Admin can verify a brand by setting `is_verified = true`.
- Public brand browsing should continue to show only active and verified brands.
- Brand deletion should use soft delete through `Brand` and should be blocked or deferred if approved authorizations depend on the brand.

### Seller Brand Authorization Review

- Supplier creates `draft`.
- Supplier submits `draft` or `rejected` to `submitted`.
- Admin reviews only `submitted` records.
- Approval sets `status = approved`, `reviewed_by = auth admin id`, `reviewed_at = now()`, optional `review_notes`, and optional/updated `expires_at`.
- Rejection sets `status = rejected`, reviewer fields, and required `review_notes`.
- Suspension applies only to `approved` and sets `status = suspended` with required `review_notes`.
- Expire applies only to `approved` and sets `status = expired` with reviewer metadata.

### Product Beauty Profile Compliance Review

- Supplier submits profile from allowed supplier states to `pending_review`.
- Admin approval sets `compliance_status = approved`.
- Admin request changes sets `compliance_status = changes_requested`.
- Admin rejection sets `compliance_status = rejected`.
- Because current schema lacks review note fields, initial compliance implementation should not promise persisted notes unless a prior additive migration introduces review history.

## 10. Status Transition Plan

### Brand

| From | To | Actor | Endpoint |
|---|---|---|---|
| `draft` | `active` | Admin | `PATCH /brands/{brand}/status` |
| `active` | `inactive` | Admin | `PATCH /brands/{brand}/status` |
| `inactive` | `active` | Admin | `PATCH /brands/{brand}/status` |
| Any | `suspended` | Admin | `PATCH /brands/{brand}/status` |
| Any | soft deleted | Admin | `DELETE /brands/{brand}` |

### Seller Brand Authorization

| From | To | Actor | Endpoint |
|---|---|---|---|
| `submitted` | `approved` | Admin | `PATCH /brand-authorizations/{authorization}/approve` |
| `submitted` | `rejected` | Admin | `PATCH /brand-authorizations/{authorization}/reject` |
| `approved` | `suspended` | Admin | `PATCH /brand-authorizations/{authorization}/suspend` |
| `approved` | `expired` | Admin | `PATCH /brand-authorizations/{authorization}/expire` |

### Beauty Profile Compliance

| From | To | Actor | Endpoint |
|---|---|---|---|
| `pending_review` | `approved` | Admin | `PATCH /beauty-profiles/{profile}/approve` |
| `pending_review` | `changes_requested` | Admin | `PATCH /beauty-profiles/{profile}/request-changes` |
| `pending_review` | `rejected` | Admin | `PATCH /beauty-profiles/{profile}/reject` |

## 11. Validation Behavior

| Area | Rules |
|---|---|
| Brand create/update | Use `StoreBrandRequest` and `UpdateBrandRequest`; prohibit `uuid` and `created_by`; validate status, verification, URLs, country, and unique slug/name. |
| Brand status | Accept only `status` and/or `is_verified` for narrow endpoint if a dedicated request is created; prohibit metadata churn through status endpoint. |
| Authorization review | Use `ReviewSellerBrandAuthorizationRequest`; action must be approve/reject/suspend/expire; notes required for reject/suspend; prohibit `status`, `reviewed_by`, `reviewed_at`, `supplier_id`, and `brand_id`. |
| Beauty profile review | Validate action-specific payload; require notes for reject/request-changes only if notes can be persisted; otherwise do not accept notes until schema supports them. |
| Query filters | Allow safe filters: `status`, `is_verified`, `brand_id`, `supplier_id`, `compliance_status`, `search`, `page`, `per_page`, and date filters where useful. |

## 12. Response Shape Summary

### Brand List

- `success`
- `data` using `BrandResource`
- pagination metadata

### Brand Detail

- `success`
- `brand` using `BrandResource`
- optional loaded authorization counts or authorizations only if existing resource behavior supports admin context safely

### Brand Authorization Queue

- `success`
- `data` using `SellerBrandAuthorizationResource`
- pagination metadata
- admin-loaded `brand`, `supplier`, and `reviewer` summaries where available

### Brand Authorization Review Action

- `success`
- `authorization` using `SellerBrandAuthorizationResource`
- message such as `Brand authorization approved successfully.`

### Beauty Profile Queue

- `success`
- `data` using `ProductBeautyProfileResource`
- pagination metadata
- product/supplier context if safely loaded and supported

### Beauty Profile Review Action

- `success`
- `beauty_profile` using `ProductBeautyProfileResource`
- message such as `Beauty profile approved successfully.`

## 13. Error Handling Rules

| Scenario | Response |
|---|---|
| Unauthenticated | `401 Unauthorized` through `auth:sanctum`. |
| Authenticated non-admin | `403 Forbidden`. |
| Feature flag disabled | `403 Forbidden` for admin review/management actions. |
| Record not found | `404 Not Found`. |
| Invalid status transition | Prefer `403` when policy denies the transition; use `422` for validation-only payload errors. |
| Validation error | Laravel `422` validation response. |
| Brand with blocking dependencies | `409 Conflict` or `422` with a clear message; do not hard-delete dependent records. |

## 14. Testing Plan

### Brand Management Tests

- Admin can list brands with filters.
- Admin can create brand.
- Admin can update brand metadata.
- Admin can change status and verification.
- Non-admin cannot access admin brand routes.
- Disabled `sl_beauty.brand_seller_verification` returns `403`.
- Public brand endpoint still exposes only active verified brands.

### Seller Brand Authorization Review Tests

- Admin can list submitted authorizations.
- Admin can view authorization with brand/supplier context.
- Admin can approve submitted authorization.
- Admin can reject submitted authorization with required notes.
- Admin can suspend approved authorization with required notes.
- Admin can expire approved authorization.
- Admin cannot approve draft, rejected, suspended, or expired authorization.
- Supplier cannot access admin review routes.
- Disabled verification flag returns `403`.
- Existing supplier authorization tests still pass.

### Beauty Profile Compliance Tests

- Admin can list pending beauty profiles.
- Admin can view beauty profile review detail.
- Admin can approve pending profile.
- Admin can request changes for pending profile.
- Admin can reject pending profile.
- Admin cannot review non-pending profile unless a future transition explicitly allows it.
- Supplier cannot access admin compliance routes.
- Disabled compliance workflows flag returns `403`.
- Existing supplier beauty profile tests still pass.

### Regression Tests

- `php artisan route:list --path=admin/sl-beauty`
- Focused admin API test classes.
- Existing supplier SL Beauty tests.
- Existing public SL Beauty tests.
- Full `php artisan test` where possible.
- `npm run lint` to confirm frontend remains untouched.

## 15. B2B Regression Risks

| Risk | Control |
|---|---|
| Existing admin routes accidentally changed | Use a new `/api/admin/sl-beauty` group and avoid editing `AdminController`. |
| Supplier APIs accidentally changed | Do not modify supplier controllers/routes; only read submitted records from admin controllers. |
| RFQ/quotation/order behavior affected | Do not touch RFQ, quotation, inquiry cart, order, notification, messaging, dashboard, or analytics code. |
| Public product catalogue shape changes | Do not inject admin review fields into existing product responses. |
| Feature flags enabling unfinished workflows | Require explicit verification/compliance flags for admin actions; fail closed. |
| Compliance notes promised without schema | Do not accept or persist review notes for beauty profile compliance until schema exists. |

## 16. What Must Not Be Implemented Yet

- No admin API code in this planning task.
- No routes, controllers, migrations, seeders, or frontend changes in this planning task.
- No admin notifications or supplier notifications yet.
- No review audit history table unless a separate migration task is planned.
- No product-to-brand mapping or brand products endpoint.
- No B2C checkout, cart, payment, retail order, shipping, return, or refund behavior.
- No changes to RFQ, quotations, supplier dashboard, buyer dashboard, messaging, notifications, orders, existing product catalogue, supplier APIs, public SL Beauty APIs, non-SL-Beauty admin APIs, or analytics.
- No `.env` modifications or commits.

## 17. Recommended Implementation Order

1. Add admin brand management APIs and focused tests.
2. Verify admin brand APIs before adding review actions.
3. Add admin seller brand authorization review APIs and focused tests.
4. Verify authorization review workflow and supplier API regressions.
5. Plan beauty compliance review persistence gap if review notes/history are required.
6. Add admin beauty profile compliance review APIs with focused tests.
7. Run full regression and create a branch verification report before PR.

## Recommended Next Task

Task 26 should add only admin SL Beauty brand management APIs under `/api/admin/sl-beauty/brands`, using `StoreBrandRequest`, `UpdateBrandRequest`, `BrandResource`, and `BrandPolicy`. It should not add seller authorization review or beauty profile compliance review yet.
