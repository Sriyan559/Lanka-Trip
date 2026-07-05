# FE-13 Public Beauty Display Cleanup Report

Date: 2026-07-05  
Branch: `feature/sl-beauty-frontend-foundation`

## Summary

Converted the public homepage and product browsing display scope to SL Beauty-only products, categories, brand/seller wording, and beauty-relevant image URLs. The public product listing and product detail pages now use frontend SL Beauty display data instead of legacy Made in SL catalog data while backend beauty product seed data is still pending.

## Files Changed

| File | Change summary |
| --- | --- |
| `frontend/src/lib/constants.js` | Expanded beauty product display data to 16 products and replaced text placeholders with beauty-focused Unsplash image URLs. |
| `frontend/src/lib/products.js` | Replaced the generic product fallback image with a beauty-relevant image URL. |
| `frontend/src/app/page.jsx` | Kept FE-12 forced beauty display behavior and replaced category/product fallback images with beauty images. |
| `frontend/src/app/products/page.jsx` | Updated page metadata title to SL Beauty products. |
| `frontend/src/app/products/ProductsContent.jsx` | Forced product listing, search, sorting, pagination, category filters, brand filters, and active chips to use beauty-only display data. |
| `frontend/src/app/products/[id]/page.jsx` | Converted public product detail display to read-only beauty product data from constants and removed RFQ/export-style product detail copy. |
| `frontend/src/components/home/CategoryGridSection.jsx` | Replaced text placeholder fallback image with a beauty image fallback. |
| `frontend/src/components/home/TrendingProducts.jsx` | Replaced text placeholder fallback image with beauty image fallbacks. |
| `frontend/src/components/home/VerifiedSuppliers.jsx` | Replaced text placeholder logo fallback with a beauty image fallback. |
| `frontend/src/components/home/YouMayLike.jsx` | Replaced text placeholder fallback image with a beauty image fallback. |
| `frontend/src/components/product/B2BProductCard.jsx` | Allows beauty display data to show original-brand badges without export flags and formats range prices through the shared currency formatter. |
| `frontend/src/components/product/ProductCard.jsx` | Replaced text placeholder fallback image and changed public quantity wording from minimum-order language. |

## Beauty Categories Now Used

- Makeup
- Skincare
- Haircare
- Fragrance
- Bath & Body
- Wellness
- Beauty Tools
- Luxury Beauty
- K-Beauty
- Men’s Grooming
- Gift Sets
- Sale & Offers
- New Arrivals

## Beauty Products Now Used

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
- Rose Glow Blush Palette
- Retinol Night Cream
- Micellar Cleansing Water
- Hydrating Sheet Mask
- Brow Definer Pencil
- Makeup Brush Collection

## Public Display Cleanup

- Removed public product listing dependency on legacy Made in SL product API data for now.
- Replaced public product category filters with SL Beauty category constants.
- Replaced public brand/seller filter data with verified beauty brands.
- Replaced public product detail data with beauty-only display data matched by product slug.
- Replaced text placeholder product/category images with beauty-relevant remote image URLs.
- Removed public product detail RFQ-style CTA copy and changed it to seller contact wording.

## What Was Intentionally Not Changed

- No backend files.
- No routes, migrations, seeders, or database changes.
- No supplier/admin/private APIs.
- No checkout, cart, payment, or order behavior.
- No dashboard, RFQ, quotation, supplier, buyer, admin, or internal B2B workflow changes.
- No `.env` files.
- No deep redesign of the public layout.

## Search Check Results

Command run from repo root:

```text
grep -R "Ceylon\|Cinnamon\|Coconut\|Sapphire\|Rubber Gloves\|Batik\|Spices\|Export Grade\|export-ready" frontend/src/app/page.jsx frontend/src/app/products frontend/src/components/home frontend/src/components/product frontend/src/lib/constants.js frontend/src/lib/slBeautyConfig.js
```

Result:

```text
No matches found.
```

Additional public-scope scan for placeholder image URLs and RFQ/supplier display labels also returned no matches in the checked public browsing scope.

## Lint Result

Command run from `frontend/`:

```text
npm run lint
```

Result:

```text
✔ No ESLint warnings or errors
```

## Risks and Rollback Notes

The public product listing and public product detail pages are temporarily display-data driven. This prevents old Made in SL catalog content from showing publicly, but it also means live backend product listing data is not shown on these public screens until SL Beauty backend product/category seed data is ready. Rollback is straightforward by restoring API-driven product loading in `ProductsContent.jsx` and `products/[id]/page.jsx`.
