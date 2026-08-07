'use client';

import React, { useState } from 'react';
import { FinancePortfolioRow } from '@/types/finance';
import { MOCK_RECORD_DETAIL } from '@/data/mockFinanceData';

const PREVIEW_TABS = [
  'Overview',
  'Calculation',
  'Payment',
  'Refund',
  'Receivable/Payable',
  'Commission',
  'Settlement',
  'Reconciliation',
  'Exceptions',
  'Approvals',
  'Linked Records',
  'Activity',
  'Audit History',
];

interface Props {
  record?: FinancePortfolioRow | null;
}

export function SelectedFinancialRecordPreview({ record }: Props) {
  const [activeTab, setActiveTab] = useState('Overview');
  const d = MOCK_RECORD_DETAIL;

  // Use record info if selected from table, else default mock detail
  const currentRef = record?.ref || d.ref;
  const currentStatus = record?.paymentStatus || d.status;
  const currentOrder = record?.relatedOrder || d.relatedOrder;
  const currentParty = record?.party || d.customerSeller;
  const currentDomain = record ? `${record.domain} / ${record.type}` : d.domainType;
  const currentGross = record?.grossAmount ? `LKR ${record.grossAmount.toLocaleString()}` : d.grossAmount;
  const currentNet = record?.netAmount ? `LKR ${record.netAmount.toLocaleString()}` : d.netAmount;
  const currentOwner = record?.owner || d.owner;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-2">
      {/* Header & Status Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h3 className="font-extrabold text-xs text-gray-900 uppercase tracking-wide">
            Selected Financial Record Preview
          </h3>
          <span className="font-extrabold text-xs text-[#8f002b] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            {currentRef}
          </span>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {currentStatus}
          </span>
        </div>
      </div>

      {/* Preview Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 min-w-max">
          {PREVIEW_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-1 px-2.5 text-[11px] font-semibold transition-colors border-b-2 ${
                  isActive
                    ? 'border-[#8f002b] text-[#8f002b] font-bold bg-rose-50/60'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Overview Metadata Grid */}
      {activeTab === 'Overview' ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3 pt-1 text-xs">
          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Related Order</span>
            <span className="font-bold text-[#8f002b] hover:underline cursor-pointer">{currentOrder}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Customer / Seller</span>
            <span className="font-bold text-gray-900 truncate block">{currentParty}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Domain / Type</span>
            <span className="font-medium text-gray-800">{currentDomain}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Transaction Date</span>
            <span className="font-medium text-gray-700">{d.txnDate}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Gross Amount</span>
            <span className="font-bold text-gray-900">{currentGross}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Tax</span>
            <span className="font-semibold text-gray-700">{d.tax}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Fees</span>
            <span className="font-semibold text-gray-700">{d.fees}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Commission</span>
            <span className="font-semibold text-gray-700">{d.commission}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Net Amount</span>
            <span className="font-black text-gray-900">{currentNet}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Payment Gateway</span>
            <span className="font-semibold text-gray-800">{d.paymentGateway}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Payment Status</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] inline-block">
              {currentStatus}
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Receivable State</span>
            <span className="font-medium text-gray-800">{d.receivableState}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Settlement Batch</span>
            <span className="font-bold text-gray-900">{d.settlementBatch}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Settlement Status</span>
            <span className="font-bold text-emerald-700">{d.settlementStatus}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Settlement Date</span>
            <span className="font-medium text-gray-700">{d.settlementDate}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Reconciled On</span>
            <span className="font-medium text-gray-700">{d.reconciledOn}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Exception State</span>
            <span className="font-medium text-gray-400">{d.exceptionState}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Approval Status</span>
            <span className="font-bold text-emerald-700">{d.approvalStatus}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Owner</span>
            <span className="font-semibold text-gray-800">{currentOwner}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Reviewer / Approver</span>
            <span className="font-medium text-gray-700">{d.reviewer} / {d.approver}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">SLA</span>
            <span className="font-bold text-emerald-700">{d.sla}</span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Record Version</span>
            <span className="font-medium text-gray-600">{d.recordVersion}</span>
          </div>

          <div className="col-span-2">
            <span className="block text-[10px] font-semibold text-gray-400 uppercase">Updated At</span>
            <span className="font-medium text-gray-600">{d.updatedAt}</span>
          </div>
        </div>
      ) : (
        <div className="py-4 text-center text-xs text-gray-500 italic bg-gray-50 rounded">
          {activeTab} detail view loaded for {currentRef}
        </div>
      )}
    </div>
  );
}
