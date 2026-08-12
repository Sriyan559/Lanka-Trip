"use client";

import React from "react";

interface PlatformPolicyCardProps {
  policy: {
    policyStatus: string;
    reviewStatus: string;
    rejectedAds: number;
    restrictedCategories: string;
    policyWarnings: number;
  };
}

export function PlatformPolicyCard({ policy }: PlatformPolicyCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Platform Policy & Review
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div>
            <span className="text-[10px] font-medium text-gray-400 block">Policy Status</span>
            <span className="text-xl font-extrabold text-emerald-700">
              {policy.policyStatus}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Review Status</span>
            <span className="font-bold text-emerald-700">{policy.reviewStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Rejected Ads</span>
            <span className="font-bold text-gray-900">{policy.rejectedAds}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Restricted Categories</span>
            <span className="text-gray-700">{policy.restrictedCategories}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Policy Warnings</span>
            <span className="font-bold text-gray-900">{policy.policyWarnings}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Policy Report
        </button>
      </div>
    </div>
  );
}
