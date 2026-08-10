"use client";

import React, { Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Warehouse } from "lucide-react";
import { SelectedWarehousePreview } from "@/components/admin/logistics/warehouse/SelectedWarehousePreview";

function WarehouseDetailContent() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.warehouseId;
  const warehouseId = Array.isArray(rawId) ? rawId[0] : rawId || "WH-CMB-01";

  return (
    <div className="min-h-screen bg-[#faf8f8] p-4 sm:p-6 text-gray-900 font-sans space-y-4">
      {/* HEADER BREADCRUMB & BACK BUTTON */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-line shadow-sm">
        <div>
          <div className="text-[11px] font-semibold text-muted mb-1 flex items-center gap-1.5">
            <button
              onClick={() => router.push("/admin/logistics/warehouses")}
              className="hover:underline flex items-center gap-1 text-primary-900 font-bold"
            >
              <ArrowLeft size={13} /> Warehouses &amp; Fulfilment Centres
            </button>
            <span className="text-gray-300">/</span>
            <span className="text-ink font-bold font-mono">{warehouseId}</span>
          </div>
          <h1 className="text-xl font-bold text-ink flex items-center gap-2">
            <Warehouse size={20} className="text-primary-900" />
            <span>Warehouse Detail:</span>
            <span className="font-mono text-primary-900">{warehouseId}</span>
          </h1>
        </div>

        <button
          onClick={() => router.push("/admin/logistics/warehouses")}
          className="px-3.5 py-1.5 bg-white border border-line text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
        >
          <ArrowLeft size={14} />
          <span>Back to Warehouse Portfolio</span>
        </button>
      </div>

      {/* FULL PREVIEW WORKSPACE */}
      <SelectedWarehousePreview
        facility={{
          id: warehouseId,
          ref: warehouseId,
          name: warehouseId.includes("CMB") ? "Colombo Central" : warehouseId.includes("KDU") ? "Kadawatha Hub" : warehouseId.includes("KND") ? "Kandy Regional" : "Gampaha FC",
          type: warehouseId.includes("FC") ? "Fulfilment Centre" : "Warehouse",
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
        }}
      />
    </div>
  );
}

export default function WarehouseDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 font-semibold text-sm">Loading Warehouse Detail...</div>}>
      <WarehouseDetailContent />
    </Suspense>
  );
}
