import React from 'react';

const DEFAULT_BUCKETS = [
  { label: '0–24 Hours', key: 'h24',    color: '#16a34a', count: 0 },
  { label: '1–3 Days',   key: 'd3',     color: '#f59e0b', count: 0 },
  { label: '4–7 Days',   key: 'd7',     color: '#f97316', count: 0 },
  { label: '8–14 Days',  key: 'd14',    color: '#dc2626', count: 0 },
  { label: 'Over 14 Days',key: 'over14',color: '#7f1d1d', count: 0 },
];

interface AuthenticitySlaAgeingProps {
  data?: Record<string, number>;
  avgAge?: string;
}

export function AuthenticitySlaAgeing({ data = {}, avgAge }: AuthenticitySlaAgeingProps) {
  const buckets = DEFAULT_BUCKETS.map((b) => ({
    ...b,
    count: data[b.key] ?? 0,
  }));

  const total = buckets.reduce((a, b) => a + b.count, 0);
  const maxCount = Math.max(...buckets.map((b) => b.count), 1);

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">Authenticity SLA &amp; Ageing</h3>
        <span className="text-[10px] text-gray-400">Total: {total}</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {buckets.map((bucket) => {
          const barPct = total > 0 ? ((bucket.count / maxCount) * 100) : 0;
          const pct = total > 0 ? ((bucket.count / total) * 100).toFixed(1) : '0.0';
          return (
            <div key={bucket.key} className="flex items-center text-[11px] gap-2">
              <div className="w-20 flex-shrink-0 text-gray-600">{bucket.label}</div>
              <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${barPct}%`, backgroundColor: bucket.color }} />
              </div>
              <div className="w-8 text-right font-bold text-gray-900 flex-shrink-0">{bucket.count}</div>
              <div className="w-12 text-right text-gray-400 flex-shrink-0">({pct}%)</div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
        <span className="text-gray-500">Avg. Age</span>
        <span className="font-bold text-gray-900">{avgAge ?? data?.avg_age ?? '—'}</span>
      </div>
    </div>
  );
}
