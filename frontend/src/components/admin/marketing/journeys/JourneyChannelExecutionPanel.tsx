"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";

export function JourneyChannelExecutionPanel({
  channels = [],
}: {
  channels: Array<{
    channel: string;
    delivered: string;
    engagement: string;
    conversion: string;
    deliveryHealth: "Healthy" | "Warning" | "Degraded";
  }>;
}) {
  return (
    <MarketingSectionCard title="Channel Execution" className="h-full">
      <div className="w-full font-sans text-[10px]">
        {/* CSS Grid Header */}
        <div className="grid grid-cols-[0.8fr_0.8fr_0.9fr_0.8fr_0.8fr] items-center gap-1 bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight py-1 px-1 text-[8.5px]">
          <span className="truncate">CHANNEL</span>
          <span className="truncate">DELIVERED</span>
          <span className="truncate">ENGAGEMENT</span>
          <span className="truncate">CONVERSION</span>
          <span className="truncate text-right">HEALTH</span>
        </div>

        {/* CSS Grid Body Rows */}
        <div className="divide-y divide-gray-100 font-medium text-[10px]">
          {channels.map((c) => (
            <div
              key={c.channel}
              className="grid grid-cols-[0.8fr_0.8fr_0.9fr_0.8fr_0.8fr] items-center gap-1 py-1.5 px-1 hover:bg-gray-50/50"
            >
              <span className="font-bold text-gray-900 truncate">
                {c.channel}
              </span>
              <span className="font-mono text-gray-800 text-[9.5px]">
                {c.delivered}
              </span>
              <span className="font-mono text-gray-700 text-[9.5px]">
                {c.engagement}
              </span>
              <span className="font-mono font-bold text-emerald-700 text-[9.5px]">
                {c.conversion}
              </span>
              <span className="text-right">
                <MarketingStatusChip status={c.deliveryHealth} className="text-[7.5px] px-1 py-0.2" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </MarketingSectionCard>
  );
}

export function JourneyGoalsPanel({
  goals = [],
}: {
  goals: Array<{
    goal: string;
    type: "Primary" | "Secondary";
    target: string;
    current: string;
    achievement: number;
  }>;
}) {
  return (
    <MarketingSectionCard title="Journey Goals" className="h-full">
      <div className="w-full font-sans text-[10px]">
        {/* CSS Grid Header */}
        <div className="grid grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr_0.7fr] items-center gap-1 bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight py-1 px-1 text-[8.5px]">
          <span className="truncate">GOAL</span>
          <span className="truncate">TYPE</span>
          <span className="truncate">TARGET</span>
          <span className="truncate">CURRENT</span>
          <span className="truncate text-right">ACHIEV.</span>
        </div>

        {/* CSS Grid Body Rows */}
        <div className="divide-y divide-gray-100 font-medium text-[10px]">
          {goals.map((g) => (
            <div
              key={g.goal}
              className="grid grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr_0.7fr] items-center gap-1 py-1.5 px-1 hover:bg-gray-50/50"
            >
              <span className="font-bold text-gray-900 truncate" title={g.goal}>
                {g.goal}
              </span>
              <span className="text-gray-500 text-[9px] truncate">
                {g.type}
              </span>
              <span className="font-mono text-gray-600 text-[9.5px]">
                {g.target}
              </span>
              <span className="font-mono font-bold text-gray-900 text-[9.5px]">
                {g.current}
              </span>
              <span className="text-right font-mono font-bold text-emerald-700 text-[9.5px]">
                {g.achievement}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </MarketingSectionCard>
  );
}
