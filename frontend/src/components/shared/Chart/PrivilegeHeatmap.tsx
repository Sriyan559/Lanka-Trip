'use client';

import React from 'react';

interface HeatmapRow {
  risk: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

interface PrivilegeHeatmapProps {
  data: HeatmapRow[];
  className?: string;
}

export function PrivilegeHeatmap({ data = [], className = '' }: PrivilegeHeatmapProps) {
  // Helper to color heatmap cells based on value and risk
  const getCellColor = (risk: string, col: 'critical' | 'high' | 'medium' | 'low', val: number) => {
    if (val === 0) return 'bg-gray-50 text-gray-400';
    if (risk.includes('Critical')) {
      if (col === 'critical' || col === 'high') return 'bg-rose-200 text-rose-900 font-bold';
      return 'bg-amber-100 text-amber-900 font-bold';
    }
    if (risk.includes('Medium')) {
      if (col === 'high' || col === 'medium') return 'bg-amber-200 text-amber-900 font-bold';
      return 'bg-yellow-100 text-yellow-900 font-semibold';
    }
    if (col === 'low' || col === 'medium') return 'bg-emerald-100 text-emerald-900 font-bold';
    return 'bg-emerald-50 text-emerald-800 font-semibold';
  };

  return (
    <div className={`w-full overflow-x-auto min-w-0 ${className}`}>
      <table className="w-full text-center border-collapse text-[10px]">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500 font-bold text-[9px] uppercase">
            <th className="p-1.5 text-left text-gray-400">Risk \ Privilege</th>
            <th className="p-1.5 text-rose-700">Critical</th>
            <th className="p-1.5 text-amber-700">High</th>
            <th className="p-1.5 text-blue-700">Medium</th>
            <th className="p-1.5 text-emerald-700">Low</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-150">
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-gray-100">
              <td className="p-1.5 text-left font-bold text-gray-800 whitespace-nowrap text-[9px]">
                {row.risk}
              </td>
              <td className="p-1">
                <div className={`py-1 rounded text-xs ${getCellColor(row.risk, 'critical', row.critical)}`}>
                  {row.critical}
                </div>
              </td>
              <td className="p-1">
                <div className={`py-1 rounded text-xs ${getCellColor(row.risk, 'high', row.high)}`}>
                  {row.high}
                </div>
              </td>
              <td className="p-1">
                <div className={`py-1 rounded text-xs ${getCellColor(row.risk, 'medium', row.medium)}`}>
                  {row.medium}
                </div>
              </td>
              <td className="p-1">
                <div className={`py-1 rounded text-xs ${getCellColor(row.risk, 'low', row.low)}`}>
                  {row.low}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
