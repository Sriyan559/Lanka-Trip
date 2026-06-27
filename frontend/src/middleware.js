import { NextResponse } from 'next/server';
import { loginUrlFor } from './lib/authRedirect';

const COOKIE_NAME = process.env.NEXT_PUBLIC_AUTH_COOKIE || '_el_tok';

// Routes that require authentication
const PROTECTED = [
  '/dashboard',
  '/orders',
  '/wishlist',
  '/profile',
  '/settings',
  '/messages',
  '/checkout',
  '/order-success',
  '/notifications',
  '/quotations',
  '/compare',
  '/supplier-dashboard',
  '/company-verification',
];

// Routes that should redirect authenticated users away (login/register)
const AUTH_ONLY = [
  '/login',
  '/register',
];

function matchesRoute(pathname, route) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  // ── Protect dashboard/cart/etc ──────────────────────────
  const isProtected = PROTECTED.some((route) => matchesRoute(pathname, route));
  if (isProtected && !token) {
    const returnUrl = `${pathname}${request.nextUrl.search}`;
    const loginUrl = new URL(loginUrlFor(returnUrl), request.url);
    return NextResponse.redirect(loginUrl);
  }

  // ── Redirect logged-in users away from login/register ──
  const isAuthRoute = AUTH_ONLY.some((route) => matchesRoute(pathname, route));
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico
     * - public folder assets
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
  ],
};
