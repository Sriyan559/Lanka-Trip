'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, CheckCircle2, Maximize2, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { SettlementRecordDetail } from '@/types/finance';

const PREVIEW_TABS = [
  'Overview',
  'Calculation',
  'Beneficiary',
  'Linked Payables',
  'Commission & Fees',
  'Refunds & Returns',
  'Tax & Withholding',
  'Reserves',
  'Approval',
  'Payment Schedule',
  'Payout Execution',
  'Holds',
  'Disputes',
  'Reconciliation',
  'Exceptions',
  'Linked Records',
  'Communications',
  'Activity',
];

interface Props {
  record: SettlementRecordDetail;
}

export function SelectedSettlementPreview({ record }: Props) {
  const router = useRouter();
  const [activePreviewTab, setActivePreviewTab] = useState('Overview');

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
      {/* Header & Expand Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Selected Settlement Preview:
          </h2>
          <span className="font-mono font-extrabold text-sm text-[#8f002b]">{record.id}</span>
          <span className="text-xs font-bold text-gray-900">— {record.beneficiaryName}</span>
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
            <CheckCircle2 size={11} />
            {record.payoutStatus}
          </span>
        </div>

        <button
          onClick={() => router.push(`/admin/finance/settlements-payouts/${record.id}`)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 text-xs">
          {/* Panel 1: Settlement Overview */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Settlement Overview
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Settlement Reference</span>
              <span className="font-mono font-bold text-[#8f002b]">{record.id}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Settlement Type</span>
              <span className="font-bold text-gray-900">{record.settlementType}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Settlement Batch</span>
              <span className="font-mono text-gray-700 text-[10px]">{record.settlementBatch}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Settlement Period</span>
              <span className="text-gray-700">{record.settlementPeriod}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Currency</span>
              <span className="font-mono text-gray-500">{record.currency}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Status</span>
              <span className="font-bold text-emerald-700">{record.payoutStatus}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">SLA</span>
              <span className="font-bold text-emerald-700">{record.sla}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Finance Owner</span>
              <span className="font-semibold text-gray-800">{record.owner}</span>
            </div>
          </div>

          {/* Panel 2: Beneficiary Info */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Beneficiary
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Beneficiary Name</span>
              <span className="font-bold text-gray-900 truncate">{record.beneficiaryName}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Beneficiary Type</span>
              <span className="font-semibold text-gray-800">{record.beneficiaryType}</span>
            </div>
            {record.supplierId && (
              <div className="flex justify-between py-0.5">
                <span className="text-gray-500">Supplier ID</span>
                <span className="font-mono text-gray-700 text-[10px]">{record.supplierId}</span>
              </div>
            )}
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Business Unit</span>
              <span className="text-gray-700">{record.businessUnit}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Region</span>
              <span className="text-gray-700">{record.region}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Payment Method</span>
              <span className="text-gray-700">{record.paymentMethod}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Payment Provider</span>
              <span className="text-gray-700">{record.paymentProvider}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Beneficiary Contact</span>
              <span className="text-blue-600 truncate max-w-[100px]">{record.beneficiaryEmail}</span>
            </div>
          </div>

          {/* Panel 3: Financial Summary */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Financial Summary (LKR)
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Gross Earnings</span>
              <span className="font-mono font-bold text-gray-900">{record.grossEarnings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Supplier Payables</span>
              <span className="font-mono text-gray-700">{record.supplierPayablesDeduction.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Commission Deductions</span>
              <span className="font-mono text-red-600">({record.commissionDeduction.toLocaleString()})</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Platform Fees</span>
              <span className="font-mono text-red-600">({record.platformFeeDeduction.toLocaleString()})</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Refund Deductions</span>
              <span className="font-mono text-red-600">({record.refundDeduction.toLocaleString()})</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Return Deductions</span>
              <span className="font-mono text-red-600">({record.returnDeduction.toLocaleString()})</span>
            </div>
            <div className="flex justify-between py-0.5 border-t border-gray-200 pt-0.5 mt-0.5">
              <span className="font-bold text-gray-900">Net Settlement</span>
              <span className="font-mono font-extrabold text-[#8f002b]">{record.netSettlement.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Paid Amount</span>
              <span className="font-mono font-bold text-emerald-700">{record.paidAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Panel 4: Payment Destination */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Payment Destination
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Bank Name</span>
              <span className="font-semibold text-gray-800 truncate max-w-[110px]">{record.bankName}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Account Name</span>
              <span className="font-semibold text-gray-800 truncate max-w-[110px]">{record.accountName}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Account Number</span>
              <span className="font-mono text-gray-700 font-bold">{record.maskedAccount}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Branch</span>
              <span className="text-gray-700">{record.branch}</span>
            </div>
            <div className="flex justify-between py-0.5 border-t border-gray-200 pt-0.5 mt-0.5">
              <span className="text-gray-500">Destination Validation</span>
              <span className="font-bold text-emerald-700">{record.destinationValidation}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Validation Date</span>
              <span className="text-gray-700 text-[10px]">{record.validationDate}</span>
            </div>
          </div>

          {/* Panel 5: Approval Trail */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Approval Trail
            </p>
            <div className="flex flex-col gap-1 text-[10px] mt-0.5">
              {record.approvalTrail?.map((step) => (
                <div key={step.step} className="flex items-center justify-between gap-1 border-b border-gray-100 pb-0.5">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="w-3 h-3 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[8px] font-bold shrink-0">
                      ✓
                    </span>
                    <span className="font-semibold text-gray-800 truncate">{step.step} by</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 font-mono text-[9px]">
                    <span className="text-gray-700">{step.user}</span>
                    <span className="text-gray-400">on</span>
                    <span className="text-gray-600">{step.date.split(' ').slice(0, 3).join(' ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
