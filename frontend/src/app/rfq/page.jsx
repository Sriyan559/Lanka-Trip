'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Send, CheckCircle, AlertCircle, Package } from 'lucide-react';
import { rfqApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { SRI_LANKA_CATEGORIES } from '@/lib/constants';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function RFQForm() {
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();

  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [form,      setForm]      = useState({
    product_name:  searchParams.get('product')     || '',
    description:   searchParams.get('description') || '',
    quantity:      searchParams.get('qty')         || '',
    unit:          searchParams.get('unit')        || 'Kg',
    category:      '',
    budget_min:    '',
    budget_max:    '',
    delivery_port: '',
    delivery_date: '',
    sample_needed: false,
    contact_name:  '',
    contact_email: '',
    contact_phone: '',
    additional:    '',
  });

  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!isAuthenticated && !form.contact_email) {
      setError('Please add your email so suppliers can reach you with quotes.');
      return;
    }
    setLoading(true);
    try {
      await rfqApi.submit(form);
      setSubmitted(true);
      toast.success('RFQ posted! Suppliers will contact you shortly.');
    } catch (err) {
      setError(err.message || 'Failed to submit RFQ. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <CheckCircle className="w-16 h-16 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">RFQ Submitted!</h2>
        <p className="text-gray-500 mb-6">
          Your request has been sent to matching Sri Lankan suppliers.
          You&apos;ll receive quotes within 24–48 hours.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => { setSubmitted(false); setForm({ product_name:'',description:'',quantity:'',unit:'Kg',category:'',budget_min:'',budget_max:'',delivery_port:'',delivery_date:'',sample_needed:false,contact_name:'',contact_email:'',contact_phone:'',additional:'' }); }}
            className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50"
          >
            Post Another RFQ
          </button>
          <a href="/dashboard" className="px-5 py-2.5 bg-primary-800 text-white rounded-lg text-sm hover:bg-primary-700">
            View My RFQs →
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Product details */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Package size={18} className="text-primary-700" />
          Product Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name / Keywords <span className="text-red-500">*</span></label>
            <input type="text" value={form.product_name} onChange={set('product_name')} required
              placeholder="e.g. Ceylon Black Tea, BOPF Grade"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select value={form.category} onChange={set('category')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-300 bg-white">
              <option value="">Select a category</option>
              {SRI_LANKA_CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Quantity <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <input type="number" value={form.quantity} onChange={set('quantity')} required min="1"
                placeholder="e.g. 500"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400" />
              <select value={form.unit} onChange={set('unit')}
                className="border border-gray-200 rounded-lg px-2 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-300 bg-white">
                {['Kg', 'MT', 'Tons', 'Pieces', 'Boxes', 'Liters', 'Cartons', 'Pairs', 'Sets', 'Rolls'].map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
            <textarea value={form.description} onChange={set('description')} rows={4}
              placeholder="Describe the product specifications, grade, quality requirements, packaging preferences…"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 resize-none" />
          </div>
        </div>
      </section>

      {/* Pricing & delivery */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Pricing &amp; Delivery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range (USD)</label>
            <div className="flex gap-2 items-center">
              <input type="number" value={form.budget_min} onChange={set('budget_min')} placeholder="Min"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400" />
              <span className="text-gray-400">–</span>
              <input type="number" value={form.budget_max} onChange={set('budget_max')} placeholder="Max"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination Port / Country</label>
            <input type="text" value={form.delivery_port} onChange={set('delivery_port')} placeholder="e.g. Dubai, UAE"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Required Delivery Date</label>
            <input type="date" value={form.delivery_date} onChange={set('delivery_date')}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400" />
          </div>
          <div className="flex items-center gap-3 mt-6">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input type="checkbox" checked={form.sample_needed} onChange={set('sample_needed')}
                className="w-4 h-4 rounded border-gray-300 text-primary-700 focus:ring-primary-500" />
              I need a product sample first
            </label>
          </div>
        </div>
      </section>

      {/* Contact details (shown only for guests) */}
      {!isAuthenticated && (
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Full Name', field: 'contact_name',  type: 'text',  placeholder: 'John Smith',       required: true },
              { label: 'Email',     field: 'contact_email', type: 'email', placeholder: 'john@company.com', required: true },
              { label: 'Phone',     field: 'contact_phone', type: 'tel',   placeholder: '+1 555 000 0000',  required: false },
            ].map(({ label, field, type, placeholder, required }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input type={type} value={form[field]} onChange={set(field)} placeholder={placeholder} required={required}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Additional notes */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements (optional)</label>
        <textarea value={form.additional} onChange={set('additional')} rows={3}
          placeholder="Certifications required, labelling, export documentation, incoterms preference…"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 resize-none" />
      </section>

      <button type="submit" disabled={loading}
        className="w-full py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
        {loading ? (
          <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting…</>
        ) : (
          <><Send size={16} />Post Request Now — Get Quotes from Suppliers</>
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        Your RFQ will be sent to verified Sri Lankan suppliers matching your requirements.
        No obligations — compare quotes and choose.
      </p>
    </form>
  );
}

export default function RFQPage() {
  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Post a Request for Quotation</h1>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            One request, multiple competitive quotes from verified Sri Lankan exporters.
            Free, fast and secure.
          </p>
          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-500">
            {['✅ 100% Free', '⚡ Quotes in 24h', '🔒 Verified Suppliers', '📦 Global Shipping'].map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <RFQForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
