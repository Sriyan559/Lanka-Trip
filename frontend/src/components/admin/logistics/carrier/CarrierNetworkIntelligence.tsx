"use client";

import React from "react";
import { CarrierNetworkIntelligenceData } from "@/types/logistics/carrier";
import { AlertCircle, AlertTriangle, ArrowUpRight, ShieldAlert, Sparkles } from "lucide-react";

interface CarrierNetworkIntelligenceProps {
  data: CarrierNetworkIntelligenceData;
  onSelectAction?: (actionName: string) => void;
}

export function CarrierNetworkIntelligence({
  data,
  onSelectAction,
}: CarrierNetworkIntelligenceProps) {
  return (
    <aside className="w-full xl:w-[320px] flex-shrink-0 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs space-y-3">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose-700" />
          Carrier Network Intelligence
        </h3>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {/* A. Overall Health Score */}
      <div className="bg-emerald-50/60 border border-emerald-200 rounded-md p-2.5 flex items-center gap-3">
        <div className="relative flex items-center justify-center w-12 h-12 flex-shrink-0">
          <svg className="w-12 h-12 transform -rotate-90">
            <circle cx="24" cy="24" r="18" stroke="#e2e8f0" strokeWidth="4" fill="transparent" />
            <circle
              cx="24"
              cy="24"
              r="18"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 18}
              strokeDashoffset={2 * Math.PI * 18 * (1 - data.healthScore / 100)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <span className="absolute text-xs font-black text-emerald-900">{data.healthScore}</span>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-emerald-900">{data.healthLabel}</span>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-1 py-0.2 rounded">
              / 100
            </span>
          </div>
          <p className="text-[10px] text-emerald-800 font-normal leading-tight mt-0.5">
            {data.healthDescription}
          </p>
          <span className="text-[9.5px] font-bold text-emerald-700 block mt-0.5">
            Trend: {data.healthTrend}
          </span>
        </div>
      </div>

      {/* B. Priority Carrier Alerts */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-tight flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-amber-600" />
            Priority Carrier Alerts ({data.alerts.length})
          </h4>
        </div>
        <div className="space-y-1">
          {data.alerts.map((alt) => (
            <div
              key={alt.id}
              className={`p-1.5 rounded border text-[10.5px] flex items-center justify-between ${
                alt.severity === "High"
                  ? "bg-rose-50 border-rose-200 text-rose-800"
                  : alt.severity === "Medium"
                  ? "bg-amber-50 border-amber-200 text-amber-800"
                  : "bg-blue-50 border-blue-200 text-blue-800"
              }`}
            >
              <div className="flex items-center gap-1.5">
                {alt.severity === "High" ? (
                  <AlertCircle className="w-3 h-3 text-rose-600 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-3 h-3 text-amber-600 flex-shrink-0" />
                )}
                <span className="font-semibold">{alt.message}</span>
              </div>
              <span className="font-bold text-[10px] px-1 rounded bg-white/70">
                {alt.count}
              </span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onSelectAction && onSelectAction("View All Alerts")}
          className="text-[10px] font-bold text-rose-700 hover:underline mt-1 w-full text-right block"
        >
          View All Alerts &rarr;
        </button>
      </div>

      {/* C. Carrier Summary */}
      <div className="border-t border-gray-100 pt-2 text-[11px] space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px]">Carrier Summary</h4>
        <div className="grid grid-cols-4 gap-1 text-center bg-gray-50 p-1.5 rounded border border-gray-200">
          <div>
            <span className="text-gray-400 block text-[9.5px]">Total</span>
            <span className="font-bold text-gray-900">{data.carrierSummary.totalCarriers}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Active</span>
            <span className="font-bold text-emerald-700">{data.carrierSummary.active}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Limited</span>
            <span className="font-bold text-amber-700">{data.carrierSummary.limited}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Suspended</span>
            <span className="font-bold text-rose-700">{data.carrierSummary.suspended}</span>
          </div>
        </div>
      </div>

      {/* D. Capacity Summary */}
      <div className="border-t border-gray-100 pt-2 text-[11px] space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px]">Capacity Summary</h4>
        <div className="flex justify-between text-gray-600">
          <span>Network Utilization:</span>
          <span className="font-bold text-blue-700">{data.capacitySummary.utilizationPercentage}%</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Total Capacity:</span>
          <span className="font-mono text-gray-900">{data.capacitySummary.totalCapacity}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Used Capacity:</span>
          <span className="font-mono text-blue-700">{data.capacitySummary.usedCapacity}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Remaining Capacity:</span>
          <span className="font-mono text-emerald-700">{data.capacitySummary.remainingCapacity}</span>
        </div>
      </div>

      {/* E. Shipment Summary */}
      <div className="border-t border-gray-100 pt-2 text-[11px] space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px]">Shipment Summary (30 Days)</h4>
        <div className="grid grid-cols-4 gap-1 text-center bg-gray-50 p-1.5 rounded border border-gray-200">
          <div>
            <span className="text-gray-400 block text-[9.5px]">Assigned</span>
            <span className="font-bold text-gray-900">{data.shipmentSummary.assigned}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Delivered</span>
            <span className="font-bold text-emerald-700">{data.shipmentSummary.delivered}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">In Transit</span>
            <span className="font-bold text-blue-700">{data.shipmentSummary.inTransit}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Failed</span>
            <span className="font-bold text-rose-700">{data.shipmentSummary.failed}</span>
          </div>
        </div>
      </div>

      {/* F. Performance Summary */}
      <div className="border-t border-gray-100 pt-2 text-[11px] space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px]">Performance Summary</h4>
        <div className="flex justify-between">
          <span className="text-gray-500">On-Time Pickup:</span>
          <span className="font-bold text-emerald-700">{data.performanceSummary.onTimePickupPercentage}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">On-Time Delivery:</span>
          <span className="font-bold text-emerald-700">{data.performanceSummary.onTimeDeliveryPercentage}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">First Attempt:</span>
          <span className="font-bold text-emerald-700">{data.performanceSummary.firstAttemptPercentage}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tracking Complete:</span>
          <span className="font-bold text-emerald-700">{data.performanceSummary.trackingCompletePercentage}%</span>
        </div>
      </div>

      {/* G. Claims / COD Summary */}
      <div className="border-t border-gray-100 pt-2 text-[11px] space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px]">Claims / COD Summary</h4>
        <div className="flex justify-between">
          <span className="text-gray-500">Claims Open:</span>
          <span className="font-bold text-rose-700">{data.claimsCodSummary.claimsOpen}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">COD Exceptions:</span>
          <span className="font-bold text-amber-700">{data.claimsCodSummary.codExceptions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Reconciliation:</span>
          <span className="font-bold text-blue-700">{data.claimsCodSummary.reconciliation}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Claims Rate:</span>
          <span className="font-bold text-gray-900">{data.claimsCodSummary.claimsRatePercentage}%</span>
        </div>
      </div>

      {/* H. Compliance Summary */}
      <div className="border-t border-gray-100 pt-2 text-[11px] space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px]">Compliance Summary</h4>
        <div className="flex justify-between">
          <span className="text-gray-500">Compliance Ready:</span>
          <span className="font-bold text-emerald-700">{data.complianceSummary.complianceReadyPercentage}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Insurance Active:</span>
          <span className="font-bold text-gray-900">{data.complianceSummary.insuranceActiveRatio}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Contract Active:</span>
          <span className="font-bold text-gray-900">{data.complianceSummary.contractActiveCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Audit Complete:</span>
          <span className="font-bold text-emerald-700">{data.complianceSummary.auditCompletePercentage}%</span>
        </div>
      </div>

      {/* I. Quick Queues */}
      <div className="border-t border-gray-100 pt-2">
        <h4 className="font-bold text-gray-900 uppercase text-[10px] mb-1.5">Quick Queues</h4>
        <div className="grid grid-cols-2 gap-1.5 text-center">
          <div className="bg-rose-50 border border-rose-200 p-1.5 rounded text-[10.5px]">
            <span className="text-rose-800 font-bold block">Pickup Queue</span>
            <span className="text-sm font-black text-rose-900">{data.quickQueues.pickupQueue}</span>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-1.5 rounded text-[10.5px]">
            <span className="text-blue-800 font-bold block">Dispatch Queue</span>
            <span className="text-sm font-black text-blue-900">{data.quickQueues.dispatchQueue}</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-1.5 rounded text-[10.5px]">
            <span className="text-amber-800 font-bold block">Exceptions</span>
            <span className="text-sm font-black text-amber-900">{data.quickQueues.exceptionQueue}</span>
          </div>
          <div className="bg-purple-50 border border-purple-200 p-1.5 rounded text-[10.5px]">
            <span className="text-purple-800 font-bold block">Carrier Review</span>
            <span className="text-sm font-black text-purple-900">{data.quickQueues.carrierReview}</span>
          </div>
        </div>
      </div>

      {/* J. Final Carrier Actions Buttons */}
      <div className="border-t border-gray-100 pt-2 space-y-1.5">
        <h4 className="font-bold text-gray-900 uppercase text-[10px]">Final Carrier Actions</h4>
        {[
          "Review Carrier Exceptions",
          "Open Carrier Queue",
          "Review SLA Breaches",
          "Review Claims",
          "Review COD Exceptions",
          "View Audit Trail",
        ].map((act) => (
          <button
            key={act}
            type="button"
            onClick={() => onSelectAction && onSelectAction(act)}
            className="w-full text-left px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded text-[10.5px] font-semibold text-gray-800 flex items-center justify-between transition-colors"
          >
            <span>{act}</span>
            <ArrowUpRight className="w-3 h-3 text-gray-400" />
          </button>
        ))}
      </div>
    </aside>
  );
}
