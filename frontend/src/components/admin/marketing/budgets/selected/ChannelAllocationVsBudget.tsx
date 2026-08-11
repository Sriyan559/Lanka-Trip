"use client";

import React from "react";
import { ChannelVsBudgetItem } from "@/data/marketingBudgets.mock";

interface ChannelAllocationVsBudgetProps {
  items: ChannelVsBudgetItem[];
}

export function ChannelAllocationVsBudget({ items }: ChannelAllocationVsBudgetProps) {
  const getStatusBadge = (st: string) => {
    switch (st) {
      case "Healthy":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Overspend Risk":
        return "bg-rose-50 text-rose-800 border-rose-200";
      case "Overcommit":
      case "Warning":
        return "bg-amber-50 text-amber-800 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Channel Allocation vs Budget
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Channel</th>
                <th className="py-1 text-right">Budget</th>
                <th className="py-1 text-right">Committed</th>
                <th className="py-1 text-right">Actual</th>
                <th className="py-1 text-center">Utilization</th>
                <th className="py-1 text-center">Commitment Coverage</th>
                <th className="py-1 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {items.map((item) => (
                <tr key={item.channel} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{item.channel}</td>
                  <td className="py-1.5 text-right font-bold text-gray-900">{item.budget}</td>
                  <td className="py-1.5 text-right font-semibold text-emerald-700">{item.committed}</td>
                  <td className="py-1.5 text-right font-bold text-blue-700">{item.actual}</td>
                  <td className="py-1.5 text-center">
                    <span className="font-bold text-gray-900">{item.utilizationPercent}%</span>
                  </td>
                  <td className="py-1.5 text-center">
                    <span className="font-bold text-gray-900">{item.commitmentCoveragePercent}%</span>
                  </td>
                  <td className="py-1.5 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
