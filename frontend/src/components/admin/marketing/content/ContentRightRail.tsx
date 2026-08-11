"use client";

import React from "react";
import { ContentRightRailData } from "@/data/marketingContent.mock";
import { Plus, CheckSquare, ShieldCheck, AlertTriangle, ExternalLink } from "lucide-react";

export function ContentRightRail({
  data,
}: {
  data: ContentRightRailData;
}) {
  return (
    <div className="w-full flex flex-col gap-2 font-sans text-xs">
      {/* 1. Content Operations Health Donut Card */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-2 shadow-2xs">
        <h3 className="text-[11px] font-bold text-gray-900 leading-tight">Content Operations Health</h3>

        <div className="flex items-center gap-2.5 my-1.5">
          {/* Circular Donut Graphic */}
          <div className="relative w-12 h-12 rounded-full border-[3px] border-emerald-500 flex items-center justify-center bg-emerald-50/40 shrink-0">
            <div className="text-center">
              <span className="text-xs font-extrabold text-gray-900 leading-none block">
                {data.healthScore}
              </span>
              <span className="text-[7px] text-gray-400 font-bold block">/100</span>
            </div>
          </div>

          <div className="flex flex-col gap-0.5 text-[8.5px] font-medium text-gray-600 w-full min-w-0">
            <div className="flex justify-between">
              <span className="truncate">Approval Readiness</span>
              <span className="font-bold text-gray-900 ml-1">{data.approvalReadinessPct}%</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate">Rights Validity</span>
              <span className="font-bold text-gray-900 ml-1">{data.rightsValidityPct}%</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate">Channel Readiness</span>
              <span className="font-bold text-gray-900 ml-1">{data.channelReadinessPct}%</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate">Brand Compliance</span>
              <span className="font-bold text-gray-900 ml-1">{data.brandCompliancePct}%</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate">Accessibility</span>
              <span className="font-bold text-gray-900 ml-1">{data.accessibilityPct}%</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate">Version Integrity</span>
              <span className="font-bold text-gray-900 ml-1">{data.versionIntegrityPct}%</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate">Usage Integrity</span>
              <span className="font-bold text-gray-900 ml-1">{data.usageIntegrityPct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Content Summary */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-2 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-900 mb-1">Content Summary</h4>
        <div className="flex flex-col gap-0.5 text-[9px]">
          <div className="flex justify-between">
            <span className="text-gray-500">Total Assets</span>
            <span className="font-mono font-bold text-gray-900">{data.totalAssets.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Approved</span>
            <span className="font-mono font-bold text-emerald-700">{data.approvedAssets.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Draft</span>
            <span className="font-mono font-bold text-blue-700">{data.draftAssets}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">In Review</span>
            <span className="font-mono font-bold text-amber-700">{data.inReviewAssets}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Archived</span>
            <span className="font-mono font-bold text-gray-600">{data.archivedAssets}</span>
          </div>
        </div>
      </div>

      {/* 3. Approval Summary */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-2 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-900 mb-1">Approval Summary</h4>
        <div className="flex flex-col gap-0.5 text-[9px]">
          <div className="flex justify-between">
            <span className="text-gray-500">Pending Approvals</span>
            <span className="font-mono font-bold text-amber-700">{data.pendingApprovals}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">In Review</span>
            <span className="font-mono font-bold text-amber-700">{data.inReviewApprovals}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Overdue Approvals</span>
            <span className="font-mono font-bold text-rose-700">{data.overdueApprovals}</span>
          </div>
        </div>
      </div>

      {/* 4. Rights Summary */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-2 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-900 mb-1">Rights Summary</h4>
        <div className="flex flex-col gap-0.5 text-[9px]">
          <div className="flex justify-between">
            <span className="text-gray-500">Rights Valid</span>
            <span className="font-mono font-bold text-emerald-700">{data.validRights.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Expiring Soon</span>
            <span className="font-mono font-bold text-amber-700">{data.expiringRights}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Expired</span>
            <span className="font-mono font-bold text-rose-700">{data.expiredRights}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Restricted</span>
            <span className="font-mono font-bold text-gray-600">{data.restrictedRights}</span>
          </div>
        </div>
      </div>

      {/* 5. Usage Summary */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-2 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-900 mb-1">Usage Summary</h4>
        <div className="flex flex-col gap-0.5 text-[9px]">
          <div className="flex justify-between">
            <span className="text-gray-500">In Campaigns</span>
            <span className="font-mono font-bold text-gray-900">{data.inCampaignsUsage}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">In Journeys</span>
            <span className="font-mono font-bold text-gray-900">{data.inJourneysUsage}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Active Placements</span>
            <span className="font-mono font-bold text-gray-900">{data.activePlacementsUsage}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Unused</span>
            <span className="font-mono font-bold text-gray-500">{data.unusedAssets}</span>
          </div>
        </div>
      </div>

      {/* 6. Readiness Summary */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-2 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-900 mb-1">Readiness Summary</h4>
        <div className="flex flex-col gap-0.5 text-[9px]">
          <div className="flex justify-between">
            <span className="text-gray-500">Ready</span>
            <span className="font-mono font-bold text-emerald-700">{data.readyReadiness.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Missing Variants</span>
            <span className="font-mono font-bold text-amber-700">{data.missingVariants}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Policy Warnings</span>
            <span className="font-mono font-bold text-amber-700">{data.policyWarnings}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Rights Warnings</span>
            <span className="font-mono font-bold text-rose-700">{data.rightsWarnings}</span>
          </div>
        </div>
      </div>

      {/* 7. Quick Queues */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-2 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-900 mb-1">Quick Queues</h4>
        <div className="flex flex-col gap-1 text-[9px]">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1 text-gray-700">
              <CheckSquare className="w-3 h-3 text-amber-500" />
              Approval Pending
            </span>
            <span className="font-mono font-bold text-amber-700">{data.pendingApprovals}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1 text-gray-700">
              <AlertTriangle className="w-3 h-3 text-amber-500" />
              Rights Expiring
            </span>
            <span className="font-mono font-bold text-amber-700">{data.expiringRights}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1 text-gray-700">
              <ShieldCheck className="w-3 h-3 text-amber-500" />
              Missing Variants
            </span>
            <span className="font-mono font-bold text-amber-700">{data.missingVariants}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1 text-gray-700">
              <AlertTriangle className="w-3 h-3 text-rose-500" />
              Policy Warnings
            </span>
            <span className="font-mono font-bold text-rose-700">{data.policyWarnings}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1 text-gray-700">
              <AlertTriangle className="w-3 h-3 text-rose-500" />
              Accessibility Issues
            </span>
            <span className="font-mono font-bold text-rose-700">{data.accessibilityIssues}</span>
          </div>
        </div>
      </div>

      {/* 8. Final Content Actions */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-2 shadow-2xs flex flex-col gap-1">
        <h4 className="text-[10px] font-bold text-gray-900">Final Content Actions</h4>

        <button className="w-full inline-flex items-center justify-center gap-1 px-2 py-0.5 text-[10px] font-bold text-[#800020] bg-white border border-[#800020] hover:bg-[#800020]/5 rounded-md transition-colors shadow-2xs h-6">
          <Plus className="w-3 h-3" />
          <span>Add Content</span>
        </button>

        <button className="w-full inline-flex items-center justify-center gap-1 px-2 py-0.5 text-[10px] font-bold text-[#800020] bg-white border border-[#800020] hover:bg-[#800020]/5 rounded-md transition-colors shadow-2xs h-6">
          <CheckSquare className="w-3 h-3" />
          <span>Create Template</span>
        </button>

        <button className="w-full inline-flex items-center justify-center gap-1 px-2 py-0.5 text-[10px] font-bold text-[#800020] bg-white border border-[#800020] hover:bg-[#800020]/5 rounded-md transition-colors shadow-2xs h-6">
          <CheckSquare className="w-3 h-3" />
          <span>Review Approvals</span>
        </button>

        <button className="w-full inline-flex items-center justify-center gap-1 px-2 py-0.5 text-[10px] font-bold text-[#800020] bg-white border border-[#800020] hover:bg-[#800020]/5 rounded-md transition-colors shadow-2xs h-6">
          <ShieldCheck className="w-3 h-3" />
          <span>Review Rights</span>
        </button>

        <button className="w-full inline-flex items-center justify-center gap-1 px-2 py-0.5 text-[10px] font-bold text-[#800020] bg-white border border-[#800020] hover:bg-[#800020]/5 rounded-md transition-colors shadow-2xs h-6">
          <AlertTriangle className="w-3 h-3" />
          <span>Open Content Exceptions</span>
        </button>

        <button className="w-full inline-flex items-center justify-center gap-1 px-2 py-0.5 text-[10px] font-bold text-[#800020] bg-white border border-[#800020] hover:bg-[#800020]/5 rounded-md transition-colors shadow-2xs h-6">
          <ExternalLink className="w-3 h-3" />
          <span>View Audit Trail</span>
        </button>
      </div>
    </div>
  );
}
