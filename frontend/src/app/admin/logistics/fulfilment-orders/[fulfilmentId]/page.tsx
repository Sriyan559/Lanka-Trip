"use client";

import React, { Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Package, Clock, ShieldCheck, Warehouse, Truck, CheckSquare, Layers, AlertTriangle } from "lucide-react";
import { SelectedFulfilmentPreview } from "@/components/admin/logistics/fulfilment/SelectedFulfilmentPreview";

function FulfilmentDetailContent() {
  const params = useParams();
  const router = useRouter();
  const fulfilmentId = params?.fulfilmentId || "FUL25-0001248";

  return (
    <div className="min-h-screen bg-[#faf8f8] p-4 sm:p-6 text-gray-900 font-sans space-y-4">
      {/* HEADER BREADCRUMB & BACK BUTTON */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-line shadow-sm">
        <div>
          <div className="text-[11px] font-semibold text-muted mb-1 flex items-center gap-1.5">
            <button
              onClick={() => router.push("/admin/logistics/fulfilment-orders")}
              className="hover:underline flex items-center gap-1 text-primary-900 font-bold"
            >
              <ArrowLeft size={13} /> Fulfilment Orders
            </button>
            <span className="text-gray-300">/</span>
            <span className="text-ink font-bold font-mono">{fulfilmentId}</span>
          </div>
          <h1 className="text-xl font-bold text-ink flex items-center gap-2">
            <span>Fulfilment Order Detail:</span>
            <span className="font-mono text-primary-900">{fulfilmentId}</span>
          </h1>
        </div>

        <button
          onClick={() => router.push("/admin/logistics/fulfilment-orders")}
          className="px-3.5 py-1.5 bg-white border border-line text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
        >
          <ArrowLeft size={14} />
          <span>Back to Fulfilment Portfolio</span>
        </button>
      </div>

      {/* FULL PREVIEW WORKSPACE */}
      <SelectedFulfilmentPreview
        operation={{
          id: fulfilmentId,
          fulfilment_ref: fulfilmentId,
          order_ref: `ORD25-${String(fulfilmentId).replace(/[^0-9]/g, '') || '0048721'}`,
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
        }}
      />
    </div>
  );
}

export default function FulfilmentDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 font-semibold text-sm">Loading Fulfilment Order Detail...</div>}>
      <FulfilmentDetailContent />
    </Suspense>
  );
}
