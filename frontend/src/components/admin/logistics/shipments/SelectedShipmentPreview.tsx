"use client";

import React, { useState } from "react";
import { Package, ExternalLink } from "lucide-react";
import { ShipmentLifecycle } from "./ShipmentLifecycle";

export interface SelectedShipmentPreviewProps {
  operation?: any | null;
}

export function SelectedShipmentPreview({ operation }: SelectedShipmentPreviewProps) {
  const [activeTab, setActiveTab] = useState("Overview");

  const previewTabs = [
    "Overview", "Fulfilment", "Packages", "Carrier", "Pickup", "Tracking",
    "Timeline", "Delivery", "Proof of Delivery", "COD", "Costs", "Returns",
    "Holds", "Exceptions", "Reconciliation", "Linked Records", "Communications", "Activity", "Audit History"
  ];

  // Default rich preview data matching reference screenshot
  const op = operation || {
    id: "SHP-2025-006921",
    shipment_ref: "SHP-2025-006921",
    tracking_ref: "TRK-DHL-77448821",
    fulfilment_ref: "FUL-2025-000921",
    order_ref: "ORD-2025-008921",
    order_date: "May 25, 2025 11:30 AM",
    customer_name: "Araya Perera",
    supplier_name: "Glow Essentials",
    origin_warehouse: "Colombo Central Hub",
    fulfilment_centre: "Kandy FC",
    carrier_name: "DHL Express",
    courier_name: "Express Delivery",
    service_level: "Standard Express",
    destination: "Western Province",
    promised_delivery: "May 27, 2025",
    current_state: "In Transit",
    sla_status: "On Track",
    package_count: 2,
    weight: "1.45 kg",
    volumetric_weight: "1.80 kg",
    shipment_value: "4,850.00",
    shipping_cost: "450.00",
    cod_amount: "0.00",
    sla_score: "98%",
    pickup_request: "May 26, 08:15 AM",
    pickup_scheduled: "May 26, 09:00 AM",
    driver: "Gaminda S.",
    hub_handoff: "May 26, 09:45 AM",
    latest_scan: "In Transit",
    last_location: "Piliyandala Hub",
    last_scan_time: "May 26, 01:15 PM",
    tracking_completeness: 90,
  };

  return (
    <div className="bg-white rounded-xl border border-line shadow-xs overflow-hidden space-y-0 text-[10px]">
      {/* HEADER */}
      <div className="p-2.5 sm:p-3 border-b border-line bg-canvas flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Package size={14} className="text-primary-900" />
          <div>
            <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider">
              Selected Shipment Preview: <span className="font-mono text-primary-900">{op.shipment_ref}</span>
            </h3>
            <p className="text-[9.5px] text-muted">Inline shipment details, carrier tracking, package summary &amp; lifecycle progression</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
            {op.current_state || "In Transit"}
          </span>
          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
            {op.sla_status || "On Track"}
          </span>
        </div>
      </div>

      {/* 19 PREVIEW TABS */}
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
        {/* 9 DETAIL CARDS IN 1 DENSE ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-9 gap-1.5 text-[9px]">
          {/* 1. Shipment Overview / Identity */}
          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] font-bold block">Shipment Overview / Identity</span>
            <div className="font-mono font-bold text-primary-900 text-[8.5px]">{op.shipment_ref}</div>
            <div className="text-[7.5px] text-muted">Order: <strong className="text-ink">{op.order_ref}</strong></div>
            <div className="text-[7.5px] text-muted">Customer: <strong className="text-ink">{op.customer_name}</strong></div>
            <div className="text-[7.5px] text-muted">Seller: <strong className="text-ink">{op.supplier_name}</strong></div>
            <div className="text-[7.5px] text-muted">Origin: <strong className="text-ink">{op.origin_warehouse}</strong></div>
            <div className="text-[7.5px] text-muted">Carrier: <strong className="text-ink">{op.carrier_name}</strong></div>
            <div className="text-[7.5px] font-bold text-ink">Value: LKR {op.shipment_value}</div>
          </div>

          {/* 2. Package Summary */}
          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] font-bold block">Package Summary</span>
            <div className="flex justify-between text-[7.5px]"><span>Package Count:</span><strong className="text-ink">{op.package_count}</strong></div>
            <div className="flex justify-between text-[7.5px]"><span>Total Weight:</span><strong className="text-ink">{op.weight}</strong></div>
            <div className="flex justify-between text-[7.5px]"><span>Coverage Area:</span><strong className="text-ink">Western Zone</strong></div>
            <div className="flex justify-between text-[7.5px]"><span>Volumetric Wt:</span><strong className="text-ink">{op.volumetric_weight}</strong></div>
            <div className="flex justify-between text-[7.5px]"><span>Fragile:</span><strong className="text-ink">No</strong></div>
            <div className="flex justify-between text-[7.5px]"><span>Special Handling:</span><strong className="text-ink">No</strong></div>
          </div>

          {/* 3. Carrier & Service Assignment */}
          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] font-bold block">Carrier &amp; Service Assignment</span>
            <div className="font-bold text-ink text-[8.5px] truncate">{op.carrier_name} / {op.courier_name}</div>
            <div className="text-[7.5px] text-muted">Service: <strong className="text-ink">{op.service_level}</strong></div>
            <div className="text-[7.5px] text-muted">Coverage: <strong className="text-ink">Islandwide</strong></div>
            <div className="text-[7.5px] text-muted">Est Transit: <strong className="text-ink">1 Business Day</strong></div>
            <div className="text-[7.5px] text-muted">Service Rate: <strong className="text-ink">LKR {op.shipping_cost}</strong></div>
            <div className="text-[7.5px] text-emerald-700 font-bold">SLA Score: {op.sla_score}</div>
          </div>

          {/* 4. Pickup Operations */}
          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] font-bold block">Pickup Operations</span>
            <div className="text-[7.5px] text-muted">Req: <strong className="text-ink">{op.pickup_request}</strong></div>
            <div className="text-[7.5px] text-muted">Sched: <strong className="text-ink">{op.pickup_scheduled}</strong></div>
            <div className="text-[7.5px] text-muted">Driver: <strong className="text-ink">{op.driver}</strong></div>
            <div className="text-[7.5px] text-muted">Handoff: <strong className="text-ink">{op.hub_handoff}</strong></div>
            <div className="text-[7.5px] font-bold text-emerald-700 mt-1">Pickup Completed</div>
          </div>

          {/* 5. Tracking Operations */}
          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] font-bold block">Tracking Operations</span>
            <div className="text-[7.5px] text-muted">Scan: <strong className="text-blue-700 font-semibold">{op.latest_scan}</strong></div>
            <div className="text-[7.5px] text-muted">Location: <strong className="text-ink">{op.last_location}</strong></div>
            <div className="text-[7.5px] text-muted">Time: <strong className="text-ink">{op.last_scan_time}</strong></div>
            <div className="text-[7.5px] text-muted">Completeness: <strong className="text-emerald-700 font-bold">{op.tracking_completeness}%</strong></div>
            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden mt-0.5">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${op.tracking_completeness}%` }} />
            </div>
            <div className="text-[7.5px] text-muted">Anomaly: <strong className="text-emerald-700">None</strong></div>
          </div>

          {/* 6. Delivery Operations */}
          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] font-bold block">Delivery Operations</span>
            <div className="flex justify-between text-[7.5px]"><span>Attempts:</span><strong className="text-ink">0</strong></div>
            <div className="text-[7.5px] text-muted">Route Status: <strong className="text-blue-700 font-semibold">En Route</strong></div>
            <div className="text-[7.5px] text-muted">Hub: <strong className="text-ink">Western Hub</strong></div>
            <div className="text-[7.5px] text-muted">ETA: <strong className="text-ink">{op.promised_delivery}</strong></div>
            <div className="text-[7.5px] text-muted">POD: <strong className="text-amber-700 font-semibold">Pending</strong></div>
          </div>

          {/* 7. Reconciliation Snapshot */}
          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] font-bold block">Reconciliation Snapshot</span>
            <div className="text-[7.5px] text-muted">Status: <strong className="text-amber-700 font-semibold">Pending</strong></div>
            <div className="text-[7.5px] text-muted">Last Recon: <strong className="text-ink">May 26, 03:20 PM</strong></div>
            <div className="text-[7.5px] text-muted">Variance: <strong className="text-emerald-700 font-bold">LKR 0.00</strong></div>
            <div className="text-[7.5px] text-muted">Invoice Matched: <strong className="text-emerald-700 font-bold">Yes</strong></div>
          </div>

          {/* 8. Shipment SLA Summary */}
          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] font-bold block">Shipment SLA Summary</span>
            <div className="text-[7.5px] text-muted">Promised: <strong className="text-ink">{op.promised_delivery}</strong></div>
            <div className="text-[7.5px] text-muted">Commitment: <strong className="text-emerald-700 font-bold">91%</strong></div>
            <div className="text-[7.5px] text-muted">SLA Status: <strong className="text-emerald-700 font-bold">On Track</strong></div>
            <div className="text-[7.5px] text-muted">Breach Risk: <strong className="text-emerald-700 font-bold">Low</strong></div>
          </div>

          {/* 9. Recent Shipment Activity */}
          <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5">
            <span className="text-muted uppercase text-[7.5px] font-bold block">Recent Activity</span>
            <div className="text-[7.5px] text-muted truncate">• In Transit Scan <span className="font-mono ml-0.5 text-[7px]">10:15 AM</span></div>
            <div className="text-[7.5px] text-muted truncate">• Departed Hub <span className="font-mono ml-0.5 text-[7px]">09:45 AM</span></div>
            <div className="text-[7.5px] text-muted truncate">• Collected DC-01 <span className="font-mono ml-0.5 text-[7px]">09:00 AM</span></div>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Opening activity log..."); }} className="text-primary-900 text-[7.5px] hover:underline block pt-0.5">
              View All Activity
            </a>
          </div>
        </div>

        {/* LIFECYCLE TIMELINE SECTION */}
        <div className="pt-2 border-t border-line">
          <ShipmentLifecycle />
        </div>
      </div>
    </div>
  );
}
