'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, CheckCircle2, CreditCard, ShieldCheck, Download, RefreshCw, Layers } from 'lucide-react';
import toast from 'react-hot-toast';
import { FN03_RECORD_DETAIL } from '@/data/mockPaymentData';

export default function PaymentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const paymentId = (params?.id as string) || 'PAY-2025-082942';

  const record = {
    ...FN03_RECORD_DETAIL,
    id: paymentId,
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-6 text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-4">
        {/* Back Link */}
        <button
          onClick={() => router.push('/admin/finance/payments')}
          className="flex items-center gap-1 text-xs font-bold text-[#8f002b] hover:underline w-fit"
        >
          <ChevronLeft size={14} />
          <span>Back to Payments &amp; Transaction Management (FN03)</span>
        </button>

        {/* Header Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-extrabold text-gray-900">{record.id}</h1>
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <CheckCircle2 size={12} />
                {record.paymentResponse}
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded font-mono font-semibold">
                FN04 — Payment Detail View
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Payment Reference: <span className="font-mono text-gray-700">{record.ref}</span> &nbsp;|&nbsp;
              Created on {record.txnDate}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => toast.success('Exporting payment receipt PDF...')}
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Export Receipt</span>
            </button>
            <button
              onClick={() => toast.success('Re-triggering payment status sync...')}
              className="px-3 py-1.5 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg flex items-center gap-1.5"
            >
              <RefreshCw size={13} />
              <span>Sync Gateway Status</span>
            </button>
          </div>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Overview */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-2 text-xs">
            <h2 className="font-bold text-gray-900 text-sm border-b pb-2 border-gray-100">Transaction Overview</h2>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Gross Amount</span>
              <span className="font-mono font-extrabold text-gray-900 text-sm">
                LKR {record.grossAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Captured Amount</span>
              <span className="font-mono font-bold text-emerald-700">
                LKR {record.capturedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Customer</span>
              <span className="font-bold text-gray-900">{record.customer}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Related Order</span>
              <span className="font-mono text-gray-700">{record.relatedOrder}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Invoice Ref</span>
              <span className="font-mono text-gray-700">{record.invoiceRef}</span>
            </div>
          </div>

          {/* Card 2: Payment Method & Gateway */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-2 text-xs">
            <h2 className="font-bold text-gray-900 text-sm border-b pb-2 border-gray-100">Gateway &amp; Security</h2>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-semibold text-gray-900">{record.paymentMethod}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Gateway Provider</span>
              <span className="font-semibold text-gray-800">{record.gateway}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">3DS Verification</span>
              <span className="font-bold text-emerald-700">{record.threeDS}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Auth Code</span>
              <span className="font-mono text-gray-700">{record.authCode}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Billing Match</span>
              <span className="font-bold text-emerald-700">{record.billingMatch}</span>
            </div>
          </div>

          {/* Card 3: Governance & Statuses */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-2 text-xs">
            <h2 className="font-bold text-gray-900 text-sm border-b pb-2 border-gray-100">Governance &amp; Audit</h2>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Settlement Status</span>
              <span className="font-bold text-emerald-700">{record.settlementStatus}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Reconciliation</span>
              <span className="font-bold text-emerald-700">{record.reconciliationStatus}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Finance Owner</span>
              <span className="font-semibold text-gray-800">{record.owner}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Reviewer</span>
              <span className="font-semibold text-gray-800">{record.reviewer}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">SLA Status</span>
              <span className="font-bold text-emerald-700">{record.sla}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
