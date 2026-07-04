'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Camera,
  Heart,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  ShoppingBasket,
  User,
  X,
} from 'lucide-react';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { notificationsApi } from '@/lib/api';
import { initials } from '@/lib/utils';

const BEAUTY_NAV = [
  { label: 'New', href: '/products?sort=new' },
  { label: 'Summer Sets Under $35', href: '/products?collection=summer-sets' },
  { label: 'Makeup', href: '/categories/makeup' },
  { label: 'Skincare', href: '/categories/skincare' },
  { label: 'Fragrance', href: '/categories/fragrance' },
  { label: 'Hair', href: '/categories/hair' },
  { label: 'Bath & Body', href: '/categories/bath-body' },
  { label: 'Mini Size', href: '/products?size=mini' },
  { label: 'Brands', href: '/brands' },
  { label: 'Gifts & Value Sets', href: '/products?collection=gifts-value-sets' },
  { label: 'Gift Cards', href: '/gift-cards' },
  { label: 'Sale & Offers', href: '/products?sale=1' },
];

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const { count: cartCount } = useCart();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    let cancelled = false;

    if (!isAuthenticated) {
      setUnreadNotifications(0);
      return undefined;
    }

    const loadUnread = async () => {
      try {
        const response = await notificationsApi.list({ per_page: 1 });
        if (!cancelled) {
          setUnreadNotifications(Number(response?.unread_count || 0));
        }
      } catch {
        if (!cancelled) setUnreadNotifications(0);
      }
    };

    loadUnread();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  useEffect(() => {
    const syncUnread = (event) => {
      setUnreadNotifications(Number(event.detail?.count || 0));
    };

    window.addEventListener('notifications:unread', syncUnread);
    return () => window.removeEventListener('notifications:unread', syncUnread);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = query.trim();
    if (!searchTerm) return;

    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleLogout = async () => {
    setAccountOpen(false);
    setMobileOpen(false);
    await logout();
    router.replace('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-3 px-4">
        <Link href="/" className="flex min-w-fit items-center gap-2" aria-label="SL Beauty Platform home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-black text-white">
            SL
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-base font-black tracking-normal text-black">SL Beauty</span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">Platform</span>
          </span>
        </Link>

        <form onSubmit={handleSearch} className="relative hidden min-w-0 flex-1 md:block">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search makeup, skincare, fragrance and brands"
            className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pl-11 pr-14 text-sm text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 transition hover:bg-white hover:text-black"
            aria-label="Visual search"
          >
            <Camera size={16} />
          </button>
        </form>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          <Link
            href="/messages"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-black"
            aria-label="Messages"
          >
            <MessageSquare size={19} />
          </Link>
          <Link
            href="/wishlist"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-black"
            aria-label="Wishlist"
          >
            <Heart size={19} />
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen((open) => !open)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-black"
              aria-label="Notifications"
            >
              <Bell size={19} />
              {unreadNotifications > 0 && (
                <span className="absolute right-1.5 top-1.5 min-w-[16px] rounded-full bg-red-500 px-1 text-center text-[10px] font-bold leading-4 text-white">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 top-12 w-[360px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                <NotificationCenter compact pageSize={5} />
              </div>
            )}
          </div>
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-black"
            aria-label="Cart"
          >
            <ShoppingBasket size={20} />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 min-w-[17px] rounded-full bg-black px-1 text-center text-[10px] font-bold leading-[17px] text-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          <div className="relative">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => setAccountOpen((open) => !open)}
                className="ml-1 flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-2 pr-3 text-sm font-semibold text-gray-800 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                  {initials(user?.name || user?.email || 'User')}
                </span>
                <span className="max-w-[120px] truncate">{user?.name || 'Account'}</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="ml-1 inline-flex h-10 items-center rounded-full bg-black px-5 text-sm font-bold text-white transition hover:bg-neutral-800"
              >
                Sign In
              </Link>
            )}

            {accountOpen && isAuthenticated && (
              <div className="absolute right-0 top-12 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-xl">
                <Link href="/dashboard" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Dashboard
                </Link>
                <Link href="/orders" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Orders
                </Link>
                <Link href="/settings" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Settings
                </Link>
                <button onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <nav className="bg-black text-white">
        <div className="mx-auto flex h-10 max-w-screen-xl items-center gap-1 overflow-x-auto px-4">
          {BEAUTY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex h-10 flex-shrink-0 items-center px-3 text-sm font-semibold text-white/88 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white shadow-lg md:hidden">
          <form onSubmit={handleSearch} className="p-4">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search beauty products"
                className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none focus:border-black focus:bg-white"
              />
            </div>
          </form>

          <div className="grid grid-cols-2 gap-1 px-4 pb-4">
            {BEAUTY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 border-t border-gray-100 p-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="rounded-lg bg-gray-50 px-3 py-2 text-center text-sm font-semibold text-gray-800">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="rounded-lg bg-black px-3 py-2 text-center text-sm font-bold text-white">
                  Sign In
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="rounded-lg border border-black px-3 py-2 text-center text-sm font-bold text-black">
                  Register
                </Link>
              </>
            )}
            <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="rounded-lg bg-gray-50 px-3 py-2 text-center text-sm font-semibold text-gray-800">
              Wishlist
            </Link>
            <Link href="/cart" onClick={() => setMobileOpen(false)} className="rounded-lg bg-gray-50 px-3 py-2 text-center text-sm font-semibold text-gray-800">
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
