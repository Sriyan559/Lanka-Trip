"use client";

import React from "react";
import { BudgetVarianceItem } from "@/data/marketingBudgets.mock";

interface BudgetVarianceCardProps {
  varianceList: BudgetVarianceItem[];
}

export function BudgetVarianceCard({ varianceList }: BudgetVarianceCardProps) {
  const getStatusBadge = (st: string) => {
    switch (st) {
      case "Underspend":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Overspend":
        return "bg-rose-50 text-rose-800 border-rose-200";
      case "Healthy":
      default:
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Budget Variance
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Area</th>
                <th className="py-1 text-right">Variance</th>
                <th className="py-1 text-right">%</th>
                <th className="py-1 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {varianceList.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="py-1 font-semibold text-gray-800">{item.area}</td>
                  <td className="py-1 text-right font-mono text-gray-900">{item.variance}</td>
                  <td className="py-1 text-right font-semibold text-gray-700">{item.variancePercent}</td>
                  <td className="py-1 text-center">
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

      <div className="mt-2 pt-2 border-t border-gray-100 text-left">
        <button className="text-xs font-bold text-[#800020] hover:underline cursor-pointer">
          View All Activity →
        </button>
      </div>
    </div>
  );
}
