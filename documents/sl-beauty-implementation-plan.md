# SL Beauty Platform Implementation Plan

Planning date: 2026-07-04
Source audit: `documents/sl-beauty-migration-audit.md`
Repository: `/Users/techromz/SL Beauty Platform/sl-beauty-platform`

## Guardrails

This plan assumes the existing Made in SL B2B marketplace remains the base. The conversion must be additive first: preserve RFQ, quotations, supplier dashboard, buyer dashboard, messaging, notifications, orders, product catalogue, admin, and analytics while layering SL Beauty Platform behavior on top.

Do not begin with file renames, table renames, route rewrites, or wholesale UI replacement. The early phases should create compatibility, beauty taxonomy, and B2C extensions behind existing stable modules.

## 1. Overall Conversion Strategy

The safest strategy is a staged hybrid marketplace conversion:

1. Keep the current Laravel API and Next.js frontend structure.
2. Preserve B2B workflows as first-class functionality for salons, spas, retailers, distributors, and bulk buyers.
3. Add B2C retail commerce separately from B2B inquiry/RFQ flows.
4. Add beauty-specific catalogue, compliance, seller verification, and admin workflows through additive migrations.
5. Convert branding and user-facing copy gradually after data and workflow compatibility are protected.
6. Regression test all Made in SL trade paths before and after each phase.

The platform should become a dual-mode marketplace:

- B2C: consumers browse beauty categories, variants, prices, stock, cart, checkout, delivery, reviews, and returns.
- B2B: professional buyers use RFQ, inquiries, supplier dashboards, quotations, bulk orders, production/supply details, messaging, and analytics.

## 2. Phase-by-Phase Roadmap

### Phase 0: Baseline Lock

- Confirm current branch and clean working tree.
- Run existing backend and frontend checks before functional changes.
- Record baseline behavior for auth, catalogue, supplier dashboard, buyer dashboard, RFQ, quotations, orders, messaging, notifications, admin, analytics.
- Freeze route/table rename decisions until after additive compatibility is complete.

### Phase 1: Branding and Configuration Foundation

- Add SL Beauty app naming through config/constants.
- Keep existing API routes and database names unchanged.
- Replace visible Made in SL copy only where it does not alter route names, schema names, or behavior.
- Add feature flags for B2C retail modules, beauty taxonomy, brand verification, and compliance queues.

### Phase 2: Beauty Taxonomy and Catalogue Metadata

- Add beauty categories and category attribute templates.
- Keep existing categories until product data is migrated or explicitly retired.
- Add beauty product metadata tables and product-resource serialization behind backward-compatible API responses.
- Preserve current product fields: MOQ, lead time, supply ability, port, packaging, supplier, status, featured/trending flags.

### Phase 3: Product Variants and Retail Inventory

- Add product variants for shade, size, SKU, barcode, retail price, sale price, stock, low-stock threshold, and variant images.
- Keep B2B product price/MOQ behavior intact.
- Add inventory service logic without changing existing supplier product CRUD behavior until API compatibility tests pass.

### Phase 4: B2C Cart, Checkout, Orders, and Delivery

- Introduce a retail cart separate from the existing inquiry cart.
- Add checkout, addresses, payment transaction records, shipment records, cancellation, return, refund states.
- Extend order APIs carefully so B2B orders and B2C retail orders can coexist.
- Update frontend consumer cart/checkout/order pages to use B2C retail semantics.

### Phase 5: Brand, Seller, and Distributor Verification

- Add brand records and seller-brand authorization records.
- Extend supplier verification into seller type verification: brand owner, distributor/importer, retailer/reseller, salon/pro supplier.
- Add admin review queues and document expiry/renewal reminders.

### Phase 6: Admin Compliance and Moderation

- Add beauty product claim review, counterfeit reports, unsafe/expired product reports, and compliance status tracking.
- Extend admin APIs and frontend admin surfaces, or create a dedicated admin area if required.
- Add audit log events for verification, compliance, product moderation, and seller authorization changes.

### Phase 7: Frontend Beauty Experience

- Convert public home, category, product listing, product detail, search filters, seller storefront, cart, checkout, and order tracking to beauty-first UX.
- Keep B2B entry points visible for professional buyers.
- Preserve supplier dashboard and buyer trade dashboards while adapting copy to beauty procurement.

### Phase 8: Regression, Launch Hardening, and Data Migration

- Run full regression suite.
- Load beauty seed data in staging.
- Validate existing B2B flows with old and new product records.
- Review compliance workflows with sample seller/brand/distributor records.
- Prepare launch checklist, rollback plan, and monitoring dashboards.

## 3. Backend Change Plan

- Keep current controllers and routes stable during early phases.
- Add services/classes for beauty catalogue logic rather than embedding branching directly in existing controllers.
- Extend `ProductController` and `SupplierProductController` responses with optional beauty fields after serializers/resources support them.
- Add B2C retail APIs under additive route groups only after data model is ready.
- Preserve existing `/cart` inquiry cart until a separate retail cart route is introduced.
- Preserve `/rfqs`, `/quotations`, `/supplier/rfqs`, `/supplier/quotations`, `/conversations`, `/messages`, `/notifications`, `/orders`, `/admin/*`, and `/analytics/*` behavior.
- Add policy coverage for consumer, seller, distributor, admin reviewer, and compliance reviewer permissions.
- Add notification events for retail order placed, paid, shipped, delivered, cancelled, returned, refunded, seller verification submitted, verification approved/rejected, product claim review required, and product report received.
- Add analytics dimensions for B2B versus B2C, category, brand, seller type, conversion, retail orders, RFQs, quotations, compliance workload, and seller verification status.

## 4. Frontend Change Plan

- Keep the existing Next.js app structure under `frontend/src/app`.
- Preserve current pages for products, suppliers, dashboard, supplier dashboard, RFQ, quotations, cart, orders, messages, notifications, search, wishlist, and checkout until new data contracts are stable.
- Add beauty-specific UI progressively:
  - Beauty home sections.
  - Beauty category navigation.
  - Beauty search/filter controls.
  - Product variant selectors.
  - Stock/retail price display.
  - Brand and authorized seller badges.
  - Retail cart and checkout states.
  - Delivery tracking and return/refund status.
- Keep B2B components such as `B2BProductCard`, RFQ pages, supplier dashboard pages, and quotation workflows visible and tested.
- Split copy by mode: consumer copy for retail shopping; professional copy for bulk/RFQ sourcing.
- Add frontend feature flags so B2C flows can be enabled gradually.

## 5. Database Migration Plan

Use additive migrations only for the initial conversion. Do not rename or drop existing tables.

Recommended migration groups:

1. Beauty taxonomy:
   - Add beauty category seeders.
   - Add or extend category attribute templates.

2. Brand and seller model:
   - `brands` table.
   - `brand_supplier_authorizations` or equivalent authorization table.
   - Seller type fields on supplier/company profile through additive columns or related table.

3. Beauty product metadata:
   - `product_beauty_profiles` table or controlled JSON field.
   - Fields for skin type, hair type, concern, ingredients, formulation, SPF, shade family, scent, size/volume, usage notes, warnings.

4. Product variants and inventory:
   - `product_variants` table.
   - Optional `inventory_movements` or stock ledger table.
   - Variant images and barcode/SKU uniqueness.

5. B2C retail commerce:
   - Retail carts and retail cart items, unless existing cart is explicitly split by type.
   - Addresses.
   - Payment transactions.
   - Shipments/delivery events.
   - Returns/refunds.

6. Compliance and moderation:
   - Product claim reviews.
   - Product reports.
   - Compliance documents.
   - Verification review notes and audit events.

Every migration should include rollback methods, indexes for expected filters, and foreign key behavior that does not remove existing B2B records unexpectedly.

## 6. B2B Feature Preservation Plan

The following flows must have regression coverage before and after each phase:

- Buyer RFQ create, list, detail, update, delete.
- Supplier RFQ list and detail.
- Supplier quotation submit, list, detail, update.
- Buyer quotation list, detail, comparison, accept, reject.
- Supplier dashboard metrics and product management.
- Buyer dashboard and sourcing actions.
- Inquiry cart and inquiry creation.
- Messaging conversation list/detail/send/read.
- Notifications list/read/read-all.
- Orders create/list/detail/status update.
- Product catalogue public listing/detail/search/category listing.
- Supplier listing/detail/company profile/products/reviews.
- Admin dashboard, user status, supplier verification, product moderation, RFQs, quotations, orders, messages.
- Analytics dashboard and reporting endpoints.

Protection rules:

- Do not reuse B2B route names for incompatible B2C behavior.
- Do not repurpose `inquiry_carts` as retail carts without a compatibility layer.
- Do not remove MOQ, lead time, supply ability, packaging, port, RFQ, quotation, or supplier profile fields.
- Do not hide B2B dashboards when adding consumer UX.

## 7. B2C Feature Addition Plan

Add consumer marketplace features in this order:

1. Consumer browsing:
   - Beauty home sections, category pages, brand pages, product listing filters.

2. Product detail:
   - Variant selector, stock state, retail price, sale price, seller authorization, beauty attributes, usage and warnings.

3. Retail cart:
   - Add item, update quantity, remove item, clear cart, stock validation, price snapshot.

4. Checkout:
   - Address, delivery method, payment method, order summary, confirmation.

5. Retail order lifecycle:
   - Pending payment, paid, processing, shipped, delivered, cancelled, return requested, returned, refunded.

6. Consumer account:
   - Order history, saved products, reviews, addresses, notification preferences.

7. Customer support:
   - Product reports, order help, return/refund requests, seller contact where appropriate.

## 8. Beauty Product Attribute Plan

Attribute groups:

- Identity: brand, product line, product type, country of origin, seller authorization status.
- Skin: skin type, concern, sensitivity suitability, acne-prone suitability, SPF.
- Hair: hair type, scalp concern, treatment type, texture, color-safe flag.
- Makeup: shade, undertone, finish, coverage, form, waterproof/long-wear flags.
- Body/fragrance: scent family, intensity, size, form, gender/age suitability where relevant.
- Natural/Ayurvedic: ingredients, certifications, traditional use notes, organic/herbal flags.
- Safety/compliance: ingredient list, allergens, warnings, expiry/batch controls, regulatory references.
- Commerce: variant SKU, barcode, size, stock, retail price, sale price, wholesale/MOQ values.

Implementation notes:

- Use controlled option sets for filters where possible.
- Keep free text for ingredient list, usage notes, and warnings.
- Support category-specific attribute templates so sunscreen does not show irrelevant hair filters, and hair treatments do not show makeup shade filters.
- Expose public-safe attributes in product APIs; keep compliance review notes admin-only.

## 9. Brand/Seller/Distributor Verification Plan

Seller types:

- Brand owner/manufacturer.
- Authorized distributor/importer.
- Retail reseller.
- Salon/professional supplier.
- Platform-approved merchant.

Verification records should capture:

- Business registration details.
- Tax/VAT details where applicable.
- Contact identity and ownership proof.
- Brand ownership or authorization letter.
- Distributor/importer agreement or invoice trail.
- Territory and expiry date for authorization.
- Product compliance documents.
- Review status: draft, submitted, under review, approved, rejected, expired, renewal required.
- Admin reviewer, notes, timestamps, and document uploads.

Frontend requirements:

- Seller onboarding document upload.
- Verification status screen.
- Brand authorization badges on product and seller pages.
- Renewal reminders and rejected-document guidance.

## 10. Admin Approval and Compliance Workflow Plan

Admin queues:

- Seller verification queue.
- Brand authorization queue.
- Product approval queue.
- Product claim review queue.
- Product report/counterfeit queue.
- Expired authorization/compliance renewal queue.

Workflow:

1. Seller submits verification or product claim data.
2. System validates required fields and documents.
3. Admin/compliance reviewer receives queue item.
4. Reviewer approves, rejects, requests changes, or escalates.
5. Platform logs reviewer, timestamp, decision, notes, and affected entity.
6. Notification is sent to seller and relevant staff.
7. Public product/seller badge updates only after approval.

Compliance statuses:

- Not required.
- Required missing.
- Submitted.
- Under review.
- Approved.
- Rejected.
- Expired.
- Suspended.

## 11. Testing and Regression Checklist

Backend checks:

- Auth register/login/logout/me/password flows.
- Product listing/detail/search/category APIs.
- Supplier listing/detail/company profile/product APIs.
- Supplier product CRUD.
- Inquiry cart APIs.
- Wishlist APIs.
- RFQ buyer APIs and supplier RFQ APIs.
- Quotation submit/list/detail/update/accept/reject APIs.
- Order create/list/detail/status APIs.
- Conversation/message APIs.
- Notification APIs.
- Review APIs.
- Upload APIs.
- Admin APIs.
- Analytics APIs.
- Migration rollback/refresh in a non-production database.

Frontend checks:

- Home, products, product detail, categories, suppliers, supplier detail, search.
- Login, register, forgot/reset password.
- Dashboard, settings, wishlist, cart, checkout, orders.
- RFQ, RFQ detail, quotation workflow, quotations.
- Messages, conversation detail, notifications.
- Supplier dashboard, products, product create/edit/detail, RFQs, orders, messages, settings, analytics.
- Responsive behavior for consumer and supplier pages.

New beauty/B2C checks when added:

- Beauty filters return correct results.
- Variant selection changes price/stock/image correctly.
- Retail cart preserves price/variant snapshots.
- Checkout validates stock and required address/payment fields.
- Seller authorization badge appears only for approved records.
- Compliance-restricted products are hidden or flagged correctly.

## 12. Risk Control Plan

- Use feature flags for B2C modules until they pass staging tests.
- Keep additive migrations reversible and isolated by domain.
- Avoid route and table renames until B2B regression is stable.
- Create compatibility tests for existing B2B API contracts.
- Separate inquiry cart from retail cart to avoid breaking B2B sourcing.
- Separate retail order lifecycle from B2B quotation/order lifecycle where needed.
- Make admin/compliance state transitions explicit and auditable.
- Seed beauty taxonomy in staging before production.
- Validate old products and new beauty products can coexist in listings.
- Keep rollback scripts and database backups ready before production migrations.
- Monitor errors, failed jobs, payment failures, checkout abandonment, RFQ creation, quotation submission, order creation, and message delivery after launch.

## 13. First Safe Coding Task After Planning

First safe coding task: add a non-destructive SL Beauty configuration and taxonomy foundation.

Scope:

- Add app-level SL Beauty display configuration/constants.
- Add beauty category seed data and category attribute templates.
- Add feature flags for beauty taxonomy and B2C retail features.
- Do not rename existing routes, tables, controllers, pages, or modules.
- Do not remove or alter RFQ, quotations, supplier dashboard, buyer dashboard, messaging, notifications, orders, product catalogue, admin, or analytics behavior.

Acceptance criteria:

- Existing B2B tests/checks still pass.
- Existing public catalogue pages still load.
- Existing RFQ and quotation APIs still behave as before.
- Beauty categories can be seeded without deleting existing categories.
- The change can be rolled back without data loss.
