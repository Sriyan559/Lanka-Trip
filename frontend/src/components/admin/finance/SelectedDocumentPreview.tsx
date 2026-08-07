'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, CheckCircle2, Maximize2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { FinancialDocumentDetail } from '@/types/finance';

const PREVIEW_TABS = [
  'Overview',
  'Line Items',
  'Calculation',
  'Tax',
  'Source Linkage',
  'Payments',
  'Credit Notes',
  'Debit Notes',
  'Approval',
  'Delivery',
  'Holds',
  'Disputes',
  'Reconciliation',
  'Exceptions',
  'Linked Records',
  'Communications',
  'Activity',
  'Audit History',
];

interface Props {
  record: FinancialDocumentDetail;
}

export function SelectedDocumentPreview({ record }: Props) {
  const router = useRouter();
  const [activePreviewTab, setActivePreviewTab] = useState('Overview');

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
      {/* Header & Expand Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Selected Document Preview:
          </h2>
          <span className="font-mono font-extrabold text-sm text-[#8f002b]">{record.id}</span>
          <span className="text-xs font-bold text-gray-900">— {record.partyName}</span>
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
            <CheckCircle2 size={11} />
            {record.paymentStatus}
          </span>
        </div>

        <button
          onClick={() => toast(`Opening full document view for ${record.id}`)}
          className="px-3 py-1 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Maximize2 size={12} />
          <span>View Full Record</span>
        </button>
      </div>

      {/* 18 Preview Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto text-[11px] font-semibold text-gray-500">
        {PREVIEW_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActivePreviewTab(tab)}
            className={[
              'px-3 py-1.5 border-b-2 whitespace-nowrap transition-colors',
              activePreviewTab === tab
                ? 'border-[#8f002b] text-[#8f002b] font-bold bg-red-50/30'
                : 'border-transparent hover:text-gray-900 hover:bg-gray-50',
            ].join(' ')}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Key-Value Grids */}
      {activePreviewTab === 'Overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 text-xs">
          {/* Panel 1: Party & Document */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Party &amp; Document
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Customer</span>
              <span className="font-bold text-gray-900 truncate">{record.partyName}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Party ID</span>
              <span className="font-mono text-gray-700 text-[10px]">{record.partyId}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Party Type</span>
              <span className="font-semibold text-gray-800">{record.partyType}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Business Unit</span>
              <span className="text-gray-700">{record.businessUnit}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Sales Channel</span>
              <span className="text-gray-700">{record.channel}</span>
            </div>
          </div>

          {/* Panel 2: Linked Records */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Linked Records
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Related Order</span>
              <span className="font-mono text-blue-600 font-bold">{record.relatedOrder}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Purchase Order</span>
              <span className="font-mono text-gray-700 text-[10px]">{record.purchaseOrder}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Goods Receipt</span>
              <span className="font-mono text-gray-700 text-[10px]">{record.goodsReceipt}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">External Doc #</span>
              <span className="font-mono text-gray-700 text-[10px]">{record.externalDocNum}</span>
            </div>
          </div>

          {/* Panel 3: Amounts Summary */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Amounts Summary (LKR)
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Gross Amount</span>
              <span className="font-mono font-bold text-gray-900">{record.grossAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Discount</span>
              <span className="font-mono text-gray-700">{record.discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Tax</span>
              <span className="font-mono text-gray-700">{record.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5 border-t border-gray-200 pt-0.5 mt-0.5">
              <span className="font-bold text-gray-900">Net Amount</span>
              <span className="font-mono font-extrabold text-[#8f002b]">{record.netAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Paid Amount</span>
              <span className="font-mono font-bold text-emerald-700">{record.paidAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Outstanding</span>
              <span className="font-mono text-red-600 font-bold">{(record.netAmount - record.paidAmount).toLocaleString()}</span>
            </div>
          </div>

          {/* Panel 4: Approval Chain */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Approval Chain
            </p>
            <div className="flex flex-col gap-1 text-[10px] mt-0.5">
              {record.approvalChain?.map((step) => (
                <div key={step.step} className="flex items-center justify-between gap-1 border-b border-gray-100 pb-0.5">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="w-3 h-3 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[8px] font-bold shrink-0">
                      ✓
                    </span>
                    <span className="font-semibold text-gray-800 truncate">{step.step} by</span>
                  </div>
                  <span className="text-gray-700 font-mono text-[9px] truncate max-w-[70px]">{step.user}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 5: Delivery & Payment */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Delivery &amp; Payment
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Delivery Status</span>
              <span className="font-bold text-emerald-700">{record.deliveryStatus}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Sent On</span>
              <span className="text-gray-700 text-[10px]">{record.deliverySentDate}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Viewed On</span>
              <span className="text-gray-700 text-[10px]">{record.deliveryViewedDate}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Payment Status</span>
              <span className="font-bold text-purple-700">{record.paymentStatus}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Payment Match</span>
              <span className="font-bold text-emerald-700">{record.paymentMatch}</span>
            </div>
          </div>

          {/* Panel 6: Tax & Duplicate Confidence */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Tax &amp; Security
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Taxable Amount</span>
              <span className="font-mono text-gray-900">{record.grossAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Tax Type</span>
              <span className="font-semibold text-gray-800">VAT 18%</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Tax Status</span>
              <span className="font-bold text-emerald-700">{record.taxStatus}</span>
            </div>
            <div className="flex justify-between py-0.5 border-t border-gray-200 pt-0.5 mt-0.5">
              <span className="text-gray-500">Duplicate Confidence</span>
              <span className="font-bold text-emerald-700">Low Risk ({record.duplicateConfidencePct}%)</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Reconciliation State</span>
              <span className="font-bold text-emerald-700">{record.reconciliationStatus}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
