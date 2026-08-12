"use client";

import React from "react";
import Link from "next/link";
import { PaidMediaComparisonItem } from "@/data/marketingAttribution.mock";

interface PaidMediaMeasurementComparisonTableProps {
  comparisons: PaidMediaComparisonItem[];
}

export function PaidMediaMeasurementComparisonTable({ comparisons }: PaidMediaMeasurementComparisonTableProps) {
  const getStatusBadge = (st: string) => {
    switch (st) {
      case "Within Tolerance":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Minor Variance":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Investigate":
        return "bg-amber-50 text-amber-800 border-amber-200 font-bold";
      case "Critical Variance":
      default:
        return "bg-rose-50 text-rose-800 border-rose-200 font-bold";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Paid Media Measurement Comparison
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Platform</th>
                <th className="py-1 text-right">Platform Revenue</th>
                <th className="py-1 text-right">MK12 Attributed</th>
                <th className="py-1 text-right">Variance %</th>
                <th className="py-1 text-center">Status</th>
                <th className="py-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {comparisons.map((pm) => (
                <tr key={pm.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{pm.platform}</td>
                  <td className="py-1.5 text-right font-mono text-gray-600">{pm.platformRevenue}</td>
                  <td className="py-1.5 text-right font-bold text-emerald-700">{pm.mk12AttributedRevenue}</td>
                  <td className="py-1.5 text-right font-bold text-rose-700">{pm.variancePercent}</td>
                  <td className="py-1.5 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] border ${getStatusBadge(pm.status)}`}>
                      {pm.status}
                    </span>
                  </td>
                  <td className="py-1.5 text-center">
                    <Link
                      href={`/admin/marketing/paid-media/${pm.mediaId}`}
                      className="text-[10px] font-bold text-[#800020] hover:underline"
                    >
                      Open in Detail
                    </Link>
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
