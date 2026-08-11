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
    <div className="w-full xl:w-[230px] flex-shrink-0 flex flex-col gap-2 text-[9.5px]">
      {/* HEADER & CIRCULAR HEALTH GAUGE */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2.5 space-y-2">
        <div className="flex items-center justify-between border-b border-line pb-1.5">
          <h3 className="text-[9.5px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
            <Activity size={12} className="text-primary-900" />
            Fulfilment Intelligence
          </h3>
          <span className="text-[8.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.1 rounded border border-emerald-200">
            Excellent
          </span>
        </div>

        {/* GAUGE & METRICS */}
        <div className="flex items-center gap-2.5 py-0.5">
          <div className="relative w-14 h-14 flex-shrink-0 flex items-center justify-center">
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
              <span className="text-sm font-extrabold text-ink leading-none">{healthScore}</span>
              <span className="text-[7.5px] font-semibold text-muted">/ 100</span>
            </div>
          </div>

          <div className="flex-1 space-y-0.5 text-[9.5px]">
            <div className="font-bold text-ink text-[10px]">Health Score</div>
            <div className="text-[8px] text-emerald-700 font-semibold">+6 pts vs last 30d</div>
          </div>
        </div>
      </div>

      {/* PRIORITY ALERTS */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2.5 space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[9.5px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle size={12} className="text-rose-600" />
            Priority Alerts (18)
          </h3>
        </div>

        <div className="space-y-1">
          {alerts.map((alt, idx) => (
            <div
              key={idx}
              className="p-1 bg-canvas border-l-2 border-l-rose-600 border border-line rounded flex items-center justify-between gap-1 text-[8.5px]"
            >
              <span className="font-medium text-ink truncate">{alt.title}</span>
              <span className="text-[7.5px] font-bold text-rose-700 bg-rose-50 px-1 py-0.1 rounded flex-shrink-0">
                ACTION
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* DOMAIN SUMMARY METRIC BOXES */}
      <div className="grid grid-cols-2 gap-1.5 text-[8.5px]">
        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">Allocation Summary</span>
          <div className="font-bold text-ink text-[9.5px]">93.4%</div>
          <div className="text-muted text-[7.5px]">1,164 / 1,248</div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">Picking Summary</span>
          <div className="font-bold text-ink text-[9.5px]">90.1%</div>
          <div className="text-muted text-[7.5px]">1,124 / 1,248</div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">Packing Summary</span>
          <div className="font-bold text-ink text-[9.5px]">77.6%</div>
          <div className="text-muted text-[7.5px]">968 / 1,248</div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">Warehouse Summary</span>
          <div className="font-bold text-ink text-[9.5px]">72%</div>
          <div className="text-muted text-[7.5px]">6 Warehouses</div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">SLA Summary</span>
          <div className="font-bold text-emerald-700 text-[9.5px]">90% On Track</div>
          <div className="text-muted text-[7.5px]">1,124 / 1,248</div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">Exception Summary</span>
          <div className="font-bold text-rose-700 text-[9.5px]">38 Open</div>
          <div className="text-rose-600 text-[7.5px]">+3 vs yesterday</div>
        </div>
      </div>

      {/* QUICK QUEUES */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2.5 space-y-1.5">
        <h3 className="text-[9.5px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
          <MoveRight size={12} className="text-primary-900" />
          Quick Queues
        </h3>

        <div className="space-y-1">
          {quickQueues.map((qq, i) => (
            <div
              key={i}
              onClick={() => alert(`Filtering Queue: ${qq.label}`)}
              className="p-1 bg-canvas border border-line rounded flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors text-[8.5px]"
            >
              <span className="text-muted font-medium truncate">{qq.label}</span>
              <span className={`px-1 py-0.1 rounded font-bold ${qq.color}`}>
                {qq.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL FULFILMENT ACTIONS */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1">
        <h3 className="text-[9px] font-bold text-ink uppercase tracking-wider mb-0.5">
          Fulfilment Actions
        </h3>

        <button
          onClick={() => alert("Opening Allocation Failure Queue...")}
          className="w-full px-2 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md font-semibold text-rose-800 text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Review Allocation Failures</span>
          <ArrowUpRight size={10} className="text-rose-600" />
        </button>

        <button
          onClick={() => alert("Opening Exception Queue...")}
          className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Open Exception Queue</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Launching Fulfilment Performance Review...")}
          className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Launch Fulfilment Review</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Reviewing SLA Breached Fulfilment Orders...")}
          className="w-full px-2 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md font-semibold text-amber-900 text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Review SLA Breaches</span>
          <ArrowUpRight size={10} className="text-amber-700" />
        </button>

        <button
          onClick={() => alert("Viewing Audit Trail...")}
          className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>View Audit Trail</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>
      </div>
    </div>
  );
}
