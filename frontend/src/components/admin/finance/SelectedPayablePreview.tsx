'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ExternalLink,
  CheckCircle2,
  Maximize2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { SupplierPayableDetail } from '@/types/finance';

const PREVIEW_TABS = [
  'Overview',
  'Calculation',
  'Invoice',
  'Purchase Order',
  'Goods Receipt',
  'Deductions',
  'Taxes & Withholding',
  'Supplier',
  'Approval',
  'Payment Schedule',
  'Settlement & Payout',
  'Holds',
  'Disputes',
  'Reconciliation',
  'Exceptions',
  'Linked Records',
  'Activity',
  'Audit History',
];

interface Props {
  record: SupplierPayableDetail;
}

export function SelectedPayablePreview({ record }: Props) {
  const router = useRouter();
  const [activePreviewTab, setActivePreviewTab] = useState('Overview');

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
      {/* Top Header & Expand Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Selected Payable Preview:
          </h2>
          <span className="font-mono font-extrabold text-sm text-[#8f002b]">{record.id}</span>
          <span className="text-xs font-bold text-gray-900">— {record.supplierName}</span>
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
            <CheckCircle2 size={11} />
            {record.matchStatus}
          </span>
        </div>

        {/* Drill-down Expand Button */}
        <button
          onClick={() => router.push(`/admin/finance/supplier-payables/${record.id}`)}
          className="px-3 py-1 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Maximize2 size={12} />
          <span>Open Full Payable View (FN07)</span>
        </button>
      </div>

      {/* 16 Preview Tabs */}
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

      {/* Overview Tab Key-Value Grids */}
      {activePreviewTab === 'Overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-3 text-xs">
          {/* 1. Supplier & Risk */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Supplier &amp; Risk
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Supplier</span>
              <span className="font-bold text-gray-900 truncate">{record.supplierName}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Supplier ID</span>
              <span className="font-mono text-gray-700 text-[10px]">{record.supplierId}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Risk Level</span>
              <span className="font-bold text-emerald-700">{record.riskLevel}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Payment Terms</span>
              <span className="font-semibold text-gray-800">{record.paymentTerms}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Currency</span>
              <span className="font-mono text-gray-700 text-[10px]">{record.preferredCurrency}</span>
            </div>
          </div>

          {/* 2. Invoice Details */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Invoice Details
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Invoice Ref</span>
              <span className="font-mono font-bold text-gray-900">{record.invoiceRef}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Invoice Date</span>
              <span className="text-gray-600 text-[10px]">{record.invoiceDate}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Invoice Amount</span>
              <span className="font-mono font-extrabold text-gray-900">
                LKR {record.grossAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Due Date</span>
              <span className="font-mono font-bold text-amber-700">{record.dueDate}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Invoice Status</span>
              <span className="font-bold text-emerald-700">Validated</span>
            </div>
          </div>

          {/* 3. PO & GR Linkage */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              PO &amp; GR Linkage
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Purchase Order</span>
              <span className="font-mono font-bold text-[#8f002b]">{record.poRef}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">PO Date</span>
              <span className="text-gray-600 text-[10px]">{record.poDate}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Goods Receipt</span>
              <span className="font-mono font-bold text-[#8f002b]">{record.grRef}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">GR Date</span>
              <span className="text-gray-600 text-[10px]">{record.grDate}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Receipt Status</span>
              <span className="font-bold text-emerald-700">{record.receiptStatus}</span>
            </div>
          </div>

          {/* 4. Calculation Summary */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Calculation Summary (LKR)
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Gross Liability</span>
              <span className="font-mono text-gray-800">{record.grossAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Returns Deduction</span>
              <span className="font-mono text-red-600">({record.returnsDeduction.toLocaleString()})</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Commission Deduction</span>
              <span className="font-mono text-red-600">({record.commissionOffset.toLocaleString()})</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Marketplace Fees</span>
              <span className="font-mono text-red-600">({record.marketplaceFees.toLocaleString()})</span>
            </div>
            <div className="flex justify-between py-0.5 border-t border-gray-200 pt-1">
              <span className="text-gray-900 font-bold">Net Payable</span>
              <span className="font-mono font-black text-[#8f002b]">{record.netPayable.toLocaleString()}</span>
            </div>
          </div>

          {/* 5. Approval & Payment */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Approval &amp; Payment
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Approval Status</span>
              <span className="font-bold text-emerald-700">{record.approvalStatus}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Approved By</span>
              <span className="font-medium text-gray-800">{record.approvedBy}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Approved On</span>
              <span className="text-gray-600 text-[10px]">{record.approvedOn}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Scheduled Date</span>
              <span className="font-mono font-bold text-blue-700">{record.scheduledDate}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Payout Status</span>
              <span className="font-bold text-emerald-700">{record.payoutStatus}</span>
            </div>
          </div>

          {/* 6. Reconciliation & Exceptions */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Reconciliation &amp; Exceptions
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Recon Status</span>
              <span className="font-bold text-emerald-700">{record.reconciliationStatus}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Match Status</span>
              <span className="font-bold text-emerald-700">{record.matchStatus}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Exceptions</span>
              <span className="font-semibold text-gray-700">{record.exceptionReason || 'None'}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Last Reconciled</span>
              <span className="text-gray-600 text-[10px]">{record.lastReconciled}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Reconciled By</span>
              <span className="font-medium text-gray-800">{record.reconciledBy}</span>
            </div>
          </div>

          {/* 7. Quick Actions */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Quick Actions
            </p>
            {[
              'View Invoice',
              'View Purchase Order',
              'View Goods Receipt',
              'View Deductions',
              'View Approval History',
              'View Payment Schedule',
              'View Reconciliation',
            ].map((act) => (
              <button
                key={act}
                onClick={() => toast(`Opening: ${act}`)}
                className="text-[#8f002b] hover:underline text-left text-[10px] font-semibold flex items-center justify-between py-0.5"
              >
                <span>{act}</span>
                <ExternalLink size={9} />
              </button>
            ))}
          </div>
        </div>
      )}

      {activePreviewTab !== 'Overview' && (
        <div className="p-4 bg-gray-50 rounded-lg text-xs text-gray-600 text-center font-medium">
          Detailed tab content for <strong>{activePreviewTab}</strong>. Open full payable view (FN07) for comprehensive details.
        </div>
      )}
    </div>
  );
}
