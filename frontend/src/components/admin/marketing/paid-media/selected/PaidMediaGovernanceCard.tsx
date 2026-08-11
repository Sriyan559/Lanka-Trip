"use client";

import React from "react";

interface PaidMediaGovernanceCardProps {
  governance: {
    governanceHealthPercent: number;
    approvalStatus: string;
    policyCompliance: string;
    businessRestrictions: string;
  };
}

export function PaidMediaGovernanceCard({ governance }: PaidMediaGovernanceCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Paid Media Governance
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div>
            <span className="text-[10px] font-medium text-gray-400 block">Governance Health</span>
            <span className="text-xl font-extrabold text-emerald-700">
              {governance.governanceHealthPercent}%
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Approval Status</span>
            <span className="font-bold text-emerald-700">{governance.approvalStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Policy Compliance</span>
            <span className="font-bold text-emerald-700">{governance.policyCompliance}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Business Restrictions</span>
            <span className="text-gray-700">{governance.businessRestrictions}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Governance Policy
        </button>
      </div>
    </div>
  );
}
