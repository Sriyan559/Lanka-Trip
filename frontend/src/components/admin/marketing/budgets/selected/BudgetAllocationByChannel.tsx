"use client";

import React from "react";
import { ChannelAllocationItem } from "@/data/marketingBudgets.mock";

interface BudgetAllocationByChannelProps {
  allocations: ChannelAllocationItem[];
}

export function BudgetAllocationByChannel({ allocations }: BudgetAllocationByChannelProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Budget Allocation <span className="text-gray-400 font-normal">(by Channel)</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Channel</th>
                <th className="py-1 text-right">Approved Budget</th>
                <th className="py-1 text-right">% of Total</th>
                <th className="py-1 text-right">Committed</th>
                <th className="py-1 text-right">Actual Spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {allocations.map((item) => (
                <tr key={item.channel} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{item.channel}</td>
                  <td className="py-1.5 text-right font-bold text-gray-900">{item.approvedBudget}</td>
                  <td className="py-1.5 text-right text-gray-500">{item.percentOfTotal}</td>
                  <td className="py-1.5 text-right font-semibold text-emerald-700">{item.committed}</td>
                  <td className="py-1.5 text-right font-bold text-blue-700">{item.actualSpend}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-200 font-bold text-[11px] text-gray-900 bg-gray-50/50">
                <td className="py-1.5">Total</td>
                <td className="py-1.5 text-right">LKR 11.70M</td>
                <td className="py-1.5 text-right">100%</td>
                <td className="py-1.5 text-right text-emerald-700">LKR 9.02M</td>
                <td className="py-1.5 text-right text-blue-700">LKR 8.42M</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
