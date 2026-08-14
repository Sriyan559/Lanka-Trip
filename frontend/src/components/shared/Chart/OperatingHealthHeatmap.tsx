'use client';

import React from 'react';

interface OperatingHealthHeatmapRow {
  category: string;
  poor: number;
  fair: number;
  good: number;
  excellent: number;
}

interface OperatingHealthHeatmapProps {
  data: OperatingHealthHeatmapRow[];
  className?: string;
}

export function OperatingHealthHeatmap({ data = [], className = '' }: OperatingHealthHeatmapProps) {
  const getCellBg = (col: 'poor' | 'fair' | 'good' | 'excellent', val: number) => {
    if (val === 0) return 'bg-gray-50 text-gray-300';
    if (col === 'poor') return 'bg-rose-100 text-rose-800 font-bold';
    if (col === 'fair') return 'bg-amber-100 text-amber-800 font-bold';
    if (col === 'good') return 'bg-blue-100 text-blue-800 font-semibold';
    return 'bg-emerald-100 text-emerald-800 font-bold';
  };

  return (
    <div className={`w-full overflow-x-auto min-w-0 ${className}`}>
      <table className="w-full text-center border-collapse text-[10px]">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500 font-bold text-[9px] uppercase">
            <th className="p-1 text-left text-gray-400">Category</th>
            <th className="p-1 text-rose-700">Poor</th>
            <th className="p-1 text-amber-700">Fair</th>
            <th className="p-1 text-blue-700">Good</th>
            <th className="p-1 text-emerald-700">Excellent</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-gray-100">
              <td className="p-1 text-left font-bold text-gray-800 text-[9px] whitespace-nowrap">
                {row.category}
              </td>
              <td className="p-0.5">
                <div className={`py-0.5 rounded text-[10px] ${getCellBg('poor', row.poor)}`}>
                  {row.poor}%
                </div>
              </td>
              <td className="p-0.5">
                <div className={`py-0.5 rounded text-[10px] ${getCellBg('fair', row.fair)}`}>
                  {row.fair}%
                </div>
              </td>
              <td className="p-0.5">
                <div className={`py-0.5 rounded text-[10px] ${getCellBg('good', row.good)}`}>
                  {row.good}%
                </div>
              </td>
              <td className="p-0.5">
                <div className={`py-0.5 rounded text-[10px] ${getCellBg('excellent', row.excellent)}`}>
                  {row.excellent}%
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default OperatingHealthHeatmap;
