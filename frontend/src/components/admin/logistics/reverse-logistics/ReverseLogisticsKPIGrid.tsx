"use client";

import React from "react";
import { MetricCard } from "../shared/MetricCard";
import { CircularProgress } from "../shared/CircularProgress";
import { ReusableSparkline } from "../charts/ReusableSparkline";
import { ReverseLogisticsMetrics } from "@/types/logistics/reverseLogistics";

interface ReverseLogisticsKPIGridProps {
  metrics: ReverseLogisticsMetrics;
}

export function ReverseLogisticsKPIGrid({ metrics }: ReverseLogisticsKPIGridProps) {
  return (
    <div className="space-y-2.5 mb-3">
      {/* 12 KPI Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2">
        {/* 1. Total Reverse Logistics Cases */}
        <MetricCard
          number={1}
          title="Total Reverse Logistics Cases"
          value={metrics.totalReverseCases}
          varianceText="+14 vs prev 30 days"
          sparklineNode={<ReusableSparkline color="#3b82f6" data={[260, 270, 275, 284]} />}
        />

        {/* 2. Approved Returns Awaiting Collection */}
        <MetricCard
          number={2}
          title="Approved Returns Awaiting Collection"
          value={metrics.approvedAwaitingCollection}
          varianceText="+4 vs yesterday"
          isWarning
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[30, 32, 34, 36]} />}
        />

        {/* 3. Collections Scheduled */}
        <MetricCard
          number={3}
          title="Collections Scheduled"
          value={metrics.collectionsScheduled}
          varianceText="+6 vs yesterday"
          sparklineNode={<ReusableSparkline color="#3b82f6" data={[40, 42, 45, 48]} />}
        />

        {/* 4. Collections Overdue */}
        <MetricCard
          number={4}
          title="Collections Overdue"
          value={metrics.collectionsOverdue}
          varianceText="-2 (14.3%)"
          isWarning
          sparklineNode={<ReusableSparkline color="#ef4444" data={[15, 14, 13, 12]} />}
        />

        {/* 5. Reverse Shipments In Transit */}
        <MetricCard
          number={5}
          title="Reverse Shipments In Transit"
          value={metrics.reverseShipmentsInTransit}
          varianceText="+8 (14.3%)"
          sparklineNode={<ReusableSparkline color="#3b82f6" data={[52, 56, 60, 64]} />}
        />

        {/* 6. Returns Awaiting Warehouse Receipt */}
        <MetricCard
          number={6}
          title="Returns Awaiting Warehouse Receipt"
          value={metrics.returnsAwaitingWarehouseReceipt}
          varianceText="-3 (9.7%)"
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[32, 30, 29, 28]} />}
        />

        {/* 7. Inspection Pending */}
        <MetricCard
          number={7}
          title="Inspection Pending"
          value={metrics.inspectionPending}
          varianceText="+2 (6.7%)"
          sparklineNode={<ReusableSparkline color="#3b82f6" data={[28, 29, 30, 32]} />}
        />

        {/* 8. Restock Eligible */}
        <MetricCard
          number={8}
          title="Restock Eligible"
          value={metrics.restockEligible}
          varianceText="+12 (10.5%)"
          isSuccess
          sparklineNode={<ReusableSparkline color="#10b981" data={[110, 115, 120, 126]} />}
        />

        {/* 9. Quarantine Required */}
        <MetricCard
          number={9}
          title="Quarantine Required"
          value={metrics.quarantineRequired}
          varianceText="-1 (6.7%)"
          sparklineNode={<ReusableSparkline color="#8b5cf6" data={[16, 15, 15, 14]} />}
        />

        {/* 10. Supplier Returns Pending */}
        <MetricCard
          number={10}
          title="Supplier Returns Pending"
          value={metrics.supplierReturnsPending}
          varianceText="+2 (12.5%)"
          sparklineNode={<ReusableSparkline color="#8b5cf6" data={[15, 16, 17, 18]} />}
        />

        {/* 11. Reverse Logistics Exceptions */}
        <MetricCard
          number={11}
          title="Reverse Logistics Exceptions"
          value={metrics.reverseExceptions}
          varianceText="-2 (16.7%)"
          isWarning
          sparklineNode={<ReusableSparkline color="#ef4444" data={[13, 12, 11, 10]} />}
        />

        {/* 12. Reverse Logistics SLA Breaches */}
        <MetricCard
          number={12}
          title="Reverse Logistics SLA Breaches"
          value={metrics.reverseSlaBreaches}
          varianceText="-1 (14.3%)"
          isWarning
          sparklineNode={<ReusableSparkline color="#ef4444" data={[8, 7, 7, 6]} />}
        />
      </div>

      {/* Secondary Metric Cards / Performance Rings Row */}
      <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-2xs flex flex-wrap items-center justify-around gap-4">
        <CircularProgress
          value={metrics.collectionSuccessRatePercentage}
          label="Collection Success"
          trendText="+1.8%"
          color="#10b981"
        />
        <CircularProgress
          value={85}
          label="Avg Collection Time"
          trendText={metrics.averageCollectionTimeDays}
          color="#3b82f6"
        />
        <CircularProgress
          value={metrics.warehouseReceiptSlaPercentage}
          label="Warehouse Receipt SLA"
          trendText="+2.1%"
          color="#10b981"
        />
        <CircularProgress
          value={metrics.inspectionPassRatePercentage}
          label="Inspection Pass Rate"
          trendText="+1.5%"
          color="#10b981"
        />
        <CircularProgress
          value={metrics.restockRatePercentage}
          label="Restock Rate"
          trendText="+2.4%"
          color="#8b5cf6"
        />
        <CircularProgress
          value={90}
          label="Avg Reverse Cycle"
          trendText={metrics.averageReverseCycleTimeDays}
          color="#10b981"
        />
      </div>
    </div>
  );
}
