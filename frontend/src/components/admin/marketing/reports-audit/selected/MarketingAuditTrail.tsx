"use client";

import React from "react";
import { MarketingAuditEventItem } from "@/data/marketingReportsAudit.mock";

interface MarketingAuditTrailProps {
  auditEvents: MarketingAuditEventItem[];
}

export function MarketingAuditTrail({ auditEvents }: MarketingAuditTrailProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>17. Marketing Audit Trail <span className="text-gray-400 font-normal">(Last 5)</span></span>
          <span className="text-[10px] text-gray-400 font-normal">Immutable Append-Only Log</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Timestamp</th>
                <th className="py-1">User</th>
                <th className="py-1">Action</th>
                <th className="py-1">Marketing Domain</th>
                <th className="py-1">Record Type</th>
                <th className="py-1">Record ID</th>
                <th className="py-1 text-center">Result</th>
                <th className="py-1 text-center">Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {auditEvents.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-mono text-[10px] text-gray-500 whitespace-nowrap">{item.timestamp}</td>
                  <td className="py-1.5 font-semibold text-gray-800">{item.user}</td>
                  <td className="py-1.5 font-bold text-gray-900">{item.action}</td>
                  <td className="py-1.5 text-gray-600">{item.marketingDomain}</td>
                  <td className="py-1.5 text-gray-600">{item.recordType}</td>
                  <td className="py-1.5 font-mono text-[10px] text-gray-600">{item.recordId}</td>
                  <td className="py-1.5 text-center font-bold text-emerald-700">{item.result}</td>
                  <td className="py-1.5 text-center font-mono text-[10px] text-[#800020] font-bold">{item.evidenceId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
