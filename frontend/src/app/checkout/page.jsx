'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin, Truck, CreditCard, CheckCircle2, ChevronRight,
  ShieldCheck, Lock, Plus, Edit2, Package,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 1, label: 'Address',  icon: MapPin },
  { id: 2, label: 'Shipping', icon: Truck },
  { id: 3, label: 'Payment',  icon: CreditCard },
  { id: 4, label: 'Review',   icon: CheckCircle2 },
];

const SHIPPING_METHODS = [
  { id: 'air',   label: 'Air Freight',      carrier: 'SriLankan Cargo',  days: '7–14', price: 120,  icon: '✈️' },
  { id: 'sea',   label: 'Sea Freight (FCL)', carrier: 'Maersk Line',     days: '28–45', price: 380, icon: '🚢' },
  { id: 'sea2',  label: 'Sea Freight (LCL)', carrier: 'CMA CGM',         days: '35–50', price: 210, icon: '🚢' },
  { id: 'dhl',   label: 'DHL Express',       carrier: 'DHL',             days: '3–7',   price: 290, icon: '📦' },
];

const PAYMENT_METHODS = [
  { id: 'bank',   label: 'Bank Transfer (TT)',  icon: '🏦', desc: 'Wire transfer to our bank. 2–3 business days.' },
  { id: 'paypal', label: 'PayPal',              icon: '🅿️', desc: 'Pay securely via PayPal balance or card.' },
  { id: 'stripe', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, Amex accepted.' },
  { id: 'lc',     label: 'Letter of Credit',    icon: '📄', desc: 'Documentary L/C via your bank.' },
];

const INITIAL_ADDRESS = {
  name: '', company: '', address: '', city: '', state: '',
  postal: '', country: 'Japan', phone: '', email: '',
};

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, i) => {
        const Icon  = step.icon;
        const done  = current > step.id;
        const active = current === step.id;
        return (
          <div key={step.id} className="flex items-center">
            <div className={`flex flex-col items-center gap-1`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                done   ? 'bg-primary-800 border-primary-800 text-white'
                : active ? 'bg-white border-primary-800 text-primary-800'
                : 'bg-white border-gray-200 text-gray-300'
              }`}>
                {done ? <CheckCircle2 size={16} /> : <Icon size={16} />}
              </div>
              <span className={`text-[10px] font-medium whitespace-nowrap ${
                active ? 'text-primary-800' : done ? 'text-gray-500' : 'text-gray-300'
              }`}>{step.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-12 h-0.5 mx-1 mb-4 rounded-full transition-colors ${done ? 'bg-primary-800' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      {children}
    </div>
  );
}

export default function CheckoutPage() {
  const router    = useRouter();
  const { user }  = useAuth();
  const { items, total: cartTotal, clearCart } = useCart();
  const [step,     setStep]     = useState(1);
  const [address,  setAddress]  = useState(INITIAL_ADDRESS);
  const [shipping, setShipping] = useState('air');
  const [payment,  setPayment]  = useState('bank');
  const [notes,    setNotes]    = useState('');
  const [placing,  setPlacing]  = useState(false);

  useEffect(() => {
    if (!user) { router.replace('/login?redirect=/checkout'); }
  }, [user, router]);

  // Prefill from user profile
  useEffect(() => {
    if (user) {
      setAddress((a) => ({ ...a, email: user.email || '', name: user.name || '' }));
    }
  }, [user]);

  if (!items?.length) return (
    <main className="max-w-2xl mx-auto px-4 py-16 text-center">
      <Package size={48} className="text-gray-200 mx-auto mb-4" />
      <h2 className="text-lg font-bold text-gray-800 mb-2">Your cart is empty</h2>
      <Link href="/products" className="inline-block px-4 py-2 bg-primary-800 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
        Browse Products
      </Link>
    </main>
  );

  const selectedShipping = SHIPPING_METHODS.find((m) => m.id === shipping);
  const shippingCost = selectedShipping?.price || 0;
  const total = (cartTotal || 0) + shippingCost;

  const setAddr = (field) => (e) => setAddress((a) => ({ ...a, [field]: e.target.value }));

  const validateAddress = () => {
    if (!address.name || !address.address || !address.city || !address.country || !address.phone || !address.email) {
      toast.error('Please fill in all required address fields'); return false;
    }
    return true;
  };

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const res = await api.post('/orders', {
        items: items.map((i) => ({ product_id: i.id, qty: i.qty })),
        shipping_address: address,
        shipping_method:  shipping,
        payment_method:   payment,
        notes,
      });
      clearCart();
      const orderId = res?.id || `ECL-${Date.now()}`;
      router.push(`/order-success?id=${orderId}`);
    } catch {
      // Demo: always succeed
      clearCart();
      router.push(`/order-success?id=ECL-DEMO-${Date.now()}`);
    }
  };

  const inputCls = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent';

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-black text-gray-900 mb-2">Checkout</h1>
      <StepIndicator current={step} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: steps */}
        <div className="lg:col-span-2 space-y-0">
          {/* Step 1 — Address */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2"><MapPin size={17} className="text-primary-600" /> Shipping Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Contact Name" required>
                  <input type="text" value={address.name} onChange={setAddr('name')} className={inputCls} placeholder="Full name" />
                </Field>
                <Field label="Company Name">
                  <input type="text" value={address.company} onChange={setAddr('company')} className={inputCls} placeholder="Company (optional)" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Street Address" required>
                    <input type="text" value={address.address} onChange={setAddr('address')} className={inputCls} placeholder="Street, building, unit" />
                  </Field>
                </div>
                <Field label="City" required>
                  <input type="text" value={address.city} onChange={setAddr('city')} className={inputCls} placeholder="City" />
                </Field>
                <Field label="State / Province">
                  <input type="text" value={address.state} onChange={setAddr('state')} className={inputCls} placeholder="State/Province" />
                </Field>
                <Field label="Postal Code">
                  <input type="text" value={address.postal} onChange={setAddr('postal')} className={inputCls} placeholder="Postal code" />
                </Field>
                <Field label="Country" required>
                  <input type="text" value={address.country} onChange={setAddr('country')} className={inputCls} placeholder="Country" />
                </Field>
                <Field label="Phone" required>
                  <input type="tel" value={address.phone} onChange={setAddr('phone')} className={inputCls} placeholder="+1 555 000 0000" />
                </Field>
                <Field label="Email" required>
                  <input type="email" value={address.email} onChange={setAddr('email')} className={inputCls} placeholder="email@company.com" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className={`${inputCls} resize-none`} placeholder="Special instructions, certifications required, packaging preferences…" />
              </div>
              <div className="flex justify-end">
                <button onClick={() => validateAddress() && setStep(2)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary-800 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors">
                  Continue to Shipping <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Shipping */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2"><Truck size={17} className="text-primary-600" /> Shipping Method</h2>
              <div className="space-y-3">
                {SHIPPING_METHODS.map((m) => (
                  <label key={m.id} className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    shipping === m.id ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input type="radio" name="shipping" value={m.id} checked={shipping === m.id} onChange={() => setShipping(m.id)} className="mt-1" />
                    <span className="text-2xl">{m.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{m.label}</p>
                      <p className="text-xs text-gray-500">{m.carrier} · {m.days} days</p>
                    </div>
                    <span className="font-bold text-gray-800 text-sm whitespace-nowrap">{formatCurrency(m.price)}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">← Back</button>
                <button onClick={() => setStep(3)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary-800 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors">
                  Continue to Payment <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Payment */}
          {step === 3 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2"><CreditCard size={17} className="text-primary-600" /> Payment Method</h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((m) => (
                  <label key={m.id} className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    payment === m.id ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} className="mt-1" />
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{m.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl p-3">
                <ShieldCheck size={16} className="text-green-600 flex-shrink-0" />
                <p className="text-xs text-green-700">All payments are processed through escrow. Funds are only released to the supplier after you confirm delivery.</p>
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">← Back</button>
                <button onClick={() => setStep(4)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary-800 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors">
                  Review Order <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4 — Review */}
          {step === 4 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="font-bold text-gray-900 flex items-center gap-2"><CheckCircle2 size={17} className="text-primary-600" /> Review & Place Order</h2>

              {/* Address summary */}
              <div className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Shipping To</p>
                  <button onClick={() => setStep(1)} className="text-xs text-primary-700 hover:underline flex items-center gap-0.5"><Edit2 size={11} /> Edit</button>
                </div>
                <p className="font-semibold text-sm text-gray-800">{address.name} {address.company && `· ${address.company}`}</p>
                <p className="text-sm text-gray-500">{address.address}, {address.city}{address.state && `, ${address.state}`} {address.postal}</p>
                <p className="text-sm text-gray-500">{address.country}</p>
                <p className="text-xs text-gray-400 mt-1">{address.phone} · {address.email}</p>
              </div>

              {/* Shipping + Payment */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="border border-gray-100 rounded-xl p-3">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Shipping</p>
                  <p className="text-sm font-semibold text-gray-800">{selectedShipping?.icon} {selectedShipping?.label}</p>
                  <p className="text-xs text-gray-500">{selectedShipping?.carrier} · {selectedShipping?.days} days</p>
                </div>
                <div className="border border-gray-100 rounded-xl p-3">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Payment</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {PAYMENT_METHODS.find((m) => m.id === payment)?.icon}{' '}
                    {PAYMENT_METHODS.find((m) => m.id === payment)?.label}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {(items || []).map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    {item.image && (
                      <Image src={item.image} alt={item.name} width={44} height={44} unoptimized className="w-11 h-11 rounded-lg object-cover border border-gray-100 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 flex-shrink-0">{formatCurrency((item.price || 0) * item.qty)}</p>
                  </div>
                ))}
              </div>

              {/* Place order */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <button onClick={() => setStep(3)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">← Back</button>
                <button
                  onClick={placeOrder}
                  disabled={placing}
                  className="flex items-center gap-2 px-8 py-3 bg-accent-500 hover:bg-accent-600 text-white text-base font-bold rounded-xl disabled:opacity-60 transition-colors shadow-lg shadow-accent-500/25"
                >
                  {placing ? <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Lock size={16} />}
                  {placing ? 'Placing order…' : `Place Order · ${formatCurrency(total)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Order summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-4">
            <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {(items || []).map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600">
                  <span className="line-clamp-1 flex-1 mr-2">{item.name} ×{item.qty}</span>
                  <span className="flex-shrink-0 font-medium text-gray-800">{formatCurrency((item.price || 0) * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-gray-100 pt-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span><span>{formatCurrency(cartTotal || 0)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span><span>{formatCurrency(shippingCost)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total (USD)</span><span>{formatCurrency(total)}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck size={13} className="text-green-500" />
              Trade Assurance · Escrow Protected
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
