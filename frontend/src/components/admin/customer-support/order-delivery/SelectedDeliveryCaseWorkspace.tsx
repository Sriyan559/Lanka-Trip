"use client";

import React from "react";
import Link from "next/link";
import {
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Clock,
  CheckSquare,
  Package,
} from "lucide-react";
import { SelectedCaseDetailsData } from "./types";

interface SelectedDeliveryCaseWorkspaceProps {
  details: SelectedCaseDetailsData;
}

export function SelectedDeliveryCaseWorkspace({
  details,
}: SelectedDeliveryCaseWorkspaceProps) {
  const { caseInfo } = details;

  return (
    <div className="flex flex-col gap-4 mb-6 w-full">
      {/* 1. Workspace Header & Summary Strip */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col gap-3">
        {/* Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>Selected Delivery Support Case:</span>
            <span className="font-mono text-[#800020] text-base font-extrabold">{caseInfo.id}</span>
          </h2>

          <div className="flex items-center gap-2">
            <button className="px-3.5 py-1 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-colors">
              <span>Actions</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Summary Strip (10 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-10 gap-2 text-[11px]">
          <div>
            <span className="text-slate-400 block font-medium">Case Age</span>
            <span className="font-bold text-slate-900">{caseInfo.age} 27m</span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Priority</span>
            <span className="font-bold text-red-700 bg-red-50 px-1.5 py-0.2 rounded border border-red-200 inline-block">
              {caseInfo.risk}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">SLA Status</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200 inline-block">
              {caseInfo.slaStatus}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">SLA Due</span>
            <span className="font-mono text-slate-800 font-semibold">{caseInfo.slaDue}</span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Customer</span>
            <span className="font-bold text-slate-900 flex items-center gap-1">
              {caseInfo.customerName}
              <span className="text-[9px] bg-amber-100 text-amber-800 px-1 rounded">VIP</span>
            </span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Loyalty</span>
            <span className="font-bold text-amber-700">{caseInfo.loyaltyTier}</span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Order</span>
            <Link href="/admin/orders" className="font-mono text-blue-600 font-bold hover:underline">
              {caseInfo.orderId}
            </Link>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Fulfilment</span>
            <span className="font-mono text-slate-800 font-semibold">
              {caseInfo.fulfilmentId} <span className="text-[10px] text-blue-600 font-bold">In Transit</span>
            </span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Carrier</span>
            <span className="font-semibold text-slate-900">
              FedEx <span className="text-[10px] text-red-600 font-bold">Delayed</span>
            </span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Delivery ETA</span>
            <span className="font-mono text-slate-800 font-semibold">{caseInfo.deliveryEta}</span>
          </div>
        </div>
      </div>

      {/* 2. 20 Operational Detail Cards Grid with items-start auto-rows-max */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start auto-rows-max">
        {/* Card 1: Case Overview */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">1. Case Overview</h4>
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div className="flex justify-between"><span className="text-slate-400">Case Source:</span><span className="font-mono font-bold text-slate-800">{details.caseOverview.caseSource}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Created:</span><span className="text-slate-700">{details.caseOverview.created}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Issue Type:</span><span className="font-bold text-red-700 bg-red-50 px-1 rounded">{details.caseOverview.issueType}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Category:</span><span className="font-semibold text-slate-800">{details.caseOverview.category}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Subcategory:</span><span className="text-slate-700">{details.caseOverview.subcategory}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Impact:</span><span className="font-semibold text-slate-800">{details.caseOverview.impact}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Customer Impact:</span><span className="font-bold text-red-700 bg-red-50 px-1 rounded">{details.caseOverview.customerImpact}</span></div>
          </div>
        </div>

        {/* Card 2: Fulfilment & Order Details */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">2. Fulfilment &amp; Order Details</h4>
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div className="flex justify-between"><span className="text-slate-400">Order Source:</span><span className="font-mono font-bold text-slate-800">{details.fulfilmentDetails.orderSource}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Order Date:</span><span className="text-slate-700">{details.fulfilmentDetails.orderDate}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Order Status:</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">{details.fulfilmentDetails.orderStatus}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Fulfilment Source:</span><span className="font-semibold text-emerald-700">{details.fulfilmentDetails.fulfilmentSource}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Fulfilment Status:</span><span className="font-semibold text-blue-700 bg-blue-50 px-1 rounded">{details.fulfilmentDetails.fulfilmentStatus}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Warehouse:</span><span className="text-slate-800 font-medium">{details.fulfilmentDetails.warehouse}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Ship From:</span><span className="text-slate-800 font-medium">{details.fulfilmentDetails.shipFrom}</span></div>
          </div>
        </div>

        {/* Card 3: Shipment Details */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">3. Shipment Details</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-2">
            <div className="flex justify-between"><span className="text-slate-400">Shipment Source:</span><span className="font-semibold text-emerald-700">{details.shipmentDetails.shipmentSource}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Tracking Number:</span><span className="font-mono font-bold text-blue-600">{details.shipmentDetails.trackingNumber}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Shipment Status:</span><span className="font-semibold text-blue-700 bg-blue-50 px-1 rounded">{details.shipmentDetails.shipmentStatus}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Estimated Delivery:</span><span className="font-mono text-slate-800">{details.shipmentDetails.estimatedDelivery}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Current Location:</span><span className="text-slate-800 font-medium">{details.shipmentDetails.currentLocation}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Last Scan:</span><span className="text-slate-500">{details.shipmentDetails.lastScan}</span></div>
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View Tracking Timeline
          </Link>
        </div>

        {/* Card 4: Carrier & Tracking */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">4. Carrier &amp; Tracking</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-3">
            <div className="flex justify-between"><span className="text-slate-400">Carrier:</span><span className="font-bold text-slate-900">{details.carrierTracking.carrier}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Service Level:</span><span className="text-slate-800 font-medium">{details.carrierTracking.serviceLevel}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Tracking Link:</span><a href="#" className="text-blue-600 font-semibold hover:underline flex items-center gap-0.5">{details.carrierTracking.trackingLink} <ExternalLink size={10} /></a></div>
            <div className="flex justify-between"><span className="text-slate-400">Proactive Tracking Risk:</span><span className="font-bold text-red-600 bg-red-50 px-1 rounded">{details.carrierTracking.proactiveTrackingRisk}</span></div>
          </div>
          <button className="w-full py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-[11px] font-semibold transition-colors">
            View Carrier Details
          </button>
        </div>

        {/* Card 5: Delivery Timeline */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">5. Delivery Timeline</h4>
          {/* Horizontal Workflow Nodes */}
          <div className="flex items-center justify-between text-[10px] my-2 overflow-x-auto custom-scrollbar scrollbar-none pb-1">
            {details.deliveryTimeline.stages.map((stage, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center text-center shrink-0">
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold text-white mb-0.5 ${
                      stage.status === "completed"
                        ? "bg-emerald-600"
                        : stage.status === "active"
                        ? "bg-blue-600"
                        : "bg-slate-300"
                    }`}
                  >
                    {stage.status === "completed" ? "✓" : idx + 1}
                  </span>
                  <span className={stage.status === "active" ? "font-bold text-blue-800" : stage.status === "completed" ? "font-semibold text-slate-800" : "text-slate-400"}>
                    {stage.label}
                  </span>
                  {stage.timestamp && <span className="text-[9px] text-slate-400">{stage.timestamp}</span>}
                </div>
                {idx < details.deliveryTimeline.stages.length - 1 && <span className="text-slate-300 text-xs shrink-0 mx-0.5">→</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Delay Reason Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded p-2 text-[11px] text-amber-900 mt-2">
            <div className="font-bold flex items-center gap-1 text-amber-800">
              <AlertCircle size={12} />
              <span>Delay Reason: {details.deliveryTimeline.delayReason}</span>
            </div>
            <div className="text-[10px] text-amber-700 mt-0.5">{details.deliveryTimeline.warningAlert}</div>
          </div>
        </div>

        {/* Card 6: SLA Summary */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">6. SLA Summary</h4>
          <div className="flex items-center gap-3 mb-2">
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path className="text-blue-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-blue-600" strokeDasharray="82, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute text-xs font-extrabold text-slate-900">{details.slaSummary.healthPercent}%</span>
            </div>
            <div className="flex flex-col gap-1 text-[11px]">
              <div><span className="text-slate-400">SLA Target: </span><span className="font-mono text-slate-800 font-semibold">{details.slaSummary.slaTarget}</span></div>
              <div><span className="text-slate-400">Time Remaining: </span><span className="font-bold text-red-600">{details.slaSummary.timeRemaining}</span></div>
              <div><span className="text-slate-400">Stage Compliance: </span><span className="font-bold text-blue-700">{details.slaSummary.stageCompliancePercent}%</span></div>
            </div>
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View SLA Details
          </Link>
        </div>

        {/* Card 7: Issue Classification */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">7. Issue Classification</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-3">
            <div className="flex justify-between"><span className="text-slate-400">Primary Issue:</span><span className="font-bold text-slate-900">{details.issueClassification.primaryIssue}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Root Cause (Likely):</span><span className="font-semibold text-slate-800">{details.issueClassification.rootCauseLikely}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Contributing Factors:</span><span className="text-slate-700">{details.issueClassification.contributingFactors}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Issue Detected:</span><span className="font-medium text-slate-800">{details.issueClassification.issueDetected}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Customer Notified:</span><span className="font-bold text-emerald-700">{details.issueClassification.customerNotified}</span></div>
          </div>
          <button className="w-full py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-[11px] font-semibold transition-colors">
            Edit Classification
          </button>
        </div>

        {/* Card 8: Dispatch Investigation Checklist */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">8. Dispatch Investigation Checklist</h4>
          <div className="flex flex-col gap-1 text-[11px] mb-3">
            {details.investigationChecklist.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span className="text-slate-700 font-medium">{item.label}</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1 rounded">Completed</span>
              </div>
            ))}
          </div>
          <button className="w-full py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-[11px] font-semibold transition-colors">
            View Checklist
          </button>
        </div>

        {/* Card 9: Related Issues */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">9. Related Issues</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Same Order</span>
              <span className="font-bold text-slate-900">{details.relatedIssues.sameOrderCount}</span>
              <button className="px-1.5 py-0.2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px]">View</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Same Customer (30d)</span>
              <span className="font-bold text-slate-900">{details.relatedIssues.sameCustomer30dCount}</span>
              <button className="px-1.5 py-0.2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px]">View</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Same Address (30d)</span>
              <span className="font-bold text-slate-900">{details.relatedIssues.sameAddress30dCount}</span>
              <button className="px-1.5 py-0.2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px]">View</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Same Tracking (30d)</span>
              <span className="font-bold text-slate-900">{details.relatedIssues.sameTracking30dCount}</span>
              <button className="px-1.5 py-0.2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px]">View</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Similar Issues (30d)</span>
              <span className="font-bold text-slate-900">{details.relatedIssues.similarIssues30dCount}</span>
              <button className="px-1.5 py-0.2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px]">View</button>
            </div>
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View All Related Issues
          </Link>
        </div>

        {/* Card 10: Dependency Workspace */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">10. Dependency Workspace</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-2">
            <div className="flex justify-between"><span className="text-slate-400">Warehouse:</span><span className="font-semibold text-emerald-700">{details.dependencies.warehouse.name}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Inventory:</span><span className="font-semibold text-emerald-700">{details.dependencies.inventory}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Payment:</span><span className="font-semibold text-emerald-700">{details.dependencies.payment}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Fraud Review:</span><span className="font-semibold text-emerald-700">{details.dependencies.fraudReview}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Supplier:</span><span className="text-slate-500">{details.dependencies.supplier}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Carrier:</span><span className="font-bold text-red-600 bg-red-50 px-1 rounded">{details.dependencies.carrier.name}</span></div>
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View Dependency Map
          </Link>
        </div>

        {/* Card 11: Logistics Escalation */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">11. Logistics Escalation</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-3">
            <div className="flex justify-between"><span className="text-slate-400">Escalation Level:</span><span className="font-bold text-slate-900">{details.logisticsEscalation.escalationLevel}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Escalated To:</span><span className="font-semibold text-slate-800">{details.logisticsEscalation.escalatedTo}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Escalation Status:</span><span className="font-semibold text-amber-700 bg-amber-50 px-1 rounded">{details.logisticsEscalation.escalationStatus}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Escalated On:</span><span className="text-slate-700">{details.logisticsEscalation.escalatedOn}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Next Update ETA:</span><span className="font-mono text-slate-800">{details.logisticsEscalation.nextUpdateEta}</span></div>
          </div>
          <button className="w-full py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-[11px] font-semibold transition-colors">
            View Escalation Details
          </button>
        </div>

        {/* Card 12: Recovery Plan */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-900">12. Recovery Plan</h4>
            <div className="flex items-center gap-1.5">
              <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${details.recoveryPlan.progressPercent}%` }}></div>
              </div>
              <span className="text-[11px] font-bold text-slate-800">{details.recoveryPlan.progressPercent}%</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-[11px] mb-3">
            {details.recoveryPlan.steps.map((step) => (
              <div key={step.stepNumber} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0">
                <span className="text-slate-700 font-medium">{step.stepNumber}. {step.label}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-bold ${
                  step.status === "Completed" ? "text-emerald-700 bg-emerald-50" : step.status === "In Progress" ? "text-amber-700 bg-amber-50" : "text-slate-400 bg-slate-50"
                }`}>{step.status}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-[11px] font-semibold transition-colors">
            Update Plan
          </button>
        </div>

        {/* Card 13: Address / Customer Availability */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">13. Address / Customer Availability</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-2">
            <div className="flex justify-between"><span className="text-slate-400">Shipping Address:</span><span className="font-semibold text-emerald-700">{details.customerAvailability.shippingAddress}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Delivery Instructions:</span><span className="text-slate-500">{details.customerAvailability.deliveryInstructions}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Customer Availability:</span><span className="font-medium text-slate-800">{details.customerAvailability.customerAvailability}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Best Contact Channel:</span><span className="font-semibold text-blue-600">{details.customerAvailability.bestContactChannel}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Do Not Disturb:</span><span className="text-slate-700">{details.customerAvailability.doNotDisturb}</span></div>
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View Customer Profile
          </Link>
        </div>

        {/* Card 14: Customer Communication */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">14. Customer Communication</h4>
          <div className="flex flex-col gap-1 text-[11px] mb-2">
            <div className="flex justify-between"><span className="text-slate-400">Last Contact:</span><span className="text-slate-700">{details.customerCommunication.lastContact}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">By:</span><span className="font-semibold text-slate-800">{details.customerCommunication.by}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Channel:</span><span className="font-semibold text-blue-600">{details.customerCommunication.channel}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Status:</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">{details.customerCommunication.status}</span></div>
            <div className="mt-1 text-[10px] text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100 italic">
              {details.customerCommunication.summary}
            </div>
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View Communication History
          </Link>
        </div>

        {/* Card 15: Customer Input */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">15. Customer Input</h4>
          <div className="bg-slate-50 p-2 rounded border border-slate-200 text-[11px] text-slate-900 italic font-medium mb-2">
            {details.customerInput.messageText}
          </div>
          <div className="flex flex-col gap-1 text-[11px] mb-2">
            <div className="flex justify-between"><span className="text-slate-400">Sentiment:</span><span className="font-semibold text-slate-800">{details.customerInput.sentiment}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Attachments:</span><span className="font-mono text-slate-800 font-bold">{details.customerInput.attachmentsCount}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Preferred Resolution:</span><span className="font-semibold text-slate-800">{details.customerInput.preferredResolution}</span></div>
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View All Messages
          </Link>
        </div>

        {/* Card 16: SLA Overview */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">16. SLA Overview</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-2">
            <div className="flex justify-between"><span className="text-slate-400">Stage SLA (Dispatch):</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">{details.slaOverview.dispatch}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Stage SLA (Transit):</span><span className="font-bold text-rose-700 bg-rose-50 px-1 rounded">{details.slaOverview.transit}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Stage SLA (Delivery):</span><span className="font-medium text-slate-500 bg-slate-50 px-1 rounded">{details.slaOverview.delivery}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Overall SLA:</span><span className="font-bold text-rose-700 bg-rose-50 px-1 rounded">{details.slaOverview.overall}</span></div>
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View SLA Breakdown
          </Link>
        </div>

        {/* Card 17: Exception History */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">17. Exception History</h4>
          <div className="flex flex-col gap-1 text-[10px] mb-2">
            {details.exceptionHistory.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                <span className="text-slate-500 font-mono">{item.dateTime}</span>
                <span className="text-slate-800 font-medium truncate max-w-[100px]">{item.exception}</span>
                <span className="text-slate-500">{item.source}</span>
                <span className={`px-1 py-0.2 rounded font-bold ${
                  item.status === "Open" ? "text-red-700 bg-red-50" : "text-emerald-700 bg-emerald-50"
                }`}>{item.status}</span>
              </div>
            ))}
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View Full History
          </Link>
        </div>

        {/* Card 18: Repeat Issue Analysis */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">18. Repeat Issue Analysis</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-2">
            <div className="flex justify-between"><span className="text-slate-400">Repeat Issue (30d):</span><span className="font-bold text-red-600">{details.repeatIssueAnalysis.repeatIssue30d}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Frequency:</span><span className="font-bold text-slate-900">{details.repeatIssueAnalysis.frequency}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Last Occurrence:</span><span className="text-slate-700">{details.repeatIssueAnalysis.lastOccurrence}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Pattern:</span><span className="text-slate-800 font-medium">{details.repeatIssueAnalysis.pattern}</span></div>
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View Analysis
          </Link>
        </div>

        {/* Card 19: Customer Satisfaction */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">19. Customer Satisfaction</h4>
          <div className="flex flex-col gap-1.5 text-[11px] mb-2">
            <div className="flex justify-between"><span className="text-slate-400">Previous CSAT:</span><span className="font-bold text-amber-500">{details.customerSatisfaction.previousCsat}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">This Case CSAT:</span><span className="text-slate-400">{details.customerSatisfaction.thisCaseCsat}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">NPS Impact:</span><span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">{details.customerSatisfaction.npsImpact}</span></div>
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px]">
            View CSAT History
          </Link>
        </div>

        {/* Card 20: Notes & Internal Comments */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs h-auto self-start min-h-0">
          <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">20. Notes &amp; Internal Comments</h4>
          <div className="bg-slate-50 p-2 rounded border border-slate-200 text-[11px] text-slate-800 mb-3 font-medium">
            {details.notes.internalNote}
          </div>
          <button className="w-full py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-[11px] font-semibold transition-colors">
            Add Internal Note
          </button>
        </div>
      </div>
    </div>
  );
}
