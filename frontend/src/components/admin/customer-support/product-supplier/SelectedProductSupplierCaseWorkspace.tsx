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
  Truck,
  RotateCcw,
  RefreshCw,
  Search,
  ChevronRight,
  Package,
} from "lucide-react";
import { SelectedProductCaseDetailsData } from "./types";

interface SelectedProductSupplierCaseWorkspaceProps {
  details: SelectedProductCaseDetailsData;
}

export function SelectedProductSupplierCaseWorkspace({
  details,
}: SelectedProductSupplierCaseWorkspaceProps) {
  const { caseInfo, summaryMetrics } = details;

  return (
    <div className="flex flex-col gap-4 mb-6 w-full">
      {/* 1. Workspace Header & Summary Strip */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col gap-3">
        {/* Title Row */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-4 h-4 bg-[#800020] text-white rounded-full text-[10px] font-extrabold flex items-center justify-center">2</span>
            <span>Selected Product / Supplier Case — </span>
            <span className="font-mono text-[#800020] text-base font-extrabold">{caseInfo.id} ({caseInfo.customerName})</span>
          </h2>
        </div>

        {/* Summary Strip (8 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-2 text-[11px]">
          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Case Age</span>
            <span className="font-bold text-slate-900">{summaryMetrics.caseAge}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Product Issues</span>
            <span className="font-bold text-[#800020]">{summaryMetrics.productIssuesCount}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Supplier Cases</span>
            <span className="font-bold text-slate-900">{summaryMetrics.supplierCases30dCount}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Similar Authenticity Reports</span>
            <span className="font-bold text-amber-700 font-mono">{summaryMetrics.similarAuthenticityReportsCount}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Evidence Completeness</span>
            <span className="font-bold text-emerald-700">{summaryMetrics.evidenceCompletenessPercent}%</span>
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
            <span className="font-extrabold text-emerald-700">{summaryMetrics.caseHealthPercent}%</span>
          </div>
        </div>
      </div>

      {/* 2. Operational Cards Grid with items-start auto-rows-max */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start auto-rows-max">
        {/* Card 7: Product Summary */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">7. Product Summary</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-3">
            <div className="flex justify-between"><span className="text-slate-400">Product ID:</span><span className="font-mono font-bold text-slate-900">{details.productSummary.productId}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Brand:</span><span className="font-semibold text-slate-800">{details.productSummary.brand}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Category:</span><span className="text-slate-700">{details.productSummary.category}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">SKU:</span><span className="font-mono font-bold text-slate-800">{details.productSummary.sku}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Returnable Item:</span><span className="font-semibold text-emerald-700">{details.productSummary.returnableItem}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Compliance Status:</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">{details.productSummary.confidenceQuality}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Verified Supplier:</span><span className="font-semibold text-emerald-700">{details.productSummary.verifiedSupplier}</span></div>
          </div>
          <Link href="/admin/catalogue" className="block w-full py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-[11px] font-semibold text-center transition-colors">
            Open Product Detail
          </Link>
        </div>

        {/* Card 8: Supplier Summary */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">8. Supplier Summary</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-3">
            <div className="flex justify-between"><span className="text-slate-400">Supplier ID:</span><span className="font-mono font-bold text-slate-900">{details.supplierSummary.supplierId}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Name:</span><span className="font-semibold text-slate-900">{details.supplierSummary.name}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Tier:</span><span className="font-bold text-blue-700 bg-blue-50 px-1 rounded">{details.supplierSummary.tier}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Contract Status:</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">{details.supplierSummary.contractStatus}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Product Coverage:</span><span className="text-slate-800">{details.supplierSummary.productCoverage}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Supplier SLA:</span><span className="font-semibold text-emerald-700">{details.supplierSummary.supplierSla}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Incidents:</span><span className="font-mono text-amber-700 font-bold">{details.supplierSummary.authenticityIncidentsCount}</span></div>
          </div>
          <Link href="/admin/brands-suppliers" className="block w-full py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-[11px] font-semibold text-center transition-colors">
            Open Supplier Detail
          </Link>
        </div>

        {/* Card 9: Variant / Batch & Lot */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">9. Variant / Batch &amp; Lot</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-3">
            <div className="flex justify-between"><span className="text-slate-400">Batch/Lot:</span><span className="font-mono font-bold text-slate-900">{details.variantBatchLot.batchLot}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Mfg. Date:</span><span className="text-slate-700">{details.variantBatchLot.mfgDate}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Expiry Date:</span><span className="text-slate-700">{details.variantBatchLot.expiryDate}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Batch Status:</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">{details.variantBatchLot.batchStatus}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Complaints:</span><span className="font-bold text-slate-900">{details.variantBatchLot.unitLevelComplaintsCount}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Returns:</span><span className="font-bold text-slate-900">{details.variantBatchLot.relatedReturnsCount}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Safety Alerts:</span><span className="text-slate-500">{details.variantBatchLot.safetyAlerts}</span></div>
          </div>
          <button className="w-full py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-[11px] font-semibold transition-colors">
            Open Batch / Lot Reference
          </button>
        </div>

        {/* Card 10: Product Quality Assessment */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">10. Product Quality Assessment</h4>
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div className="flex justify-between"><span className="text-slate-400">Issue Type:</span><span className="font-bold text-slate-900">{details.productQualityAssessment.issueType}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Reported Condition:</span><span className="font-semibold text-slate-800">{details.productQualityAssessment.reportedCondition}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Product Type:</span><span className="text-slate-800">{details.productQualityAssessment.productType}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Usability:</span><span className="font-semibold text-emerald-700">{details.productQualityAssessment.usability}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Confidence:</span><span className="font-bold text-slate-900">{details.productQualityAssessment.confidencePercent}%</span></div>
          </div>
        </div>

        {/* Card 11: Authenticity Assessment */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">11. Authenticity Assessment</h4>
          <div className="flex items-center gap-3 mb-2">
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path className="text-emerald-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-emerald-600" strokeDasharray="68, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute text-xs font-extrabold text-slate-900">{details.authenticityAssessment.confidenceScorePercent}%</span>
            </div>
            <div className="flex flex-col gap-1 text-[11px]">
              <div><span className="text-slate-400">Status: </span><span className="font-bold text-amber-700 bg-amber-50 px-1 rounded">{details.authenticityAssessment.status}</span></div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                <span className="text-emerald-600 font-bold">✓ Batch Trace</span>
                <span className="text-emerald-600 font-bold">✓ QR/Serial</span>
              </div>
            </div>
          </div>
          <Link href="/admin/verification-compliance" className="text-blue-600 font-semibold hover:underline text-[10px]">
            Review Required
          </Link>
        </div>

        {/* Card 12: Safety Assessment */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-900">12. Safety Assessment</h4>
            <span className="text-[10px] text-slate-400 italic">Support Guidance only</span>
          </div>
          <div className="flex flex-col gap-1.5 text-[11px] mb-2">
            <div className="flex justify-between"><span className="text-slate-400">Severity:</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">{details.safetyAssessment.severity}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Immediate Guidance:</span><span className="font-semibold text-emerald-700">{details.safetyAssessment.immediateGuidance}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Incident Status:</span><span className="font-semibold text-amber-700 bg-amber-50 px-1 rounded">{details.safetyAssessment.incidentStatus}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Compliance Trigger:</span><span className="text-slate-800">{details.safetyAssessment.complianceTrigger}</span></div>
          </div>
          <Link href="/admin/verification-compliance" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View Safety Proposal
          </Link>
        </div>

        {/* Next Actions (Initiate Workflows) Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Next Actions (Initiate Workflows)</h4>
          <div className="flex flex-col gap-1.5">
            {[
              "Initiate Refund Workflow",
              "Open Supplier Escalation",
              "Open Compliance Escalation",
              "Create Replacement Request",
              "Initiate Safety Concern",
              "Initiate SLA Risk Review",
            ].map((label, idx) => (
              <button key={idx} className="w-full py-1 px-2.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-[11px] font-semibold text-left transition-colors shadow-2xs">
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Statement Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Customer Statement</h4>
          <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] text-slate-900 italic font-medium mb-2">
            {details.customerStatement.text}
          </div>
          <Link href="/admin/customer-support/conversations" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View Conversation History
          </Link>
        </div>

        {/* Customer Evidence Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Customer Evidence</h4>
          <div className="flex flex-col gap-1 text-[11px]">
            {details.customerEvidence.map((ev, idx) => (
              <div key={idx} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0">
                <span className="text-slate-700 font-medium">{ev.label}</span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1 rounded flex items-center gap-0.5">
                  <CheckCircle2 size={10} />
                  <span>{ev.status}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Authenticity / Investigation Timeline */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Authenticity / Investigation Timeline</h4>
          <div className="flex items-center justify-between text-[9px] my-2 overflow-x-auto custom-scrollbar scrollbar-none pb-1">
            {details.authenticityTimeline.stages.map((stage, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center text-center shrink-0">
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold text-white mb-0.5 ${
                      stage.status === "completed"
                        ? "bg-emerald-600"
                        : "border-2 border-dashed border-red-600 bg-red-50 text-red-800"
                    }`}
                  >
                    {stage.status === "completed" ? "✓" : "!"}
                  </span>
                  <span className={stage.status === "completed" ? "font-semibold text-slate-800" : "font-bold text-red-800"}>
                    {stage.label}
                  </span>
                  {stage.timestamp && <span className="text-[8px] text-slate-400">{stage.timestamp}</span>}
                </div>
                {idx < details.authenticityTimeline.stages.length - 1 && <span className="text-emerald-500 text-xs shrink-0 mx-0.5">→</span>}
              </React.Fragment>
            ))}
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View All Issues
          </Link>
        </div>

        {/* Similar Issue Analysis */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Similar Issue Analysis</h4>
          <div className="grid grid-cols-5 gap-1 text-center text-[10px] mb-2">
            <div><span className="text-slate-400 block font-medium">Same SKU</span><span className="font-bold text-slate-900 text-xs">{details.similarIssueAnalysis.sameSku}</span></div>
            <div><span className="text-slate-400 block font-medium">Same Batch</span><span className="font-bold text-slate-900 text-xs">{details.similarIssueAnalysis.sameBatch}</span></div>
            <div><span className="text-slate-400 block font-medium">Supplier</span><span className="font-bold text-slate-900 text-xs">{details.similarIssueAnalysis.sameSupplier}</span></div>
            <div><span className="text-slate-400 block font-medium">Packaging</span><span className="font-bold text-slate-900 text-xs">{details.similarIssueAnalysis.samePackaging}</span></div>
            <div><span className="text-slate-400 block font-medium">Counterfeit</span><span className="font-bold text-emerald-700 text-xs">{details.similarIssueAnalysis.confirmedCounterfeit90d}</span></div>
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View Full Checklist
          </Link>
        </div>

        {/* Investigation Checklist */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Investigation Checklist</h4>
          <div className="flex flex-col gap-1 text-[11px] mb-2">
            {details.investigationChecklist.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0">
                <span className="text-slate-700 font-medium">{item.label}</span>
                <CheckCircle2 size={13} className="text-emerald-600" />
              </div>
            ))}
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View Full Checklist
          </Link>
        </div>

        {/* Blocking Issue Customer Guidance */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Blocking Issue Customer Guidance</h4>
          <div className="bg-slate-50 p-2 rounded border border-slate-200 text-[11px] text-slate-800 mb-2 font-medium">
            {details.blockingGuidance.guidanceText}
          </div>
          <p className="text-[10px] text-slate-500 mb-2">{details.blockingGuidance.updateEta}</p>
          <Link href="/admin/customer-support/conversations" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View Conversation History
          </Link>
        </div>

        {/* Dependency Workspace */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Dependency Workspace</h4>
          <div className="flex flex-col gap-1 text-[11px] mb-2">
            <div className="flex justify-between"><span className="text-slate-600">Verification &amp; Compliance</span><span className="font-bold text-amber-700 bg-amber-50 px-1 rounded">Waiting</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Supplier</span><span className="font-bold text-blue-700 bg-blue-50 px-1 rounded">Reviewing</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Packaging Team</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">Confirmed</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Finance</span><span className="text-slate-400">Not Required</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Customer</span><span className="font-bold text-amber-700 bg-amber-50 px-1 rounded">Waiting</span></div>
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View Dependency Map
          </Link>
        </div>

        {/* Compliance Escalation */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Compliance Escalation</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-2">
            <div className="flex justify-between"><span className="text-slate-400">Escalation ID:</span><span className="font-mono font-bold text-[#800020]">{details.complianceEscalation.escalationId}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Owner:</span><span className="font-semibold text-slate-800">{details.complianceEscalation.owner}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Reason:</span><span className="text-slate-800">{details.complianceEscalation.reason}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Status:</span><span className="font-bold text-red-700 bg-red-50 px-1 rounded">{details.complianceEscalation.status}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Risk:</span><span className="font-bold text-red-600">{details.complianceEscalation.risk}</span></div>
          </div>
          <Link href="/admin/verification-compliance" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View Escalation Details
          </Link>
        </div>

        {/* Customer & Product Impact */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Customer &amp; Product Impact</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-2">
            <div className="flex justify-between"><span className="text-slate-400">Customer Sentiment:</span><span className="font-bold text-red-700 bg-red-50 px-1 rounded">{details.customerProductImpact.sentiment}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Authenticity Risk:</span><span className="font-bold text-red-700 bg-red-50 px-1 rounded">{details.customerProductImpact.authenticityRisk}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Supplier Risk:</span><span className="font-semibold text-amber-700 bg-amber-50 px-1 rounded">{details.customerProductImpact.supplierRisk}</span></div>
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View Impact Analysis
          </Link>
        </div>

        {/* Recommended Customer Guidance Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Recommended Customer Guidance</h4>
          <div className="bg-slate-50 p-2 rounded border border-slate-200 text-[11px] text-slate-800 mb-2">
            {details.recommendedCustomerGuidance.previewText}
          </div>
          <button className="w-full py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-[11px] font-semibold transition-colors">
            Edit Guidance Template
          </button>
        </div>

        {/* Case History Snapshot */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Case History Snapshot</h4>
          <div className="flex flex-col gap-1 text-[10px]">
            <div className="flex justify-between items-center"><span className="text-slate-600">Initial Response SLA</span><span className="font-bold text-emerald-700 bg-emerald-50 px-1 rounded">{details.caseHistorySnapshot.initialResponseSla}</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-600">Supplier Response SLA</span><span className="font-bold text-red-700 bg-red-50 px-1 rounded">{details.caseHistorySnapshot.supplierResponseSla} ({details.caseHistorySnapshot.supplierResponseTime})</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-600">Compliance Review SLA</span><span className="font-bold text-red-700 bg-red-50 px-1 rounded">{details.caseHistorySnapshot.complianceReviewSla} ({details.caseHistorySnapshot.complianceReviewTime})</span></div>
          </div>
        </div>

        {/* Exception History */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Exception History</h4>
          <div className="flex flex-col gap-1 text-[10px]">
            {details.exceptionHistory.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                <span className="text-slate-800 font-medium truncate max-w-[120px]">{item.type}</span>
                <span className="text-slate-500 font-mono">{item.raisedOn}</span>
                <span className="text-emerald-700 bg-emerald-50 font-bold px-1 rounded">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
