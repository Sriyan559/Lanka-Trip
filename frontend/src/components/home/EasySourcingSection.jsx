'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send } from 'lucide-react';

export default function EasySourcingSection() {
  const router = useRouter();
  const [form, setForm] = useState({ product: '', description: '', qty: '', unit: 'Kg' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const qs = new URLSearchParams({ ...form }).toString();
    router.push(`/rfq?${qs}`);
  };

  return (
    <section className="mt-8 rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Left: marketing copy */}
        <div className="bg-gradient-to-br from-primary-800 to-primary-600 text-white p-8 md:w-1/2">
          <h2 className="text-xl font-bold mb-2">Easy Sourcing</h2>
          <p className="text-primary-100 text-sm mb-4">
            Post your sourcing request and receive competitive quotes from verified Sri Lankan exporters.
          </p>
          <ul className="space-y-1.5 text-sm text-primary-100">
            <li className="flex items-center gap-2">✅ One request, multiple quotes</li>
            <li className="flex items-center gap-2">✅ Verified supplier matching</li>
            <li className="flex items-center gap-2">✅ Quote comparison & sample request</li>
          </ul>
          <a href="/rfq" className="inline-block mt-5 text-sm font-medium underline text-primary-200 hover:text-white">
            Learn More →
          </a>
        </div>

        {/* Right: quick RFQ form */}
        <div className="bg-white p-8 md:w-1/2">
          <h3 className="text-base font-semibold text-gray-800 mb-4">Want to get quotations?</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Product Name or Keywords"
              value={form.product}
              onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-300 focus:border-primary-400 outline-none"
            />
            <textarea
              placeholder="Product Description (optional)"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-300 focus:border-primary-400 outline-none resize-none"
            />
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Purchase Quantity"
                value={form.qty}
                onChange={(e) => setForm((f) => ({ ...f, qty: e.target.value }))}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-300 focus:border-primary-400 outline-none"
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
              className="w-full py-2.5 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Send size={15} />
              Post Your Request Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
