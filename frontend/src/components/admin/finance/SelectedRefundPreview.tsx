'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  FileCheck,
  RotateCcw,
  Star,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { RefundRecordDetail } from '@/types/finance';

interface Props {
  record: RefundRecordDetail;
}

export function SelectedRefundPreview({ record }: Props) {
  const [moreActionsOpen, setMoreActionsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
      {/* Top Header & Actions Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Selected Refund Preview
          </h2>
          <span className="font-mono font-extrabold text-sm text-[#8f002b]">{record.id}</span>
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
            <CheckCircle2 size={11} />
            {record.processing}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => toast('Reviewing eligibility...')}
            className="px-2.5 py-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            Review Eligibility
          </button>
          <button
            onClick={() => toast.success('Refund approved!')}
            className="px-2.5 py-1 bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1 transition-colors"
          >
            <CheckCircle2 size={12} />
            <span>Approve Refund</span>
          </button>
          <button
            onClick={() => toast.success('Releasing refund to gateway...')}
            className="px-2.5 py-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            Release Refund
          </button>
          <button
            onClick={() => toast.success('Reissuing refund...')}
            className="px-2.5 py-1 bg-white border border-amber-300 text-amber-800 hover:bg-amber-50 text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reissue Refund</span>
          </button>

          {/* More Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreActionsOpen((p) => !p)}
              className="px-2.5 py-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1 transition-colors"
            >
              <span>More Actions</span>
              <ChevronDown size={12} />
            </button>
            {moreActionsOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-40 text-xs font-medium text-gray-700">
                {[
                  'View Full Audit Trail',
                  'Download Supporting Docs',
                  'Flag for Manual Recon',
                  'Escalate to Finance Lead',
                ].map((a) => (
                  <button
                    key={a}
                    onClick={() => {
                      toast(`Action: ${a}`);
                      setMoreActionsOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-gray-50 transition-colors"
                  >
                    {a}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6 Key-Value Sub-sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 text-xs">
        {/* 1. Customer Section */}
        <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
            Customer
          </p>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Customer</span>
            <span className="font-bold text-gray-900 truncate">{record.customerName}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Customer ID</span>
            <span className="font-mono text-gray-700 text-[10px]">{record.customerId}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Contact</span>
            <span className="text-gray-700 text-[10px] truncate">{record.contactEmail}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Phone</span>
            <span className="font-mono text-gray-700 text-[10px]">{record.contactPhone}</span>
          </div>
        </div>

        {/* 2. Order ID & Payment Linkage */}
        <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
            Order &amp; Payment Linkage
          </p>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Order ID</span>
            <span className="font-mono font-bold text-[#8f002b]">{record.orderId}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Payment Method</span>
            <span className="font-semibold text-gray-800">{record.paymentMethod}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Transaction ID</span>
            <span className="font-mono text-gray-700 text-[10px]">{record.transactionId}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Auth Code</span>
            <span className="font-mono text-gray-700 text-[10px]">{record.authCode}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Captured On</span>
            <span className="text-gray-600 text-[10px]">{record.capturedOn}</span>
          </div>
        </div>

        {/* 3. Refund Information */}
        <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
            Refund Information
          </p>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Refund Type</span>
            <span className="font-bold text-gray-800">{record.refundType}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Refund Amount</span>
            <span className="font-mono font-extrabold text-[#8f002b]">
              LKR {record.refundAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Compensation</span>
            <span className="font-mono font-semibold text-purple-700">
              LKR {record.compensationAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between py-0.5 border-t border-gray-200 pt-1">
            <span className="text-gray-700 font-bold">Total Refund</span>
            <span className="font-mono font-black text-gray-900">
              LKR {(record.refundAmount + record.compensationAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Refund Reason</span>
            <span className="font-medium text-gray-800">{record.refundReason}</span>
          </div>
        </div>

        {/* 4. Processing & Settlement */}
        <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
            Processing &amp; Settlement
          </p>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Processing Status</span>
            <span className="font-bold text-emerald-700">{record.processing}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Processed By</span>
            <span className="font-medium text-gray-800">{record.processedBy}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Processed On</span>
            <span className="text-gray-600 text-[10px]">{record.processedOn}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Gateway</span>
            <span className="font-semibold text-gray-800">{record.gateway}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Settlement Batch</span>
            <span className="font-mono text-gray-700 text-[10px]">{record.settlementBatch}</span>
          </div>
        </div>

        {/* 5. Reconciliation & Audit */}
        <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
            Reconciliation &amp; Audit
          </p>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Recon Status</span>
            <span className="font-bold text-emerald-700">{record.reconciliationStatus}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Reconciled On</span>
            <span className="text-gray-600 text-[10px]">{record.reconciledOn}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Audit Trail</span>
            <button
              onClick={() => toast('Opening Audit Trail...')}
              className="text-[#8f002b] hover:underline font-semibold flex items-center gap-0.5 text-[10px]"
            >
              <span>View Audit Trail</span>
              <ExternalLink size={10} />
            </button>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Documents</span>
            <button
              onClick={() => toast('Opening Supporting Docs...')}
              className="text-[#8f002b] hover:underline font-semibold flex items-center gap-0.5 text-[10px]"
            >
              <span>View Supporting Docs</span>
              <ExternalLink size={10} />
            </button>
          </div>
        </div>

        {/* 6. Communication & Resolution */}
        <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
            Communication &amp; Resolution
          </p>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Customer Notified</span>
            <span className="text-gray-600 text-[10px]">{record.customerNotified}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Notification</span>
            <span className="font-medium text-gray-800">{record.notificationChannel}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">SLA Status</span>
            <span className="font-bold text-emerald-700">{record.slaStatus}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Resolution Time</span>
            <span className="font-mono text-gray-700">{record.resolutionTime}</span>
          </div>
          <div className="flex justify-between py-0.5 items-center">
            <span className="text-gray-500">CSAT</span>
            <div className="flex items-center gap-0.5 text-amber-500 font-bold">
              <span>{record.csat?.toFixed(1)} / 5.0</span>
              <div className="flex items-center text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={10} fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
