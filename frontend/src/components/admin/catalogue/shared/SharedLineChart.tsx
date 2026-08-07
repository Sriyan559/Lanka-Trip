"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, MoreVertical } from "lucide-react";

export interface SharedLineChartSeries {
  key: string;
  label: string;
  color: string;
}

interface SharedLineChartProps {
  title: string;
  data: any[];
  series: SharedLineChartSeries[];
  xAxisKey: string;
  timeRangeLabel?: string;
  height?: number;
}

export function SharedLineChart({
  title,
  data,
  series,
  xAxisKey,
  timeRangeLabel = "Last 30 Days",
  height = 220
}: SharedLineChartProps) {
  return (
    <div className="bg-white rounded-xl border border-line p-6 shadow-sm flex flex-col h-full min-h-[300px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-bold text-ink">{title}</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-[11px] font-semibold text-ink border border-line px-2 py-1 rounded hover:bg-slate-50">
            {timeRangeLabel} <ChevronDown size={12} />
          </button>
          <button className="text-muted hover:text-ink"><MoreVertical size={14} /></button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        {series.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></div>
            <span className="text-[11px] font-semibold text-muted">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 w-full" style={{ minHeight: height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey={xAxisKey} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} tickCount={7} />
            <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }} />
            {series.map((s, i) => (
              <Line key={i} type="monotone" dataKey={s.key} stroke={s.color} strokeWidth={2} dot={{ r: 3, fill: s.color, strokeWidth: 0 }} activeDot={{ r: 5 }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
