"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";

export function CampaignOrchestrationHeader({
  mode,
  title,
  code,
  lifecycleStatus,
  approvalStatus,
  campaignId,
  onSaveDraft,
  onSaveAndContinue,
}: {
  mode: "Create" | "Edit";
  title: string;
  code?: string;
  lifecycleStatus?: string;
  approvalStatus?: string;
  campaignId?: string;
  onSaveDraft?: () => void;
  onSaveAndContinue?: () => void;
}) {
  const cancelHref =
    mode === "Edit" && campaignId
      ? `/admin/marketing/campaigns/${campaignId}`
      : "/admin/marketing/campaigns";

  return (
    <div className="flex flex-col gap-2 font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
        <Link href="/admin/marketing" className="hover:text-gray-900 transition-colors">
          Marketing
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href="/admin/marketing/campaigns" className="hover:text-gray-900 transition-colors">
          Campaigns
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        {mode === "Edit" && code ? (
          <>
            <Link href={`/admin/marketing/campaigns/${campaignId}`} className="hover:text-gray-900 transition-colors">
              {code}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-bold text-gray-900">Edit</span>
          </>
        ) : (
          <span className="font-bold text-gray-900">New Campaign</span>
        )}
      </div>

      {/* Main Title & Action Buttons Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-2xs">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              {mode === "Edit" ? `Edit Campaign — ${title}` : "Create Campaign"}
            </h1>
            {code && (
              <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                {code}
              </span>
            )}
            {lifecycleStatus && <MarketingStatusChip status={lifecycleStatus} />}
            {approvalStatus && <MarketingStatusChip status={approvalStatus} />}
          </div>
          <p className="text-xs text-gray-500 font-medium">
            {mode === "Edit"
              ? "Changes to active campaign may require reevaluation or re-approval."
              : "Configure campaign setup, audiences, channels, content, schedule, budget, governance and approval workflow."}
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <Link
            href={cancelHref}
            className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors shadow-2xs"
          >
            Cancel
          </Link>

          <button
            onClick={onSaveDraft}
            className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/40 hover:bg-rose-50/50 rounded-lg transition-colors shadow-2xs"
          >
            Save Draft
          </button>

          <button className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors shadow-2xs">
            <span>More Actions</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>

          <button
            onClick={onSaveAndContinue}
            className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-2xs transition-colors"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
