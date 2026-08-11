"use client";

import React from "react";
import { ReverseLogisticsIntelligenceData } from "@/types/logistics/reverseLogistics";
import { AlertCircle, AlertTriangle, ArrowUpRight, ShieldAlert, Sparkles } from "lucide-react";

interface ReverseLogisticsRightRailProps {
  data: ReverseLogisticsIntelligenceData;
  onSelectAction?: (actionName: string) => void;
}

export function ReverseLogisticsRightRail({
  data,
  onSelectAction,
}: ReverseLogisticsRightRailProps) {
  return (
    <aside className="w-full xl:w-[310px] flex-shrink-0 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs space-y-3 font-sans">
      {/* Health Score Gauge Box */}
      <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-md p-2.5 flex items-start gap-2.5">
        <div className="relative flex items-center justify-center w-12 h-12 flex-shrink-0">
          <svg className="w-12 h-12 transform -rotate-90">
            <circle cx="24" cy="24" r="18" stroke="#e2e8f0" strokeWidth="3.5" fill="transparent" />
            <circle
              cx="24"
              cy="24"
              r="18"
              stroke="#10b981"
              strokeWidth="3.5"
              strokeDasharray={2 * Math.PI * 18}
              strokeDashoffset={2 * Math.PI * 18 * (1 - data.healthScore / 100)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <span className="absolute text-sm font-extrabold text-emerald-900">{data.healthScore}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h3 className="text-[11px] font-bold text-emerald-900 leading-tight">
              Reverse Logistics Health Score
            </h3>
            <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100/80 px-1 py-0.5 rounded flex-shrink-0">
              / 100
            </span>
          </div>
          <p className="text-[10px] text-gray-600 font-medium leading-tight mt-1">
            High collection efficiency and rapid disposition processing.
          </p>
          <span className="text-[9.5px] font-bold text-emerald-700 block mt-1">
            Trend: {data.healthTrend}
          </span>
        </div>
      </div>

      {/* Priority Reverse Logistics Alerts */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-tight flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            PRIORITY REVERSE LOGISTICS ALERTS ({data.alerts.length})
          </h4>
        </div>
        <div className="space-y-1">
          {data.alerts.map((alt) => (
            <div
              key={alt.id}
              className={`p-1.5 rounded border text-[11px] flex items-center justify-between font-medium ${
                alt.severity === "High"
                  ? "bg-rose-50/70 border-rose-100 text-rose-900"
                  : "bg-amber-50/70 border-amber-100 text-amber-900"
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                {alt.severity === "High" ? (
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                )}
                <span className="font-bold truncate">{alt.message}</span>
              </div>
              <span className="font-bold text-[11px] text-gray-900 pl-1 flex-shrink-0">
                {alt.count}
              </span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onSelectAction && onSelectAction("View All Alerts")}
          className="text-[10px] font-bold text-rose-700 hover:underline mt-0.5 w-full text-right block"
        >
          View All Alerts &rarr;
        </button>
      </div>

      {/* Returns Summary */}
      <div className="border-t border-gray-100 pt-2 space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px] tracking-tight">RETURNS SUMMARY</h4>
        <div className="grid grid-cols-2 gap-1 text-center bg-gray-50/80 p-2 rounded border border-gray-150">
          <div>
            <span className="text-gray-400 block text-[9.5px]">Total Cases</span>
            <span className="font-bold text-gray-900 text-xs">{data.returnsSummary.totalCases}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Open Cases</span>
            <span className="font-bold text-blue-700 text-xs">{data.returnsSummary.openCases}</span>
          </div>
        </div>
      </div>

      {/* Collection Summary */}
      <div className="border-t border-gray-100 pt-2 space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px] tracking-tight">COLLECTION SUMMARY</h4>
        <div className="grid grid-cols-3 gap-1 text-center bg-gray-50/80 p-2 rounded border border-gray-150">
          <div>
            <span className="text-gray-400 block text-[9.5px]">Scheduled</span>
            <span className="font-bold text-gray-900 text-xs">{data.collectionSummary.scheduled}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Overdue</span>
            <span className="font-bold text-rose-600 text-xs">{data.collectionSummary.overdue}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Failed</span>
            <span className="font-bold text-amber-700 text-xs">{data.collectionSummary.failed}</span>
          </div>
        </div>
      </div>

      {/* Receiving & Inspection Summary */}
      <div className="border-t border-gray-100 pt-2 text-[11px] space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px] tracking-tight mb-1">
          RECEIVING &amp; INSPECTION SUMMARY
        </h4>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500 font-medium">Awaiting Receipt:</span>
          <span className="font-bold text-gray-900">{data.receivingInspectionSummary.awaitingReceipt}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500 font-medium">Inspection Pending:</span>
          <span className="font-bold text-amber-700">{data.receivingInspectionSummary.inspectionPending}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500 font-medium">Inspection Passed:</span>
          <span className="font-bold text-emerald-700">{data.receivingInspectionSummary.passedPercentage}%</span>
        </div>
      </div>

      {/* Disposition Summary */}
      <div className="border-t border-gray-100 pt-2 space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px] tracking-tight">DISPOSITION SUMMARY</h4>
        <div className="grid grid-cols-3 gap-1 text-center bg-gray-50/80 p-2 rounded border border-gray-150">
          <div>
            <span className="text-gray-400 block text-[9.5px]">Restock</span>
            <span className="font-bold text-emerald-700 text-xs">{data.dispositionSummary.restockEligible}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Quarantine</span>
            <span className="font-bold text-amber-700 text-xs">{data.dispositionSummary.quarantine}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Supplier Return</span>
            <span className="font-bold text-purple-700 text-xs">{data.dispositionSummary.supplierReturn}</span>
          </div>
        </div>
      </div>

      {/* Refund Dependency Summary */}
      <div className="border-t border-gray-100 pt-2 space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px] tracking-tight">REFUND DEPENDENCY SUMMARY</h4>
        <div className="grid grid-cols-3 gap-1 text-center bg-gray-50/80 p-2 rounded border border-gray-150">
          <div>
            <span className="text-gray-400 block text-[9.5px]">Pending</span>
            <span className="font-bold text-amber-700 text-xs">{data.refundDependencySummary.pending}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Cleared</span>
            <span className="font-bold text-emerald-700 text-xs">{data.refundDependencySummary.cleared}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Blocked</span>
            <span className="font-bold text-rose-600 text-xs">{data.refundDependencySummary.blocked}</span>
          </div>
        </div>
      </div>

      {/* SLA Summary */}
      <div className="border-t border-gray-100 pt-2 space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px] tracking-tight">SLA SUMMARY</h4>
        <div className="grid grid-cols-3 gap-1 text-center bg-gray-50/80 p-2 rounded border border-gray-150">
          <div>
            <span className="text-gray-400 block text-[9.5px]">On Track</span>
            <span className="font-bold text-emerald-700 text-xs">{data.slaSummary.onTrack}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">At Risk</span>
            <span className="font-bold text-amber-700 text-xs">{data.slaSummary.atRisk}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Breached</span>
            <span className="font-bold text-rose-600 text-xs">{data.slaSummary.breached}</span>
          </div>
        </div>
      </div>

      {/* Quick Queues */}
      <div className="border-t border-gray-100 pt-2">
        <h4 className="font-bold text-gray-900 uppercase text-[10px] tracking-tight mb-1.5">QUICK QUEUES</h4>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-rose-50/70 border border-rose-100 p-2 rounded flex flex-col items-center justify-center">
            <span className="text-rose-900 font-bold text-[10.5px]">Collection Queue</span>
            <span className="text-base font-extrabold text-rose-900 leading-tight mt-0.5">{data.quickQueues.collectionQueue}</span>
          </div>
          <div className="bg-blue-50/70 border border-blue-100 p-2 rounded flex flex-col items-center justify-center">
            <span className="text-blue-900 font-bold text-[10.5px]">Inspection Queue</span>
            <span className="text-base font-extrabold text-blue-900 leading-tight mt-0.5">{data.quickQueues.inspectionQueue}</span>
          </div>
          <div className="bg-purple-50/70 border border-purple-100 p-2 rounded flex flex-col items-center justify-center">
            <span className="text-purple-900 font-bold text-[10.5px]">Disposition Queue</span>
            <span className="text-base font-extrabold text-purple-900 leading-tight mt-0.5">{data.quickQueues.dispositionQueue}</span>
          </div>
          <div className="bg-amber-50/70 border border-amber-100 p-2 rounded flex flex-col items-center justify-center">
            <span className="text-amber-900 font-bold text-[10.5px]">Exception Queue</span>
            <span className="text-base font-extrabold text-amber-900 leading-tight mt-0.5">{data.quickQueues.exceptionQueue}</span>
          </div>
        </div>
      </div>

      {/* Final Reverse Logistics Actions */}
      <div className="border-t border-gray-100 pt-2 space-y-1.5">
        <h4 className="font-bold text-gray-900 uppercase text-[10px] tracking-tight">
          FINAL REVERSE LOGISTICS ACTIONS
        </h4>
        {[
          "Review Return Exceptions",
          "Open Collection Queue",
          "Review Inspection Holds",
          "Open Reconciliation Queue",
          "View Audit Trail",
        ].map((act) => (
          <button
            key={act}
            type="button"
            onClick={() => onSelectAction && onSelectAction(act)}
            className="w-full text-left px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded text-[11px] font-semibold text-gray-800 flex items-center justify-between transition-colors shadow-2xs"
          >
            <span>{act}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
          </button>
        ))}
      </div>
    </aside>
  );
}
