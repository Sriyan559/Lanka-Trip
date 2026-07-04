# Task 12: SL Beauty API Contract Plan

## Summary

This document proposes API contracts for SL Beauty brand browsing, product beauty metadata, product variants, seller brand authorization, and admin review workflows.

No API code should be implemented in this task. Existing Made in SL B2B routes and behavior must remain unchanged.

## 1. API Design Principles

| Principle | Contract rule |
|---|---|
| Additive only | Add new routes under new SL Beauty-specific route groups. Do not rename, repurpose, or remove existing Made in SL routes. |
| Preserve B2B workflows | RFQ, quotations, inquiry cart, supplier dashboard, buyer dashboard, messaging, notifications, orders, catalogue, admin, and analytics routes must keep their current behavior. |
| Consumer-safe public data | Public endpoints expose only approved, active, non-sensitive brand/product metadata. Internal notes, document paths, reviewer IDs, and compliance notes stay private. |
| Supplier ownership | Supplier endpoints operate only on products and authorization records owned by the authenticated supplier profile. |
| Admin review separation | Admin review endpoints are separate from public and supplier endpoints, with explicit status transitions and audit-friendly payloads. |
| Feature flags first | New behavior should be gated behind existing SL Beauty feature flags and disabled where workflows are unfinished. |
| Backward-compatible responses | Existing product and supplier responses should only receive optional additive fields after compatibility tests pass. |
| No retail commerce yet | Do not add B2C cart, checkout, payment, retail order, shipment, return, or refund APIs in this contract phase. |

## 2. Route Group Proposal

| Group | Prefix | Auth | Feature flag | Purpose |
|---|---|---|---|---|
| Public brands | `/api/sl-beauty/brands` | Public | `sl_beauty.taxonomy` | Consumer-safe brand browsing. |
| Public beauty catalogue | `/api/sl-beauty/products` | Public | `sl_beauty.taxonomy` | Consumer-safe beauty profile and variant display. |
| Supplier beauty catalogue | `/api/supplier/sl-beauty/products` | Sanctum supplier | `sl_beauty.taxonomy` | Supplier-owned beauty profile and variant management. |
| Supplier brand authorizations | `/api/supplier/sl-beauty/brand-authorizations` | Sanctum supplier | `sl_beauty.brand_seller_verification` | Supplier authorization submission and document tracking. |
| Admin SL Beauty brands | `/api/admin/sl-beauty/brands` | Sanctum admin/staff reviewer | `sl_beauty.brand_seller_verification` | Brand moderation and verification. |
| Admin authorizations | `/api/admin/sl-beauty/brand-authorizations` | Sanctum admin/staff reviewer | `sl_beauty.brand_seller_verification` | Seller-brand authorization review. |
| Admin compliance | `/api/admin/sl-beauty/compliance` | Sanctum admin/staff reviewer | `sl_beauty.compliance_workflows` | Beauty metadata and compliance review queue. |

Route naming notes:

- Do not reuse `/api/products`, `/api/supplier/products`, `/api/admin/products`, or any RFQ/quotation/order route for incompatible behavior.
- Keep SL Beauty route prefixes explicit until compatibility is proven.
- API resources can later be composed into existing product detail responses as optional nested fields, but that should be a separate implementation task.

## 3. Public API Endpoints

### Public Brand Browsing

| Method | Endpoint | Purpose | Query params | Response |
|---|---|---|---|---|
| `GET` | `/api/sl-beauty/brands` | List active/verified public brands. | `search`, `country_id`, `status=active`, `verified=true`, `page`, `per_page`, `sort` | Paginated brand summaries. |
| `GET` | `/api/sl-beauty/brands/{slug}` | Show a public brand profile. | None | Brand detail with public authorized supplier count. |
| `GET` | `/api/sl-beauty/brands/{slug}/products` | List active products associated with an authorized brand relationship once product-brand mapping exists. | `category`, `skin_type`, `hair_type`, `page`, `per_page` | Paginated product summaries. |

Important dependency:

- `/brands/{slug}/products` should not be implemented until a safe product-to-brand association exists. Current schema supports seller-brand authorization but not product-brand ownership.

### Public Product Beauty Display

| Method | Endpoint | Purpose | Query params | Response |
|---|---|---|---|---|
| `GET` | `/api/sl-beauty/products/{product}/beauty-profile` | Show consumer-safe beauty metadata for an active product. | None | Beauty profile fields safe for public display. |
| `GET` | `/api/sl-beauty/products/{product}/variants` | Show active variants for an active product. | `shade_family`, `size_label`, `in_stock`, `sort` | Variant summaries with retail-safe fields. |
| `GET` | `/api/sl-beauty/products/{product}/beauty-summary` | Show combined profile and variant summary for detail pages. | None | Product beauty profile plus active variant list. |

Public visibility rules:

- Only active public products should be returned.
- Only active variants should be returned.
- Public responses should not expose internal compliance review notes, document paths, admin reviewer fields, or supplier-only metadata.

## 4. Supplier API Endpoints

### Supplier Brand Authorization Management

| Method | Endpoint | Purpose | Body | Response |
|---|---|---|---|---|
| `GET` | `/api/supplier/sl-beauty/brand-authorizations` | List authenticated supplier authorization records. | None | Paginated authorizations. |
| `POST` | `/api/supplier/sl-beauty/brand-authorizations` | Create draft/submitted authorization. | Brand and authorization fields. | Authorization detail. |
| `GET` | `/api/supplier/sl-beauty/brand-authorizations/{id}` | Show owned authorization detail. | None | Authorization detail. |
| `PUT` | `/api/supplier/sl-beauty/brand-authorizations/{id}` | Update draft or rejected authorization. | Editable authorization fields. | Updated authorization detail. |
| `POST` | `/api/supplier/sl-beauty/brand-authorizations/{id}/submit` | Submit draft/rejected authorization for review. | Optional note. | Submitted authorization detail. |
| `DELETE` | `/api/supplier/sl-beauty/brand-authorizations/{id}` | Withdraw draft authorization. | None | Empty success response. |

Status rule:

- Suppliers should not edit approved, expired, suspended, or under-review records except through a controlled renewal flow in a later task.

### Supplier Product Beauty Profile Management

| Method | Endpoint | Purpose | Body | Response |
|---|---|---|---|---|
| `GET` | `/api/supplier/sl-beauty/products/{product}/beauty-profile` | Show supplier-owned product beauty profile. | None | Beauty profile detail. |
| `PUT` | `/api/supplier/sl-beauty/products/{product}/beauty-profile` | Create or update supplier-owned product beauty profile. | Beauty profile fields. | Updated beauty profile detail. |
| `POST` | `/api/supplier/sl-beauty/products/{product}/beauty-profile/submit-compliance` | Submit metadata for admin compliance review. | Optional note. | Profile with compliance status. |

Ownership rule:

- The authenticated supplier can only manage products where `products.supplier_id` matches their supplier profile.

### Supplier Product Variant Management

| Method | Endpoint | Purpose | Body | Response |
|---|---|---|---|---|
| `GET` | `/api/supplier/sl-beauty/products/{product}/variants` | List variants for supplier-owned product. | None | Variant list. |
| `POST` | `/api/supplier/sl-beauty/products/{product}/variants` | Create variant for supplier-owned product. | Variant fields. | Variant detail. |
| `GET` | `/api/supplier/sl-beauty/products/{product}/variants/{variant}` | Show owned variant detail. | None | Variant detail. |
| `PUT` | `/api/supplier/sl-beauty/products/{product}/variants/{variant}` | Update owned variant. | Variant fields. | Updated variant detail. |
| `PATCH` | `/api/supplier/sl-beauty/products/{product}/variants/{variant}/status` | Toggle active/inactive or stock visibility. | `is_active`, `status` | Updated variant status. |
| `DELETE` | `/api/supplier/sl-beauty/products/{product}/variants/{variant}` | Soft-delete owned variant if safe. | None | Empty success response. |

Compatibility rule:

- Existing `/api/supplier/products` behavior must not change. Variant management stays in the new SL Beauty route group until a separate compatibility task merges it into supplier product workflows.

## 5. Admin API Endpoints

### Admin Brand Management

| Method | Endpoint | Purpose | Body/query | Response |
|---|---|---|---|---|
| `GET` | `/api/admin/sl-beauty/brands` | List brands for admin review. | `status`, `verified`, `search`, `page`, `per_page` | Paginated brand admin summaries. |
| `POST` | `/api/admin/sl-beauty/brands` | Create platform-managed brand. | Brand fields. | Brand detail. |
| `GET` | `/api/admin/sl-beauty/brands/{brand}` | Show admin brand detail. | None | Brand detail with authorizations. |
| `PUT` | `/api/admin/sl-beauty/brands/{brand}` | Update brand metadata. | Brand fields. | Updated brand detail. |
| `PATCH` | `/api/admin/sl-beauty/brands/{brand}/status` | Change brand status/verification. | `status`, `is_verified`, `review_notes` | Updated brand status. |
| `DELETE` | `/api/admin/sl-beauty/brands/{brand}` | Soft-delete brand if no blocking dependencies. | None | Empty success response. |

### Admin Seller Brand Authorization Review

| Method | Endpoint | Purpose | Body/query | Response |
|---|---|---|---|---|
| `GET` | `/api/admin/sl-beauty/brand-authorizations` | Review queue. | `status`, `brand_id`, `supplier_id`, `expires_before`, `page`, `per_page` | Paginated authorization admin summaries. |
| `GET` | `/api/admin/sl-beauty/brand-authorizations/{id}` | Show authorization detail. | None | Authorization detail with supplier and brand summary. |
| `PATCH` | `/api/admin/sl-beauty/brand-authorizations/{id}/approve` | Approve authorization. | `review_notes`, optional `expires_at` | Approved authorization detail. |
| `PATCH` | `/api/admin/sl-beauty/brand-authorizations/{id}/reject` | Reject authorization. | Required `review_notes` | Rejected authorization detail. |
| `PATCH` | `/api/admin/sl-beauty/brand-authorizations/{id}/suspend` | Suspend authorization. | Required `review_notes` | Suspended authorization detail. |
| `PATCH` | `/api/admin/sl-beauty/brand-authorizations/{id}/expire` | Mark expired manually if needed. | `review_notes` | Expired authorization detail. |

### Admin Compliance/Product Beauty Metadata Review

| Method | Endpoint | Purpose | Body/query | Response |
|---|---|---|---|---|
| `GET` | `/api/admin/sl-beauty/compliance/product-beauty-profiles` | List profile compliance queue. | `compliance_status`, `category`, `supplier_id`, `page`, `per_page` | Paginated profile summaries. |
| `GET` | `/api/admin/sl-beauty/compliance/product-beauty-profiles/{profile}` | Show review detail. | None | Profile detail with product/supplier summary. |
| `PATCH` | `/api/admin/sl-beauty/compliance/product-beauty-profiles/{profile}/approve` | Approve metadata. | `review_notes` | Updated profile. |
| `PATCH` | `/api/admin/sl-beauty/compliance/product-beauty-profiles/{profile}/request-changes` | Request supplier correction. | Required `review_notes` | Updated profile. |
| `PATCH` | `/api/admin/sl-beauty/compliance/product-beauty-profiles/{profile}/reject` | Reject unsafe/non-compliant metadata. | Required `review_notes` | Updated profile. |

Compliance note:

- Task 06 `product_beauty_profiles` does not currently include review notes or reviewer fields. Initial implementation can update `compliance_status` only. Rich review history should wait for a dedicated additive compliance migration.

## 6. Request Fields

### Brand Fields

| Field | Type | Required | Used by | Notes |
|---|---|---:|---|---|
| `name` | string | Yes | Admin create/update | Unique display name recommended. |
| `slug` | string | No/Yes | Admin create/update | Can be generated from name on create; unique if provided. |
| `description` | string | No | Admin/public | Public-safe text. |
| `logo_path` | string | No | Admin | Should use existing upload flow; do not accept raw file here initially. |
| `website_url` | url | No | Admin/public | Public brand website. |
| `country_id` | integer | No | Admin | Must reference `countries.id` if provided. |
| `status` | enum | No | Admin | Suggested: `draft`, `active`, `inactive`, `suspended`. |
| `is_verified` | boolean | No | Admin | Admin-only. |

### Product Beauty Profile Fields

| Field | Type | Required | Used by | Notes |
|---|---|---:|---|---|
| `skin_type` | string/enum | No | Supplier/admin/public | Suggested controlled values later. |
| `hair_type` | string/enum | No | Supplier/admin/public | Suggested controlled values later. |
| `skin_concern` | string/enum | No | Supplier/admin/public | Supports filters. |
| `hair_concern` | string/enum | No | Supplier/admin/public | Supports filters. |
| `ingredients` | long text | No | Supplier/admin/public | Public but should be reviewed for claims. |
| `how_to_use` | long text | No | Supplier/admin/public | Public-safe instructions. |
| `warnings` | long text | No | Supplier/admin/public | Public safety information. |
| `spf_value` | integer | No | Supplier/admin/public | Required for sunscreen-like categories in later category rules. |
| `shade_family` | string/enum | No | Supplier/admin/public | Makeup/color filtering. |
| `fragrance_family` | string/enum | No | Supplier/admin/public | Fragrance/body filtering. |
| `formulation` | string/enum | No | Supplier/admin/public | Cream, gel, serum, oil, powder, etc. |
| `gender_target` | string/enum | No | Supplier/admin/public | Avoid restrictive assumptions; optional. |
| `age_group` | string/enum | No | Supplier/admin/public | Optional suitability value. |
| `expiry_required` | boolean | No | Supplier/admin | Default false. |
| `batch_tracking_required` | boolean | No | Supplier/admin | Default false. |
| `compliance_status` | enum | No | Admin/system | Supplier should not directly approve this. |

### Product Variant Fields

| Field | Type | Required | Used by | Notes |
|---|---|---:|---|---|
| `variant_name` | string | No | Supplier/public | Beauty display name. |
| `sku` | string | No | Supplier/admin | Existing field; unique if provided. |
| `barcode` | string | No | Supplier/admin | Optional retail barcode. |
| `shade_name` | string | No | Supplier/public | Cosmetic shade label. |
| `shade_code` | string | No | Supplier/public | Hex or vendor code; do not assume color format initially. |
| `size_label` | string | No | Supplier/public | Example: `50 ml`, `100 g`. |
| `volume_ml` | decimal | No | Supplier/public | Numeric volume. |
| `weight_g` | decimal | No | Supplier/public | Numeric weight. |
| `retail_price` | decimal | No | Supplier/public | Public only when B2C retail is enabled later. |
| `sale_price` | decimal | No | Supplier/public | Must be less than or equal to retail price if both present. |
| `stock_quantity` | integer | No | Supplier/public | Existing nullable stock field. |
| `low_stock_threshold` | integer | No | Supplier | Internal supplier/admin hint. |
| `is_active` | boolean | No | Supplier/public | Public endpoints return active variants only. |
| `status` | enum | No | Supplier/admin | Existing enterprise status field. |

### Seller Brand Authorization Fields

| Field | Type | Required | Used by | Notes |
|---|---|---:|---|---|
| `brand_id` | integer | Yes | Supplier/admin | Must reference `brands.id`. |
| `authorization_type` | string/enum | No | Supplier/admin | Suggested: `brand_owner`, `authorized_distributor`, `importer`, `reseller`, `salon_professional`. |
| `territory` | string | No | Supplier/admin | Example: `Sri Lanka`, province, or distributor region. |
| `document_path` | string | No | Supplier/admin | Should point to existing upload document path. |
| `starts_at` | date | No | Supplier/admin | Must be before `expires_at` if both provided. |
| `expires_at` | date | No | Supplier/admin | Used for expiry reminders later. |
| `status` | enum | No | System/admin | Supplier can submit; admin approves/rejects/suspends. |
| `review_notes` | text | No | Admin | Required for reject/suspend/request changes. |

## 7. Response Shape Examples

### Public Brand Summary

```json
{
  "id": 12,
  "name": "Example Beauty",
  "slug": "example-beauty",
  "description": "Sri Lanka beauty brand summary.",
  "logo_url": "/storage/brands/example.png",
  "website_url": "https://example.test",
  "is_verified": true,
  "status": "active"
}
```

### Public Product Beauty Summary

```json
{
  "product_id": 101,
  "beauty_profile": {
    "skin_type": "combination",
    "skin_concern": "hydration",
    "ingredients": "Aqua, glycerin...",
    "how_to_use": "Apply after cleansing.",
    "warnings": "Patch test before use.",
    "spf_value": null,
    "formulation": "serum",
    "expiry_required": true,
    "batch_tracking_required": true
  },
  "variants": [
    {
      "id": 501,
      "variant_name": "Hydrating Serum 30 ml",
      "sku": "HS-30",
      "shade_name": null,
      "size_label": "30 ml",
      "volume_ml": "30.00",
      "retail_price": "2900.00",
      "sale_price": null,
      "stock_quantity": 24,
      "is_active": true
    }
  ]
}
```

### Supplier Authorization Detail

```json
{
  "id": 88,
  "brand": {
    "id": 12,
    "name": "Example Beauty",
    "slug": "example-beauty"
  },
  "authorization_type": "authorized_distributor",
  "territory": "Sri Lanka",
  "document_path": "/storage/documents/auth-letter.pdf",
  "starts_at": "2026-07-01",
  "expires_at": "2027-07-01",
  "status": "submitted",
  "reviewed_at": null,
  "review_notes": null
}
```

### Admin Authorization Review Detail

```json
{
  "id": 88,
  "supplier": {
    "id": 7,
    "company_name": "Colombo Beauty Distributors"
  },
  "brand": {
    "id": 12,
    "name": "Example Beauty",
    "is_verified": true
  },
  "authorization_type": "authorized_distributor",
  "territory": "Sri Lanka",
  "status": "submitted",
  "document_path": "/storage/documents/auth-letter.pdf",
  "reviewed_by": null,
  "reviewed_at": null,
  "review_notes": null
}
```

## 8. Validation Rules

| Area | Rules |
|---|---|
| Brand identity | `name` required on create, max 255, unique normalized name recommended; `slug` unique if supplied; `website_url` must be URL; `country_id` must exist if supplied. |
| Brand status | Only admin can set `is_verified`; only admin can set `active`, `suspended`, or verification-related status. |
| Beauty profile ownership | Supplier can create/update only for products they own. Admin can review any profile. |
| Beauty profile text | Long text fields should have practical max lengths; sanitize output; do not allow unsafe HTML by default. |
| SPF | `spf_value` nullable integer, suggested min 0 max 100. Category-specific SPF requirements should wait for category rules. |
| Booleans | `expiry_required`, `batch_tracking_required`, `is_active`, `is_verified` must validate as boolean. |
| Variant prices | `retail_price`, `sale_price`, existing `price`, and FOB/MOQ fields must be numeric with two decimals; `sale_price <= retail_price` when both present. |
| Variant stock | `stock_quantity` and `low_stock_threshold` must be non-negative integers when supplied. |
| Variant ownership | Variant must belong to the requested product, and product must belong to authenticated supplier for supplier routes. |
| Authorization dates | `starts_at` and `expires_at` must be valid dates; `expires_at` must be after `starts_at` when both are present. |
| Authorization document | `document_path` should reference an existing uploaded document owned by the supplier when document validation is implemented. |
| Review notes | Required for reject/suspend/request-changes actions; optional for approve. |

## 9. Authorization Rules

| Actor | Allowed | Not allowed |
|---|---|---|
| Guest/public | View active brands, active product beauty metadata, active variants. | Create/update brands, variants, beauty profiles, authorization records, or review compliance. |
| Authenticated buyer | Same as public until consumer features are explicitly added. | Supplier/admin management actions. |
| Supplier | Manage own product beauty profiles, own product variants, and own brand authorization records. | Manage other suppliers' products, authorizations, or admin review fields. |
| Admin | Manage all brands, review authorizations, review compliance metadata. | Break existing B2B workflows or bypass audit/review requirements. |
| Staff reviewer | Optional future role for review queues if permissions support it. | Full admin system actions unless explicitly permitted. |

Policy targets:

- `BrandPolicy`
- `ProductBeautyProfilePolicy`
- `ProductVariantPolicy`
- `SellerBrandAuthorizationPolicy`

Policy implementation should be a separate coding task.

## 10. Feature Flag Behavior

| Feature flag | Public behavior | Supplier behavior | Admin behavior |
|---|---|---|---|
| `sl_beauty.taxonomy` | Enables public beauty metadata/variant routes. | Enables beauty profile and variant management. | Enables beauty metadata review visibility. |
| `sl_beauty.b2c_retail` | When disabled, do not expose checkout/cart/payment behavior. Retail price display can remain hidden or marked experimental until approved. | No retail order side effects. | No retail order management. |
| `sl_beauty.brand_seller_verification` | Enables verified brand/seller indicators if records are approved. | Enables supplier brand authorization submission. | Enables authorization review queues. |
| `sl_beauty.compliance_workflows` | Public should only show approved/safe metadata. | Enables compliance submission actions. | Enables compliance review queue/actions. |

Default safety:

- If a flag is disabled, return `404` for unfinished route groups or `403` for authenticated workflows that exist but are disabled.
- Do not partially enable write workflows before review and regression tests exist.

## 11. Backward Compatibility Rules

| Surface | Rule |
|---|---|
| Existing public products | Do not change `/api/products`, `/api/products/{id}`, featured, trending, search, or category product behavior in the first API implementation. |
| Existing supplier products | Do not change `/api/supplier/products` create/update/delete payloads until supplier product compatibility tests cover optional beauty fields. |
| Existing cart | Do not repurpose `/api/cart`; it is an inquiry cart, not a B2C retail cart. |
| Existing orders | Do not add retail order states to existing order APIs until B2B/B2C order coexistence is designed. |
| Existing admin products | Do not alter `/api/admin/products` moderation behavior until admin SL Beauty routes are implemented and tested separately. |
| Existing analytics | Do not change analytics calculations until beauty dimensions are explicitly added. |
| Existing notifications | Do not emit new notification types until templates and ownership rules are defined. |
| Response additions | Any later additions to existing responses must be optional, nullable, and backward-compatible. |

## 12. B2B Regression Risks

| Risk | Why it matters | Mitigation |
|---|---|---|
| Product detail response changes break frontend | Existing product pages rely on current shape. | Keep new beauty responses separate first; add optional nested fields later. |
| Supplier product management payload changes break dashboard | Supplier dashboard already manages products. | Add separate SL Beauty supplier endpoints first. |
| Product variants conflict with B2B pricing/MOQ | Existing variants include enterprise B2B price/MOQ fields. | Do not reinterpret existing fields; add explicit retail fields only where intended. |
| Inquiry cart confused with retail cart | Existing `/cart` is B2B inquiry flow. | Do not add B2C cart or checkout in this contract. |
| Admin product status mixed with compliance status | Product status and beauty compliance status are separate concerns. | Keep compliance review under `/admin/sl-beauty/compliance`. |
| Brand authorization affects supplier visibility too early | Supplier public pages may change unexpectedly. | Keep authorization badges/features behind feature flag and approved status. |

## 13. Recommended Implementation Order

| Step | Implementation task | Reason |
|---:|---|---|
| 1 | Add API resources only: `BrandResource`, `ProductBeautyProfileResource`, `ProductVariantResource`, `SellerBrandAuthorizationResource`. | Defines response shape without route behavior changes. |
| 2 | Add form requests and policies for the new SL Beauty models. | Locks validation and authorization before controllers. |
| 3 | Add public read-only brand and product beauty display endpoints. | Lowest-risk consumer-safe surface. |
| 4 | Add supplier product beauty profile management endpoints. | Extends supplier-owned product metadata without touching existing product CRUD. |
| 5 | Add supplier product variant management endpoints. | Adds variant workflow under new route group. |
| 6 | Add supplier brand authorization submission endpoints. | Requires upload/document ownership validation. |
| 7 | Add admin brand and authorization review endpoints. | Enables controlled verification workflow. |
| 8 | Add admin compliance review endpoints. | Requires clear compliance status transitions and review notes strategy. |
| 9 | Consider optional nested beauty data in existing product responses. | Only after regression coverage proves compatibility. |

## 14. What Should Not Be Implemented Yet

- No B2C cart API.
- No B2C checkout API.
- No payment transaction API.
- No retail order lifecycle API.
- No shipment, return, or refund API.
- No changes to existing `/api/cart`, `/api/orders`, `/api/rfqs`, `/api/quotations`, `/api/supplier/products`, `/api/admin/products`, or analytics routes.
- No product-to-brand endpoint until product-brand schema support exists.
- No automatic product approval/rejection based solely on beauty metadata.
- No notification events until templates and recipients are specified.
- No frontend UI changes.
- No route aliases that hide SL Beauty behavior under existing Made in SL route names.

## 15. Testing Strategy

| Test area | Required coverage |
|---|---|
| Route isolation | Assert existing B2B routes still return the same status and response shape after adding SL Beauty route groups. |
| Public brands | List/search/show active brands; hide draft/inactive/suspended brands. |
| Public product beauty | Show only active products and active variants; hide internal review/admin fields. |
| Supplier ownership | Supplier cannot access or mutate another supplier's products, variants, beauty profiles, or authorization records. |
| Supplier validation | Reject invalid dates, negative prices, invalid booleans, bad ownership, and invalid status transitions. |
| Admin authorization review | Approve/reject/suspend transitions set `reviewed_by`, `reviewed_at`, status, and notes as expected. |
| Admin compliance review | Compliance status transitions are authorized and do not alter product publication status unless explicitly designed later. |
| Feature flags | Disabled flags return `404`/`403` without side effects; enabled flags expose only intended routes. |
| Regression | Run existing RFQ, quotation, supplier dashboard, buyer dashboard, messaging, notifications, orders, product catalogue, admin, and analytics feature tests. |
| Serialization | Verify public resources do not leak `document_path` where not intended, reviewer fields, internal notes, or supplier-only fields. |

Recommended check commands after implementation tasks:

```bash
php -l <changed PHP files>
php artisan test
npm run lint
```

## Final Recommendation

Proceed to resource/request/policy planning or implementation as the next safe task.

Do not implement controllers or routes until the API resources, request validation, authorization policies, feature flag behavior, and regression tests are scoped for the first endpoint group.
