"use client";

import React from "react";
import { DeliveryPerformanceDetails } from "@/data/marketingChannels.mock";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DeliveryPerformanceCardProps {
  details: DeliveryPerformanceDetails;
}

export function DeliveryPerformanceCard({ details }: DeliveryPerformanceCardProps) {
  const hasData = Array.isArray(details.trendData) && details.trendData.length > 0;

  // Structural empty ticks fallback
  const chartData = hasData
    ? details.trendData
    : [
        { date: "Jul 16", deliveryRate: 0, openRate: 0, clickRate: 0 },
        { date: "Aug 14", deliveryRate: 0, openRate: 0, clickRate: 0 },
      ];

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Delivery Performance — Last 30 Days
        </h4>

        {/* Metrics Grid */}
        <div className="mt-2 grid grid-cols-2 gap-y-1.5 gap-x-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-medium">Delivery Rate</span>
            <span className="font-bold text-gray-900 flex items-center gap-1">
              {details.deliveryRate}
              <span className="text-[10px] text-emerald-600 font-medium">
                ▲ {details.deliveryRateTrend}
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-medium">Open Rate</span>
            <span className="font-bold text-gray-900 flex items-center gap-1">
              {details.openRate}
              <span className="text-[10px] text-emerald-600 font-medium">
                ▲ {details.openRateTrend}
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-medium">Click Rate</span>
            <span className="font-bold text-gray-900 flex items-center gap-1">
              {details.clickRate}
              <span className="text-[10px] text-emerald-600 font-medium">
                ▲ {details.clickRateTrend}
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-medium">Bounce Rate</span>
            <span className="font-bold text-gray-900 flex items-center gap-1">
              {details.bounceRate}
              <span className="text-[10px] text-rose-600 font-medium">
                ▼ {details.bounceRateTrend}
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between col-span-2">
            <span className="text-gray-500 font-medium">Complaint Rate</span>
            <span className="font-bold text-gray-900 flex items-center gap-1">
              {details.complaintRate}
              <span className="text-[10px] text-emerald-600 font-medium">
                ▼ {details.complaintRateTrend}
              </span>
            </span>
          </div>
        </div>

        {/* Compact Trend Line Chart */}
        <div className="relative w-full h-[90px] mt-3">
          {!hasData && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
              <span className="text-[11px] font-medium text-gray-400">
                No delivery performance data
              </span>
            </div>
          )}

          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={{ stroke: "#cbd5e1" }}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              {hasData && (
                <Tooltip
                  contentStyle={{
                    fontSize: "10px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    padding: "4px 8px",
                  }}
                />
              )}
              <Line
                type="monotone"
                dataKey="deliveryRate"
                stroke="#16a34a"
                strokeWidth={1.5}
                dot={{ r: 2, fill: "#16a34a" }}
              />
              <Line
                type="monotone"
                dataKey="openRate"
                stroke="#2563eb"
                strokeWidth={1.5}
                dot={{ r: 2, fill: "#2563eb" }}
              />
              <Line
                type="monotone"
                dataKey="clickRate"
                stroke="#a855f7"
                strokeWidth={1.5}
                dot={{ r: 2, fill: "#a855f7" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Delivery Analytics
        </button>
      </div>
    </div>
  );
}
