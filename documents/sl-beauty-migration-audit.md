# SL Beauty Platform Migration Audit

Audit date: 2026-07-04
Branch verified: `feature/sl-beauty-migration-audit`
Repository audited: `/Users/techromz/SL Beauty Platform/sl-beauty-platform`

## Scope

This audit covers the existing Made in SL codebase now present in this repository:

- Backend: `backend` Laravel API
- Frontend: `frontend` Next.js app
- Report path: `documents/sl-beauty-migration-audit.md`

No backend code, frontend code, database migration, API route, UI file, or module name was changed for this audit.

## 1. Backend Module List

- Authentication: `AuthController`, login, register, forgot password, reset password, logout, current user.
- User account: `UserController`, dashboard, profile, password update.
- Public home/catalog: `HomeController`, navigation menus, home sections, banners, recommendations, featured/trending products, verified suppliers, trending keywords.
- Categories: `CategoryController`, category listing/detail/category products.
- Product catalogue: `ProductController`, `SupplierProductController`, product CRUD for suppliers, public catalogue, featured/trending products, product images.
- Supplier directory: `SupplierController`, supplier listing/detail/products/reviews.
- Supplier company profile: `SupplierProfileController`, company profile, certificates, videos, strengths, production capacity, public supplier profile.
- Inquiry cart: `InquiryCartController`, inquiry cart and inquiry cart item models.
- Wishlist: `WishlistController`, saved product flow.
- RFQ: `RFQController`, buyer RFQ CRUD, supplier RFQ listing/detail, RFQ items.
- Quotations: `QuotationController`, supplier quotation submission, RFQ quotation list, buyer accept/reject.
- Orders: `OrderController`, order creation/list/detail/status updates.
- Messaging: `ConversationController`, `MessageController`, conversations and messages.
- Notifications: `NotificationController`, notification list/read state and notification jobs/templates.
- Reviews: `ProductReviewController`, `SupplierReviewController`.
- Uploads: `UploadController`, image and document uploads.
- Admin: `AdminController`, users, suppliers, products, RFQs, quotations, orders, messages, Horizon status, activity logs, system, backups, maintenance.
- Analytics: `AnalyticsController`, dashboard, top products/suppliers/categories, RFQ, quotation, order, revenue reporting.
- Enterprise/platform modules: localization/settings, security/compliance, search/reporting, logistics/trade, payment/invoice, storefront/trust, activity logging, queues, cache, Horizon, OpenAPI documentation.

## 2. Frontend Page and Component List

The frontend is a Next.js application under `frontend/src/app` with reusable components under `frontend/src/components`.

Pages found:

- Public/home: `/`, `/products`, `/products/[id]`, `/categories/[slug]`, `/suppliers`, `/suppliers/[id]`, `/search`, `/trade-shows`, `/trade-shows/[id]`, `/help-center`, catch-all `[...slug]`, not found/error pages.
- Auth: `/login`, `/register`, `/forgot-password`, `/reset-password`.
- Buyer/account: `/dashboard`, `/settings`, `/wishlist`, `/cart`, `/checkout`, `/order-success`, `/orders`, `/orders/create`, `/orders/[id]`, `/orders/[id]/tracking`, `/orders/[id]/invoice`, `/rfq`, `/rfq/[id]`, `/quotations`, `/quotations/[id]`, `/messages`, `/messages/[conversationId]`, `/notifications`, `/reviews`, `/compare`, `/inquiry/create`, `/company-verification`.
- Supplier dashboard: `/supplier-dashboard`, `/supplier-dashboard/analytics`, `/supplier-dashboard/orders`, `/supplier-dashboard/rfqs`, `/supplier-dashboard/messages`, `/supplier-dashboard/products`, `/supplier-dashboard/products/new`, `/supplier-dashboard/products/[id]`, `/supplier-dashboard/settings`.

Components found:

- Layout: `Header`, `Footer`.
- Home: `HeroSlider`, `CategorySidebar`, `CategoryGridSection`, `ExportCategorySection`, `FeaturedCards`, `HomeProductSection`, `TrendingProducts`, `TrendingKeywords`, `VerifiedSuppliers`, `EasySourcingSection`, `SourcingSolutions`, `TradeShows`, `YouMayLike`.
- Product: `ProductCard`, `B2BProductCard`, `WishlistButton`.
- Supplier: `SupplierSidebar`, `SupplierProductsManager`, `SupplierProfileManager`.
- Notifications: `NotificationCenter`.
- Shared UI: `FileUploadField`, `FloatingActions`, `LoadingSpinner`, `Pagination`, `SkeletonLoader`.
- Contexts/libraries: `AuthContext`, `CartContext`, API clients for auth/home/products/suppliers/RFQ/dashboard, notifications, utilities, form error helpers, auth redirects.

## 3. Database Migration/Table List

Core/system tables:

- `users`, `password_reset_tokens`, `sessions`, `cache`, `cache_locks`, `jobs`, `job_batches`, `failed_jobs`, `personal_access_tokens`.

Marketplace tables:

- `categories`, `suppliers`, `products`, `product_images`, `inquiry_carts`, `inquiry_cart_items`, `wishlists`, `rfqs`, `rfq_items`, `quotations`, `quotation_items`, `conversations`, `messages`, `banners`, `trending_keywords`, `uploads`, `notifications`, `orders`, `order_items`, `product_reviews`, `supplier_reviews`.

Supplier profile tables:

- `supplier_certificates`, `supplier_videos`, `supplier_strengths`, `production_capacities`.

Enterprise tables and extensions:

- Foundation/access/localization: `roles`, `permissions`, `role_user`, `permission_role`, `countries`, `currencies`, `languages`, `buyer_profiles`, `staff_profiles`, `company_profiles`, plus localization/settings extension tables.
- Product/catalogue: B2B catalogue fields, enterprise product catalogue tables, attribute groups, category attributes, product tags.
- RFQ/quotation/order: B2B RFQ/quotation fields, enterprise RFQ/quotation tables, B2B order fields, logistics fields, payment/invoice tables.
- Communication/audit: enterprise communication fields, messaging/notification/audit tables, activity log extensions.
- Search/reporting/security/compliance: search analytics/reporting tables, security verification compliance tables, trust/storefront tables, wishlist/review/supplier enterprise fields.

## 4. Existing API Route List

Public routes:

- `GET /health`
- `GET /nav/menus`
- `GET /categories/trending`
- `GET /categories`
- `GET /categories/{slug}`
- `GET /categories/{slug}/products`
- `GET /home/banners`
- `GET /home/sections`
- `GET /home/recommendations`
- `GET /home/featured-products`
- `GET /home/trending-products`
- `GET /home/verified-suppliers`
- `GET /home/trending-keywords`
- `GET /search/products`
- `GET /search/suppliers`
- `GET /search/global`
- `GET /products`
- `GET /products/featured`
- `GET /products/trending`
- `GET /products/{id}/reviews`
- `GET /products/{id}`
- `GET /suppliers`
- `GET /suppliers/{id}`
- `GET /suppliers/{id}/products`
- `GET /suppliers/{id}/reviews`
- `GET /suppliers/{id}/company-profile`

Authentication and user routes:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/logout`
- `GET /auth/me`
- `GET /user/dashboard`
- `GET /user/profile`
- `PUT /user/profile`
- `PUT /user/password`

Buyer/trade routes:

- `GET /cart`, `POST /cart/items`, `PUT /cart/items/{id}`, `DELETE /cart/items/{id}`, `DELETE /cart`
- `GET /wishlist`, `POST /wishlist`, `DELETE /wishlist/{wishlistId}`
- `POST /rfqs`, `GET /rfqs`, `GET /rfqs/{id}`, `PUT /rfqs/{id}`, `DELETE /rfqs/{id}`
- `GET /rfqs/{id}/quotations`, `POST /rfqs/{id}/quotations`
- `GET /quotations/{id}`, `PUT /quotations/{id}`, `POST /quotations/{id}/accept`, `POST /quotations/{id}/reject`
- `POST /orders`, `GET /orders`, `GET /orders/{id}`, `PUT /orders/{id}/status`

Supplier routes:

- `GET /supplier/rfqs`, `GET /supplier/rfqs/{id}`
- `GET /supplier/company-profile`, `PUT /supplier/company-profile`
- `GET /supplier/products`, `POST /supplier/products`, `GET /supplier/products/{id}`, `PUT /supplier/products/{id}`, `DELETE /supplier/products/{id}`
- `GET /supplier/certificates`, `POST /supplier/certificates`, `DELETE /supplier/certificates/{id}`
- `GET /supplier/videos`, `POST /supplier/videos`, `DELETE /supplier/videos/{id}`
- `GET /supplier/strengths`, `POST /supplier/strengths`, `PUT /supplier/strengths/{id}`, `DELETE /supplier/strengths/{id}`
- `GET /supplier/production-capacity`, `PUT /supplier/production-capacity`
- `GET /supplier/quotations`

Communication, notifications, reviews, uploads:

- `GET /conversations`, `POST /conversations`, `GET /conversations/{id}`
- `POST /messages`, `PUT /messages/{id}/read`
- `GET /notifications`, `PUT /notifications/read-all`, `PUT /notifications/{id}/read`
- `POST /products/{id}/reviews`, `POST /suppliers/{id}/reviews`
- `POST /uploads/image`, `POST /uploads/document`, `DELETE /uploads/{id}`

Admin and analytics:

- `GET /analytics/dashboard`, `/analytics/top-products`, `/analytics/top-suppliers`, `/analytics/top-categories`, `/analytics/rfqs`, `/analytics/quotations`, `/analytics/orders`, `/analytics/revenue`
- `GET /admin/dashboard`, `/admin/users`, `/admin/users/{id}`, `/admin/suppliers`, `/admin/suppliers/{id}`, `/admin/products`, `/admin/products/{id}`, `/admin/rfqs`, `/admin/quotations`, `/admin/orders`, `/admin/messages`, `/admin/horizon/status`, `/admin/activity-logs`, `/admin/system`, `/admin/backups`
- `PUT /admin/users/{id}/status`, `PUT /admin/suppliers/{id}/verify`, `PUT /admin/products/{id}/status`, `DELETE /admin/products/{id}`
- `POST /admin/maintenance/enable`, `POST /admin/maintenance/disable`

## 5. Authentication and Role Structure

- Backend auth uses Laravel Sanctum.
- Seeded backend roles are `admin`, `buyer`, `supplier`, and `staff`.
- Permission groups cover users, access, suppliers, products, catalog, trade, orders, communications, moderation, media, and analytics.
- Admin receives all permissions; staff receives operational permissions; buyer receives sourcing/trade/message permissions; supplier receives product/RFQ/quotation/order/message/upload permissions.
- Frontend auth uses `AuthContext`, auth redirect helpers, and auth pages for login/register/forgot/reset password.
- The role model is B2B-first and should be extended rather than replaced for B2C consumers.

## 6. Existing Dashboard Structure

- Buyer dashboard page: `frontend/src/app/dashboard/page.jsx`.
- Supplier dashboard pages: `supplier-dashboard`, analytics, orders, RFQs, messages, products, settings.
- Backend dashboard APIs: `/user/dashboard`, `/admin/dashboard`, `/analytics/dashboard`.
- Supplier dashboard module is already richer than consumer dashboard and should be preserved for B2B seller operations.

## 7. Existing RFQ/Inquiry Flow

- Buyer creates and manages RFQs through `/rfq` and `/rfq/[id]` frontend pages and `/rfqs` API routes.
- Suppliers view matched/open RFQs through `/supplier/rfqs` and supplier dashboard RFQ pages.
- Suppliers submit quotations through `/rfqs/{id}/quotations`.
- Buyers view quotations through `/quotations` and `/quotations/[id]`, compare/accept/reject quotation responses.
- Inquiry cart exists as `/cart` API and cart frontend page; inquiry creation exists at `/inquiry/create`.
- The flow is B2B sourcing-first and should be preserved for salons, spas, retailers, distributors, and bulk buyers.

## 8. Existing Supplier/Buyer/Product Flow

- Suppliers maintain company profile, products, verification materials, certificates, videos, strengths, production capacity, RFQs, quotations, orders, and messages.
- Buyers browse categories, products, suppliers, search, wishlist, inquiry/cart, RFQs, quotations, orders, messages, notifications, and reviews.
- Products belong to categories and suppliers and already support B2B fields such as MOQ, supply ability, lead time, packaging, port, featured/trending status, images, reviews, wishlist, and supplier product management.

## 9. Existing Messaging and Notification Structure

- Messaging tables/models: `conversations`, `messages`.
- Messaging APIs support conversation list/create/detail, message send, and mark read.
- Frontend pages support message list and conversation detail.
- Notifications table/model supports typed notifications, reference entities, read state, templates/channels, list and mark-read APIs, and a notification center in the frontend.

## 10. Existing Admin Module Structure

Admin is currently backend/API focused:

- Dashboard metrics.
- User list/detail/status management.
- Supplier list/detail/verification.
- Product list/detail/status/delete.
- RFQs, quotations, orders, messages.
- Horizon status, activity logs, system data, backups, maintenance mode.

No dedicated Next.js admin area was found in `frontend/src/app`; admin UI will likely need to be added or separated later.

## 11. Reusable Modules for SL Beauty Platform

- Laravel API foundation, Sanctum auth, resources, requests, policies, jobs, queues, OpenAPI documentation.
- Product catalogue, category, search, home, banners, trending products/keywords.
- Supplier/seller profile, verification, storefront/trust, certificates, uploads.
- RFQ, quotations, orders, messages, notifications, reviews, analytics, admin.
- Next.js product/supplier/search/cart/wishlist/order/message/dashboard pages.
- Existing B2B supplier dashboard and supplier product manager.

## 12. Modules to Rename for SL Beauty

Rename later, not during this audit:

- `EcomLanka`, Made in SL labels, and export marketplace copy to SL Beauty Platform copy.
- Public category/product copy from Sri Lankan general goods to beauty marketplace language.
- UI terms: supplier can become seller/brand/distributor where appropriate, but backend `suppliers` should remain initially.
- Buyer can become customer for B2C screens while preserving buyer terminology for B2B RFQ flows.
- Export-ready badges can become verified seller/authorized distributor badges for beauty contexts.

## 13. Modules to Extend for B2B + B2C Beauty Marketplace

- Product catalogue: beauty attributes, variants, SKU/barcode, shades/sizes, stock, retail price, sale price.
- Category taxonomy: skincare, hair care, makeup, fragrance, body care, natural/Ayurvedic, salon/professional, men’s grooming.
- Seller profile: brand owner, authorized distributor, importer, reseller, salon/professional supplier.
- Cart/order: separate B2C retail cart and checkout semantics from B2B inquiry cart/RFQ.
- Search/filter: brand, skin type, hair type, concern, ingredients, formulation, shade, SPF, volume, cruelty-free/vegan/organic.
- Admin: seller authorization, product claim review, counterfeit/expired/unsafe reporting, compliance queues.
- Frontend: consumer storefront, beauty filters, product variants, checkout, order tracking, brand/store pages.

## 14. Modules to Keep Unchanged Initially

- Existing route names and current API behavior.
- Existing table names and existing migrations.
- Sanctum auth and role/permission foundation.
- RFQ, quotation, B2B order, supplier dashboard, messaging, notification, upload, admin, analytics modules.
- Existing frontend pages until equivalent beauty flows are added and verified.

## 15. B2B Modules to Preserve

- RFQ creation and supplier RFQ matching/listing.
- Supplier quotation submission and buyer quotation comparison/accept/reject.
- Supplier profile, certificates, production capacity, storefront/trust, verification.
- B2B messaging with buyer/supplier/trade context.
- MOQ, lead time, supply ability, payment/shipping terms, packaging, port, destination country.
- Admin moderation and analytics for B2B trade.

## 16. B2C Modules to Add

- Retail product variants and inventory.
- Consumer cart independent from inquiry cart.
- Checkout, payment transaction, address book, shipment tracking, cancellation, returns/refunds.
- Consumer order history and verified-purchase reviews.
- Brand storefronts and beauty seller storefronts.
- Promotions, coupons, bundles, campaigns, back-in-stock notifications.
- Product reporting for counterfeit, expired, unsafe, unauthorized, or misleading beauty products.

## 17. Beauty-Specific Database Changes Required

Recommended additive schema changes:

- `brands` table.
- Product variant table for shade, size, SKU, barcode, stock, retail price, sale price.
- Beauty product profile table or JSON profile for skin type, hair type, concern, ingredients, formulation, SPF, shade, color family, scent, volume/weight, usage notes.
- Seller brand authorization table with supplier, brand, territory, document upload, expiry, verification status.
- Retail carts/cart items if current `inquiry_carts` remains B2B.
- Addresses, shipments, payment transactions, refunds/returns.
- Compliance fields for ingredients, allergens, batch number, expiry date, import authorization, regulatory/certificate references, cruelty-free/vegan/organic flags.
- Product claim moderation table/status for SPF, whitening, acne, medical, organic, Ayurvedic, and other regulated claims.

## 18. Beauty Category Conversion Plan

- Preserve current category table and add beauty categories non-destructively.
- Seed top-level categories: Skin Care, Hair Care, Makeup, Fragrance, Body Care, Natural/Ayurvedic Beauty, Professional/Salon Supplies, Men’s Grooming.
- Add subcategories for cleansers, moisturizers, serums, sunscreen, shampoo, conditioner, treatments, face/lip/eye makeup, nail care, perfumes, body wash, lotion, scrubs, salon tools.
- Map reusable Made in SL categories carefully: Ayurvedic Oil to Natural/Ayurvedic Beauty; Coconut Oil to Hair Care or Natural/Ayurvedic Beauty depending on product use.
- Mark old non-beauty categories inactive only after data migration and approval.
- Add category attribute templates for beauty-specific filters.

## 19. Seller/Brand/Distributor Verification Requirements

- Business registration and tax/VAT details where applicable.
- Owner/contact identity verification.
- Brand ownership proof or authorization letter.
- Distributor/importer agreement or invoice trail.
- Import permits and cosmetic compliance documents for imported products.
- Ingredient, expiry, batch, and safety documentation.
- Storage/fulfillment capability for expiry-sensitive beauty products.
- Counterfeit policy acceptance and takedown workflow.
- Admin review status, notes, expiry, and renewal reminders.

## 20. Implementation Roadmap

1. Baseline: keep this audit only, run status, confirm no code changes.
2. Branding/config: add SL Beauty naming behind config and copy changes.
3. Taxonomy: add beauty category seeders and category attribute templates.
4. Product model: add beauty profiles, variants, retail pricing, inventory.
5. Consumer commerce: add B2C cart, checkout, payment placeholders, address/shipping/order tracking.
6. Seller verification: add brand/distributor/authorization workflows.
7. Frontend conversion: update home, product listing/detail, search filters, cart/checkout, seller storefronts.
8. Admin/compliance: add moderation queues, claim review, counterfeit reports, seller verification dashboards.
9. B2B preservation: regression test RFQ, quotations, supplier dashboard, messaging, orders.

## 21. Risk List Before Conversion

- Parent folder `/Users/techromz/SL Beauty Platform` is not the git repo; actual repo is nested at `sl-beauty-platform`.
- B2B RFQ/order semantics can be broken if supplier/buyer/product naming is changed too early.
- Retail checkout/payment introduces transactional requirements not covered by RFQ-led commerce.
- Product variants and stock can conflict with the current simple product/MOQ model if added directly instead of additively.
- Beauty compliance and counterfeit risk is higher than the existing general B2B marketplace.
- Existing admin is API-heavy; admin UI gaps must be planned.
- Existing frontend has B2B pages that may need copy and UX conversion without losing supplier workflows.
- Category conversion can damage seed/product assumptions if old categories are deleted.
- Role mapping must handle admin/staff/buyer/supplier plus B2C consumer roles.

## 22. Recommended First Coding Task After Audit

Recommended first coding task: add a non-destructive SL Beauty taxonomy and branding foundation.

Acceptance criteria:

- Add configuration/constants for SL Beauty naming without removing Made in SL compatibility in routes or schema.
- Add beauty category seeders and category attribute templates.
- Do not rename backend tables or existing API routes.
- Do not remove B2B RFQ, quotation, supplier dashboard, or admin behavior.
- Run backend and frontend baseline checks after the first functional change.
