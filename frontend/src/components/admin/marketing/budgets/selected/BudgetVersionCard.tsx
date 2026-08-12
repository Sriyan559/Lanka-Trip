"use client";

import React from "react";

interface BudgetVersionCardProps {
  versionInfo: {
    version: string;
    currentStatus: string;
    draftEffectiveDate: string;
    createdBy: string;
    approvedOn: string;
  };
}

export function BudgetVersionCard({ versionInfo }: BudgetVersionCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Budget Version</span>
          <span className="font-mono text-xs font-extrabold text-gray-900">{versionInfo.version}</span>
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Current Status</span>
            <span className="font-bold text-emerald-700">{versionInfo.currentStatus}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Draft Effective Date</span>
            <span className="font-mono text-[10px] text-gray-700">{versionInfo.draftEffectiveDate}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Created By</span>
            <span className="text-gray-800 font-semibold">{versionInfo.createdBy}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Approved On</span>
            <span className="font-mono text-[10px] text-gray-700">{versionInfo.approvedOn}</span>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100 text-left">
        <button className="text-xs font-bold text-[#800020] hover:underline cursor-pointer">
          View Version History →
        </button>
      </div>
    </div>
  );
}
