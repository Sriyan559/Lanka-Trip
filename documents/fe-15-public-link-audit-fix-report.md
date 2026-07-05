# FE-15 Public Link Audit Fix Report

Date: 2026-07-05  
Branch: `feature/sl-beauty-frontend-foundation`

## Summary

Audited public customer-facing storefront links in header, footer, homepage components, product cards, product detail, category pages, brands pages, and shared constants. Fixed broken or stale public links by routing storefront users to safe SL Beauty pages and added a public `/gift-cards` page so the top menu no longer lands on a 404.

## Broken or Risky Links Found

| Link / behavior | Location | Fix |
| --- | --- | --- |
| `/gift-cards` returned 404 | Header nav | Created `frontend/src/app/gift-cards/page.jsx`. |
| Header search routed to `/search` | `Header.jsx` | Redirects searches to `/products?q=...`. |
| Footer app buttons pointed to `/apps` | `Footer.jsx` | Replaced with safe `/products` and `/brands` links. |
| Footer policy/about links used stale catch-all pages | `Footer.jsx`, `constants.js` | Replaced with safe public storefront links such as `/help-center`, `/brands`, `/gift-cards`, `/products`, and category pages. |
| Product cards linked brand/seller names to `/suppliers/...` | `B2BProductCard.jsx` | Public brand links now route to `/brands`. |
| Product detail linked brand profile to `/suppliers/...` | `products/[id]/page.jsx` | Replaced with `/brands`. |
| Home components linked to `/partners`, `/suppliers`, `/trade-shows`, `/categories`, or `/search` | Home components | Replaced with safe `/brands`, `/products`, and `/products?q=...` routes. |
| Brand detail page included public RFQ wording in read-only note | `brands/[slug]/page.jsx` | Reworded to customer-safe read-only copy without RFQ/quotation terms. |

## Pages Created

- `frontend/src/app/gift-cards/page.jsx`

The page is public, read-only, SL Beauty branded, and includes:

- `Shop Beauty Products` → `/products`
- `Browse Brands` → `/brands`

## Files Changed

| File | Change summary |
| --- | --- |
| `frontend/src/app/gift-cards/page.jsx` | Added public SL Beauty gift cards coming-soon page. |
| `frontend/src/components/layout/Header.jsx` | Updated search and top nav links to safe product/category/brand/gift-card routes. |
| `frontend/src/components/layout/Footer.jsx` | Replaced app/catch-all/footer links with safe public storefront links. |
| `frontend/src/lib/constants.js` | Updated footer link constants to safe SL Beauty routes. |
| `frontend/src/components/product/B2BProductCard.jsx` | Changed public brand link target from old supplier pages to `/brands`. |
| `frontend/src/app/products/[id]/page.jsx` | Changed brand profile link to `/brands`. |
| `frontend/src/app/brands/[slug]/page.jsx` | Removed public RFQ/quotation wording from read-only notice. |
| `frontend/src/components/home/CategorySidebar.jsx` | Changed missing `/categories` link to `/products`. |
| `frontend/src/components/home/EasySourcingSection.jsx` | Changed `/partners` link to `/brands`. |
| `frontend/src/components/home/ExportCategorySection.jsx` | Changed partner/search fallbacks to `/brands` and `/products?q=...`. |
| `frontend/src/components/home/TradeShows.jsx` | Changed old trade-show links to product browsing. |
| `frontend/src/components/home/TrendingKeywords.jsx` | Changed `/search?q=...` to `/products?q=...`. |
| `frontend/src/components/home/VerifiedSuppliers.jsx` | Changed old supplier/partner/message links to safe brand/product routes. |
| `frontend/src/components/home/YouMayLike.jsx` | Changed `/search?q=...` fallback to `/products?q=...`. |

## Verification

Confirmed route file exists:

```text
frontend/src/app/gift-cards/page.jsx
```

Targeted public link/wording scan:

```text
rg -n 'href="/(apps|partners|suppliers|rfq|trade-shows|about|careers|advertise|faq|contact|shipping|returns|complaints|terms|privacy|cookies)\b|/search\?|Request Quote|Post an RFQ|RFQ|EcomLanka|Sri Lankan exporters|export marketplace' frontend/src/components/layout frontend/src/components/home frontend/src/components/product frontend/src/app/page.jsx frontend/src/app/products frontend/src/app/categories frontend/src/app/brands frontend/src/app/gift-cards frontend/src/lib/constants.js frontend/src/lib/slBeautyConfig.js
```

Result:

```text
No matches found.
```

## Lint Result

Command run from `frontend/`:

```text
npm run lint
```

Result:

```text
✔ No ESLint warnings or errors
```

## What Was Intentionally Not Changed

- No backend files.
- No routes, migrations, seeders, or database changes.
- No supplier/admin/private APIs.
- No checkout, cart, payment, or order behavior.
- No dashboard, RFQ, quotation, supplier, buyer, admin, or internal B2B workflow changes.
- No `.env` files.
- No deep redesign.
