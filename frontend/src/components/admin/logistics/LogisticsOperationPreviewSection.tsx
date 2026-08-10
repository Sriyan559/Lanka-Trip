"use client";

import React, { useState } from "react";
import { Package, Clock, CheckCircle2, AlertCircle, ChevronRight, FileText } from "lucide-react";

export interface OperationPreviewProps {
  operation?: any | null;
}

export function LogisticsOperationPreviewSection({ operation }: OperationPreviewProps) {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = [
    "Overview", "Fulfilment", "Inventory Allocation", "Picking", "Packing",
    "Dispatch", "Shipment", "Tracking", "Carrier", "Delivery",
    "Proof of Delivery", "Returns", "Claims", "Costs", "Reconciliation",
    "Exceptions", "Linked Records", "Communications", "Activity", "Audit History"
  ];

  const stages = [
    { name: "Order Created", status: "completed" },
    { name: "Allocated", status: "completed" },
    { name: "Picking", status: "completed" },
    { name: "Packing", status: "completed" },
    { name: "Ready for Dispatch", status: "active" },
    { name: "Dispatched", status: "pending" },
    { name: "In Transit", status: "pending" },
    { name: "Out for Delivery", status: "pending" },
    { name: "Delivered", status: "pending" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden space-y-0">
      {/* SECTION HEADER */}
      <div className="p-5 border-b border-line bg-canvas flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package size={18} className="text-primary-900" />
          <div>
            <h3 className="text-sm font-bold text-ink">Selected Logistics Operation Preview</h3>
            <p className="text-[11px] text-muted">Detailed operational breakdown and lifecycle progression</p>
          </div>
        </div>

        {operation ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-white border border-line rounded text-ink">
              {operation.shipment_number || operation.reference || `ID #${operation.id}`}
            </span>
          </div>
        ) : (
          <span className="text-xs text-muted italic">No operation selected</span>
        )}
      </div>

      {/* PREVIEW TABS */}
      <div className="border-b border-line bg-white px-5 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 text-[11px] font-semibold text-muted py-2 whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-primary-900 text-white"
                  : "hover:bg-canvas hover:text-ink"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* LIFECYCLE STEPPER */}
      <div className="p-5 border-b border-line bg-white">
        <h4 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-4">
          Customer Fulfilment / Logistics Lifecycle
        </h4>

        {operation ? (
          <div className="flex items-center justify-between overflow-x-auto pb-2 gap-2 text-xs">
            {stages.map((stage, idx) => (
              <div key={idx} className="flex items-center gap-2 flex-shrink-0">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] ${
                    stage.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                    stage.status === 'active' ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {stage.status === 'completed' ? <CheckCircle2 size={14} /> : idx + 1}
                  </div>
                  <span className="text-[10px] font-medium text-ink truncate max-w-[90px] text-center">{stage.name}</span>
                </div>
                {idx < stages.length - 1 && <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-canvas border border-dashed border-line rounded-lg text-center text-xs text-muted">
            No active lifecycle available. Select a shipment from the table above to view real-time lifecycle progression.
          </div>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className="p-6 text-xs text-muted bg-white">
        {operation ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-ink">
            <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
              <span className="text-[10px] text-muted uppercase">Shipment Reference</span>
              <div className="font-bold text-sm">{operation.shipment_number || `SHP-${operation.id}`}</div>
            </div>
            <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
              <span className="text-[10px] text-muted uppercase">Tracking Number</span>
              <div className="font-bold text-sm">{operation.tracking_number || "N/A"}</div>
            </div>
            <div className="p-3 bg-canvas border border-line rounded-lg space-y-1">
              <span className="text-[10px] text-muted uppercase">Carrier / Logistics Partner</span>
              <div className="font-bold text-sm">{operation.carrier_name || "Unassigned"}</div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center space-y-2">
            <FileText size={28} className="text-muted mx-auto opacity-50" />
            <div className="text-sm font-semibold text-ink">No logistics operation selected</div>
            <p className="text-[11px] text-muted max-w-sm mx-auto">
              Create or select a logistics operation from the table above to view comprehensive operational details, package manifests, carrier assignments, and tracking timelines.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
