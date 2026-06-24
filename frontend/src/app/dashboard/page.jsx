'use client';

/**
 * app/dashboard/page.jsx
 *
 * Fix: dashboard actions now based on REAL user data and saved items from API.
 */

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Package, Heart, FileText, MessageSquare, Settings, Bell, Star, TrendingUp, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { userApi, wishlistApi, rfqApi } from '@/lib/api';
import { initials, formatCurrency } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const TABS = ['Overview', 'Orders', 'RFQs', 'Wishlist', 'Messages'];

function validWishlistItems(items) {
  return Array.isArray(items)
    ? items.filter((wishlist) => wishlist?.id && wishlist?.product?.id)
    : [];
}

export default function DashboardPage() {
  // ✅ FIX: uses real user from AuthContext (not hardcoded)
  const { user, isSupplier } = useAuth();

  const [activeTab,  setActiveTab]  = useState('Overview');
  const [dashboard,  setDashboard]  = useState(null);
  const [wishlist,   setWishlist]   = useState([]);
  const [rfqs,       setRfqs]       = useState([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // ✅ FIX: fetch real dashboard data from API
        const [dash, wl, rfqList] = await Promise.allSettled([
          userApi.dashboard(),
          wishlistApi.get(),
          rfqApi.list(),
        ]);
        if (dash.status === 'fulfilled')    setDashboard(dash.value);
        if (wl.status === 'fulfilled')      setWishlist(validWishlistItems(wl.value?.items));
        if (rfqList.status === 'fulfilled') setRfqs(rfqList.value?.data || []);
      } catch {
        // silently use empty states — data shown from auth user at minimum
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = [
    { label: 'Total Orders',    value: dashboard?.orders_count   ?? '—', icon: Package,      color: 'text-blue-600',   bg: 'bg-blue-50' },
    { label: 'Active RFQs',     value: dashboard?.rfqs_count     ?? '—', icon: FileText,     color: 'text-amber-600',  bg: 'bg-amber-50' },
    { label: 'Wishlist Items',  value: wishlist.length           || '—', icon: Heart,        color: 'text-rose-600',   bg: 'bg-rose-50' },
    { label: 'Messages',        value: dashboard?.messages_count ?? '—', icon: MessageSquare,color: 'text-primary-600',bg: 'bg-primary-50' },
  ];

  const quickLinks = [
    { label: 'Browse Products', href: '/products', icon: TrendingUp },
    { label: 'Post an RFQ',     href: '/rfq',      icon: FileText },
    { label: 'My Suppliers',    href: '/suppliers', icon: Star },
    { label: 'Account Settings',href: '/settings', icon: Settings },
  ];

  if (loading) {
    return (
      <>
        <Header />
        <LoadingSpinner label="Loading dashboard…" />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {/* ── Profile header ── */}
        <div className="bg-gradient-to-r from-primary-800 to-primary-600 rounded-2xl p-6 text-white mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {initials(user?.name || 'U')}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold">{user?.name || 'Welcome back!'}</h1>
            <p className="text-primary-100 text-sm">{user?.email}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="badge-pill bg-white/20 text-white text-[11px]">
                {isSupplier ? '📦 Supplier' : '🛒 Buyer'}
              </span>
              {user?.company && (
                <span className="badge-pill bg-white/20 text-white text-[11px]">{user.company}</span>
              )}
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Link href="/settings" className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg flex items-center gap-1.5 transition-colors">
              <Settings size={14} /> Settings
            </Link>
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} className={color} />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800">{value}</div>
                <div className="text-xs text-gray-400">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex items-center gap-1 border-b border-gray-200 mb-5 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-primary-700 text-primary-800'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Tab content ── */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Quick links */}
            <div className="lg:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 mb-3">Quick Actions</h2>
              <div className="space-y-2">
                {quickLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 group transition-colors"
                  >
                    <Icon size={18} className="text-primary-700" />
                    <span className="flex-1 text-sm text-gray-700">{label}</span>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent RFQs */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-800">Recent RFQs</h2>
                <Link href="/rfq" className="text-xs text-primary-700 hover:underline">View All</Link>
              </div>
              {rfqs.length === 0 ? (
                <div className="text-center py-8">
                  <FileText size={32} className="text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No RFQs yet</p>
                  <Link href="/rfq" className="mt-3 inline-block text-sm text-primary-700 hover:underline">
                    Post your first RFQ →
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {rfqs.slice(0, 5).map((rfq) => (
                    <div key={rfq.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <div>
                        <div className="text-sm font-medium text-gray-700">{rfq.product_name || rfq.title}</div>
                        <div className="text-xs text-gray-400">{rfq.created_at}</div>
                      </div>
                      <span className={`badge-pill text-[11px] ${
                        rfq.status === 'open'   ? 'bg-green-100 text-green-700' :
                        rfq.status === 'closed' ? 'bg-gray-100 text-gray-500'  :
                                                  'bg-amber-100 text-amber-700'
                      }`}>
                        {rfq.status || 'Open'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'Orders' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
            <Package size={36} className="text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-500 mb-1">
              {dashboard?.orders_count ? `You have ${dashboard.orders_count} orders.` : 'Track every order from request to delivery.'}
            </p>
            <Link href="/orders" className="mt-3 inline-block text-sm font-medium text-primary-700 hover:underline">
              Go to My Orders →
            </Link>
          </div>
        )}

        {activeTab === 'Messages' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
            <MessageSquare size={36} className="text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-500 mb-1">
              {dashboard?.messages_count ? `You have ${dashboard.messages_count} unread messages.` : 'Chat directly with suppliers about your inquiries.'}
            </p>
            <Link href="/messages" className="mt-3 inline-block text-sm font-medium text-primary-700 hover:underline">
              Open Messages →
            </Link>
          </div>
        )}

        {activeTab === 'Wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <Heart size={40} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Your wishlist is empty</p>
                <Link href="/products" className="mt-3 inline-block text-sm text-primary-700 hover:underline">
                  Browse Products →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {wishlist.map((item) => (
                  <Link key={item.id} href={`/products/${item.product.id}`} className="bg-white rounded-xl border border-gray-100 p-3 hover-lift block">
                    <Image
                      src={item.product.featured_image || 'https://placehold.co/120x120/f0fdf4/155e2c?text=Product'}
                      alt={item.product.name}
                      width={120}
                      height={120}
                      unoptimized
                      className="w-full aspect-square object-cover rounded-lg mb-2"
                    />
                    <div className="text-sm font-medium text-gray-700 line-clamp-2">{item.product.name}</div>
                    <div className="text-primary-700 font-bold text-sm mt-1">{formatCurrency(item.product.price)}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'RFQs' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">My RFQs</h2>
              <Link href="/rfq/new" className="px-4 py-2 bg-primary-800 text-white text-sm rounded-lg hover:bg-primary-700">
                + New RFQ
              </Link>
            </div>
            {rfqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm">No RFQs submitted yet</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Product', 'Qty', 'Submitted', 'Responses', 'Status'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rfqs.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{r.product_name || r.title}</td>
                      <td className="px-4 py-3 text-gray-500">{r.quantity} {r.unit}</td>
                      <td className="px-4 py-3 text-gray-400">{r.created_at}</td>
                      <td className="px-4 py-3 text-gray-600">{r.responses_count || 0}</td>
                      <td className="px-4 py-3">
                        <span className={`badge-pill ${r.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {r.status || 'Open'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
