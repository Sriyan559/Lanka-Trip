"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MARKETING_GOVERNANCE_MOCK_DATA } from "@/data/marketingGovernance.mock";

import { GovernanceContextStrip } from "@/components/admin/marketing/governance/GovernanceContextStrip";
import { SelectedGovernanceWorkspace } from "@/components/admin/marketing/governance/selected/SelectedGovernanceWorkspace";
import { GovernanceOperationsRail } from "@/components/admin/marketing/governance/rail/GovernanceOperationsRail";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function GovernanceRecordDetailPage() {
  const params = useParams();
  const recordId = params?.recordId as string;
  const [data] = useState(MARKETING_GOVERNANCE_MOCK_DATA);

  const selectedRecord = data.selectedRecord;

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* Top Detail Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-2xs">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/marketing/governance"
                className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                title="Back to Governance Portfolio"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <Link href="/admin/marketing/governance" className="hover:text-[#800020]">
                    Governance
                  </Link>
                  <span>/</span>
                  <span className="font-mono text-gray-700">{recordId || selectedRecord.itemId}</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-[#800020]" />
                  <span>{selectedRecord.governanceItem}</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {}}
                className="px-3 py-1.5 text-xs font-bold text-[#800020] bg-white hover:bg-rose-50 border border-[#800020] rounded-lg transition-colors cursor-pointer"
              >
                Re-evaluate Policy
              </button>
              <button
                onClick={() => {}}
                className="px-3 py-1.5 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-2xs transition-colors cursor-pointer"
              >
                Grant Exception
              </button>
            </div>
          </div>

          {/* CONTEXT STRIP */}
          <GovernanceContextStrip context={data.context} />

          {/* SELECTED GOVERNANCE WORKSPACE */}
          <SelectedGovernanceWorkspace record={selectedRecord} />
        </main>

        {/* RIGHT OPERATIONAL RAIL */}
        <GovernanceOperationsRail railData={data.rail} />
      </div>
    </div>
  );
}
