"use client";

import React from "react";
import { Activity, ShieldCheck, Cpu } from "lucide-react";

export function FulfilmentServiceHealth() {
  const healthServices = [
    { label: "Warehouse Service Health", status: "Healthy", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { label: "Inventory Allocation Health", status: "Healthy", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { label: "Picking Service Health", status: "Healthy", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { label: "Packing Service Health", status: "Stable", color: "text-amber-700 bg-amber-50 border-amber-200" },
    { label: "Shipment Service Health", status: "Healthy", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line p-3 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 font-bold text-ink uppercase tracking-wider text-[11px] pr-2 border-r border-line flex-shrink-0">
        <Activity size={14} className="text-primary-900" />
        Fulfilment Service Health
      </div>

      <div className="flex flex-wrap items-center gap-2 flex-1">
        {healthServices.map((service, idx) => (
          <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold bg-canvas border-line">
            <span className={`w-1.5 h-1.5 rounded-full ${service.status === 'Stable' ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
            <span className="text-muted">{service.label}:</span>
            <span className={`font-bold px-1.5 py-0.2 rounded border ${service.color}`}>{service.status}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 text-[11px] text-muted pl-2 border-l border-line flex-shrink-0">
        <div className="flex items-center gap-1">
          <ShieldCheck size={13} className="text-emerald-600" />
          <span>Access Context: <strong className="text-ink font-semibold">Full Access</strong></span>
        </div>
        <div className="flex items-center gap-1">
          <Cpu size={13} className="text-muted" />
          <span>Record Version: <strong className="text-ink font-semibold">v3.4.7</strong></span>
        </div>
      </div>
    </div>
  );
}
