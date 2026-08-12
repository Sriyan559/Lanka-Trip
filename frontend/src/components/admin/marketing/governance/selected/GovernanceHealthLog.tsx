"use client";

import React from "react";
import { GovernanceHealthLogData } from "@/data/marketingGovernance.mock";

interface GovernanceHealthLogProps {
  healthLog: GovernanceHealthLogData;
}

export function GovernanceHealthLog({ healthLog }: GovernanceHealthLogProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Governance Health Log
        </h4>

        <div className="grid grid-cols-5 gap-2 text-center text-xs mt-2">
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Health Score</span>
            <span className="font-extrabold text-emerald-700">{healthLog.healthScore} / 100</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Policy Compliance</span>
            <span className="font-extrabold text-emerald-700">{healthLog.policyCompliance}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Data Completeness</span>
            <span className="font-extrabold text-gray-900">{healthLog.dataCompleteness}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Exception Volume</span>
            <span className="font-extrabold text-amber-700">{healthLog.exceptionVolume}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Approval SLA</span>
            <span className="font-extrabold text-emerald-700">{healthLog.approvalSla}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
