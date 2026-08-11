import React from 'react';

const DEFAULT_SOURCES = [
  { label: 'Consumer Reports',       color: '#2563eb' },
  { label: 'Brand Reports',          color: '#7c3aed' },
  { label: 'Marketplace Monitoring', color: '#0891b2' },
  { label: 'Image Scanner',          color: '#d97706' },
  { label: 'GTIN Monitor',           color: '#dc2626' },
  { label: 'Other',                  color: '#9ca3af' },
];

interface DetectionSourcesCardProps {
  data?: { label: string; count: number; color?: string }[];
  total?: number;
}

export function DetectionSourcesCard({ data = [], total: externalTotal }: DetectionSourcesCardProps) {
  const merged = DEFAULT_SOURCES.map((def) => {
    const live = data.find((d) => d.label === def.label);
    return { label: def.label, count: live?.count ?? 0, color: live?.color ?? def.color };
  });

  const total = externalTotal ?? merged.reduce((a, d) => a + d.count, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">Authenticity Detection Sources</h3>
        <span className="text-[10px] text-gray-400">Total: {total.toLocaleString()}</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {merged.map((src) => {
          const pct = total > 0 ? ((src.count / total) * 100).toFixed(1) : '0.0';
          return (
            <div key={src.label} className="flex items-center text-[11px] gap-2">
              <div className="w-28 flex-shrink-0 text-gray-600 truncate">{src.label}</div>
              <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: src.color }} />
              </div>
              <div className="w-10 text-right font-semibold text-gray-900 flex-shrink-0">{src.count}</div>
              <div className="w-12 text-right text-gray-400 flex-shrink-0">({pct}%)</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
