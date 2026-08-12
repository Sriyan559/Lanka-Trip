"use client";

import React from "react";
import { RetentionManagementItem } from "@/data/marketingReportsAudit.mock";

interface RetentionManagementProps {
  retentionItems: RetentionManagementItem[];
}

export function RetentionManagement({ retentionItems }: RetentionManagementProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          20. Retention Management
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Governance Category</th>
                <th className="py-1">Retention Period</th>
                <th className="py-1">Active Volume</th>
                <th className="py-1">Expiring Soon</th>
                <th className="py-1 text-center">Policy Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {retentionItems.map((item) => (
                <tr key={item.governanceCategory} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-bold text-gray-900">{item.governanceCategory}</td>
                  <td className="py-1.5 font-mono text-[10px] text-gray-700">{item.retentionPeriod}</td>
                  <td className="py-1.5 text-gray-600 font-mono text-[10px]">{item.activeVolume}</td>
                  <td className="py-1.5 text-gray-600 font-mono text-[10px]">{item.expiringSoon}</td>
                  <td className="py-1.5 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.policyStatus}
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
