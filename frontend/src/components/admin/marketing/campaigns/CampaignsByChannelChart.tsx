"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { ChannelChartItem } from "@/data/campaignManagement.mock";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export function CampaignsByChannelChart({
  data = [],
}: {
  data: ChannelChartItem[];
}) {
  return (
    <MarketingSectionCard
      title="Campaigns by Channel"
      className="h-auto"
      bodyClassName="p-1 sm:p-1.5 flex flex-col justify-start min-h-0"
    >
      <div className="w-full h-[110px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 2, right: 10, left: -5, bottom: 2 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="channel"
              tick={{ fontSize: 9.5, fill: "#475569" }}
              axisLine={false}
              tickLine={false}
              width={58}
            />
            <Tooltip
              contentStyle={{
                fontSize: "10px",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
              }}
              formatter={(value: any) => [`${value} campaigns`, "Count"]}
            />
            <Bar dataKey="count" barSize={7} radius={[0, 3, 3, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index % 2 === 0 ? "#800020" : "#a31c44"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </MarketingSectionCard>
  );
}

