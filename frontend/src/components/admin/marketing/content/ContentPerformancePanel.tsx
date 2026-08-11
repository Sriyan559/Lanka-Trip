"use client";

import React from "react";
import { ContentPerformanceData, ContentVersionItem, ContentActivityItem, ContentAuditItem } from "@/data/marketingContent.mock";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export function ContentPerformancePanel({
  performance,
}: {
  performance: ContentPerformanceData;
}) {
  return (
    <MarketingSectionCard title="12. Content Performance Reference" className="h-full">
      <div className="flex flex-col gap-1.5 font-sans text-xs">
        <div className="grid grid-cols-3 gap-1 text-[10px]">
          <div>
            <span className="text-gray-400 text-[8px] font-bold uppercase block">IMPRESSIONS</span>
            <span className="font-mono font-bold text-gray-900 text-[10.5px]">{performance.impressions}</span>
          </div>
          <div>
            <span className="text-gray-400 text-[8px] font-bold uppercase block">CLICKS</span>
            <span className="font-mono font-bold text-gray-900 text-[10.5px]">{performance.clicks}</span>
          </div>
          <div>
            <span className="text-gray-400 text-[8px] font-bold uppercase block">CTR</span>
            <span className="font-mono font-bold text-emerald-700 text-[10.5px]">{performance.ctr}</span>
          </div>
          <div>
            <span className="text-gray-400 text-[8px] font-bold uppercase block">CONVERSIONS</span>
            <span className="font-mono font-bold text-gray-900 text-[10.5px]">{performance.conversions}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-400 text-[8px] font-bold uppercase block">ATTRIBUTED REVENUE</span>
            <span className="font-mono font-extrabold text-[#800020] text-[10.5px]">{performance.attributedRevenue}</span>
          </div>
        </div>

        {/* Peer comparison badge */}
        <div className="bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[9px] font-bold text-emerald-800 flex justify-between items-center">
          <span>Performance vs Peer Assets</span>
          <span className="font-mono font-extrabold">{performance.peerComparison}</span>
        </div>

        {/* Mini Bar Chart */}
        <div className="h-20 w-full mt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performance.chartPoints} margin={{ top: 2, right: 2, left: -25, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 8 }} />
              <YAxis tick={{ fontSize: 8 }} />
              <Tooltip
                contentStyle={{ fontSize: "10px", padding: "2px 6px" }}
                formatter={(val: any) => [val, "Clicks"]}
              />
              <Bar dataKey="clicks" fill="#800020" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </MarketingSectionCard>
  );
}

export function ContentVersionHistoryPanel({
  history = [],
}: {
  history: ContentVersionItem[];
}) {
  return (
    <MarketingSectionCard
      title="13. Version History"
      footerLink={{
        label: "Compare Versions",
        href: "/admin/marketing/content",
      }}
      className="h-full"
    >
      <div className="w-full font-sans text-[10px]">
        <div className="grid grid-cols-[0.4fr_0.6fr_0.8fr_1fr] items-center gap-1 bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight py-1 px-1 text-[8.5px]">
          <span>VER</span>
          <span>STATUS</span>
          <span>PUBLISHED</span>
          <span>CHANGES</span>
        </div>

        <div className="divide-y divide-gray-100 font-medium text-[10px]">
          {history.map((h) => (
            <div key={h.version} className="grid grid-cols-[0.4fr_0.6fr_0.8fr_1fr] items-center gap-1 py-1 px-1">
              <span className="font-mono font-bold text-gray-900">{h.version}</span>
              <span>
                <span
                  className={`text-[8px] font-bold px-1.5 py-0.2 rounded ${
                    h.status === "Active"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {h.status}
                </span>
              </span>
              <span className="font-mono text-gray-600 text-[8.5px] truncate">{h.publishedOn}</span>
              <span className="text-gray-700 text-[9px] truncate" title={h.changes}>
                {h.changes}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MarketingSectionCard>
  );
}
