"use client";

import React from "react";
import { RefreshCw } from "lucide-react";

interface ShipmentServiceHealthStripProps {
  onRefresh?: () => void;
}

export function ShipmentServiceHealthStrip({ onRefresh }: ShipmentServiceHealthStripProps) {
  const healthServices = [
    { label: "Shipment Service Health", status: "Healthy", isGreen: true },
    { label: "Carrier Gateway Health", status: "Healthy", isGreen: true },
    { label: "Tracking Service Health", status: "Healthy", isGreen: true },
    { label: "Pickup Service Health", status: "Healthy", isGreen: true },
    { label: "Delivery Notification Health", status: "Healthy", isGreen: true },
    { label: "Proof-of-Delivery Service Health", status: "Healthy", isGreen: true },
    { label: "COD Service Health", status: "Healthy", isGreen: true },
    { label: "Reconciliation Service Health", status: "Healthy", isGreen: true },
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
        <div>Access Context: <strong className="text-ink font-semibold">Full Access</strong></div>
        <div>Record Version Policy: <strong className="text-ink font-semibold">v2.6</strong></div>
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
