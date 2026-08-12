"use client";

import React from "react";
import { SpendEfficiencyItem } from "@/data/marketingAttribution.mock";

interface SpendEfficiencyTableProps {
  efficiencyItems: SpendEfficiencyItem[];
}

export function SpendEfficiencyTable({ efficiencyItems }: SpendEfficiencyTableProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Spend Efficiency
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Channel</th>
                <th className="py-1 text-right">Spend</th>
                <th className="py-1 text-right">Attrib. Revenue</th>
                <th className="py-1 text-right">ROAS</th>
                <th className="py-1 text-right">CAC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {efficiencyItems.map((item) => (
                <tr key={item.channel} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{item.channel}</td>
                  <td className="py-1.5 text-right font-bold text-rose-700">{item.spend}</td>
                  <td className="py-1.5 text-right font-bold text-emerald-700">{item.attributedRevenue}</td>
                  <td className="py-1.5 text-right font-bold text-blue-700">{item.roas}</td>
                  <td className="py-1.5 text-right font-semibold text-gray-700">{item.cac}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
