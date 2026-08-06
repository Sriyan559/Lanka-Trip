"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MOCK_QUALITY_TREND } from "@/data/catalogueQuality.mock";
import { ChevronDown, MoreVertical } from "lucide-react";

export function CatalogueQualityTrend() {
  const [period, setPeriod] = useState("Last 30 Days");

  const series = [
    { key: "openIssues", name: "Open Issues", color: "#0284c7" },
    { key: "resolvedIssues", name: "Resolved Issues", color: "#059669" },
    { key: "criticalIssues", name: "Critical Issues", color: "#dc2626" },
    { key: "slaBreaches", name: "SLA Breaches", color: "#8b5cf6" },
  ];

  return (
    <div className="bg-white border border-line rounded-lg p-4 shadow-sm flex flex-col justify-between h-full min-w-0">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider font-mono">
          Catalogue Quality Trend
        </h3>

        <div className="flex items-center gap-2">
          {/* Period Selector */}
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="h-7 px-2.5 pr-7 bg-slate-50 border border-line rounded text-[11px] font-semibold text-slate-700 appearance-none focus:outline-none cursor-pointer"
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="Custom Range">Custom Range</option>
            </select>
            <ChevronDown
              size={12}
              className="absolute right-2 top-2 text-slate-500 pointer-events-none"
            />
          </div>

          <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
            <MoreVertical size={14} />
          </button>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="flex items-center gap-4 text-[10.5px] font-semibold mb-2">
        {series.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-slate-600">{s.name}</span>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <div className="w-full h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={MOCK_QUALITY_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              tick={{ fontSize: 10, fill: "#64748b" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "#64748b" }}
              domain={[0, 1400]}
            />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "11px", fontWeight: 600 }}
            />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                strokeWidth={2}
                dot={{ r: 3, fill: s.color }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
