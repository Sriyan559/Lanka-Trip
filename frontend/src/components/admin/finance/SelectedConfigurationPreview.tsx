'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Maximize2, Play } from 'lucide-react';
import toast from 'react-hot-toast';
import { ConfigurationRecordDetail } from '@/types/finance';

const PREVIEW_TABS = [
  'Overview',
  'Rule Definition',
  'Scope',
  'Calculation',
  'Jurisdiction',
  'Currency',
  'Dependencies',
  'Impact Simulation',
  'Approval',
  'Activation',
  'Conflicts',
  'Exceptions',
  'Linked Records',
  'Activity',
  'Audit History',
];

interface Props {
  record: ConfigurationRecordDetail;
}

export function SelectedConfigurationPreview({ record }: Props) {
  const [activePreviewTab, setActivePreviewTab] = useState('Overview');

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
      {/* Header & Expand Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Selected Configuration Preview:
          </h2>
          <span className="font-mono font-extrabold text-sm text-[#8f002b]">{record.id}</span>
          <span className="text-xs font-bold text-gray-900">— {record.name}</span>
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
            <CheckCircle2 size={11} />
            {record.activationStatus}
          </span>
        </div>

        <button
          onClick={() => toast(`Opening full view for ${record.id}`)}
          className="px-3 py-1 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Maximize2 size={12} />
          <span>View Full Record</span>
        </button>
      </div>

      {/* 15 Preview Tabs */}
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
          {/* Panel 1: Overview */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Overview
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Status</span>
              <span className="font-bold text-emerald-700">{record.activationStatus}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Provider</span>
              <span className="font-bold text-gray-900">{record.provider}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Rate Type</span>
              <span className="font-semibold text-gray-800">{record.rateType}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Effective Window</span>
              <span className="text-gray-700 text-[10px]">May 15, 2025 – Open</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Freshness</span>
              <span className="text-emerald-700 font-semibold">{record.freshness}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Owner</span>
              <span className="font-semibold text-gray-800">{record.owner}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Approver</span>
              <span className="font-semibold text-gray-800">{record.approver}</span>
            </div>
          </div>

          {/* Panel 2: Rule Definition / FX Details */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Rule Definition / FX Details
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Source Currency</span>
              <span className="font-mono font-bold text-gray-900">{record.sourceCurrency}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Target Currency</span>
              <span className="font-mono font-bold text-gray-900">{record.targetCurrency}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Rate</span>
              <span className="font-mono font-bold text-emerald-700">{record.numericRate}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Precision</span>
              <span className="font-mono text-gray-700">{record.precision} decimal places</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Rounding Mode</span>
              <span className="text-gray-700">{record.roundingMode}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Fallback Source</span>
              <span className="text-gray-700">{record.fallbackSource}</span>
            </div>
          </div>

          {/* Panel 3: Dependencies & Linked Records */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Dependencies &amp; Impact
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Affected Orders</span>
              <span className="font-mono font-bold text-gray-900">{record.affectedOrdersCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Affected Invoices</span>
              <span className="font-mono text-gray-700">{record.affectedInvoicesCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Affected Payables</span>
              <span className="font-mono text-gray-700">{record.affectedPayablesCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Customer Price Impact</span>
              <span className="font-mono font-bold text-emerald-700">{record.customerPriceImpact}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Payout Impact</span>
              <span className="font-mono font-bold text-emerald-700">{record.payoutImpact}</span>
            </div>
            <button
              onClick={() => toast.success('Running FX impact simulation...')}
              className="mt-1 w-full py-1 bg-white border border-gray-300 hover:bg-gray-50 rounded text-[10px] font-bold flex items-center justify-center gap-1 text-gray-700 shadow-sm"
            >
              <Play size={10} className="text-emerald-600" />
              <span>Run Impact Simulation</span>
            </button>
          </div>

          {/* Panel 4: Conflicts */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Conflicts
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Open Conflicts</span>
              <span className="font-mono font-bold text-emerald-700">0</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Potential Conflicts</span>
              <span className="font-mono text-gray-700">0</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Resolved Conflicts</span>
              <span className="font-mono text-gray-700">0</span>
            </div>
            <button
              onClick={() => toast('Viewing configuration conflicts...')}
              className="mt-auto w-full py-1 bg-white border border-gray-300 hover:bg-gray-50 rounded text-[10px] font-bold text-gray-700 shadow-sm"
            >
              View Conflicts
            </button>
          </div>

          {/* Panel 5: Audit Summary */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Audit Summary
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Created At</span>
              <span className="text-gray-700 text-[10px]">May 15, 2025 08:15 AM</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Created By</span>
              <span className="text-gray-700 text-[10px]">System / Reuters API</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Last Updated</span>
              <span className="text-gray-700 text-[10px]">{record.updatedAt}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Total Changes</span>
              <span className="font-mono font-bold text-gray-900">7</span>
            </div>
            <button
              onClick={() => toast('Viewing configuration audit history...')}
              className="mt-auto w-full py-1 bg-white border border-gray-300 hover:bg-gray-50 rounded text-[10px] font-bold text-gray-700 shadow-sm"
            >
              View Audit History
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
