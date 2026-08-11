import React from 'react';
import { ChartCard } from '@/components/admin/shared/ChartCard';
import { TrendChart } from '@/components/admin/shared/TrendChart';

interface InvestigationTrendChartProps {
  data?: any[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const TREND_COLORS = ['#2563eb', '#16a34a', '#dc2626', '#f59e0b'];
const TREND_SERIES_LABELS = ['Open Investigations', 'Resolved', 'Confirmed Counterfeit', 'SLA Breaches'];

export function InvestigationTrendChart({
  data = [],
  loading = false,
  error = null,
  onRetry,
}: InvestigationTrendChartProps) {
  // Build legend display
  const legend = (
    <div className="flex flex-wrap items-center gap-3">
      {TREND_SERIES_LABELS.map((label, i) => (
        <span key={label} className="flex items-center gap-1 text-[10px] text-gray-500">
          <span
            className="inline-block w-3 h-0.5 rounded-full"
            style={{ backgroundColor: TREND_COLORS[i] }}
          />
          {label}
        </span>
      ))}
    </div>
  );

  return (
    <ChartCard
      title="Authenticity Investigation Trend (Last 30 Days)"
      subtitle="Open, resolved, confirmed counterfeit and SLA breach trend"
      loading={loading}
      error={error}
      onRetry={onRetry}
      actions={legend}
      className="lg:col-span-2 min-h-[260px]"
    >
      <TrendChart data={data} colors={TREND_COLORS} />
    </ChartCard>
  );
}
