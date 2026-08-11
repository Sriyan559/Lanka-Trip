"use client";

import React from "react";
import { MetricCard } from "../shared/MetricCard";
import { ReusableSparkline } from "../charts/ReusableSparkline";
import { ShipmentDetail } from "@/types/logistics/shipment";

interface ShipmentKPIGridProps {
  kpis: ShipmentDetail["kpis"];
}

export function ShipmentKPIGrid({ kpis }: ShipmentKPIGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2 mb-3">
      {/* 1. Package Count */}
      <MetricCard
        number={1}
        title="Package Count"
        value={kpis.packageCount}
        progressBarValue={100}
        progressColor="purple"
      />

      {/* 2. Shipment Weight */}
      <MetricCard
        number={2}
        title="Shipment Weight"
        value={kpis.shipmentWeight}
        sparklineNode={<ReusableSparkline color="#3b82f6" data={[1.1, 1.2, 1.3, 1.4, 1.4]} />}
      />

      {/* 3. Shipment Value */}
      <MetricCard
        number={3}
        title="Shipment Value"
        value={kpis.shipmentValue}
        sparklineNode={<ReusableSparkline color="#10b981" data={[2500, 2800, 3100, 3100]} />}
      />

      {/* 4. Shipping Cost */}
      <MetricCard
        number={4}
        title="Shipping Cost"
        value={kpis.shippingCost}
        sparklineNode={<ReusableSparkline color="#6366f1" data={[400, 420, 450]} />}
      />

      {/* 5. COD Amount */}
      <MetricCard
        number={5}
        title="COD Amount"
        value={kpis.codAmount}
        statusText="No COD"
        progressBarValue={0}
      />

      {/* 6. Tracking Completeness */}
      <MetricCard
        number={6}
        title="Tracking Completeness"
        value={`${kpis.trackingCompleteness}%`}
        progressBarValue={kpis.trackingCompleteness}
        progressColor="emerald"
      />

      {/* 7. Transit Progress */}
      <MetricCard
        number={7}
        title="Transit Progress"
        value={`${kpis.transitProgress}%`}
        progressBarValue={kpis.transitProgress}
        progressColor="blue"
      />

      {/* 8. Delivery Attempts */}
      <MetricCard
        number={8}
        title="Delivery Attempts"
        value={kpis.deliveryAttempts}
        statusText="Pending retry"
      />

      {/* 9. SLA Progress */}
      <MetricCard
        number={9}
        title="SLA Progress"
        value={`${kpis.slaProgress}%`}
        progressBarValue={kpis.slaProgress}
        progressColor="emerald"
      />

      {/* 10. Tracking Gap */}
      <MetricCard
        number={10}
        title="Tracking Gap"
        value={kpis.trackingGap}
        statusText="No gaps"
        isSuccess={kpis.trackingGap === 0}
      />

      {/* 11. ETA Variance */}
      <MetricCard
        number={11}
        title="ETA Variance"
        value={kpis.etaVariance}
        varianceText={kpis.etaVariance}
        isWarning={kpis.etaVariance.startsWith("+")}
      />

      {/* 12. Shipment Health Score */}
      <MetricCard
        number={12}
        title="Shipment Health"
        value={`${kpis.healthScore}/100`}
        statusText="Excellent"
        isSuccess={kpis.healthScore >= 90}
      />
    </div>
  );
}
