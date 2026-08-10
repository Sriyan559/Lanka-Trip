"use client";

import React from "react";
import {
  Activity, AlertTriangle, RefreshCw, Share2, Printer, FileText, ArrowUpRight
} from "lucide-react";

interface FulfilmentRecordHealthSidebarProps {
  fulfilmentId?: string;
  onRefresh?: () => void;
}

export function FulfilmentRecordHealthSidebar({
  fulfilmentId = "FUL-2026-0008921",
  onRefresh,
}: FulfilmentRecordHealthSidebarProps) {
  const healthScore = 92;

  const alerts = [
    { title: "1 Quality review pending", severity: "warning" },
    { title: "1 SLA at risk (Quality SLA)", severity: "warning" },
    { title: "1 Packing partially complete", severity: "warning" },
    { title: "1 Shipment not created", severity: "warning" },
  ];

  return (
    <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col gap-4 text-xs">
      {/* HEADER & CIRCULAR HEALTH GAUGE */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
            <Activity size={14} className="text-primary-900" />
            Fulfilment Record Health
          </h3>
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
            <div className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-center inline-block">
              Excellent
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-1">+4 pts vs last 30 days</div>
          </div>
        </div>
      </div>

      {/* PRIORITY RECORD ALERTS */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3">
        <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider flex items-center gap-1.5 border-b border-line pb-2">
          <AlertTriangle size={14} className="text-amber-600" />
          Priority Record Alerts (4)
        </h3>

        <div className="space-y-2">
          {alerts.map((alt, idx) => (
            <div
              key={idx}
              className="p-2 bg-amber-50/60 border-l-2 border-l-amber-500 border border-amber-200 rounded flex items-center gap-2 text-[11px]"
            >
              <AlertTriangle size={12} className="text-amber-600 flex-shrink-0" />
              <span className="font-medium text-amber-950">{alt.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FULFILMENT SNAPSHOT */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-2">
        <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider border-b border-line pb-2">
          Fulfilment Snapshot
        </h3>

        <div className="space-y-1 text-[11px]">
          <div className="flex justify-between"><span className="text-muted">Fulfilment Ref:</span><strong className="font-mono text-primary-900">{fulfilmentId}</strong></div>
          <div className="flex justify-between"><span className="text-muted">Customer:</span><strong className="text-ink">Amaya Perera</strong></div>
          <div className="flex justify-between"><span className="text-muted">Priority:</span><strong className="text-ink">Standard</strong></div>
          <div className="flex justify-between"><span className="text-muted">Service Level:</span><span className="text-muted">Same-Day</span></div>
          <div className="flex justify-between"><span className="text-muted">Owner:</span><span className="text-ink font-medium">Nuwan W.</span></div>
        </div>

        <button onClick={() => alert("Viewing Full Snapshot...")} className="text-[10px] text-primary-900 font-bold hover:underline block pt-1">
          View Full Snapshot
        </button>
      </div>

      {/* INVENTORY SUMMARY — SIDEBAR */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <h4 className="font-bold text-ink uppercase tracking-wider">Inventory Summary</h4>
          <span className="font-bold text-ink">24/24</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div className="bg-emerald-600 h-full rounded-full" style={{ width: "100%" }} />
        </div>
        <div className="flex justify-between text-[10px] text-muted">
          <span>100% Reserved</span>
          <span>100% Allocated</span>
          <span>0% Short</span>
        </div>
      </div>

      {/* WAREHOUSE SUMMARY — SIDEBAR */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-2">
        <h4 className="font-bold text-ink uppercase tracking-wider text-[11px]">Warehouse Summary</h4>
        <div className="text-[11px] font-bold text-ink">FC Colombo Central</div>
        <div className="flex justify-between text-[10px]">
          <span className="text-muted">Capacity:</span>
          <strong className="text-emerald-700">Healthy</strong>
        </div>
        <div className="flex justify-between text-[10px]">
          <span className="text-muted">Utilization:</span>
          <strong className="text-ink">72%</strong>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div className="bg-emerald-600 h-full rounded-full" style={{ width: "72%" }} />
        </div>
      </div>

      {/* SHIPMENT READINESS — SIDEBAR */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-2">
        <h4 className="font-bold text-ink uppercase tracking-wider text-[11px]">Shipment Readiness</h4>
        <div className="flex justify-between text-[11px]">
          <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 uppercase text-[10px]">
            Not Ready
          </span>
          <span className="text-muted text-[10px]">Label: <strong className="text-amber-700">Pending</strong></span>
        </div>
      </div>

      {/* EXCEPTION & HOLD SUMMARY */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-2">
        <h4 className="font-bold text-ink uppercase tracking-wider text-[11px]">Exception &amp; Hold Summary</h4>
        <div className="space-y-1 text-[11px]">
          <div className="flex justify-between"><span className="text-muted">Holds:</span><strong className="text-emerald-700">0 Active</strong></div>
          <div className="flex justify-between"><span className="text-muted">Exceptions:</span><strong className="text-rose-700">1 Open (Low)</strong></div>
        </div>
      </div>

      {/* SLA SUMMARY — SIDEBAR */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-2">
        <h4 className="font-bold text-ink uppercase tracking-wider text-[11px]">SLA Summary</h4>
        <div className="flex justify-between text-[10px] text-muted">
          <span>Overall SLA Progress</span>
          <strong className="text-emerald-700 font-bold">91%</strong>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div className="bg-emerald-600 h-full rounded-full" style={{ width: "91%" }} />
        </div>
        <div className="flex justify-between text-[10px] text-muted">
          <span>SLA At Risk: <strong className="text-amber-700">1</strong></span>
          <span>SLA Breached: <strong className="text-ink">0</strong></span>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-3.5 space-y-2">
        <h4 className="font-bold text-ink uppercase tracking-wider text-[11px]">Quick Actions</h4>
        <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
          <button
            onClick={onRefresh || (() => window.location.reload())}
            className="p-2 bg-canvas border border-line rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center gap-1 font-semibold text-ink"
            title="Refresh record data"
          >
            <RefreshCw size={14} className="text-muted" /> Refresh
          </button>
          <button
            onClick={() => alert("Sharing link copied!")}
            className="p-2 bg-canvas border border-line rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center gap-1 font-semibold text-ink"
            title="Share record"
          >
            <Share2 size={14} className="text-muted" /> Share
          </button>
          <button
            onClick={() => window.print()}
            className="p-2 bg-canvas border border-line rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center gap-1 font-semibold text-ink"
            title="Print record detail"
          >
            <Printer size={14} className="text-muted" /> Print
          </button>
          <button
            onClick={() => alert("Opening Notes...")}
            className="p-2 bg-canvas border border-line rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center gap-1 font-semibold text-ink"
            title="Add notes"
          >
            <FileText size={14} className="text-muted" /> Notes
          </button>
        </div>
      </div>

      {/* FINAL FULFILMENT ACTIONS */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-2">
        <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider mb-2">
          Final Fulfilment Actions
        </h3>

        <button
          onClick={() => alert("Reviewing Fulfilment Exception...")}
          className="w-full px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg font-semibold text-rose-800 text-left flex items-center justify-between transition-colors"
        >
          <span>Review Fulfilment Exception</span>
          <ArrowUpRight size={14} className="text-rose-600" />
        </button>

        <button
          onClick={() => alert("Opening Fulfilment Queue...")}
          className="w-full px-3 py-2 bg-canvas hover:bg-gray-100 border border-line rounded-lg font-semibold text-ink text-left flex items-center justify-between transition-colors"
        >
          <span>Open Fulfilment Queue</span>
          <ArrowUpRight size={14} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Reviewing Quality Checks...")}
          className="w-full px-3 py-2 bg-canvas hover:bg-gray-100 border border-line rounded-lg font-semibold text-ink text-left flex items-center justify-between transition-colors"
        >
          <span>Review Quality Checks</span>
          <ArrowUpRight size={14} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Reviewing SLA Breaches...")}
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
