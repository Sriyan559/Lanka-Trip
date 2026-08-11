"use client";

import React from "react";
import { MetricCard } from "../shared/MetricCard";
import { CircularProgress } from "../shared/CircularProgress";
import { ReusableSparkline } from "../charts/ReusableSparkline";
import { CarrierDashboardMetrics } from "@/types/logistics/carrier";

interface CarrierKPIGridProps {
  metrics: CarrierDashboardMetrics;
}

export function CarrierKPIGrid({ metrics }: CarrierKPIGridProps) {
  return (
    <div className="space-y-2.5 mb-3">
      {/* 12 KPI Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2">
        {/* 1. Total Carriers & Partners */}
        <MetricCard
          number={1}
          title="Total Carriers & Partners"
          value={metrics.totalCarriers}
          varianceText="▲ 2 vs prev 30 days"
          varianceColor="emerald"
          sparklineNode={<ReusableSparkline color="#3b82f6" data={[15, 16, 16, 17, 18]} />}
        />

        {/* 2. Active Carriers */}
        <MetricCard
          number={2}
          title="Active Carriers"
          value={metrics.activeCarriers}
          varianceText="▲ 1 (7.7%)"
          varianceColor="emerald"
          sparklineNode={<ReusableSparkline color="#10b981" data={[12, 13, 13, 14, 14]} />}
        />

        {/* 3. Approved Delivery Partners */}
        <MetricCard
          number={3}
          title="Approved Delivery Partners"
          value={metrics.approvedPartners}
          varianceText="▲ 2 (14.3%)"
          varianceColor="emerald"
          sparklineNode={<ReusableSparkline color="#10b981" data={[14, 14, 15, 16, 16]} />}
        />

        {/* 4. Limited-Service Carriers */}
        <MetricCard
          number={4}
          title="Limited-Service Carriers"
          value={metrics.limitedServiceCarriers}
          varianceText="— 0 (0%)"
          varianceColor="gray"
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[2, 2, 2, 2, 2]} />}
        />

        {/* 5. Suspended Carriers */}
        <MetricCard
          number={5}
          title="Suspended Carriers"
          value={metrics.suspendedCarriers}
          varianceText="▲ 1 (100%)"
          varianceColor="purple"
          sparklineNode={<ReusableSparkline color="#a855f7" data={[2, 2, 1, 1, 1]} />}
        />

        {/* 6. Active Shipping Services */}
        <MetricCard
          number={6}
          title="Active Shipping Services"
          value={metrics.activeShippingServices}
          varianceText="▲ 3 (7.7%)"
          varianceColor="emerald"
          sparklineNode={<ReusableSparkline color="#3b82f6" data={[38, 39, 40, 41, 42]} />}
        />

        {/* 7. Shipments Assigned This Period */}
        <MetricCard
          number={7}
          title="Shipments Assigned This Period"
          value="1,426"
          varianceText="▲ 156 (12.3%)"
          varianceColor="emerald"
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[1200, 1280, 1340, 1426]} />}
        />

        {/* 8. Pickup SLA Breaches */}
        <MetricCard
          number={8}
          title="Pickup SLA Breaches"
          value={metrics.pickupSlaBreaches}
          varianceText="▼ 3 (33.3%)"
          varianceColor="rose"
          sparklineNode={<ReusableSparkline color="#ef4444" data={[15, 14, 13, 12]} />}
        />

        {/* 9. Delivery SLA Breaches */}
        <MetricCard
          number={9}
          title="Delivery SLA Breaches"
          value={metrics.deliverySlaBreaches}
          varianceText="▲ 5 (38.5%)"
          varianceColor="rose"
          sparklineNode={<ReusableSparkline color="#ef4444" data={[23, 21, 19, 18]} />}
        />

        {/* 10. Tracking Exceptions */}
        <MetricCard
          number={10}
          title="Tracking Exceptions"
          value={metrics.trackingExceptions}
          varianceText="▲ 2 (25.0%)"
          varianceColor="emerald"
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[12, 11, 11, 10]} />}
        />

        {/* 11. Carrier Claims Open */}
        <MetricCard
          number={11}
          title="Carrier Claims Open"
          value={metrics.carrierClaimsOpen}
          varianceText="▲ 1 (14.3%)"
          varianceColor="purple"
          sparklineNode={<ReusableSparkline color="#a855f7" data={[6, 7, 7, 8]} />}
        />

        {/* 12. COD / Reconciliation Exceptions */}
        <MetricCard
          number={12}
          title="COD / Reconciliation Exceptions"
          value={metrics.codReconciliationExceptions}
          varianceText="▼ 2 (-25.0%)"
          varianceColor="purple"
          sparklineNode={<ReusableSparkline color="#a855f7" data={[8, 7, 7, 6]} />}
        />
      </div>

      {/* Secondary Performance Indicator Rings Strip */}
      <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-2xs flex flex-wrap items-center justify-around gap-4">
        <CircularProgress
          value={94}
          label="On-Time Pickup"
          trendText="+2.2%"
          color="#10b981"
        />
        <CircularProgress
          value={91}
          label="On-Time Delivery"
          trendText="+1.8%"
          color="#10b981"
        />
        <CircularProgress
          value={88}
          label="First-Attempt"
          trendText="+2.1%"
          color="#10b981"
        />
        <CircularProgress
          value={98}
          label="Tracking Complete"
          trendText="+1.2%"
          color="#10b981"
        />
        <CircularProgress
          value={89}
          label="POD Completeness"
          trendText="+1.5%"
          color="#10b981"
        />
        <CircularProgress
          value={1.8}
          label="Claims Rate"
          trendText="-0.2%"
          isPositive={false}
          color="#f59e0b"
        />
      </div>
    </div>
  );
}
