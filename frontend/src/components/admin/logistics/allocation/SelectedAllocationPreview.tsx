"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface SelectedAllocationPreviewProps {
  allocation?: any;
}

export function SelectedAllocationPreview({ allocation }: SelectedAllocationPreviewProps) {
  const [activeTab, setActiveTab] = useState("Overview");

  const previewTabs = [
    "Overview", "Demand", "Product", "Inventory Sources", "Reservation",
    "Allocation", "Batch / Expiry", "Transfer", "Substitution", "Backorder",
    "Holds", "Exceptions", "SLA", "Linked Records", "Communications", "Activity", "Audit History"
  ];

  const alloc = allocation || {
    id: "ALLOC-2025-008921",
    ref: "ALLOC-2025-008921",
    order_ref: "ORD-2025-0108921",
    product: "Ceylon Glow Serum",
    sku: "SKU-CGS-001",
    status: "Fully Allocated",
    ordered_qty: 120,
    service_level: "Standard",
    dest_wh: "Kandy DC (K-01-01)",
    req_date: "25 May 2025 09:12 AM",
    res_ref: "RES-2025-007621",
    res_status: "Active",
    res_qty: 120,
    res_expiry: "15 Jun 2025",
    held_by: "Allocation Engine",
    held_at: "26 May 2025 09:15 AM",
    source_wh: "Colombo DC (A-01-01)",
    alloc_qty: 120,
    strategy: "FEFO",
    alloc_time: "26 May 2025 09:16 AM",
    accuracy: "99.7%",
    batch: "BAT-0163",
    batch_date: "16 Dec 2024",
    expiry_date: "15 Jul 2025",
    shelf_life: "119 Days",
    expiry_comp: "Compliant",
    fefo_rank: "1 of 3",
    transfer_req: "No",
    transfer_ref: "—",
    transfer_status: "Not Required",
    transfer_eta: "—",
    transfer_lead: "Not Applicable",
    sub_offered: "No",
    backorder: "No",
    backorder_qty: 0,
    disposition: "Not Applicable",
    on_hold: "No",
    hold_reason: "None",
    exceptions: "None",
    blocking: "None",
    sla_status: "On Track",
    sla_target: "27 May 2025",
    sla_due: "27 May 2025",
    sla_breach: "No",
    sla_compliance: "100%",
  };

  const lifecycleStages = [
    { num: 1, name: "Demand Created", date: "26 May 09:12", state: "completed" },
    { num: 2, name: "Demand Validated", date: "26 May 09:13", state: "completed" },
    { num: 3, name: "Availability Checked", date: "26 May 09:13", state: "completed" },
    { num: 4, name: "Eligible Sources Identified", date: "26 May 09:14", state: "completed" },
    { num: 5, name: "Reservation Requested", date: "26 May 09:14", state: "completed" },
    { num: 6, name: "Reservation Created", date: "26 May 09:15", state: "completed" },
    { num: 7, name: "Allocation Strategy Applied", date: "26 May 09:15", state: "completed" },
    { num: 8, name: "Allocation Proposed", date: "26 May 09:16", state: "completed" },
    { num: 9, name: "Allocation Validated", date: "26 May 09:16", state: "completed" },
    { num: 10, name: "Allocation Confirmed", date: "26 May 09:16", state: "current" },
    { num: 11, name: "Transfer Required", state: "pending" },
    { num: 12, name: "Transfer Requested", state: "pending" },
    { num: 13, name: "Transfer In Transit", state: "pending" },
    { num: 14, name: "Transfer Received", state: "pending" },
    { num: 15, name: "Fulfilment Inventory Ready", state: "pending" },
    { num: 16, name: "Reservation Consumed", state: "pending" },
    { num: 17, name: "Closed", state: "pending" },
    { num: 18, name: "Archived", state: "pending" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden text-[9.5px]">
      {/* PREVIEW HEADER */}
      <div className="px-3 py-2 border-b border-line bg-canvas flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-ink">Selected Allocation Preview:</span>
          <span className="font-mono font-bold text-primary-900 text-xs">{alloc.ref}</span>
          <span className="px-2 py-0.2 rounded text-[8.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
            {alloc.status}
          </span>
        </div>
        <div className="text-[9px] text-muted">
          Product: <strong className="text-ink font-semibold">{alloc.product}</strong> ({alloc.sku})
        </div>
      </div>

      {/* 17 PREVIEW TABS */}
      <div className="border-b border-line bg-white px-3 overflow-x-auto scrollbar-none">
        <div className="flex gap-1 text-[9.5px] font-semibold text-muted py-1 whitespace-nowrap">
          {previewTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-0.5 rounded-md transition-colors ${
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

      {/* 10 DETAIL PANELS GRID */}
      <div className="p-2.5 bg-white space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-10 gap-2 text-[9px]">
          {/* 1. DEMAND DETAILS */}
          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[8.5px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-0.5">Demand Details</span>
            <div className="flex justify-between items-center"><span className="text-muted">Ref:</span><strong className="font-mono text-primary-900 font-bold">{alloc.ref}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Order:</span><strong className="font-mono text-ink">{alloc.order_ref}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Product:</span><strong className="text-ink font-semibold truncate max-w-[80px]" title={alloc.product}>{alloc.product}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">SKU:</span><strong className="font-mono text-muted">{alloc.sku}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Ordered Qty:</span><strong className="text-ink font-bold">{alloc.ordered_qty} Units</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Service Level:</span><strong className="text-emerald-700 font-bold">{alloc.service_level}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Destination:</span><strong className="text-ink font-semibold truncate max-w-[70px]" title={alloc.dest_wh}>{alloc.dest_wh}</strong></div>
          </div>

          {/* 2. INVENTORY SOURCES */}
          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[8.5px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-0.5">Inventory Sources</span>
            <div className="flex justify-between items-center"><span className="text-ink font-medium">Colombo DC (A-01):</span><strong className="text-emerald-700 font-bold">150 Units</strong></div>
            <div className="flex justify-between items-center"><span className="text-ink font-medium">Kandy DC (K-01):</span><strong className="text-blue-700 font-bold">120 Units</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Kurunegala WH:</span><strong className="text-muted font-bold">80 Units</strong></div>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Viewing All Sources..."); }} className="text-[8px] text-primary-900 font-bold hover:underline block pt-1">
              View All Sources (5) →
            </a>
          </div>

          {/* 3. RESERVATION DETAILS */}
          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[8.5px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-0.5">Reservation Details</span>
            <div className="flex justify-between items-center"><span className="text-muted">Ref:</span><strong className="font-mono text-ink">{alloc.res_ref}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Status:</span><span className="text-emerald-700 font-bold bg-emerald-50 px-1 rounded border border-emerald-200 text-[8px]">{alloc.res_status}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted">Reserved Qty:</span><strong className="text-blue-700 font-bold">{alloc.res_qty} Units</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Expiry:</span><strong className="text-amber-700 font-semibold">{alloc.res_expiry}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Held By:</span><strong className="text-ink font-semibold">{alloc.held_by}</strong></div>
          </div>

          {/* 4. ALLOCATION DETAILS */}
          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[8.5px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-0.5">Allocation Details</span>
            <div className="flex justify-between items-center"><span className="text-muted">Source Selected:</span><strong className="text-ink font-semibold">{alloc.source_wh}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Allocated Qty:</span><strong className="text-purple-700 font-bold">{alloc.alloc_qty} Units</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Strategy:</span><strong className="text-ink font-semibold">{alloc.strategy}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Accuracy Score:</span><strong className="text-emerald-700 font-bold">{alloc.accuracy}</strong></div>
          </div>

          {/* 5. BATCH / EXPIRY VALIDATION */}
          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[8.5px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-0.5">Batch / Expiry Validation</span>
            <div className="flex justify-between items-center"><span className="text-muted">Batch / Lot:</span><strong className="font-mono text-ink">{alloc.batch}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Expiry Date:</span><strong className="text-ink font-semibold">{alloc.expiry_date}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Shelf Life Left:</span><strong className="text-emerald-700 font-semibold">{alloc.shelf_life}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Compliance:</span><span className="text-emerald-700 font-bold bg-emerald-50 px-1 rounded border border-emerald-200 text-[8px]">{alloc.expiry_comp}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted">FEFO Rank:</span><strong className="text-ink font-semibold">{alloc.fefo_rank}</strong></div>
          </div>

          {/* 6. TRANSFER INFORMATION */}
          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[8.5px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-0.5">Transfer Information</span>
            <div className="flex justify-between items-center"><span className="text-muted">Transfer Required:</span><strong className="text-ink font-semibold">{alloc.transfer_req}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Reference:</span><strong className="font-mono text-muted">{alloc.transfer_ref}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Status:</span><span className="text-muted">{alloc.transfer_status}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted">Lead Time:</span><strong className="text-muted">{alloc.transfer_lead}</strong></div>
          </div>

          {/* 7. SUBSTITUTION / BACKORDER */}
          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[8.5px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-0.5">Substitution / Backorder</span>
            <div className="flex justify-between items-center"><span className="text-muted">Substitution Offered:</span><strong className="text-ink font-semibold">{alloc.sub_offered}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Backorder:</span><strong className="text-ink font-semibold">{alloc.backorder}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Backorder Qty:</span><strong className="text-muted">{alloc.backorder_qty}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Disposition:</span><strong className="text-muted">{alloc.disposition}</strong></div>
          </div>

          {/* 8. HOLDS & EXCEPTIONS */}
          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[8.5px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-0.5">Holds &amp; Exceptions</span>
            <div className="flex justify-between items-center"><span className="text-muted">On Hold:</span><strong className="text-emerald-700 font-semibold">{alloc.on_hold}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Hold Reason:</span><strong className="text-muted">{alloc.hold_reason}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Exceptions:</span><strong className="text-emerald-700 font-semibold">{alloc.exceptions}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Blocking Issues:</span><strong className="text-emerald-700 font-semibold">{alloc.blocking}</strong></div>
          </div>

          {/* 9. SLA SUMMARY */}
          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[8.5px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-0.5">SLA Summary</span>
            <div className="flex justify-between items-center"><span className="text-muted">SLA Status:</span><strong className="text-emerald-700 font-bold">{alloc.sla_status}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">SLA Due:</span><strong className="text-ink font-semibold">{alloc.sla_due}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">SLA Breach:</span><strong className="text-emerald-700 font-bold">{alloc.sla_breach}</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Compliance:</span><strong className="text-emerald-700 font-bold">{alloc.sla_compliance}</strong></div>
          </div>

          {/* 10. LINKED RECORDS */}
          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[8.5px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-0.5">Linked Records</span>
            <div className="flex justify-between items-center"><span className="text-muted">Fulfilment Order:</span><strong className="font-mono text-primary-900 text-[8px]">FO-2025-0108921</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Shipment:</span><strong className="text-indigo-700 font-bold">184</strong></div>
            <div className="flex justify-between items-center"><span className="text-muted">Audit Trail:</span><a href="#" onClick={(e) => { e.preventDefault(); alert("Viewing Audit..."); }} className="text-primary-900 font-bold hover:underline">View</a></div>
            <div className="flex justify-between items-center"><span className="text-muted">Communication:</span><a href="#" onClick={(e) => { e.preventDefault(); alert("Viewing Communication..."); }} className="text-primary-900 font-bold hover:underline">View</a></div>
          </div>
        </div>

        {/* ALLOCATION LIFECYCLE WORKFLOW TIMELINE */}
        <div className="pt-2 border-t border-line space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className="text-[9.5px] font-bold text-ink uppercase tracking-wider">
              Allocation &amp; Reservation Workflow Lifecycle
            </h4>
            <div className="flex items-center gap-3 text-[8px] font-semibold text-muted">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600" /> Completed</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary-900" /> In Progress</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-200 border border-gray-400" /> Pending</span>
            </div>
          </div>

          <div className="overflow-x-auto scrollbar-thin pb-2">
            <div className="flex items-start min-w-[1600px] justify-between px-2 pt-2 relative">
              {/* Connecting Line */}
              <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200 z-0" />

              {lifecycleStages.map((stage, idx) => {
                const isCompleted = stage.state === "completed";
                const isCurrent = stage.state === "current";

                return (
                  <div key={idx} className="flex flex-col items-center z-10 w-[82px] flex-shrink-0 text-center space-y-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] shadow-xs transition-transform hover:scale-110 ${
                        isCompleted
                          ? "bg-emerald-600 text-white ring-2 ring-emerald-100"
                          : isCurrent
                          ? "bg-primary-900 text-white ring-2 ring-rose-100 font-extrabold"
                          : "bg-gray-100 text-gray-400 border border-gray-300"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 size={12} /> : stage.num}
                    </div>

                    <div className="w-full px-0.5">
                      <span className={`text-[8px] leading-tight block truncate ${
                        isCompleted ? "text-emerald-800 font-semibold" : isCurrent ? "text-primary-900 font-bold" : "text-muted"
                      }`} title={stage.name}>
                        {stage.name}
                      </span>
                      {stage.date && (
                        <span className="text-[7.5px] text-muted font-mono block whitespace-nowrap mt-0.5">
                          {stage.date}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
