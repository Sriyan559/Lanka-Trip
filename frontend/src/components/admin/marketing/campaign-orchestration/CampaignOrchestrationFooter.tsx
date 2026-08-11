"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Lock } from "lucide-react";

export function CampaignOrchestrationFooter({
  mode,
  campaignId,
  blockerCount = 1,
  lastSavedTime = "10:42 AM",
  onSaveDraft,
  onRunValidation,
  onSubmitForApproval,
}: {
  mode: "Create" | "Edit";
  campaignId?: string;
  blockerCount?: number;
  lastSavedTime?: string;
  onSaveDraft?: () => void;
  onRunValidation?: () => void;
  onSubmitForApproval?: () => void;
}) {
  const backHref =
    mode === "Edit" && campaignId
      ? `/admin/marketing/campaigns/${campaignId}`
      : "/admin/marketing/campaigns";

  const hasBlockers = blockerCount > 0;

  return (
    <div className="sticky bottom-0 z-30 bg-white border-t border-gray-200/90 p-3 shadow-lg font-sans flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Left Back Button */}
      <Link
        href={backHref}
        className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors shadow-2xs shrink-0"
      >
        Back
      </Link>

      {/* Center Alert & Autosave Status */}
      <div className="flex items-center gap-3 text-xs font-medium flex-wrap justify-center">
        {hasBlockers && (
          <div className="flex items-center gap-1.5 text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100 text-[11px]">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Resolve {blockerCount} blocker before submission.</span>
          </div>
        )}

        <div className="flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
          <span>Autosaved {lastSavedTime}</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap shrink-0">
        <button
          onClick={onSaveDraft}
          className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/40 hover:bg-rose-50/50 rounded-lg transition-colors shadow-2xs"
        >
          Save Draft
        </button>

        <button
          onClick={onRunValidation}
          className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/40 hover:bg-rose-50/50 rounded-lg transition-colors shadow-2xs"
        >
          Run Validation
        </button>

        <button
          onClick={onSubmitForApproval}
          disabled={hasBlockers}
          className={`inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg transition-colors shadow-2xs ${
            hasBlockers
              ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              : "bg-[#800020] text-white hover:bg-[#66001a]"
          }`}
          title={hasBlockers ? "Resolve all blockers before submitting for approval" : "Submit for Approval"}
        >
          {hasBlockers && <Lock className="w-3.5 h-3.5 text-gray-400" />}
          <span>Submit for Approval</span>
        </button>
      </div>
    </div>
  );
}
