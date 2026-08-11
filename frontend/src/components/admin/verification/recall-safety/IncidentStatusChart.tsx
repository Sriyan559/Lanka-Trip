import React from 'react';
import { ChartCard } from '@/components/admin/shared/ChartCard';
import { HorizontalStatusChart, type StatusData } from '@/components/admin/shared/HorizontalStatusChart';
import { STATUS_DEFAULTS } from './recallSafetyMock';

interface IncidentStatusChartProps {
  data?: StatusData[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function IncidentStatusChart({
  data = [],
  loading = false,
  error = null,
  onRetry,
}: IncidentStatusChartProps) {
  // Merge live data with defaults — structure always visible
  const chartData: StatusData[] = STATUS_DEFAULTS.map((def) => {
    const live = data.find((d) => d.label === def.label);
    return live ? { ...def, ...live } : def;
  });
  const total = chartData.reduce((a, d) => a + d.count, 0);

  return (
    <ChartCard
      title="Incident Status Summary"
      subtitle="Pipeline distribution across all statuses"
      loading={loading}
      error={error}
      onRetry={onRetry}
      className="min-h-[260px]"
    >
      <HorizontalStatusChart data={chartData} total={total} />
    </ChartCard>
  );
}
