"use client";

import React from "react";
import { CollisionAnalysisItem } from "@/data/marketingGovernance.mock";

interface ContactCollisionAnalysisProps {
  collisions: CollisionAnalysisItem[];
}

export function ContactCollisionAnalysis({ collisions }: ContactCollisionAnalysisProps) {
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "Warning":
        return "text-amber-700 font-bold";
      case "Review":
        return "text-orange-700 font-bold";
      case "Blocked":
        return "text-rose-700 font-bold";
      case "Clear":
      default:
        return "text-emerald-700 font-semibold";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Contact Collision Analysis</span>
          <span className="text-[10px] text-gray-400 font-normal">Aggregate Competition Analysis</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Journey / Campaign</th>
                <th className="py-1 text-right">Affected</th>
                <th className="py-1">Current</th>
                <th className="py-1 text-center">Policy Max</th>
                <th className="py-1 text-center">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {collisions.map((item) => (
                <tr key={item.journeyCampaign} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{item.journeyCampaign}</td>
                  <td className="py-1.5 text-right font-mono text-gray-700">{item.affectedCustomers}</td>
                  <td className="py-1.5 font-medium text-gray-600">{item.currentFrequency}</td>
                  <td className="py-1.5 text-center font-mono text-gray-600">{item.policyMax}</td>
                  <td className="py-1.5 text-center">
                    <span className={getSeverityBadge(item.severity)}>{item.severity}</span>
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
