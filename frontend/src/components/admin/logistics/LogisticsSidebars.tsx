"use client";

import React from "react";
import { 
  AlertTriangle, Clock, Truck, ShieldAlert, AlertCircle, Info, MoveRight, 
  Warehouse, DollarSign, RotateCcw, CheckSquare, Layers, ArrowUpRight, ChevronRight, Activity, FileText
} from "lucide-react";

export interface LogisticsSidebarsProps {
  operationsHealth?: any;
  priorityAlerts?: any[];
  quickQueue?: any;
  carrierPerformance?: any[];
  codFinancials?: any;
}

export function LogisticsSidebars({
  operationsHealth,
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
    <div className="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-4 text-xs">
      {/* A. LOGISTICS OPERATIONS HEALTH GAUGE */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
            <Activity size={14} className="text-primary-900" />
            Logistics Operations Health
          </h3>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Excellent
          </span>
        </div>

        {/* CIRCULAR HEALTH GAUGE */}
        <div className="flex items-center gap-4 py-2 border-y border-line">
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
            <div className="flex justify-between">
              <span className="text-muted">Fulfilment:</span>
              <span className="font-bold text-ink">92</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Allocation:</span>
              <span className="font-bold text-ink">89</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Pick &amp; Pack:</span>
              <span className="font-bold text-ink">90</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Dispatch:</span>
              <span className="font-bold text-ink">91</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Delivery:</span>
              <span className="font-bold text-ink">92</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Reverse Log:</span>
              <span className="font-bold text-ink">88</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Cost &amp; Recon:</span>
              <span className="font-bold text-ink">86</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Audit &amp; Comp:</span>
              <span className="font-bold text-ink">94</span>
            </div>
          </div>
        </div>
      </div>

      {/* B. PRIORITY LOGISTICS ALERTS */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle size={14} className="text-rose-600" />
            Priority Logistics Alerts ({displayAlerts.length})
          </h3>
          <button
            onClick={() => alert("Opening Priority Alerts Dashboard...")}
            className="text-[10px] text-primary-900 hover:underline font-bold flex items-center gap-0.5"
          >
            View all alerts <ChevronRight size={10} />
          </button>
        </div>

        <div className="space-y-2">
          {displayAlerts.map((alert, idx) => (
            <div
              key={idx}
              className="p-2 bg-canvas border-l-2 border-l-rose-600 border border-line rounded flex items-start justify-between gap-2"
            >
              <div className="space-y-0.5">
                <div className="font-semibold text-ink text-[11px]">{alert.title}</div>
                <div className="text-[10px] text-muted">{alert.time}</div>
              </div>
              <span className="text-[9px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded flex-shrink-0">
                CRITICAL
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* C, D, E, F, G, H DOMAIN SUMMARIES */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 bg-white border border-line rounded-xl shadow-sm space-y-1">
          <span className="text-[10px] font-semibold text-muted uppercase">Fulfilment</span>
          <div className="flex items-baseline justify-between">
            <span className="text-base font-bold text-ink">1,248</span>
            <span className="text-[10px] text-amber-700 font-semibold">AWR: 84</span>
          </div>
        </div>

        <div className="p-3 bg-white border border-line rounded-xl shadow-sm space-y-1">
          <span className="text-[10px] font-semibold text-muted uppercase">Shipments</span>
          <div className="flex items-baseline justify-between">
            <span className="text-base font-bold text-ink">286</span>
            <span className="text-[10px] text-rose-700 font-semibold">Delayed: 18</span>
          </div>
        </div>

        <div className="p-3 bg-white border border-line rounded-xl shadow-sm space-y-1">
          <span className="text-[10px] font-semibold text-muted uppercase">Warehouses</span>
          <div className="flex items-baseline justify-between">
            <span className="text-base font-bold text-ink">82%</span>
            <span className="text-[10px] text-rose-700 font-semibold">Critical: 1</span>
          </div>
        </div>

        <div className="p-3 bg-white border border-line rounded-xl shadow-sm space-y-1">
          <span className="text-[10px] font-semibold text-muted uppercase">Carriers</span>
          <div className="flex items-baseline justify-between">
            <span className="text-base font-bold text-ink">8</span>
            <span className="text-[10px] text-amber-700 font-semibold">At Risk: 2</span>
          </div>
        </div>

        <div className="p-3 bg-white border border-line rounded-xl shadow-sm space-y-1">
          <span className="text-[10px] font-semibold text-muted uppercase">Reverse Log</span>
          <div className="flex items-baseline justify-between">
            <span className="text-base font-bold text-ink">38</span>
            <span className="text-[10px] text-muted">Pickup: 24</span>
          </div>
        </div>

        <div className="p-3 bg-white border border-line rounded-xl shadow-sm space-y-1">
          <span className="text-[10px] font-semibold text-muted uppercase">Cost &amp; Recon</span>
          <div className="flex items-baseline justify-between">
            <span className="text-base font-bold text-ink">LKR 18.6M</span>
            <span className="text-[10px] text-amber-700 font-semibold">Pend: 1.2M</span>
          </div>
        </div>
      </div>

      {/* I. QUICK QUEUES */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3">
        <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
          <MoveRight size={14} className="text-primary-900" />
          Quick Queues
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {quickQueueItems.map((qq, i) => (
            <div
              key={i}
              onClick={() => alert(`Opening Queue: ${qq.label}`)}
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

      {/* J. FINAL LOGISTICS ACTIONS */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-2">
        <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider mb-2">
          Logistics Control Actions
        </h3>

        <button
          onClick={() => alert("Opening Delayed Shipments Console...")}
          className="w-full px-3 py-2 bg-canvas hover:bg-gray-100 border border-line rounded-lg font-semibold text-ink text-left flex items-center justify-between transition-colors"
        >
          <span>Review Delayed Shipments</span>
          <ArrowUpRight size={14} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Opening Exception Queue...")}
          className="w-full px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg font-semibold text-rose-800 text-left flex items-center justify-between transition-colors"
        >
          <span>Open Exception Queue</span>
          <ArrowUpRight size={14} className="text-rose-600" />
        </button>

        <button
          onClick={() => alert("Launching Logistics Performance Review...")}
          className="w-full px-3 py-2 bg-canvas hover:bg-gray-100 border border-line rounded-lg font-semibold text-ink text-left flex items-center justify-between transition-colors"
        >
          <span>Launch Logistics Review</span>
          <ArrowUpRight size={14} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Reviewing Carrier SLA Issues...")}
          className="w-full px-3 py-2 bg-canvas hover:bg-gray-100 border border-line rounded-lg font-semibold text-ink text-left flex items-center justify-between transition-colors"
        >
          <span>Review Carrier Issues</span>
          <ArrowUpRight size={14} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Opening Financial Reconciliation Dashboard...")}
          className="w-full px-3 py-2 bg-canvas hover:bg-gray-100 border border-line rounded-lg font-semibold text-ink text-left flex items-center justify-between transition-colors"
        >
          <span>Open Reconciliation Dashboard</span>
          <ArrowUpRight size={14} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Viewing Operational Audit Trail...")}
          className="w-full px-3 py-2 bg-canvas hover:bg-gray-100 border border-line rounded-lg font-semibold text-ink text-left flex items-center justify-between transition-colors"
        >
          <span>View Audit Trail</span>
          <ArrowUpRight size={14} className="text-muted" />
        </button>
      </div>
    </div>
  );
}
