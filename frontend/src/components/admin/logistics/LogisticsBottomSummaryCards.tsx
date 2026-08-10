import React from "react";
import {
  Workflow, Boxes, Warehouse, Truck, Award, ShieldAlert, CheckSquare, RotateCcw, FileText, Scale, Activity
} from "lucide-react";

export function LogisticsBottomSummaryCards() {
  const cards = [
    { title: "Fulfilment Order Workflow", value: "0 Active Orders", desc: "No pending allocations", icon: <Workflow size={16} className="text-blue-600" /> },
    { title: "Inventory Allocation Summary", value: "0 Allocated SKUs", desc: "Stock availability 100%", icon: <Boxes size={16} className="text-purple-600" /> },
    { title: "Warehouse Operations Summary", value: "0 Picking Tasks", desc: "3 Fulfilment Hubs Operational", icon: <Warehouse size={16} className="text-emerald-600" /> },
    { title: "Shipment Operations Summary", value: "0 Active Shipments", desc: "0 Dispatched Today", icon: <Truck size={16} className="text-sky-600" /> },
    { title: "Carrier Performance Summary", value: "0 Assigned Shipments", desc: "4 Logistics Partners Active", icon: <Award size={16} className="text-amber-600" /> },
    { title: "Delivery SLA & Exceptions", value: "0 Active SLA Breaches", desc: "0 Exception Cases", icon: <ShieldAlert size={16} className="text-emerald-600" /> },
    { title: "Proof of Delivery Summary", value: "0 POD Captures", desc: "Digital signature requirement 100%", icon: <CheckSquare size={16} className="text-emerald-600" /> },
    { title: "Reverse Logistics Summary", value: "0 Return Requests", desc: "0 Awaiting Collection", icon: <RotateCcw size={16} className="text-purple-600" /> },
    { title: "Logistics Claims Summary", value: "0 Open Claims", desc: "LKR 0 Claimed Value", icon: <FileText size={16} className="text-rose-600" /> },
    { title: "Logistics Reconciliation Summary", value: "LKR 0 Reconciled", desc: "0 Discrepancies Flagged", icon: <Scale size={16} className="text-blue-600" /> },
  ];

  return (
    <div className="space-y-6">
      {/* 10 BOTTOM SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((c, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-line shadow-sm p-4 flex flex-col justify-between space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-canvas border border-line">{c.icon}</div>
              <h4 className="text-[11px] font-bold text-ink truncate">{c.title}</h4>
            </div>
            <div>
              <div className="text-sm font-bold text-ink">{c.value}</div>
              <div className="text-[10px] text-muted truncate mt-0.5">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT LOGISTICS ACTIVITY */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-primary-900" />
            <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider">Recent Logistics Activity</h3>
          </div>
          <span className="text-[11px] text-muted">Audit Log & System Audit Stream</span>
        </div>

        <div className="p-6 bg-canvas border border-dashed border-line rounded-lg text-center text-xs text-muted">
          No logistics activity recorded yet.
        </div>
      </div>
    </div>
  );
}
