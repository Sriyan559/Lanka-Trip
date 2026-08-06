"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { MOCK_JOB_DISTRIBUTION } from "@/data/importExport.mock";

interface JobStatusDistributionChartProps {
  onStatusClick?: (statusName: string) => void;
}

export function JobStatusDistributionChart({ onStatusClick }: JobStatusDistributionChartProps) {
  const totalJobs = MOCK_JOB_DISTRIBUTION.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white border border-line rounded-lg p-4 shadow-sm flex flex-col justify-between h-full min-w-0">
      <div className="mb-2">
        <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider font-mono">
          Job Status Distribution
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-5">
        {/* Doughnut Chart Canvas */}
        <div className="relative w-full h-[155px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={MOCK_JOB_DISTRIBUTION}
                cx="50%"
                cy="50%"
                innerRadius={44}
                outerRadius={68}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {MOCK_JOB_DISTRIBUTION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "11px", fontWeight: 600 }}
                formatter={(val: any) => [val.toLocaleString(), ""]}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Overlay Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[16px] font-black text-ink leading-tight font-mono">{totalJobs.toLocaleString()}</span>
            <span className="text-[9px] font-semibold text-muted font-sans">Total Jobs</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex flex-col gap-1.5 text-[11px]">
          {MOCK_JOB_DISTRIBUTION.map((item) => (
            <div
              key={item.name}
              onClick={() => onStatusClick && onStatusClick(item.name)}
              className="flex items-center justify-between hover:bg-slate-50 p-1 rounded cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-semibold text-slate-700 truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0 ml-2 font-mono">
                <span className="font-bold text-ink text-[11px]">{item.value.toLocaleString()}</span>
                <span className="text-slate-400 font-semibold text-[10px]">({item.percentage.toFixed(1)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
