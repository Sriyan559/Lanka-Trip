"use client";

import React from "react";
import { ChartCard } from "@/components/admin/shared/ChartCard";
import { TrendChart } from "@/components/admin/shared/TrendChart";
import { DonutDistributionChart } from "@/components/admin/shared/DonutDistributionChart";
import { HorizontalStatusChart } from "@/components/admin/shared/HorizontalStatusChart";

interface ShipmentAnalyticsProps {
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  trendData?: any[];
  donutData?: any[];
}

export function ShipmentAnalytics({
  loading,
  error,
  onRetry,
  trendData = [],
  donutData = [],
}: ShipmentAnalyticsProps) {
  // Sample 30-day shipment trend matching screenshot
  const defaultTrendData = trendData.length > 0 ? trendData : [
    { date: "Apr 27", Created: 120, Collected: 110, "In Transit": 240, Delivered: 780, Delayed: 15, Failed: 10, Returned: 12 },
    { date: "May 1", Created: 140, Collected: 125, "In Transit": 260, Delivered: 800, Delayed: 16, Failed: 11, Returned: 13 },
    { date: "May 5", Created: 135, Collected: 118, "In Transit": 255, Delivered: 810, Delayed: 17, Failed: 12, Returned: 14 },
    { date: "May 9", Created: 150, Collected: 130, "In Transit": 270, Delivered: 825, Delayed: 18, Failed: 12, Returned: 14 },
    { date: "May 13", Created: 145, Collected: 128, "In Transit": 265, Delivered: 830, Delayed: 17, Failed: 11, Returned: 13 },
    { date: "May 17", Created: 160, Collected: 135, "In Transit": 280, Delivered: 838, Delayed: 18, Failed: 12, Returned: 14 },
    { date: "May 21", Created: 155, Collected: 132, "In Transit": 275, Delivered: 840, Delayed: 18, Failed: 12, Returned: 14 },
    { date: "May 25", Created: 156, Collected: 134, "In Transit": 286, Delivered: 842, Delayed: 18, Failed: 12, Returned: 14 },
  ];

  // Sample status donut distribution matching screenshot
  const defaultStatusData = donutData.length > 0 ? donutData : [
    { name: "Awaiting Pickup", value: 64, color: "#f59e0b" },
    { name: "Collected", value: 118, color: "#6366f1" },
    { name: "In Transit", value: 286, color: "#3b82f6" },
    { name: "At Delivery Hub", value: 118, color: "#8b5cf6" },
    { name: "Out for Delivery", value: 156, color: "#06b6d4" },
    { name: "Delivered", value: 842, color: "#10b981" },
    { name: "Delayed", value: 18, color: "#f97316" },
    { name: "Failed Delivery", value: 12, color: "#ef4444" },
    { name: "Return to Origin", value: 14, color: "#a855f7" },
    { name: "On Hold", value: 6, color: "#64748b" },
  ];

  const exceptionCategories = [
    { label: "Pickup Delay", count: 42, percentage: 22.8, color: "#ef4444" },
    { label: "Tracking Gap", count: 38, percentage: 20.6, color: "#f97316" },
    { label: "Hub Delay", count: 28, percentage: 15.2, color: "#f59e0b" },
    { label: "Failed Attempt", count: 26, percentage: 14.1, color: "#e11d48" },
    { label: "Customer Unavailable", count: 18, percentage: 9.7, color: "#a855f7" },
    { label: "Address Issue", count: 12, percentage: 6.5, color: "#3b82f6" },
    { label: "Refused", count: 8, percentage: 4.3, color: "#64748b" },
    { label: "Damaged", count: 6, percentage: 3.2, color: "#dc2626" },
    { label: "Lost", count: 3, percentage: 1.6, color: "#b91c1c" },
    { label: "POD Missing", count: 2, percentage: 1.1, color: "#d97706" },
    { label: "COD Exception", count: 1, percentage: 0.5, color: "#475569" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <ChartCard
        title="Shipment & Delivery Trend (Last 30 Days)"
        subtitle="Operational shipment volume trajectory across network"
        loading={loading}
        error={error}
        onRetry={onRetry}
        className="min-h-[220px]"
      >
        <TrendChart
          data={defaultTrendData}
          colors={["#2563eb", "#6366f1", "#3b82f6", "#06b6d4", "#10b981", "#f97316", "#ef4444", "#a855f7"]}
        />
      </ChartCard>

      <ChartCard
        title="Shipment Status Distribution"
        subtitle="Operational shipment state breakdown"
        loading={loading}
        error={error}
        onRetry={onRetry}
        className="min-h-[220px]"
      >
        <DonutDistributionChart
          data={defaultStatusData}
          totalLabel="Total Shipments"
          totalValue="1,426"
        />
      </ChartCard>

      <ChartCard
        title="Delivery Exception Summary"
        subtitle="Categorized shipment exception breakdown"
        loading={loading}
        error={error}
        onRetry={onRetry}
        className="min-h-[220px]"
      >
        <HorizontalStatusChart
          data={exceptionCategories}
          total={184}
        />
      </ChartCard>
    </div>
  );
}
