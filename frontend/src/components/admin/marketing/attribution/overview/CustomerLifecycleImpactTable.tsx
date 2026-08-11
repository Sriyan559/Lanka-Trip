"use client";

import React from "react";
import { LifecycleImpactItem } from "@/data/marketingAttribution.mock";

interface CustomerLifecycleImpactTableProps {
  items: LifecycleImpactItem[];
}

export function CustomerLifecycleImpactTable({ items }: CustomerLifecycleImpactTableProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Customer Lifecycle Impact
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Lifecycle Stage</th>
                <th className="py-1 text-right">Spend</th>
                <th className="py-1 text-right">Attrib. Revenue</th>
                <th className="py-1 text-right">ROAS</th>
                <th className="py-1 text-right">CAC</th>
                <th className="py-1 text-right">Incremental Lift</th>
                <th className="py-1 text-right">Contrib. %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {items.map((item) => (
                <tr key={item.lifecycleStage} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-bold text-gray-900">{item.lifecycleStage}</td>
                  <td className="py-1.5 text-right text-gray-600 font-mono">{item.activeCustomers}</td>
                  <td className="py-1.5 text-right font-bold text-emerald-700">{item.attributedRevenue}</td>
                  <td className="py-1.5 text-right font-bold text-blue-700">{item.roas}</td>
                  <td className="py-1.5 text-right font-semibold text-rose-700">{item.cac}</td>
                  <td className="py-1.5 text-right font-bold text-emerald-700">{item.incrementalLift}</td>
                  <td className="py-1.5 text-right font-bold text-gray-900">{item.contributionPercent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
