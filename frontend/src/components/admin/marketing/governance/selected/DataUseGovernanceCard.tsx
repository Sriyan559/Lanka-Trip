"use client";

import React from "react";
import { DataUseGovernanceData } from "@/data/marketingGovernance.mock";

interface DataUseGovernanceCardProps {
  dataUse: DataUseGovernanceData;
}

export function DataUseGovernanceCard({ dataUse }: DataUseGovernanceCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Data Use Governance</span>
          <button className="text-[10px] font-bold text-[#800020] hover:underline cursor-pointer">
            Data Use Policy
          </button>
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Allowed Purpose</span>
            <span className="font-bold text-gray-900">{dataUse.allowedPurpose}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Allowed Data Classes</span>
            <span className="font-semibold text-gray-800">{dataUse.allowedDataClasses}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Data Retention</span>
            <span className="font-mono text-gray-700">{dataUse.dataRetention}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Customer-Level Exports</span>
            <span className="font-bold text-rose-700">{dataUse.customerLevelExports}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Sharing With Third Parties</span>
            <span className="font-bold text-rose-700">{dataUse.sharingThirdParties}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Cross-Border Use</span>
            <span className="text-gray-700 font-medium">{dataUse.crossBorderUse}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Data Subject Rights</span>
            <span className="font-bold text-emerald-700">{dataUse.dataSubjectRights}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
