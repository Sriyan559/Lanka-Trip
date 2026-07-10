'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BadgeCheck, CreditCard, PackageCheck, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { checkoutApi } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

const PAYMENT_LABELS = {
  card: 'Credit / Debit Card',
  bank_transfer: 'Bank Transfer',
  cod: 'Cash on Delivery',
};

function readReview() {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(sessionStorage.getItem('slb_checkout_review'));
  } catch {
    return null;
  }
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className={`flex justify-between gap-4 ${strong ? 'text-lg font-black text-gray-950' : 'text-sm text-gray-500'}`}>
      <span>{label}</span>
      <span className={strong ? 'text-primary-800' : 'font-semibold text-gray-800'}>{value}</span>
    </div>
  );
}

export default function PaymentConfirmationPage() {
  const router = useRouter();
  const [draft, setDraft] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setDraft(readReview());
  }, []);

  const confirmOrder = async () => {
    if (!draft || submitting) return;

    setSubmitting(true);
    try {
      const payload = {
        ...draft.lookup,
        quantity: draft.quote.quantity,
        payment_method: draft.payment_method,
        customer: draft.customer,
        delivery: draft.delivery,
        idempotency_key: draft.idempotency_key,
      };
      const response = await checkoutApi.confirm(payload);
      sessionStorage.setItem('slb_last_order', JSON.stringify(response.order));
      sessionStorage.removeItem('slb_checkout_review');
      sessionStorage.removeItem('slb_checkout_item');
      router.push(`/checkout/success?order=${encodeURIComponent(response.order.order_number || response.order.id)}`);
    } catch (error) {
      toast.error(error.message || 'Could not confirm this order.');
      setSubmitting(false);
    }
  };

  if (!draft?.quote) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-16 text-center">
          <PackageCheck size={46} className="mx-auto mb-4 text-gray-300" />
          <h1 className="text-2xl font-black text-gray-900">No checkout review found</h1>
          <p className="mt-2 text-sm text-gray-500">Return to checkout and review your delivery and payment details.</p>
          <Link href="/checkout" className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary-800 px-5 text-sm font-bold text-white hover:bg-primary-900">
            Back to Checkout
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const { quote, customer, delivery, payment_method: paymentMethod } = draft;
  const product = quote.product;
  const totals = quote.totals;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-lg px-4 py-8">
        <button type="button" onClick={() => router.push('/checkout')} className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary-700">
          <ArrowLeft size={16} /> Edit checkout details
        </button>

        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700">Final Review</p>
          <h1 className="mt-1 text-2xl font-black text-gray-950 sm:text-3xl">Payment Confirmation</h1>
          <p className="mt-2 text-sm text-gray-500">Review the backend-quoted total before creating your order.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-5">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
                <PackageCheck size={18} /> Product
              </h2>
              <div className="flex gap-4">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                  {product.image && <Image src={product.image} alt={product.name} fill unoptimized className="object-cover" />}
                </div>
                <div className="min-w-0">
                  <p className="line-clamp-2 font-bold text-gray-900">{product.name}</p>
                  <p className="mt-1 text-sm text-gray-500">{product.brandName}</p>
                  <p className="text-sm text-gray-400">Qty {quote.quantity} {product.unit}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-base font-bold text-gray-900">Customer</h2>
                <p className="font-bold text-gray-900">{customer.fullName}</p>
                <p className="mt-1 text-sm text-gray-500">{customer.email}</p>
                <p className="text-sm text-gray-500">{customer.phone}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-base font-bold text-gray-900">Delivery</h2>
                <p className="font-bold text-gray-900">{delivery.address1}</p>
                {delivery.address2 && <p className="text-sm text-gray-500">{delivery.address2}</p>}
                <p className="mt-1 text-sm text-gray-500">{[delivery.city, delivery.province, delivery.postalCode].filter(Boolean).join(', ')}</p>
                <p className="text-sm text-gray-500">{delivery.country}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-primary-100 bg-primary-50/60 p-5">
              <h2 className="mb-2 flex items-center gap-2 text-base font-bold text-primary-900">
                <ShieldCheck size={18} /> Payment State
              </h2>
              <p className="text-sm leading-6 text-gray-700">
                {paymentMethod === 'card'
                  ? 'The backend will create a processing card payment. The order will not be shown as paid until a gateway confirms payment.'
                  : 'The backend will create the order with payment pending for platform review.'}
              </p>
            </div>
          </section>

          <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-32">
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
              <CreditCard size={18} /> Total
            </h2>
            <div className="space-y-2">
              <SummaryRow label="Payment" value={PAYMENT_LABELS[paymentMethod] || paymentMethod} />
              <SummaryRow label="Subtotal" value={formatCurrency(Number(totals.subtotal), quote.currency)} />
              <SummaryRow label="Delivery" value={formatCurrency(Number(totals.shipping), quote.currency)} />
              <SummaryRow label="Tax" value={formatCurrency(Number(totals.tax), quote.currency)} />
              <SummaryRow label="Discount" value={`-${formatCurrency(Number(totals.discount), quote.currency)}`} />
              <div className="my-4 border-t border-gray-100" />
              <SummaryRow label="Order Total" value={formatCurrency(Number(totals.total), quote.currency)} strong />
            </div>

            <button
              type="button"
              onClick={confirmOrder}
              disabled={submitting}
              className="mt-6 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-primary-800 px-5 text-sm font-black uppercase tracking-wide text-white transition hover:bg-primary-900 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? <span className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" /> : <BadgeCheck size={18} />}
              {submitting ? 'Confirming...' : paymentMethod === 'card' ? 'Confirm & Process Payment' : 'Confirm Order'}
            </button>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
