"use client";

import React from "react";
import { 
  AlertTriangle, MoveRight, ArrowUpRight, ChevronRight, Activity, Clock, ShieldAlert, Package, CheckSquare
} from "lucide-react";

export interface ShipmentIntelligenceSidebarProps {
  operationsHealth?: any;
  priorityAlerts?: any[];
  quickQueue?: any;
  carrierPerformance?: any[];
  codFinancials?: any;
}

export function ShipmentIntelligenceSidebar({
  priorityAlerts = [],
  quickQueue = {},
}: ShipmentIntelligenceSidebarProps) {
  const healthScore = 92;

  const defaultAlerts = [
    { title: "Pickup delays > 24 hrs", count: 24, severity: "high" },
    { title: "Tracking gaps > 24 hrs", count: 18, severity: "high" },
    { title: "Failed delivery attempts", count: 14, severity: "high" },
    { title: "Address issues reported", count: 12, severity: "medium" },
    { title: "SLA breaches (shipments)", count: 8, severity: "critical" },
    { title: "High-value shipments at risk", count: 6, severity: "high" },
  ];

  const displayAlerts = priorityAlerts && priorityAlerts.length > 0
    ? priorityAlerts.map(a => ({
        title: a.title || a.message || `${a.shipment_number || 'Shipment'} requires attention`,
        count: a.count || 1,
        severity: a.severity || "high",
      }))
    : defaultAlerts;

  const quickQueueItems = [
    { label: "Creation Pending", count: 42, icon: <Clock size={11} className="text-amber-600" />, color: "text-amber-700 bg-amber-50" },
    { label: "Awaiting Pickup", count: 64, icon: <Package size={11} className="text-purple-600" />, color: "text-purple-700 bg-purple-50" },
    { label: "Delayed Shipments", count: 18, icon: <AlertTriangle size={11} className="text-rose-600" />, color: "text-rose-700 bg-rose-50 font-bold" },
    { label: "SLA Breaches", count: 16, icon: <ShieldAlert size={11} className="text-rose-700" />, color: "text-rose-800 bg-rose-100 font-bold" },
  ];

  return (
    <div className="w-full xl:w-[230px] flex-shrink-0 flex flex-col gap-2 text-[9.5px]">
      {/* A. SHIPMENT INTELLIGENCE CIRCULAR HEALTH GAUGE */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2.5 space-y-2">
        <div className="flex items-center justify-between border-b border-line pb-1.5">
          <h3 className="text-[9.5px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
            <Activity size={12} className="text-primary-900" />
            Shipment Intelligence
          </h3>
          <span className="text-[8.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.1 rounded border border-emerald-200">
            Excellent
          </span>
        </div>

        {/* CIRCULAR HEALTH GAUGE & METRICS */}
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
            <div className="text-[8px] text-emerald-700 font-semibold">+5 pts vs last 30d</div>
          </div>
        </div>
      </div>

      {/* B. PRIORITY SHIPMENT ALERTS */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2.5 space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[9.5px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle size={12} className="text-rose-600" />
            Priority Alerts ({displayAlerts.length})
          </h3>
          <button
            onClick={() => alert("Opening Priority Shipment Alerts...")}
            className="text-[8.5px] text-primary-900 hover:underline font-bold flex items-center gap-0.5"
          >
            View All <ChevronRight size={9} />
          </button>
        </div>

        <div className="space-y-1">
          {displayAlerts.map((alert, idx) => (
            <div
              key={idx}
              className="p-1 bg-canvas border-l-2 border-l-rose-600 border border-line rounded flex items-center justify-between gap-1 text-[8.5px]"
            >
              <span className="font-medium text-ink truncate">{alert.title}</span>
              <span className="text-[8.5px] font-bold text-rose-700 bg-rose-50 px-1 py-0.1 rounded flex-shrink-0">
                {alert.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* DOMAIN SUMMARY METRIC BOXES */}
      <div className="grid grid-cols-2 gap-1.5 text-[8.5px]">
        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">Shipment Summary</span>
          <div className="font-bold text-ink text-[9.5px]">1,426 Total</div>
          <div className="text-emerald-700 text-[7.5px]">Delivered: 842</div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">Pickup Summary</span>
          <div className="font-bold text-ink text-[9.5px]">1,248 Req</div>
          <div className="text-emerald-700 text-[7.5px]">86.4% Success</div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">Delivery Summary</span>
          <div className="font-bold text-ink text-[9.5px]">156 Out</div>
          <div className="text-rose-700 text-[7.5px]">Delayed: 18</div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">Carrier Summary</span>
          <div className="font-bold text-ink text-[9.5px]">6 Active</div>
          <div className="text-emerald-700 text-[7.5px]">91% On-Time</div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">POD &amp; COD Summary</span>
          <div className="font-bold text-ink text-[9.5px]">88% POD</div>
          <div className="text-amber-700 text-[7.5px]">142K COD</div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">SLA Summary</span>
          <div className="font-bold text-emerald-700 text-[9.5px]">91% On Track</div>
          <div className="text-rose-700 text-[7.5px]">16 Breached</div>
        </div>
      </div>

      {/* QUICK QUEUES */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2.5 space-y-1.5">
        <h3 className="text-[9.5px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
          <MoveRight size={12} className="text-primary-900" />
          Quick Queues
        </h3>

        <div className="grid grid-cols-2 gap-1">
          {quickQueueItems.map((qq, i) => (
            <div
              key={i}
              onClick={() => alert(`Opening Queue: ${qq.label}`)}
              className="p-1 bg-canvas border border-line rounded flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors text-[8.5px]"
            >
              <div className="flex items-center gap-1 truncate">
                {qq.icon}
                <span className="text-muted font-medium truncate">{qq.label}</span>
              </div>
              <span className={`px-1 py-0.1 rounded font-bold ${qq.color}`}>
                {qq.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL SHIPMENT ACTIONS */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1">
        <h3 className="text-[9px] font-bold text-ink uppercase tracking-wider mb-0.5">
          Final Shipment Actions
        </h3>

        <button
          onClick={() => alert("Reviewing Shipment Exceptions...")}
          className="w-full px-2 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md font-semibold text-rose-800 text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Review Shipment Exceptions</span>
          <ArrowUpRight size={10} className="text-rose-600" />
        </button>

        <button
          onClick={() => alert("Opening Shipment Queue...")}
          className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Open Shipment Queue</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Reviewing Delayed Shipments...")}
          className="w-full px-2 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md font-semibold text-amber-900 text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Review Delayed Shipments</span>
          <ArrowUpRight size={10} className="text-amber-700" />
        </button>

        <button
          onClick={() => alert("Reviewing SLA Breaches...")}
          className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Review SLA Breaches</span>
          <ArrowUpRight size={10} className="text-muted" />
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
