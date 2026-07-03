# Demo Integration Checklist

Use this checklist from the local backend project unless a command explicitly says otherwise.

Backend path:

```bash
cd /Users/techromz/Made-In-SL/ecom-in-sri-lanka/backend
```

Frontend path:

```bash
cd /Users/techromz/Made-In-SL/ecom-in-sri-lanka/frontend
```

## Start Commands

Reset and seed the PostgreSQL database:

```bash
php artisan migrate:fresh --seed
```

Start the Laravel API:

```bash
CACHE_STORE=array QUEUE_CONNECTION=sync SESSION_DRIVER=file php artisan serve --host=127.0.0.1 --port=8000
```

Start the Next.js frontend:

```bash
npm run dev
```

The runtime cache/session overrides avoid requiring Redis for the local demo. If Redis is running locally and configured correctly, the normal `php artisan serve --host=127.0.0.1 --port=8000` command can also be used.

## Demo URLs

- Frontend home: `http://localhost:3000`
- Product listing: `http://localhost:3000/products`
- Product detail example: `http://localhost:3000/products/1`
- Supplier listing: `http://localhost:3000/suppliers`
- Supplier profile example: `http://localhost:3000/suppliers/3`
- Buyer dashboard: `http://localhost:3000/dashboard`
- Supplier dashboard: `http://localhost:3000/supplier-dashboard`
- Login: `http://localhost:3000/login`
- Backend health check: `http://127.0.0.1:8000/api/health`

## Demo Accounts

- Buyer: `buyer.maldives@madeinsl.demo` / `DemoPassword123!`
- Supplier: `supplier.demo@madeinsl.demo` / `DemoPassword123!`
- Admin / staff: `admin.demo@madeinsl.demo` / `DemoPassword123!`

## Working Demo Flows

- Homepage loads banners, categories, featured products, recommendations, and verified suppliers from the Laravel API.
- Category and product listing pages load backend products and filters.
- Product detail pages load backend product, supplier, image, and B2B trade data.
- Supplier listing and supplier storefront pages load backend supplier data.
- Buyer login validates against the backend and opens authenticated dashboard data.
- Buyer flows have seeded wishlist, RFQ, conversation, quotation, and order context.
- Supplier login validates against the backend and opens RFQ, quotation, order, and product dashboard data.
- API endpoints are backed by PostgreSQL seed data, including Maldives-relevant demo buyer and Sri Lankan supplier examples.

## API Smoke Targets

Public:

- `GET /api/categories`
- `GET /api/categories/trending`
- `GET /api/products`
- `GET /api/products/{id}`
- `GET /api/home/recommendations`
- `GET /api/home/featured-products`
- `GET /api/home/verified-suppliers`
- `GET /api/suppliers`
- `GET /api/suppliers/{id}`
- `GET /api/suppliers/{id}/products`

Authentication:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

Authenticated buyer/supplier:

- `GET /api/rfqs`
- `GET /api/cart`
- `GET /api/wishlist`
- `GET /api/conversations`
- `GET /api/messages`
- `GET /api/supplier/rfqs`
- `GET /api/supplier/quotations`
- `GET /api/orders`
- `GET /api/supplier/products`

## Demo Data Highlights

- Maldives buyer profile: `Atoll Resorts Procurement Pvt Ltd`
- Verified supplier: `Serendib Resort Supplies (Pvt) Ltd`
- Demo sectors: Ceylon tea, coconut wellness products, cinnamon and spices, apparel/textiles, handicrafts, resort packaging, and ayurvedic products.
- Seeded B2B fields include FOB pricing, MOQ, lead time, port, supply ability, certificates, company profile, RFQ, quotation, order, messages, wishlist, and stable product images.

## Known Limitations

- The default local backend configuration expects Redis for cache/rate limiting. Use the backend start command above for a Redis-free demo run, or start Redis locally.
- Some secondary, non-demo-critical frontend pages still contain mock presentation data, including selected trade-show, compare, review, tracking, and invoice-style pages.
- `php artisan migrate:fresh --seed` deletes local data. Use it only for local/demo environments, never production.
- PHP 8.5 may show non-blocking PDO deprecation warnings from framework database configuration.
- API smoke tests that use POST routes create local records. Run `php artisan migrate:fresh --seed` again if you need a pristine demo state.

## Pre-Demo Checklist

- Confirm `.env` exists locally and is not committed.
- Run `php artisan migrate:fresh --seed`.
- Run `php artisan migrate:status`.
- Confirm database driver is `pgsql`.
- Start backend with the demo-safe command.
- Start frontend with `npm run dev`.
- Visit home, products, supplier profile, login, buyer dashboard, and supplier dashboard.
- Confirm product images render before screen sharing.
