"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Calendar, MoreHorizontal } from "lucide-react";
import type { GrowthTrendResponse } from "@/types/catalogue";
import { getCatalogueTrends, type CatalogueQuery } from "@/services/api/catalogueCommandCenter";

export const CatalogueGrowthChart: React.FC<{ initialData: GrowthTrendResponse; query: CatalogueQuery }> = ({ initialData, query }) => {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly" | "quarterly" | "custom">("weekly");
  const [data, setData] = useState(initialData.points);
  const [error, setError] = useState<string | null>(null);
  const changeTimeframe = async (period: "daily" | "weekly" | "monthly" | "quarterly") => {
    setTimeframe(period); setError(null);
    try { setData((await getCatalogueTrends({ ...query, granularity: period })).points); }
    catch { setError("Unable to load approval trend."); }
  };

  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Catalogue Growth & Approval Trend</h2>
          <p className="text-[11.5px] text-gray-500">
            Track creation rate, submission velocity, approval approvals, rejections and publication trends over time.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center bg-gray-100 p-0.5 rounded border border-gray-200 text-[11px] font-semibold">
            {(["daily", "weekly", "monthly", "quarterly"] as const).map((period) => (
              <button
                key={period}
                onClick={() => void changeTimeframe(period)}
                className={`px-2.5 py-1 rounded capitalize transition-colors ${
                  timeframe === period
                    ? "bg-white text-gray-900 shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <button
            onClick={() => setTimeframe("custom")}
            className={`p-1.5 rounded border text-[11px] font-medium flex items-center gap-1 transition-colors ${
              timeframe === "custom"
                ? "bg-[#741d35] text-white border-[#741d35]"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
            title="Custom Date Range"
          >
            <Calendar size={13} />
            <span>Custom</span>
          </button>

          <button className="p-1.5 rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 transition-colors">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Recharts Multi-line chart */}
      <div className="w-full h-72">
        {error ? <div className="h-full flex items-center justify-center text-sm text-rose-600">{error}</div> : data.length === 0 ? <div className="h-full flex items-center justify-center text-sm text-gray-500">No catalogue activity for this period.</div> :
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={{ stroke: "#e2e8f0" }} tick={{ fill: "#64748b", fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={{ stroke: "#e2e8f0" }} tick={{ fill: "#64748b", fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderColor: "#e2e8f0",
                borderRadius: "6px",
                fontSize: "11px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend
              verticalAlign="top"
              align="left"
              wrapperStyle={{ paddingBottom: "15px", fontSize: "11px" }}
              iconType="circle"
              iconSize={8}
            />
            <Line type="monotone" dataKey="created" name="Product Masters Created" stroke="#741d35" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="submitted" name="Products Submitted" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="approved" name="Products Approved" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="rejected" name="Products Rejected" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="published" name="Products Published" stroke="#9333ea" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>}
      </div>
    </div>
  );
};
