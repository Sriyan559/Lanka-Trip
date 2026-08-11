"use client";

import React from "react";
import { ConsentEligibilityItem } from "@/data/marketingGovernance.mock";

interface ConsentEligibilityCardProps {
  eligibilityItems: ConsentEligibilityItem[];
}

export function ConsentEligibilityCard({ eligibilityItems }: ConsentEligibilityCardProps) {
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "High":
      case "Critical":
        return "text-rose-700 font-bold";
      case "Medium":
        return "text-amber-700 font-bold";
      case "Low":
      default:
        return "text-emerald-700 font-semibold";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Consent & Eligibility</span>
          <span className="text-[10px] text-gray-400 font-normal">Customer Domain Reference</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Reason</th>
                <th className="py-1">Source</th>
                <th className="py-1 text-center">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {eligibilityItems.map((item) => (
                <tr key={item.reason} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{item.reason}</td>
                  <td className="py-1.5 font-medium text-gray-600">{item.source}</td>
                  <td className="py-1.5 text-center">
                    <span className={getSeverityBadge(item.severity)}>● {item.severity}</span>
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
