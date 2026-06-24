'use client';

/**
 * OrderCreateContent — Secured Trade Service Order form.
 *
 * Matches the Made-in-China order page layout from the screenshots,
 * adapted for EcomLanka B2B marketplace.
 *
 * Sections:
 *  1. Buyer Info     — Email, Shipping Address, Billing Address
 *  2. Tax Info       — VAT/Tax ID, Company Name
 *  3. Product Info   — Product table (read-only, from cart or URL params)
 *  4. Logistics Info — Shipping Method/Cost/Insurance (Negotiable)
 *  5. Value-Added    — Quality Inspection optional service
 *  6. Remark         — Free-text notes textarea
 *
 * Right sidebar:
 *  - Summary with total, Terms checkbox, Submit Order CTA
 *  - Trust cards: Funds Security, Audited Suppliers, Platform Logistics
 *
 * Laravel: POST /api/orders — see createOrder() in services.js
 */

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Shield, BadgeCheck, Truck, CheckCircle, MapPin,
  Plus, ChevronDown, ArrowLeft, Loader2,
} from 'lucide-react';
import { createOrder } from '@/lib/services';
import Header  from '@/components/layout/Header';
import Footer  from '@/components/layout/Footer';

/* ── Trust card data ───────────────────────────── */
const TRUST_CARDS = [
  {
    icon: Shield,
    color: 'text-primary-700',
    bg: 'bg-primary-50',
    title: 'Funds Security',
    desc: 'Encrypted, platform-protected payments with refund support for eligible order issues.',
  },
  {
    icon: BadgeCheck,
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    title: 'Audited Suppliers',
    desc: 'Online-trading suppliers are reviewed to meet platform trust and compliance standards.',
  },
  {
    icon: Truck,
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    title: 'Platform Logistics',
    desc: 'Platform-supported logistics available for clearer tracking and delivery assurance.',
  },
];

/* ── Value-Added services ──────────────────────── */
const VALUE_ADDED_SERVICES = [
  {
    id: 'quality_inspection',
    title: 'Quality Inspection',
    desc: 'Helps check for product conformity and reduce risk of quality issues.',
    refPrice: 'US$150.00+',
  },
  {
    id: 'certificate_of_origin',
    title: 'Certificate of Origin',
    desc: 'Official CoO document required for preferential tariff and customs clearance.',
    refPrice: 'US$45.00+',
  },
];

export default function OrderCreateContent() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const productId   = searchParams.get('productId')   || '';
  const productName = searchParams.get('productName') || 'Selected Product';
  const qty         = Number(searchParams.get('qty') || 1);

  /* Form state */
  const [form, setForm] = useState({
    email:            '',
    shipping_address: '',
    billing_address:  '',
    vat_id:           '',
    company_name:     '',
    remark:           '',
    agreed:           false,
  });
  const [services,    setServices]    = useState([]);
  const [sameAddress, setSameAddress] = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [error,       setError]       = useState('');

  const update = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const toggleService = (id) =>
    setServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agreed) { setError('Please read and agree to the Terms and Conditions.'); return; }
    if (!form.email)  { setError('Please enter your email address.'); return; }
    setError('');
    setSubmitting(true);
    try {
      await createOrder({
        ...form,
        items: [{ product_id: productId, qty }],
        value_added_services: services,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Could not submit your order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Success state ───────────────────────────── */
  if (submitted) {
    return (
      <>
        <Header />
        <main className="max-w-screen-xl mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="text-primary-700" size={40} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Submitted!</h1>
            <p className="text-gray-500 mb-6">
              Your secured trade order has been received. The supplier will confirm within 24 hours and
              we&apos;ll send a notification to <strong>{form.email}</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/orders" className="px-6 py-2.5 bg-primary-800 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors">
                View My Orders
              </Link>
              <Link href="/products" className="px-6 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                Continue Browsing
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  /* ── Shared input styles ─────────────────────── */
  const inputCls = "w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-50 placeholder-gray-400 transition-colors";
  const labelCls = "block text-sm font-medium text-gray-700 mb-1.5";
  const sectionCls = "bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-4";

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          {/* Back + page title */}
          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-primary-700" />
              <h1 className="text-lg font-bold text-gray-800">Secured Trade Service Order</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-5 items-start">
              {/* ── Left: main form ────────────────────────── */}
              <div className="flex-1 min-w-0">

                {/* 1. Buyer Info */}
                <div className={sectionCls}>
                  <h2 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Buyer Info.</h2>
                  <div className="space-y-4">
                    {/* Email */}
                    <div>
                      <label className={labelCls}>
                        <span className="text-red-500 mr-0.5">*</span> Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={update('email')}
                        placeholder="Please enter your email"
                        className={inputCls}
                        required
                      />
                      <p className="text-xs text-gray-400 mt-1">Reply notifications will be sent to this email.</p>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <label className={labelCls}>
                        <span className="text-red-500 mr-0.5">*</span> Shipping Address
                      </label>
                      {form.shipping_address ? (
                        <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <MapPin size={14} className="text-primary-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 flex-1">{form.shipping_address}</span>
                          <button type="button" onClick={() => setForm(p => ({ ...p, shipping_address: '' }))}
                            className="text-xs text-primary-600 hover:underline flex-shrink-0">Edit</button>
                        </div>
                      ) : (
                        <textarea
                          value={form.shipping_address}
                          onChange={update('shipping_address')}
                          placeholder="Street address, city, state/province, postal code, country"
                          rows={3}
                          className={inputCls + ' resize-none'}
                        />
                      )}
                    </div>

                    {/* Billing Address */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className={labelCls + ' mb-0'}>
                          <span className="text-red-500 mr-0.5">*</span> Billing Address
                        </label>
                        <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={sameAddress}
                            onChange={e => {
                              setSameAddress(e.target.checked);
                              if (e.target.checked) setForm(p => ({ ...p, billing_address: p.shipping_address }));
                            }}
                            className="w-3.5 h-3.5 accent-primary-700"
                          />
                          Same as shipping
                        </label>
                      </div>
                      <textarea
                        value={sameAddress ? form.shipping_address : form.billing_address}
                        onChange={update('billing_address')}
                        disabled={sameAddress}
                        placeholder="Street address, city, state/province, postal code, country"
                        rows={3}
                        className={inputCls + ' resize-none' + (sameAddress ? ' bg-gray-50 text-gray-500' : '')}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Tax Info */}
                <div className={sectionCls}>
                  <h2 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                    Tax Info.
                    <span className="ml-2 text-xs text-primary-600 font-normal hover:underline cursor-pointer">Learn More</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>VAT / Tax ID</label>
                      <input
                        type="text"
                        value={form.vat_id}
                        onChange={update('vat_id')}
                        placeholder="Optional"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Company Name</label>
                      <input
                        type="text"
                        value={form.company_name}
                        onChange={update('company_name')}
                        placeholder="Please enter company name"
                        className={inputCls}
                      />
                      <p className="text-xs text-gray-400 mt-1">This helps suppliers understand your business better.</p>
                    </div>
                  </div>
                </div>

                {/* 3. Product Info */}
                <div className={sectionCls}>
                  <h2 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Product Info.</h2>
                  <div className="text-sm text-gray-500 mb-3">
                    Seller: <span className="text-primary-700 font-medium cursor-pointer hover:underline">Lanka Export Co.</span>
                    <button type="button" className="ml-3 text-xs text-primary-600 border border-primary-200 rounded-full px-2 py-0.5 hover:bg-primary-50 transition-colors">
                      💬 Chat with Supplier
                    </button>
                  </div>

                  {/* Product table */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-4 py-2.5 font-semibold text-gray-600 text-xs w-10">No.</th>
                          <th className="text-left px-4 py-2.5 font-semibold text-gray-600 text-xs">Products</th>
                          <th className="text-right px-4 py-2.5 font-semibold text-gray-600 text-xs w-32">Unit Price (USD)</th>
                          <th className="text-right px-4 py-2.5 font-semibold text-gray-600 text-xs w-24">Quantity</th>
                          <th className="text-right px-4 py-2.5 font-semibold text-gray-600 text-xs w-32">Total Amount (USD)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-500">1</td>
                          <td className="px-4 py-3 text-gray-800 font-medium">{productName}</td>
                          <td className="px-4 py-3 text-right text-gray-600">Negotiable</td>
                          <td className="px-4 py-3 text-right">
                            <span className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden">
                              <button type="button" className="px-2 py-1 text-gray-500 hover:bg-gray-50 text-sm">−</button>
                              <span className="px-2 py-1 text-sm font-medium text-gray-800 min-w-[2rem] text-center">{qty}</span>
                              <button type="button" className="px-2 py-1 text-gray-500 hover:bg-gray-50 text-sm">+</button>
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-gray-600">Negotiable</td>
                        </tr>
                      </tbody>
                      <tfoot className="bg-gray-50 border-t border-gray-100">
                        <tr>
                          <td colSpan={4} className="px-4 py-2.5 text-right text-sm font-semibold text-gray-700">Total Price of Products:</td>
                          <td className="px-4 py-2.5 text-right text-sm font-bold text-gray-800">Negotiable</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* 4. Logistics Info */}
                <div className={sectionCls}>
                  <h2 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Logistics Info.</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Shipping Method', value: 'Negotiable' },
                      { label: 'Shipping Cost',   value: 'Negotiable' },
                      { label: 'Insurance',       value: 'Negotiable' },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-gray-50 rounded-xl p-3.5">
                        <div className="text-xs text-gray-400 font-medium mb-1">{label}</div>
                        <div className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                          <Truck size={13} className="text-primary-600" />
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Value-Added Services */}
                <div className={sectionCls}>
                  <h2 className="text-base font-bold text-gray-800 mb-1 pb-2 border-b border-gray-100">
                    Value-Added Services <span className="text-gray-400 font-normal text-sm">(Optional)</span>
                  </h2>
                  <p className="text-xs text-gray-400 mb-4">
                    Additional charges may apply. We will contact you for payment confirmation.
                  </p>
                  <div className="space-y-3">
                    {VALUE_ADDED_SERVICES.map(svc => (
                      <div key={svc.id} className={`border rounded-xl p-4 flex items-start justify-between gap-4 transition-colors ${services.includes(svc.id) ? 'border-primary-300 bg-primary-50' : 'border-gray-100 hover:border-gray-200'}`}>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <BadgeCheck size={14} className="text-primary-600 flex-shrink-0" />
                            <span className="text-sm font-semibold text-gray-800">{svc.title}</span>
                          </div>
                          <p className="text-xs text-gray-500">{svc.desc}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs text-gray-500 mb-1">Reference price:</div>
                          <div className="text-sm font-bold text-primary-700 mb-2">{svc.refPrice}</div>
                          <button
                            type="button"
                            onClick={() => toggleService(svc.id)}
                            className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                              services.includes(svc.id)
                                ? 'bg-primary-800 text-white border-primary-800 hover:bg-primary-700'
                                : 'border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700'
                            }`}
                          >
                            {services.includes(svc.id) ? (
                              <><CheckCircle size={11} /> Added</>
                            ) : (
                              <><Plus size={11} /> Add Service</>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Remark */}
                <div className={sectionCls}>
                  <h2 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Remark</h2>
                  <textarea
                    value={form.remark}
                    onChange={update('remark')}
                    rows={5}
                    maxLength={1000}
                    placeholder="You can leave additional notes here (optional)"
                    className={inputCls + ' resize-none'}
                  />
                  <div className="text-right text-xs text-gray-400 mt-1">{form.remark.length}/1000</div>
                </div>

              </div>

              {/* ── Right: Summary sidebar ──────────────────── */}
              <div className="lg:w-72 xl:w-80 flex-shrink-0 lg:sticky lg:top-20">

                {/* Main summary */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-800 text-sm">Summary</h3>
                    <span className="flex items-center gap-1 text-xs text-primary-700 font-medium">
                      <Shield size={12} /> Payment Guarantee
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                    This order needs to be confirmed by the supplier to continue. Payment is only released after delivery confirmation.
                  </p>

                  {/* Services added */}
                  {services.length > 0 && (
                    <div className="mb-3 bg-primary-50 rounded-lg p-2.5">
                      <div className="text-xs text-primary-700 font-semibold mb-1">Added Services:</div>
                      {services.map(id => {
                        const s = VALUE_ADDED_SERVICES.find(v => v.id === id);
                        return s ? (
                          <div key={id} className="flex items-center justify-between text-xs text-gray-600">
                            <span>{s.title}</span><span className="text-primary-600">{s.refPrice}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}

                  <div className="flex items-center justify-between py-2.5 border-t border-gray-100 mb-3">
                    <span className="text-sm font-semibold text-gray-700">Total</span>
                    <span className="text-base font-bold text-primary-700">Negotiable</span>
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-2.5 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      checked={form.agreed}
                      onChange={update('agreed')}
                      className="mt-0.5 w-4 h-4 accent-primary-700 flex-shrink-0"
                    />
                    <span className="text-[12px] text-gray-500 leading-relaxed">
                      I have read and agreed to the{' '}
                      <Link href="/terms" className="text-primary-600 hover:underline">Terms and Conditions</Link>,{' '}
                      <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>, and{' '}
                      <Link href="/refund-policy" className="text-primary-600 hover:underline">Return & Refund Rules</Link>.
                    </span>
                  </label>

                  {/* Error */}
                  {error && (
                    <div className="mb-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg p-2.5">
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-accent-500 hover:bg-accent-600 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                  >
                    {submitting ? (
                      <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                    ) : (
                      <><Shield size={15} /> Submit Order</>
                    )}
                  </button>
                </div>

                {/* Trust cards */}
                <div className="space-y-2">
                  {TRUST_CARDS.map(({ icon: Icon, color, bg, title, desc }) => (
                    <div key={title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3.5 flex gap-3">
                      <div className={`${bg} ${color} w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon size={15} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-800 mb-0.5">{title}</div>
                        <p className="text-[11px] text-gray-500 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
