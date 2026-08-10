"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface FacilityStaleWarningProps {
  onRefresh?: () => void;
}

export function FacilityStaleWarning({ onRefresh }: FacilityStaleWarningProps) {
  return (
    <div className="bg-amber-50/90 border border-amber-200 text-amber-900 px-3 py-2 rounded-xl text-[10px] flex flex-col md:flex-row items-start md:items-center justify-between gap-2 shadow-sm">
      <div className="flex items-center gap-2">
        <AlertTriangle size={14} className="text-amber-600 flex-shrink-0" />
        <span className="font-medium">
          This facility was updated by another administrator or logistics service. Refresh before changing capacity, service availability, capabilities, maintenance, holds or operational status.
        </span>
      </div>

      <div className="flex items-center gap-3 text-[10px] text-amber-800 flex-shrink-0">
        <div>Updated by: <strong className="font-semibold text-amber-950">Logistics Service</strong></div>
        <div>Last Updated: <strong className="font-semibold text-amber-950">31 May 2025 09:58 AM</strong></div>
        <div>Record Version: <strong className="font-semibold text-amber-950">v2.4</strong></div>
        <button
          type="button"
          onClick={onRefresh || (() => alert("Refreshed facility record!"))}
          className="px-2 py-0.5 bg-white border border-amber-300 rounded font-bold text-amber-900 hover:bg-amber-100 transition-colors flex items-center gap-1 shadow-xs"
        >
          <RefreshCw size={11} />
          <span>Refresh</span>
        </button>
      </div>
    </div>
  );
}

export function FacilityActionBar() {
  const actions = [
    { label: "Adjust Capacity", onClick: () => alert("Adjusting Facility Capacity...") },
    { label: "Schedule Maintenance", onClick: () => alert("Scheduling Maintenance...") },
    { label: "Place Facility Hold", onClick: () => alert("Placing Facility Hold...") },
    { label: "Route Orders", onClick: () => alert("Routing Orders...") },
    { label: "Rebalance Capacity", onClick: () => alert("Rebalancing Capacity...") },
    { label: "Open Pick Queue", onClick: () => alert("Opening Pick Queue...") },
    { label: "Start Dispatch Review", onClick: () => alert("Starting Dispatch Review...") },
    { label: "Review Returns", onClick: () => alert("Reviewing Returns...") },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 bg-white p-2.5 rounded-xl border border-line shadow-sm">
      {actions.map((act, i) => (
        <button
          key={i}
          type="button"
          onClick={act.onClick}
          className="px-2.5 py-1 bg-canvas hover:bg-gray-100 border border-line text-ink text-[10px] font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <span>{act.label}</span>
        </button>
      ))}
    </div>
  );
}
