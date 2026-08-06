"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar } from "lucide-react";
import { MOCK_TREND_DATA } from "@/data/importExport.mock";

export function DataOperationsTrendChart() {
  const [period, setPeriod] = useState<"Daily" | "Weekly" | "Monthly" | "Quarterly" | "Custom">("Daily");

  const series = [
    { key: "imports", label: "Imports", color: "#671021" },
    { key: "exports", label: "Exports", color: "#059669" },
    { key: "processed", label: "Processed Records", color: "#8b5cf6" },
    { key: "failures", label: "Failed Records", color: "#dc2626" },
  ];

  return (
    <div className="bg-white border border-line rounded-lg p-4 shadow-sm flex flex-col justify-between h-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider font-mono">
            Data Operations Trend
          </h3>
        </div>

        {/* Period Controls */}
        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-md border border-line">
          {(["Daily", "Weekly", "Monthly", "Quarterly", "Custom"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-2.5 py-1 text-[10px] font-bold rounded transition-colors ${
                period === p
                  ? "bg-white text-ink shadow-xs border border-line"
                  : "text-muted hover:text-ink"
              }`}
            >
              {p}
            </button>
          ))}
          <button className="p-1 text-slate-500 hover:text-ink">
            <Calendar size={13} />
          </button>
        </div>
      </div>

      {/* Series Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-3">
        {series.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-[180px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={MOCK_TREND_DATA} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }} dy={5} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }}
              tickFormatter={(v) => `${v / 1000}K`}
            />
            <RechartsTooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px", fontWeight: 600 }}
              formatter={(val: any) => [val.toLocaleString(), ""]}
            />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={2}
                dot={{ r: 3, fill: s.color, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
