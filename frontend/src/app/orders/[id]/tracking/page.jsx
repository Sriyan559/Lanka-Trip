'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Truck, Package, CheckCircle2, Clock, MapPin,
  Plane, Ship, Warehouse, AlertCircle, ExternalLink,
} from 'lucide-react';
import { api } from '@/lib/api';

const MOCK_TRACKING = {
  order_id: 'ECL-20260621-001',
  carrier: 'SriLankan Cargo',
  tracking_no: 'SLC20260622-00412',
  service: 'Air Freight Export',
  origin:      { city: 'Colombo',          country: 'Sri Lanka', code: 'CMB' },
  destination: { city: 'Tokyo (Narita)',   country: 'Japan',     code: 'NRT' },
  eta: 'July 5, 2026',
  weight: '102 Kg',
  pieces: 4,
  status: 'In Transit',
  events: [
    { date: '2026-06-22', time: '09:00', location: 'Katunayake, LK',   event: 'Picked up from supplier',          icon: Package,     done: true },
    { date: '2026-06-22', time: '14:30', location: 'CMB Airport, LK',  event: 'Export customs cleared',           icon: CheckCircle2, done: true },
    { date: '2026-06-22', time: '18:45', location: 'CMB Airport, LK',  event: 'Departed Colombo (UL Cargo)',      icon: Plane,       done: true, highlight: true },
    { date: '2026-06-23', time: '06:00', location: 'Singapore (SIN)',  event: 'Transit hub — connection flight',  icon: Warehouse,   done: true },
    { date: '2026-06-23', time: '14:00', location: 'NRT Airport, JP',  event: 'Arrived Tokyo Narita',             icon: Plane,       done: false, current: true },
    { date: '2026-06-23', time: null,    location: 'Tokyo, JP',        event: 'Import customs clearance',        icon: Clock,       done: false },
    { date: '2026-07-05', time: null,    location: 'Tokyo, JP',        event: 'Delivered to buyer',               icon: CheckCircle2, done: false },
  ],
  documents: [
    { label: 'Airway Bill (AWB)',          no: 'AWB-262800-412',    status: 'Issued' },
    { label: 'Phytosanitary Certificate',  no: 'PHY-2026-04121',    status: 'Issued' },
    { label: 'Certificate of Origin',      no: 'CO-CMB-20260622',   status: 'Issued' },
    { label: 'Commercial Invoice',         no: 'INV-2026-0412',     status: 'Issued' },
    { label: 'Packing List',               no: 'PL-20260622-001',   status: 'Issued' },
  ],
};

export default function OrderTrackingPage() {
  const { id }     = useParams();
  const router     = useRouter();
  const [data,     setData]    = useState(null);
  const [loading,  setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await api.get(`/orders/${id}/tracking`);
        setData(resp);
      } catch {
        setData({ ...MOCK_TRACKING, order_id: id });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-48" />
      <div className="h-32 bg-gray-200 rounded-xl" />
      <div className="h-64 bg-gray-200 rounded-xl" />
    </main>
  );

  const t = data;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
          <ArrowLeft size={16} className="text-gray-500" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">Shipment Tracking</h1>
          <p className="text-sm text-gray-400">Order {t.order_id}</p>
        </div>
        <Link href={`/orders/${id}`} className="text-xs text-primary-700 hover:underline flex items-center gap-0.5">
          Order details <ExternalLink size={11} />
        </Link>
      </div>

      {/* Summary card */}
      <div className="bg-gradient-to-br from-primary-800 to-primary-600 rounded-2xl p-5 text-white">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-primary-200 text-xs font-medium mb-0.5">{t.carrier} · {t.service}</p>
            <p className="font-mono text-lg font-bold">{t.tracking_no}</p>
          </div>
          <span className="badge-pill bg-white/20 text-white text-xs font-semibold">{t.status}</span>
        </div>

        {/* Route bar */}
        <div className="mt-4 flex items-center gap-3">
          <div className="text-center">
            <p className="text-2xl font-black">{t.origin.code}</p>
            <p className="text-[11px] text-primary-200">{t.origin.city}</p>
          </div>
          <div className="flex-1 flex items-center gap-1">
            <div className="h-0.5 flex-1 bg-white/30 rounded" />
            <Plane size={18} className="text-white rotate-90 flex-shrink-0" />
            <div className="h-0.5 flex-1 bg-white/20 rounded" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-black">{t.destination.code}</p>
            <p className="text-[11px] text-primary-200">{t.destination.city}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/20">
          {[
            ['ETA', t.eta], ['Weight', t.weight], ['Pieces', t.pieces],
          ].map(([label, val]) => (
            <div key={label} className="text-center">
              <p className="text-[10px] text-primary-200">{label}</p>
              <p className="font-semibold text-sm">{val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-gray-800 mb-5 flex items-center gap-2">
          <Truck size={15} className="text-primary-600" /> Shipment Events
        </h2>
        <div className="relative">
          <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-gray-100" />
          <div className="space-y-4">
            {t.events.map((ev, i) => {
              const Icon = ev.icon;
              return (
                <div key={i} className="flex gap-4 relative">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 transition-colors ${
                    ev.current ? 'bg-blue-600 border-blue-600 text-white animate-pulse'
                    : ev.done && ev.highlight ? 'bg-primary-800 border-primary-800 text-white'
                    : ev.done ? 'bg-primary-600 border-primary-600 text-white'
                    : 'bg-white border-gray-200 text-gray-300'
                  }`}>
                    <Icon size={13} />
                  </div>
                  <div className={`flex-1 pb-4 last:pb-0 ${ev.highlight ? 'bg-primary-50 rounded-xl p-3 -mt-1 -ml-1' : ''}`}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-semibold ${ev.done || ev.current ? 'text-gray-800' : 'text-gray-400'}`}>
                        {ev.event}
                      </span>
                      {ev.current && <span className="badge-pill bg-blue-50 text-blue-700 text-[10px]">Now</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      <span className={`flex items-center gap-1 text-xs ${ev.done ? 'text-gray-500' : 'text-gray-300'}`}>
                        <MapPin size={10} /> {ev.location}
                      </span>
                      {ev.date && (
                        <span className={`text-xs ${ev.done ? 'text-gray-400' : 'text-gray-300'}`}>
                          {ev.date} {ev.time && `· ${ev.time}`}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Shipping documents */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Package size={15} className="text-primary-600" /> Shipping Documents
        </h2>
        <div className="space-y-2">
          {t.documents.map((doc) => (
            <div key={doc.no} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-700">{doc.label}</p>
                <p className="text-xs text-gray-400 font-mono">{doc.no}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge-pill bg-green-50 text-green-700 text-[10px]">
                  <CheckCircle2 size={10} /> {doc.status}
                </span>
                <button className="text-xs text-primary-700 hover:underline">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
        <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Shipment delayed?</p>
          <p className="text-xs text-amber-700 mt-0.5">
            If your shipment hasn&apos;t updated in 48 hours or hasn&apos;t arrived by the ETA, please
            {' '}<Link href="/messages" className="underline font-medium">message the supplier</Link>{' '}
            or <Link href="/contact-support" className="underline font-medium">contact support</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
