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
    <div className="w-full xl:w-[230px] flex-shrink-0 flex flex-col gap-2 text-[9.5px]">
      {/* HEADER & CIRCULAR HEALTH GAUGE */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2.5 space-y-2">
        <div className="flex items-center justify-between border-b border-line pb-1.5">
          <h3 className="text-[9.5px] font-bold text-ink uppercase tracking-wider flex items-center gap-1">
            <Activity size={12} className="text-primary-900" />
            Fulfilment Record Health
          </h3>
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
            <div className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.1 rounded text-center inline-block text-[8.5px]">
              Excellent
            </div>
            <div className="text-[8px] text-emerald-700 font-semibold mt-0.5">+4 pts vs last 30 days</div>
          </div>
        </div>
      </div>

      {/* PRIORITY RECORD ALERTS */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2.5 space-y-1.5">
        <h3 className="text-[9.5px] font-bold text-ink uppercase tracking-wider flex items-center gap-1 border-b border-line pb-1">
          <AlertTriangle size={12} className="text-amber-600" />
          Priority Record Alerts (4)
        </h3>

        <div className="space-y-1">
          {alerts.map((alt, idx) => (
            <div
              key={idx}
              className="p-1 bg-amber-50/60 border-l-2 border-l-amber-500 border border-amber-200 rounded flex items-center gap-1.5 text-[8.5px]"
            >
              <AlertTriangle size={10} className="text-amber-600 flex-shrink-0" />
              <span className="font-medium text-amber-950 truncate">{alt.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* DOMAIN SUMMARIES */}
      <div className="space-y-1 text-[9px]">
        {/* FULFILMENT SNAPSHOT */}
        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="text-[8px] font-semibold text-muted uppercase">Fulfilment Snapshot</span>
          <div className="flex justify-between"><span>Ref:</span><strong className="font-mono text-primary-900 font-bold">{fulfilmentId}</strong></div>
          <div className="flex justify-between"><span>Customer:</span><strong className="text-ink">Amaya Perera</strong></div>
          <div className="flex justify-between"><span>Priority:</span><strong className="text-ink">Standard</strong></div>
          <div className="flex justify-between"><span>Service Level:</span><span className="text-muted">Same-Day</span></div>
          <div className="flex justify-between"><span>Owner:</span><span className="text-ink font-medium">Nuwan W.</span></div>
        </div>

        {/* INVENTORY SUMMARY */}
        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <div className="flex items-center justify-between text-[8px] font-semibold text-muted uppercase">
            <span>Inventory Summary</span>
            <span className="font-bold text-ink">24/24</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: "100%" }} />
          </div>
          <div className="flex justify-between text-[8px] text-muted pt-0.5">
            <span>100% Reserved</span>
            <span>100% Allocated</span>
            <span>0% Short</span>
          </div>
        </div>

        {/* WAREHOUSE SUMMARY */}
        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="text-[8px] font-semibold text-muted uppercase">Warehouse Summary</span>
          <div className="text-[9px] font-bold text-ink">FC Colombo Central</div>
          <div className="flex justify-between text-[8.5px]"><span>Capacity:</span><strong className="text-emerald-700">Healthy</strong></div>
          <div className="flex justify-between text-[8.5px]"><span>Utilization:</span><strong className="text-ink">72%</strong></div>
        </div>

        {/* SHIPMENT READINESS */}
        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="text-[8px] font-semibold text-muted uppercase">Shipment Readiness</span>
          <div className="flex justify-between items-center text-[8.5px]">
            <span className="font-bold text-rose-700 bg-rose-50 px-1 py-0.1 rounded border border-rose-200 uppercase text-[7.5px]">
              Not Ready
            </span>
            <span className="text-muted">Label: <strong className="text-amber-700">Pending</strong></span>
          </div>
        </div>

        {/* EXCEPTION & HOLD SUMMARY */}
        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <span className="text-[8px] font-semibold text-muted uppercase">Exception &amp; Hold Summary</span>
          <div className="flex justify-between"><span>Holds:</span><strong className="text-emerald-700 font-bold">0 Active</strong></div>
          <div className="flex justify-between"><span>Exceptions:</span><strong className="text-rose-700 font-bold">1 Open (Low)</strong></div>
        </div>

        {/* SLA SUMMARY */}
        <div className="p-1.5 bg-white border border-line rounded-lg shadow-xs space-y-0.5">
          <div className="flex justify-between text-[8px] text-muted font-semibold uppercase">
            <span>SLA Summary</span>
            <strong className="text-emerald-700 font-bold">91%</strong>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: "91%" }} />
          </div>
          <div className="flex justify-between text-[8px] text-muted pt-0.5">
            <span>SLA At Risk: <strong className="text-amber-700">1</strong></span>
            <span>Breached: <strong className="text-ink">0</strong></span>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1.5">
        <h4 className="font-bold text-ink uppercase tracking-wider text-[9px]">Quick Actions</h4>
        <div className="grid grid-cols-4 gap-1 text-center text-[8.5px]">
          <button
            onClick={onRefresh || (() => window.location.reload())}
            className="p-1 bg-canvas border border-line rounded hover:bg-gray-100 transition-colors flex flex-col items-center gap-0.5 font-semibold text-ink"
            title="Refresh record data"
          >
            <RefreshCw size={11} className="text-muted" /> Refresh
          </button>
          <button
            onClick={() => alert("Sharing link copied!")}
            className="p-1 bg-canvas border border-line rounded hover:bg-gray-100 transition-colors flex flex-col items-center gap-0.5 font-semibold text-ink"
            title="Share record"
          >
            <Share2 size={11} className="text-muted" /> Share
          </button>
          <button
            onClick={() => window.print()}
            className="p-1 bg-canvas border border-line rounded hover:bg-gray-100 transition-colors flex flex-col items-center gap-0.5 font-semibold text-ink"
            title="Print record detail"
          >
            <Printer size={11} className="text-muted" /> Print
          </button>
          <button
            onClick={() => alert("Opening Notes...")}
            className="p-1 bg-canvas border border-line rounded hover:bg-gray-100 transition-colors flex flex-col items-center gap-0.5 font-semibold text-ink"
            title="Add notes"
          >
            <FileText size={11} className="text-muted" /> Notes
          </button>
        </div>
      </div>

      {/* FINAL FULFILMENT ACTIONS */}
      <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1">
        <h3 className="text-[9px] font-bold text-ink uppercase tracking-wider mb-0.5">
          Fulfilment Actions
        </h3>

        <button
          onClick={() => alert("Reviewing Fulfilment Exception...")}
          className="w-full px-2 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md font-semibold text-rose-800 text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Review Fulfilment Exception</span>
          <ArrowUpRight size={10} className="text-rose-600" />
        </button>

        <button
          onClick={() => alert("Opening Fulfilment Queue...")}
          className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Open Fulfilment Queue</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Reviewing Quality Checks...")}
          className="w-full px-2 py-1 bg-canvas hover:bg-gray-100 border border-line rounded-md font-semibold text-ink text-left flex items-center justify-between transition-colors text-[9px]"
        >
          <span>Review Quality Checks</span>
          <ArrowUpRight size={10} className="text-muted" />
        </button>

        <button
          onClick={() => alert("Reviewing SLA Breaches...")}
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
