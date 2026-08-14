'use client';

import React from 'react';

export interface ComparisonItem {
  field: string;
  before: string | number;
  after: string | number;
  changed?: boolean;
}

interface BeforeAfterComparisonProps {
  title?: string;
  fields: ComparisonItem[];
  onViewFullComparison?: () => void;
  className?: string;
}

export function BeforeAfterComparison({
  title = 'Before / After Comparison',
  fields = [],
  onViewFullComparison,
  className = '',
}: BeforeAfterComparisonProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900">{title}</h3>
        </div>

        <div className="overflow-x-auto min-w-0">
          <table className="w-full text-left border-collapse text-[10px]">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider text-[9px]">
                <th className="py-1 px-1.5 text-left">Field</th>
                <th className="py-1 px-1.5 text-left">Before</th>
                <th className="py-1 px-1.5 text-left">After</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {fields.map((item, idx) => {
                const isDiff = item.before !== item.after || item.changed;
                return (
                  <tr key={idx} className={isDiff ? 'bg-amber-50/40' : ''}>
                    <td className="py-1 px-1.5 font-semibold text-gray-700 whitespace-nowrap">
                      {item.field}
                    </td>
                    <td className={`py-1 px-1.5 ${isDiff ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                      {String(item.before)}
                    </td>
                    <td className={`py-1 px-1.5 font-bold ${isDiff ? 'text-amber-800' : 'text-gray-700'}`}>
                      {String(item.after)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {onViewFullComparison && (
        <div className="pt-2 border-t border-gray-100 mt-2">
          <button
            type="button"
            onClick={onViewFullComparison}
            className="text-[10px] font-bold text-gray-600 hover:text-[#741d35] transition-colors"
          >
            View full comparison →
          </button>
        </div>
      )}
    </div>
  );
}

export default BeforeAfterComparison;
