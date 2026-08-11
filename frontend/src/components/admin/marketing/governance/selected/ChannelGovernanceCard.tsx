"use client";

import React from "react";
import { ChannelGovernanceItem } from "@/data/marketingGovernance.mock";

interface ChannelGovernanceCardProps {
  channels: ChannelGovernanceItem[];
}

export function ChannelGovernanceCard({ channels }: ChannelGovernanceCardProps) {
  const getStatusBadge = (st: string) => {
    switch (st) {
      case "Clear":
        return "text-emerald-700 font-bold bg-emerald-50 px-1 rounded";
      case "Warning":
        return "text-amber-700 font-bold bg-amber-50 px-1 rounded";
      case "Review Required":
        return "text-orange-700 font-bold bg-orange-50 px-1 rounded";
      case "Blocked":
      default:
        return "text-rose-700 font-bold bg-rose-50 px-1 rounded";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Channel Governance</span>
          <span className="text-[10px] text-gray-400 font-normal">MK08 Enforcement</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Channel</th>
                <th className="py-1 text-center">Governance Status</th>
                <th className="py-1">Last Review</th>
                <th className="py-1">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {channels.map((ch) => (
                <tr key={ch.channel} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{ch.channel}</td>
                  <td className="py-1.5 text-center">
                    <span className={getStatusBadge(ch.governanceStatus)}>{ch.governanceStatus}</span>
                  </td>
                  <td className="py-1.5 font-mono text-[10px] text-gray-600">{ch.lastReview}</td>
                  <td className="py-1.5 font-medium text-gray-700">{ch.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
