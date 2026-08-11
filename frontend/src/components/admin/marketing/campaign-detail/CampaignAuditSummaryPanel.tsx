"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { AuditSummaryData } from "@/data/campaignDetail.mock";

export function CampaignAuditSummaryPanel({
  audit,
}: {
  audit: AuditSummaryData;
}) {
  return (
    <MarketingSectionCard
      title="Audit Summary"
      footerLink={{
        label: "View Audit Trail",
        href: "/admin/marketing/reports-audit",
      }}
      className="h-full"
    >
      <div className="flex flex-col gap-2 font-sans text-xs">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          <div>
            <span className="text-gray-400 block text-[9px]">Campaign Record</span>
            <span className="font-mono font-bold text-gray-900">{audit.campaignRecord}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[9px]">Total Changes</span>
            <span className="font-mono font-bold text-emerald-700">{audit.totalChanges}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[9px]">Created By</span>
            <span className="font-semibold text-gray-900">{audit.createdBy}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[9px]">Created On</span>
            <span className="font-mono text-gray-700 text-[10.5px]">{audit.createdOn}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[9px]">Last Updated By</span>
            <span className="font-semibold text-gray-900">{audit.lastUpdatedBy}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[9px]">Last Updated On</span>
            <span className="font-mono text-gray-700 text-[10.5px]">{audit.lastUpdatedOn}</span>
          </div>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
