"use client";

import React from "react";
import { ChartCard } from "@/components/admin/shared/ChartCard";
import { TrendChart } from "@/components/admin/shared/TrendChart";
import { DonutDistributionChart } from "@/components/admin/shared/DonutDistributionChart";
import { HorizontalStatusChart } from "@/components/admin/shared/HorizontalStatusChart";

interface FulfilmentAnalyticsProps {
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  trendData?: any[];
  donutData?: any[];
}

export function FulfilmentAnalytics({
  loading = false,
  error = null,
  onRetry,
  trendData = [],
  donutData = [],
}: FulfilmentAnalyticsProps) {
  // Default rich 30-day trend data matching screenshot
  const defaultTrend = [
    { date: "Apr 27", Created: 120, Allocated: 110, Picked: 105, Packed: 100, Ready: 95, Blocked: 5, Completed: 90 },
    { date: "May 1", Created: 180, Allocated: 170, Picked: 160, Packed: 155, Ready: 150, Blocked: 8, Completed: 145 },
    { date: "May 5", Created: 140, Allocated: 135, Picked: 130, Packed: 125, Ready: 120, Blocked: 4, Completed: 115 },
    { date: "May 9", Created: 220, Allocated: 210, Picked: 200, Packed: 195, Ready: 190, Blocked: 12, Completed: 180 },
    { date: "May 13", Created: 190, Allocated: 185, Picked: 175, Packed: 170, Ready: 165, Blocked: 6, Completed: 160 },
    { date: "May 17", Created: 260, Allocated: 245, Picked: 235, Packed: 225, Ready: 220, Blocked: 15, Completed: 210 },
    { date: "May 21", Created: 210, Allocated: 200, Picked: 190, Packed: 185, Ready: 180, Blocked: 7, Completed: 175 },
    { date: "May 26", Created: 240, Allocated: 230, Picked: 220, Packed: 210, Ready: 205, Blocked: 10, Completed: 195 },
  ];

  const displayTrend = trendData && trendData.length > 0 ? trendData : defaultTrend;

  // Default status distribution data matching reference screenshot
  const defaultDonut = [
    { name: "New / Unassigned", value: 42, color: "#94a3b8" },
    { name: "Allocation Pending", value: 84, color: "#f59e0b" },
    { name: "Picking in Progress", value: 126, color: "#9333ea" },
    { name: "Packing in Progress", value: 96, color: "#0284c7" },
    { name: "Ready for Dispatch", value: 142, color: "#4f46e5" },
    { name: "Completed", value: 612, color: "#10b981" },
    { name: "On Hold", value: 24, color: "#d97706" },
    { name: "Blocked", value: 18, color: "#ef4444" },
    { name: "SLA Breached", value: 12, color: "#dc2626" },
    { name: "Cancelled", value: 92, color: "#64748b" },
  ];

  const displayDonut = donutData && donutData.length > 0 ? donutData : defaultDonut;

  // Bottleneck categories matching screenshot
  const bottleneckData = [
    { label: "Allocation Delay", count: 84, percentage: 29.8, color: "#ef4444" },
    { label: "Stock Shortage", count: 62, percentage: 22.0, color: "#f97316" },
    { label: "Warehouse Capacity", count: 41, percentage: 14.5, color: "#f59e0b" },
    { label: "Picking Delay", count: 36, percentage: 12.8, color: "#eab308" },
    { label: "Packing Delay", count: 20, percentage: 7.1, color: "#3b82f6" },
    { label: "Quality Failure", count: 17, percentage: 6.0, color: "#a855f7" },
    { label: "Missing Customer Data", count: 12, percentage: 4.3, color: "#64748b" },
    { label: "Shipment Creation Blocked", count: 8, percentage: 2.8, color: "#0284c7" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-2.5">
      {/* PANEL 1: Fulfilment Flow Trend */}
      <ChartCard
        title="Fulfilment Flow Trend (Last 30 Days)"
        subtitle="30-day operational fulfilment volume trajectory"
        loading={loading}
        error={error}
        onRetry={onRetry}
        className="min-h-[240px]"
      >
        <TrendChart
          data={displayTrend}
          colors={["#2563eb", "#10b981", "#9333ea", "#0284c7", "#4f46e5", "#ef4444", "#059669"]}
        />
      </ChartCard>

      {/* PANEL 2: Fulfilment Status Distribution */}
      <ChartCard
        title="Fulfilment Status Distribution"
        subtitle="Breakdown by active operational state"
        loading={loading}
        error={error}
        onRetry={onRetry}
        className="min-h-[240px]"
      >
        <DonutDistributionChart
          data={displayDonut}
          totalLabel="Total Orders"
          totalValue="1,248"
        />
      </ChartCard>

      {/* PANEL 3: Fulfilment Bottleneck Summary */}
      <ChartCard
        title="Fulfilment Bottleneck Summary"
        subtitle="Operational delay points and constraint analysis"
        loading={loading}
        error={error}
        onRetry={onRetry}
        className="min-h-[240px]"
      >
        <HorizontalStatusChart
          data={bottleneckData}
          total={282}
        />
      </ChartCard>
    </div>
  );
}
