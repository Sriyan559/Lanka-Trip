import React from 'react';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';

const DEFAULT_CATEGORIES = [
  { name: 'Confirmed Counterfeit',  color: '#dc2626' },
  { name: 'Unauthorized Brand Use', color: '#f97316' },
  { name: 'Packaging Conflicts',    color: '#f59e0b' },
  { name: 'Identifier Conflicts',   color: '#8b5cf6' },
  { name: 'Duplicate Listings',     color: '#2563eb' },
  { name: 'Other',                  color: '#9ca3af' },
];

interface AuthenticityFindingsProps {
  data?: { name: string; value: number; color?: string }[];
}

export function AuthenticityFindings({ data = [] }: AuthenticityFindingsProps) {
  const chartData = DEFAULT_CATEGORIES.map((cat) => {
    const live = data.find((d) => d.name === cat.name);
    return { name: cat.name, value: live?.value ?? 0, color: live?.color ?? cat.color };
  });
  const total = chartData.reduce((a, d) => a + d.value, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">Authenticity Findings</h3>
        <span className="text-[10px] text-gray-400">Total Findings: {total}</span>
      </div>
      <DonutDistributionChart data={chartData} totalLabel="Total Findings" totalValue={total} />
    </div>
  );
}
