"use client";

import React from "react";
import { ChannelActivityItem } from "@/data/marketingChannels.mock";

interface ChannelActivityTableProps {
  activities: ChannelActivityItem[];
}

export function ChannelActivityTable({ activities }: ChannelActivityTableProps) {
  const getSeverityBadge = (severity: ChannelActivityItem["severity"]) => {
    switch (severity) {
      case "Critical":
      case "High":
        return "bg-rose-50 text-rose-700 border-rose-200 font-bold";
      case "Medium":
        return "bg-amber-50 text-amber-800 border-amber-200 font-semibold";
      case "Low":
      default:
        return "bg-emerald-50 text-emerald-800 border-emerald-200 font-medium";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Recent Activity / Exception Queue
        </h4>

        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="pb-1.5 font-semibold">Time</th>
                <th className="pb-1.5 font-semibold">Severity</th>
                <th className="pb-1.5 font-semibold">Message</th>
                <th className="pb-1.5 font-semibold">Status</th>
                <th className="pb-1.5 font-semibold">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {activities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-400">
                    No recent activity or exceptions reported.
                  </td>
                </tr>
              ) : (
                activities.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-2 text-[11px] font-mono text-gray-500 whitespace-nowrap">
                      {item.time}
                    </td>
                    <td className="py-2">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] border ${getSeverityBadge(
                          item.severity
                        )}`}
                      >
                        {item.severity}
                      </span>
                    </td>
                    <td className="py-2 font-medium text-gray-900 pr-2">
                      {item.summary}
                    </td>
                    <td className="py-2 text-[11px] text-gray-600">
                      {item.status}
                    </td>
                    <td className="py-2 text-[11px] text-gray-500 whitespace-nowrap">
                      {item.owner}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100 flex justify-center">
        <button className="px-4 py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View All Exceptions
        </button>
      </div>
    </div>
  );
}
