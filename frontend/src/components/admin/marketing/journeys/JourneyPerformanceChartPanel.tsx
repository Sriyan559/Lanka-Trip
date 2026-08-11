"use client";

import React, { useState } from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function JourneyPerformanceChartPanel({
  chartData = [],
  summary,
}: {
  chartData: Array<{
    date: string;
    entries: number;
    completions: number;
    conversions: number;
    revenueLkr: number;
  }>;
  summary: {
    entries: string;
    completions: string;
    conversions: string;
    revenue: string;
  };
}) {
  const [timeframe, setTimeframe] = useState<"Daily" | "Weekly" | "Monthly">("Weekly");

  return (
    <MarketingSectionCard
      title="Journey Performance"
      headerActions={
        <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg text-[10px] font-bold">
          {(["Daily", "Weekly", "Monthly"] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-0.5 rounded transition-all ${
                timeframe === tf
                  ? "bg-white text-[#800020] shadow-2xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      }
      className="h-full"
    >
      <div className="flex flex-col gap-2 font-sans">
        {/* Recharts Multi-line Chart */}
        <div className="h-[120px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="entries" stroke="#64748b" strokeWidth={1.5} dot={false} name="Entries" />
              <Line type="monotone" dataKey="completions" stroke="#2563eb" strokeWidth={1.5} dot={false} name="Completions" />
              <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={1.5} dot={false} name="Conversions" />
              <Line type="monotone" dataKey="revenueLkr" stroke="#800020" strokeWidth={2} dot={false} name="Revenue (LKR M)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metric Summary Footer */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-100 text-center font-sans">
          <div>
            <span className="text-gray-400 text-[8.5px] uppercase font-bold block">Entries</span>
            <span className="text-xs font-bold text-gray-900 font-mono">{summary.entries}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[8.5px] uppercase font-bold block">Completions</span>
            <span className="text-xs font-bold text-blue-700 font-mono">{summary.completions}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[8.5px] uppercase font-bold block">Conversions</span>
            <span className="text-xs font-bold text-emerald-700 font-mono">{summary.conversions}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[8.5px] uppercase font-bold block">Revenue</span>
            <span className="text-xs font-extrabold text-[#800020] font-mono">{summary.revenue}</span>
          </div>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
