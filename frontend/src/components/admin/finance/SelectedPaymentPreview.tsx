'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, Maximize2, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import { PaymentPortfolioRow } from '@/types/finance';

interface Props {
  payment?: PaymentPortfolioRow | null;
}

const PREVIEW_TABS = [
  'Overview',
  'Authorization',
  'Capture',
  'Payment Method',
  'Gateway',
  'Risk & Auth',
  'Order',
  'Invoice',
  '+11',
];

export function SelectedPaymentPreview({ payment: paymentProp }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Overview');

  const detail = paymentProp
    ? {
        ...paymentProp,
        id: paymentProp.id,
        ref: paymentProp.ref,
        relatedOrder: paymentProp.relatedOrder,
        invoiceRef: paymentProp.invoiceRef,
        customer: paymentProp.customer,
        grossAmount: paymentProp.grossAmount,
        capturedAmount: paymentProp.capturedAmount,
        paymentMethod: paymentProp.paymentMethod,
        gateway: paymentProp.gateway,
        authStatus: paymentProp.authStatus,
        captureStatus: paymentProp.captureStatus,
        paymentResponse: paymentProp.paymentResponse,
        settlementStatus: paymentProp.settlementStatus,
        reconciliationStatus: paymentProp.reconciliationStatus,
        threeDS: 'Not available', billingMatch: 'Not available', providerRef: (paymentProp as any).providerRef ?? 'Not available',
        refundLinkage: 'Not available', disputeLinkage: 'Not available', approvalStatus: 'Not available', recordVersion: 'Not available', updatedAt: (paymentProp as any).updatedAt ?? paymentProp.txnDate,
      }
    : null;

  if (!detail) return <div className="bg-white border border-dashed border-gray-300 rounded-lg p-6 text-center text-xs text-gray-500">Select a payment record from the portfolio to view its live details.</div>;

  const navigateToDetail = () => {
    toast.loading(`Opening Payment Detail (${detail.id})...`, { id: 'nav-fn04-prev' });
    setTimeout(() => {
      toast.dismiss('nav-fn04-prev');
      router.push(`/admin/finance/payments/${detail.id}`);
    }, 400);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden text-xs">
      {/* 1. Header Bar */}
      <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold text-gray-900">Selected Payment Preview</h2>
          <span className="font-mono text-xs font-bold text-[#8f002b]">{detail.id}</span>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
            <CheckCircle2 size={10} />
            Success
          </span>
        </div>

        <button
          onClick={navigateToDetail}
          className="p-1 text-gray-500 hover:text-[#8f002b] hover:bg-gray-200 rounded transition-colors"
          title="Open Full FN04 Payment Detail Screen"
        >
          <Maximize2 size={13} />
        </button>
      </div>

      {/* 2. Sub-Tabs Row */}
      <div className="flex items-center gap-1 px-3 py-1.5 border-b border-gray-100 bg-white overflow-x-auto scrollbar-thin">
        {PREVIEW_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 py-1 text-[11px] font-bold rounded transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'bg-[#8f002b] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. Multi-Column Key-Value Metadata Grid */}
      <div className="p-3 grid grid-cols-2 gap-x-4 gap-y-2 font-medium text-[11px]">
        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Transaction ID</span>
          <span className="font-mono font-bold text-gray-900">{detail.id}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Authentication Status</span>
          <span className="font-semibold text-emerald-700">{detail.threeDS}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Payment Reference</span>
          <span className="font-mono text-gray-700">{detail.ref}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">3DS</span>
          <span className="font-semibold text-emerald-700">{detail.threeDS}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Customer</span>
          <span className="font-bold text-gray-900 truncate max-w-[110px]" title={detail.customer}>
            {detail.customer}
          </span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Billing Match</span>
          <span className="font-semibold text-emerald-700">{detail.billingMatch}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Customer ID</span>
          <span className="font-mono text-gray-600">{detail.customerId}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Duplicate Status</span>
          <span className="font-semibold text-gray-700">{detail.duplicateStatus}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Related Order</span>
          <span className="font-mono text-gray-700">{detail.relatedOrder}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Payment Hold</span>
          <span className="font-semibold text-gray-700">{detail.hold}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Provider Reference</span>
          <span className="font-mono text-gray-600">{detail.providerRef}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Refund Linkage</span>
          <span className="font-semibold text-gray-700">{detail.refundLinkage}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Authorized Amount</span>
          <span className="font-mono font-bold text-gray-900">
            LKR {detail.grossAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Dispute Linkage</span>
          <span className="font-semibold text-gray-700">{detail.disputeLinkage}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Captured Amount</span>
          <span className="font-mono font-bold text-emerald-700">
            LKR {detail.capturedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Settlement Status</span>
          <span className="font-bold text-emerald-700">{detail.settlementStatus}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Gateway Response</span>
          <span className="font-semibold text-emerald-700">{detail.paymentResponse}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Settlement Date</span>
          <span className="text-gray-700">{detail.settlementDate}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Failure Reason</span>
          <span className="text-gray-400">—</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Reconciliation Status</span>
          <span className="font-bold text-emerald-700">{detail.reconciliationStatus}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Payment Method</span>
          <span className="font-semibold text-gray-900">{detail.paymentMethod}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Approval Status</span>
          <span className="font-bold text-emerald-700">{detail.approvalStatus}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Gateway</span>
          <span className="font-semibold text-gray-800">{detail.gateway}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Finance Owner</span>
          <span className="font-semibold text-gray-800">{detail.owner}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Masked Reference</span>
          <span className="font-mono text-gray-600">4111••••••••4242</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Reviewer</span>
          <span className="font-semibold text-gray-800">{detail.reviewer}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Auth Status</span>
          <span className="font-bold text-emerald-700">{detail.authStatus}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">SLA Status</span>
          <span className="font-bold text-emerald-700">{detail.sla}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Capture Status</span>
          <span className="font-bold text-emerald-700">{detail.captureStatus}</span>
        </div>

        <div className="flex justify-between border-b border-gray-50 pb-1">
          <span className="text-gray-400">Record Version</span>
          <span className="font-mono text-gray-600">{detail.recordVersion}</span>
        </div>
      </div>

      {/* Footer Timestamp & CTA */}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-[10px] text-gray-500">
        <span>Last Updated: {detail.updatedAt}</span>
        <button
          onClick={navigateToDetail}
          className="text-[#8f002b] font-bold hover:underline flex items-center gap-1"
        >
          <span>Open Full Payment Record (FN04)</span>
          <ExternalLink size={11} />
        </button>
      </div>
    </div>
  );
}
