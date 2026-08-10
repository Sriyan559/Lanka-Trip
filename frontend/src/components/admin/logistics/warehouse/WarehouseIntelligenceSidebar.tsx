"use client";

import React from "react";
import { Activity, AlertTriangle, ChevronRight, ArrowUpRight, MoveRight } from "lucide-react";

export function WarehouseIntelligenceSidebar() {
  const healthScore = 91;

  const alerts = [
    { ref: "WH-KDU-01", name: "Kadawatha Hub", msg: "Critical capacity utilization 92%", type: "critical" },
    { ref: "WH-JFN-01", name: "Jaffna Warehouse", msg: "High utilization 81%", type: "warning" },
    { ref: "WH-BTH-01", name: "Batticaloa WH", msg: "Maintenance due in 3 days", type: "info" },
  ];

  const quickQueues = [
    { label: "Pick Queue", count: 126, color: "text-purple-700 bg-purple-50 font-bold" },
    { label: "Pack Queue", count: 96, color: "text-sky-700 bg-sky-50 font-bold" },
    { label: "Dispatch Queue", count: 142, color: "text-indigo-700 bg-indigo-50 font-bold" },
    { label: "Transfer Queue", count: 38, color: "text-amber-700 bg-amber-50" },
    { label: "Return Queue", count: 23, color: "text-rose-700 bg-rose-50" },
    { label: "Carrier Pickup", count: 27, color: "text-emerald-700 bg-emerald-50" },
  ];

  return (
    <div className="w-full xl:w-[270px] flex-shrink-0 flex flex-col gap-2.5 text-[10px]">
      {/* HEADER & CIRCULAR NETWORK HEALTH GAUGE */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-3 space-y-2.5">
        <div className="flex items-center justify-between border-b border-line pb-2">
          <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
            <Activity size={13} className="text-primary-900" />
            Network Intelligence
          </h3>
        </div>

        {/* GAUGE & METRICS */}
        <div className="flex items-center gap-3 py-0.5">
          <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-gray-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-emerald-600" strokeDasharray={`${healthScore}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-base font-extrabold text-ink leading-none">{healthScore}</span>
              <span className="text-[8px] font-semibold text-muted">/ 100</span>
            </div>
          </div>

          <div className="flex-1 space-y-0.5 text-[10px]">
            <div className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded text-center inline-block">
              Healthy
            </div>
            <div className="text-[9px] text-muted leading-tight">
              Optimal operating conditions across 85% of nodes.
            </div>
            <div className="text-[8.5px] text-emerald-700 font-semibold">+3 pts vs last 7 days</div>
          </div>
        </div>
      </div>

      {/* PRIORITY FACILITY ALERTS */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-3 space-y-2">
        <div className="flex items-center justify-between border-b border-line pb-1.5">
          <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle size={13} className="text-rose-600" />
            Priority Alerts (3)
          </h3>
          <button onClick={() => alert("Viewing All Alerts...")} className="text-[9px] text-primary-900 hover:underline font-bold flex items-center gap-0.5">
            View All <ChevronRight size={10} />
          </button>
        </div>

        <div className="space-y-1.5">
          {alerts.map((alt, idx) => (
            <div
              key={idx}
              className={`p-1.5 border-l-2 border border-line rounded flex flex-col gap-0.5 text-[9.5px] ${
                alt.type === 'critical' ? 'bg-rose-50/60 border-l-rose-600 border-rose-200' : alt.type === 'warning' ? 'bg-amber-50/60 border-l-amber-500 border-amber-200' : 'bg-canvas border-l-blue-500'
              }`}
            >
              <div className="flex justify-between font-bold text-ink">
                <span className="font-mono text-primary-900">{alt.ref}</span>
                <span className="text-muted font-normal text-[9px]">{alt.name}</span>
              </div>
              <div className={`text-[9px] ${alt.type === 'critical' ? 'text-rose-800 font-bold' : 'text-amber-800 font-medium'}`}>
                {alt.msg}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DOMAIN SUMMARY METRIC BOXES */}
      <div className="space-y-1.5 text-[9.5px]">
        <div className="p-2 bg-white border border-line rounded-lg shadow-sm space-y-0.5">
          <span className="text-[8.5px] font-semibold text-muted uppercase">Facility Summary</span>
          <div className="flex items-baseline justify-between font-bold text-ink">
            <span>24 Total Facilities</span>
            <span className="text-[8.5px] text-muted font-normal">18 WHs | 6 FCs</span>
          </div>
        </div>

        <div className="p-2 bg-white border border-line rounded-lg shadow-sm space-y-0.5">
          <span className="text-[8.5px] font-semibold text-muted uppercase">Capacity Summary</span>
          <div className="flex items-baseline justify-between">
            <span className="font-bold text-amber-700">76% Utilization</span>
            <span className="text-[8.5px] text-muted">5.79M / 1.82M cbft</span>
          </div>
        </div>

        <div className="p-2 bg-white border border-line rounded-lg shadow-sm space-y-0.5">
          <span className="text-[8.5px] font-semibold text-muted uppercase">Workload Summary</span>
          <div className="flex items-baseline justify-between">
            <strong className="text-blue-700">1,248 Assigned</strong>
            <span className="text-[8.5px] text-muted">126 Pick | 96 Pack</span>
          </div>
        </div>

        <div className="p-2 bg-white border border-line rounded-lg shadow-sm space-y-0.5">
          <span className="text-[8.5px] font-semibold text-muted uppercase">Inventory Summary</span>
          <div className="flex items-baseline justify-between">
            <strong className="text-ink">1.62M Units On Hand</strong>
            <span className="text-[8.5px] text-emerald-700 font-bold">98.1% Acc</span>
          </div>
        </div>

        <div className="p-2 bg-white border border-line rounded-lg shadow-sm space-y-0.5">
          <span className="text-[8.5px] font-semibold text-muted uppercase">Transfers &amp; Returns</span>
          <div className="flex justify-between">
            <span>38 Transfers <strong className="text-amber-700">(6 Pend)</strong></span>
            <span>23 Returns <strong className="text-rose-700">(14 Pend)</strong></span>
          </div>
        </div>

        <div className="p-2 bg-white border border-line rounded-lg shadow-sm space-y-0.5">
          <span className="text-[8.5px] font-semibold text-muted uppercase">SLA Summary</span>
          <div className="flex justify-between">
            <strong className="text-emerald-700">94% Overall SLA</strong>
            <span className="text-[8.5px] text-muted">Pick 95% | Pack 93%</span>
          </div>
        </div>
      </div>

      {/* QUICK QUEUES */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-2.5 space-y-2">
        <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
          <MoveRight size={13} className="text-primary-900" />
          Quick Queues
        </h3>

        <div className="grid grid-cols-2 gap-1.5">
          {quickQueues.map((qq, i) => (
            <div
              key={i}
              onClick={() => alert(`Filtering Queue: ${qq.label}`)}
              className="p-1.5 bg-canvas border border-line rounded-md flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors"
            >
              <span className="text-[9px] text-muted font-medium truncate">{qq.label}</span>
              <span className={`text-[9px] px-1 py-0.2 rounded ${qq.color}`}>
                {qq.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* WAREHOUSE ACTIONS */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-2.5 space-y-1.5">
        <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider mb-1">
          Warehouse Actions
        </h3>

        <button onClick={() => alert("Reviewing Capacity Exceptions...")} className="w-full px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md font-semibold text-rose-800 text-left flex items-center justify-between transition-colors text-[9.5px]">
          <span>Review Capacity Exceptions</span>
          <ArrowUpRight size={12} className="text-rose-600" />
        </button>

        <button onClick={() => alert("Opening Facility Queue...")} className="w-full px-2.5 py-1.5 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9.5px]">
          <span>Open Facility Queue</span>
          <ArrowUpRight size={12} className="text-muted" />
        </button>

        <button onClick={() => alert("Reviewing Maintenance...")} className="w-full px-2.5 py-1.5 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9.5px]">
          <span>Review Maintenance</span>
          <ArrowUpRight size={12} className="text-muted" />
        </button>

        <button onClick={() => alert("Reviewing Operational Holds...")} className="w-full px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md font-semibold text-amber-900 text-left flex items-center justify-between transition-colors text-[9.5px]">
          <span>Review Operational Holds</span>
          <ArrowUpRight size={12} className="text-amber-700" />
        </button>

        <button onClick={() => alert("Routing Orders...")} className="w-full px-2.5 py-1.5 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9.5px]">
          <span>Route Orders</span>
          <ArrowUpRight size={12} className="text-muted" />
        </button>

        <button onClick={() => alert("Rebalancing Network Capacity...")} className="w-full px-2.5 py-1.5 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9.5px]">
          <span>Rebalance Capacity</span>
          <ArrowUpRight size={12} className="text-muted" />
        </button>

        <button onClick={() => alert("Viewing Audit Trail...")} className="w-full px-2.5 py-1.5 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9.5px]">
          <span>View Audit Trail</span>
          <ArrowUpRight size={12} className="text-muted" />
        </button>
      </div>
    </div>
  );
}
