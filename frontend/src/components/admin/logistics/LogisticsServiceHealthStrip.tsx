import React from "react";
import { CheckCircle2, ShieldCheck, Activity, Radio, Cpu } from "lucide-react";

export function LogisticsServiceHealthStrip() {
  const healthServices = [
    { label: "Warehouse Service Health", status: "Healthy / Active", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { label: "Allocation Service Health", status: "Healthy", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { label: "Shipment Service Health", status: "Operational", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { label: "Carrier Tracking Health", status: "Operational", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { label: "Delivery Notification Health", status: "Active", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { label: "Return Logistics Health", status: "Operational", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { label: "Reconciliation Service Health", status: "Active", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line p-3.5 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 font-bold text-ink uppercase tracking-wider text-[11px] pr-2 border-r border-line">
        <Activity size={14} className="text-primary-900" />
        Service Health
      </div>

      <div className="flex flex-wrap items-center gap-2 flex-1">
        {healthServices.map((service, idx) => (
          <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold bg-canvas border-line">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-muted">{service.label}:</span>
            <span className="text-emerald-700 font-bold">{service.status}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 text-[11px] text-muted pl-2 border-l border-line">
        <div className="flex items-center gap-1">
          <ShieldCheck size={13} className="text-emerald-600" />
          <span>Access: <strong className="text-ink font-semibold">Admin (Full)</strong></span>
        </div>
        <div className="flex items-center gap-1">
          <Cpu size={13} className="text-muted" />
          <span>Version: <strong className="text-ink font-semibold">v2.4.0</strong></span>
        </div>
      </div>
    </div>
  );
}
