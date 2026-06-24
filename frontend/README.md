# EcomLanka – Sri Lanka B2B Export Marketplace (Frontend)

> Stack: **Next.js 14 (App Router)** · **Tailwind CSS 3** · **React 18**
> Styled after Made-in-China.com · Backend: Laravel (connects via `src/lib/api.js`)

---

## Page Map

| Route                         | Purpose                                    |
|--------------------------------|---------------------------------------------|
| `/`                            | Homepage (hero, categories, trending, RFQ)  |
| `/products`                    | Product listing + filters                   |
| `/products/[id]`               | Product detail page                         |
| `/categories/[slug]`           | Category landing page                       |
| `/search`                      | Search results                               |
| `/suppliers`                   | Supplier directory                           |
| `/suppliers/[id]`              | Supplier storefront / profile page (NEW)     |
| `/rfq`                         | Post a Request for Quotation (guest + auth)  |
| `/cart`                        | Inquiry basket (guest + auth)                |
| `/login` `/register` `/forgot-password` | Auth flows                          |
| `/dashboard`                   | Buyer account home (Overview/Orders/RFQs/Wishlist/Messages) |
| `/orders`                      | Order list + status tracking (NEW)           |
| `/messages`                    | Supplier inbox — conversation list + thread (NEW) |
| `/wishlist`                    | Saved products (NEW)                         |
| `/settings`                    | Profile / Company / Security / Notifications (NEW) |
| `/about`, `/faq`, `/contact`, `/terms`, `/privacy`, `/secured-trading`, etc. | Static info pages via `[...slug]` catch-all |

Every data-driven page calls a `lib/api.js` endpoint first and falls back to in-file mock data if the Laravel backend isn't reachable yet — so the whole site is fully click-through-able today, and pages light up with real data automatically once each endpoint is live.

---

## Setup

```bash
npm install
cp .env.example .env.local   # point NEXT_PUBLIC_API_URL at your Laravel API
npm run dev                  # http://localhost:3000
```

```bash
npm run build   # production build
npm run lint    # eslint
```

---

## Backend integration

- All HTTP calls go through `src/lib/api.js` (`api.get/post/put/delete`, plus typed helpers: `authApi`, `productsApi`, `categoriesApi`, `suppliersApi`, `cartApi`, `wishlistApi`, `rfqApi`, `userApi`).
- Auth token is stored in a cookie (`_el_tok` by default, configurable via `NEXT_PUBLIC_AUTH_COOKIE`) and sent as `Authorization: Bearer ...`.
- Guest cart is persisted in `localStorage` and synced to the API automatically once a user logs in (see `CartContext.jsx`).
- `src/middleware.js` protects account-only routes (`/dashboard`, `/orders`, `/wishlist`, `/settings`, `/messages`, `/profile`). `/cart` and `/rfq` intentionally stay open to guests.
- Image domains are whitelisted in `next.config.mjs` — add your Laravel storage domain there when ready.

---

## Brand tokens (`tailwind.config.js`)

| Token         | Hex       | Used for                  |
|---------------|-----------|----------------------------|
| `primary-800` | `#155e2c` | Header, buttons, links     |
| `accent-500`  | `#f97316` | CTAs (RFQ, checkout)       |
| Page BG       | `#f8f9fa` | Body background            |

---

## Suggested next milestones

- Checkout / payment flow
- Supplier registration (multi-step, with document upload)
- Product comparison tool
- i18n (the language switcher in Header/Footer is UI-only today)
- Admin/supplier-side dashboard (separate from the buyer dashboard above)

---

*powered by techromzIT*
