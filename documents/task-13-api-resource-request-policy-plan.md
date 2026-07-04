# Task 13: SL Beauty API Resource, Request, and Policy Plan

## Summary

This document plans the next safe implementation layer for SL Beauty APIs: API resources, form requests, and policies.

No backend code, frontend code, routes, controllers, migrations, seeders, API endpoints, cart, checkout, payment, order behavior, RFQ, quotations, dashboards, messaging, notifications, product catalogue behavior, admin behavior, or analytics behavior should be changed in this planning task.

## Planned Files

### API Resources

| Future file | Model | Purpose |
|---|---|---|
| `backend/app/Http/Resources/BrandResource.php` | `Brand` | Serialize public, supplier, and admin brand fields safely. |
| `backend/app/Http/Resources/ProductBeautyProfileResource.php` | `ProductBeautyProfile` | Serialize beauty metadata for public display, supplier editing, and admin review. |
| `backend/app/Http/Resources/ProductVariantResource.php` | `ProductVariant` | Serialize product variant fields without changing existing product catalogue responses. |
| `backend/app/Http/Resources/SellerBrandAuthorizationResource.php` | `SellerBrandAuthorization` | Serialize supplier authorization status and admin review data safely. |

### Form Requests

| Future file | Primary route group | Purpose |
|---|---|---|
| `backend/app/Http/Requests/StoreBrandRequest.php` | Admin | Validate brand creation. |
| `backend/app/Http/Requests/UpdateBrandRequest.php` | Admin | Validate brand updates and status fields. |
| `backend/app/Http/Requests/StoreProductBeautyProfileRequest.php` | Supplier | Validate first beauty profile payload for a supplier-owned product. |
| `backend/app/Http/Requests/UpdateProductBeautyProfileRequest.php` | Supplier/Admin | Validate beauty profile updates. |
| `backend/app/Http/Requests/StoreProductVariantRequest.php` | Supplier | Validate variant creation for a supplier-owned product. |
| `backend/app/Http/Requests/UpdateProductVariantRequest.php` | Supplier | Validate variant updates for a supplier-owned product. |
| `backend/app/Http/Requests/StoreSellerBrandAuthorizationRequest.php` | Supplier | Validate authorization draft/submission creation. |
| `backend/app/Http/Requests/UpdateSellerBrandAuthorizationRequest.php` | Supplier | Validate editable authorization updates. |
| `backend/app/Http/Requests/ReviewSellerBrandAuthorizationRequest.php` | Admin | Validate approve/reject/suspend/expire actions. |

### Policies

| Future file | Model | Purpose |
|---|---|---|
| `backend/app/Policies/BrandPolicy.php` | `Brand` | Control public view/admin management behavior. |
| `backend/app/Policies/ProductBeautyProfilePolicy.php` | `ProductBeautyProfile` | Enforce supplier ownership and admin review access. |
| `backend/app/Policies/ProductVariantPolicy.php` | `ProductVariant` | Enforce supplier product ownership. |
| `backend/app/Policies/SellerBrandAuthorizationPolicy.php` | `SellerBrandAuthorization` | Enforce supplier ownership and admin review access. |

Policy registration should follow the existing Laravel convention in this project and should be part of the implementation task.

## 1. Resource Response Fields

### `BrandResource`

| Field | Public | Supplier | Admin | Notes |
|---|---:|---:|---:|---|
| `id` | Yes | Yes | Yes | Stable numeric ID. |
| `uuid` | No | No | Yes | Admin/debug only unless public UUID policy is approved. |
| `name` | Yes | Yes | Yes | Public brand display name. |
| `slug` | Yes | Yes | Yes | Public route identifier. |
| `description` | Yes | Yes | Yes | Public-safe description. |
| `logo_path` / `logo_url` | Yes as URL | Yes as URL | Yes | Prefer URL field for public responses. |
| `website_url` | Yes | Yes | Yes | Public-safe. |
| `country_id` | No | Yes | Yes | Public can receive country summary later if a `CountryResource` exists. |
| `status` | Only active | Yes | Yes | Public should not expose draft/suspended brands. |
| `is_verified` | Yes | Yes | Yes | Public badge field. |
| `created_by` | No | No | Yes | Admin-only. |
| `created_at`, `updated_at`, `deleted_at` | No | Optional timestamps | Yes | `deleted_at` admin-only. |
| `authorized_suppliers_count` | Yes | Yes | Yes | Only count approved/active authorizations for public. |

### `ProductBeautyProfileResource`

| Field | Public | Supplier | Admin | Notes |
|---|---:|---:|---:|---|
| `id` | No | Yes | Yes | Public can use `product_id`. |
| `product_id` | Yes | Yes | Yes | Required association. |
| `skin_type`, `hair_type` | Yes | Yes | Yes | Consumer filters/display. |
| `skin_concern`, `hair_concern` | Yes | Yes | Yes | Consumer filters/display. |
| `ingredients` | Yes | Yes | Yes | Public-safe after compliance rules. |
| `how_to_use` | Yes | Yes | Yes | Public-safe instructions. |
| `warnings` | Yes | Yes | Yes | Public safety field. |
| `spf_value` | Yes | Yes | Yes | Numeric SPF value. |
| `shade_family`, `fragrance_family`, `formulation` | Yes | Yes | Yes | Filter/display metadata. |
| `gender_target`, `age_group` | Yes | Yes | Yes | Optional suitability metadata. |
| `expiry_required`, `batch_tracking_required` | Yes | Yes | Yes | Public can use as safety indicators. |
| `compliance_status` | No unless approved | Yes | Yes | Public should not expose internal review states except a safe approved/verified indicator. |
| `created_at`, `updated_at` | No | Yes | Yes | Admin/supplier metadata. |
| `product` summary | Optional | Optional | Yes | Avoid changing existing product resource shape initially. |

### `ProductVariantResource`

| Field | Public | Supplier | Admin | Notes |
|---|---:|---:|---:|---|
| `id` | Yes | Yes | Yes | Variant identifier. |
| `uuid` | No | No | Yes | Admin/debug only. |
| `product_id` | Yes | Yes | Yes | Required association. |
| `sku` | No | Yes | Yes | Hide from public unless explicitly approved. |
| `barcode` | No | Yes | Yes | Supplier/admin operational field. |
| `name`, `variant_name` | Yes | Yes | Yes | Display fields. |
| `slug` | Yes | Yes | Yes | Public route/display if used later. |
| `description` | Yes | Yes | Yes | Public-safe. |
| `shade_name`, `shade_code`, `size_label` | Yes | Yes | Yes | Consumer selection fields. |
| `volume_ml`, `weight_g` | Yes | Yes | Yes | Size metadata. |
| `retail_price`, `sale_price` | Conditional | Yes | Yes | Public only when retail display is approved by feature flag. |
| `price`, `fob_price_min`, `fob_price_max`, `moq`, `moq_unit` | No | Yes | Yes | B2B/enterprise fields; do not reinterpret for B2C. |
| `stock_quantity` | Conditional | Yes | Yes | Public can show stock state, not exact quantity, unless approved. |
| `low_stock_threshold` | No | Yes | Yes | Internal supplier/admin field. |
| `is_active`, `status`, `is_default` | Active only | Yes | Yes | Public only receives active variants. |
| `metadata` | No | Yes | Yes | Do not leak arbitrary JSON publicly. |
| `created_at`, `updated_at`, `deleted_at` | No | Optional | Yes | `deleted_at` admin-only. |

### `SellerBrandAuthorizationResource`

| Field | Public | Supplier | Admin | Notes |
|---|---:|---:|---:|---|
| `id` | No | Yes | Yes | Public should use approved badge/count only. |
| `supplier` summary | No | Own supplier only | Yes | Admin review context. |
| `brand` summary | Approved brand only | Yes | Yes | Use `BrandResource` summary. |
| `authorization_type` | Optional approved label | Yes | Yes | Public only after approval. |
| `territory` | Optional approved label | Yes | Yes | Public only after approval. |
| `document_path` | No | Yes, owned record | Yes | Never public. |
| `starts_at`, `expires_at` | No | Yes | Yes | Public may use generic valid/verified badge later. |
| `status` | Approved only | Yes | Yes | Public should not expose draft/rejected details. |
| `reviewed_by`, `reviewed_at`, `review_notes` | No | `reviewed_at` and notes if own record | Yes | Supplier sees feedback on own record; public never sees notes. |
| `created_at`, `updated_at` | No | Yes | Yes | Operational metadata. |

## 2. Public-Safe, Supplier-Safe, And Admin-Only Fields

| Category | Allowed fields | Excluded fields |
|---|---|---|
| Public-safe | Active brand names/slugs/descriptions/logos, verified badge, public beauty metadata, active variant display fields, safe retail display only when feature-gated. | Document paths, reviewer IDs, internal notes, deleted timestamps, draft/rejected/suspended statuses, arbitrary metadata JSON. |
| Supplier-safe | Owned records, own documents, own review feedback, own variant operational fields, own beauty profile status. | Other suppliers' records, admin-only reviewer identity if not needed, unrelated brand/supplier records. |
| Admin-only | Full statuses, reviewer fields, review notes, document paths, deleted timestamps, supplier context, compliance review context. | None, subject to role/permission checks and audit requirements. |

## 3. Validation Rules Per Request

### Brand Requests

| Request | Fields | Rules |
|---|---|---|
| `StoreBrandRequest` | `name` | Required, string, max 255, unique in `brands.name`. |
|  | `slug` | Nullable, string, max 255, alpha dash, unique in `brands.slug`; may be generated if omitted. |
|  | `description` | Nullable, string, max practical length. |
|  | `logo_path` | Nullable, string, max 255; should reference existing upload path in a later upload-validation task. |
|  | `website_url` | Nullable, URL, max 255. |
|  | `country_id` | Nullable, exists `countries.id`. |
|  | `status` | Nullable, enum: `draft`, `active`, `inactive`, `suspended`. |
|  | `is_verified` | Nullable, boolean; admin-only. |
| `UpdateBrandRequest` | All above | Sometimes/nullable variants of create rules. Unique checks ignore current brand. |

### Product Beauty Profile Requests

| Request | Fields | Rules |
|---|---|---|
| `StoreProductBeautyProfileRequest` | `skin_type`, `hair_type`, `skin_concern`, `hair_concern` | Nullable, string, max 255. Controlled enums can be introduced after category option sets are finalized. |
|  | `ingredients`, `how_to_use`, `warnings` | Nullable, string; sanitize output, no unsafe HTML by default. |
|  | `spf_value` | Nullable, integer, min 0, max 100. |
|  | `shade_family`, `fragrance_family`, `formulation`, `gender_target`, `age_group` | Nullable, string, max 255. |
|  | `expiry_required`, `batch_tracking_required` | Nullable, boolean. |
|  | `compliance_status` | Prohibited for supplier create; admin/system controlled. |
| `UpdateProductBeautyProfileRequest` | All profile fields | Sometimes/nullable variants. Supplier cannot set approved compliance status. |

### Product Variant Requests

| Request | Fields | Rules |
|---|---|---|
| `StoreProductVariantRequest` | `variant_name`, `name`, `slug`, `description` | Nullable strings except existing enterprise `name` may be required if creating rows directly against current `product_variants` schema. |
|  | `sku` | Nullable, string, max 255, unique `product_variants.sku`. |
|  | `barcode` | Nullable, string, max 255. |
|  | `shade_name`, `shade_code`, `size_label` | Nullable, string, max 255. |
|  | `volume_ml`, `weight_g`, `retail_price`, `sale_price`, `price`, `fob_price_min`, `fob_price_max`, `moq` | Nullable, numeric, min 0. |
|  | `sale_price` | Must be less than or equal to `retail_price` when both are present. |
|  | `stock_quantity`, `low_stock_threshold`, `lead_time_days` | Nullable, integer, min 0. |
|  | `is_active`, `is_default` | Nullable, boolean. |
|  | `status` | Nullable, enum aligned with enterprise catalogue status values, initially `active`, `inactive`, `draft`. |
|  | `metadata` | Nullable, array; not public-safe. |
| `UpdateProductVariantRequest` | All variant fields | Sometimes/nullable variants. Unique `sku` ignores current variant. |

### Seller Brand Authorization Requests

| Request | Fields | Rules |
|---|---|---|
| `StoreSellerBrandAuthorizationRequest` | `brand_id` | Required, exists `brands.id`. |
|  | `authorization_type` | Nullable, enum: `brand_owner`, `authorized_distributor`, `importer`, `reseller`, `salon_professional`. |
|  | `territory` | Nullable, string, max 255. |
|  | `document_path` | Nullable, string, max 255; later validate against owned upload record. |
|  | `starts_at` | Nullable, date. |
|  | `expires_at` | Nullable, date, after `starts_at` when both present. |
|  | `status` | Prohibited or limited to `draft` on supplier create. |
| `UpdateSellerBrandAuthorizationRequest` | Editable fields | Sometimes/nullable. Allowed only while `draft` or `rejected` unless a renewal flow is later defined. |
| `ReviewSellerBrandAuthorizationRequest` | `action` | Required enum: `approve`, `reject`, `suspend`, `expire`. |
|  | `review_notes` | Required for `reject` and `suspend`; optional for `approve` and `expire`. |
|  | `expires_at` | Nullable date; allowed on approve. |

## 4. Authorization Rules Per Policy

### `BrandPolicy`

| Ability | Rule |
|---|---|
| `viewAny` | Public can list only active/verified brands; admin can list all. |
| `view` | Public can view active/verified brand; admin can view all; supplier can view brands needed for authorization selection. |
| `create` | Admin only for initial implementation. |
| `update` | Admin only. |
| `delete` | Admin only, soft delete only, blocked if approved active authorizations should prevent deletion. |
| `verify` / `changeStatus` | Admin or permitted staff reviewer only. |

### `ProductBeautyProfilePolicy`

| Ability | Rule |
|---|---|
| `view` | Public can view profile only for active public product and safe compliance state; supplier can view own product profile; admin can view all. |
| `create` | Supplier can create only for own product without existing profile; admin can create if needed. |
| `update` | Supplier can update own product profile unless locked under review; admin can update review fields/status. |
| `submitCompliance` | Supplier can submit own product profile when feature flag is enabled. |
| `review` | Admin/permitted staff only. |

### `ProductVariantPolicy`

| Ability | Rule |
|---|---|
| `view` | Public can view active variants for active public products; supplier can view own product variants; admin can view all. |
| `create` | Supplier can create variants only for own products. |
| `update` | Supplier can update variants only for own products. |
| `delete` | Supplier can soft-delete variants only for own products if no blocking future order references exist. |
| `changeStatus` | Supplier can change active/draft/inactive status for own variants; admin can moderate if needed later. |

### `SellerBrandAuthorizationPolicy`

| Ability | Rule |
|---|---|
| `viewAny` | Supplier sees own records; admin sees all. |
| `view` | Supplier can view own record; admin can view all; public cannot view raw authorization records. |
| `create` | Supplier can create for own supplier profile if feature flag is enabled. |
| `update` | Supplier can update own `draft` or `rejected` records only. |
| `submit` | Supplier can submit own `draft` or `rejected` records. |
| `delete` | Supplier can withdraw/delete own `draft` records only. |
| `review` | Admin/permitted staff only. |
| `approve`, `reject`, `suspend`, `expire` | Admin/permitted staff only with valid status transition. |

## 5. Feature Flag Behavior

| Flag | Resources | Requests | Policies |
|---|---|---|---|
| `sl_beauty.taxonomy` | Allows public beauty profile/variant resources to be returned. | Allows supplier beauty profile and variant validation to run. | Policies deny beauty profile/variant actions when disabled, except admin diagnostics if explicitly allowed. |
| `sl_beauty.b2c_retail` | Controls public exposure of `retail_price`, `sale_price`, and exact stock quantity. | Must not enable checkout/payment/order fields. | Policies must not grant retail order actions because those are out of scope. |
| `sl_beauty.brand_seller_verification` | Allows brand verification and authorization resources. | Allows brand authorization requests and admin review requests. | Policies deny supplier authorization submission and admin review workflows when disabled. |
| `sl_beauty.compliance_workflows` | Controls admin compliance review fields and safe compliance indicators. | Allows compliance submission/review validation. | Policies deny compliance review actions when disabled. |

Disabled flag behavior:

- Read-only public routes should return `404` for not-yet-enabled surfaces.
- Authenticated write/review attempts should return `403` with a clear feature-disabled message.
- Resources should not expose fields from a disabled workflow.

## 6. Ownership Rules

| Resource | Ownership rule |
|---|---|
| Brand | Admin-managed. Suppliers may reference active brands for authorization requests but do not own brand records unless a later brand-owner workflow is designed. |
| ProductBeautyProfile | Owned through `product_id`; supplier ownership is checked by `products.supplier_id`. |
| ProductVariant | Owned through `product_id`; supplier ownership is checked by `products.supplier_id`. |
| SellerBrandAuthorization | Owned through `supplier_id`; supplier ownership is checked by authenticated user's supplier profile. |
| Review fields | Owned by admin/reviewer role only; suppliers can view feedback for their own records but cannot set reviewer fields. |

Implementation note:

- Do not trust route parameters alone. Policies should resolve the product or authorization record and verify supplier ownership against the authenticated user.

## 7. Status Transition Rules

### Brand Status

| From | To | Actor | Notes |
|---|---|---|---|
| `draft` | `active` | Admin | Brand becomes public only if active. |
| `active` | `inactive` | Admin | Hides from public listings. |
| `active` | `suspended` | Admin | Hides from public and blocks new authorizations. |
| `inactive` | `active` | Admin | Requires review. |
| Any | soft deleted | Admin | Block if active authorizations should remain visible. |

### Seller Brand Authorization Status

| From | To | Actor | Notes |
|---|---|---|---|
| `draft` | `submitted` | Supplier | Supplier submits for review. |
| `rejected` | `submitted` | Supplier | Supplier resubmits after changes. |
| `submitted` | `approved` | Admin | Sets `reviewed_by`, `reviewed_at`, optional notes/expiry. |
| `submitted` | `rejected` | Admin | Requires review notes. |
| `approved` | `suspended` | Admin | Requires review notes. |
| `approved` | `expired` | Admin/system | Manual or scheduled later. |
| `draft` | deleted/withdrawn | Supplier | Supplier-owned draft only. |

### Product Beauty Profile Compliance Status

| From | To | Actor | Notes |
|---|---|---|---|
| `not_required` | `pending_review` | Supplier/system | Submit for review when compliance feature is enabled. |
| `pending_review` | `approved` | Admin | Initial Task 06 schema can store status only. |
| `pending_review` | `changes_requested` | Admin | Review notes need a future additive schema or external audit log. |
| `pending_review` | `rejected` | Admin | Should not automatically change product publication status yet. |
| `changes_requested` | `pending_review` | Supplier | Resubmission. |

### Product Variant Status

| From | To | Actor | Notes |
|---|---|---|---|
| `draft` | `active` | Supplier owner | Public only if product is active and `is_active` true. |
| `active` | `inactive` | Supplier owner | Hides variant from public. |
| `inactive` | `active` | Supplier owner | Requires valid fields. |
| Any | soft deleted | Supplier owner/admin | Do not hard delete. |

## 8. Resource Implementation Notes

| Resource | Notes |
|---|---|
| `BrandResource` | Use conditional fields based on request user role and route context. Avoid exposing `uuid`, `created_by`, or deleted timestamps publicly. |
| `ProductBeautyProfileResource` | Public response should be a curated subset. Admin response can include status and timestamps. Do not invent review notes until schema exists. |
| `ProductVariantResource` | Public response should hide supplier-only B2B pricing and metadata unless explicitly requested under B2B/admin context. |
| `SellerBrandAuthorizationResource` | Public should never expose raw records. Supplier sees own feedback. Admin sees supplier, brand, reviewer, document, and status fields. |

Suggested implementation pattern:

- Add helper methods such as `isAdminContext()` only if consistent with existing resource patterns.
- Prefer `when()` and `whenLoaded()` for conditional nested data.
- Do not eager load new relationships globally.

## 9. Form Request Implementation Notes

| Request | Authorization method | Validation method |
|---|---|---|
| Store/update brand | Call `BrandPolicy` via route or model class. | Use strict admin-only validation for status and verification fields. |
| Store/update beauty profile | Resolve route product and call policy. | Prohibit supplier-controlled approval status. |
| Store/update variant | Resolve route product/variant and call policy. | Validate ownership before accepting product association. |
| Store/update authorization | Resolve authenticated supplier and call policy. | Block edits outside draft/rejected states. |
| Review authorization | Admin-only policy check. | Validate action-specific notes and dates. |

Implementation note:

- Avoid embedding business side effects in form requests. Requests should validate and authorize only; controllers/services should perform state transitions later.

## 10. Files To Create In The Implementation Task

| Type | Files |
|---|---|
| Resources | `BrandResource.php`, `ProductBeautyProfileResource.php`, `ProductVariantResource.php`, `SellerBrandAuthorizationResource.php` |
| Requests | `StoreBrandRequest.php`, `UpdateBrandRequest.php`, `StoreProductBeautyProfileRequest.php`, `UpdateProductBeautyProfileRequest.php`, `StoreProductVariantRequest.php`, `UpdateProductVariantRequest.php`, `StoreSellerBrandAuthorizationRequest.php`, `UpdateSellerBrandAuthorizationRequest.php`, `ReviewSellerBrandAuthorizationRequest.php` |
| Policies | `BrandPolicy.php`, `ProductBeautyProfilePolicy.php`, `ProductVariantPolicy.php`, `SellerBrandAuthorizationPolicy.php` |
| Provider/config updates | Policy registration in the existing auth provider location only if the project requires explicit policy mapping. |
| Tests | Focused unit/feature tests for request validation, resource serialization, and policy authorization. |

Do not create controllers or routes in the resource/request/policy implementation task unless explicitly requested by a later task.

## 11. Testing Plan

| Test group | Coverage |
|---|---|
| Resource serialization | Public, supplier, and admin contexts hide/show expected fields. |
| Public data leakage | Assert public resources do not include `document_path`, `reviewed_by`, `review_notes`, `deleted_at`, raw `metadata`, or internal statuses. |
| Request validation | Valid and invalid payloads for each request class, including dates, booleans, prices, unique fields, and forbidden supplier-controlled status fields. |
| Policy ownership | Supplier can act on own product/profile/variant/authorization and cannot act on another supplier's records. |
| Admin authorization | Admin can review/manage; buyer cannot; unauthenticated user cannot write. |
| Feature flags | Disabled flags deny write/review behavior and hide resource fields controlled by disabled features. |
| Existing B2B regression | Existing RFQ, quotations, supplier dashboard, buyer dashboard, messaging, notifications, orders, catalogue, admin, and analytics tests still pass. |

Suggested commands after implementation:

```bash
php -l <changed PHP files>
php artisan test
npm run lint
```

## 12. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Resource fields leak admin-only data | Public users may see review/document data. | Use explicit public/supplier/admin field tables and tests. |
| Supplier writes records for another supplier | Data integrity/security issue. | Enforce ownership in policies and request authorization. |
| Product variants alter existing catalogue assumptions | Existing B2B product behavior could drift. | Keep variant resources separate from existing product resources until compatibility tests pass. |
| Review requests imply schema that does not exist | Compliance notes/history may be lost. | Do not implement rich compliance notes until an additive schema exists. |
| Feature flag checks are inconsistent | Unfinished features become visible. | Centralize flag checks in policies/controllers during implementation. |
| Pivot-style brand/supplier resources obscure authorization metadata | Incorrect writes could bypass review workflow. | Use `SellerBrandAuthorization` model for write/review flows; keep pivot resources read-only. |

## 13. What Must Not Be Implemented Yet

- No controllers.
- No routes.
- No API endpoints.
- No frontend UI or API client changes.
- No migrations.
- No seeders.
- No checkout, cart, payment, retail order, shipment, return, or refund behavior.
- No changes to existing `/api/products`, `/api/supplier/products`, `/api/cart`, `/api/orders`, `/api/rfqs`, `/api/quotations`, `/api/admin/products`, or analytics routes.
- No automatic product publication changes from compliance status.
- No product-to-brand relationship or API until schema support exists.
- No notification events or templates.
- No supplier-to-seller renaming in code.

## Recommendation

Proceed next with a code-only foundation task for resources, requests, and policies, still without controllers or routes.

The first implementation task should prioritize serialization safety, validation correctness, policy ownership checks, feature flag behavior, and regression tests before any endpoint is exposed.
