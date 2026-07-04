# FE-02 Homepage Copy Foundation Report

Date: 2026-07-05  
Branch: `feature/sl-beauty-frontend-foundation`

## Summary

Added the first public frontend copy/config foundation for SL Beauty Platform. The changes keep backend APIs, routes, dashboards, RFQ modules, supplier modules, cart, checkout, payments, migrations, and seeders untouched. This pass only updates visible homepage-facing wording and shared frontend constants/config so the public homepage foundation reads as a Sri Lanka beauty marketplace instead of a Made in SL / export sourcing marketplace.

## Files Changed

| File | Change summary |
| --- | --- |
| `frontend/src/app/page.jsx` | Uses `SL_BEAUTY_DISPLAY_CONFIG` for metadata and updates homepage section fallback subtitles to beauty marketplace language. |
| `frontend/src/lib/slBeautyConfig.js` | Adds public description/audience text and aligns category slugs with the current beauty homepage taxonomy. |
| `frontend/src/lib/constants.js` | Reuses SL Beauty category slugs and updates featured card copy to authentic beauty / verified brand language. |
| `frontend/src/components/home/CategorySidebar.jsx` | Converts visible fallback/category sidebar wording from export sectors to beauty categories. |
| `frontend/src/components/home/YouMayLike.jsx` | Replaces the old RFQ fallback CTA with a shop-all-products CTA. |
| `frontend/src/components/home/ExportCategorySection.jsx` | Converts visible category cards and CTAs from export/RFQ sourcing to beauty marketplace categories and partner language. |
| `frontend/src/components/home/VerifiedSuppliers.jsx` | Converts visible supplier section wording to brand verified sellers, beauty suppliers, retailers, and partner language while keeping existing data fields compatible. |
| `frontend/src/components/home/EasySourcingSection.jsx` | Converts visible RFQ/sourcing copy to beauty discovery, partner discovery, and product search copy. |
| `frontend/src/components/home/SourcingSolutions.jsx` | Converts visible heading and fallback category groupings to beauty collections and partner services. |
| `frontend/src/components/home/TradeShows.jsx` | Converts visible EcomLanka/trade show wording to SL Beauty campaigns, brand weeks, and partner showcases. |
| `documents/fe-02-homepage-copy-foundation-report.md` | This implementation report. |

## What Was Added

- Shared display description for `SL_BEAUTY_DISPLAY_CONFIG`.
- Shared audience wording for shoppers, retailers, salons, beauty suppliers, brand partners, and distributors.
- Homepage metadata usage of SL Beauty display config.
- Beauty-focused public homepage fallback copy for:
  - skincare
  - haircare
  - fragrance
  - cosmetics
  - wellness
  - authentic beauty brands
  - brand verified sellers
  - B2B + B2C beauty marketplace positioning

## What Was Intentionally Not Changed

- Backend files.
- API routes.
- Database migrations.
- Seeders.
- Checkout/cart/payment behavior.
- Supplier dashboard behavior.
- Buyer dashboard behavior.
- RFQ, quotation, messaging, notification, order, product catalogue, admin, or analytics logic.
- New frontend API behavior.
- Component/file names that still reflect legacy naming, such as `ExportCategorySection`, because this task is copy/config foundation only.

## Safety Notes

- Existing homepage data flow through `getHomeSections()` remains unchanged.
- Existing product/category API usage remains unchanged.
- Existing supplier fields in homepage partner components remain available for compatibility with current backend responses.
- Dormant homepage components were updated only at the visible copy/fallback level, so if they are reintroduced later they will not bring old export marketplace wording back into the public homepage.

## Test / Check Results

Command run from `frontend/`:

```text
npm run lint
```

Result:

```text
✔ No ESLint warnings or errors
```

## Remaining Notes

- Legacy public routes outside this task still need a separate conversion pass, including RFQ, quotations, suppliers, static catch-all pages, invoices, order tracking, and supplier dashboard copy.
- Public brand/product API integration was intentionally not added in this task.
- A future cleanup should rename legacy frontend constants/components only after imports and route usage are stable.
