"use client";

import React from "react";
import { Activity, AlertTriangle, ChevronRight, ArrowUpRight, MoveRight } from "lucide-react";

interface FacilityIntelligenceSidebarProps {
  facilityId: string;
}

export function FacilityIntelligenceSidebar({ facilityId }: FacilityIntelligenceSidebarProps) {
  const healthScore = 94;

  const alerts = [
    { msg: "Dock congestion risk at Dock 3 & 7", type: "critical" },
    { msg: "Pick queue SLA risk in Zone A", type: "critical" },
    { msg: "Critical capacity in Fast Moving Zone", type: "warning" },
    { msg: "Planned maintenance in 6 days", type: "info" },
    { msg: "Staffing shortage in Packing (Evening)", type: "info" },
  ];

  const quickQueues = [
    { label: "Picking", count: 126, color: "text-purple-700 bg-purple-50 font-bold" },
    { label: "Packing", count: 96, color: "text-sky-700 bg-sky-50 font-bold" },
    { label: "Dispatch", count: 142, color: "text-indigo-700 bg-indigo-50 font-bold" },
    { label: "Returns", count: 23, color: "text-rose-700 bg-rose-50 font-bold" },
  ];

  return (
    <div className="w-full xl:w-[270px] flex-shrink-0 flex flex-col gap-2.5 text-[10px]">
      {/* HEADER & CIRCULAR HEALTH GAUGE */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-3 space-y-2.5">
        <div className="flex items-center justify-between border-b border-line pb-2">
          <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
            <Activity size={13} className="text-primary-900" />
            Facility Intelligence
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
              Optimized
            </div>
            <div className="text-[8.5px] text-emerald-700 font-semibold mt-1">+2.4 pts vs last 7 days</div>
          </div>
        </div>
      </div>

      {/* PRIORITY FACILITY ALERTS (5) */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-3 space-y-2">
        <div className="flex items-center justify-between border-b border-line pb-1.5">
          <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle size={13} className="text-rose-600" />
            Priority Alerts (5)
          </h3>
          <button onClick={() => alert("Viewing All Alerts...")} className="text-[9px] text-primary-900 hover:underline font-bold flex items-center gap-0.5">
            View All <ChevronRight size={10} />
          </button>
        </div>

        <div className="space-y-1.5">
          {alerts.map((alt, idx) => (
            <div
              key={idx}
              className={`p-1.5 border-l-2 border border-line rounded text-[9px] ${
                alt.type === 'critical' ? 'bg-rose-50/60 border-l-rose-600 border-rose-200 text-rose-900 font-semibold' : alt.type === 'warning' ? 'bg-amber-50/60 border-l-amber-500 border-amber-200 text-amber-900 font-medium' : 'bg-canvas border-l-blue-500 text-ink'
              }`}
            >
              {alt.msg}
            </div>
          ))}
        </div>
      </div>

      {/* FACILITY SNAPSHOT */}
      <div className="p-2 bg-white border border-line rounded-lg shadow-sm space-y-0.5 text-[9.5px]">
        <span className="text-[8.5px] font-semibold text-muted uppercase">Facility Snapshot</span>
        <div className="flex justify-between"><span>Facility Ref:</span><strong className="font-mono font-bold text-primary-900">{facilityId}</strong></div>
        <div className="flex justify-between"><span>Operator:</span><strong className="text-ink">SL Beauty</strong></div>
        <div className="flex justify-between"><span>Location:</span><strong className="text-ink">Colombo, Sri Lanka</strong></div>
        <div className="flex justify-between"><span>Status:</span><span className="text-emerald-700 font-bold">Operational</span></div>
      </div>

      {/* CAPACITY SUMMARY */}
      <div className="p-2 bg-white border border-line rounded-lg shadow-sm space-y-0.5 text-[9.5px]">
        <span className="text-[8.5px] font-semibold text-muted uppercase">Capacity Summary</span>
        <div className="flex justify-between">
          <strong className="text-amber-700 font-bold">76% Used</strong>
          <span className="text-[8.5px] text-muted">1.62M / 2.12M</span>
        </div>
      </div>

      {/* WORKLOAD SUMMARY */}
      <div className="p-2 bg-white border border-line rounded-lg shadow-sm space-y-0.5 text-[9.5px]">
        <span className="text-[8.5px] font-semibold text-muted uppercase">Workload Summary</span>
        <div className="flex justify-between">
          <strong className="text-blue-700">312 Orders</strong>
          <span className="text-[8.5px] text-muted">126 / 96 / 142</span>
        </div>
      </div>

      {/* INVENTORY SUMMARY */}
      <div className="p-2 bg-white border border-line rounded-lg shadow-sm space-y-0.5 text-[9.5px]">
        <span className="text-[8.5px] font-semibold text-muted uppercase">Inventory Summary</span>
        <div className="flex justify-between">
          <strong className="text-ink">1.62M Units</strong>
          <span className="text-[8.5px] text-muted">7,842 SKUs</span>
        </div>
      </div>

      {/* OPERATIONS SUMMARY */}
      <div className="p-2 bg-white border border-line rounded-lg shadow-sm space-y-0.5 text-[9.5px]">
        <span className="text-[8.5px] font-semibold text-muted uppercase">Operations Summary</span>
        <div className="flex justify-between">
          <strong className="text-emerald-700 font-bold">98.3% On-Time Dispatch</strong>
          <span className="text-[8.5px] text-muted">85% Same-Day</span>
        </div>
        <div className="text-[8.5px] text-muted">Returns Active</div>
      </div>

      {/* EXCEPTION & HOLD SUMMARY */}
      <div className="p-2 bg-white border border-line rounded-lg shadow-sm space-y-0.5 text-[9.5px]">
        <span className="text-[8.5px] font-semibold text-muted uppercase">Exception &amp; Hold Summary</span>
        <div className="flex justify-between">
          <strong className="text-rose-700 font-bold">8 Exceptions</strong>
          <strong className="text-amber-700 font-bold">2 Active Holds</strong>
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

      {/* FINAL FACILITY ACTIONS */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-2.5 space-y-1.5">
        <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider mb-1">
          Facility Actions
        </h3>

        <button onClick={() => alert("Reviewing Capacity Exceptions...")} className="w-full px-2.5 py-1.5 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9.5px]">
          <span>Review Capacity Exceptions</span>
          <ArrowUpRight size={12} className="text-muted" />
        </button>

        <button onClick={() => alert("Opening Pick Queue...")} className="w-full px-2.5 py-1.5 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9.5px]">
          <span>Open Pick Queue</span>
          <ArrowUpRight size={12} className="text-muted" />
        </button>

        <button onClick={() => alert("Reviewing Operations...")} className="w-full px-2.5 py-1.5 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9.5px]">
          <span>Review Operations</span>
          <ArrowUpRight size={12} className="text-muted" />
        </button>

        <button onClick={() => alert("Reviewing Operational Holds...")} className="w-full px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md font-semibold text-amber-900 text-left flex items-center justify-between transition-colors text-[9.5px]">
          <span>Review Operational Holds</span>
          <ArrowUpRight size={12} className="text-amber-700" />
        </button>

        <button onClick={() => alert("Viewing SLA Dashboard...")} className="w-full px-2.5 py-1.5 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9.5px]">
          <span>View SLA Dashboard</span>
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
