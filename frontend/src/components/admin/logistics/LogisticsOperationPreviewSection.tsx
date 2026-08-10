"use client";

import React, { useState } from "react";
import { Package, ExternalLink, ShieldCheck, Clock, User, Warehouse, Truck, CheckCircle2, FileText, Activity } from "lucide-react";
import { LogisticsLifecycle } from "./LogisticsLifecycle";

export interface OperationPreviewProps {
  operation?: any | null;
}

export function LogisticsOperationPreviewSection({ operation }: OperationPreviewProps) {
  const [activeTab, setActiveTab] = useState("Overview");

  const previewTabs = [
    "Overview", "Fulfilment", "Inventory Allocation", "Picking", "Packing",
    "Dispatch", "Shipment", "Tracking", "Carrier", "Delivery",
    "Proof of Delivery", "Returns", "Claims", "Costs", "Reconciliation",
    "Exceptions", "Linked Records", "Communications", "Activity", "Audit History"
  ];

  // Default rich preview data if operation is null
  const op = operation || {
    id: "FUL-2025-000921",
    fulfilment_ref: "FUL-2025-000921",
    order_ref: "ORD-884910",
    order_date: "May 26, 2025 08:30 AM",
    order_value: "LKR 18,500",
    customer_name: "Kavindi Perera",
    customer_id: "CUST-9921",
    warehouse: "Colombo Central Hub",
    fulfilment_centre: "DC-01 Main Hub",
    carrier_name: "DHL Express",
    carrier_rating: "4.9 / 5.0 (Premier Partner)",
    promised_delivery: "May 26, 2025 06:00 PM",
    current_state: "In Transit - Out for Delivery",
    sla_status: "On Track (Optimal)",
    shipment_ref: "SHP-99201",
    delivery_ref: "DEL-44810",
    tracking_ref: "DHL-SL-88491029",
  };

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden space-y-0">
      {/* HEADER */}
      <div className="p-4 border-b border-line bg-canvas flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Package size={18} className="text-primary-900" />
          <div>
            <h3 className="text-sm font-bold text-ink">Selected Logistics Operation Preview</h3>
            <p className="text-[11px] text-muted">Inline operation details, timeline progression, and linked system records</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1 bg-white border border-line rounded text-ink shadow-sm">
            {op.fulfilment_ref || op.shipment_number || `FUL-2025-${op.id}`}
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
            {op.current_state || "Active"}
          </span>
        </div>
      </div>

      {/* 20 PREVIEW TABS */}
      <div className="border-b border-line bg-white px-4 overflow-x-auto scrollbar-none">
        <div className="flex gap-1.5 text-[11px] font-semibold text-muted py-2 whitespace-nowrap">
          {previewTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-primary-900 text-white font-bold"
                  : "hover:bg-canvas hover:text-ink text-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW CONTENT */}
      <div className="p-5 bg-white space-y-6">
        {/* TOP SUMMARY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[10px] text-muted uppercase font-semibold">Customer Profile</span>
            <div className="font-bold text-ink flex items-center justify-between">
              <span>{op.customer_name || op.customer}</span>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Opening Customer Profile..."); }} className="text-primary-900 hover:underline flex items-center gap-0.5 text-[11px]">
                Profile <ExternalLink size={10} />
              </a>
            </div>
            <div className="text-[10px] text-muted">Ref: {op.customer_id || "CUST-9921"}</div>
          </div>

          <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[10px] text-muted uppercase font-semibold">Order Reference</span>
            <div className="font-bold text-ink">{op.order_ref || op.order_number}</div>
            <div className="text-[10px] text-muted">{op.order_date} • Value: <strong className="text-ink">{op.order_value}</strong></div>
          </div>

          <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[10px] text-muted uppercase font-semibold">Warehouse &amp; Fulfilment</span>
            <div className="font-bold text-ink">{op.warehouse || "Colombo Main DC"}</div>
            <div className="text-[10px] text-muted">Centre: {op.fulfilment_centre || "DC-01 Hub"}</div>
          </div>

          <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[10px] text-muted uppercase font-semibold">Carrier &amp; Service Rating</span>
            <div className="font-bold text-ink">{op.carrier_name || "DHL Express"}</div>
            <div className="text-[10px] text-emerald-700 font-semibold">{op.carrier_rating || "4.9 / 5.0 Rating"}</div>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-2.5 bg-white border border-line rounded-lg">
            <span className="text-[10px] text-muted block">Promised Delivery</span>
            <span className="font-bold text-ink">{op.promised_delivery}</span>
          </div>

          <div className="p-2.5 bg-white border border-line rounded-lg">
            <span className="text-[10px] text-muted block">Current State</span>
            <span className="font-bold text-blue-700">{op.current_state}</span>
          </div>

          <div className="p-2.5 bg-white border border-line rounded-lg">
            <span className="text-[10px] text-muted block">SLA Compliance</span>
            <span className="font-bold text-emerald-700">{op.sla_status}</span>
          </div>

          <div className="p-2.5 bg-white border border-line rounded-lg">
            <span className="text-[10px] text-muted block">Tracking Reference</span>
            <span className="font-mono font-bold text-ink">{op.tracking_ref || "DHL-SL-88491029"}</span>
          </div>
        </div>

        {/* LIFECYCLE TIMELINE SECTION */}
        <div className="pt-2 border-t border-line">
          <LogisticsLifecycle />
        </div>
      </div>
    </div>
  );
}
