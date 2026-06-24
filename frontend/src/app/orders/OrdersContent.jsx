'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Package, Truck, CheckCircle2, Clock, XCircle, ChevronRight, ShoppingBag } from 'lucide-react';
import { userApi } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const STATUS_TABS = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const STATUS_META = {
  Pending:    { icon: Clock,        color: 'text-amber-600',  bg: 'bg-amber-50' },
  Processing: { icon: Package,      color: 'text-blue-600',   bg: 'bg-blue-50' },
  Shipped:    { icon: Truck,        color: 'text-primary-700',bg: 'bg-primary-50' },
  Delivered:  { icon: CheckCircle2, color: 'text-green-600',  bg: 'bg-green-50' },
  Cancelled:  { icon: XCircle,      color: 'text-red-500',    bg: 'bg-red-50' },
};

const MOCK_ORDERS = [
  { id: 'ECL-20260512-001', supplier: 'Lanka Tea Exports (Pvt) Ltd.', product: 'Premium BOPF Black Tea 500g', quantity: '200 Kg', total: 2400, status: 'Shipped',    date: '2026-05-12', image: 'https://placehold.co/64x64/e8f5e9/155e2c?text=Tea' },
  { id: 'ECL-20260428-002', supplier: 'Gem Palace LK',                product: 'Blue Sapphire 3ct (Certified)', quantity: '4 pcs',   total: 1800, status: 'Processing', date: '2026-04-28', image: 'https://placehold.co/64x64/e8eaf6/1a237e?text=Gem' },
  { id: 'ECL-20260402-003', supplier: 'Coco Lanka Ltd.',               product: 'Virgin Coconut Oil 5L',         quantity: '100 units', total: 1500, status: 'Delivered', date: '2026-04-02', image: 'https://placehold.co/64x64/fff9c4/f57f17?text=Coco' },
  { id: 'ECL-20260318-004', supplier: 'Spice Garden Export',           product: 'Cinnamon Sticks 1kg',           quantity: '300 Kg', total: 2400, status: 'Delivered', date: '2026-03-18', image: 'https://placehold.co/64x64/fbe9e7/bf360c?text=Spice' },
  { id: 'ECL-20260225-005', supplier: 'Rubber Works LK',                product: 'Industrial Rubber Sheets',     quantity: '50 rolls', total: 1100, status: 'Cancelled', date: '2026-02-25', image: 'https://placehold.co/64x64/f3e5f5/4a148c?text=Rubber' },
  { id: 'ECL-20260201-006', supplier: 'Batik Arts Lanka',               product: 'Hand Batik Sarong (Mixed Set)', quantity: '60 pcs', total: 2100, status: 'Pending',    date: '2026-02-01', image: 'https://placehold.co/64x64/fce4ec/880e4f?text=Batik' },
];

export default function OrdersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get('status') || 'All';

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await userApi.orders();
        setOrders(data.data || data.orders || []);
      } catch {
        setOrders(MOCK_ORDERS);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = status === 'All' ? orders : orders.filter((o) => o.status === status);

  if (loading) return <LoadingSpinner label="Loading your orders…" />;

  return (
    <div>
      {/* Status tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200 mb-5 overflow-x-auto">
        {STATUS_TABS.map((t) => (
          <button
            key={t}
            onClick={() => router.push(`/orders${t === 'All' ? '' : `?status=${t}`}`)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              status === t ? 'border-primary-700 text-primary-800' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
            {t !== 'All' && (
              <span className="ml-1.5 text-xs text-gray-400">
                ({orders.filter((o) => o.status === t).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <ShoppingBag size={48} className="text-gray-200 mx-auto mb-3" />
          <h2 className="text-gray-500 font-medium">No {status !== 'All' ? status.toLowerCase() : ''} orders found</h2>
          <Link href="/products" className="mt-3 inline-block text-sm text-primary-700 hover:underline">
            Browse Products →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const meta = STATUS_META[order.status] || STATUS_META.Pending;
            const Icon = meta.icon;
            return (
              <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
                <Image
                  src={order.image || 'https://placehold.co/64x64/f0fdf4/155e2c?text=Order'}
                  alt={order.product}
                  width={64}
                  height={64}
                  unoptimized
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-gray-400">{order.id}</span>
                    <span className={`badge-pill ${meta.bg} ${meta.color}`}>
                      <Icon size={11} /> {order.status}
                    </span>
                  </div>
                  <h3 className="font-medium text-sm text-gray-800 mt-1 line-clamp-1">{order.product}</h3>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {order.supplier} · Qty: {order.quantity} · Ordered {order.date}
                  </div>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-1 flex-shrink-0">
                  <div className="font-bold text-gray-800">{formatCurrency(order.total)}</div>
                  <button className="text-xs text-primary-700 hover:underline flex items-center gap-0.5">
                    Track Order <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
