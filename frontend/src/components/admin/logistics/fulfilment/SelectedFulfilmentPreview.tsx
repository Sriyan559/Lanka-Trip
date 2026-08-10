"use client";

import React, { useState } from "react";
import { Package, ExternalLink } from "lucide-react";
import { FulfilmentLifecycle } from "./FulfilmentLifecycle";

export interface SelectedFulfilmentPreviewProps {
  operation?: any | null;
}

export function SelectedFulfilmentPreview({ operation }: SelectedFulfilmentPreviewProps) {
  const [activeTab, setActiveTab] = useState("Overview");

  const previewTabs = [
    "Overview", "Order", "Items", "Inventory Allocation", "Reservations",
    "Transfers", "Picking", "Packing", "Quality Checks", "Dispatch",
    "Shipment", "Holds", "Exceptions", "Linked Records", "Communications",
    "Activity", "Audit History"
  ];

  // Rich sample operational record matching reference screenshot
  const op = operation || {
    id: "FUL25-0001248",
    fulfilment_ref: "FUL25-0001248",
    order_ref: "ORD25-0048721",
    customer_name: "Maduni Perera",
    customer_email: "maduni.perera@gmail.com",
    customer_phone: "+94 76 123 4567",
    customer_location: "Colombo, Sri Lanka",
    order_date: "May 26, 2025 18:36",
    order_channel: "Web",
    payment_status: "Prepaid - LKR 24,650.00",
    warehouse: "WH-CMB-01",
    warehouse_name: "Main Warehouse Colombo",
    available_capacity: "72%",
    zone: "Colombo North",
    carrier: "PickMe Delivery",
    carrier_service: "Standard",
    est_delivery: "May 27 12:00 PM",
    tracking_ref: "SHP25-006721",
    allocation_status: "Picked",
    reserved_qty: "18/18 (100%)",
    short_qty: "0",
    transfer_req: "No",
    picking_status: "Picked",
    picked_qty: "18/18 (100%)",
    picker: "Nimal S.",
    picking_completed: "May 26 09:32",
    packing_status: "Packed",
    packed_qty: "14/18 (80%)",
    packer: "Udara K.",
    packing_state: "In Progress",
    quality_status: "Passed",
    quality_checks: "2/2",
    quality_by: "Nipun M.",
    quality_time: "May 26 10:05",
    shipment_status: "Ready for Dispatch",
    shipment_ref: "SHP25-006721",
    awb: "Pending",
    est_dispatch: "May 27 12:00",
    exception_status: "None",
    open_exceptions: "0",
  };

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden text-xs space-y-0">
      {/* HEADER */}
      <div className="p-4 border-b border-line bg-canvas flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Package size={18} className="text-primary-900" />
          <div>
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <span>Selected Fulfilment Preview:</span>
              <span className="font-mono text-primary-900 font-bold">{op.fulfilment_ref}</span>
              <span className="text-muted font-normal text-xs">Order: <strong className="font-mono text-ink">{op.order_ref}</strong></span>
            </h3>
            <p className="text-[11px] text-muted">Comprehensive order manifest, warehouse execution details, and lifecycle audit</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
            {op.allocation_status || "Active"}
          </span>
        </div>
      </div>

      {/* 17 PREVIEW TABS */}
      <div className="border-b border-line bg-white px-4 overflow-x-auto scrollbar-none">
        <div className="flex gap-1.5 text-[11px] font-semibold text-muted py-2 whitespace-nowrap">
          {previewTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg transition-colors ${
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

      {/* OVERVIEW DETAIL CARDS GRID */}
      <div className="p-5 bg-white space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
          {/* 1. Customer Details */}
          <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-1">
              Customer Details
            </span>
            <div className="font-bold text-ink">{op.customer_name}</div>
            <div className="text-[10px] text-muted">{op.customer_email}</div>
            <div className="text-[10px] text-muted">{op.customer_phone}</div>
            <div className="text-[10px] text-muted">{op.customer_location}</div>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Viewing Customer Profile..."); }} className="text-primary-900 hover:underline text-[10px] font-bold inline-flex items-center gap-0.5 pt-1">
              View Profile <ExternalLink size={10} />
            </a>
          </div>

          {/* 2. Order Details */}
          <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-1">
              Order Details
            </span>
            <div className="font-mono font-bold text-ink">{op.order_ref}</div>
            <div className="text-[10px] text-muted">{op.order_date}</div>
            <div className="text-[10px] text-muted">Channel: <strong className="text-ink">{op.order_channel}</strong></div>
            <div className="text-[10px] text-emerald-700 font-bold">{op.payment_status}</div>
          </div>

          {/* 3. Warehouse Assignment */}
          <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-1">
              Warehouse Assignment
            </span>
            <div className="font-mono font-bold text-ink">{op.warehouse}</div>
            <div className="text-[10px] text-muted">{op.warehouse_name}</div>
            <div className="text-[10px] text-muted">Available Capacity: <strong className="text-emerald-700">{op.available_capacity}</strong></div>
            <div className="text-[10px] text-muted">Zone: {op.zone}</div>
          </div>

          {/* 4. Carrier / Delivery Partner */}
          <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-1">
              Carrier / Delivery Partner
            </span>
            <div className="font-bold text-ink">{op.carrier}</div>
            <div className="text-[10px] text-muted">Service: {op.carrier_service}</div>
            <div className="text-[10px] text-muted">Est. Delivery: <strong className="text-ink">{op.est_delivery}</strong></div>
            <div className="text-[10px] text-muted">Tracking: <span className="font-mono">{op.tracking_ref}</span></div>
          </div>

          {/* 5. Allocation Summary */}
          <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-1">
              Allocation Summary
            </span>
            <div className="text-[10px]">Status: <strong className="text-emerald-700">{op.allocation_status}</strong></div>
            <div className="text-[10px]">Reserved: <strong className="text-emerald-700">{op.reserved_qty}</strong></div>
            <div className="text-[10px]">Short Qty: <strong className="text-ink">{op.short_qty}</strong></div>
            <div className="text-[10px]">Transfer Required: <strong className="text-muted">{op.transfer_req}</strong></div>
          </div>

          {/* 6. Picking Summary */}
          <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-1">
              Picking Summary
            </span>
            <div className="text-[10px]">Status: <strong className="text-emerald-700">{op.picking_status}</strong></div>
            <div className="text-[10px]">Picked: <strong className="text-emerald-700">{op.picked_qty}</strong></div>
            <div className="text-[10px]">Picker: <strong className="text-ink">{op.picker}</strong></div>
            <div className="text-[10px]">Completed: <strong className="text-muted">{op.picking_completed}</strong></div>
          </div>

          {/* 7. Packing Summary */}
          <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-1">
              Packing Summary
            </span>
            <div className="text-[10px]">Status: <strong className="text-blue-700">{op.packing_status}</strong></div>
            <div className="text-[10px]">Packed: <strong className="text-blue-700">{op.packed_qty}</strong></div>
            <div className="text-[10px]">Packer: <strong className="text-ink">{op.packer}</strong></div>
            <div className="text-[10px] text-amber-700 font-semibold">{op.packing_state}</div>
          </div>

          {/* 8. Quality Checks */}
          <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-1">
              Quality Checks
            </span>
            <div className="text-[10px]">Status: <strong className="text-emerald-700">{op.quality_status}</strong></div>
            <div className="text-[10px]">Checks: <strong className="text-ink">{op.quality_checks}</strong></div>
            <div className="text-[10px]">Checked By: <strong className="text-ink">{op.quality_by}</strong></div>
            <div className="text-[10px] text-muted">{op.quality_time}</div>
          </div>

          {/* 9. Shipment Summary */}
          <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-1">
              Shipment Summary
            </span>
            <div className="text-[10px]">Status: <strong className="text-blue-700">{op.shipment_status}</strong></div>
            <div className="text-[10px]">Shipment: <span className="font-mono font-bold">{op.shipment_ref}</span></div>
            <div className="text-[10px]">AWB: <strong className="text-muted">{op.awb}</strong></div>
            <div className="text-[10px]">Est. Dispatch: <strong className="text-ink">{op.est_dispatch}</strong></div>
          </div>

          {/* 10. Exception Summary */}
          <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-1">
              Exception Summary
            </span>
            <div className="text-[10px]">Status: <strong className="text-emerald-700">{op.exception_status}</strong></div>
            <div className="text-[10px]">Open Exceptions: <strong className="text-ink">{op.open_exceptions}</strong></div>
            <div className="text-[10px]">Last Exception: <span className="text-muted">-</span></div>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Viewing Exceptions..."); }} className="text-primary-900 hover:underline text-[10px] font-bold block pt-0.5">
              View All (0)
            </a>
          </div>
        </div>

        {/* CUSTOMER FULFILMENT / LOGISTICS LIFECYCLE */}
        <div className="pt-2 border-t border-line">
          <FulfilmentLifecycle />
        </div>
      </div>
    </div>
  );
}
