"use client";

import React from "react";
import Link from "next/link";
import { GovernanceComplianceData } from "@/data/marketingWebApp.mock";

interface GovernanceComplianceCardProps {
  governance: GovernanceComplianceData;
}

export function GovernanceComplianceCard({ governance }: GovernanceComplianceCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Governance & Compliance
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Governance Status</span>
            <span className="font-bold text-emerald-700">{governance.governanceStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Approval Status</span>
            <span className="font-bold text-emerald-700">{governance.approvalStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Last Reviewed</span>
            <span className="font-mono text-[11px] text-gray-700">{governance.lastReviewed}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Reviewed By</span>
            <span className="text-gray-800 font-medium">{governance.reviewedBy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Data Use Policy</span>
            <span className="text-emerald-700 font-semibold">{governance.dataUsePolicy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Privacy Marking</span>
            <span className="font-bold text-emerald-700">{governance.privacyMarking}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <Link
          href="/admin/marketing/reports-audit"
          className="block w-full py-1 text-center text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          View Audit Trail
        </Link>
      </div>
    </div>
  );
}
