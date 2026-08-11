import React from 'react';

const DEFAULT_METRICS = [
  { label: 'Logo Comparison',           key: 'logo',      rate: 0, color: '#7c3aed' },
  { label: 'Typography Comparison',     key: 'typography',rate: 0, color: '#2563eb' },
  { label: 'Color Comparison',          key: 'color',     rate: 0, color: '#0891b2' },
  { label: 'Warning / Label Comparison',key: 'warning',   rate: 0, color: '#f59e0b' },
  { label: 'Seal / Closure Comparison', key: 'seal',      rate: 0, color: '#16a34a' },
];

interface PackagingComparisonProps {
  data?: Record<string, number>;
}

export function PackagingComparison({ data = {} }: PackagingComparisonProps) {
  const metrics = DEFAULT_METRICS.map((m) => ({
    ...m,
    rate: data[m.key] ?? 0,
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">Packaging Authenticity Comparison</h3>
        <span className="text-[10px] text-gray-400">Match Rate</span>
      </div>
      <div className="flex flex-col gap-3">
        {metrics.map((m) => (
          <div key={m.key}>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-gray-600">{m.label}</span>
              <span className="font-bold text-gray-900">{m.rate}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${m.rate}%`, backgroundColor: m.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
