"use client";

import React from "react";
import { BudgetReallocationItem } from "@/data/marketingBudgets.mock";

interface BudgetReallocationsCardProps {
  reallocations: BudgetReallocationItem[];
}

export function BudgetReallocationsCard({ reallocations }: BudgetReallocationsCardProps) {
  const getStatusBadge = (st: string) => {
    switch (st) {
      case "Approved":
      case "Completed":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Awaiting Approval":
      case "Pending":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Rejected":
        return "bg-rose-50 text-rose-800 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Budget Reallocations
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Reallocation ID</th>
                <th className="py-1">From</th>
                <th className="py-1">To</th>
                <th className="py-1 text-right">Amount</th>
                <th className="py-1 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {reallocations.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-mono text-[11px] text-gray-700">{item.reallocationId}</td>
                  <td className="py-1.5 text-gray-700">{item.fromArea}</td>
                  <td className="py-1.5 text-gray-700">{item.toArea}</td>
                  <td className="py-1.5 text-right font-bold text-gray-900">{item.amount}</td>
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
