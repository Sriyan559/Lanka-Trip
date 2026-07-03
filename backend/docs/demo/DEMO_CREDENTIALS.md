# Demo Credentials

These accounts are for local client demo use only. Do not reuse these passwords in production and do not store production secrets in the repository.

## Buyer Account

- Email: `buyer.maldives@madeinsl.demo`
- Password: `DemoPassword123!`
- Demo company: `Atoll Resorts Procurement Pvt Ltd`
- Use for: buyer login, product browsing, wishlist, inquiry basket, RFQ, conversations, and buyer dashboard.

## Supplier Account

- Email: `supplier.demo@madeinsl.demo`
- Password: `DemoPassword123!`
- Demo company: `Serendib Resort Supplies (Pvt) Ltd`
- Use for: supplier login, RFQ review, quotations, supplier dashboard, products, and order visibility.

## Admin / Staff Account

- Email: `admin.demo@madeinsl.demo`
- Password: `DemoPassword123!`
- Use for: admin or staff-supported flows if enabled in the current frontend/backend build.

## Notes

- Reset local demo data with `php artisan migrate:fresh --seed` from the backend directory.
- This file intentionally contains only local demo credentials.
- Never commit `.env`, production passwords, API keys, or customer credentials.
