"use client";

import React from "react";
import { ChannelContributionItem } from "@/data/marketingAttribution.mock";

interface ChannelContributionChartProps {
  channels: ChannelContributionItem[];
}

export function ChannelContributionChart({ channels }: ChannelContributionChartProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Channel Contribution to Attributed Revenue
        </h4>

        <div className="mt-2 space-y-2">
          {channels.map((ch) => (
            <div key={ch.channel} className="space-y-0.5">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-gray-800">{ch.channel}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-gray-600 text-[10px]">{ch.attributedRevenue}</span>
                  <span className="font-bold text-gray-900">{ch.percentOfTotal}</span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: ch.percentOfTotal, backgroundColor: ch.barColor }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-200 flex justify-between items-center text-xs font-bold text-gray-900 bg-gray-50/50 p-2 rounded-lg">
        <span>Total</span>
        <span>LKR 31.70M <span className="text-gray-400 font-normal ml-1">100%</span></span>
      </div>
    </div>
  );
}
