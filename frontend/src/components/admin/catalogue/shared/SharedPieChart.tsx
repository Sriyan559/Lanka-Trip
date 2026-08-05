"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { MoreVertical } from "lucide-react";

export interface SharedPieChartData {
  name: string;
  value: number;
  color: string;
}

interface SharedPieChartProps {
  title: string;
  data: SharedPieChartData[];
  totalLabel?: string;
  height?: number;
}

export function SharedPieChart({
  title,
  data,
  totalLabel = "Total",
  height = 160
}: SharedPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-5 border-r border-line flex flex-col relative h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-bold text-ink">{title}</h3>
        <button className="text-muted hover:text-ink"><MoreVertical size={14} /></button>
      </div>

      <div className="flex-1 flex items-center justify-center relative" style={{ minHeight: height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
           <span className="text-[18px] font-bold text-ink leading-none">{total.toLocaleString()}</span>
           <span className="text-[9px] font-semibold text-muted leading-tight">{totalLabel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-1.5 mt-2 max-h-[100px] overflow-y-auto scrollbar-none pr-2">
        {data.map((item) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={item.name} className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5 truncate">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-semibold text-ink truncate">{item.name}</span>
              </div>
              <div className="flex gap-2 flex-shrink-0 min-w-[65px] justify-end">
                <span className="font-bold text-ink">{item.value.toLocaleString()}</span>
                <span className="text-muted font-semibold w-8 text-right">({percentage}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
