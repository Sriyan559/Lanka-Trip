"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Warehouse, ArrowRight, CheckCircle2, MapPin } from "lucide-react";

interface SelectedWarehousePreviewProps {
  facility?: any;
}

export function SelectedWarehousePreview({ facility }: SelectedWarehousePreviewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");

  const previewTabs = [
    "Overview", "Capacity", "Inventory", "Fulfilment Orders", "Picking",
    "Packing", "Quality", "Dispatch", "Transfers", "Carrier Pickups",
    "Returns", "Capabilities", "Service Areas", "Maintenance", "Holds",
    "Exceptions", "SLA", "Linked Records", "Activity", "Audit History"
  ];

  const fac = facility || {
    id: "WH-CMB-01",
    ref: "WH-CMB-01",
    name: "Colombo Central",
    type: "Warehouse",
    status: "Operational",
    operator: "SL Beauty",
    location: "Western Province, Colombo",
    total_capacity: "520,000 cbft",
    capacity_used_pct: "78%",
    capacity_avail_pct: "22%",
    avail_cbft: "114,400 cbft",
    active_skus: "7,842",
    units_on_hand: "1.62M",
    inventory_acc: "98.1%",
    orders_assigned: 312,
    lines_assigned: "1,248",
    units_assigned: "24,860",
    pick_queue: 32,
    pick_capacity: "12,240",
    pick_used: "68%",
    pack_queue: 18,
    pack_capacity: "7,560",
    pack_used: "63%",
    dispatch_queue: 28,
    dock_doors: 32,
    door_used: "71%",
    transfers_pending: 6,
    units_transit: "11,240",
    transfer_in_out: "3 Incoming / 2 Outgoing",
    returns_pending: 14,
    units_pending_return: "1,620",
    return_cap_used: "54%",
    districts_cov: 6,
    zones_cov: 68,
    coverage_pct: "98%",
    hours: "Mon – Sun 06:00 – 22:00",
    peak_days: "Mon, Fri, Sat",
    maint_critical: 0,
    maint_scheduled: 1,
    next_maint: "05 Jun 2026",
    active_holds: 0,
    open_exceptions: 2,
    overall_sla: "94%",
    sla_target: "95%",
  };

  const lifecycleStages = [
    { num: 1, name: "Facility Registered", date: "20 Jan 2025", state: "completed" },
    { num: 2, name: "Identity Verified", date: "22 Jan 2025", state: "completed" },
    { num: 3, name: "Operational Profile Completed", date: "25 Jan 2025", state: "completed" },
    { num: 4, name: "Service Areas Configured", date: "27 Jan 2025", state: "completed" },
    { num: 5, name: "Capabilities Configured", date: "30 Jan 2025", state: "completed" },
    { num: 6, name: "Capacity Defined", date: "02 Feb 2025", state: "completed" },
    { num: 7, name: "Inventory Locations Activated", date: "05 Feb 2025", state: "completed" },
    { num: 8, name: "Fulfilment Enabled", date: "07 Feb 2025", state: "completed" },
    { num: 9, name: "Carrier Coverage Enabled", date: "10 Feb 2025", state: "completed" },
    { num: 10, name: "Operational", date: "12 Feb 2025", state: "current" },
    { num: 11, name: "Periodic Review", state: "pending" },
    { num: 12, name: "Maintenance", state: "pending" },
    { num: 13, name: "Limited Service", state: "pending" },
    { num: 14, name: "Suspended", state: "pending" },
    { num: 15, name: "Retired / Archived", state: "pending" },
  ];

  const capabilities = [
    { name: "Standard Storage", status: "Enabled", quality: "Good" },
    { name: "Temperature-Controlled", status: "Compliant", quality: "Good" },
    { name: "Fragile Handling", status: "Enabled", quality: "Good" },
    { name: "High-Value Handling", status: "Enabled", quality: "Good" },
    { name: "Batch / Lot Handling", status: "Enabled", quality: "Good" },
    { name: "Expiry / FEFO", status: "Compliant", quality: "Good" },
    { name: "Returns Processing", status: "Enabled", quality: "Good" },
    { name: "COD Handoff", status: "Enabled", quality: "Compliant" },
    { name: "Same-Day Fulfilment", status: "Enabled", quality: "Good" },
    { name: "Next-Day Fulfilment", status: "Enabled", quality: "Good" },
    { name: "B2B Fulfilment", status: "Enabled", quality: "Good" },
    { name: "B2C Fulfilment", status: "Enabled", quality: "Good" },
    { name: "Marketplace Fulfilment", status: "Enabled", quality: "Good" },
    { name: "Supplier Fulfilment", status: "Enabled", quality: "Good" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden text-[10px] space-y-0">
      {/* HEADER */}
      <div className="p-3 border-b border-line bg-canvas flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-primary-50 rounded-lg text-primary-900 border border-primary-100 flex-shrink-0">
            <Warehouse size={16} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-ink flex items-center gap-1.5 leading-tight">
              <span className="font-mono text-primary-900">{fac.ref}</span>
              <span>{fac.name}</span>
              <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                {fac.status}
              </span>
            </h3>
            <div className="text-[10px] text-muted flex items-center gap-1.5 mt-0.5">
              <span>{fac.type}</span>
              <span>•</span>
              <span className="font-semibold text-ink">{fac.operator}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5"><MapPin size={10} /> {fac.location}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/admin/logistics/warehouses/${fac.id || fac.ref}`)}
          className="px-3 py-1 bg-primary-900 text-white text-[10px] font-bold rounded-lg hover:bg-primary-800 transition-colors shadow-sm flex items-center gap-1"
        >
          <span>View Full Profile</span>
          <ArrowRight size={12} />
        </button>
      </div>

      {/* 20 PREVIEW TABS */}
      <div className="border-b border-line bg-white px-3 overflow-x-auto scrollbar-none">
        <div className="flex gap-1 text-[10px] font-semibold text-muted py-1.5 whitespace-nowrap">
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

      {/* 16 DETAIL CARDS GRID (2 ROWS OF 8 CARDS) */}
      <div className="p-3 bg-white space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-[10px]">
          {/* ROW 1 */}
          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block">Capacity &amp; Utilization</span>
            <div className="text-xs font-bold text-ink">{fac.total_capacity}</div>
            <div className="flex justify-between text-[9px] font-semibold">
              <span className="text-amber-700">{fac.capacity_used_pct} Used</span>
              <span className="text-emerald-700">{fac.capacity_avail_pct} Avail</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <div className="bg-amber-500 h-full" style={{ width: fac.capacity_used_pct }} />
            </div>
          </div>

          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block">Inventory Coverage</span>
            <div className="text-xs font-bold text-ink">{fac.active_skus} <span className="text-[9px] font-normal text-muted">SKUs</span></div>
            <div className="text-[9px] text-muted">{fac.units_on_hand} Units</div>
            <div className="text-[9px] text-emerald-700 font-bold">{fac.inventory_acc} Accuracy</div>
          </div>

          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block">Fulfilment Workload</span>
            <div className="text-xs font-bold text-blue-700">{fac.orders_assigned} <span className="text-[9px] font-normal text-muted">Orders</span></div>
            <div className="text-[9px] text-muted">{fac.lines_assigned} Lines</div>
            <div className="text-[9px] text-muted">{fac.units_assigned} Units</div>
          </div>

          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block">Picking Operations</span>
            <div className="text-xs font-bold text-purple-700">{fac.pick_queue} <span className="text-[9px] font-normal text-muted">Pick Queue</span></div>
            <div className="text-[9px] text-muted">{fac.pick_capacity} Capacity</div>
            <div className="text-[9px] text-blue-700 font-bold">{fac.pick_used} Used</div>
          </div>

          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block">Packing Operations</span>
            <div className="text-xs font-bold text-sky-700">{fac.pack_queue} <span className="text-[9px] font-normal text-muted">Pack Queue</span></div>
            <div className="text-[9px] text-muted">{fac.pack_capacity} Capacity</div>
            <div className="text-[9px] text-blue-700 font-bold">{fac.pack_used} Used</div>
          </div>

          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block">Dispatch Operations</span>
            <div className="text-xs font-bold text-indigo-700">{fac.dispatch_queue} <span className="text-[9px] font-normal text-muted">Dispatch Q</span></div>
            <div className="text-[9px] text-muted">{fac.dock_doors} Dock Doors</div>
            <div className="text-[9px] text-emerald-700 font-bold">{fac.door_used} Used</div>
          </div>

          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block">Transfer Operations</span>
            <div className="text-xs font-bold text-ink">{fac.transfers_pending} <span className="text-[9px] font-normal text-muted">Pending</span></div>
            <div className="text-[9px] text-muted">{fac.units_transit} Units</div>
            <div className="text-[9px] text-muted">{fac.transfer_in_out}</div>
          </div>

          <div className="p-2 bg-canvas border border-line rounded-lg space-y-1">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block">Return Receiving</span>
            <div className="text-xs font-bold text-amber-700">{fac.returns_pending} <span className="text-[9px] font-normal text-muted">Returns</span></div>
            <div className="text-[9px] text-muted">{fac.units_pending_return} Units</div>
            <div className="text-[9px] text-amber-700 font-bold">{fac.return_cap_used} Used</div>
          </div>

          {/* ROW 2 */}
          <div className="p-2 bg-canvas border border-line rounded-lg space-y-0.5">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-0.5">Service Area Coverage</span>
            <div className="flex justify-between font-bold text-ink"><span>{fac.districts_cov} Districts</span><span>{fac.zones_cov} Zones</span></div>
            <div className="text-[9px] text-emerald-700 font-bold">{fac.coverage_pct} Coverage</div>
          </div>

          <div className="p-2 bg-canvas border border-line rounded-lg space-y-0.5">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-0.5">Operating Hours</span>
            <div className="font-semibold text-ink text-[9px] leading-tight">{fac.hours}</div>
            <div className="text-[8px] text-muted truncate">Peak: {fac.peak_days}</div>
          </div>

          <div className="p-2 bg-canvas border border-line rounded-lg space-y-0.5">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-0.5">Maintenance Summary</span>
            <div className="flex justify-between font-bold"><span className="text-emerald-700">{fac.maint_critical} Critical</span><span className="text-amber-700">{fac.maint_scheduled} Sched</span></div>
            <div className="text-[8px] text-muted">Next: {fac.next_maint}</div>
          </div>

          <div className="p-2 bg-canvas border border-line rounded-lg space-y-0.5">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-0.5">Operational Holds</span>
            <div className="font-bold text-emerald-700">{fac.active_holds} Active Holds</div>
            <div className="text-[8px] text-muted">No Restrictions</div>
          </div>

          <div className="p-2 bg-canvas border border-line rounded-lg space-y-0.5">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-0.5">Warehouse Exceptions</span>
            <div className="font-bold text-rose-700">{fac.open_exceptions} Open</div>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Viewing Exceptions..."); }} className="text-primary-900 hover:underline text-[8px] font-bold block">
              View Exceptions
            </a>
          </div>

          <div className="p-2 bg-canvas border border-line rounded-lg space-y-0.5">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-0.5">Performance &amp; SLA</span>
            <div className="flex justify-between"><span className="text-muted">Overall:</span><strong className="text-emerald-700">{fac.overall_sla}</strong></div>
            <div className="text-[8px] text-emerald-700 font-bold">All Healthy</div>
          </div>

          <div className="p-2 bg-canvas border border-line rounded-lg space-y-0.5">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-0.5">Recent Activity</span>
            <div className="font-bold text-ink">18 Today</div>
            <div className="text-[8px] text-muted">Last: 10:12 AM</div>
          </div>

          <div className="p-2 bg-canvas border border-line rounded-lg space-y-0.5">
            <span className="text-[9px] text-muted font-bold uppercase tracking-wider block border-b border-line pb-0.5">Lifecycle &amp; Workflow</span>
            <div className="font-bold text-primary-900 truncate">Step 10: Operational</div>
            <div className="text-[8px] text-muted">Step 10 of 15</div>
          </div>
        </div>

        {/* FACILITY LIFECYCLE TIMELINE (ISSUE 20 MAJOR FIX - EXPLICIT NON-COLLIDING COLUMNS) */}
        <div className="pt-3 border-t border-line space-y-2">
          <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider">
            Facility Lifecycle &amp; Onboarding Workflow
          </h4>

          <div className="overflow-x-auto scrollbar-thin pb-2">
            <div className="flex items-start min-w-[1300px] justify-between px-2 pt-2 relative">
              {/* Connecting line behind circles */}
              <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200 z-0" />

              {lifecycleStages.map((stage, idx) => {
                const isCompleted = stage.state === "completed";
                const isCurrent = stage.state === "current";

                return (
                  <div key={idx} className="flex flex-col items-center z-10 w-[85px] flex-shrink-0 text-center space-y-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] shadow-sm transition-transform hover:scale-110 ${
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
                      <span className={`text-[8.5px] leading-tight block truncate ${
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

        {/* CAPABILITY MATRIX (ISSUE 22) */}
        <div className="pt-3 border-t border-line space-y-2">
          <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider">
            Capability Matrix (Compliance / Capacity Status)
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 xl:grid-cols-14 gap-1 text-[9px]">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="p-1.5 bg-canvas border border-line rounded-md flex flex-col justify-between space-y-1">
                <span className="font-semibold text-ink text-[9px] leading-tight line-clamp-2">{cap.name}</span>
                <div className="flex items-center justify-between text-[8px] pt-0.5 border-t border-line/40">
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-1 rounded border border-emerald-200">{cap.status}</span>
                  <span className="text-muted font-medium">{cap.quality}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
