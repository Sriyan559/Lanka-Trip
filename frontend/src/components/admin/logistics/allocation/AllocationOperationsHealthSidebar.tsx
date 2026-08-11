"use client";

import React from "react";
import { Activity, AlertTriangle, ChevronRight, ArrowUpRight, MoveRight } from "lucide-react";

export function AllocationOperationsHealthSidebar() {
  const healthScore = 93;

  const alerts = [
    { label: "Critical Shortage Cases", count: 12, type: "critical" },
    { label: "Expiring Reservations (< 3 days)", count: 24, type: "critical" },
    { label: "Overdue Transfers", count: 8, type: "critical" },
    { label: "Allocation SLA Breaches", count: 6, type: "critical" },
    { label: "Reservation Failures", count: 8, type: "warning" },
    { label: "Batch / Expiry Violations", count: 4, type: "info" },
  ];

  const quickQueues = [
    { label: "Pending Reservations", count: 142, color: "text-blue-700 bg-blue-50 font-bold" },
    { label: "Allocation Failures", count: 18, color: "text-rose-700 bg-rose-50 font-bold" },
    { label: "Expiring Reservations", count: 24, color: "text-amber-700 bg-amber-50 font-bold" },
    { label: "Transfer Requests", count: 28, color: "text-purple-700 bg-purple-50 font-bold" },
  ];

  return (
    <div className="w-full xl:w-[230px] flex-shrink-0 flex flex-col gap-2 text-[9.5px]">
      {/* HEADER & CIRCULAR HEALTH GAUGE */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2.5 space-y-2">
        <div className="flex items-center justify-between border-b border-line pb-1.5">
          <h3 className="text-[9.5px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
            <Activity size={12} className="text-primary-900" />
            Allocation Operations Health
          </h3>
        </div>

        {/* GAUGE & METRICS */}
        <div className="flex items-center gap-2.5 py-0.5">
          <div className="relative w-14 h-14 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-gray-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-emerald-600" strokeDasharray={`${healthScore}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-extrabold text-ink leading-none">{healthScore}</span>
              <span className="text-[7.5px] font-semibold text-muted">/ 100</span>
            </div>
          </div>

          <div className="flex-1 space-y-0.5 text-[9.5px]">
            <div className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.1 rounded text-center inline-block text-[8.5px]">
              Excellent
            </div>
            <div className="text-[8px] text-emerald-700 font-semibold mt-0.5">+3 pts vs last 30 days</div>
          </div>
        </div>
      </div>

      {/* PRIORITY ALLOCATION ALERTS (6) */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2.5 space-y-1.5">
        <div className="flex items-center justify-between border-b border-line pb-1">
          <h3 className="text-[9.5px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle size={12} className="text-rose-600" />
            Priority Alerts (6)
          </h3>
          <button onClick={() => alert("Viewing All Alerts...")} className="text-[8.5px] text-primary-900 hover:underline font-bold flex items-center gap-0.5">
            View All <ChevronRight size={9} />
          </button>
        </div>

        <div className="space-y-1">
          {alerts.map((alt, idx) => (
            <div
              key={idx}
              className={`p-1 rounded flex items-center justify-between text-[8.5px] border ${
                alt.type === 'critical' ? 'bg-rose-50/60 border-rose-200 text-rose-900 font-semibold' : alt.type === 'warning' ? 'bg-amber-50/60 border-amber-200 text-amber-900 font-medium' : 'bg-canvas border-line text-ink'
              }`}
            >
              <span className="truncate max-w-[140px]">{alt.label}</span>
              <strong className={alt.type === 'critical' ? 'text-rose-700 font-bold' : 'text-amber-800 font-bold'}>{alt.count}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* DOMAIN SUMMARY BOXES */}
      <div className="space-y-1 text-[9px]">
        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="text-[8px] font-semibold text-muted uppercase">Allocation Summary</span>
          <div className="flex justify-between"><span>Total Requests:</span><strong className="text-ink">1,248</strong></div>
          <div className="flex justify-between"><span>Fully Allocated:</span><strong className="text-emerald-700 font-bold">1,078 (86.4%)</strong></div>
          <div className="flex justify-between"><span>Partial / Pending:</span><strong className="text-amber-700">126 (10.1%)</strong></div>
          <div className="flex justify-between"><span>Failed:</span><strong className="text-rose-700 font-bold">18 (1.4%)</strong></div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="text-[8px] font-semibold text-muted uppercase">Reservation Summary</span>
          <div className="flex justify-between"><span>Active Reservations:</span><strong className="text-ink font-bold">1,426</strong></div>
          <div className="flex justify-between"><span>Expiring Soon:</span><strong className="text-amber-700 font-bold">24</strong></div>
          <div className="flex justify-between"><span>Reservation Failures:</span><strong className="text-rose-700 font-bold">8</strong></div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="text-[8%] font-semibold text-muted uppercase">Shortage Summary</span>
          <div className="flex justify-between"><span>Active Shortage Cases:</span><strong className="text-amber-700 font-bold">36</strong></div>
          <div className="flex justify-between"><span>Critical Shortage:</span><strong className="text-rose-700 font-bold">12</strong></div>
          <div className="flex justify-between"><span>Products Affected:</span><strong className="text-ink">28</strong></div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="text-[8px] font-semibold text-muted uppercase">Transfer Summary</span>
          <div className="flex justify-between"><span>Transfers Required:</span><strong className="text-blue-700 font-bold">28</strong></div>
          <div className="flex justify-between"><span>In Transit:</span><strong className="text-indigo-700">12</strong></div>
          <div className="flex justify-between"><span>Overdue Transfers:</span><strong className="text-rose-700 font-bold">8</strong></div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="text-[8px] font-semibold text-muted uppercase">Warehouse Source Summary</span>
          <div className="flex justify-between"><span>Total Warehouses:</span><strong className="text-ink">12</strong></div>
          <div className="flex justify-between"><span>Healthy Sources:</span><strong className="text-emerald-700 font-bold">11</strong></div>
          <div className="flex justify-between"><span>Sources At Risk:</span><strong className="text-amber-700 font-bold">1</strong></div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="text-[8px] font-semibold text-muted uppercase">SLA Summary</span>
          <div className="flex justify-between"><span>Allocation SLA Compliance:</span><strong className="text-emerald-700 font-bold">99%</strong></div>
          <div className="flex justify-between"><span>Breached SLA:</span><strong className="text-rose-700 font-bold">6</strong></div>
          <div className="flex justify-between"><span>At Risk:</span><strong className="text-amber-700 font-bold">18</strong></div>
        </div>
      </div>

      {/* QUICK QUEUES */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1.5">
        <h3 className="text-[9px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
          <MoveRight size={11} className="text-primary-900" />
          Quick Queues
        </h3>

        <div className="grid grid-cols-2 gap-1">
          {quickQueues.map((qq, i) => (
            <div
              key={i}
              onClick={() => alert(`Filtering Queue: ${qq.label}`)}
              className="p-1 bg-canvas border border-line rounded-md flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors"
            >
              <span className="text-[8px] text-muted font-medium truncate">{qq.label}</span>
              <span className={`text-[8px] px-1 py-0.1 rounded ${qq.color}`}>
                {qq.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL ALLOCATION ACTIONS */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1">
        <h3 className="text-[9px] font-bold text-ink uppercase tracking-wider mb-0.5">
          Allocation Actions
        </h3>

        <button onClick={() => alert("Reviewing Allocation Failures...")} className="w-full px-2 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md font-semibold text-rose-800 text-left flex items-center justify-between transition-colors text-[9px]">
          <span>Review Allocation Failures</span>
          <ArrowUpRight size={10} className="text-rose-600" />
        </button>

        <button onClick={() => alert("Opening Allocation Queue...")} className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]">
          <span>Open Allocation Queue</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>

        <button onClick={() => alert("Reviewing Expiring Reservations...")} className="w-full px-2 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md font-semibold text-amber-900 text-left flex items-center justify-between transition-colors text-[9px]">
          <span>Review Expiring Reservations</span>
          <ArrowUpRight size={10} className="text-amber-700" />
        </button>

        <button onClick={() => alert("Launching Allocation Review...")} className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]">
          <span>Launch Allocation Review</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>

        <button onClick={() => alert("Opening Transfer Queue...")} className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]">
          <span>Open Transfer Queue</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>

        <button onClick={() => alert("Reviewing Shortages...")} className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]">
          <span>Review Shortages</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>

        <button onClick={() => alert("Viewing Audit Trail...")} className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]">
          <span>View Audit Trail</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>
      </div>
    </div>
  );
}
