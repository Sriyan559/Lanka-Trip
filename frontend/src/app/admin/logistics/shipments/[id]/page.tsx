"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Shipment } from "@/types/logistics";
import { mockShipments } from "@/mocks/admin/logistics.mock";
import { ShipmentDetailHeader } from "@/features/admin/logistics/components/ShipmentDetailHeader";
import { ShipmentDetailSidebar } from "@/features/admin/logistics/components/ShipmentDetailSidebar";
import { ShipmentStepper } from "@/features/admin/logistics/components/ShipmentStepper";
import { ShipmentContextCards } from "@/features/admin/logistics/components/ShipmentContextCards";
import { PageHeader } from "@/components/admin/layout/PageHeader";

function ShipmentDetailContent() {
  const params = useParams();
  const id = params.id as string;
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch the shipment by ID
    const found = mockShipments.find(s => s.reference === id) || mockShipments[0];
    setShipment(found);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-line shadow-sm p-6 animate-pulse space-y-4">
        <div className="h-10 bg-canvas rounded w-1/3 mb-6" />
        <div className="h-40 bg-canvas rounded w-full" />
        <div className="h-40 bg-canvas rounded w-full" />
      </div>
    );
  }

  if (!shipment) return <div>Shipment not found</div>;

  return (
    <div className="space-y-6 max-w-[1920px] mx-auto pb-10">
      
      <div className="flex flex-col xl:flex-row gap-6">
        {/* MAIN CONTENT AREA */}
        <div className="flex-1 min-w-0">
          <ShipmentDetailHeader shipment={shipment} />
          <ShipmentStepper shipment={shipment} />
          <ShipmentContextCards shipment={shipment} />
        </div>

        {/* RIGHT SIDEBARS */}
        <ShipmentDetailSidebar shipment={shipment} />
      </div>
    </div>
  );
}

export default function ShipmentDetailPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading Shipment Details...</div>}>
      <ShipmentDetailContent />
    </Suspense>
  );
}
