import React from 'react';

const DEFAULT_CATEGORIES = [
  { label: 'Unique Serial / Batch', color: '#16a34a', count: 0 },
  { label: 'Duplicate Detected',    color: '#dc2626', count: 0 },
  { label: 'Unavailable',           color: '#9ca3af', count: 0 },
];

interface SerialBatchAuthenticityProps {
  data?: { label: string; count: number; color?: string }[];
}

export function SerialBatchAuthenticity({ data = [] }: SerialBatchAuthenticityProps) {
  const merged = DEFAULT_CATEGORIES.map((def) => {
    const live = data.find((d) => d.label === def.label);
    return { ...def, count: live?.count ?? 0, color: live?.color ?? def.color };
  });
  const total = merged.reduce((a, d) => a + d.count, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">Serial &amp; Batch Authenticity</h3>
        <span className="text-[10px] text-gray-400">Total: {total}</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {merged.map((item) => {
          const pct = total > 0 ? ((item.count / total) * 100).toFixed(1) : '0.0';
          return (
            <div key={item.label}>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{item.count}</span>
                  <span className="text-[10px] text-gray-400">({pct}%)</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: item.color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
