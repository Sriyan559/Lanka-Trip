"use client";

import React, { useState } from "react";
import { LogisticsOperationRecord } from "@/types/logistics/reportsImportExportAudit";
import { DetailCard } from "../shared/DetailCard";
import { StatusBadge } from "../shared/StatusBadge";
import { ReusableTabs } from "../shared/ReusableTabs";
import { StatusTimeline, TimelineStep } from "../shared/StatusTimeline";
import { FileText, AlertCircle, CheckCircle2, ShieldAlert, FileSpreadsheet } from "lucide-react";

interface SelectedOperationPreviewProps {
  operationRecord: LogisticsOperationRecord;
}

const PREVIEW_SUB_TABS = [
  "Overview",
  "Processing & Validation",
  "File / Template Details",
  "Validation",
  "Records",
  "Rejected Records",
  "Duplicates",
  "Quarantine",
  "Approval",
  "Processing",
  "Delivery",
  "Reconciliation",
  "Security",
  "Retention",
  "Linked Records",
  "Activity",
  "Audit History",
];

const OPERATION_LIFECYCLE_TIMELINE: TimelineStep[] = [
  { label: "Operation Requested", timestamp: "May 26, 09:15", status: "completed" },
  { label: "Validated", timestamp: "May 26, 09:16", status: "completed" },
  { label: "File Prepared", timestamp: "May 26, 09:18", status: "completed" },
  { label: "Secure Scan", timestamp: "May 26, 09:20", status: "completed" },
  { label: "Import Validated", timestamp: "May 26, 09:22", status: "completed" },
  { label: "Transformation Validated", timestamp: "May 26, 09:25", status: "completed" },
  { label: "Data Validation", timestamp: "May 26, 09:30", status: "completed" },
  { label: "Approval", timestamp: "May 26, 09:35", status: "completed" },
  { label: "Processing Started", timestamp: "May 26, 09:40", status: "completed" },
  { label: "Processing Completed", timestamp: "May 26, 10:00", status: "completed" },
  { label: "Delivery", timestamp: "May 26, 10:05", status: "completed" },
  { label: "Reconciliation", timestamp: "Pending", status: "current" },
  { label: "Security", timestamp: "Pending", status: "pending" },
  { label: "Retention", timestamp: "Pending", status: "pending" },
  { label: "Audit Evidence Captured", timestamp: "Pending", status: "pending" },
  { label: "Retention Applied", timestamp: "Pending", status: "pending" },
  { label: "Closed", timestamp: "Pending", status: "pending" },
  { label: "Archived", timestamp: "Pending", status: "pending" },
];

const CONDITIONAL_WARNINGS = [
  { id: "CW-1", label: "Validation Failed", count: 3 },
  { id: "CW-2", label: "Malware Detected", count: 0 },
  { id: "CW-3", label: "Schema Mismatch", count: 5 },
  { id: "CW-4", label: "Duplicate Threshold Exceeded", count: 1152 },
  { id: "CW-5", label: "Quarantine Required", count: 38 },
  { id: "CW-6", label: "Reconciliation Required", count: 186 },
  { id: "CW-7", label: "Export Approval Required", count: 2 },
  { id: "CW-8", label: "Delivery Failed", count: 0 },
  { id: "CW-9", label: "Job Cancelled", count: 0 },
];

export function SelectedOperationPreview({
  operationRecord,
}: SelectedOperationPreviewProps) {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-3">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 font-bold">
            <FileSpreadsheet className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs font-black text-gray-900 tracking-tight">
            Selected Operation Preview: {operationRecord.operationRef} &mdash; {operationRecord.reportOrTemplateName}
          </h3>
          <StatusBadge status={operationRecord.processingStatus} size="sm" />
        </div>

        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          Governed Data Operation
        </span>
      </div>

      {/* Sub-Tabs Bar */}
      <div className="border-b border-gray-100 pb-1">
        <ReusableTabs
          tabs={PREVIEW_SUB_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {activeTab === "Overview" && (
        <div className="space-y-3">
          {/* 8 Detailed Information Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-2.5">
            {/* 1. Operation Profile */}
            <DetailCard title="1. Operation Profile">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Operation Ref:</span>
                  <span className="font-mono font-bold text-rose-700">{operationRecord.operationRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Operation Type:</span>
                  <span className="font-bold text-gray-900">{operationRecord.operationType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Logistics Domain:</span>
                  <span className="font-semibold text-gray-900">{operationRecord.logisticsDomain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Source System:</span>
                  <span className="text-gray-800">{operationRecord.sourceSystem}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Business Unit:</span>
                  <span className="text-gray-800">{operationRecord.businessUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Job Owner:</span>
                  <span className="font-bold text-gray-900">{operationRecord.jobOwner}</span>
                </div>
              </div>
            </DetailCard>

            {/* 2. Processing & Validation */}
            <DetailCard title="2. Processing &amp; Validation">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Status:</span>
                  <StatusBadge status={operationRecord.processingStatus} size="sm" />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total / Processed:</span>
                  <span className="font-mono text-gray-900 font-bold">1,250,000 / 1,250,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Successful:</span>
                  <span className="font-mono text-emerald-700 font-bold">1,218,760 (97.5%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Rejected:</span>
                  <span className="font-mono text-rose-700 font-bold">31,240 (2.5%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Quarantined:</span>
                  <span className="font-mono text-rose-600 font-bold">38 Records</span>
                </div>
              </div>
            </DetailCard>

            {/* 3. File / Template Details */}
            <DetailCard title="3. File / Template Details">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">File Name:</span>
                  <span className="font-mono font-semibold text-gray-900">Vendor_SKU_May25.csv</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">File Size:</span>
                  <span className="font-mono text-gray-800">152 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Format:</span>
                  <span className="font-bold text-gray-900">CSV</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Import Template:</span>
                  <span className="font-mono text-gray-800">VENDOR-SKU-001</span>
                </div>
              </div>
            </DetailCard>

            {/* 4. Validation Summary */}
            <DetailCard title="4. Validation Summary">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Schema Validation:</span>
                  <span className="font-bold text-emerald-700">Passed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Business Rules:</span>
                  <span className="font-bold text-emerald-700">96.7% Pass Rate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Duplicate Check:</span>
                  <span className="font-bold text-amber-700">1,152 Records</span>
                </div>
              </div>
            </DetailCard>

            {/* 5. Reconciliation Summary */}
            <DetailCard title="5. Reconciliation Summary">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Reconciliation State:</span>
                  <span className="font-bold text-amber-700">Pending</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Match Rate:</span>
                  <span className="font-mono font-bold text-emerald-700">97.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Unmatched Records:</span>
                  <span className="font-mono font-bold text-rose-700">40,260</span>
                </div>
              </div>
            </DetailCard>

            {/* 6. Security & Retention */}
            <DetailCard title="6. Security &amp; Retention">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Encryption:</span>
                  <span className="font-mono font-semibold text-gray-900">AES-256</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Malware Scan:</span>
                  <span className="font-bold text-emerald-700">Clean</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Retention Policy:</span>
                  <span className="text-gray-800">30 Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Legal Hold:</span>
                  <span className="font-bold text-gray-700">No</span>
                </div>
              </div>
            </DetailCard>

            {/* 7. Linked Records / Entities */}
            <DetailCard title="7. Linked Records / Entities">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Products/SKUs:</span>
                  <span className="font-mono font-bold text-gray-900">258</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Warehouses:</span>
                  <span className="font-mono font-bold text-gray-900">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipments:</span>
                  <span className="font-mono font-bold text-gray-900">742</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Purchase Orders:</span>
                  <span className="font-mono font-bold text-gray-900">1,738</span>
                </div>
              </div>
            </DetailCard>

            {/* 8. Audit Summary */}
            <DetailCard title="8. Audit Summary">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Audit Events:</span>
                  <span className="font-bold text-gray-900">128</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Evidence Package:</span>
                  <span className="font-mono font-bold text-emerald-700">Captured</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Evidence Ref:</span>
                  <span className="font-mono text-gray-800">AUD-2025-001921</span>
                </div>
              </div>
            </DetailCard>
          </div>

          {/* Record Breakdown Bar */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between font-bold text-gray-900">
              <span>Record Breakdown (Total: 1,250,000 Records)</span>
              <span className="text-emerald-700">Successful: 1,218,760 (97.5%) | Rejected: 31,240 (2.5%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden flex">
              <div className="bg-emerald-600 h-full" style={{ width: "97.5%" }} />
              <div className="bg-rose-600 h-full" style={{ width: "2.5%" }} />
            </div>
          </div>

          {/* Rejected Records Management Table */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 space-y-2">
            <div className="flex items-center justify-between border-b border-gray-200 pb-1.5">
              <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-rose-700" />
                Rejected Records Management (Showing top 5 of 31,240)
              </span>
              <span className="text-[10px] text-rose-700 font-bold bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                Action Required
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-white text-gray-500 uppercase font-semibold border-b border-gray-200 text-[10px]">
                  <tr>
                    <th className="p-1.5">Row</th>
                    <th className="p-1.5">Source Reference</th>
                    <th className="p-1.5">Field</th>
                    <th className="p-1.5">Submitted Value</th>
                    <th className="p-1.5">Business Rule</th>
                    <th className="p-1.5">Severity</th>
                    <th className="p-1.5">Resolution</th>
                    <th className="p-1.5">Entry Eligible</th>
                    <th className="p-1.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {(operationRecord.rejectedRecordsList || []).map((rej, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-1.5 font-mono font-bold text-gray-900">{rej.row}</td>
                      <td className="p-1.5 font-mono text-rose-700 font-bold">{rej.sourceRef}</td>
                      <td className="p-1.5 text-gray-800 font-semibold">{rej.field}</td>
                      <td className="p-1.5 font-mono text-gray-700">{rej.submittedValue}</td>
                      <td className="p-1.5 text-gray-800">{rej.businessRule}</td>
                      <td className="p-1.5">
                        <StatusBadge
                          status={rej.severity}
                          variant={rej.severity === "Critical" ? "error" : "warning"}
                          size="sm"
                        />
                      </td>
                      <td className="p-1.5 text-gray-700 font-medium">{rej.resolution}</td>
                      <td className="p-1.5 font-bold text-emerald-700">
                        {rej.entryEligible ? "Yes" : "No"}
                      </td>
                      <td className="p-1.5">
                        <StatusBadge status={rej.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Duplicate Records & Quarantine Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Duplicate Records Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 space-y-2">
              <span className="text-xs font-bold text-gray-900 block border-b border-gray-200 pb-1">
                Duplicate Records Summary (Showing top 3 of 1,152)
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-white text-gray-500 uppercase font-semibold border-b border-gray-200 text-[10px]">
                    <tr>
                      <th className="p-1">Duplicate Ref</th>
                      <th className="p-1">Field</th>
                      <th className="p-1">Original Value</th>
                      <th className="p-1">Count</th>
                      <th className="p-1">Export Action</th>
                      <th className="p-1">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {(operationRecord.duplicateRecordsList || []).map((dup, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="p-1 font-mono font-bold text-amber-700">{dup.duplicateRef}</td>
                        <td className="p-1 text-gray-800">{dup.field}</td>
                        <td className="p-1 font-mono text-gray-700">{dup.originalValue}</td>
                        <td className="p-1 font-mono font-bold">{dup.duplicateCount}</td>
                        <td className="p-1 font-semibold text-rose-700">{dup.exportAction}</td>
                        <td className="p-1">
                          <StatusBadge status={dup.status} size="sm" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quarantine Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 space-y-2 text-[11px]">
              <span className="text-xs font-bold text-gray-900 block border-b border-gray-200 pb-1">
                Quarantine Summary (38 Quarantined Records)
              </span>
              <div className="space-y-1 pt-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Schema Validation Failed:</span>
                  <span className="font-mono font-bold text-rose-700">18 Records</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Business Rule Violation:</span>
                  <span className="font-mono font-bold text-amber-700">12 Records</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Malware Suspect:</span>
                  <span className="font-mono font-bold text-emerald-700">0 Records</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-1 font-bold">
                  <span className="text-gray-900">Total Quarantined:</span>
                  <span className="font-mono text-rose-700">38 Records</span>
                </div>
              </div>
            </div>
          </div>

          {/* Operation Lifecycle Timeline */}
          <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
                Operation Lifecycle Timeline
              </h4>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Processing Running (Stage 12: Reconciliation Pending)
              </span>
            </div>

            <StatusTimeline steps={OPERATION_LIFECYCLE_TIMELINE} />

            {/* Conditional Warnings Row */}
            <div className="border-t border-gray-100 pt-2 text-[11px] space-y-1.5">
              <div className="flex items-center gap-1 text-rose-700 font-bold text-[10.5px]">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Conditional Warnings &amp; Flags:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {CONDITIONAL_WARNINGS.map((cw) => (
                  <span
                    key={cw.id}
                    className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-medium px-2 py-0.5 rounded-full"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    {cw.label} ({cw.count})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== "Overview" && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center text-xs text-gray-500">
          <p className="font-semibold text-gray-800">
            {activeTab} View for {operationRecord.operationRef}
          </p>
          <p className="mt-1">
            Displaying detailed logs, governance controls, and evidence attachments for {activeTab.toLowerCase()}.
          </p>
        </div>
      )}
    </div>
  );
}
