"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  ShieldAlert,
  FileText,
  DollarSign,
  UserCheck,
} from "lucide-react";
import { SelectedReturnRefundCaseDetailsData } from "./types";

interface SelectedReturnRefundCaseWorkspaceProps {
  details: SelectedReturnRefundCaseDetailsData;
}

export function SelectedReturnRefundCaseWorkspace({
  details,
}: SelectedReturnRefundCaseWorkspaceProps) {
  const { caseInfo, summaryMetrics } = details;

  return (
    <div className="flex flex-col gap-4 mb-6 w-full">
      {/* 1. Workspace Header & Summary Strip */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col gap-3">
        {/* Title & Badges Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-sm font-bold text-slate-900">
              Selected Return / Refund Case — <span className="font-mono text-[#800020] text-base font-extrabold">{caseInfo.id}</span>
            </h2>
            <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded border border-red-200">
              High Priority
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-200">
              Refund Pending
            </span>
            <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded border border-purple-200">
              Waiting on Finance
            </span>
            <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded border border-rose-200">
              SLA At Risk
            </span>
          </div>
        </div>

        {/* Summary Strip (8 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-2 text-[11px]">
          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Case Age</span>
            <span className="font-bold text-slate-900">{summaryMetrics.caseAge}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Return Age</span>
            <span className="font-bold text-slate-900">{summaryMetrics.returnAge}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Refund Value</span>
            <span className="font-bold text-slate-900 font-mono">{summaryMetrics.refundValue}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Refund Delay</span>
            <span className="font-bold text-red-600 font-mono">{summaryMetrics.refundDelay}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Customer Contacts</span>
            <span className="font-bold text-slate-900">{summaryMetrics.customerContactsCount}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Current Dependency</span>
            <span className="font-bold text-purple-700">{summaryMetrics.currentDependency}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Next Customer Update</span>
            <span className="font-bold text-amber-700 font-mono">{summaryMetrics.nextCustomerUpdate}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Case Health</span>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-emerald-700">{summaryMetrics.caseHealthPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 19 Operational Detail Cards Grid with items-start auto-rows-max */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start auto-rows-max">
        {/* Card 1: Original Order */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">1. Original Order</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-3">
            <div className="flex justify-between"><span className="text-slate-400">Order ID:</span><Link href="/admin/orders" className="font-mono font-bold text-blue-600 hover:underline">{details.originalOrder.orderId}</Link></div>
            <div className="flex justify-between"><span className="text-slate-400">Order Date:</span><span className="text-slate-700">{details.originalOrder.orderDate}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Credit Value:</span><span className="font-mono font-bold text-slate-900">{details.originalOrder.creditValue}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Status:</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">{details.originalOrder.status}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Customer:</span><span className="font-semibold text-slate-800">{details.originalOrder.customer}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Returnable Value:</span><span className="font-mono text-slate-800">{details.originalOrder.returnableValue}</span></div>
          </div>
          <Link href="/admin/orders" className="block w-full py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-[11px] font-semibold text-center transition-colors">
            Open Original Order
          </Link>
        </div>

        {/* Card 2: Return */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">2. Return</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-3">
            <div className="flex justify-between"><span className="text-slate-400">Return Ref:</span><span className="font-mono font-bold text-slate-900">{details.returnDetails.returnRef}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Reason:</span><span className="font-semibold text-slate-800">{details.returnDetails.reason}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Requested Date:</span><span className="text-slate-700">{details.returnDetails.requestedDate}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Return Status:</span><span className="font-semibold text-blue-700 bg-blue-50 px-1 rounded">{details.returnDetails.returnStatus}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Eligibility:</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">{details.returnDetails.eligibility}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Return Method:</span><span className="text-slate-800">{details.returnDetails.returnMethod}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Return Value:</span><span className="font-mono font-bold text-slate-900">{details.returnDetails.returnValue}</span></div>
          </div>
          <button className="w-full py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-[11px] font-semibold transition-colors">
            Open Return Details
          </button>
        </div>

        {/* Card 3: Reverse Logistics */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">3. Reverse Logistics</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-3">
            <div className="flex justify-between"><span className="text-slate-400">Collection Status:</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">{details.reverseLogistics.collectionStatus}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Pickup Date:</span><span className="text-slate-700">{details.reverseLogistics.pickupDate}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Carrier:</span><span className="font-semibold text-slate-800">{details.reverseLogistics.carrier}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Waybill:</span><span className="font-mono text-blue-600 font-bold">{details.reverseLogistics.waybill}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Warehouse Receipt:</span><span className="font-mono text-slate-800">{details.reverseLogistics.warehouseReceipt}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Return Logistics SLA:</span><span className="font-semibold text-emerald-700">{details.reverseLogistics.returnLogisticsSla}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Last Logistics Update:</span><span className="text-slate-500">{details.reverseLogistics.lastLogisticsUpdate}</span></div>
          </div>
          <button className="w-full py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-[11px] font-semibold transition-colors">
            Open Reverse Logistics Detail
          </button>
        </div>

        {/* Card 4: Inspection */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">4. Inspection</h4>
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div className="flex justify-between"><span className="text-slate-400">Inspection Status:</span><span className="font-bold text-emerald-700 bg-emerald-50 px-1 rounded">{details.inspection.status}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Result:</span><span className="font-semibold text-emerald-700">{details.inspection.result}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Product Condition:</span><span className="font-medium text-slate-800">{details.inspection.condition}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Packaging:</span><span className="text-slate-800">{details.inspection.packaging}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Inspection Date:</span><span className="text-slate-700">{details.inspection.date}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Inspector:</span><span className="font-semibold text-slate-800">{details.inspection.inspector}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Eligibility Result:</span><span className="font-semibold text-emerald-700">{details.inspection.eligibilityResult}</span></div>
          </div>
        </div>

        {/* Card 5: Refund */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">5. Refund</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-3">
            <div className="flex justify-between"><span className="text-slate-400">Refund Ref:</span><span className="font-mono font-bold text-slate-900">{details.refundDetails.refundRef}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Refund Status:</span><span className="font-bold text-red-700 bg-red-50 px-1 rounded">{details.refundDetails.refundStatus}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Requested Amount:</span><span className="font-mono font-bold text-slate-900">{details.refundDetails.requestedAmount}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Approved Amount:</span><span className="font-mono text-slate-500">{details.refundDetails.approvedAmount}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Payment Method:</span><span className="font-medium text-slate-800">{details.refundDetails.paymentMethod}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Expected Completion:</span><span className="font-mono text-slate-800">{details.refundDetails.expectedCompletion}</span></div>
          </div>
          <button className="w-full py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-[11px] font-semibold transition-colors">
            Open Finance Refund
          </button>
        </div>

        {/* Card 6: Refund Timeline */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">6. Refund Timeline</h4>
          <div className="flex items-center justify-between text-[10px] my-2 overflow-x-auto custom-scrollbar scrollbar-none pb-1">
            {details.refundTimeline.stages.map((stage, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center text-center shrink-0">
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold text-white mb-0.5 ${
                      stage.status === "completed"
                        ? "bg-emerald-600"
                        : "border-2 border-dashed border-amber-600 bg-amber-50 text-amber-800"
                    }`}
                  >
                    {stage.status === "completed" ? "✓" : "!"}
                  </span>
                  <span className={stage.status === "completed" ? "font-semibold text-slate-800" : "font-bold text-amber-800"}>
                    {stage.label}
                  </span>
                  {stage.timestamp && <span className="text-[9px] text-slate-400">{stage.timestamp}</span>}
                </div>
                {idx < details.refundTimeline.stages.length - 1 && <span className="text-emerald-500 text-xs shrink-0 mx-0.5">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Card 7: Timing Analysis */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">7. Timing Analysis</h4>
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div className="flex justify-between"><span className="text-slate-400">Expected Return Completion:</span><span className="font-mono text-slate-700">{details.timingAnalysis.expectedReturnCompletion}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Actual Return Completion:</span><span className="font-mono font-semibold text-emerald-700">{details.timingAnalysis.actualReturnCompletion}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Expected Refund Approval:</span><span className="font-mono text-slate-700">{details.timingAnalysis.expectedRefundApproval}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Actual Refund Approval:</span><span className="font-mono font-semibold text-emerald-700">{details.timingAnalysis.actualRefundApproval}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Expected Refund Completion:</span><span className="font-mono text-slate-700">{details.timingAnalysis.expectedRefundCompletion}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Current Refund Commitment:</span><span className="font-mono text-slate-700">{details.timingAnalysis.currentRefundCommitment}</span></div>
            <div className="flex justify-between pt-1 border-t border-slate-100"><span className="text-slate-400 font-medium">Refund Variance:</span><span className="font-mono font-bold text-red-600">{details.timingAnalysis.refundVariance}</span></div>
            <div className="flex justify-between"><span className="text-slate-400 font-medium">Confidence:</span><span className="font-bold text-slate-900">{details.timingAnalysis.confidencePercent}%</span></div>
          </div>
        </div>

        {/* Card 8: Eligibility & Policy */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">8. Eligibility &amp; Policy</h4>
          <div className="flex flex-col gap-1 text-[11px] mb-2">
            {[
              { label: "Return Window", status: details.eligibilityPolicy.returnWindow },
              { label: "Product Condition", status: details.eligibilityPolicy.productCondition },
              { label: "Product Category", status: details.eligibilityPolicy.productCategory },
              { label: "Fraud-Safe Evaluation", status: details.eligibilityPolicy.fraudSafeEvaluation },
              { label: "Hygiene Restriction", status: details.eligibilityPolicy.hygieneRestriction },
              { label: "Promotional Restriction", status: details.eligibilityPolicy.promotionalRestriction },
              { label: "Proof of Purchase", status: details.eligibilityPolicy.proofOfPurchase },
              { label: "Overall Eligible", status: details.eligibilityPolicy.overallEligible },
            ].map((row, idx) => (
              <div key={idx} className="flex justify-between py-0.5">
                <span className="text-slate-600">{row.label}</span>
                <span className="font-bold text-emerald-700">{row.status}</span>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-slate-400 text-right font-mono font-medium">
            Policy: {details.eligibilityPolicy.policyCode}
          </div>
        </div>

        {/* Card 9: Dispute Workspace */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">9. Dispute Workspace</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-3">
            <div className="flex justify-between"><span className="text-slate-400">Dispute Ref:</span><span className="font-mono font-bold text-[#800020]">{details.disputeWorkspace.disputeRef}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Reason:</span><span className="font-semibold text-slate-800">{details.disputeWorkspace.reason}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Customer Position:</span><span className="text-slate-700">{details.disputeWorkspace.customerPosition}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Evidence Completeness:</span><span className="font-bold text-amber-700">{details.disputeWorkspace.evidenceCompleteness}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Customer Claim:</span><span className="text-slate-800">{details.disputeWorkspace.customerClaim}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Escalation Level:</span><span className="font-bold text-red-600">{details.disputeWorkspace.escalationLevel}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Decision Due:</span><span className="font-mono text-slate-800">{details.disputeWorkspace.decisionDue}</span></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="py-1 bg-white border border-[#800020] hover:bg-rose-50 text-[#800020] rounded text-[11px] font-semibold transition-colors">
              Review Dispute
            </button>
            <button className="py-1 bg-white border border-[#800020] hover:bg-rose-50 text-[#800020] rounded text-[11px] font-semibold transition-colors">
              Request Evidence
            </button>
          </div>
        </div>

        {/* Card 10: Investigation Checklist */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">10. Investigation Checklist</h4>
          <div className="flex flex-col gap-1 text-[11px]">
            {details.investigationChecklist.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className={item.isCompleted ? "text-emerald-600" : "text-slate-300"} />
                  <span className="text-slate-700 font-medium">{item.label}</span>
                </div>
                <span className={`text-[10px] px-1 rounded font-bold ${item.isCompleted ? "text-emerald-700 bg-emerald-50" : "text-slate-400 bg-slate-50"}`}>
                  {item.isCompleted ? "Completed" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 11: Blocking Issues */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">11. Blocking Issues</h4>
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-slate-600">Finance Processing</span><span className="font-bold text-amber-700 bg-amber-50 px-1 rounded">Pending</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-600">Customer Update Due</span><span className="font-bold text-red-700 bg-red-50 px-1 rounded">Due</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-600">Inspection Pending</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">No</span></div>
          </div>
        </div>

        {/* Card 12: Dependencies */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">12. Dependencies</h4>
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between"><span className="text-slate-600">Logistics</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">Completed</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Warehouse QA</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">Completed</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Finance</span><span className="font-bold text-amber-700 bg-amber-50 px-1 rounded">Waiting</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Supplier</span><span className="text-slate-400">Not Required</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Customer</span><span className="font-semibold text-amber-700 bg-amber-50 px-1 rounded">Awaiting Info</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Compliance</span><span className="text-slate-400">Not Required</span></div>
          </div>
        </div>

        {/* Card 13: Finance Escalation */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">13. Finance Escalation</h4>
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div className="flex justify-between"><span className="text-slate-400">Escalation Status:</span><span className="font-bold text-red-700 bg-red-50 px-1 rounded">{details.financeEscalation.escalationStatus}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Owner:</span><span className="font-semibold text-slate-800">{details.financeEscalation.owner}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Reason:</span><span className="text-slate-800">{details.financeEscalation.reason}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Escalated At:</span><span className="text-slate-700">{details.financeEscalation.escalatedAt}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Next Escalation:</span><span className="font-bold text-red-600">{details.financeEscalation.nextEscalation}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Due:</span><span className="font-mono text-slate-800">{details.financeEscalation.due}</span></div>
          </div>
        </div>

        {/* Card 14: Recovery Plan */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-900">14. Recovery Plan</h4>
            <div className="flex items-center gap-1.5">
              <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${details.recoveryPlan.progressPercent}%` }}></div>
              </div>
              <span className="text-[11px] font-bold text-slate-800">{details.recoveryPlan.progressPercent}%</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-[11px]">
            {details.recoveryPlan.steps.map((step) => (
              <div key={step.stepNumber} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0">
                <span className="text-slate-700 font-medium">{step.stepNumber}. {step.label}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-bold ${
                  step.status === "done" ? "text-emerald-700 bg-emerald-50" : step.status === "in progress" ? "text-blue-700 bg-blue-50" : "text-slate-400 bg-slate-50"
                }`}>{step.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 15: Customer Communication */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">15. Customer Communication</h4>
          <div className="bg-slate-50 p-2 rounded border border-slate-200 text-[11px] text-slate-900 italic font-medium mb-2">
            {details.customerCommunication.latestMessage}
          </div>
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between"><span className="text-slate-400">Sentiment:</span><span className="font-bold text-amber-700">{details.customerCommunication.sentiment}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Article Used:</span><span className="text-slate-800">{details.customerCommunication.botArticleUsed}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Agent Notes:</span><span className="text-slate-700">{details.customerCommunication.agentNotes}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Last Contact:</span><span className="text-slate-700">{details.customerCommunication.lastContact}</span></div>
          </div>
        </div>

        {/* Card 16: Customer Impact */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">16. Customer Impact</h4>
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div className="flex justify-between"><span className="text-slate-400">Sentiment:</span><span className="font-bold text-amber-700 bg-amber-50 px-1 rounded">{details.customerImpact.sentiment}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Repeat Contact Risk:</span><span className="font-semibold text-amber-700 bg-amber-50 px-1 rounded">{details.customerImpact.repeatContactRisk}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Churn Risk:</span><span className="font-bold text-red-700 bg-red-50 px-1 rounded">{details.customerImpact.churnRisk}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Financial Impact:</span><span className="font-semibold text-amber-700 bg-amber-50 px-1 rounded">{details.customerImpact.financialImpact}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Reputation Risk:</span><span className="font-semibold text-amber-700 bg-amber-50 px-1 rounded">{details.customerImpact.reputationRisk}</span></div>
          </div>
        </div>

        {/* Card 17: Return & Refund SLA */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">17. Return &amp; Refund SLA</h4>
          <div className="flex flex-col gap-1 text-[10px]">
            <div className="flex justify-between font-semibold text-slate-400 pb-0.5 border-b border-slate-100">
              <span>SLA Metric</span><span>Target</span><span>Status</span>
            </div>
            {details.returnRefundSla.map((sla, idx) => (
              <div key={idx} className="flex justify-between items-center py-0.5">
                <span className="text-slate-700 font-medium">{sla.metric}</span>
                <span className="text-slate-500 font-mono">{sla.target}</span>
                <span className={`px-1 rounded font-bold ${sla.status === "Met" ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"}`}>
                  {sla.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 18: Exception History */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">18. Exception History</h4>
          <div className="flex flex-col gap-1 text-[10px]">
            {details.exceptionHistory.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                <span className="text-slate-500 font-mono">{item.dateTime}</span>
                <span className="text-slate-800 font-medium truncate max-w-[120px]">{item.exception}</span>
                <span className={`px-1 py-0.2 rounded font-bold ${
                  item.status === "Open" ? "text-red-700 bg-red-50" : "text-emerald-700 bg-emerald-50"
                }`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 19: Repeat Issue Analysis / Item Detail */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">19. Repeat Issue Analysis / Item Detail</h4>
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div className="flex justify-between"><span className="text-slate-400">Previous Returns (90d):</span><span className="font-bold text-slate-900">{details.repeatIssueAnalysis.previousReturns90d}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Product Return Rate:</span><span className="font-mono text-slate-800">{details.repeatIssueAnalysis.productReturnRate}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Item-Level Outcome:</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">{details.repeatIssueAnalysis.itemLevelOutcome}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Exchange Eligibility:</span><span className="font-semibold text-emerald-700">{details.repeatIssueAnalysis.exchangeEligibility}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
