"use client";

import React from "react";
import Link from "next/link";
import { AttributionGovernanceData } from "@/data/marketingAttribution.mock";

interface AttributionGovernanceCardProps {
  governance: AttributionGovernanceData;
}

export function AttributionGovernanceCard({ governance }: AttributionGovernanceCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Attribution Governance
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Active Model</span>
            <span className="font-bold text-[#800020]">{governance.activeModel}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Model Version</span>
            <span className="font-mono text-[10px] text-gray-800 font-bold">{governance.modelVersion}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Approved By</span>
            <span className="text-gray-800 font-semibold">{governance.approvedBy}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Finance Alignment</span>
            <span className="font-bold text-emerald-700">{governance.financeAlignment}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Lookback Policy</span>
            <span className="font-bold text-emerald-700">{governance.lookbackPolicy}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Conversion Definitions</span>
            <span className="font-bold text-emerald-700">{governance.conversionDefinitions}</span>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100 text-left">
        <Link
          href="/admin/marketing/governance"
          className="text-xs font-bold text-[#800020] hover:underline cursor-pointer"
        >
          Open Governance Details →
        </Link>
      </div>
    </div>
  );
}
