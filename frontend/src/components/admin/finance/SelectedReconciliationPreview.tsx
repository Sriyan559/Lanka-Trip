'use client';

import React, { useState } from 'react';
import { CheckCircle2, Maximize2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { ReconciliationRecordDetail } from '@/types/finance';

const PREVIEW_TABS = [
  'Overview',
  'Internal Record',
  'External Record',
  'Match Details',
  'Variance Analysis',
  'Source Linkage',
  'Exception',
  'Financial Controls',
  'Holds',
  'Approval',
  'Evidence',
  'Certification',
  'Linked Records',
  'Activity',
  'Audit History',
];

interface Props {
  record: ReconciliationRecordDetail;
}

export function SelectedReconciliationPreview({ record }: Props) {
  const [activePreviewTab, setActivePreviewTab] = useState('Overview');

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
      {/* Header & Expand Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Selected Reconciliation Preview:
          </h2>
          <span className="font-mono font-extrabold text-sm text-[#8f002b]">{record.id}</span>
          <span className="text-xs font-bold text-gray-900">— {record.domain} / {record.type}</span>
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
            <CheckCircle2 size={11} />
            {record.matchStatus}
          </span>
        </div>

        <button
          onClick={() => toast(`Opening full reconciliation record for ${record.id}`)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Column 1: Record Identifiers & Amounts */}
          <div className="flex flex-col gap-1.5 p-2.5 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Reconciliation Summary
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Reconciliation Ref</span>
              <span className="font-mono font-bold text-[#8f002b]">{record.id}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Domain / Type</span>
              <span className="font-semibold text-gray-800">{record.domain} / {record.type}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Internal Record</span>
              <span className="font-mono text-blue-600 font-bold">{record.internalRecord}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">External Record</span>
              <span className="font-mono text-gray-700 text-[10px]">{record.externalRecord}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Accounting Period</span>
              <span className="text-gray-800">{record.accountingPeriod}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Transaction Date</span>
              <span className="text-gray-800">{record.txnDate}</span>
            </div>
          </div>

          {/* Column 2: Amounts & Variance */}
          <div className="flex flex-col gap-1.5 p-2.5 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Amounts &amp; Variance
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Expected Amount</span>
              <span className="font-mono font-bold text-gray-900">LKR {record.expectedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Actual Amount</span>
              <span className="font-mono font-bold text-gray-900">LKR {record.actualAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Variance Amount</span>
              <span className="font-mono font-bold text-emerald-700">LKR {record.varianceAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Variance %</span>
              <span className="font-mono font-bold text-emerald-700">{record.variancePct.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Variance Type</span>
              <span className="text-gray-800">{record.varianceType}</span>
            </div>
          </div>

          {/* Column 3: Statuses & Ownership */}
          <div className="flex flex-col gap-1.5 p-2.5 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Statuses &amp; Governance
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Match State</span>
              <span className="font-bold text-emerald-700">✓ {record.matchStatus}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Exception State</span>
              <span className="text-gray-500">{record.exceptionStatus}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Control Result</span>
              <span className="font-bold text-emerald-700">✓ {record.controlStatus}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Hold State</span>
              <span className="text-gray-700">{record.holdStatus}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Certification State</span>
              <span className="font-bold text-emerald-700">✓ {record.certificationStatus}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Financial Exposure</span>
              <span className="font-mono font-bold text-emerald-700">LKR {record.financialExposure.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Reconciliation Owner</span>
              <span className="font-semibold text-gray-800">{record.owner}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Reviewer</span>
              <span className="text-gray-700">{record.reviewer}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Approver</span>
              <span className="text-gray-700">{record.approver}</span>
            </div>
          </div>

          {/* Column 4: Investigation & Manual Match Sub-Panels */}
          <div className="flex flex-col gap-2.5">
            {/* Variance Investigation */}
            <div className="p-2.5 bg-gray-50/50 rounded-lg border border-gray-100 flex flex-col gap-1 text-[10px]">
              <p className="font-bold text-gray-600 uppercase tracking-wide pb-0.5 border-b border-gray-200">
                Variance Investigation
              </p>
              <div className="flex justify-between py-0.5">
                <span className="text-gray-500">Payment Ref</span>
                <span className="font-mono text-blue-600 font-bold">{record.internalRecord}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-gray-500">Bank Stmt</span>
                <span className="font-mono text-gray-700">{record.linkedBankStatementRef}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-gray-500">Settlement</span>
                <span className="font-mono text-gray-700">{record.linkedSettlementRef}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-gray-500">Reconciliation Run</span>
                <span className="font-mono text-gray-700">{record.reconciliationRunRef}</span>
              </div>
              <div className="flex justify-between py-0.5 pt-1 border-t border-gray-200">
                <span className="text-gray-500">Investigation Required</span>
                <span className="font-semibold text-gray-800">{record.manualInvestigationRequired ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-gray-500">Manual Adjustment</span>
                <span className="font-semibold text-gray-800">{record.manualAdjustment ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-gray-500">Notes</span>
                <span className="text-gray-700 font-semibold">{record.notes}</span>
              </div>
            </div>

            {/* Manual Match Governance */}
            <div className="p-2.5 bg-gray-50/50 rounded-lg border border-gray-100 flex flex-col gap-1 text-[10px]">
              <p className="font-bold text-gray-600 uppercase tracking-wide pb-0.5 border-b border-gray-200">
                Manual Match Governance
              </p>
              <div className="flex justify-between py-0.5">
                <span className="text-gray-500">Manual Matched</span>
                <span className="font-semibold text-gray-800">{record.manualMatched ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-gray-500">Match Reviewed By</span>
                <span className="text-gray-700">{record.matchReviewedBy}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-gray-500">Reviewed At</span>
                <span className="text-gray-700">{record.matchReviewedAt}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-gray-500">Approval Required</span>
                <span className="font-semibold text-gray-800">{record.approvalRequired ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
