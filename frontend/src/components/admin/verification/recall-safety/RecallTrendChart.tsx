import React from 'react';
import { ChartCard } from '@/components/admin/shared/ChartCard';
import { TrendChart } from '@/components/admin/shared/TrendChart';

const TREND_COLORS = ['#dc2626', '#f97316', '#7c3aed', '#16a34a', '#f59e0b'];
const SERIES_LABELS = [
  'Open Incidents',
  'Active Recalls',
  'Quarantined Batches',
  'Resolved Cases',
  'SLA Breaches',
];

interface RecallTrendChartProps {
  data?: any[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function RecallTrendChart({
  data = [],
  loading = false,
  error = null,
  onRetry,
}: RecallTrendChartProps) {
  const legend = (
    <div className="flex flex-wrap items-center gap-3">
      {SERIES_LABELS.map((label, i) => (
        <span key={label} className="flex items-center gap-1 text-[10px] text-gray-500">
          <span className="inline-block w-3 h-0.5 rounded-full" style={{ backgroundColor: TREND_COLORS[i] }} />
          {label}
        </span>
      ))}
    </div>
  );

  return (
    <ChartCard
      title="Recall & Safety Incident Trend"
      subtitle="Last 30 Days"
      loading={loading}
      error={error}
      onRetry={onRetry}
      actions={legend}
      className="min-h-[260px]"
    >
      <TrendChart data={data} colors={TREND_COLORS} />
    </ChartCard>
  );
}
