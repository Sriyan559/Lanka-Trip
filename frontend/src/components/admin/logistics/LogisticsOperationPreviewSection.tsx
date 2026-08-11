"use client";

import React, { useState } from "react";
import { Package, ExternalLink } from "lucide-react";
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

  // Default rich preview data matching reference screenshot
  const op = operation || {
    id: "FUL-2025-000921",
    fulfilment_ref: "FUL-2025-000921",
    order_ref: "ORD-2025-008921",
    order_date: "May 25, 2025 11:30 AM",
    order_value: "LKR 18,600",
    customer_name: "Araya Perera",
    customer_id: "CUST-8821",
    warehouse: "Colombo Main DC",
    fulfilment_centre: "Kandy FC",
    carrier_name: "DHL Express",
    carrier_rating: "4.8",
    promised_delivery: "May 27, 2025",
    current_state: "In Transit",
    sla_status: "On Track",
    shipment_ref: "SHP-2025-077421",
    delivery_ref: "DEL-2025-058721",
    tracking_ref: "JD01460000725458769",
    cod_amount: "LKR 3,250",
  };

  return (
    <div className="bg-white rounded-xl border border-line shadow-xs overflow-hidden space-y-0 text-[10px]">
      {/* HEADER */}
      <div className="p-2.5 sm:p-3 border-b border-line bg-canvas flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Package size={14} className="text-primary-900" />
          <div>
            <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider">Selected Logistics Operation Preview</h3>
            <p className="text-[9.5px] text-muted">Inline operation details, timeline progression, and linked system records</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-white border border-line rounded text-ink">
            {op.fulfilment_ref || op.shipment_number || `FUL-2025-${op.id}`}
          </span>
          <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
            {op.current_state || "Active"}
          </span>
        </div>
      </div>

      {/* 20 PREVIEW TABS */}
      <div className="border-b border-line bg-white px-2.5 overflow-x-auto scrollbar-thin">
        <div className="flex gap-1 text-[9.5px] font-semibold text-muted py-1.5 whitespace-nowrap">
          {previewTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1 rounded-md transition-colors ${
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
      <div className="p-3 bg-white space-y-3">
        {/* 10 DETAIL CARDS IN 1 DENSE ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-10 gap-1.5 text-[9px]">
          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] block">Customer</span>
            <div className="font-bold text-ink truncate">{op.customer_name}</div>
            <div className="text-[7.5px] text-muted">Araya Perera</div>
          </div>

          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] block">Order Ref</span>
            <div className="font-bold text-ink truncate">{op.order_ref}</div>
            <div className="text-[7.5px] text-muted">{op.order_date}</div>
          </div>

          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] block">Order Value / COD</span>
            <div className="font-bold text-ink truncate">{op.order_value}</div>
            <div className="text-[7.5px] text-muted">COD: {op.cod_amount}</div>
          </div>

          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] block">Warehouse / FC</span>
            <div className="font-bold text-ink truncate">{op.warehouse}</div>
            <div className="text-[7.5px] text-muted">{op.fulfilment_centre}</div>
          </div>

          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] block">Carrier / Rating</span>
            <div className="font-bold text-ink truncate">{op.carrier_name}</div>
            <div className="text-[7.5px] text-emerald-700 font-semibold">Rating: {op.carrier_rating} ★</div>
          </div>

          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] block">Promised Delivery</span>
            <div className="font-bold text-ink truncate">{op.promised_delivery}</div>
            <div className="text-[7.5px] text-muted">2 Days Remaining</div>
          </div>

          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] block">Current State</span>
            <div className="font-bold text-blue-700 truncate">{op.current_state}</div>
            <div className="text-[7.5px] text-muted">Hub Transit</div>
          </div>

          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] block">SLA Status</span>
            <div className="font-bold text-emerald-700 truncate">{op.sla_status}</div>
            <div className="text-[7.5px] text-muted">Exception: None</div>
          </div>

          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] block">Shipment / Delivery</span>
            <div className="font-mono text-ink font-semibold text-[8px] truncate">{op.shipment_ref}</div>
            <div className="font-mono text-muted text-[7.5px] truncate">{op.delivery_ref}</div>
          </div>

          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] block">Tracking Ref</span>
            <div className="font-mono font-bold text-ink text-[8px] truncate">{op.tracking_ref}</div>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Tracking Details..."); }} className="text-primary-900 text-[7.5px] hover:underline flex items-center gap-0.5">
              Live Track <ExternalLink size={8} />
            </a>
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
