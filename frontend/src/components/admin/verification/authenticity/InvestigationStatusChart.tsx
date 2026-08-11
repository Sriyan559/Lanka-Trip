import React from 'react';
import { ChartCard } from '@/components/admin/shared/ChartCard';
import { HorizontalStatusChart, type StatusData } from '@/components/admin/shared/HorizontalStatusChart';

const DEFAULT_STATUSES: StatusData[] = [
  { label: 'New',              count: 0, percentage: 0, color: '#2563eb' },
  { label: 'Under Review',     count: 0, percentage: 0, color: '#8b5cf6' },
  { label: 'Awaiting Evidence',count: 0, percentage: 0, color: '#f59e0b' },
  { label: 'Restricted',       count: 0, percentage: 0, color: '#dc2626' },
  { label: 'Revalidation',     count: 0, percentage: 0, color: '#f97316' },
  { label: 'Resolved',         count: 0, percentage: 0, color: '#16a34a' },
  { label: 'Closed',           count: 0, percentage: 0, color: '#6b7280' },
];

interface InvestigationStatusChartProps {
  data?: StatusData[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function InvestigationStatusChart({
  data = [],
  loading = false,
  error = null,
  onRetry,
}: InvestigationStatusChartProps) {
  // Merge live data with defaults so structure is always visible
  const chartData: StatusData[] = DEFAULT_STATUSES.map((def) => {
    const live = data.find((d) => d.label === def.label);
    return live ? { ...def, ...live } : def;
  });

  const total = chartData.reduce((acc, d) => acc + d.count, 0);

  return (
    <ChartCard
      title="Investigation Status Summary"
      subtitle="Current pipeline distribution across all statuses"
      loading={loading}
      error={error}
      onRetry={onRetry}
      className="lg:col-span-2"
    >
      <HorizontalStatusChart data={chartData} total={total} />
    </ChartCard>
  );
}
