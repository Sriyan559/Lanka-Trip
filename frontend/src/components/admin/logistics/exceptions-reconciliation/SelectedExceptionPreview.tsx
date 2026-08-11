"use client";

import React, { useState } from "react";
import { LogisticsExceptionRecord } from "@/types/logistics/exceptionsReconciliation";
import { DetailCard } from "../shared/DetailCard";
import { StatusBadge } from "../shared/StatusBadge";
import { ReusableTabs } from "../shared/ReusableTabs";
import { StatusTimeline, TimelineStep } from "../shared/StatusTimeline";
import { AlertCircle, ShieldAlert, FileText, CheckCircle2 } from "lucide-react";

interface SelectedExceptionPreviewProps {
  exceptionRecord: LogisticsExceptionRecord;
}

const PREVIEW_SUB_TABS = [
  "Overview",
  "Linked Operations",
  "Evidence",
  "Investigation",
  "Claim",
  "Liability",
  "Cost Breakdown",
  "Reconciliation",
  "Recovery",
  "Holds",
  "Approvals",
  "SLA",
  "Linked Financial Records",
  "Communications",
  "Activity",
  "Audit History",
];

const EXCEPTION_LIFECYCLE_TIMELINE: TimelineStep[] = [
  { label: "Detected", timestamp: "May 24", status: "completed" },
  { label: "Assigned", timestamp: "May 24", status: "completed" },
  { label: "Investigating", timestamp: "May 25", status: "completed" },
  { label: "Evidence Requested", timestamp: "May 25", status: "completed" },
  { label: "Claim Created", timestamp: "May 25", status: "completed" },
  { label: "Liability Determined", timestamp: "May 26", status: "completed" },
  { label: "Approval", timestamp: "May 26", status: "current" },
  { label: "Recovery Initiated", timestamp: "Pending", status: "pending" },
  { label: "Recovery Confirmed", timestamp: "Pending", status: "pending" },
  { label: "Reconciliation Completed", timestamp: "Pending", status: "pending" },
  { label: "Closed", timestamp: "Pending", status: "pending" },
];

const EXCEPTION_BRANCHES = [
  { id: "EB-1", label: "Claim Rejected" },
  { id: "EB-2", label: "Evidence Insufficient" },
  { id: "EB-3", label: "Supplier Dispute" },
  { id: "EB-4", label: "Financial Hold" },
  { id: "EB-5", label: "Legal Escalation" },
  { id: "EB-6", label: "Reopened" },
];

export function SelectedExceptionPreview({
  exceptionRecord,
}: SelectedExceptionPreviewProps) {
  const [activePreviewTab, setActivePreviewTab] = useState("Overview");

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-3">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs font-black text-gray-900 tracking-tight">
            Selected Exception Preview: {exceptionRecord.referenceId} &mdash; {exceptionRecord.exceptionType}
          </h3>
          <StatusBadge status={exceptionRecord.severity} variant="error" size="sm" />
        </div>

        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          Verified Exception Context
        </span>
      </div>

      {/* Sub-Tabs Bar */}
      <div className="border-b border-gray-100 pb-1">
        <ReusableTabs
          tabs={PREVIEW_SUB_TABS}
          activeTab={activePreviewTab}
          onTabChange={setActivePreviewTab}
        />
      </div>

      {activePreviewTab === "Overview" && (
        <div className="space-y-3">
          {/* 6 Key Detail Information Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2.5">
            {/* 1. Exception Identity & Context */}
            <DetailCard title="1. Exception Identity">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Exception Ref:</span>
                  <span className="font-mono font-bold text-rose-700">{exceptionRecord.referenceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Record Type:</span>
                  <span className="font-bold text-gray-900">{exceptionRecord.recordType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Exception Type:</span>
                  <span className="font-bold text-gray-900">{exceptionRecord.exceptionType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Severity:</span>
                  <StatusBadge status={exceptionRecord.severity} variant="error" size="sm" />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Owner:</span>
                  <span className="font-bold text-gray-900">{exceptionRecord.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Detected:</span>
                  <span className="text-gray-800">{exceptionRecord.createdDate}</span>
                </div>
              </div>
            </DetailCard>

            {/* 2. Linked Operations */}
            <DetailCard title="2. Linked Operations">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Order Reference:</span>
                  <span className="font-mono text-gray-900">{exceptionRecord.orderRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Fulfilment Ref:</span>
                  <span className="font-mono text-gray-900">{exceptionRecord.fulfilmentRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipment Ref:</span>
                  <span className="font-mono text-gray-900">{exceptionRecord.shipmentRef || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Carrier:</span>
                  <span className="font-bold text-gray-900">{exceptionRecord.carrier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Warehouse:</span>
                  <span className="font-bold text-gray-900">{exceptionRecord.warehouse}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Supplier:</span>
                  <span className="font-semibold text-gray-900">{exceptionRecord.supplierName}</span>
                </div>
              </div>
            </DetailCard>

            {/* 3. Evidence Summary */}
            <DetailCard title="3. Evidence Summary">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Evidence:</span>
                  <span className="font-bold text-gray-900">8 Files</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Verified Files:</span>
                  <span className="font-bold text-emerald-700">6 Verified</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Latest Captured:</span>
                  <span className="text-gray-800">May 26, 09:15 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Evidence Score:</span>
                  <span className="font-bold text-emerald-700">94% High Confidence</span>
                </div>
              </div>
            </DetailCard>

            {/* 4. Investigation & Root Cause */}
            <DetailCard title="4. Investigation &amp; Root Cause">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Investigation State:</span>
                  <span className="font-bold text-amber-700">{exceptionRecord.investigationStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Root Cause:</span>
                  <span className="font-semibold text-gray-900">Inaccurate carrier weight scale</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Impact:</span>
                  <span className="text-gray-800">Overcharge on freight surcharge</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Confidence:</span>
                  <span className="font-bold text-emerald-700">High</span>
                </div>
              </div>
            </DetailCard>

            {/* 5. Claim & Liability */}
            <DetailCard title="5. Claim &amp; Liability">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Claim Ref:</span>
                  <span className="font-mono font-bold text-gray-900">{exceptionRecord.claimRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Claim Type:</span>
                  <span className="font-bold text-gray-900">{exceptionRecord.claimType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Liable Party:</span>
                  <span className="font-bold text-rose-700">{exceptionRecord.liabilityParty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Claim Value:</span>
                  <span className="font-mono font-bold text-gray-900">LKR {exceptionRecord.claimValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Claim Status:</span>
                  <span className="font-bold text-amber-700">{exceptionRecord.approvalStatus}</span>
                </div>
              </div>
            </DetailCard>

            {/* 6. Cost Breakdown & Variance */}
            <DetailCard title="6. Cost Breakdown &amp; Variance">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Cost Type:</span>
                  <span className="font-semibold text-gray-900">{exceptionRecord.costType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Expected Amount:</span>
                  <span className="font-mono text-gray-900">LKR {exceptionRecord.expectedAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Actual Amount:</span>
                  <span className="font-mono text-gray-900">LKR {exceptionRecord.actualAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Variance Amount:</span>
                  <span className="font-mono font-bold text-rose-700">
                    LKR {exceptionRecord.varianceAmount.toLocaleString()} (+31.6%)
                  </span>
                </div>
              </div>
            </DetailCard>
          </div>

          {/* Evidence Management Table */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 space-y-2">
            <div className="flex items-center justify-between border-b border-gray-200 pb-1.5">
              <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-rose-700" />
                Evidence Management ({exceptionRecord.evidenceList?.length || 0} Files Attached)
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                6 Verified / 2 Pending
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-white text-gray-500 uppercase font-semibold border-b border-gray-200 text-[10px]">
                  <tr>
                    <th className="p-1.5">Evidence Ref</th>
                    <th className="p-1.5">Source</th>
                    <th className="p-1.5">File Name</th>
                    <th className="p-1.5">Uploaded Date</th>
                    <th className="p-1.5">Uploaded By</th>
                    <th className="p-1.5">Integrity Score</th>
                    <th className="p-1.5">Status</th>
                    <th className="p-1.5">Notes</th>
                    <th className="p-1.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {(exceptionRecord.evidenceList || []).map((ev) => (
                    <tr key={ev.id} className="hover:bg-gray-50">
                      <td className="p-1.5 font-mono font-bold text-rose-700">{ev.id}</td>
                      <td className="p-1.5 text-gray-800">{ev.source}</td>
                      <td className="p-1.5 font-mono text-gray-900">{ev.fileName}</td>
                      <td className="p-1.5 text-gray-700">{ev.uploadedDate}</td>
                      <td className="p-1.5 text-gray-800 font-medium">{ev.uploader || "System"}</td>
                      <td className="p-1.5 font-bold text-emerald-700">{ev.score}</td>
                      <td className="p-1.5">
                        <StatusBadge status={ev.status} variant="success" size="sm" />
                      </td>
                      <td className="p-1.5 text-gray-600 text-[10.5px] italic">{ev.notes}</td>
                      <td className="p-1.5 text-right font-bold text-rose-700 hover:underline cursor-pointer">
                        View File
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Claim Workflow Stepper & Liability Distribution */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-1.5 gap-2">
              <span className="text-xs font-bold text-gray-900">
                Claim Workflow / Liability / Recovery Lifecycle
              </span>

              <div className="flex flex-wrap items-center gap-2 text-[10.5px]">
                <span className="text-gray-500 font-semibold">Liability Split:</span>
                <span className="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
                  Carrier: 100%
                </span>
                <span className="bg-gray-200 text-gray-700 font-semibold px-2 py-0.5 rounded">
                  Warehouse: 0%
                </span>
                <span className="bg-gray-200 text-gray-700 font-semibold px-2 py-0.5 rounded">
                  Supplier: 0%
                </span>
                <span className="bg-gray-200 text-gray-700 font-semibold px-2 py-0.5 rounded">
                  Customer: 0%
                </span>
              </div>
            </div>

            {/* Stepper Node List */}
            <div className="flex items-center justify-between overflow-x-auto pt-1 pb-1">
              {(exceptionRecord.workflowSteps || []).map((st, idx) => (
                <div key={idx} className="flex items-center gap-1.5 shrink-0 px-2">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      st.status === "completed"
                        ? "bg-emerald-600 text-white"
                        : st.status === "current"
                        ? "bg-rose-700 text-white animate-pulse"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-900 whitespace-nowrap">{st.stage}</span>
                    <span className="text-[9px] text-gray-500">{st.timestamp || "Pending"}</span>
                  </div>
                  {idx < (exceptionRecord.workflowSteps?.length || 0) - 1 && (
                    <span className="text-gray-300 font-bold text-xs ml-1">&rarr;</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Exception Lifecycle Timeline Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
                Exception &amp; Reconciliation Lifecycle Timeline
              </h4>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Current Stage: Approval (Pending Approval)
              </span>
            </div>

            <StatusTimeline steps={EXCEPTION_LIFECYCLE_TIMELINE} />

            {/* Exception Branches Row */}
            <div className="border-t border-gray-100 pt-2 text-[11px] space-y-1.5">
              <div className="flex items-center gap-1 text-rose-700 font-bold text-[10.5px]">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Exception Branches (Potential):</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {EXCEPTION_BRANCHES.map((ex) => (
                  <span
                    key={ex.id}
                    className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-medium px-2 py-0.5 rounded-full"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    {ex.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activePreviewTab !== "Overview" && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center text-xs text-gray-500">
          <p className="font-semibold text-gray-800">
            {activePreviewTab} Detail View for {exceptionRecord.referenceId}
          </p>
          <p className="mt-1">
            Displaying operational logs, evidence attachments, and financial dependencies for {activePreviewTab.toLowerCase()}.
          </p>
        </div>
      )}
    </div>
  );
}
