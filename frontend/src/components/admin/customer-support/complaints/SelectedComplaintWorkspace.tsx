"use client";

import React from "react";
import Link from "next/link";
import {
  ExternalLink,
  MoreHorizontal,
  ArrowUpRight,
  CheckSquare,
} from "lucide-react";
import { ComplaintDetailsData } from "./types";

interface SelectedComplaintWorkspaceProps {
  details: ComplaintDetailsData;
  onOpenDetail?: () => void;
}

export function SelectedComplaintWorkspace({
  details,
  onOpenDetail,
}: SelectedComplaintWorkspaceProps) {
  const { complaint } = details;

  return (
    <div className="flex flex-col gap-4 mb-6 w-full">
      {/* 1. Workspace Header Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>Selected Complaint —</span>
            <span className="font-mono text-[#800020] text-base font-extrabold">{complaint.id}</span>
          </h2>
          <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded border border-red-200">
            {complaint.severity}
          </span>
          <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-1.5 py-0.5 rounded border border-blue-200">
            {complaint.status}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDetail}
            className="px-3.5 py-1.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <span>Open Complaint Detail</span>
            <ArrowUpRight size={13} />
          </button>
          <button className="p-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 rounded">
            <MoreHorizontal size={15} />
          </button>
        </div>
      </div>

      {/* 2. Selected Complaint KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
        <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-2xs">
          <span className="text-[10px] font-medium text-slate-400 block">Complaint Age</span>
          <span className="text-sm font-bold text-slate-900">{complaint.age}</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-2xs">
          <span className="text-[10px] font-medium text-slate-400 block">Escalation Level</span>
          <span className="text-sm font-bold text-slate-900 truncate block">{complaint.escalationLevel}</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-2xs">
          <span className="text-[10px] font-medium text-slate-400 block">Customer Contacts</span>
          <span className="text-sm font-bold text-slate-900">4</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-2xs">
          <span className="text-[10px] font-medium text-slate-400 block">Reopens</span>
          <span className="text-sm font-bold text-slate-900">1</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-2xs">
          <span className="text-[10px] font-medium text-slate-400 block">Recovery Progress</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm font-bold text-slate-900">62%</span>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "62%" }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-2xs">
          <span className="text-[10px] font-medium text-slate-400 block">Remedy Value</span>
          <span className="text-sm font-bold text-slate-900">LKR 2,500</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-2xs">
          <span className="text-[10px] font-medium text-slate-400 block">Customer Acceptance</span>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
            Pending
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-medium text-slate-400 block">Complaint Health</span>
            <span className="text-sm font-bold text-slate-900">84%</span>
          </div>
          <div className="relative w-6 h-6 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path className="text-emerald-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-emerald-600" strokeDasharray="84, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Operational Cards Grid with items-start & auto-rows-max to prevent vertical stretching */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start auto-rows-max">
        {/* Card A: Complaint Details */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100 flex items-center justify-between">
            <span>A. Complaint Details</span>
            <span className="text-[10px] font-mono text-slate-400">{complaint.id}</span>
          </h4>
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div className="flex justify-between"><span className="text-slate-400">Complaint Reference:</span><span className="font-mono font-bold text-slate-800">{complaint.id}</span></div>
            <div className="flex justify-between">
              <span className="text-slate-400">Related Case:</span>
              <Link href={`/admin/customer-support/cases/${complaint.relatedCaseId}`} className="font-mono text-blue-600 hover:underline flex items-center gap-0.5 font-bold">
                {complaint.relatedCaseId} <ExternalLink size={10} />
              </Link>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Customer:</span>
              <span className="font-bold text-slate-900">{complaint.customerName} {complaint.isVip && <span className="text-[9px] bg-amber-100 text-amber-800 px-1 rounded">VIP</span>}</span>
            </div>
            <div className="flex justify-between"><span className="text-slate-400">Category:</span><span className="font-semibold text-slate-800">{complaint.category}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Issue Type:</span><span className="font-semibold text-slate-800">{complaint.issueType}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Current Owner:</span><span className="font-semibold text-slate-800">{complaint.assignedOwner}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Assigned Team:</span><span className="text-slate-700">{complaint.assignedTeam}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Current Status:</span><span className="font-bold text-red-700 bg-red-50 px-1 rounded">{complaint.status}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Priority:</span><span className="font-bold text-red-700 bg-red-50 px-1 rounded">{complaint.severity}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Sentiment:</span><span className="font-semibold text-orange-700 bg-orange-50 px-1 rounded">{complaint.sentiment}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Related Order:</span><span className="font-mono text-blue-600">{complaint.relatedOrderId}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Supplier:</span><span className="text-slate-800 truncate max-w-[150px]">{complaint.supplierName}</span></div>
          </div>
        </div>

        {/* Card B: Customer Statement */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">B. Customer Statement</h4>
            <div className="bg-rose-50/80 border border-rose-200 rounded-lg p-3 text-xs text-rose-950 font-medium italic leading-relaxed shadow-2xs mb-3">
              &ldquo;{details.customerStatement.text}&rdquo;
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {details.customerStatement.tags.map((tag, idx) => (
              <span key={idx} className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full border border-red-200">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card C: Complaint Lifecycle - Compact 2-row layout with no text clipping */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">C. Complaint Lifecycle</h4>
          <div className="flex flex-col gap-2.5 my-1 text-[10px]">
            {/* Row 1: Steps 1-5 */}
            <div className="flex items-center gap-1 flex-wrap">
              {details.lifecycle.slice(0, 5).map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[9px] shrink-0">
                      ✓
                    </span>
                    <span className="font-semibold text-slate-800 whitespace-nowrap">{step.label}</span>
                  </div>
                  {idx < 4 && <span className="text-slate-300 font-bold shrink-0">→</span>}
                </React.Fragment>
              ))}
            </div>

            {/* Row 2: Steps 6-11 */}
            <div className="flex items-center gap-1 flex-wrap">
              {details.lifecycle.slice(5).map((step, idx) => {
                const stepNum = idx + 6;
                const isCompleted = step.status === "completed";
                const isInProgress = step.status === "in-progress";

                return (
                  <React.Fragment key={idx}>
                    <div className="flex items-center gap-1">
                      <span
                        className={`w-3.5 h-3.5 rounded-full font-bold flex items-center justify-center text-[9px] shrink-0 text-white ${
                          isCompleted
                            ? "bg-emerald-600"
                            : isInProgress
                            ? "bg-amber-500"
                            : "bg-slate-300"
                        }`}
                      >
                        {isCompleted ? "✓" : stepNum}
                      </span>
                      <span
                        className={`whitespace-nowrap ${
                          isInProgress
                            ? "font-bold text-amber-800"
                            : isCompleted
                            ? "font-semibold text-slate-800"
                            : "text-slate-400"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {idx < details.lifecycle.slice(5).length - 1 && (
                      <span className="text-slate-300 font-bold shrink-0">→</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card D: Escalation Summary & Chain */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">D. Escalation Summary &amp; Chain</h4>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] mb-2 bg-slate-50 p-2 rounded">
            <div><span className="text-slate-400">Current Level: </span><span className="font-bold text-slate-900">{details.escalation.currentLevel}</span></div>
            <div><span className="text-slate-400">Previous Level: </span><span className="font-medium text-slate-700">{details.escalation.previousLevel}</span></div>
            <div><span className="text-slate-400">Escalation Due: </span><span className="font-bold text-red-600">{details.escalation.escalationDue}</span></div>
            <div><span className="text-slate-400">Reason: </span><span className="text-slate-800 truncate block">{details.escalation.reason}</span></div>
          </div>

          {/* Escalation Hierarchy Diagram */}
          <div className="flex items-center justify-between text-[10px] bg-slate-100/70 p-1.5 rounded border border-slate-200 mb-2">
            {details.escalation.hierarchy.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className={`px-1.5 py-0.5 rounded text-center truncate max-w-[80px] ${
                  item.isCurrent ? "bg-[#800020] text-white font-bold" : "text-slate-600 bg-white border border-slate-200"
                }`}>
                  {item.name}
                </span>
                {idx < details.escalation.hierarchy.length - 1 && <span className="text-slate-400">→</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Cross-functional dependencies */}
          <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
            <span className="text-slate-400 font-medium">Dependencies:</span>
            {details.escalation.dependencies.map((dep, idx) => (
              <span key={idx} className="bg-slate-100 text-slate-700 font-semibold px-1.5 py-0.2 rounded border border-slate-200">
                {dep}
              </span>
            ))}
          </div>
        </div>

        {/* Card E: Root Cause Analysis */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">E. Root Cause Analysis</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-2">
            <div className="flex justify-between"><span className="text-slate-400">Primary Root Cause:</span><span className="font-bold text-slate-900">{details.rootCauseAnalysis.primary}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Root Cause Domain:</span><span className="font-semibold text-slate-800">{details.rootCauseAnalysis.domain}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Repeat Failure:</span><span className="font-bold text-red-600">{details.rootCauseAnalysis.repeatFailure}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Similar Complaints:</span><span className="font-semibold text-slate-800">{details.rootCauseAnalysis.similarComplaintsCount}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Root Cause Confidence:</span><span className="font-bold text-emerald-700">{details.rootCauseAnalysis.confidencePercent}%</span></div>
          </div>

          {/* Contributing Factors Bars */}
          <div className="flex flex-col gap-1 text-[10px]">
            <span className="text-slate-400 font-medium">Contributing Factors:</span>
            {details.rootCauseAnalysis.factors.map((f, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-32 truncate text-slate-600 font-medium">{f.label}</span>
                <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#800020] rounded-full" style={{ width: `${f.percent}%` }}></div>
                </div>
                <span className="font-mono text-slate-500 text-[9px]">{f.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card F: Recovery Plan */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-900">F. Recovery Plan</h4>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded border border-emerald-200">
              SLA: {details.recoveryPlan.slaState}
            </span>
          </div>

          <div className="flex flex-col gap-1 text-[11px]">
            {details.recoveryPlan.steps.map((step) => (
              <div key={step.stepNumber} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0">
                <span className="text-slate-700 font-medium">
                  {step.stepNumber}. {step.label}
                </span>
                <span
                  className={`text-[10px] px-1 py-0.2 rounded font-bold ${
                    step.status === "Completed"
                      ? "text-emerald-700 bg-emerald-50"
                      : step.status === "In Progress"
                      ? "text-amber-700 bg-amber-50"
                      : "text-slate-400 bg-slate-50"
                  }`}
                >
                  {step.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card H: Remedy Approval */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">H. Remedy Approval</h4>
            <div className="flex flex-col gap-1.5 text-[11px] mb-3">
              <div className="flex justify-between"><span className="text-slate-400">Approved Value:</span><span className="font-bold text-slate-900">{details.remedyApproval.approvedValue}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Approval Authority:</span><span className="font-semibold text-slate-800">{details.remedyApproval.approvalAuthority}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Approved By:</span><span className="text-slate-700">{details.remedyApproval.approvedBy}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Approval Time:</span><span className="text-slate-500 text-[10px]">{details.remedyApproval.approvalTime}</span></div>
            </div>
          </div>
          <button className="w-full py-1.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-bold transition-colors shadow-2xs flex items-center justify-center gap-1">
            <CheckSquare size={13} />
            <span>Send for Approval</span>
          </button>
        </div>

        {/* Card I: Customer Recovery Offer */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">I. Customer Recovery Offer</h4>
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div><span className="text-slate-400 block font-medium">Offer Type</span><span className="font-bold text-slate-900">{details.customerRecoveryOffer.offerType}</span></div>
            <div><span className="text-slate-400 block font-medium">Status</span><span className="font-semibold text-amber-700 bg-amber-50 px-1 py-0.2 rounded border border-amber-200 inline-block">{details.customerRecoveryOffer.status}</span></div>
            <div><span className="text-slate-400 block font-medium">Send When</span><span className="font-semibold text-slate-800">{details.customerRecoveryOffer.sendWhen}</span></div>
            <div><span className="text-slate-400 block font-medium">Customer</span><span className="text-slate-600 italic">{details.customerRecoveryOffer.customerState}</span></div>
          </div>
        </div>

        {/* Card J: Customer Acceptance - Compact height ending naturally after No Response */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">J. Customer Acceptance</h4>
          <div className="flex flex-col gap-2 text-[11px]">
            {details.customerAcceptance.states.map((st, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    st.isActive
                      ? "bg-amber-500 ring-2 ring-amber-200"
                      : "bg-slate-300"
                  }`}
                ></span>
                <span
                  className={
                    st.isActive
                      ? "font-bold text-amber-800 text-xs"
                      : "text-slate-500 font-medium"
                  }
                >
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card K: Related Support History - Compact height ending naturally */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">K. Related Support History</h4>
          <div className="flex flex-col gap-2 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">Linked Support Case:</span>
              <Link href={`/admin/customer-support/cases/${details.relatedSupportHistory.linkedCaseId}`} className="font-mono text-blue-600 hover:underline font-bold flex items-center gap-0.5">
                {details.relatedSupportHistory.linkedCaseId} <ExternalLink size={10} />
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">Conversation:</span>
              <span className="font-mono text-blue-600 font-bold">{details.relatedSupportHistory.conversationId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">Previous Complaint:</span>
              <span className="font-mono text-slate-700 font-bold">{details.relatedSupportHistory.previousComplaintId}</span>
            </div>
            <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px] mt-1 inline-block">
              View Full History
            </Link>
          </div>
        </div>

        {/* Card L: Related Operational Records */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">L. Related Operational Records</h4>
          <div className="grid grid-cols-2 gap-2 text-[11px] mb-2 bg-slate-50 p-2 rounded">
            <div><span className="text-slate-400 block">Order</span><span className="font-mono text-blue-600 font-bold">{details.relatedOperationalRecords.orderId}</span></div>
            <div><span className="text-slate-400 block">Shipment</span><span className="font-mono text-blue-600 font-bold">{details.relatedOperationalRecords.shipmentId}</span></div>
            <div><span className="text-slate-400 block">Payment</span><span className="font-mono text-blue-600 font-bold">{details.relatedOperationalRecords.paymentId}</span></div>
            <div><span className="text-slate-400 block">Return</span><span className="text-slate-500 font-medium">{details.relatedOperationalRecords.returnId}</span></div>
          </div>
          <div className="text-[11px] flex flex-col gap-1">
            <div><span className="text-slate-400 font-medium">Product: </span><span className="text-slate-800">{details.relatedOperationalRecords.productName}</span></div>
            <div><span className="text-slate-400 font-medium">Supplier: </span><span className="text-slate-800">{details.relatedOperationalRecords.supplierName}</span></div>
            <div><span className="text-slate-400 font-medium">Carrier: </span><span className="text-slate-800">{details.relatedOperationalRecords.carrierName}</span></div>
          </div>
        </div>

        {/* Card M: Cross-Module Recovery Dependencies */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">M. Cross-Module Recovery Dependencies</h4>
          <div className="flex flex-col gap-1.5 text-[11px]">
            {details.crossModuleDependencies.map((dep, idx) => (
              <div key={idx} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0">
                <span className="font-bold text-slate-800">{dep.module}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                  dep.status === "Completed" ? "text-emerald-700 bg-emerald-50" : dep.status === "Pending" ? "text-amber-700 bg-amber-50" : "text-slate-500 bg-slate-50"
                }`}>{dep.status}</span>
                <span className="text-[10px] text-slate-500">{dep.team}</span>
                {dep.slaRemaining && <span className="text-[10px] font-mono text-red-600 font-bold">{dep.slaRemaining}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Card N: Complaint SLA */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">N. Complaint SLA</h4>
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div className="flex justify-between"><span className="text-slate-400">Acknowledgement Target:</span><span className="font-semibold text-slate-800">{details.complaintSla.acknowledgementTarget} <span className="text-[10px] text-emerald-600">({details.complaintSla.acknowledgementElapsed})</span></span></div>
            <div className="flex justify-between"><span className="text-slate-400">Investigation Target:</span><span className="font-semibold text-slate-800">{details.complaintSla.investigationTarget} <span className="text-[10px] text-red-600 font-bold">({details.complaintSla.investigationElapsed})</span></span></div>
            <div className="flex justify-between"><span className="text-slate-400">Recovery Plan Target:</span><span className="font-semibold text-slate-800">{details.complaintSla.recoveryPlanTarget} <span className="text-[10px] text-red-600 font-bold">({details.complaintSla.recoveryPlanElapsed})</span></span></div>
            <div className="flex justify-between"><span className="text-slate-400">Customer Update Interval:</span><span className="font-semibold text-slate-800">{details.complaintSla.customerUpdateInterval}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Current SLA State:</span><span className="font-bold text-red-700 bg-red-50 px-1 rounded">{details.complaintSla.currentSlaState}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Policy:</span><span className="font-mono text-slate-700">{details.complaintSla.policy}</span></div>
          </div>
        </div>

        {/* Card P: Reopened Complaints Queue */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">P. Reopened Complaints Queue</h4>
          <div className="grid grid-cols-4 gap-1 text-center bg-slate-50 p-2 rounded">
            <div><span className="text-[10px] text-slate-400 block">Reopened</span><span className="text-sm font-bold text-slate-900">{details.reopenedQueueSummary.reopenedCount}</span></div>
            <div><span className="text-[10px] text-slate-400 block">CS Failure</span><span className="text-sm font-bold text-red-600">{details.reopenedQueueSummary.customerSupportFailureCount}</span></div>
            <div><span className="text-[10px] text-slate-400 block">Repeat Fail</span><span className="text-sm font-bold text-amber-700">{details.reopenedQueueSummary.repeatFailureCount}</span></div>
            <div><span className="text-[10px] text-slate-400 block">Exec Esc</span><span className="text-sm font-bold text-purple-700">{details.reopenedQueueSummary.executiveEscalationCount}</span></div>
          </div>
        </div>

        {/* Card Q: Executive Review Queue - Compact queue table ending naturally */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Q. Executive Review Queue</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-2">
            {details.executiveReviewQueue.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                <span className="font-mono font-bold text-purple-700">{item.id}</span>
                <span className="text-[10px] text-red-700 font-bold bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                  {item.severity}
                </span>
                <span className="text-slate-700 truncate max-w-[110px]">{item.reason}</span>
                <button className="px-2 py-0.5 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded font-bold border border-purple-200 text-[10px]">
                  Review
                </button>
              </div>
            ))}
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px] mt-1 inline-block">
            View Executive Review Queue
          </Link>
        </div>

        {/* Card O: Evidence & Attachments */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">O. Evidence &amp; Attachments</h4>
          <div className="grid grid-cols-2 gap-1.5 text-[11px] mb-2">
            {details.evidenceAttachments.map((att, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-50 p-1.5 rounded border border-slate-100">
                <span className="text-slate-700 font-medium">{att.category}</span>
                <span className="font-bold text-slate-900 font-mono">{att.count}</span>
              </div>
            ))}
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View All Attachments
          </Link>
        </div>
      </div>
    </div>
  );
}
