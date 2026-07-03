'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  Handshake,
  PackageSearch,
  Route,
  Scale,
  Send,
  Ship,
} from 'lucide-react';

const RFQ_FLOW = [
  {
    title: 'Tell us what you need',
    copy: 'Share product, quantity, destination, packaging, and delivery expectations.',
    Icon: ClipboardList,
  },
  {
    title: 'Match with verified suppliers',
    copy: 'Connect with Sri Lankan exporters that fit your category and sourcing brief.',
    Icon: BadgeCheck,
  },
  {
    title: 'Receive quotations',
    copy: 'Collect FOB pricing, MOQ, lead time, terms, and supplier notes in one flow.',
    Icon: PackageSearch,
  },
  {
    title: 'Compare and negotiate',
    copy: 'Review supplier fit, pricing, export readiness, and logistics support.',
    Icon: Scale,
  },
];

const TRUST_POINTS = [
  { label: 'Verified exporters', Icon: BadgeCheck },
  { label: 'Export-ready products', Icon: PackageSearch },
  { label: 'Maldives-friendly sourcing', Icon: Route },
  { label: 'Quotation matching', Icon: Handshake },
  { label: 'Trade and logistics support', Icon: Ship },
];

export default function EasySourcingSection() {
  const router = useRouter();
  const [form, setForm] = useState({
    product: '',
    description: '',
    qty: '',
    unit: 'Kg',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const qs = new URLSearchParams({ ...form }).toString();
    router.push(`/rfq?${qs}`);
  };

  return (
    <section className="mt-8 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_420px]">
        <div className="bg-primary-900 px-4 py-6 text-white sm:px-6 lg:px-7 lg:py-7">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-200">
              RFQ and inquiry matching
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
              Source from Sri Lanka with one professional buyer request
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-primary-100">
              Built for Maldives buyers sourcing tea, coconut products, spices, apparel, wellness goods, packaging, food products, and export-ready supplier capacity.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {RFQ_FLOW.map(({ title, copy, Icon }, index) => (
              <div key={title} className="rounded-lg border border-white/10 bg-white/8 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white text-primary-800">
                    <Icon size={18} />
                  </span>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-primary-200">
                      Step {index + 1}
                    </span>
                    <h3 className="text-sm font-bold text-white">{title}</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-5 text-primary-100">{copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {TRUST_POINTS.map(({ label, Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-primary-50 ring-1 ring-white/10"
              >
                <Icon size={13} />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/rfq"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-primary-900 transition-colors hover:bg-primary-50"
            >
              Post an RFQ <ArrowRight size={15} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse products
            </Link>
            <Link
              href="/suppliers?verified=1"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact verified suppliers
            </Link>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 lg:p-7">
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-800">
                <Send size={18} />
              </span>
              <div>
                <h3 className="text-base font-bold text-gray-900">Quick sourcing brief</h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Start with the essentials. The RFQ page can capture full trade requirements.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Product or keywords, e.g. Ceylon tea"
              value={form.product}
              onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-300 focus:border-primary-400 outline-none"
            />
            <textarea
              placeholder="Brief requirements, destination, packaging, or supplier preferences"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-300 focus:border-primary-400 outline-none resize-none"
            />
            <div className="grid grid-cols-[minmax(0,1fr)_112px] gap-2">
              <input
                type="number"
                placeholder="Quantity"
                value={form.qty}
                onChange={(e) => setForm((f) => ({ ...f, qty: e.target.value }))}
                className="min-w-0 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-300 focus:border-primary-400 outline-none"
              />
              <select
                value={form.unit}
                onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
                className="border border-gray-200 rounded-lg px-2 py-2.5 text-sm focus:ring-2 focus:ring-primary-300 outline-none bg-white"
              >
                {['Kg', 'MT', 'Tons', 'Pieces', 'Boxes', 'Liters', 'Cartons'].map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
            >
              <Send size={15} />
              Continue to RFQ
            </button>
            <p className="text-center text-xs leading-5 text-gray-400">
              Buyers can compare quotations, supplier profiles, and trade terms before negotiation.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
