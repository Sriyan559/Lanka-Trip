"use client";

import React from "react";
import { ChannelPerformanceItem } from "@/data/marketingAttribution.mock";

interface ChannelPerformanceTableProps {
  channels: ChannelPerformanceItem[];
}

export function ChannelPerformanceTable({ channels }: ChannelPerformanceTableProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Channel Performance
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Channel</th>
                <th className="py-1 text-right">Spend</th>
                <th className="py-1 text-right">Reach</th>
                <th className="py-1 text-right">Engagement</th>
                <th className="py-1 text-right">Attrib. Revenue</th>
                <th className="py-1 text-right">ROAS</th>
                <th className="py-1 text-right">CAC</th>
                <th className="py-1 text-right">Contrib. %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {channels.map((ch) => (
                <tr key={ch.channel} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{ch.channel}</td>
                  <td className="py-1.5 text-right font-bold text-rose-700">{ch.spend}</td>
                  <td className="py-1.5 text-right text-gray-600 font-mono">{ch.reach}</td>
                  <td className="py-1.5 text-right text-gray-600 font-mono">{ch.engagement}</td>
                  <td className="py-1.5 text-right font-bold text-emerald-700">{ch.attributedRevenue}</td>
                  <td className="py-1.5 text-right font-bold text-blue-700">{ch.roas}</td>
                  <td className="py-1.5 text-right font-semibold text-gray-700">{ch.cac}</td>
                  <td className="py-1.5 text-right font-bold text-gray-900">{ch.contributionPercent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
