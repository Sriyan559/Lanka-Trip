"use client";

import React from "react";
import { GovernanceAuditItem } from "@/data/marketingGovernance.mock";

interface GovernanceAuditTrailProps {
  auditTrail: GovernanceAuditItem[];
}

export function GovernanceAuditTrail({ auditTrail }: GovernanceAuditTrailProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Governance Audit Trail <span className="text-gray-400 font-normal">(Recent)</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Time</th>
                <th className="py-1">Action</th>
                <th className="py-1">Actor</th>
                <th className="py-1">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {auditTrail.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-mono text-[10px] text-gray-500 whitespace-nowrap">{item.time}</td>
                  <td className="py-1.5 font-bold text-gray-900">{item.action}</td>
                  <td className="py-1.5 font-semibold text-gray-700">{item.actor}</td>
                  <td className="py-1.5 text-gray-600">{item.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
