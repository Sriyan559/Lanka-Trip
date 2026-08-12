"use client";

import React from "react";
import Link from "next/link";
import { AnalyticsExceptionSummaryItem } from "@/data/marketingAttribution.mock";

interface AnalyticsExceptionsSummaryTableProps {
  exceptionsSummary: AnalyticsExceptionSummaryItem[];
}

export function AnalyticsExceptionsSummaryTable({ exceptionsSummary }: AnalyticsExceptionsSummaryTableProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Exceptions Summary (Top)</span>
          <Link
            href="/admin/marketing/governance"
            className="text-xs font-bold text-[#800020] hover:underline cursor-pointer"
          >
            Open Executive Exception Report →
          </Link>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Metric Category</th>
                <th className="py-1 text-center">Open</th>
                <th className="py-1 text-center">Critical</th>
                <th className="py-1 text-center">High</th>
                <th className="py-1 text-center">Warning</th>
                <th className="py-1 text-center">Info</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {exceptionsSummary.map((item) => (
                <tr key={item.metricCategory} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{item.metricCategory}</td>
                  <td className="py-1.5 text-center font-bold text-gray-900">{item.openCount}</td>
                  <td className="py-1.5 text-center font-bold text-rose-700">{item.criticalCount}</td>
                  <td className="py-1.5 text-center font-bold text-rose-700">{item.highCount}</td>
                  <td className="py-1.5 text-center font-bold text-amber-700">{item.warningCount}</td>
                  <td className="py-1.5 text-center text-gray-500">{item.infoCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
