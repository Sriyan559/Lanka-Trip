"use client";

import React from "react";
import {
  Activity,
  ChevronRight,
  AlertCircle,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Search,
  Truck,
  DollarSign,
  FileText,
} from "lucide-react";
import { ReturnsRefundOperationsRailData } from "./types";

interface ReturnsRefundOperationsRailProps {
  data: ReturnsRefundOperationsRailData;
}

export function ReturnsRefundOperationsRail({ data }: ReturnsRefundOperationsRailProps) {
  return (
    <div className="flex flex-col gap-3 w-full h-auto self-start">
      {/* 0. Returns & Refund Support Health */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-100">
          <Activity size={14} className="text-emerald-600" />
          <h4 className="text-xs font-bold text-slate-900">Returns &amp; Refund Support Health</h4>
        </div>

        <div className="flex items-center gap-4">
          {/* Gauge */}
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-emerald-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-600"
                strokeDasharray={`${data.healthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-extrabold text-slate-900 leading-none">{data.healthScore}</span>
              <span className="text-[9px] text-slate-400 font-semibold">/100</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 flex flex-col gap-0.5 text-[10px]">
            {data.scoreLegend.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className={`font-semibold ${item.color}`}>• {item.label}</span>
                <span className="text-slate-500 font-mono text-[9px]">{item.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1. Case Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Case Summary</h4>
        <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Open</span><span className="font-bold text-slate-900 text-xs">{data.caseSummary.open}</span></div>
          <div><span className="text-slate-400 block font-medium">Critical</span><span className="font-bold text-red-600 text-xs">{data.caseSummary.critical}</span></div>
          <div><span className="text-slate-400 block font-medium">At Risk</span><span className="font-bold text-amber-700 text-xs">{data.caseSummary.atRisk}</span></div>
          <div><span className="text-slate-400 block font-medium">Escalated</span><span className="font-bold text-red-600 text-xs">{data.caseSummary.escalated}</span></div>
          <div><span className="text-slate-400 block font-medium">Reopened</span><span className="font-bold text-purple-700 text-xs">{data.caseSummary.reopened}</span></div>
        </div>
      </div>

      {/* 2. Return Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Return Summary</h4>
        <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Pending</span><span className="font-bold text-amber-700 text-xs">{data.returnSummary.pending}</span></div>
          <div><span className="text-slate-400 block font-medium">Pickup Delay</span><span className="font-bold text-red-600 text-xs">{data.returnSummary.pickupDelayed}</span></div>
          <div><span className="text-slate-400 block font-medium">Inspection</span><span className="font-bold text-purple-700 text-xs">{data.returnSummary.inspectionPending}</span></div>
          <div><span className="text-slate-400 block font-medium">Rejected</span><span className="font-bold text-slate-600 text-xs">{data.returnSummary.rejected}</span></div>
        </div>
      </div>

      {/* 3. Refund Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Refund Summary</h4>
        <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Pending</span><span className="font-bold text-blue-700 text-xs">{data.refundSummary.pending}</span></div>
          <div><span className="text-slate-400 block font-medium">Approved</span><span className="font-bold text-emerald-700 text-xs">{data.refundSummary.approved}</span></div>
          <div><span className="text-slate-400 block font-medium">Failed</span><span className="font-bold text-red-600 text-xs">{data.refundSummary.failed}</span></div>
          <div><span className="text-slate-400 block font-medium">Rejected</span><span className="font-bold text-slate-600 text-xs">{data.refundSummary.rejected}</span></div>
          <div><span className="text-slate-400 block font-medium">Partial</span><span className="font-bold text-amber-700 text-xs">{data.refundSummary.partial}</span></div>
        </div>
      </div>

      {/* 4. Dispute Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Dispute Summary</h4>
        <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Active</span><span className="font-bold text-red-600 text-xs">{data.disputeSummary.active}</span></div>
          <div><span className="text-slate-400 block font-medium">High Severity</span><span className="font-bold text-red-700 text-xs">{data.disputeSummary.highSeverity}</span></div>
          <div><span className="text-slate-400 block font-medium">Refund Amt</span><span className="font-bold text-amber-700 text-xs">{data.disputeSummary.refundAmountCount}</span></div>
          <div><span className="text-slate-400 block font-medium">Awaiting Dec</span><span className="font-bold text-purple-700 text-xs">{data.disputeSummary.awaitingDecision}</span></div>
        </div>
      </div>

      {/* 5. Dependency Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Dependency Summary</h4>
        <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Logistics</span><span className="font-bold text-slate-900 text-xs">{data.dependencySummary.waitingLogistics}</span></div>
          <div><span className="text-slate-400 block font-medium">Finance</span><span className="font-bold text-amber-700 text-xs">{data.dependencySummary.waitingFinance}</span></div>
          <div><span className="text-slate-400 block font-medium">Supplier</span><span className="font-bold text-slate-700 text-xs">{data.dependencySummary.waitingSupplier}</span></div>
          <div><span className="text-slate-400 block font-medium">Customer</span><span className="font-bold text-slate-700 text-xs">{data.dependencySummary.waitingCustomer}</span></div>
        </div>
      </div>

      {/* 6. Quick Queues */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Quick Queues</h4>
        <div className="flex flex-col gap-1 text-[11px]">
          {data.quickQueues.map((q, idx) => (
            <div key={idx} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0">
              <span className="text-slate-700 font-medium">{q.label}</span>
              <span className={`font-bold font-mono px-1.5 py-0.2 rounded text-[10px] ${
                q.variant === "danger"
                  ? "bg-red-100 text-red-800"
                  : q.variant === "warning"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-blue-100 text-blue-800"
              }`}>{q.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Final Actions */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Final Actions</h4>
        <div className="flex flex-col gap-1.5">
          {[
            { label: "Review Critical Return Cases", icon: AlertCircle },
            { label: "Review Pickup Delays", icon: Truck },
            { label: "Review Inspection Delays", icon: Search },
            { label: "Review Refund Exceptions", icon: AlertTriangle },
            { label: "Review Customer Disputes", icon: ShieldAlert },
            { label: "Review SLA Risk", icon: Clock },
            { label: "Contact Finance", icon: DollarSign },
            { label: "Contact Logistics", icon: Truck },
            { label: "Open Return Support Audit", icon: FileText },
          ].map((act, idx) => {
            const IconComp = act.icon;
            return (
              <button
                key={idx}
                className="w-full py-1.5 px-2.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-semibold flex items-center justify-between transition-colors shadow-2xs text-left"
              >
                <div className="flex items-center gap-1.5">
                  <IconComp size={13} />
                  <span className="truncate">{act.label}</span>
                </div>
                <ChevronRight size={13} className="text-red-200 shrink-0 ml-1" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
