"use client";

import React from "react";
import {
  Activity, AlertTriangle, ChevronRight, MoveRight, ArrowUpRight
} from "lucide-react";

export function FulfilmentIntelligenceSidebar() {
  const healthScore = 92;

  const alerts = [
    { title: "12 SLA breaches require action", severity: "critical" },
    { title: "18 allocation failures", severity: "critical" },
    { title: "24 orders on hold", severity: "high" },
    { title: "8 stock shortage alerts", severity: "high" },
    { title: "6 payment holds", severity: "medium" },
  ];

  const quickQueues = [
    { label: "Allocation Pending", count: 84, color: "text-amber-700 bg-amber-50" },
    { label: "Picking Exceptions", count: 12, color: "text-rose-700 bg-rose-50 font-bold" },
    { label: "Quality Reviews", count: 28, color: "text-purple-700 bg-purple-50" },
    { label: "Ready for Dispatch", count: 142, color: "text-emerald-700 bg-emerald-50" },
    { label: "Shipment Creation Blocked", count: 8, color: "text-rose-800 bg-rose-100 font-bold" },
  ];

  return (
    <div className="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-4 text-xs">
      {/* HEADER & CIRCULAR HEALTH GAUGE */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
            <Activity size={14} className="text-primary-900" />
            Fulfilment Intelligence
          </h3>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Excellent
          </span>
        </div>

        {/* GAUGE & METRICS */}
        <div className="flex items-center gap-4 py-1">
          <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-600"
                strokeDasharray={`${healthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold text-ink leading-none">{healthScore}</span>
              <span className="text-[9px] font-semibold text-muted mt-0.5">/ 100</span>
            </div>
          </div>

          <div className="flex-1 space-y-1 text-[11px]">
            <div className="font-bold text-ink text-xs">Overall Health Score</div>
            <div className="text-[10px] text-emerald-700 font-semibold">+6 pts vs last 30 days</div>
            <div className="text-[10px] text-muted leading-tight mt-1">
              Automated governance score based on allocation speed, picking, packing &amp; SLA compliance.
            </div>
          </div>
        </div>
      </div>

      {/* PRIORITY ALERTS */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle size={14} className="text-rose-600" />
            Priority Fulfilment Alerts (18)
          </h3>
          <button
            onClick={() => alert("Opening Priority Alerts...")}
            className="text-[10px] text-primary-900 hover:underline font-bold flex items-center gap-0.5"
          >
            View All Alerts (18) <ChevronRight size={10} />
          </button>
        </div>

        <div className="space-y-2">
          {alerts.map((alt, idx) => (
            <div
              key={idx}
              className="p-2 bg-canvas border-l-2 border-l-rose-600 border border-line rounded flex items-center justify-between gap-2"
            >
              <span className="font-medium text-ink text-[11px]">{alt.title}</span>
              <span className="text-[9px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded flex-shrink-0">
                ACTION
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* DOMAIN SUMMARY METRIC BOXES */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 bg-white border border-line rounded-xl shadow-sm space-y-1">
          <span className="text-[10px] font-semibold text-muted uppercase">Allocation Summary</span>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold text-ink">93.4%</span>
            <span className="text-[10px] text-muted">1,164 / 1,248</span>
          </div>
        </div>

        <div className="p-3 bg-white border border-line rounded-xl shadow-sm space-y-1">
          <span className="text-[10px] font-semibold text-muted uppercase">Picking Summary</span>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold text-ink">90.1%</span>
            <span className="text-[10px] text-muted">1,124 / 1,248</span>
          </div>
        </div>

        <div className="p-3 bg-white border border-line rounded-xl shadow-sm space-y-1">
          <span className="text-[10px] font-semibold text-muted uppercase">Packing Summary</span>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold text-ink">77.6%</span>
            <span className="text-[10px] text-muted">968 / 1,248</span>
          </div>
        </div>

        <div className="p-3 bg-white border border-line rounded-xl shadow-sm space-y-1">
          <span className="text-[10px] font-semibold text-muted uppercase">Warehouse Summary</span>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold text-ink">72%</span>
            <span className="text-[10px] text-muted">6 Warehouses</span>
          </div>
        </div>

        <div className="p-3 bg-white border border-line rounded-xl shadow-sm space-y-1">
          <span className="text-[10px] font-semibold text-muted uppercase">SLA Summary</span>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold text-emerald-700">90% On Track</span>
            <span className="text-[10px] text-muted">1,124 / 1,248</span>
          </div>
        </div>

        <div className="p-3 bg-white border border-line rounded-xl shadow-sm space-y-1">
          <span className="text-[10px] font-semibold text-muted uppercase">Exception Summary</span>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold text-rose-700">38 Open</span>
            <span className="text-[10px] text-rose-600">+3 vs yesterday</span>
          </div>
        </div>
      </div>

      {/* QUICK QUEUES */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3">
        <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
          <MoveRight size={14} className="text-primary-900" />
          Quick Queues
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {quickQueues.map((qq, i) => (
            <div
              key={i}
              onClick={() => alert(`Filtering Queue: ${qq.label}`)}
              className="p-2 bg-canvas border border-line rounded-lg flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors"
            >
              <span className="text-[11px] text-muted font-medium truncate">{qq.label}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded font-bold ${qq.color}`}>
                {qq.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL FULFILMENT ACTIONS */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-2">
        <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider mb-2">
          Final Fulfilment Actions
        </h3>

        <button
          onClick={() => alert("Opening Allocation Failure Queue...")}
          className="w-full px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg font-semibold text-rose-800 text-left flex items-center justify-between transition-colors"
        >
          <span>Review Allocation Failures</span>
          <ArrowUpRight size={14} className="text-rose-600" />
        </button>

        <button
          onClick={() => alert("Opening Exception Queue...")}
          className="w-full px-3 py-2 bg-canvas hover:bg-gray-100 border border-line rounded-lg font-semibold text-ink text-left flex items-center justify-between transition-colors"
        >
          <span>Open Exception Queue</span>
          <ArrowUpRight size={14} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Launching Fulfilment Performance Review...")}
          className="w-full px-3 py-2 bg-canvas hover:bg-gray-100 border border-line rounded-lg font-semibold text-ink text-left flex items-center justify-between transition-colors"
        >
          <span>Launch Fulfilment Review</span>
          <ArrowUpRight size={14} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Reviewing SLA Breached Fulfilment Orders...")}
          className="w-full px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg font-semibold text-amber-900 text-left flex items-center justify-between transition-colors"
        >
          <span>Review SLA Breaches</span>
          <ArrowUpRight size={14} className="text-amber-700" />
        </button>

        <button
          onClick={() => alert("Viewing Audit Trail...")}
          className="w-full px-3 py-2 bg-canvas hover:bg-gray-100 border border-line rounded-lg font-semibold text-ink text-left flex items-center justify-between transition-colors"
        >
          <span>View Audit Trail</span>
          <ArrowUpRight size={14} className="text-muted" />
        </button>
      </div>
    </div>
  );
}
