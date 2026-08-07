'use client';

import React, { useState } from 'react';
import { CheckCircle2, Maximize2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { FinanceDataOperationDetail } from '@/types/finance';

const PREVIEW_TABS = [
  'Overview',
  'Report Definition',
  'File',
  'Template',
  'Mapping',
  'Transformation',
  'Validation',
  'Records',
  'Rejected Records',
  'Duplicates',
  'Quarantine',
  'Approval',
  'Processing',
  'Delivery',
  'Reconciliation',
  'Exceptions',
  'Security',
  'Retention',
  'Linked Records',
  'Activity',
  'Audit History',
];

interface Props {
  record: FinanceDataOperationDetail;
}

export function SelectedFinanceOperationPreview({ record }: Props) {
  const [activePreviewTab, setActivePreviewTab] = useState('Overview');

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
      {/* Header & Expand Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Selected Operation Preview:
          </h2>
          <span className="font-mono font-extrabold text-sm text-[#8f002b]">{record.id}</span>
          <span className="text-xs font-bold text-gray-900">— {record.reportOrTemplateName}</span>
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
            <CheckCircle2 size={11} />
            {record.processingStatus}
          </span>
        </div>

        <button
          onClick={() => toast(`Opening full operation record for ${record.id}`)}
          className="px-3 py-1 bg-[#8f002b] text-white hover:bg-[#741d35] text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Maximize2 size={12} />
          <span>View Full Record</span>
        </button>
      </div>

      {/* 21 Preview Tabs */}
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

      {/* Key-Value Overview Grid */}
      {activePreviewTab === 'Overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 text-xs">
          {/* Panel 1: Operation & Source */}
          <div className="flex flex-col gap-1.5 p-2.5 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Operation &amp; Source
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Operation Type</span>
              <span className="font-bold text-gray-900">{record.operationType}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Finance Domain</span>
              <span className="font-semibold text-gray-800">{record.financeDomain}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Source System</span>
              <span className="font-mono text-blue-600 font-bold">{record.sourceSystem}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Destination</span>
              <span className="font-mono text-gray-700 text-[10px]">{record.destination}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Accounting Period</span>
              <span className="text-gray-800">{record.accountingPeriod}</span>
            </div>
          </div>

          {/* Panel 2: File Parameters */}
          <div className="flex flex-col gap-1.5 p-2.5 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              File Parameters
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">File Type</span>
              <span className="font-mono font-bold text-gray-900">{record.fileType}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">File Size</span>
              <span className="font-mono text-gray-800">{record.fileSize}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Total Records</span>
              <span className="font-mono font-bold text-gray-900">{record.totalRecords.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Passed Version</span>
              <span className="font-mono text-gray-700">{record.passedVersion}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Schema Version</span>
              <span className="font-mono text-gray-700">{record.schemaVersion}</span>
            </div>
          </div>

          {/* Panel 3: Record Execution Counts */}
          <div className="flex flex-col gap-1.5 p-2.5 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Execution Record Breakdown
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Successful Records</span>
              <span className="font-mono font-bold text-emerald-700">{record.successfulRecords.toLocaleString()} ({((record.successfulRecords / record.totalRecords) * 100).toFixed(1)}%)</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Rejected Records</span>
              <span className={`font-mono font-bold ${record.rejectedRecords > 0 ? 'text-red-600' : 'text-gray-700'}`}>
                {record.rejectedRecords.toLocaleString()} ({((record.rejectedRecords / record.totalRecords) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Duplicate Records</span>
              <span className="font-mono text-gray-700">{record.duplicateRecords.toLocaleString()} ({((record.duplicateRecords / record.totalRecords) * 100).toFixed(1)}%)</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Quarantined Records</span>
              <span className="font-mono text-gray-700">{record.quarantinedRecords}</span>
            </div>
          </div>

          {/* Panel 4: Rejected Breakdown */}
          <div className="flex flex-col gap-1.5 p-2.5 bg-gray-50/50 rounded-lg border border-gray-100 text-[10px]">
            <p className="font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Top Rejection Reasons
            </p>
            {record.rejectedRowsBreakdown.map((r) => (
              <div key={r.reason} className="flex justify-between py-0.5 border-b border-gray-100">
                <span className="text-gray-600 truncate">{r.reason}</span>
                <span className="font-mono font-bold text-red-600">{r.count}</span>
              </div>
            ))}
          </div>

          {/* Panel 5: Security & Governance */}
          <div className="flex flex-col gap-1.5 p-2.5 bg-gray-50/50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Security &amp; Governance
            </p>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Data Classification</span>
              <span className="font-semibold text-gray-800">{record.dataClassification}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Encryption</span>
              <span className="font-mono text-gray-700 text-[10px]">{record.encryption}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Masked Fields</span>
              <span className="font-mono font-bold text-gray-900">{record.maskedFieldsCount}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Encrypted Fields</span>
              <span className="font-mono font-bold text-gray-900">{record.encryptedFieldsCount}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Retention Policy</span>
              <span className="text-gray-800">{record.retention}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Legal Hold</span>
              <span className="font-bold text-gray-900">{record.legalHold}</span>
            </div>
          </div>

          {/* Panel 6: Audit Trail Preview */}
          <div className="flex flex-col gap-1 p-2.5 bg-gray-50/50 rounded-lg border border-gray-100 text-[10px]">
            <p className="font-bold text-gray-500 uppercase tracking-wide pb-0.5 border-b border-gray-200">
              Audit Trail
            </p>
            {record.auditTrail.map((at, idx) => (
              <div key={idx} className="flex flex-col py-0.5 border-b border-gray-100">
                <div className="flex justify-between font-semibold text-gray-800">
                  <span>{at.event}</span>
                  <span className="text-gray-400 text-[9px] font-mono">{at.timestamp}</span>
                </div>
                <span className="text-[9px] text-gray-500">By {at.user}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
