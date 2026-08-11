"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { GovernanceData } from "@/data/campaignDetail.mock";
import { CheckCircle2, Clock } from "lucide-react";

export function CampaignGovernancePanel({
  governance,
}: {
  governance: GovernanceData;
}) {
  return (
    <MarketingSectionCard
      title="Governance & Approvals"
      footerLink={{
        label: "Open Governance Details",
        href: "/admin/marketing/governance",
      }}
      className="h-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
        {/* Left Status Details */}
        <div className="flex flex-col gap-2 border-r border-gray-100 pr-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Governance Status</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
              {governance.status}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Policy Compliance</span>
            <span className="font-bold text-gray-900">{governance.policyCompliance}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Risk Level</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
              {governance.riskLevel}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Approval Status</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
              {governance.approvalStatus}
            </span>
          </div>

          <div className="border-t border-gray-100 pt-1.5 mt-1">
            <span className="text-gray-400 block text-[9px]">Approved On / By</span>
            <span className="font-semibold text-gray-900 text-[11px]">
              {governance.approvedOn} by {governance.approvedBy}
            </span>
          </div>
        </div>

        {/* Right Signoff Status List */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
            Departmental Signoffs
          </span>

          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-700 font-medium">Marketing Signoff</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {governance.signoffs.marketing}
            </span>
          </div>

          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-700 font-medium">Finance Signoff</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {governance.signoffs.finance}
            </span>
          </div>

          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-700 font-medium">Legal Signoff</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {governance.signoffs.legal}
            </span>
          </div>

          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-700 font-medium">Data Privacy Signoff</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {governance.signoffs.dataPrivacy}
            </span>
          </div>

          <div className="border-t border-gray-100 pt-1.5 mt-1">
            <span className="text-gray-400 block text-[9px]">Next Review Date</span>
            <span className="font-bold text-gray-900 text-[11px] flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              {governance.signoffs.nextReviewDate}
            </span>
          </div>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
