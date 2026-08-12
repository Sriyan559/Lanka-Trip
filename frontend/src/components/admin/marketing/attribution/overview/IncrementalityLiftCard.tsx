"use client";

import React from "react";
import { IncrementalityLiftItem } from "@/data/marketingAttribution.mock";

interface IncrementalityLiftCardProps {
  liftItems: IncrementalityLiftItem[];
}

export function IncrementalityLiftCard({ liftItems }: IncrementalityLiftCardProps) {
  const getStatusBadge = (st: string) => {
    switch (st) {
      case "Significant":
        return "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold";
      case "Directional":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Insufficient Evidence":
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Incrementality & Lift Reference
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Campaign</th>
                <th className="py-1 text-right">Lift</th>
                <th className="py-1 text-right">Confidence</th>
                <th className="py-1 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {liftItems.map((item) => (
                <tr key={item.campaign} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{item.campaign}</td>
                  <td className="py-1.5 text-right font-bold text-emerald-700">{item.lift}</td>
                  <td className="py-1.5 text-right text-gray-600 font-mono">{item.confidence}</td>
                  <td className="py-1.5 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] border ${getStatusBadge(item.status)}`}>
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
