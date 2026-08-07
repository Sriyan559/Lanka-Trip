'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, CheckCircle2, Maximize2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { CommissionRecordDetail } from '@/types/finance';

const PREVIEW_TABS = [
  'Overview',
  'Calculation',
  'Rule & Version',
  'Order',
  'Supplier / Seller',
  'Fees',
  'Reversals',
  'Waivers & Exemptions',
  'Adjustments',
  'Approval',
  'Settlement Impact',
  'Reconciliation',
  'Disputes',
  'Exceptions',
  'Linked Records',
  'Activity',
  'Audit History',
];

interface Props {
  record: CommissionRecordDetail;
}

export function SelectedCommissionPreview({ record }: Props) {
  const router = useRouter();
  const [activePreviewTab, setActivePreviewTab] = useState('Overview');

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
      {/* Header & Expand Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Selected Commission Preview:
          </h2>
          <span className="font-mono font-extrabold text-sm text-[#8f002b]">{record.id}</span>
          <span className="text-xs font-bold text-gray-900">— {record.partyName}</span>
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
            <CheckCircle2 size={11} />
            {record.calculationStatus}
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

      {/* 17 Preview Tabs */}
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
          {/* Panel 1 */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Record &amp; Order
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Record Type</span>
              <span className="font-bold text-gray-900">{record.recordType}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Related Order</span>
              <span className="font-mono text-blue-600 font-bold">{record.orderId}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Supplier / Seller</span>
              <span className="font-bold text-gray-900">{record.partyName}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Supplier ID</span>
              <span className="font-mono text-gray-700 text-[10px]">{record.partyId}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Product / Service</span>
              <span className="text-gray-700 truncate max-w-[110px]">{record.category} / {record.brand}</span>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Gross &amp; Rule
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Gross Sale (LKR)</span>
              <span className="font-mono font-bold text-gray-900">{record.grossSale.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Commission Base</span>
              <span className="font-mono text-gray-800">{record.commissionBase.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Applied Rule</span>
              <span className="font-mono font-bold text-purple-700">{record.commissionRule}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Rule Version</span>
              <span className="font-mono text-gray-700">{record.ruleVersion}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Effective Date</span>
              <span className="text-gray-700">{record.effectiveDate}</span>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Rates &amp; Fees
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Commission Rate</span>
              <span className="font-mono font-bold text-gray-900">{record.rulePct.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Commission Amount</span>
              <span className="font-mono font-bold text-emerald-700">{record.commissionAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Platform Fee</span>
              <span className="font-mono text-gray-700">{record.platformFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Processing Fee</span>
              <span className="font-mono text-gray-700">{record.processingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Fulfilment Fee</span>
              <span className="font-mono text-gray-700">{record.fulfilmentFee.toFixed(2)}</span>
            </div>
          </div>

          {/* Panel 4 */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Reversals &amp; Waivers
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Logistics Fee</span>
              <span className="font-mono text-gray-700">{record.logisticsFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Promo Contribution</span>
              <span className="font-mono text-gray-700">{record.promoContribution.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Reversal Amount</span>
              <span className="font-mono text-red-600 font-bold">{record.reversal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Waiver / Exemption</span>
              <span className="font-mono text-gray-700">{record.waiverExemption.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-0.5 border-t border-gray-200 pt-0.5 mt-0.5">
              <span className="font-bold text-gray-900">Net Commission</span>
              <span className="font-mono font-extrabold text-[#8f002b]">{record.netCommissionValue.toFixed(2)}</span>
            </div>
          </div>

          {/* Panel 5 */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Settlement &amp; Recon
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Settlement Pending</span>
              <span className="font-mono font-bold text-gray-900">{record.settlementPendingAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Reconciliation State</span>
              <span className="font-semibold text-gray-800">{record.reconciliationStatus}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Finance Owner</span>
              <span className="font-semibold text-gray-800">{record.owner}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Reviewer</span>
              <span className="font-semibold text-gray-800">{record.reviewer}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Approver</span>
              <span className="font-semibold text-gray-800">{record.approver}</span>
            </div>
          </div>

          {/* Panel 6 */}
          <div className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Audit &amp; SLA
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">SLA Status</span>
              <span className="font-mono font-bold text-emerald-700">{record.sla}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Record Version</span>
              <span className="font-mono text-gray-700">v1.0</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Calculation Date</span>
              <span className="text-gray-700 text-[10px]">{record.calculatedDate}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Updated At</span>
              <span className="text-gray-700 text-[10px]">{record.updatedAt}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
