"use client";

import React from "react";
import { BusinessPerformanceItem } from "@/data/marketingAttribution.mock";

interface BusinessPerformanceTableProps {
  businessItems: BusinessPerformanceItem[];
}

export function BusinessPerformanceTable({ businessItems }: BusinessPerformanceTableProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Business Performance</span>
          <span className="text-[10px] text-gray-400 font-normal">Business Unit / Brand</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Business Unit / Brand</th>
                <th className="py-1 text-right">Spend</th>
                <th className="py-1 text-right">Attrib. Revenue</th>
                <th className="py-1 text-right">ROAS</th>
                <th className="py-1 text-right">Contrib. %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {businessItems.map((item) => (
                <tr key={item.businessUnitBrand} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-bold text-gray-900">{item.businessUnitBrand}</td>
                  <td className="py-1.5 text-right font-bold text-rose-700">{item.spend}</td>
                  <td className="py-1.5 text-right font-bold text-emerald-700">{item.attributedRevenue}</td>
                  <td className="py-1.5 text-right font-bold text-blue-700">{item.roas}</td>
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
