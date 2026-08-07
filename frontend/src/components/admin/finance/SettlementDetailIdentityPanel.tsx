'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { FN10FullDetailRecord } from '@/data/mockSettlementDetailData';

interface Props {
  record: FN10FullDetailRecord;
}

export function SettlementDetailIdentityPanel({ record }: Props) {
  const actions = [
    { label: 'Approve Settlement', state: 'allowed', style: 'success' },
    { label: 'Approve with Conditions', state: 'permission', style: 'success-outline' },
    { label: 'Reject Settlement', state: 'allowed', style: 'danger-outline' },
    { label: 'Schedule Payout', state: 'disabled', style: 'disabled' },
    { label: 'Submit Payout', state: 'disabled', style: 'disabled' },
    { label: 'Retry Payout', state: 'disabled', style: 'disabled' },
    { label: 'Release Approved Hold', state: 'disabled', style: 'disabled' },
    { label: 'Start Reconciliation', state: 'disabled', style: 'disabled' },
    { label: 'Request Beneficiary Verification', state: 'permission', style: 'outline' },
    { label: 'Request Supplier Update', state: 'allowed', style: 'outline' },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Governed Action Toolbar */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
            Governed Actions
          </span>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Allowed for you
            </span>
            <span className="flex items-center gap-1 text-amber-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              Allowed with permission
            </span>
            <span className="flex items-center gap-1 text-gray-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
              Not available in current state
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          {actions.map((act) => {
            const isDisabled = act.state === 'disabled';
            return (
              <button
                key={act.label}
                disabled={isDisabled}
                onClick={() =>
                  isDisabled
                    ? toast.error(`${act.label}: Action not available in current settlement state.`)
                    : toast.success(`Triggered: ${act.label}`)
                }
                className={[
                  'px-3 py-1.5 rounded-lg font-bold transition-colors shadow-sm flex items-center gap-1 border',
                  act.style === 'success'
                    ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                    : act.style === 'success-outline'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                    : act.style === 'danger-outline'
                    ? 'bg-white text-red-600 border-red-300 hover:bg-red-50'
                    : act.style === 'outline'
                    ? 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60 shadow-none',
                ].join(' ')}
              >
                <span>{act.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Identity & Status Summary Panels Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Settlement Identity Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide border-b border-gray-100 pb-1">
            Settlement / Payout Identity
          </p>
          <div className="grid grid-cols-2 gap-y-1.5 text-xs">
            <div>
              <span className="text-[10px] text-gray-500 block">Settlement Reference</span>
              <span className="font-mono font-bold text-[#8f002b]">{record.settlementId}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 block">Version</span>
              <span className="font-mono font-bold text-gray-800">{record.version}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 block">Order Link ID</span>
              <span className="font-mono text-blue-600 font-bold">{record.orderLinkId}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 block">Bank Transfer</span>
              <span className="font-semibold text-gray-800">{record.bankTransferRef}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 block">Beneficiary Type</span>
              <span className="font-semibold text-gray-800">{record.beneficiaryType}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 block">Beneficiary Tier</span>
              <span className="font-semibold text-gray-800">{record.beneficiaryTier}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[10px] text-gray-500 block">Beneficiary Name</span>
              <span className="font-bold text-gray-900 text-sm">{record.beneficiaryName}</span>
            </div>
          </div>
        </div>

        {/* Current Status Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide border-b border-gray-100 pb-1">
            Current Status
          </p>
          <div className="grid grid-cols-3 gap-2 text-[10px] text-center my-auto">
            <div className="bg-amber-50 text-amber-800 border border-amber-200 p-2 rounded-lg font-bold">
              {record.approvalStatus}
            </div>
            <div className="bg-orange-50 text-orange-800 border border-orange-200 p-2 rounded-lg font-bold">
              {record.payoutStatus}
            </div>
            <div className="bg-red-50 text-red-700 border border-red-200 p-2 rounded-lg font-bold">
              {record.reconciliationStatus}
            </div>
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-2 rounded-lg font-bold">
              {record.holdStatus}
            </div>
            <div className="bg-blue-50 text-blue-800 border border-blue-200 p-2 rounded-lg font-bold">
              {record.disputeStatus}
            </div>
            <div className="bg-gray-50 text-gray-800 border border-gray-200 p-2 rounded-lg font-bold">
              Days in Open: {record.daysInOpen}
            </div>
          </div>
        </div>

        {/* Record Metadata Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2 text-xs">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide border-b border-gray-100 pb-1">
            Record Metadata
          </p>
          <div className="flex flex-col gap-2 my-auto text-xs">
            <div className="flex justify-between items-center border-b border-gray-100 pb-1">
              <span className="text-gray-500 text-[10px]">Last Updated</span>
              <div className="text-right">
                <span className="font-mono font-bold text-gray-900 block">{record.lastUpdated}</span>
                <span className="text-[10px] text-gray-400">By {record.updatedBy}</span>
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-1">
              <span className="text-gray-500 text-[10px]">Created</span>
              <div className="text-right">
                <span className="font-mono font-bold text-gray-900 block">{record.createdOn}</span>
                <span className="text-[10px] text-gray-400">By {record.createdBy}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-[10px]">Record Version</span>
              <span className="font-mono font-bold text-gray-900">{record.recordVersion}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 12 KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-12 gap-2">
        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col gap-0.5">
          <span className="text-[9px] font-bold text-gray-500 uppercase truncate">1. Gross Earnings</span>
          <span className="text-xs font-extrabold font-mono text-gray-900">LKR 2.800M</span>
          <span className="text-[9px] font-bold text-emerald-600">▲ 2.4%</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col gap-0.5">
          <span className="text-[9px] font-bold text-gray-500 uppercase truncate">2. Total Deductions</span>
          <span className="text-xs font-extrabold font-mono text-gray-900">LKR 455K</span>
          <span className="text-[9px] font-bold text-red-600">▲ 1.7%</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col gap-0.5">
          <span className="text-[9px] font-bold text-gray-500 uppercase truncate">3. Tax Amount</span>
          <span className="text-xs font-extrabold font-mono text-gray-900">LKR 262K</span>
          <span className="text-[9px] font-bold text-emerald-600">▼ 1.8%</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col gap-0.5">
          <span className="text-[9px] font-bold text-gray-500 uppercase truncate">4. Withholding Tax</span>
          <span className="text-xs font-extrabold font-mono text-gray-900">LKR 84K</span>
          <span className="text-[9px] font-bold text-amber-600">▲ 1.3%</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col gap-0.5">
          <span className="text-[9px] font-bold text-gray-500 uppercase truncate">5. Reserve Balance</span>
          <span className="text-xs font-extrabold font-mono text-gray-900">LKR 50K</span>
          <span className="text-[9px] font-bold text-emerald-600">▲ 3.5%</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col gap-0.5">
          <span className="text-[9px] font-bold text-gray-500 uppercase truncate">6. Credits &amp; Adjustments</span>
          <span className="text-xs font-extrabold font-mono text-gray-900">LKR 75K</span>
          <span className="text-[9px] font-bold text-emerald-600">▲ 6.7%</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col gap-0.5 bg-rose-50/20 border-rose-200">
          <span className="text-[9px] font-bold text-gray-600 uppercase truncate">7. Net Settlement</span>
          <span className="text-xs font-extrabold font-mono text-[#8f002b]">LKR 2.286M</span>
          <span className="text-[9px] font-bold text-emerald-600">▲ 2.0%</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col gap-0.5">
          <span className="text-[9px] font-bold text-gray-500 uppercase truncate">8. Paid Amount</span>
          <span className="text-xs font-extrabold font-mono text-gray-900">LKR 0.00</span>
          <span className="text-[9px] font-bold text-gray-400">— 0.0%</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col gap-0.5">
          <span className="text-[9px] font-bold text-gray-500 uppercase truncate">9. Outstanding Amount</span>
          <span className="text-xs font-extrabold font-mono text-red-600">LKR 2.286M</span>
          <span className="text-[9px] font-bold text-red-600">▲ 2.0%</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col gap-0.5">
          <span className="text-[9px] font-bold text-gray-500 uppercase truncate">10. Validation Score</span>
          <span className="text-xs font-extrabold font-mono text-emerald-700">96%</span>
          <div className="w-full bg-gray-200 rounded-full h-1 mt-0.5 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '96%' }} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col gap-0.5">
          <span className="text-[9px] font-bold text-gray-500 uppercase truncate">11. Approval Progress</span>
          <span className="text-xs font-extrabold font-mono text-amber-700">2 / 3</span>
          <div className="w-full bg-gray-200 rounded-full h-1 mt-0.5 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '67%' }} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex flex-col gap-0.5">
          <span className="text-[9px] font-bold text-gray-500 uppercase truncate">12. SLA Progress</span>
          <span className="text-xs font-extrabold font-mono text-emerald-700">91%</span>
          <span className="text-[9px] font-bold text-emerald-600">▲ 1.6%</span>
        </div>
      </div>
    </div>
  );
}
