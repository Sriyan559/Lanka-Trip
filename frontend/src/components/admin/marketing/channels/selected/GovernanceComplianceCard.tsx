"use client";

import React from "react";
import Link from "next/link";
import { GovernanceComplianceDetails } from "@/data/marketingChannels.mock";

interface GovernanceComplianceCardProps {
  details: GovernanceComplianceDetails;
}

export function GovernanceComplianceCard({ details }: GovernanceComplianceCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Governance & Compliance
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Policy Compliance</span>
            <span className="font-bold text-emerald-700">{details.policyCompliance}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Data Handling</span>
            <span className="font-bold text-emerald-700">{details.dataHandling}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Audit Logging</span>
            <span className="font-bold text-emerald-700">{details.auditLogging}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Last Audit</span>
            <span className="font-mono text-[11px] text-gray-700">{details.lastAudit}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <Link
          href="/admin/marketing/governance"
          className="block w-full py-1 text-center text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          View Governance
        </Link>
      </div>
    </div>
  );
}
