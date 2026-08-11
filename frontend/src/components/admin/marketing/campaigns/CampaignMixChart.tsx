"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { CampaignMixItem } from "@/data/campaignManagement.mock";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export function CampaignMixChart({ data = [] }: { data: CampaignMixItem[] }) {
  return (
    <MarketingSectionCard
      title="Campaign Mix (by Type)"
      className="h-auto"
      bodyClassName="p-1 sm:p-1.5 flex flex-col justify-start min-h-0"
    >
      <div className="flex items-center justify-between gap-1 h-[110px]">
        {/* Donut Chart */}
        <div className="w-[70px] h-[70px] relative shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="percentage"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={18}
                outerRadius={32}
                stroke="#ffffff"
                strokeWidth={1.5}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  fontSize: "10px",
                  borderRadius: "6px",
                  border: "1px solid #e2e8f0",
                }}
                formatter={(val: any) => [`${val}%`, "Share"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend List */}
        <div className="flex-1 min-w-0 space-y-0.5 text-[9px] font-medium pr-1">
          {data.map((item) => (
            <div key={item.category} className="flex items-center justify-between gap-1 text-gray-700">
              <div className="flex items-center gap-1 min-w-0">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate">{item.category}</span>
              </div>
              <span className="font-bold text-gray-900 shrink-0">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </MarketingSectionCard>
  );
}

