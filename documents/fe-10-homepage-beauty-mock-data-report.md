# FE-10 Homepage Beauty Mock Data Report

Date: 2026-07-05  
Branch: `feature/sl-beauty-frontend-foundation`

## Summary

Replaced homepage-safe mock/fallback data with SL Beauty focused beauty categories, product examples, image placeholders, and seller wording. The update keeps the existing homepage structure and backend data flow intact while improving what appears when backend homepage/product data is missing.

## Files Changed

| File | Change summary |
| --- | --- |
| `frontend/src/lib/constants.js` | Replaced category-like trending mock data with beauty product fallback data and updated `You May Like`, category labels, image placeholders, and seller wording. |
| `frontend/src/components/home/TrendingProducts.jsx` | Uses `TRENDING_PRODUCTS` as a fallback when backend trending products are empty and updates fallback product names/copy. |
| `frontend/src/app/page.jsx` | Updates homepage fallback subtitles to mention verified beauty brands, authorized sellers, retailers, distributors, and specific beauty product types. |
| `frontend/src/components/home/ExportCategorySection.jsx` | Tightens homepage-safe category/seller wording around authorized retailers, sellers, and distributors. |
| `documents/fe-10-homepage-beauty-mock-data-report.md` | This report. |

## Mock / Fallback Data Added

Beauty category coverage now includes:

- Skincare
- Makeup
- Haircare
- Fragrance
- Bath & Body
- Wellness
- Beauty Tools
- Luxury Beauty
- K-Beauty
- Men’s Grooming

Product fallback examples now include:

- Gentle Hydrating Cleanser
- Vitamin C Brightening Serum
- SPF 50 Daily Sunscreen
- Long Wear Matte Lipstick
- Bond Repair Shampoo
- Signature Eau de Parfum
- Soft Glow Body Lotion
- Pore Care Clay Face Mask
- Nourishing Hair Oil
- Essential Beauty Tools Set

Seller/marketplace wording now emphasizes:

- Verified beauty brands
- Authorized sellers
- Retailers
- Distributors

## Image Placeholder Notes

Updated fallback images use beauty-relevant `placehold.co` URLs with product-specific labels such as `Cleanser`, `Serum`, `SPF 50`, `Lipstick`, `Shampoo`, `Perfume`, `Body Lotion`, `Face Mask`, `Hair Oil`, and `Beauty Tools`.

## What Was Intentionally Not Changed

- No backend files.
- No routes, migrations, or seeders.
- No checkout, cart, payment, or order behavior.
- No supplier/admin/private APIs.
- No dashboard, RFQ, quotation, messaging, notification, admin, or existing B2B module behavior.
- No `.env` files.
- No deep homepage redesign.
- Existing backend-powered homepage sections still prefer live backend data when available.

## Test / Check Result

Command run from `frontend/`:

```text
npm run lint
```

Result:

```text
✔ No ESLint warnings or errors
```

## Notes

A targeted search of the homepage-safe scope found no remaining tea, cinnamon, coconut, Ceylon, export-ready, or export-product mock/fallback wording after this update.
