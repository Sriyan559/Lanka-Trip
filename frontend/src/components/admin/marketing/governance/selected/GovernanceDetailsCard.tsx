"use client";

import React from "react";
import { SelectedGovernanceRecord } from "@/data/marketingGovernance.mock";

interface GovernanceDetailsCardProps {
  record: SelectedGovernanceRecord;
}

export function GovernanceDetailsCard({ record }: GovernanceDetailsCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Governance Details
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Related Entity</span>
            <span className="font-bold text-gray-900">{record.governanceItem}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Entity Type</span>
            <span className="font-semibold text-gray-700">{record.entityType}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Campaign / Journey ID</span>
            <span className="font-mono text-[10px] text-gray-600 font-bold">{record.campaignId}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Business Unit</span>
            <span className="font-bold text-gray-800">{record.businessUnit}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Governance Owner</span>
            <span className="font-semibold text-gray-800">{record.governanceOwner}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Active Policy Set</span>
            <span className="font-bold text-[#800020]">{record.activePolicySet}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Current Status</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
              {record.currentStatus}
            </span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Last Evaluated</span>
            <span className="font-mono text-[10px] text-gray-500">{record.lastEvaluated}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Next Review</span>
            <span className="font-mono text-[10px] text-gray-500">{record.nextReview}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Policy Source</span>
            <span className="font-bold text-gray-800">{record.policySource}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
