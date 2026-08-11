import React from 'react';
import { ChartCard } from '@/components/admin/shared/ChartCard';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';

const DEFAULT_CATEGORIES = [
  { name: 'Counterfeit',           color: '#dc2626' },
  { name: 'Unauthorized Brand Use',color: '#f97316' },
  { name: 'Packaging',             color: '#f59e0b' },
  { name: 'Identifier',            color: '#8b5cf6' },
  { name: 'Duplicate Listing',     color: '#2563eb' },
  { name: 'Other',                 color: '#9ca3af' },
];

interface IssueDistributionChartProps {
  data?: { name: string; value: number; color?: string }[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function IssueDistributionChart({
  data = [],
  loading = false,
  error = null,
  onRetry,
}: IssueDistributionChartProps) {
  // Merge live data with default category colors/structure
  const chartData = DEFAULT_CATEGORIES.map((cat) => {
    const live = data.find((d) => d.name === cat.name);
    return {
      name: cat.name,
      value: live?.value ?? 0,
      color: live?.color ?? cat.color,
    };
  });

  const total = chartData.reduce((acc, d) => acc + d.value, 0);

  return (
    <ChartCard
      title="Issue Distribution"
      subtitle="Breakdown of open authenticity issues by category"
      loading={loading}
      error={error}
      onRetry={onRetry}
      className="min-h-[260px]"
    >
      <DonutDistributionChart
        data={chartData}
        totalLabel="Total Issues"
        totalValue={total.toLocaleString()}
      />
    </ChartCard>
  );
}
