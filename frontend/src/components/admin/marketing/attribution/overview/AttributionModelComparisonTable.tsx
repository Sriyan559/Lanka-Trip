"use client";

import React from "react";
import { ModelComparisonItem } from "@/data/marketingAttribution.mock";

interface AttributionModelComparisonTableProps {
  comparisonList: ModelComparisonItem[];
}

export function AttributionModelComparisonTable({ comparisonList }: AttributionModelComparisonTableProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Attribution Model Comparison <span className="text-gray-400 font-normal">(Attributed Revenue by Channel)</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Channel</th>
                <th className="py-1 text-right">Data Driven</th>
                <th className="py-1 text-right">Last Touch</th>
                <th className="py-1 text-right">First Touch</th>
                <th className="py-1 text-right">Time Decay</th>
                <th className="py-1 text-center">Variance vs DDA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {comparisonList.map((item) => (
                <tr key={item.channel} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{item.channel}</td>
                  <td className="py-1.5 text-right font-bold text-[#800020]">{item.dataDriven}</td>
                  <td className="py-1.5 text-right font-mono text-gray-600">{item.lastTouch}</td>
                  <td className="py-1.5 text-right font-mono text-gray-600">{item.firstTouch}</td>
                  <td className="py-1.5 text-right font-mono text-gray-600">{item.timeDecay}</td>
                  <td className="py-1.5 text-center text-gray-400 font-mono text-[10px]">{item.varianceVsDda}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
