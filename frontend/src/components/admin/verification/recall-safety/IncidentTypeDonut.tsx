import React from 'react';
import { ChartCard } from '@/components/admin/shared/ChartCard';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';
import { INCIDENT_TYPE_DEFAULTS, type DonutCategory } from './recallSafetyMock';

interface IncidentTypeDonutProps {
  data?: DonutCategory[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function IncidentTypeDonut({
  data = [],
  loading = false,
  error = null,
  onRetry,
}: IncidentTypeDonutProps) {
  // Merge live data over defaults
  const chartData = INCIDENT_TYPE_DEFAULTS.map((def) => {
    const live = data.find((d) => d.name === def.name);
    return live ?? def;
  });
  const total = chartData.reduce((a, d) => a + d.value, 0);

  return (
    <ChartCard
      title="Incident Type Distribution"
      subtitle="Breakdown by incident category"
      loading={loading}
      error={error}
      onRetry={onRetry}
      className="min-h-[260px]"
    >
      <DonutDistributionChart
        data={chartData}
        totalLabel="Total Incidents"
        totalValue={total.toLocaleString()}
      />
    </ChartCard>
  );
}
