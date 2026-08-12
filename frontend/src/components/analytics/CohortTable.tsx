"use client";

import React from "react";
import { CohortRow } from "@/data/analytics/customersSegmentsData";

interface CohortTableProps {
  data: CohortRow[];
  className?: string;
}

export function CohortTable({ data = [], className = "" }: CohortTableProps) {
  if (!data || data.length === 0) return null;

  // Helper for heatmap cell color intensity
  const getHeatmapBg = (val: number) => {
    if (val >= 100) return "bg-emerald-600 text-white font-bold";
    if (val >= 40) return "bg-emerald-500 text-white font-semibold";
    if (val >= 30) return "bg-emerald-400 text-slate-900 font-medium";
    if (val >= 20) return "bg-emerald-200 text-slate-900 font-medium";
    if (val >= 10) return "bg-emerald-100 text-slate-800";
    if (val >= 5) return "bg-emerald-50 text-slate-700";
    return "bg-slate-50 text-slate-500";
  };

  const monthKeys: (keyof CohortRow)[] = [
    "m0",
    "m1",
    "m2",
    "m3",
    "m4",
    "m5",
    "m6",
    "m7",
    "m8",
    "m9",
    "m10",
    "m11",
    "m12",
  ];

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full text-[10px] border-collapse text-center">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase">
            <th className="py-1 px-2 text-left font-extrabold text-slate-700">Cohort</th>
            {monthKeys.map((_, i) => (
              <th key={i} className="py-1 px-1 min-w-[28px]">
                {i}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-1 px-2 text-left font-bold text-slate-800 whitespace-nowrap">
                {row.cohort}
              </td>
              {monthKeys.map((mk, mIdx) => {
                const val = row[mk] as number;
                return (
                  <td key={mIdx} className="p-0.5">
                    <div
                      className={`w-full h-5 flex items-center justify-center rounded-xs text-[9.5px] ${getHeatmapBg(
                        val
                      )}`}
                    >
                      {val}%
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
