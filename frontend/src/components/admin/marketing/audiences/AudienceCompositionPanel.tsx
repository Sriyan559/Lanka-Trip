"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export function AudienceCompositionPanel({
  lifecycle = [],
  valueTier = [],
}: {
  lifecycle: Array<{ name: string; percentage: number; color: string }>;
  valueTier: Array<{ name: string; percentage: number; color: string }>;
}) {
  return (
    <MarketingSectionCard
      title="Audience Composition"
      footerLink={{
        label: "View Full Report",
        href: "/admin/marketing/reports-audit",
      }}
      className="h-full"
    >
      <div className="flex items-center justify-between gap-2 h-[130px] font-sans">
        {/* Donut 1: Customer Lifecycle */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <div className="w-[60px] h-[60px] relative shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={lifecycle}
                  dataKey="percentage"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={15}
                  outerRadius={28}
                  stroke="#ffffff"
                  strokeWidth={1}
                >
                  {lifecycle.map((entry, idx) => (
                    <Cell key={`cell-lc-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${val}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-0.5 text-[8.5px] font-semibold min-w-0">
            <span className="text-gray-400 uppercase font-bold text-[8px] mb-0.5">Lifecycle</span>
            {lifecycle.map((item) => (
              <div key={item.name} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate text-gray-700">{item.name}</span>
                <span className="font-bold text-gray-900 ml-auto font-mono">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[1px] h-full bg-gray-100 shrink-0 mx-1" />

        {/* Donut 2: Customer Value Tier */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <div className="w-[60px] h-[60px] relative shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={valueTier}
                  dataKey="percentage"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={15}
                  outerRadius={28}
                  stroke="#ffffff"
                  strokeWidth={1}
                >
                  {valueTier.map((entry, idx) => (
                    <Cell key={`cell-vt-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${val}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-0.5 text-[8.5px] font-semibold min-w-0">
            <span className="text-gray-400 uppercase font-bold text-[8px] mb-0.5">Value Tier</span>
            {valueTier.map((item) => (
              <div key={item.name} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate text-gray-700">{item.name}</span>
                <span className="font-bold text-gray-900 ml-auto font-mono">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
