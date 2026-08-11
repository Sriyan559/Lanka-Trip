"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import { ShipmentDetailCarrierTracking } from "@/components/logistics/ShipmentDetailCarrierTracking";

function LG08ShipmentDetailContent() {
  const params = useParams();
  const shipmentIdParam = (params.shipmentId || params.id || "SHP-2025-006921") as string;

  return <ShipmentDetailCarrierTracking shipmentId={shipmentIdParam} />;
}

export default function LG08ShipmentDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-xs font-semibold text-gray-600">
          Loading LG08 Shipment Detail & Carrier Tracking...
        </div>
      }
    >
      <LG08ShipmentDetailContent />
    </Suspense>
  );
}
