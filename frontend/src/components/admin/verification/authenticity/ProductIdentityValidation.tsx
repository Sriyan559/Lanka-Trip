import React from 'react';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';

const DEFAULT_CATEGORIES = [
  { name: 'Match',        color: '#16a34a' },
  { name: 'Partial Match',color: '#f59e0b' },
  { name: 'No Match',     color: '#dc2626' },
  { name: 'Not Verified', color: '#9ca3af' },
];

interface ProductIdentityValidationProps {
  data?: { name: string; value: number; color?: string }[];
}

export function ProductIdentityValidation({ data = [] }: ProductIdentityValidationProps) {
  const chartData = DEFAULT_CATEGORIES.map((cat) => {
    const live = data.find((d) => d.name === cat.name);
    return { name: cat.name, value: live?.value ?? 0, color: live?.color ?? cat.color };
  });
  const total = chartData.reduce((a, d) => a + d.value, 0);
  const matchCount = chartData.find((d) => d.name === 'Match')?.value ?? 0;
  const matchPct = total > 0 ? Math.round((matchCount / total) * 100) : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm h-full">
      <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide mb-3">Product Identity Validation</h3>
      <DonutDistributionChart data={chartData} totalLabel={`${matchPct}% Match`} totalValue={matchPct} />
    </div>
  );
}
