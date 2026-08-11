"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export interface DonutDataItem {
  name: string;
  value: number;
  color: string;
  percentage?: string;
}

interface ReusableDonutChartProps {
  data: DonutDataItem[];
  totalLabel?: string;
  totalValue?: string | number;
  height?: number;
  className?: string;
}

export function ReusableDonutChart({
  data,
  totalLabel = "Total",
  totalValue,
  height = 180,
  className = "",
}: ReusableDonutChartProps) {
  const sum = data.reduce((acc, item) => acc + (Number(item.value) || 0), 0);
  const displayTotal = totalValue !== undefined ? totalValue : sum;

  return (
    <div className={`w-full flex items-center justify-between gap-1.5 ${className}`} style={{ height: `${height}px` }}>
      {/* Donut Chart Ring Container */}
      <div className="relative w-5/12 h-full flex items-center justify-center flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={36}
              outerRadius={52}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                fontSize: "11px",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-1">
          <span className="text-base font-extrabold text-gray-900 leading-none">
            {displayTotal}
          </span>
          <span className="text-[8px] text-gray-500 font-semibold uppercase tracking-tight mt-0.5 leading-tight">
            {totalLabel}
          </span>
        </div>
      </div>

      {/* Right Legend List Container */}
      <div className="w-7/12 flex-1 flex flex-col justify-center gap-1.5 pl-1 min-w-0">
        {data.map((item, idx) => {
          const numVal = Number(item.value) || 0;
          const totalVal = Number(displayTotal) || sum || 1;
          const pctStr = item.percentage || `${((numVal / totalVal) * 100).toFixed(1)}%`;
          return (
            <div key={idx} className="flex items-center justify-between text-[10px] gap-1 leading-tight">
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-700 font-medium truncate text-[10px]" title={item.name}>
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0 text-right">
                <span className="font-bold text-gray-900 text-[10px]">{item.value}</span>
                <span className="text-gray-400 text-[9px] font-mono">({pctStr})</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
