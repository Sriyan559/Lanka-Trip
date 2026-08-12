import React, { Suspense } from "react";
import { AN09InventoryLogisticsDashboard } from "@/components/admin/analytics/AN09InventoryLogisticsDashboard";
import { AnalyticsLoadingState } from "@/components/admin/analytics/AnalyticsLoadingState";

export const metadata = {
  title: "Inventory, Warehouse, Fulfilment & Logistics Analytics | SL Beauty Enterprise Admin",
  description:
    "Analyze inventory health, warehouse productivity, fulfilment throughput, shipment performance, carrier reliability, logistics cost and delivery risk across the ecosystem.",
};

export default function InventoryLogisticsPage() {
  return (
    <Suspense fallback={<AnalyticsLoadingState rows={6} message="Loading Inventory & Logistics Dashboard..." />}>
      <AN09InventoryLogisticsDashboard />
    </Suspense>
  );
}
