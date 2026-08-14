'use client';

import React from 'react';

interface OrgHealthHeatmapRow {
  category: string;
  tenants: number;
  ecosystems: number;
  organizations: number;
  overall: number;
}

interface OrgHealthHeatmapProps {
  data: OrgHealthHeatmapRow[];
  className?: string;
}

export function OrgHealthHeatmap({ data = [], className = '' }: OrgHealthHeatmapProps) {
  const getCellBg = (val: number) => {
    if (val >= 98) return 'bg-emerald-600 text-white font-bold';
    if (val >= 95) return 'bg-emerald-400 text-emerald-950 font-bold';
    if (val >= 90) return 'bg-yellow-300 text-yellow-950 font-bold';
    return 'bg-rose-400 text-white font-bold';
  };

  return (
    <div className={`w-full overflow-x-auto min-w-0 ${className}`}>
      <table className="w-full text-center border-collapse text-[10px]">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500 font-bold text-[9px] uppercase">
            <th className="p-1 text-left text-gray-400">Category</th>
            <th className="p-1">Tenants</th>
            <th className="p-1">Ecosystems</th>
            <th className="p-1">Organizations</th>
            <th className="p-1 text-gray-900 font-extrabold">Overall</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-gray-100">
              <td className="p-1 text-left font-bold text-gray-800 text-[9px] whitespace-nowrap">
                {row.category}
              </td>
              <td className="p-0.5">
                <div className={`py-0.5 rounded text-[9px] ${getCellBg(row.tenants)}`}>
                  {row.tenants}%
                </div>
              </td>
              <td className="p-0.5">
                <div className={`py-0.5 rounded text-[9px] ${getCellBg(row.ecosystems)}`}>
                  {row.ecosystems}%
                </div>
              </td>
              <td className="p-0.5">
                <div className={`py-0.5 rounded text-[9px] ${getCellBg(row.organizations)}`}>
                  {row.organizations}%
                </div>
              </td>
              <td className="p-0.5">
                <div className={`py-0.5 rounded text-[9px] ${getCellBg(row.overall)}`}>
                  {row.overall}%
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Color Legend */}
      <div className="flex items-center justify-end gap-2 mt-1.5 text-[8px] text-gray-400 font-medium">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-emerald-600 inline-block" />
          <span>98-100%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-emerald-400 inline-block" />
          <span>95-97%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-yellow-300 inline-block" />
          <span>90-94%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-rose-400 inline-block" />
          <span>&lt;90%</span>
        </div>
      </div>
    </div>
  );
}
