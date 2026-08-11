"use client";

import React from "react";
import { 
  AlertTriangle, MoveRight, ArrowUpRight, ChevronRight, Activity
} from "lucide-react";

export interface LogisticsSidebarsProps {
  operationsHealth?: any;
  priorityAlerts?: any[];
  quickQueue?: any;
  carrierPerformance?: any[];
  codFinancials?: any;
}

export function LogisticsSidebars({
  priorityAlerts = [],
  quickQueue = {},
}: LogisticsSidebarsProps) {
  const healthScore = 91;

  const defaultAlerts = [
    { title: "12 delayed shipments require attention", severity: "high", time: "10 mins ago" },
    { title: "8 carrier pickups are overdue", severity: "high", time: "25 mins ago" },
    { title: "2 warehouses exceed 95% capacity", severity: "medium", time: "1 hour ago" },
    { title: "6 failed deliveries in last 24 hours", severity: "high", time: "2 hours ago" },
    { title: "Reconciliation required for LKR 1.2M", severity: "medium", time: "3 hours ago" },
  ];

  const displayAlerts = priorityAlerts && priorityAlerts.length > 0
    ? priorityAlerts.map(a => ({
        title: a.title || a.message || `${a.shipment_number || 'Shipment'} requires attention`,
        severity: a.severity || "high",
        time: a.time || "Recently",
      }))
    : defaultAlerts;

  const quickQueueItems = [
    { label: "Allocation Pending", count: quickQueue?.unassigned_carrier ?? 84, color: "text-amber-700 bg-amber-50" },
    { label: "Exceptions", count: quickQueue?.delivery_failed ?? 42, color: "text-rose-700 bg-rose-50" },
    { label: "SLA Breaches", count: 12, color: "text-rose-800 bg-rose-100 font-bold" },
    { label: "Claims", count: 8, color: "text-purple-700 bg-purple-50" },
    { label: "Reconciliation", count: 16, color: "text-blue-700 bg-blue-50" },
  ];

  return (
    <div className="w-full xl:w-[230px] flex-shrink-0 flex flex-col gap-2 text-[9.5px]">
      {/* A. LOGISTICS OPERATIONS HEALTH GAUGE */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2.5 space-y-2">
        <div className="flex items-center justify-between border-b border-line pb-1.5">
          <h3 className="text-[9.5px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
            <Activity size={12} className="text-primary-900" />
            Logistics Operations Health
          </h3>
          <span className="text-[8.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.1 rounded border border-emerald-200">
            Excellent
          </span>
        </div>

        {/* CIRCULAR HEALTH GAUGE & METRICS */}
        <div className="flex items-center gap-2 py-0.5">
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

          <div className="flex-1 space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>Fulfilment:</span><strong className="text-ink">92</strong></div>
            <div className="flex justify-between"><span>Allocation:</span><strong className="text-ink">89</strong></div>
            <div className="flex justify-between"><span>Pick &amp; Pack:</span><strong className="text-ink">90</strong></div>
            <div className="flex justify-between"><span>Dispatch:</span><strong className="text-ink">91</strong></div>
            <div className="flex justify-between"><span>Delivery:</span><strong className="text-ink">92</strong></div>
            <div className="flex justify-between"><span>Reverse Log:</span><strong className="text-ink">88</strong></div>
            <div className="flex justify-between"><span>Cost &amp; Recon:</span><strong className="text-ink">86</strong></div>
            <div className="flex justify-between"><span>Audit &amp; Comp:</span><strong className="text-ink">94</strong></div>
          </div>
        </div>
      </div>

      {/* B. PRIORITY LOGISTICS ALERTS */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2.5 space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[9.5px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle size={12} className="text-rose-600" />
            Priority Alerts ({displayAlerts.length})
          </h3>
          <button
            onClick={() => alert("Opening Priority Alerts Dashboard...")}
            className="text-[8.5px] text-primary-900 hover:underline font-bold flex items-center gap-0.5"
          >
            View all <ChevronRight size={9} />
          </button>
        </div>

        <div className="space-y-1">
          {displayAlerts.map((alert, idx) => (
            <div
              key={idx}
              className="p-1 bg-canvas border-l-2 border-l-rose-600 border border-line rounded flex items-center justify-between gap-1 text-[8.5px]"
            >
              <span className="font-medium text-ink truncate">{alert.title}</span>
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
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">Fulfilment</span>
          <div className="font-bold text-ink text-[9.5px]">1,248</div>
          <div className="text-amber-700 text-[7.5px]">AWR: 84</div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">Shipments</span>
          <div className="font-bold text-ink text-[9.5px]">286</div>
          <div className="text-rose-700 text-[7.5px]">Delayed: 18</div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">Warehouses</span>
          <div className="font-bold text-ink text-[9.5px]">82%</div>
          <div className="text-rose-700 text-[7.5px]">Critical: 1</div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">Carriers</span>
          <div className="font-bold text-ink text-[9.5px]">8</div>
          <div className="text-amber-700 text-[7.5px]">At Risk: 2</div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">Reverse Log</span>
          <div className="font-bold text-ink text-[9.5px]">38</div>
          <div className="text-muted text-[7.5px]">Pickup: 24</div>
        </div>

        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="font-semibold text-muted uppercase text-[7.5px] block truncate">Cost &amp; Recon</span>
          <div className="font-bold text-ink text-[9.5px]">LKR 18.6M</div>
          <div className="text-amber-700 text-[7.5px]">Pend: 1.2M</div>
        </div>
      </div>

      {/* QUICK QUEUES */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2.5 space-y-1.5">
        <h3 className="text-[9.5px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
          <MoveRight size={12} className="text-primary-900" />
          Quick Queues
        </h3>

        <div className="space-y-1">
          {quickQueueItems.map((qq, i) => (
            <div
              key={i}
              onClick={() => alert(`Opening Queue: ${qq.label}`)}
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

      {/* FINAL CONTROL ACTIONS */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1">
        <h3 className="text-[9px] font-bold text-ink uppercase tracking-wider mb-0.5">
          Logistics Control Actions
        </h3>

        <button
          onClick={() => alert("Opening Delayed Shipments Console...")}
          className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Review Delayed Shipments</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Opening Exception Queue...")}
          className="w-full px-2 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md font-semibold text-rose-800 text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Open Exception Queue</span>
          <ArrowUpRight size={10} className="text-rose-600" />
        </button>

        <button
          onClick={() => alert("Launching Logistics Performance Review...")}
          className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Launch Logistics Review</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Reviewing Carrier SLA Issues...")}
          className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Review Carrier Issues</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Opening Financial Reconciliation Dashboard...")}
          className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Open Reconciliation Dashboard</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Viewing Operational Audit Trail...")}
          className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>View Audit Trail</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>
      </div>
    </div>
  );
}
