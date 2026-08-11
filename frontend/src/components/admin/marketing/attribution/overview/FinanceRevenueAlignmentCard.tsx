"use client";

import React from "react";
import { FinanceAlignmentData } from "@/data/marketingAttribution.mock";

interface FinanceRevenueAlignmentCardProps {
  finance: FinanceAlignmentData;
}

export function FinanceRevenueAlignmentCard({ finance }: FinanceRevenueAlignmentCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Finance Revenue Alignment</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            {finance.status}
          </span>
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">MK12 Attributed Revenue</span>
            <span className="font-bold text-emerald-700">{finance.mk12AttributedRevenue}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Finance Recognized Revenue</span>
            <span className="font-bold text-gray-900 font-mono">{finance.financeRecognizedRevenue}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Timing Recognition Difference</span>
            <span className="font-semibold text-gray-700 font-mono">{finance.timingDifference}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Alignment</span>
            <span className="font-bold text-emerald-700">{finance.alignmentPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
