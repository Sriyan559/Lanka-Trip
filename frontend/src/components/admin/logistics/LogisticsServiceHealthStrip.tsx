"use client";

import React from "react";
import { RefreshCw } from "lucide-react";

interface LogisticsServiceHealthStripProps {
  onRefresh?: () => void;
}

export function LogisticsServiceHealthStrip({ onRefresh }: LogisticsServiceHealthStripProps) {
  const healthServices = [
    { label: "Warehouse Service Health", status: "No health data", isGreen: false },
    { label: "Allocation Service Health", status: "No health data", isGreen: false },
    { label: "Shipment Service Health", status: "No health data", isGreen: false },
    { label: "Carrier Tracking Health", status: "Not configured", isGreen: false },
    { label: "Delivery Notification Health", status: "Not configured", isGreen: false },
    { label: "Return Logistics Health", status: "No health data", isGreen: false },
    { label: "Reconciliation Service Health", status: "No health data", isGreen: false },
  ];

  return (
    <div className="bg-white rounded-xl border border-line p-2 sm:p-2.5 shadow-xs flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[9.5px]">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {healthServices.map((service, idx) => (
          <div key={idx} className="flex items-center gap-1 font-medium">
            <span className={`w-1.5 h-1.5 rounded-full ${service.isGreen ? "bg-emerald-500" : "bg-amber-500"} animate-pulse`} />
            <span className="text-muted">{service.label}:</span>
            <span className={`font-bold ${service.isGreen ? "text-emerald-700" : "text-amber-700"}`}>{service.status}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2.5 text-muted border-l border-line pl-2.5 flex-shrink-0">
        <div>Access: <strong className="text-ink font-semibold">Assigned business context</strong></div>
        <div>Record Version: <strong className="text-ink font-semibold">v2.4</strong></div>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            className="p-0.5 rounded hover:bg-canvas text-muted hover:text-ink transition-colors"
            title="Refresh service health"
          >
            <RefreshCw size={11} />
          </button>
        )}
      </div>
    </div>
  );
}
