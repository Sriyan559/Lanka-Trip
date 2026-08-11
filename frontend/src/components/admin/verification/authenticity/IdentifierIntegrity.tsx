import React from 'react';

const DEFAULT_METRICS = [
  { label: 'GTIN Validation',              key: 'gtin_validation',    count: 0, rate: 0, color: '#16a34a' },
  { label: 'Duplicate Barcode Detection',  key: 'duplicate_barcode',  count: 0, rate: 0, color: '#f59e0b' },
  { label: 'Serial Duplication Detection', key: 'serial_duplication', count: 0, rate: 0, color: '#dc2626' },
  { label: 'Batch Validation',             key: 'batch_validation',   count: 0, rate: 0, color: '#2563eb' },
];

interface IdentifierIntegrityProps {
  data?: Record<string, { count?: number; rate?: number }>;
}

export function IdentifierIntegrity({ data = {} }: IdentifierIntegrityProps) {
  const metrics = DEFAULT_METRICS.map((m) => ({
    ...m,
    count: data[m.key]?.count ?? 0,
    rate:  data[m.key]?.rate  ?? 0,
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm h-full">
      <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide mb-3">
        Barcode / GTIN &amp; Identifier Integrity
      </h3>
      <div className="flex flex-col gap-3">
        {metrics.map((m) => (
          <div key={m.key} className="flex items-center justify-between">
            <div className="flex-grow">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }} />
                  <span className="text-gray-600">{m.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{m.count}</span>
                  <span className="text-gray-400 text-[10px]">({m.rate}%)</span>
                </div>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${m.rate}%`, backgroundColor: m.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
